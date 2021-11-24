import http from "../http-common";

class CustomerService {
    getAll() {
        return http.get('/customers');
    }

    getAllStatused(status){
        return http.get('/customers/status/'+status);
    }
    getAllPaginated(page=0) {
        return http.get("/customers/paginated?limit=5&page="+page);
    }

       searchPaginated(search, page = 1){
        return http.get(`/customers/search/paginated?name=${search}&limit=5&page=${page}`);
    }

    get(id) {
        return http.get(`/customers/${id}`);
    }

    create(data) {
        return http.post('/customers', data);
    }

    getStatistics(id) {
        return http.get(`/orders/customer/${id}/statistics`)
    }

    getCustomer(id) {
        return http.get(`/customers/user/${id}`)
    }
}

export default new CustomerService();
