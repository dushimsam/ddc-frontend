import http from "../http-common"

class SuppliedproductsDataService {

    getAll() {
        return http.get("/supplied-products");
    }

    get(id) {
        return http.get(`/supplied-products/${id}`);
    }

    getPaginated(page = 1) {
        return http.get("/supplied-products?limit=5&page=" + page);
    }

    searchPaginated(search, page = 1) {
        return http.get(`/supplied-products/search/paginated?name=${search}&limit=5&page=${page}`);
    }


    create(data) {
        return http.post("/supplied-products", data)
    }

    update(id, data) {
        return http.put(`/supplied-products/${id}`, data)
    }

    deleteSupply(id) {

    }

    delete(id) {
        return http.delete(`/supplied-products/${id}`)
    }

    getFromSupply(id) {
        return http.get(`/supplied-products/products-supply/${id}`);
    }
}

export default new SuppliedproductsDataService()