import { Container } from './styled'
import { Table_header, Table_content2 } from './table'
import { ButtonLeftImage } from './buttons'
import { Link, useHistory } from 'react-router-dom'
import Api from '../../../service/apiEvent'
import { Validador } from '../../../components/commum/index'
import { useRef, useState } from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoadingBar from 'react-top-loading-bar'

const api = new Api();

export default function Crud() {
    const navig = useHistory();
    const ref = useRef(null);

    const [eventos, setEventos] = useState();
    
    const getEvents = async (nome, categoria) => {
        
        let r = await api.crudGetEvents(nome, categoria);
        if(!Validador(r)) {
            ref.current.complete();
            return;
        }
        setEventos(r);
    
    }

    const deleteEvent = async (id) => {
        ref.current.continuousStart();
        let r = await api.crudDeleteEvents(id);
        if(!Validador(r)) {
            ref.current.complete();
            return;
        }

        toast.dark('😀 Evento excluído do sistema')
        getEvents('','');
        ref.current.complete()
    

    }

    useState(() => {
        getEvents('', '');
    }, [])

    return (
        <Container>
            <ToastContainer> </ToastContainer>
            <LoadingBar color='#13A06F' ref={ref} />
            <h1> GERENCIADOR DE EVENTOS </h1>
            <div className="inputs">
                <div className="agp-input">
                    <input placeholder="Filtrar por Nome" onChange={(e) => getEvents(e.target.value, '')}/>
                    
                    <input placeholder="Filtro por categoria" onChange={(e) => getEvents('', e.target.value)}/>
                </div>
                <Link to="/addevent"> <ButtonLeftImage texto="Novo Evento" imagem="assets/images/acao_novoEvento.png" /> </Link>
            </div>   
            <table>
                <Table_header titulo1="Evento" titulo2="Genêro" titulo3="Ações"/>
                {!eventos ? <div> </div> : eventos.map(item => {
                    return <Table_content2 key={item.id_evento} campo1={item.nomevento} campo2={item.gênero} info={item} onDelete={deleteEvent} />
                })}
            </table>
        </Container>        
    )
}