import http from "../http-common";

class PaymentService {
    // getAllUsingCard(){

    // }

    getAll(type) {
        return http.get(`/payments/${type}`);
    }

    getPayment(id, type) {
        return http.get(`/payments/${type}/${id}`);
    }

    payMoMo(data) {
        return http.post("/payments/mtn-momo")
    }
    payMoMo(id) {
        return http.post(`/payments/mtn-momo/${id}`)
    }
    getMomoPaginated(page = 1) {
        return http.get("/payments/mtn-momo/paginated?limit=5&page=" + page)
    }

    getCashPaginated(page = 1) {
        return http.get("/payments/cash/paginated?limit=5&page=" + page)
    }

    getPaidOrLoanPurchases(status, page = 1) {
        return http.get("/direct-purchases-from-market/status/"+status+"/paginated?limit=5&page="+page)
    }
    getPaymentOrder(order_id, status) {
        return http.get(`/payments/${status}/order/${order_id}`)
    }

    // CASH PAYMENTS
    createCashPayment(data) {
        return http.post("/payments/cash", data)
    }

    getDirectPurchasePaymentDetails(id) {
        return http.get("/payments/cash/direct-purchase/" + id)
    }


    searchLoansPaginated(search, page = 1){
        return http.get(`/direct-purchases-from-market/on-loans/search/paginated?name=${search}&limit=5&page=${page}`);
    }
}

export default new PaymentService();
