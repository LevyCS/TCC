import styled from 'styled-components'

const Container = styled.div`

    * {
        text-decoration: none;
        color: white;
    }

    .header {
        padding-top: 20px; 
        background-image: url('https://i.pinimg.com/564x/bd/d4/da/bdd4dad6eb7c1051df036fe93c98441b.jpg');
        display: flex;
        flex-direction: column;
        align-items: center;

        background-position: center;
        background-size: 100% auto;
        background-attachment: fixed; 
        background-repeat: cover; 
        height: 95vh;
    }

    .bg-white {
        background: #2F4F4F;
        width: 50vh;
        height: 50vh;
        border-radius: 50%;

        display: flex;
        align-items: center;
        justify-content: center;
        
        margin: 12rem 0px;

    }

    .bg-white img {
        height: 100%;
        width: 100%;
        fill: white;
    }
            
    .body {
        background: linear-gradient(180deg, rgba(23, 61, 64, 0.92) 0%, rgba(23, 61, 64, 0.899330) 15%, rgba(47, 79, 79, 0.90) 38.42%, rgba(47, 79, 79, 0.90) 40.42%);
        min-height: 100vh;
    }
    
    .themes {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        padding: 5rem 5rem;
    }

    .box-theme {
        text-align: center;
        width: 18em;
        box-shadow: 1px 2px 5px rgba(47,79,79,0.7), 5px 10px 25px black;
        padding: 2.5em 2.5em; 
    }

    .box-theme > img {
        height: 18vh;
        width: auto;
    }

    .box-theme p {
        color: white;
    }

    button {
        border: none;
        border-radius: 5em;
        padding: 0.6em 3em;
        background-color: #F0F8FF;
        color: black;
        font-family: Roboto;
        font-weight: 900;
        text-transform: uppercase;
        font-size: 0.9em;

        cursor: pointer;
    }

    .principal {
        color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: rgba(196, 196, 196, 0);
    }

    .principal h1 {
        margin: 4rem 0px 4rem 0px;
    }

    .event-top-scroll {
        padding: 1em;
        margin: 5em;
        height: 28em;
    }

    .all-event {
        padding: 2em;
        height: 20em;
    }


    .box {
        display: flex;
        flex-direction: row;
        align-self: center;

        max-width: 100%;
        background: #2F4F4F;
        border-radius: 10px;
        padding: 2em;

        margin: 2.2% 9%;
        margin-bottom: 2em;
        box-shadow: 1px 2px 5px rgb(47 79 79 / 70%), 5px 10px 25px black;
    }

    // .box-principal:last-child {
    //     margin-bottom: 0px;
    // }

    .box-principal img {
        padding: 0px 3rem ;
        margin: 1%;
    }

    .box-text {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        margin: 3% 5%; 
    }

    .box-text p {
        font-size: 1em;
    }

    .box-text h1 {
        margin: 0px;
        text-align: center; 
    }

    .box-text button {
        display: flex;
        background-color: #F0F8FF;
        border-radius: 25px;
        outline: none;
        border: none;
        color: black;
        font-weight: bold;
        font-size: 1em;
        padding: 10px 3rem;
    }
 
    .marginbutton {
        margin-bottom: 5rem;
    }

    .box-text div {
        text-align: center;
    }

    .rodape {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        background: rgba(23, 61, 64, 0.92) 0%;
        padding: 2rem 0px;
    }

    .rodape img {
        height: 5rem;
        width: auto;
    }

    .Eventos {
        // background-image: url('https://i.pinimg.com/564x/fe/71/77/fe7177975e95d743d58ce9752a5e7dd7.jpg');
        display: flex;
        justify-content: center; 
        align-items: center;

        background-position: center;
        background-size: 100% auto;
        background-attachment: fixed; 
        background-repeat: no-repeat;
        background-color: rgb(47 79 79 / 70%); 
        height: 25vh;
        width: 100%;
    }

    .socialmedia {
        margin: 1em;
    }

    .container-class {
        width: 79em;
        height: 30em;
    }



`

export { Container }