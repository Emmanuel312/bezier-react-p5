import React, { useEffect, useState } from 'react';
import Sketch from 'react-p5';
import useSketch from './hooks/useSketch';

const App: React.FC = () => {
  const [add, setAdd] = useState<boolean>(false);
  const [pointAmount, setPointAmount] = useState<string>('1');
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
    pointAmount,
    setAdd,
  });

  // useEffect(() => {
  //   if(!add)
  //   {
  //     setPointAmount("")
  //   }
  // }, [add])

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
    <div>
      <Sketch setup={setup} draw={draw} mouseClicked={mouseClicked} />

      <button type="button" onClick={handleAdd}>
        {!add
          ? 'Adicionar pontos de uma nova curva de bezier'
          : 'Criar curva com os pontos selecionados'}
      </button>
      {add && (
        <>
          <label>quantidade de pontos de controle</label>
          <input
            type="text"
            value={pointAmount}
            onChange={(e) => setPointAmount(e.target.value)}
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
  );
};

export default App;
