import http from "../http-common"

class SuppliersDataService{

    getAll(){
        return http.get("/suppliers");
    }

    getAllActive(){
        return http.get("/suppliers/status/ACTIVE");
    }
    getStatusedUnPaginated(status){
        return http.get(`/suppliers/list/status/${status}`)
    }

    getPaginated(page = 1) {
        return http.get("/suppliers?limit=5&page=" + page);
    }

    searchPaginated(search, page = 1){
        return http.get(`/suppliers/search/paginated?name=${search}&limit=5&page=${page}`);
    }
    getListStatusSuppliers(status){
         return http.get(`/suppliers/list/status/${status}`);
    }


    get(id){
        return http.get(`/suppliers/${id}`);
    }

    create(data){
        return http.post("/suppliers",data)
    }

    update(id,data){
        return http.put(`/suppliers/${id}`,data)
    }

    delete(id){
        return http.delete(`/suppliers/${id}`)
    }
}

export default new SuppliersDataService()