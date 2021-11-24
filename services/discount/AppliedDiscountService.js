import http from "../http-common"

class AppliedDiscountService {

    getAll() {
        return http.get("/applied-discounts");
    }

    getPaginated(page = 1) {
        return http.get("/applied-discounts/paginated?limit=5&page=" + page);
    }

    searchPaginated(search, page = 1) {
        return http.get(`/applied-discounts/search/paginated?name=${search}&limit=5&page=${page}`);
    }

    get(id) {
        return http.get(`/applied-discounts/${id}`);
    }

    create(data) {
        return http.post("/applied-discounts", data)
    }

    update(id, data) {
        return http.put(`/applied-discounts/${id}`, data)
    }

    delete(id) {
        return http.delete(`/applied-discounts/${id}`)
    }

    getStatused(status) {
        return http.get(`/applied-discounts/status/${status}`)
    }

    getAllAvailableByOrder(id) {
        return http.get(`/applied-discounts/order/${id}/availability/details`)
    }
}

export default new AppliedDiscountService()