import { Botao } from "../../../../components/botoes/styled"
import { CriarConta } from "./styled"
import { useHistory } from "react-router-dom"
import Api from '../../../../service/apiUsers'
import { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoadingBar from 'react-top-loading-bar'

const api = new Api();

export default function NWSCriarConta () {
    const ref = useRef(null);
    const navigation = useHistory();

    const [nmUsu, setNmUsu] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [senha, setSenha] = useState('');
    const [nascimento, setNascimento] = useState();
    const [imagem, setImagem] = useState('');
    const [senha1, setSenha1] = useState('');
    const [senha2, setSenha2] = useState('');


    const createUser = async() => {
        ref.current.continuousStart();
        if(senha1 == senha2) 
            setSenha(senha1);
        else {
            toast.dark(' 😢 As senhas precisam ser iguais')
            ref.current.complete();
            return;
        }
        const formData = new FormData();
        formData.append('nmUsu', nmUsu)
        formData.append('cpf', cpf)
        formData.append('email', email)
        formData.append('username', username)
        formData.append('senha', senha)
        formData.append('nascimento', nascimento)
        formData.append('imagem', imagem)

        let r = await api.userCreate(formData);
        
        if (!validarResposta(r)) {
            ref.current.complete();
            return;
        }
        
        toast.dark( '😀 Conta criada com sucesso')
        ref.current.complete();
        setTimeout(() => {navigation.push('/logar')}, 3000);
    }

    const validarResposta = (resp) => {
        if (!resp.erro)
            return true
        toast.dark(resp.erro)
        return false
    }

    return (
        <CriarConta>
            <ToastContainer> </ToastContainer>
            <LoadingBar color='#f11946' ref={ref} />
            <div class="cadast-logo">
                
                <div class="tela-cadastrese">
                    <div class="cadast-titulo"> Cadastre-se </div>
                    <div class="cadast-form">
                        <input type="text" placeholder="Nome Completo" onChange={e => setNmUsu(e.target.value)}/>
                        <input type="text" placeholder="CPF" onChange={e => setCpf(e.target.value)}/>
                        <input type="text" placeholder="E-mail" onChange={e => setEmail(e.target.value)} />
                        <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)}/>
                        <input type="password" placeholder="Senha" onChange={e => setSenha1(e.target.value)} />
                        <input type="password" placeholder="Senha (confirmação)" onChange={e => setSenha2(e.target.value)} />
                        <input type="date" name="" id="" onChange={e => setNascimento(e.target.value)}/>
                        <div className="img-perfil">
                            <label> Imagem de perfil </label>
                            <input type="file" placeholder="Imagem de perfil" onChange={e => setImagem(e.target.files[0])} />
                        </div>
                    </div>
                    <div class="cadast-bt">
                        <div className="Blink" onClick={() => createUser()} > <Botao> Criar conta </Botao> </div>
                    </div>
                </div>
            </div>
        </CriarConta>
    )
}