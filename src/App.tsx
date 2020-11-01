import React from 'react'
import Sketch from "react-p5";
import { draw, setup } from './p5js';
// import { Container } from './styles';

const App: React.FC = () => {
  return <Sketch setup={setup} draw={draw}/>;
}

export default App;