import http from "../http-common"

class SuppliesDataService{

    getAll(){
        return http.get("/parts-supply");
    }

    get(id){
        return http.get(`/parts-supply/${id}`);
    }


    getPaginated(page = 1) {
        return http.get("/parts-supply/paginated?limit=5&page=" + page);
    }

    searchPaginated(search, page = 1){
        return http.get(`/parts-supply/search/paginated?name=${search}&limit=5&page=${page}`);
    }

    create(data){
        return http.post("/parts-supply",data)
    }

    update(id,data){
        return http.put(`/parts-supply/${id}`,data)
    }

    delete(id){
        return http.delete(`/parts-supply/${id}`)
    }


    getPassedWeek(){
        return http.get("/parts-supply/past-week")
    }

    // SUPPLIERS
}

export default new SuppliesDataService()