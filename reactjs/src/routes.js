import { BrowserRouter,Switch, Route } from 'react-router-dom';
import ConfirmacaoCompra from './pages/administrativo/confirmacao-compra/index.js'
import NovaSenha from './pages/usuario/login/nova-senha/index.js'
import EsqueceuSenha from './pages/usuario/login/esqueceu-senha/index.js'
import ADMLogin from "./pages/administrativo/login/index.js";
import NWSCriarConta from "./pages/usuario/login/criar-conta";
import Cabecalho from "./components/cabecalho";
import NWSLogar from "./pages/usuario/login/logar"
import BuscaDireta from "./pages/usuario/busca-direta"
import Ingressos from './pages/usuario/ingressos/index.js';
import BuscaDirecionada from './pages/usuario/busca-direcionada/index.js';
import TelaInicial from './pages/usuario/principal'
import ADMPrincipal from './pages/administrativo/adm-principal/index.js';
import ADMRelatorios from './pages/administrativo/relatorio/index.js';
import TelaEvento from './pages/usuario/evento/index.js';
import TelaCrud from './pages/administrativo/crud'
import GestaoUsuario from './pages/administrativo/gestao-usuarios'
import UserProfile from './pages/usuario/perfil/index.js';
import AllBuy from './pages/usuario/compra/index.js';
import AddEvent from './pages/administrativo/adicionar-evento/index.js';
import AddSession from './pages/administrativo/adicionar-sessoes/index.js';
import UpdateEvent from './pages/administrativo/alterar-evento/index.js';


export default function Routes() {
    return (
        <BrowserRouter>
            <Switch> 
                <Route path="/" exact={true} component={TelaInicial} /> 
                <Route path="/criarconta"  component={NWSCriarConta} />
                <Route path="/cabecalho"  component={Cabecalho} />
                <Route path="/logar"  component={NWSLogar} />
                <Route path="/compra"  component={ConfirmacaoCompra} />
                <Route path="/inicial" component={TelaInicial} />
                <Route path="/novasenha"  component={NovaSenha} />
                <Route path="/esqueceusenha"  component={EsqueceuSenha} />
                <Route path="/admlogin" component={ADMLogin} />
                <Route path="/buscadireta" component={BuscaDireta} />
                <Route path="/buscadirecionada" component={BuscaDirecionada} />
                <Route path="/ingressos" component={Ingressos} />
                <Route path="/admprincipal" component={ADMPrincipal} />
                <Route path="/relatorios" component={ADMRelatorios} />
                <Route path="/eventos" component={TelaEvento} />
                <Route path="/crud" component={TelaCrud} />
                <Route path="/usuario" component={GestaoUsuario} />
                <Route path="/profile" component={UserProfile} />
                <Route path="/ingresso-compra" component={AllBuy} />
                <Route path="/addevent" component={AddEvent} />
                <Route path='/addsession' component={AddSession} />
                <Route path='/updateevent' component={UpdateEvent} />
            </Switch>
        </BrowserRouter>
    )
}

