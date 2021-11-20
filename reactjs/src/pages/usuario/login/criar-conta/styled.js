import styled from "styled-components";

const CriarConta = styled.div`

    display: flex;
    flex-direction: column;
    text-align: center;

    background-image: url('https://i.pinimg.com/564x/fe/71/77/fe7177975e95d743d58ce9752a5e7dd7.jpg');
    background-repeat: no-repeat;
    background-size: 100%;
    height: 100vh;
    font-family: Roboto;
    justify-content: center;
    align-items: center;

.cadast-logo {
    background-image: url('/assets/images/LOGO TCC - P3 NWS 3.svg');
    background-size: 100% 100%;
}

.tela-cadastrese {
    background: rgba(47,79,79,0.7);
    border-radius: 20% 0;
    box-shadow: 1px 2px 5px rgba(47,79,79,0.7), 2px 4px 25px rgba(47,79,79,0.7);
    padding: 2em 7em;
}

.cadast-titulo {
    font-size: 2em;
    text-transform: uppercase;
    font-weight: 900;
    color: white;
    margin-bottom: 1em;
}

.cadast-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

input {
    border: none;
    background: transparent;
    outline: none; 
    border-bottom: 4px solid #2F4F4F; 
    width: 40em;
    padding: 1em 1em;
    margin-bottom: 1em;
    font-family: Roboto;
    color: white;
}

input::placeholder {
    color: white;
    opacity: 0.5; 
    font-weight: 450;
    font-size: 1.1em;
    padding-left: 1em;
}


input[type="date"] {
    text-transform: uppercase;
    color: white;
    
    font-weight: 700;
}

.cadast-bt {
    margin-top: 1em;
}

.img-perfil {
    display: flex;
    flex-direction: column;
    color: white;
    text-transform: capitalize;
    align-items: flex-start;
}

`

export { CriarConta } ;