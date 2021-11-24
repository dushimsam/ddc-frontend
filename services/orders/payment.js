import http from "../http-common";


class PaymentService {
getAllMomo()
{
    return http.get("/payments/mtn-momo")
}
getAllCard()
{
    return http.get("/payments/card")
}
}

export default new PaymentService();
