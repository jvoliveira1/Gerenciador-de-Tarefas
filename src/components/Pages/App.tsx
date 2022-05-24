import React, { useState } from 'react';
import { ITarefa } from '../../types/tarefas';
import Cronometro from '../cronometro';
import Formulario from '../formulario';
import Lista from '../Lista';
import style from './App.module.scss';

function App() {
  const [tarefas, setTarefas] = useState <ITarefa[]> ([]);
  const [selecionado, setSelecionado ] = useState<ITarefa>();
  
  function selecionaTarefa (tarefaSelecionada: ITarefa){
    setSelecionado(tarefaSelecionada);
    setTarefas(trefasAnteriores => trefasAnteriores.map(tarefa => ({
      ...tarefa,
      selecionado: tarefa.id === tarefaSelecionada.id ? true : false
    }) ));
  }

  function finalizarTarefa(){
    if(selecionado){
      setSelecionado(undefined)
      setTarefas(trefasAnteriores => trefasAnteriores.map(tarefa =>{
        if(tarefa.id === selecionado.id){
          return{
            ...tarefa,
            selecionado:false,
            completado: true
          }
        }
        return tarefa;
      }))
    }
  }

  return (
    <div className={style.AppStyle}>
      <Formulario setTarefas={setTarefas}/>
      <Lista 
        tarefas={tarefas} 
        selecionaTarefa={selecionaTarefa}
      />
      <Cronometro 
        selecionado={selecionado} 
        finalizarTarefa={finalizarTarefa}
      />
    </div>
  );
}

export default App;