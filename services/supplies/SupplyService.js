import http from "../http-common"

class SuppliesDataService{

    getAll(){
        return http.get("/products-supply");
    }

    get(id){
        return http.get(`/products-supply/${id}`);
    }


    getPaginated(page = 1) {
        return http.get("/products-supply/paginated?limit=5&page=" + page);
    }

    searchPaginated(search, page = 1){
        return http.get(`/products-supply/search/paginated?name=${search}&limit=5&page=${page}`);
    }

    create(data){
        return http.post("/products-supply",data)
    }

    update(id,data){
        return http.put(`/products-supply/${id}`,data)
    }

    delete(id){
        return http.delete(`/products-supply/${id}`)
    }


    getPassedWeek(){
        return http.get("/products-supply/past-week")
    }

    // SUPPLIERS
}

export default new SuppliesDataService()