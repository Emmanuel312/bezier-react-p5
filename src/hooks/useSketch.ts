import p5Types, { Vector } from 'p5'; // Import this for typechecking and intellisense
import { useCallback, useEffect } from 'react';
import { ISketchProps } from '../interfaces';

const WIDTH = 1024;
const HEIGHT = 500;

let bezierList: any[][] = [];
let t: number;
let bezier: Vector[];
let current: number;
let addCurve: boolean;
let currentCurve: any[] = [];
let clickAmount: number = 0;

const useSketch = ({
  pointAmount,
  selected,
  add,
  setAdd,
}: ISketchProps) => {
  useEffect(() => {
    // bezierList = bezierPointsList;
    current = Number(selected);
    addCurve = add;
    if (!add && currentCurve?.length) {
      bezierList.push(currentCurve);
      currentCurve = [];
    }
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

  function bezierCurve(P5: p5Types, points: Vector[]) {
    P5.noFill();
    for (t = 0; t <= 1; t += 0.1) {
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
      // P5.frameRate(1);
      P5.createCanvas(WIDTH, HEIGHT).parent(canvasParentRef);
      // bezierList = bezierPointsList.map((bezier) =>
      //   bezier.map((point) => P5.createVector(point.x, point.y)),
      // );
      t = 0;
      bezier = [];
    },
    [],
  );

  const draw = useCallback((P5: p5Types) => {
    P5.background(220);
    P5.strokeWeight(5);
    bezierList.forEach((bezier) =>
      bezier.forEach((p) => P5.point(p.x, p.y)),
    );

    currentCurve?.forEach((p) => P5.point(p.x, p.y));

    for (let index = 0; index < bezierList.length; index++) {
      if (current === index) {
        P5.stroke(255, 0, 0);
      } else {
        P5.stroke(0, 0, 0);
      }
      bezierCurve(P5, bezierList[index]);
      P5.stroke(0, 0, 0);
    }
    // P5.noLoop();
  }, []);

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
        clickAmount++;
      }

      if (clickAmount === Number(pointAmount)) {
        setAdd(false);
        console.log(clickAmount, Number(pointAmount));
        console.log(`fim boy`);
        clickAmount = 0;
      }
    },

    [add, currentCurve, pointAmount],
  );

  return {
    draw,
    setup,
    mouseClicked,
    handleDeleteCurrentCurve,
    bezierListLength: bezierList?.length || 0,
  };
};

export default useSketch;
