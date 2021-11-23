import React, { useState } from 'react';
import { Botao } from '../../../components/botoes/styled'
import { Container } from './styled';
import Api from '../../../service/apiEvent';
import { Link } from 'react-router-dom';
import { Validador } from '../../../components/commum';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BoxUpdate from './boxUpdate';

const api = new Api();

export default function UpdateEvent (props) {

    const event = props.location.state;
    console.log(props.location)

    const [nmEvento, setNmEvento] = useState(event.nomevento);
    const [categoria, setCategoria] = useState(event.ds_tema);
    const [duracao, setDuracao] = useState(event.duracao);
    const [classificacao, setClassificacao] = useState(event.classificacao);
    const [valorIngresso, setValorIngresso] = useState(event.preco);
    const [local, setLocal] = useState(event.local);
    const [dtMin, setDtMin] = useState((event.dataminima).substring(0, 10));
    const [dtMax, setDtMax] = useState((event.datamaxima).substring(0, 10));
    const [elenco, setElenco] = useState(event.elenco);
    const [descEvento, setDescEvento] = useState(event.sinopse);
    const [imgCapa, setImgCapa] = useState('');
    const [imgFundo, setImgFundo] = useState('');
    const [imgSec, setImgSec] = useState('');
    const [genero, setGenero] = useState(event.gênero);

    const [dates, setDates] = useState([]);
    
    const jsonFormat = () => {
        let r = dates;
        event.infoc_nws_tb_calendarios.map(item => {
            var hours = [];
            item.infoc_nws_tb_calendario_items.map(item2 => {
                hours.push(item2.hr_evento)
            })

            r.push({
                data: item.dt_evento,
                horarios: hours
            })
        })

        setDates(r);    
    }

    useState(() => {
        jsonFormat()
    }, [])

    const [idAlterando, setIdAlterando] = useState(event.id_evento);

    const createEvent = async () => {
        let formData = new FormData();
        formData.append('nmEvento', nmEvento)
        formData.append('categoria', categoria)
        formData.append('duracao', duracao)
        formData.append('classificacao', classificacao)
        formData.append('valorIngresso', valorIngresso)
        formData.append('local', local)
        formData.append('dtMin', dtMin)
        formData.append('dtMax', dtMax)
        formData.append('elenco', elenco)
        formData.append('descEvento', descEvento)
        formData.append('images', imgCapa) 
        formData.append('images', imgFundo)
        formData.append('images', imgSec)  

        formData.append('genero', genero)

        
        let r = await api.crudCreateEvents(formData)
        if (!Validador(r)){
            return;
        }
        return r;
    }

    const updateDate = (valor, pos) => {
        var r = dates;
        r[pos] = {
            data: valor,
            horarios: [...r[pos].horarios]
        }

        setDates(r);
    }

    const updateHour = (value, pos, date) => {
        var r = dates;

        var x = r[date].horarios;

        x[pos] = value

        console.log(x)

        r[date] = {
            data: r[date].data,
            horarios: x
        }
    }

    return (
        <Container>
            <ToastContainer> </ToastContainer>
            <div className="title">
                <div className="the-polygon"> <img src="/assets/images/play-button.png" alt="" width="40em" hwight="40em" /> </div>
                <div className="the-title"> Alterando Evento  </div>
            </div>
            <div className="principal-box">
                <div className="boxes">
                    <div className="row">
                        <div className="mini-box">
                            <label for=""> Gênero: </label>
                            <input type="text" value={genero} onChange={e => setGenero(e.target.value)}/>
                        </div>
                        <div className="mini-box">
                            <label for=""> Nome do evento: </label>
                            <input type="text" clasNames="event-name" value={nmEvento} onChange={e => setNmEvento(e.target.value)} />
                        </div>
                        <div className="mini-box">
                            <label for=""> Duração: </label>
                            <input type="time" clasNames="event-name" value={duracao} onChange={e => setDuracao(e.target.value)}/>
                        </div>
                        <div className="mini-box">
                            <label for=""> Local: </label>
                            <input type="text" clasNames="event-name" value={local} onChange={e => setLocal(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="column">
                            <div className="row">
                                    <div className="mini-box">
                                        <label for=""> Categoria: </label>
                                        
                                        <select onChange={e => setCategoria(e.target.value)}>
                                            <option value={0}> selecione uma categoria... </option>
                                            <option value= 'peças'> Peças </option>
                                            <option value= 'shows'> Shows </option>
                                            <option value= 'museus'> Museus </option>
                                        </select>
                                    </div>
                                    <div className="mini-box">
                                        <label for=""> Elenco: </label>
                                        <input type="text" value={elenco} onChange={e => setElenco(e.target.value)} />
                                    </div>      
                            </div>
                            <div className="row">
                                <div className="mini-box">
                                    <label for=""> Classificação Etária: </label>
                                    <input type="number" value={classificacao} onChange={e => setClassificacao(e.target.value)}/>
                                </div>
                                <div className="mini-box">
                                    <label for=""> Valor do Ingresso: </label>
                                    <input type="number" value={valorIngresso} onChange={e => setValorIngresso(e.target.value)}/>
                                </div>
                        </div>
                        </div>
                        <div className="column">
                            <div className="date-ff">
                                <div className="mini-box">
                                    <label for=""> Data Início: </label>
                                    <input type="date" value={dtMin} onChange={e => setDtMin(e.target.value)}/>
                                </div>
                                <div className="mini-box">
                                    <label for=""> Data Final: </label>
                                    <input type="date" value={dtMax} onChange={e => setDtMax(e.target.value)}/>
                                </div>
                            </div>   
                        </div>
                    </div>

                    <div className="row">
                        <div className="column">
                            <div className="mini-box">
                                <label for=""> Imagem Principal: </label>
                                <input className="image" type="file" onChange={e => setImgCapa(e.target.files[0])}/> 
                            </div>
                            <div className="mini-box">  
                                <label for=""> Imagem de Fundo: </label>
                                <input type="file"  onChange={e => setImgFundo(e.target.files[0])}/>
                            </div>
                            <div className="mini-box">
                                <label for=""> Imagem Secundária: </label>
                                <input type="file" onChange={e => setImgSec(e.target.files[0])}/>
                            </div>
                        </div>
    
                        <div className="column">
                            <label for=""> Descrição: </label>
                            <textarea name="" id="" cols="30" rows="10"  value={descEvento} onChange={e => setDescEvento(e.target.value)}></textarea>
                        </div>
                    </div>
                </div>
                
                <BoxUpdate dates={dates} updateDate={updateDate}/>
            </div>
            <div className="last-button"> 
                <Botao onClick={() => createEvent()}> Alterar Evento </Botao>
            </div>
        </Container>
    )
}  