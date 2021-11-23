import styled from 'styled-components'

const PrincipalPart = styled.div`


    display: flex;
    flex-direction: column;
    width: 100% 100%;
    background-color: #2F4F4F;
    color: white;


.first-band {
    background-image: url("/assets/images/Rectangle 24.svg");
    background-attachment: fixed;
    width: 100vw;
    height: 100vh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.transparent-band {
    background-color: rgba(176, 196, 222, 0.3);
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 55em;
    height: 70%;
}

.title {
    text-align: center;
    text-transform: uppercase;
    font-weight: bolder;
    font-size: 2em;

    margin-bottom: 1em;
}

.graphics {
    display: flex;
    justify-content: center;
    align-items: center;
}

.buttons {
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;

    margin-bottom: 1em;

}

.second-band {
    padding: 3em;

    display: flex;
    flex-direction: column;
}

.events-users-tickets {
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    margin-top: 3em;
}

.Elink {
    text-decoration: none;
    color: black;
}

.Wlink {
    text-decoration: none;
    color: white;
}


`
export {  PrincipalPart }