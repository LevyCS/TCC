import { useEffect, useState } from "react";
import { Botao } from "../../../../components/botoes/styled";
import { FaixaTres } from "./styled";

export default function BuyThirdBand (props) {
    const [teste, setTeste] = useState(1)

    const [cardNumber, setCardNumber] = useState('');
    const [cardOwner, setCardOwner] = useState('');
    const [cvc, setCvc] = useState('');
    const [validity, setValidity] = useState('');
    const [cpf, setCpf] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');


    useEffect(() => {
        props.cardInformation(cardNumber, cardOwner, cvc, validity, cpf, paymentMethod)
    }, [cardNumber, cardOwner, cvc, validity, cpf, paymentMethod])

    return (
        <FaixaTres>
            <div class="title"> Forma de Pagamento </div>
            <div class="payment-box">
                <div class="payment-like-card">
                    <div class="card-title"> Cartão de Crédito </div>
                    <div class="card-icon"> <img src="/assets/images/credit-card.png" alt="" width="80em" height="95em" /> </div>
                    <input type="radio" name="aa" class="radio" onChange={() => {setTeste(1); setPaymentMethod("cartão")}}/>
                </div>
                <div class="payment-like-card">
                    <div class="card-title1"> PIX </div>
                    <div class="card-icon1"> <img src="assets/images/icon-pix.png" alt=""width="150em" height="50em" /> </div>
                    <input type="radio" name="aa" class="radio" onChange={() => {setTeste(0); setPaymentMethod("pix")}} />
                </div>
            </div>
            
            {teste == 0 ?  
            <div class="payment-informations-credit-card">
                <div className="pix"> Chave Pix: 222.222.222-22 </div>
            </div> :  
            
            <form>
                <div class="payment-informations-credit-card">
                    <div class="column">
                        <div class="payment-inf-cc-box">
                            <div class="payment-inf-cc-box-title2">Número do Cartão: </div>
                            <input type="text" class="payment-inf-cc-box-text" onChange={(e) => setCardNumber(e.target.value)}/>
                        </div>
                        <div class="payment-inf-cc-box">
                            <div class="payment-inf-cc-box-title"> Portador do Cartão: </div>
                            <input type="text" class="payment-inf-cc-box-text" onChange={(e) => setCardOwner(e.target.value)} />
                        </div>
                        <div class="payment-inf-cc-box">
                            <div class="payment-inf-cc-box-title1"> CVC:    </div>
                            <input type="text" class="payment-inf-cc-box-text" onChange={(e) => setCvc(e.target.value)} />
                        </div>
                    </div>
                    <div class="column">
                        <div class="payment-inf-cc-box">
                            <div class="payment-inf-cc-box-title"> Vencimento: </div>
                            <input type="month" class="payment-inf-cc-box-text" onChange={(e) => setValidity(e.target.value)}/>
                        </div>
                        <div class="payment-inf-cc-box">
                            <div class="payment-inf-cc-box-title4"> CPF: </div>
                            <input type="text" class="payment-inf-cc-box-text" value={cpf} onChange={(e) => setCpf(e.target.value)}/>
                        </div>
                    </div>
                </div>
            </form>
            
}   
         
        <div className="buttonwidht"> 
            <Botao onClick={props.updateScreen}> Prosseguir </Botao>
        </div>
        </FaixaTres>
    )
}