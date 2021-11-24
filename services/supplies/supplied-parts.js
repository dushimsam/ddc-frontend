import http from "../http-common"

class SuppliedPartsDataService {

    getAll() {
        return http.get("/supplied-parts");
    }

    get(id) {
        return http.get(`/supplied-parts/${id}`);
    }

    getPaginated(page = 1) {
        return http.get("/supplied-parts?limit=5&page=" + page);
    }

    searchPaginated(search, page = 1) {
        return http.get(`/supplied-parts/search/paginated?name=${search}&limit=5&page=${page}`);
    }


    create(data) {
        return http.post("/supplied-parts", data)
    }

    update(id, data) {
        return http.put(`/supplied-parts/${id}`, data)
    }

    deleteSupply(id) {

    }

    delete(id) {
        return http.delete(`/supplied-parts/${id}`)
    }

    getFromSupply(id) {
        return http.get(`/supplied-parts/part-supply/${id}`);
    }
}

export default new SuppliedPartsDataService()