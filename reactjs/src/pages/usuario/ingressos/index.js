import { Container } from './styled'
import Cabecalho from '../../../components/cabecalho'
import Box from './box'
import Api from '../../../service/apiUsers'
import { useHistory } from 'react-router';
import { useEffect, useState } from 'react';
const api = new Api();

export default function Ingressos(props) {
    const nav = useHistory();

    if (!props.location.state)
        nav.push('/')

    const [tickets, setTickets] = useState();
    console.log(tickets.hr_evento);

    const userTicket = async() => {
        let r = await api.getUserTickets(props.location.state)
        console.log(r)
        setTickets(r);
    }

    useEffect(() => {
        userTicket();
    }, [])

    return (
        <Container> 
        <Cabecalho />
            <div className="boxes">
                {!tickets ? <div> </div>
                    : tickets.map((item) => {
                    return <Box titulo={item.nomevento} local={item.local} tema={item.ds_tema} situacao={item.situacao} imgFundo={item.imagemfundo}/> })
                }       
            </div>
        </Container> 
    )
}