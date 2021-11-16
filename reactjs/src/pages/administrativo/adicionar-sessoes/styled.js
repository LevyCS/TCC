import styled from "styled-components";

const Container = styled.div`
    min-height: 100vh;
    background-color: #2F4F4F;
    color: white;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .container2 {
        display: flex;
        flex-direction: row;
        margin: 5rem 0;
    }

    .agp-input {
        display: flex;
        flex-direction: column;

    }

    .hourPart {
        margin: 0px 2rem;
    }
    
    input {
        padding: 1em 1em;
        background-color: rgba(0, 0, 0, 0.3);
        border: none;
        color:rgba(255, 255, 255, 0.3);
        margin-bottom: 1rem;
    }

    select {
        padding: 1em 1em;
        background-color: rgba(0, 0, 0, 0.3);
        border: none;
        color:rgba(255, 255, 255, 0.3);
        margin-bottom: 1rem;
    }

    option {
        padding: 1em 1em;
        background-color: rgba(0, 0, 0, 0.5);
        color:#F0F8FF;
        outline: none;
    } 

    input, select, option {
        outline: none;
    }
`



export { Container }