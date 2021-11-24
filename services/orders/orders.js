import http from "../http-common";

class OrderService {
    createOrder(data) {
        return http.post('/orders', data)
    }

    updateOrder(id, data) {
        return http.put('/orders/' + id, data)
    }

    getAll() {
        return http.get('/orders');
    }

    getOrdersStatus(status) {
        return http.get(`/orders/status/${status}`)
    }


    get(id) {
        return http.get(`/orders/${id}`)
    }

    changeStatus(id, status) {
        return http.put(`/orders/${id}/status/${status}`)
    }


// PART ORDERS

    getAllParts() {
        return http.get('/part-orders');
    }

    orderParts(order_id) {
        return http.get(`/part-orders/order/${order_id}`)
    }

    getPart() {
        return http.get(`/part-orders/${id}`)
    }

    getPaginated(page = 1) {
        return http.get("/orders/paginated?limit=5&page=" + page);
    }

    searchPaginated(search, page = 1) {
        return http.get(`/orders/search/paginated?name=${search}&limit=5&page=${page}`);
    }


    createPart(data) {
        return http.post("/part-orders", data)
    }

    addOrderedParts(data) {
        return http.post(`/part-orders`, data)
    }

    payMoMo(data) {
        return http.post("/payments/mtn-momo", data)
    }

    applyCoupon(code) {
        return http.get(`/discounts/apply-coupon/${code}`)
    }

    getOrderForACustomer(customer) {
        return http.get('/orders/customer/' + customer)
    }


    getPassedWeek() {
        return http.get("orders/past-week")
    }


    getOrderForACustomerPaginated(customer, page = 1) {
        return http.get('/orders/customer/' + customer + "/paginated?limit=5&page=" + page)
    }

    getOrderDetails(id) {
        return http.get(`/orders/${id}/details`)
    }

    delete(id) {
        return http.delete(`/orders/${id}`)
    }
}


export default new OrderService();
