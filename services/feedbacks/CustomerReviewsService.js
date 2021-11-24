import http from "../http-common"

class CustomerReviewsService {
    get_all(){
        return http.get("/customer-reviews");
    }
    
    create(body){
        return http.post("/customer-reviews", body);
    }
    
    get_all_paginated(page){
        return http.get("/customer-reviews/paginated?limit=5&page=" + page);
    }
    
    search(){
        return http.get("/customer-reviews/search");
    }
    
    search_paginated(search, page){
        return http.get(`/customer-reviews/search/paginated?name=${search}&limit=5&page=${page}`);
    }
    
    get_by_id(id){
        return http.get("/customer-reviews/"+id);
    }
    
    edit(id, body){
        return http.put("/customer-reviews/"+id, body);
    }
    
    delete(id){
        return http.delete("/customer-reviews/"+id);
    }
    toggleStatus(id){
        return http.put("/customer-reviews/"+id+"/status/toggle");
    }
}

export default new CustomerReviewsService();