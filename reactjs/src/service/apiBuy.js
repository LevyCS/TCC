import axios from 'axios'

const api = axios.create ({
    baseURL: '192.168.1.129:3030/buy'
})

export default class Api {

    async finishBuy(cardNumber, cardOwner, cvc, validity, cpf, userId, eventId, paymentMethod, dates, qtd) {
        let r = await api.post('/event', {
            
            creditCard: {
                cardNumber,
                cardOwner,
                cvc,
                validity,
                cpf
            },
        
            selling: {
                userId,
                eventId,
                paymentMethod
            },

            qtd: qtd,

            sellingItems: dates
            
        })
        return r.data
    }

    async getDates(id) {
        let r = await api.get(`/eventdate/${id}`)
        return r.data;
    }

    async getHours(id) {
        let r = await api.get(`/eventhour/${id}`)
        return r.data;
    }
}