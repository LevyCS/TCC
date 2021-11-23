import styled  from "styled-components";

export const Container = styled.div`
    position: relative;

    .box {
        display: flex;
        flex-direction: row;
        align-items: center;

        border-radius: 25px;
        border: 2px solid white;

        max-width: 800px;
        color: white;
        padding: 1.5rem 6rem 3rem 0px;
        
        position: relative;
        z-index: 11;
        margin-bottom: 4vh;

    }

    img {
        height: 15vh;
        width: auto;
    }


    .bg {
        position: absolute;
        height: 100%;
        width: 100%;
        margin-top: 1.5rem;

        background-repeat: no-repeat;
        background-size: 100% auto;
        background-position: center;
        background-image: url(${(props) => props.background});
        filter: brightness(50%);
        opacity: 0.5;
        background-size: 100% 100%;
        border-radius: 25px;
        z-index: -1;
    }

    .box-textos h1 {
        text-align: center;
        margin: 0px;
        margin-bottom: 10px;
    }

    .box-textos div {
        text-transform: capitalize;
        font-size: 1.2em;
    }
`