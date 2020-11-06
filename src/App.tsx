import React, { useEffect, useState, Fragment, Component } from 'react';
import Sketch from 'react-p5';
import useSketch from './hooks/useSketch';
import SideBar from './SideBar';
import './style/App.css'


const App: React.FC = () => {
  const [add, setAdd] = useState<boolean>(false);
  const [evaluationAmount, setEvaluationAmount] = useState<string>(
    '10',
  );
  const [selected, setSelected] = useState<number>(0);
  const {
    draw,
    setup,
    mouseClicked,
    handleDeleteCurrentCurve,
    bezierListLength,
    mouseDragged,
    keyPressed,
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
    console.log(bezierListLength);
    setSelected((selected) =>
      bezierListLength ? (selected + 1) % (bezierListLength + 1) : 0,
    );
  }

  return (
    <div>
      <div className="header">
        <div className="headerContent">
          <p>Processamento Gráfico</p>
        </div>
      </div>
      <div className="page">
        <div className="sideBBar">
          <p className="center">Curva de Bezier</p>
          <div className="line"><></></div>
          <div className="footer">
            <p>Rodrigo Ferreira - rfop@cin.ufpe</p>
            <p>Emmanuel Felipe - efn@cin.ufpe.br</p>
          </div>
          
        </div>
        <div className="content">
          <div style={bodyStyle}>
            <Sketch
              setup={setup}
              draw={draw}
              keyPressed={keyPressed}
              mouseClicked={mouseClicked}
              mouseDragged={mouseDragged}
            />
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
        </div>
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



export default App;
