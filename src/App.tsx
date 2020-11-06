import React, { useState } from 'react';
import Sketch from 'react-p5';
import { Z_FIXED } from 'zlib';
import useSketch from './hooks/useSketch';
import { Point } from './interfaces';

const App: React.FC = () => {
  const [bezierPointsList, setBezierPointsList] = useState<Point[][]>(
    [],
  );
  const [selected, setSelected] = useState<number>(-1);
  const { draw, setup } = useSketch({ bezierPointsList, selected });

  function makePoints(amount: number) {
    const points = new Array(amount).fill(0);
    return points.map((point) => ({
      x: Math.random() * 1024,
      y: Math.random() * 500,
    }));
  }

  function handleAdd() {
    const newBezier = makePoints(5);
    console.log(newBezier);
    setBezierPointsList([...bezierPointsList, newBezier]);
  }

  function handleDelete() {
    const newBezier = makePoints(5);
    console.log(newBezier);
    const { length } = bezierPointsList;
    setBezierPointsList(
      bezierPointsList.filter(
        (bezierPoints, index) => index !== length - 1,
      ),
    );
  }

  function handleChangeCurve() {
    setSelected((selected) => selected + 1);
  }

  console.log(selected);

  
  return (
    <div style={bodyStyle}>
      <Sketch setup={setup} draw={draw} />
      <div style={btnStyle}>
        <button type="button" onClick={handleAdd}>
          ADD RANDOM CURVE
        </button>

        <button type="button" onClick={handleDelete}>
          REMOVE LAST RANDOM CURVE
        </button>

        <button type="button" onClick={handleChangeCurve}>
          Alternar entre as curvas
        </button>
      </div>
    </div>
  );
};

const btnStyle = {
  display: 'flex',
  flexDirection: 'row' as 'row',
}


const bodyStyle = {
  display: 'flex',
  justifyContent: 'center' as 'center',
  alignItems: 'center',
  flex: 1,
  flexDirection: 'column' as 'column',
  height: '100vh',
}




export default App;
