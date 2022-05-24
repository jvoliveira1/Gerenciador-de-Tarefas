import Botao from "../button";
import Relogio from "./Relogio";
import style from "./Cronometro.module.scss"
import { tempoParaSegundos } from "../../common/utils/time";
import { ITarefa } from "../../types/tarefas";
import { useEffect, useState } from "react";

interface Props{
    selecionado :ITarefa | undefined,
    finalizarTarefa: () => void,
}

export default function Cronometro( {selecionado,finalizarTarefa}:Props ){
    const [tempo, setTempo] = useState<number>(0);
    const [ativo, setAtivo] = useState<boolean>(false);
    useEffect(() => {
        if (selecionado?.tempo){
            setTempo(tempoParaSegundos(selecionado.tempo))
        }
    },[selecionado])
    useEffect(()=>{  
        let decrementar: any
        if(ativo){
            console.log(tempo)
            decrementar = setInterval(()=>{
                
            if(tempo > 0){
                setTempo(tempo - 1);
                //return regressiva(contador -1) 
            }
            else {
                finalizarTarefa();
                setAtivo(false)
            }
            },1000);
        }
        return() => clearInterval(decrementar)   
    },[ativo, tempo])
    function comecar (){
        setAtivo(true)
    }
    function pausar (){
        setAtivo(false)
    }
    return(
        <div className={style.cronometro}>
            <p className={style.titulo}>Escolha um card e inicie o cronometro</p>
            <div className={style.relogioWrapper}>
                <Relogio tempo={tempo} />
            </div>
            <Botao onClick={() =>{
                ativo? pausar() : comecar()
                //setAtivo(!ativo);
                //regressiva(ativo)
            }}>
                {ativo?"Parar!":"Começar"} 
            </Botao>
        </div>
    )
}