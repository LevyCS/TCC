import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Api from "../../../service/apiBuy";
import BuyFirstBand from "./1st-band";
import BuySecondBand from "./2nd-band";
import BuyThirdBand from "./3rd-band";
import { Everything } from "./styled";
import { Validador } from '../../../components/commum/index'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoadingBar from 'react-top-loading-bar'

 
const api = new Api();


export default function AllBuy (props) {
    const ref = useRef(null)
    const navig = useHistory();

    function lerUsuarioLogado (navigation, toast) {
        let logado = Cookies.get('usuario-logado')
        if (logado == null) {
            toast.dark('😢 Você deve estar logado para comprar');

            
            navigation.push('/logar')
            return null;
        }
        let usuarioLogado = JSON.parse(logado);
        return usuarioLogado; 
    }


    const usuarioLogado = lerUsuarioLogado(navig, toast) || {};
    
    const [event, setEvent] = useState(props.location.state);
    const [user, setUser] = useState(usuarioLogado);

    const [qtd, setQtd] = useState(1)
    const [cardNumber, setCardNumber] = useState('');
    const [cardOwner, setCardOwner] = useState('');
    const [cvc, setCvc] = useState('');
    const [validity, setValidity] = useState('');
    const [cpf, setCpf] = useState();
    const [paymentMethod, setPaymentMethod] = useState('');
    const [hours, setHours] = useState([]);
    const [ticketValue, setTicketValue] = useState(event.preco)

    const [infoReadOnly, setInfoReadOnly] = useState();
    const [infoPrevia, setInfoPrevia] = useState({});

    const [exibindo, setExibindo] = useState(0);


    const alterarQtd = (qtd) => {
        setQtd(qtd);
    }

    const updateTicketValue = (op) => {
        if (op == "somar") {
            setTicketValue(Math.round((Number(ticketValue) + Number(event.preco)) * 100) / 100);
        }
        else if (op == "sub") {
            setTicketValue(Math.round((Number(ticketValue) - Number(event.preco)) * 100) / 100);
        }
    }

    const zeroToOne = () => {
        console.log(user)
        setExibindo(1);
        setInfoReadOnly({
            evento: event.nomevento,
            valor: ticketValue,
            categoria: event.ds_tema,
            comprador: user.nm_usuario,
            email: user.ds_email,
            cpf: user.ds_cpf,
            qtd: qtd
        })
    }

    const updateFieldHour = (hour, i) => {
        if (!hour) {
            return;
        }
        var r = [...hours]
        r[i] = hour

        setHours(r)
    }

    const OnetoTwo = () => {
        setExibindo(2);
    }

    const getCreditCard = (cardNumber, cardOwner, cvc, validity, cpf, paymentMethod) => {
        setCardNumber(cardNumber)
        setCardOwner(cardOwner)
        setCvc(cvc)
        setValidity(validity)
        setCpf(cpf)
        setPaymentMethod(paymentMethod)
        console.log(paymentMethod)
    }


    const createVendaItem = async () => {
        let r = await api.finishBuy(cardNumber, cardOwner, cvc, validity, cpf, user.id_usuario, event.id_evento, paymentMethod, hours, qtd);
        if(!Validador(r))
            return;

        toast.dark('Compra concluída')
      
    }

    useState(() => {

    })

    return (
        <Everything>
            <ToastContainer> </ToastContainer>
            <LoadingBar color='#13A06F' ref={ref} />
                {exibindo == 0 &&
                    <BuyFirstBand onUpdate={alterarQtd} value={qtd} onValueChange={updateTicketValue} ticketValue={ticketValue} imagemcapa={event.imagemcapa} imagemfundo={event.imagemfundo} updateScreen={zeroToOne}/>
                }
                {exibindo == 1 && 
                    <BuySecondBand info={infoReadOnly} idEvent={event.id_evento} updateFieldHour={updateFieldHour} updateScreen={OnetoTwo}/>
                }
                {
                    exibindo == 2 && 
                    <BuyThirdBand  cardInformation={getCreditCard} updateScreen={createVendaItem}/>
                }
        </Everything>
    )
    
}
