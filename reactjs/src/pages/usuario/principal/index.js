import Cabecalho from '../../../components/cabecalho'
import { Container } from './styled'
import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import DirBox from '../busca-direcionada/dir-box'

import { responsive } from './carousel';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoadingBar from 'react-top-loading-bar'

import Api from '../../../service/apiEvent.js'
const api = new Api();

export default function Principal() {
    const ref = useRef(null);

    const [test, setTest] = useState([]);
    const [itens, setItens] = useState([])

    async function listar () {
        ref.current.continuousStart();
        let r = await api.highlightedEvents();
        setTest(r);
        ref.current.complete();
    }
    
    useEffect(() => {
        listar();
    }, [])


    return (
        <Container>
        <ToastContainer> </ToastContainer>
        <LoadingBar color='#13A06F' ref={ref} />
        
         <Cabecalho />
           <div className="header"> 
                <div className="bg-white"> 
                    <img src="/assets/images/logo TCC com escrita.svg" alt="" />
                </div>
           </div>
           <div className="body"> 
                <div className="themes"> 
                    <div className="box-theme"> 
                        <img src="/assets/images/pecasEvento.svg" alt=""/> 
                        <p> A expressão da arte através da atuação. Clique aqui para ver mais sobre: </p>
                        <Link to={{
                            pathname: "/buscadirecionada",
                            search: "?categoria=3",
                            state: {
                                categoria: "Peças", img: "/assets/images/pecasEvento.svg"
                            }
                        }} className="Blink"> 
                            <button> peças </button> 
                        </Link>
                    </div>
                    <div className="box-theme"> 
                        <img src="/assets/images/showsEvento.svg" alt=""/> 
                        <p> A expressão da arte através da atuação. Clique aqui para ver mais sobre: </p>
                        <Link to={{
                            pathname: "/buscadirecionada",
                            search: "?categoria=4",
                            state: {
                                categoria: "Shows", img: "/assets/images/showsEvento.svg"
                            }
                        }} className="Blink" > <button> shows </button> </Link>
                    </div>
                    <div className="box-theme"> 
                        <img src="/assets/images/museusEvento.svg" alt=""/> 
                        <p> A expressão da arte através da atuação. Clique aqui para ver mais sobre: </p>
                        
                        <Link to={{
                            pathname: "/buscadirecionada",
                            search: "?categoria=5",
                            state: {
                                categoria: "Museus", img: "/assets/images/museusEvento.svg"
                            }
                        }} className="Blink" > <button> museus </button> </Link>
                    </div>
                </div>
                <div className="principal"> 
                    <div className = "Eventos"> 
                        <h1> EVENTOS EM DESTAQUE </h1>
                    </div>
                    <div className="event-top-scroll">
                        
                        <div className="all-events"> 
                        <Carousel 
                            responsive={responsive}
                            infinite={true}
                            showDots={true}
                            containerClass="container-class"
                        >
                            
                            { !test ? <div> </div> : test.map(item => <DirBox info={item} key={item.id} /> )}

                        </Carousel>

                        </div>
                        
                    </div>
                </div>
                <div className="rodape"> 
                    <div>
                       <a href="https://twitter.com/Newsideofc?t=KpBYUDFi5C9BBKhqVz4vgg&s=09"> <img src="/assets/images/@twiiter_media.png" alt="" className="socialmedia" /> </a>
                        <a href="www.facebook.com/thenewsideofevents"> <img src="/assets/images/@facebook_media.png" alt="" className="socialmedia" /> </a> 
                    </div>
                    <Link to='/admlogin'> <img src="/assets/images/LOGO TCC - de ladinho.svg" alt="" className="socialmedia" /> </Link> 
                    <div>
                        <a href="https://www.linkedin.com/in/new-side-0066b6225"> <img src="/assets/images/@linkedin_media.png" alt="" className="socialmedia" /> </a> 
                        <a href="https://www.instagram.com/newsideofc/"> <img src="/assets/images/@instagram_media.png" alt="" className="socialmedia" /> </a> 
                    </div>
                </div>
           </div>
        </Container>
    )
}