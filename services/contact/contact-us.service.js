import http from '../http-common'

class ContactUsService {
    getAll() {
        return http.get("/contacts");
    }

    getById(id){
        return http.get(`/contacts/${id}`); 
    }

    create(data){
        return http.post("/contacts",data)
    }

    getPaginated(){
        return http.get("/contacts/paginated")
    }
    search(){
        return http.get("/contacts/search")
    }
    searchPaginated(){
        return http.get("/contacts/search/paginated")
    }

    delete(id){        
        return http.delete(`/contacts/${id}`)
    }
}

export default new ContactUsService()