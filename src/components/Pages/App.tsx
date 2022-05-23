import React from 'react';
import Cronometro from '../cronometro';
import Formulario from '../formulario';
import Lista from '../Lista';
import style from './App.module.scss';

function App() {
  return (
    <div className={style.AppStyle}>
      <Formulario/>
      <Lista />
      <Cronometro />
    </div>
  );
}

export default App;
