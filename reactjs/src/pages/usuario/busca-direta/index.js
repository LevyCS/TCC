import { Container } from './styled'
import Cabecalho from '../../../components/cabecalho'
import DirBox from '../busca-direcionada/dir-box'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'
import React, { useEffect, useState, useRef } from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoadingBar from 'react-top-loading-bar'

import Api from '../../../service/apiEvent'
const api = new Api ();



export default function BuscaDireta(props) {

    const[event, setEvent] = useState([]);
    const navig = useHistory();
    let mySearch = getQuery('search');
    const ref = useRef(null);

    function getQuery(name) {
        return new URLSearchParams(props.location.search).get(name);
    }

    async function listar() {

        let mySearch = getQuery('search');
        ref.current.continuousStart();
        if(mySearch !== null) {
            const resp = await api.directSearch(mySearch);
            console.log(resp)
            setEvent(resp);
        }
        ref.current.complete();
        
    }

    useEffect(() => {
        listar();
    }, [mySearch]);

    return (
        <Container>
            <ToastContainer> </ToastContainer>
            <LoadingBar color='#f11946' ref={ref} />
            <Cabecalho />
            <div className="secondary-container"> 
                <div className="search">
                    <div> Você buscou por...  <b> " {mySearch} " </b> </div>
                    <div> Encontramos isso: </div>
                </div>
                {event.map((item) =>
                    < DirBox key={item.id_evento} info={item} />
                )}
                
            </div>
        </Container>
    )
}