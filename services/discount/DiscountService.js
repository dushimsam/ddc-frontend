import http from "../http-common"

class DiscountService {

    getAll() {
        return http.get("/discounts");
    }

    getPaginated(page = 1) {
        return http.get("/discounts/paginated?limit=5&page=" + page);
    }

    searchPaginated(search, page = 1) {
        return http.get(`/discounts/search/paginated?name=${search}&limit=5&page=${page}`);
    }

    get(id) {
        return http.get(`/discounts/${id}`);
    }

    getByCode(code) {
        return http.get(`/discounts/coupon-code/${code}`);
    }

    getByCodeDetails(code) {
        return http.get(`/discounts/coupon-code/${code}/details`);
    }


    create(data) {
        return http.post("/discounts", data)
    }

    update(id, data) {
        return http.put(`/discounts/${id}`, data)
    }

    delete(id) {
        return http.delete(`/discounts/${id}`)
    }

    getStatused(status) {
        return http.get(`/discounts/status/${status}`)
    }
}

export default new DiscountService()