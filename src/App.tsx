import React, { useState } from 'react';
import Sketch from 'react-p5';
import useSketch from './hooks/useSketch';
import { Point } from './interfaces';

const App: React.FC = () => {
  const [add, setAdd] = useState<boolean>(false);
  const [bezierPointsList, setBezierPointsList] = useState<Point[][]>(
    [],
  );
  const [selected, setSelected] = useState<number>(-1);
  const {
    draw,
    setup,
    mouseClicked,
    handleDeleteCurrentCurve,
  } = useSketch({
    bezierPointsList,
    selected,
    add,
  });

  function makePoints(amount: number) {
    const points = new Array(amount).fill(0);
    return points.map((point) => ({
      x: Math.random() * 1024,
      y: Math.random() * 500,
    }));
  }

  function handleAdd() {
    // const newBezier = makePoints(5);
    // console.log(newBezier);
    // setBezierPointsList([...bezierPointsList, newBezier]);
    setAdd((add) => !add);
  }

  function handleDelete() {
    handleDeleteCurrentCurve();
  }

  function handleChangeCurve() {
    setSelected((selected) => selected + 1);
  }

  return (
    <div>
      <Sketch setup={setup} draw={draw} mouseClicked={mouseClicked} />

      <button type="button" onClick={handleAdd}>
        {!add
          ? 'Adicionar pontos de uma nova curva de bezier'
          : 'Criar curva com os pontos selecionados'}
      </button>

      <button type="button" onClick={handleDelete}>
        Delete current curve
      </button>

      <button type="button" onClick={handleChangeCurve}>
        Alternar entre as curvas
      </button>
    </div>
  );
};

export default App;
