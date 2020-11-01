import p5Types, { Vector } from 'p5'; // Import this for typechecking and intellisense
import { useCallback, useEffect, useState } from 'react';

import { ISketchProps } from '../interfaces';

let bezierList: any[][];
let t: number;
let bezier: Vector[];

const useSketch = ({ bezierPointsList }: ISketchProps) => {
  useEffect(() => {
    console.log(`executou`);
    bezierList = bezierPointsList;
  }, [bezierPointsList]);

  function casteljau(
    P5: p5Types,
    points: Vector[],
    t: number,
  ): Vector {
    let result: Vector[] = points;
    let aux: Vector[] = [];

    while (aux.length !== 1) {
      aux = [];
      for (let i = 1; i < result.length; i++) {
        const medPoint = P5.createVector(
          (1 - t) * points[i - 1].x + t * points[i].x,
          (1 - t) * points[i - 1].y + t * points[i].y,
        );
        aux.push(medPoint);
      }
      result = aux;
    }

    return result[0];
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

    return casteljau(P5, result, t);
  }

  function bezierCurve(P5: p5Types, points: Vector[]) {
    P5.noFill();
    for (t = 0; t <= 1; t += 0.01) {
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
      // setP5Object(P5);
      P5.createCanvas(400, 400).parent(canvasParentRef);
      bezierList = bezierPointsList.map((bezier) =>
        bezier.map((point) => P5.createVector(point.x, point.y)),
      );
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

    bezierList.forEach((bezier) => bezierCurve(P5, bezier));

    // P5.noLoop();
  }, []);

  return { draw, setup };
};

export default useSketch;
