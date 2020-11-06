import React, { useEffect, useState } from 'react';
import Sketch from 'react-p5';
import useSketch from './hooks/useSketch';

const App: React.FC = () => {
  const [add, setAdd] = useState<boolean>(false);
  const [evaluationAmount, setEvaluationAmount] = useState<string>(
    '10',
  );
  const [selected, setSelected] = useState<number>(-1);
  const {
    draw,
    setup,
    mouseClicked,
    handleDeleteCurrentCurve,
    bezierListLength,
  } = useSketch({
    selected,
    add,
    evaluationAmount,
  });

  function handleAdd() {
    setAdd((add) => !add);
  }

  function handleDelete() {
    handleDeleteCurrentCurve();
  }

  function handleChangeCurve() {
    setSelected((selected) => (selected + 1) % bezierListLength);
  }

  return (
    <div style={bodyStyle}>
      <div style={sideBar}>
        <p>asdsa</p>
      </div>
      <Sketch setup={setup} draw={draw} mouseClicked={mouseClicked} />
      <div style={btnStyle}>
        <button type="button" onClick={handleAdd}>
          {!add
            ? 'Adicionar pontos de uma nova curva de bezier'
            : 'Criar curva de bezier'}
        </button>
        {add && (
          <>
            <label>Numero de avaliação da curva atual</label>
            <input
              type="text"
              value={evaluationAmount}
              onChange={(e) => setEvaluationAmount(e.target.value)}
            />
          </>
        )}
        <button type="button" onClick={handleDelete}>
          Delete current curve
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
};

const bodyStyle = {
  display: 'flex',
  justifyContent: 'center' as 'center',
  alignItems: 'center',
  flex: 1,
  flexDirection: 'column' as 'column',
  height: '100vh',
};

const sideBar = {
  display: 'flex',
  justifyContent: 'flex-start' as 'flex-start',
  background: 'red',
};

export default App;
