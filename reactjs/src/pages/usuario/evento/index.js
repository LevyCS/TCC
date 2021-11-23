import { EventTypeStyle } from './styled'
import Cabecalho from '../../../components/cabecalho'
import { Botao } from '../../../components/botoes/styled'
import { Link, useHistory } from 'react-router-dom'
import React, { useEffect, useRef, useState } from 'react'
import Cookies from 'js-cookie'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoadingBar from 'react-top-loading-bar'

export default function TelaEvento(props) {
    const ref = useRef(null);
    const[event, setEvent] = useState(props.location.state)
    const customId = "custom-id-yes";
    const navig = useHistory();

    const teste = () => {
        if(!Cookies.get('usuario-logado')) {
            return toast.dark('😅 Você precisa estar logado para comprar', {
                toastId: customId
            });;
        }
        navig.push({
            pathname: "/ingresso-compra",
            state: event });
    }

    function monthFormat(number) {
        let i = ""

        if ( number === 1 ) 
            i = "janeiro"
        else if ( number === 2)
            i = "fevereiro"
        else if ( number === 3 ) 
            i = "março"
        else if ( number === 4 )
            i = "abril"
        else if ( number === 5 )    
            i = "maio"
        else if ( number === 6 )    
            i = "junho"
        else if ( number === 7 )
            i = "julho"
        else if ( number === 8 )
            i = "agosto"
        else if ( number === 9 )
            i = "setembro"
        else if ( number === 10 )
            i = "outubro"
        else if ( number === 11 )
            i = "novembro"
        else
            i = "dezembro"

        return i;
    }

    function dateFormat (date) {
        let y = new Date(date);

        let m = y.getMonth()+ 1;
        let month = monthFormat(m);

        let b = (( y.getDate() )) + " de " + month + " de " + (( y.getFullYear() ));
        return b;
    }

    function hourFormat(hour) {
        let c = hour.substr(0,2);

        let b = hour.substr(3,3).substr(0,2);

        let d = parseInt(c) * 60 + parseInt(b);

        return d;

    }

    function yearFormat(old) {
        var e = old.substr(0,2);
        return e;
    }

    return (
        <EventTypeStyle background={event.imagemsecundaria}>
            <ToastContainer> </ToastContainer>
            <LoadingBar color='#13A06F' ref={ref} />
            <div className="try-container">
            <div class="ct-color">
                <div class="first-band">
                    <Cabecalho />
                    <div class="principal-image-title">
                        <div class="pric-image">
                            <img src={event.imagemcapa} alt="" width="200px" height="300px" />
                        </div>
                        <div class="princ-texts">
                            <div class="p-title"> {event.nomevento} </div>
                            <div class="p-description">
                                <ul>
                                    <li> <b> Gênero: </b> {event.gênero} </li>
                                    <li> <b> Duração: </b> {`${hourFormat(event.duracao)} minutos`} </li>
                                    <li> <b> Classificação etária: </b> {yearFormat(event.classificacao)} anos </li>
                                    <li> <b> Preço: </b> {`R$ ${event.preco}`} </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="second-band">
                    <div class="sinopsys"><b> Sinopse: </b> {event.sinopse} </div>
                    <div class="informations-about">
                        <div class="line-information">
                            <div class="icon-information">
                                <img src="/assets/images/eventTypeBall.svg" alt="" width="20px" height="20px" />
                            </div>
                            <div class="desc-information"> <b> Local: </b>  {event.local} </div>
                        </div>
                        <div class="line-information">
                            <div class="icon-information">
                                <img src="/assets/images/eventTypeBall.svg"  alt=""  width="20px" height="20px" />
                            </div>
                            <div class="desc-information"> <b> Elenco/Direção: </b>  {event.elenco} </div>
                        </div>
                        <div class="line-information">
                            <div class="icon-information">
                                <img src="/assets/images/eventTypeBall.svg"  alt="" width="20px" height="20px" />
                            </div>
                            <div class="desc-information"> <b> Data: </b>  {`de ${dateFormat(event.dataminima)} até ${dateFormat(event.datamaxima)}`} </div>
                        </div>
                    </div>
                </div>
                <div class="third-band">
                    <div class="button">
                        <Botao onClick={teste}> Adquirir Ingresso </Botao>
                    </div>
                </div>
            </div>
            </div>
        </EventTypeStyle>
    )
}

