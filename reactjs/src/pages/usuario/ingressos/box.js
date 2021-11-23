import { Container } from './box-styled'


export default function Box (props) {
    console.log(props);

    function dateFormat (date) {
        let y = new Date(date);
        let d = y.getDate();
        console.log(d);
        let b = "0" + (( y.getDate()+ 1 )) + "/" + "0" + (( y.getMonth() + 1 )) + "/" + (( y.getFullYear() ));
        return b;
    }

    function dayOfWeek (week) {
        let d = new Date(week);
        let dayofw = d.getDay();
        
        if( dayofw == 0 ) {
            dayofw = 'DOMINGO'
        } else if (dayofw == 1) {
            dayofw = 'SEGUNDA-FEIRA'
        } else if (dayofw == 2) {
            dayofw = 'TERÇA-FEIRA'
        } else if (dayofw == 3) {
            dayofw = 'QUARTA-FEIRA'
        } else if (dayofw == 4) {
            dayofw = 'QUINTA-FEIRA'
        } else if (dayofw == 5) {
            dayofw = 'SETXA-FEIRA'
        } else if (dayofw == 6) {
            dayofw = 'SÁBADO'
        }

        return dayofw;
    }


    return (
        <Container background={props.imgFundo}>
            <div className="box">
                <div className="bg"> </div>
                <img src="/assets/images/ingresso.png" alt="" />    
                <div className="box-textos"> 
                    <h1> {props.titulo} </h1>
                    <div> <b> Local: </b> {props.local} </div>
                    <div> <b> Dia: </b> {dayOfWeek(props.data)}, {dateFormat(props.data)} </div>
                    <div> <b> Evento: </b> {props.tema} </div>
                    <div> <b> Situação: </b> {props.situacao} </div>
                </div>
            </div>
        </Container>
    )
}