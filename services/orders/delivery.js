import http from "../http-common";

class DeliveryService {

    getDeliveryCountries() {
        return http.get('/delivery-countries');
    }
}


export default new DeliveryService();
