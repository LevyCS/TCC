import styled from 'styled-components'; 

const Container = styled.div`

    display: flex;
    flex-direction: column;
    background-color: #2F4F4F;
    color: white;
    min-height: 100vh;


    padding: 3em;
    text-decoration: none;


.title {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.the-polygon {
    margin-right: 1em;
}

.the-title {
    font-size: 1.5em;
    font-weight: 700;
}

.principal-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2em;
    background-color: #FFFFFF0D;
    padding: 2em;

}

.row {
    display: flex;
    flex-direction: row;
    
}

.mini-box {
    display: flex;
    flex-direction: column;
    padding: 0.3em;
}

label {
    font-size: 1.05rem;
}

input {
    padding: 0.5em 1em;
    margin-right: 2em;
    border: none;
    border-radius: 0.3em;
    background-color:#F0F8FF;
    outline: none;
}

.event-name {
    padding: 0.5em 16.8em;
}

.date-ff {
    display: flex;
    flex-direction: row;
}

input[type="file"] {
    color: black;
    padding: 0.5em 0.5em;
    display: flex;
    justify-content: center;
}

input[type="date"]{
    padding: 0.3em 0.3em;
}

.column1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.column {
    display: flex;
    flex-direction: column; 
}

.image {
    display: flex;
    background-color: #f0f8ff;
    background-image: url('/assets/images/add-me.png');
    background-repeat: no-repeat;
    background-size: 5em;
    background-position: center;

    padding: 6em 4.5em;
    margin-right: 2em;
    border-radius: 0.3em;
}

textarea {
    resize: none;
    padding: 1em;
    width: 27.5em;
    background-color: #f0f8ff;
    border-radius: 0.3em;
}

textarea, select {
    outline: none;
}

select {
    height: 100%;
    width: 10rem;
    background-color: #f0f8ff;
    border-radius: 0.3em;
    margin-right: 4.5em;
}

button {

    cursor: pointer;

    margin-top: 1.2em;
    margin-bottom: 1em;
    display: flex;
    align-items: center;
    justify-content: center;
}

.last-button {
   display: flex;
   justify-content: center;

}

.column1 {
    overflow-y: auto;
    margin-right: 2rem;
    margin-top: 1rem;
}
    
`
    

export { Container }