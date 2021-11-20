import styled from "styled-components";

const Box = styled.div`

    display: flex; 
    flex-direction: row; 
    justify-content: space-evenly; 
    box-shadow: 1px 2px 5px rgba(47,79,79,0.7), 5px 10px 25px black;

    border-radius: 35px; 
    border: 5px solid none; 
    width: 90%; 
    height: 10em; 
    align-items: center;
    margin: 1em;

    background-size: 100%;
    background-repeat: no-repeat; 

.Event-Information {
    display: flex; 
    flex-direction: column; 

    align-items: start; 
}

.Buttons-confirm > button {
    border-radius: 50px;
    border: none; 
    margin-right: 5px; 
}

.Title {
    font-size: 1.5em; 
    font-weight: bold;  
}


`

export { Box }