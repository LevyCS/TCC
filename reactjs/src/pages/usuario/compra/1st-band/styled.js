import styled from 'styled-components'

const FaixaUm = styled.div `

    min-height: 100vh;
    display: flex;
    flex-direction: column;


.the-event {
    display: flex;
    flex-direction: column;
    position: relative;
    background-image: url('${(props) => props.background}');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 25%;
    height: 30em;

    opacity: 0.8;
    margin-bottom: 2vh;
}

.image {
    display: flex;
    align-self: center;
    position: absolute;
    top: 15em;

}

.image img {
    border-radius: 25px;
}

.the-qtd {
    display: flex;
    flex-direction: column;
    margin-top: 6em;
    margin-bottom: 2vh;

    align-items: center;
    justify-content: center;
    align-self: center;
}


.the-button {
    display: flex;
    justify-content: center;
    margin-top: 1em;
}

.bwb {
    border: none;
    border-radius: 5em;
    padding: 0.6em 3em;
    background-color: #F0F8FF;
    color: black;
    font-family: Roboto;
    font-weight: 900;
    font-size: 1em;

    cursor: pointer;
}

`

const TTT = styled.div`


    display: flex;
    flex-direction: row;
    justify-content: space-around;
    
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 0.8em;



.box-image-event {
    padding: 1em 3em 1em 3em;
}

.circle {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 50% 50%;
}

.box-qtd-event {
    padding: 0.5em 2em 0.5em 2em;
}

.box-ticket-price {
    margin-top: 1em;
    display: flex;
    flex-direction: row;
    justify-content: center;

    background-color: rgba(0, 0, 0, 0.3);
    padding: 0.6em;
    border-radius: 0.3em;
}

.box-title {
    font-size: 1.1em;

    margin-right: 1em;
}

.box-price {
    font-weight: 600;
}

.box-ticket-title {
    margin-top: 0.2em;
    font-weight: 800;
    font-size: 1.4em;

    margin-bottom: 1em;

}


`

const Cont = styled.div `


    display: flex;
    flex-direction: row;
    background-color: rgba(0, 0, 0, 0.3);
    padding: 0.5em 0.5em;
    border-radius: 0.5em;

    justify-content: space-around;


button {
    border: none;
    border: 2px solid white;
    background-color: transparent;
    color: white;
    border-radius: 0.2em;

    padding: 0.6em 0.8em;
    cursor: pointer;
}

.calculator-qtd {
    display: flex;
    align-items: center;
}

`

export { TTT, Cont, FaixaUm }