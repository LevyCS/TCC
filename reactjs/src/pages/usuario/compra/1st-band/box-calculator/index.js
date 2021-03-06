import { TTT } from "../styled"
import Calculator from "./calculator"

export default function BoxCalculator (props) {
    const onChange = (qtd) => {
        props.onChange(qtd)
    }

    const onValueChange = (op) => {
        props.onTicketUpdate(op)
    }

    return (
    <TTT>
        <div class="box-image-event">
            <div class="circle">
                <div class="ticket-image">
                    <img src="/assets/images/ticket-event.png" alt="" width="150em" height="150em" />
                </div>
            </div>
        </div>
        <div class="box-qtd-event">
            <div class="box-ticket-price">
                <div class="box-title"> Ingressos </div>
                <div class="box-price"> R$ {props.ticketValue} </div>
            </div>
            <div class="box-ticket-title"> Quantidade de ingressos</div>
            <Calculator onChange={onChange} value={props.value} onValueChange={onValueChange} />
        </div>
    </TTT>
    )
}