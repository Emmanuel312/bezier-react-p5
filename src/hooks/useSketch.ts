import p5Types, { Vector } from 'p5'; // Import this for typechecking and intellisense
import { useCallback, useEffect } from 'react';
import { IBezierList, ISketchProps } from '../interfaces';

const WIDTH = 1024;
const HEIGHT = 500;

let bezierList: Array<IBezierList> = [];
let t: number;
let bezier: Vector[];
let current: number;
let addCurve: boolean;
let currentCurve: any[] = [];

const useSketch = ({
  selected,
  add,
  evaluationAmount,
  checkboxStates,
}: ISketchProps) => {
  useEffect(() => {
    // bezierList = bezierPointsList;
    current = Number(selected);
    addCurve = add;

    if (!add && currentCurve?.length > 1) {
      bezierList.push({
        curve: currentCurve,
        evaluationAmount: Number(evaluationAmount),
      });
      currentCurve = [];
    }
    currentCurve = [];
  }, [selected, add]);

  function handleDeleteCurrentCurve() {
    bezierList = bezierList.filter(
      (bezier, index) => index !== current,
    );
  }

  function casteljauRecursive(
    P5: p5Types,
    points: Vector[],
    t: number,
  ): Vector {
    const result = [];
    for (let i = 1; i < points.length; i++) {
      const medPoint = P5.createVector(
        (1 - t) * points[i - 1].x + t * points[i].x,
        (1 - t) * points[i - 1].y + t * points[i].y,
      );

      result.push(medPoint);
    }
    if (result.length === 1) {
      return result[0];
    }

    return casteljauRecursive(P5, result, t);
  }

  function bezierCurve(P5: p5Types, points: Vector[], step: number) {
    P5.noFill();
    for (t = 0; t <= 1; t += step) {
      const currentPoint = casteljauRecursive(P5, points, t);
      bezier.push(currentPoint);
    }
    for (let i = 0; i < bezier.length - 1; i++) {
      P5.line(
        bezier[i].x,
        bezier[i].y,
        bezier[i + 1].x,
        bezier[i + 1].y,
      );
    }
    bezier = [];
  }

  const setup = useCallback(
    (P5: p5Types, canvasParentRef: Element) => {
      P5.createCanvas(WIDTH, HEIGHT).parent(canvasParentRef);
      t = 0;
      bezier = [];
    },
    [],
  );

  const draw = useCallback(
    (P5: p5Types) => {
      P5.background(220);
      if (checkboxStates?.curve) {
        // curvas de bezier
        for (let index = 0; index < bezierList.length; index++) {
          if (current === index) {
            P5.stroke(255, 0, 0);
          } else {
            P5.stroke(0, 0, 0);
          }
          bezierCurve(
            P5,
            bezierList[index].curve,
            1 / bezierList[index].evaluationAmount,
          );
          P5.stroke(0, 0, 0);
        }
      }

      if (checkboxStates?.line) {
        // poligonais de controle
        bezierList.forEach((bezier) => {
          for (
            let index = 0;
            index < bezier.curve.length - 1;
            index++
          ) {
            P5.stroke(169, 169, 169);
            P5.line(
              bezier.curve[index].x,
              bezier.curve[index].y,
              bezier.curve[index + 1].x,
              bezier.curve[index + 1].y,
            );
            P5.stroke(0, 0, 0);
          }
        });
        P5.strokeWeight(5);
      }

      if (checkboxStates?.points) {
        // pontos de controle
        bezierList.forEach((bezier) =>
          bezier.curve.forEach((p) => P5.point(p.x, p.y)),
        );
        // pontos de controle da curva atual
        currentCurve?.forEach((p) => P5.point(p.x, p.y));
      }

      // P5.noLoop();
    },
    [checkboxStates],
  );

  const mouseClicked = useCallback(
    (P5: p5Types) => {
      if (
        P5.mouseX >= 0 &&
        P5.mouseX <= WIDTH &&
        P5.mouseY >= 0 &&
        P5.mouseY <= HEIGHT &&
        addCurve
      ) {
        currentCurve.push(P5.createVector(P5.mouseX, P5.mouseY));
      }
    },

    [add, currentCurve],
  );

  const inRange = (point1: number, point2: number, range: number) => {
    return point1 >= point2 - range && point1 <= point2 + range;
  };

  const mouseDragged = useCallback(
    (P5: p5Types) => {
      console.log('current', current);
      const selectedPointIndex = bezierList[
        current
      ]?.curve?.findIndex(
        (point) =>
          inRange(P5.mouseX, point.x, 30) &&
          inRange(P5.mouseY, point.y, 30),
      );

      if (selectedPointIndex !== -1 && bezierList.length) {
        bezierList[current].curve[
          selectedPointIndex
        ] = P5.createVector(P5.mouseX, P5.mouseY);
      }
    },

    [bezierList, current],
  );

  const keyPressed = useCallback(
    (P5: p5Types) => {
      if (P5.keyCode === P5.BACKSPACE) {
        const selectedPointIndex = bezierList[
          current
        ]?.curve?.findIndex(
          (point) =>
            inRange(P5.mouseX, point.x, 30) &&
            inRange(P5.mouseY, point.y, 30),
        );

        if (
          selectedPointIndex !== -1 &&
          bezierList.length &&
          bezierList[current].curve.length > 2
        ) {
          bezierList[current].curve.splice(selectedPointIndex, 1);
          console.log(
            `bezierList[current].curve.length`,
            bezierList[current].curve.length,
          );
        }
      }

      if (P5.keyCode === P5.ALT) {
        bezierList[current].curve.push(
          P5.createVector(P5.mouseX, P5.mouseY),
        );
      }
    },

    [bezierList, current],
  );

  return {
    draw,
    setup,
    mouseClicked,
    handleDeleteCurrentCurve,
    mouseDragged,
    keyPressed,
    bezierListLength: bezierList?.length || 0,
  };
};

export default useSketch;
