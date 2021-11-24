import http from "../http-common";

class DirectPurchaseService {
  getAll() {
    return http.get("/direct-purchases-from-market");
  }

    get(id) {
    return http.get("/direct-purchases-from-market/"+id);
  }
  getPaginated(page = 1){
        return http.get("/direct-purchases-from-market/paginated?limit=5&page="+page);
    }
    searchPaginated(search, page = 1){
        return http.get(`/direct-purchases-from-market/search/paginated?name=${search}&limit=5&page=${page}`);
    }
  create(data) {
    return http.post("/direct-purchases-from-market", data);
  }
  update(id,data) {
    return http.put("/direct-purchases-from-market/"+id, data);
  }
  markAspaid(id) {
    return http.put("/direct-purchases-from-market/"+id+"/mark-as-paid",);
  }
  delete(id){
    return http.delete(`/direct-purchases-from-market/${id}`);
  }

  getPastWeek(){
    return http.get("/direct-purchases-from-market/past-week");
  }
}

export default new DirectPurchaseService();
