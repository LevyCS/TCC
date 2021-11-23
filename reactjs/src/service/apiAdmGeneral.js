import axios from "axios";

const api = axios.create ({
    baseURL: 'http://localhost:3030/general'
})

export default class Api {
    
    async getConfirmTicket() { 
        let m = await api.get(`/confirmTicket`)
        return m.data; 
    }

    async putConfirmTicket(id, number) { 
        let m = await api.put(`/confirmTicket?id=${id}&&number=${number}`)
        return m.data;
    }

    async loginAdm(username, password) {
        let r = await api.get(`/adm/?username=${username}&&password=${password}`)
        return r.data
    }

    async allReports(type) {
        let r = await api.get(`/relatorios?type=${type}`)
        return r.data;
    }

}