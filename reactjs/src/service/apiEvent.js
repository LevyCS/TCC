import axios from "axios";

const api = axios.create ({
    baseURL: 'http://localhost:3030/events'
})

export default class Api {
    async crudGetEvents(nome, categoria) {
        let r = await api.get(`/crud?nome=${nome}&&categoria=${categoria}`)
        return r.data;
    } 

    async crudCreateEvents(formdata) {
        let r = await api.post('/crud', formdata, {
            headers: {
                "Content-Type": "multipart/form-data"
        }});
        return r.data
    }
    
    async crudUpdateEvents(formdata) {
        let r = await api.put('/crud', formdata, {
            headers: {
                "Content-Type": "multipart/form-data"
        }});
        return r.data;
    }
    
    async crudDeleteEvents(id) {
        let r = await api.delete(`/crud/?id=${id}`) 
        return r.data;
    }

    async getImage(img) {
        let r = await api.get(`/event/image/?image=${img}`)
        return r;
    }

    async directedSearch(id) {
        let r = await api.get(`/buscaDirecionada?id=${id}`)
        return r.data;
        
    }

    async directSearch (search) {
        let r = await api.get(`/buscadireta?search=${search}`)
        return r.data;
    }

    async highlightedEvents () {
        let r = await api.get('/highlighted')
        return r.data;
    }
}

