import styled from "styled-components";

const FaixaDois = styled.div `


    display: flex;
    flex-direction: column; 
    min-height: 100vh;
 
    padding: 2em;
    margin-top: 2em;


 
 .title {
     text-align: center;
     text-transform: uppercase;
     font-size: 2em;
 
     margin-bottom: 2em;
 }
 
 .first-box-scheme {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    
 
    border-radius: 0.8em;
    background-color: rgba(0, 0, 0, 0.3);

    padding: 2em 0em;
    margin-bottom: 2em;
 }
 
 .column {
    display: flex;
    flex-direction: column;

    align-items: flex-end;          
 }
 
 .scheme-input, .scheme-input1 {
     display: flex;
     flex-direction: row;
 }
 
 .scheme-title, .scheme-title1, .scheme-title2 {
     font-size: 1.2rem;
     margin-right: 1em;
 }
 
 .scheme-input1 {
     margin-bottom: 1em;
 
 }
 
 .scheme-title1 {
   
 }
 
 .scheme-title2 {
     margin-left: -1.8em;
 }
 
 input {
    border: none;
    width: 18em;
    height: 2.5em;
    border-radius: 0.5em;
    outline: none;
    background-color: #E0E0E0;
    color: #616161;
 }
 
 .second-box-scheme {
     display: flex;
     flex-direction: column;
     justify-content: center;
 
     margin-top: 2em;
 }

.buttonwidht {
    margin-top: 3rem;
    display: flex;
    justify-content: center;
}
`

const StyledDateTime = styled.div `


    display: flex;
    flex-direction: row;
    background-color: rgba(0, 0, 0, 0.3);
    padding: 2em 2em;
    align-self: center;

    margin-bottom: 1em;

    border-radius: 1em;


.box-datetime {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

}

.start-box {
    display: flex;
    flex-direction: column;
    position: relative;
    background-color: rgba(0, 0, 0, 0.3);
    padding: 1em 4em;

    margin: 1em 2em 0em 2em;

    border-radius: 1em;

}

.start-box-title {
    display: flex;
    flex-direction: row;
    justify-content: center;


    position: absolute;

    background-color: #F0F8FF;
    padding: 0.3em 2em;
    border-radius: 3em;

    top: -2em;
    right: 3em;
}

.st-box-title {
    display: flex;
    align-self: center;
    color: #000;
    font-weight: 700;

    margin-left: 0.5em;
}

.start-box-choose {
    margin-top: 2em;
    margin-bottom: 1em;
    font-size: 1.2em;
    font-weight: 800;
}

select {
    padding: 1em 1em;
    background-color: rgba(0, 0, 0, 0.3);
    border: none;
    color:rgba(255, 255, 255, 0.3);
}

select:hover {
    border:none;

}

option {
    padding: 1em 1em;
    background-color: rgba(0, 0, 0, 0.5);
    color:#F0F8FF;
    outline: none;
} 

input {
    color: black;
    font-size: 100px;
}

input:focus {
    color: #ff0000;
}


`

export { FaixaDois, StyledDateTime }