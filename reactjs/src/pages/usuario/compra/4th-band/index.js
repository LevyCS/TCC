import PreviaBox from "./previa-box";
import { FaixaQuatro } from "./styled";
import { Botao } from '../../../../components/botoes/styled'
import { useState } from "react";


export default function BuyFourthBand (props) {

    const [info, setInfo] = useState(props.info);
    console.log(info)

    let gambiarraPraMapear = []
    for (var i = 0; i < Number(info.qtd); i++) {
        gambiarraPraMapear.push(i);
    }

    return (
        <FaixaQuatro>
            <div class="title"> </div>
            <div class="band-previa">
                <div> 
                    {console.log(gambiarraPraMapear)}
                    {gambiarraPraMapear.map(i => {
                        return <PreviaBox key={i} evento={info.evento} comprador={info.comprador} paymentMethod={info.paymentMethod} data={info.data[i]} hora={info.hora[i]} />
                    })}
                </div>
                
                <div class="the-button"> <Botao onClick={() => props.onFinish()}> ADQUIRIR INGRESSO (S) </Botao> </div>
            </div>
        </FaixaQuatro>
    )
}