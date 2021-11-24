import http from "../http-common"

class ContactUsService {
    get_all(){
        return http.get("/contacts");
    }
    
    create(body){
        return http.post("/contacts", body);
    }
    
    get_all_paginated(page){
        return http.get("/contacts/paginated?limit=5&page=" + page);
    }
    
    search(){
        return http.get("/contacts/search");
    }
    
    search_paginated(search, page){
        return http.get(`/contacts/search/paginated?name=${search}&limit=5&page=${page}`);
    }
    
    get_by_id(id){
        return http.get("/contacts/"+id);
    }
    
    edit(id, body){
        return http.put("/contacts/"+id, body);
    }
    
    delete(id){
        return http.delete("/contacts/"+id);
    }
}

export default new ContactUsService();