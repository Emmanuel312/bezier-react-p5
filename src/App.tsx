import React, { useState } from 'react';
import Sketch from 'react-p5';
import useSketch from './hooks/useSketch';
import { Point } from './interfaces';

// const bezier0: Point[] = [
//   { x: Math.random() * 400, y: Math.random() * 400 },
//   { x: Math.random() * 400, y: Math.random() * 400 },
//   { x: Math.random() * 400, y: Math.random() * 400 },
// ];

// const bezier1: Point[] = [
//   { x: Math.random() * 400, y: Math.random() * 400 },
//   { x: Math.random() * 400, y: Math.random() * 400 },
//   { x: Math.random() * 400, y: Math.random() * 400 },
// ];

// const bezier2: Point[] = [
//   { x: Math.random() * 400, y: Math.random() * 400 },
//   { x: Math.random() * 400, y: Math.random() * 400 },
//   { x: Math.random() * 400, y: Math.random() * 400 },
// ];

const App: React.FC = () => {
  const [bezierPointsList, setBezierPointsList] = useState<Point[][]>(
    [],
  );
  const { draw, setup } = useSketch({ bezierPointsList });

  function handleAdd() {
    console.log(`foi`);
    const newBezier = [
      { x: Math.random() * 400, y: Math.random() * 400 },
      { x: Math.random() * 400, y: Math.random() * 400 },
      { x: Math.random() * 400, y: Math.random() * 400 },
    ];
    setBezierPointsList([...bezierPointsList, newBezier]);
  }

  return (
    <div>
      <Sketch setup={setup} draw={draw} />

      <button type="button" onClick={handleAdd}>
        click
      </button>
    </div>
  );
};

export default App;
