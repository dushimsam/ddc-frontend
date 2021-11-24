import http from "../http-common";

class ShipmentService {

    create(data) {
        return http.post('/shipments', data);
    }

    update(id, data) {
        return http.put('/shipments/' + id, data);
    }

    getAll() {
        return http.get('/shipments');
    }

    get(id) {
        return http.get(`/shipments/${id}`);
    }

    getDeliveryCountries() {
        return http.get('/delivery-countries');
    }

    getPaginatedDeliveryCountries(page = 1) {
        return http.get("/delivery-countries/paginated?limit=5&page=" + page);
    }

    searchPaginatedDeliveryCountries(search, page = 1) {
        return http.get(`/delivery-countries/search/paginated?name=${search}&limit=5&page=${page}`);
    }


    deleteDeliveryCountry(id) {
        return http.delete(`/delivery-countries/${id}`);
    }

    getDeliveryCountry(id) {
        return http.get(`/delivery-countries/${id}`);
    }

    createCountry(data) {
        return http.post('/delivery-countries', data);
    }

    updateCountry(id, data) {
        return http.put('/delivery-countries/' + id, data);
    }


    getDeliveryRegions() {
        return http.get("/delivery-country-regions");
    }

    getPaginatedDeliveryCountriesRegions(page = 1) {
        return http.get("/delivery-country-regions/paginated?limit=5&page=" + page);
    }

    searchPaginatedDeliveryCountriesRegions(search, page = 1) {
        return http.get(`/delivery-country-regions/search/paginated?name=${search}&limit=5&page=${page}`);
    }

    getDeliveryRegion(id) {
        return http.get(`/delivery-country-regions/${id}`)
    }

    deleteDeliveryRegion(id) {
        return http.delete(`/delivery-country-regions/${id}`)
    }

    createRegion(data) {
        return http.post("/delivery-country-regions", data);
    }

    updateRegion(id, data) {
        return http.put("/delivery-country-regions/" + id, data);
    }

    createZone(data) {
        return http.post("/delivery-zones", data);
    }

    updateZone(id, data) {
        return http.put("/delivery-zones/" + id, data);
    }

    getDeliveryZones() {
        return http.get(`/delivery-zones`);
    }

    getPaginatedDeliveryZones(page = 1) {
        return http.get("/delivery-zones/paginated?limit=5&page=" + page);
    }

    searchPaginatedDeliveryZones(search, page = 1) {
        return http.get(`/delivery-zones/search/paginated?name=${search}&limit=5&page=${page}`);
    }

    deleteDeliveryZone(id) {
        return http.delete(`/delivery-zones/${id}`);
    }

    getDeliveryCountryRegions(country) {
        return http.get(`/delivery-country-regions/country/${country}`);
    }

    getShipperStatistics(id) {
        return http.get(`/shipments/shipper/${id}/statistics`);
    }

    getDeliveryRegionZones(region) {
        return http.get(`/delivery-zones/region/${region}`);
    }

// SHIPPERS

    getAllShippers() {
        return http.get('/shippers');
    }

    getPaginatedShippers(page = 1) {
        return http.get("/shippers/paginated?limit=5&page=" + page);
    }

    searchPaginatedShippers(search, page = 1) {
        return http.get(`/shippers/search/paginated?name=${search}&limit=5&page=${page}`);
    }

    getAllActiveShippers() {
        return http.get('/shippers/status/ACTIVE');

    }


    getShipper(id) {
        return http.get(`/shippers/${id}`);
    }

    getStatusedShippers(status) {
        return http.get(`/shippers/status/${status}`);
    }

    createShipper(data) {
        return http.post('/shippers', data);
    }

    getUserShipper(id) {
        return http.get(`/shippers/user/${id}`);
    }

    getMyShipments(shipperId) {
        return http.get(`/shipments/shipper/${shipperId}`);
    }

    getMyShipmentsPaginated(shipperId, page = 1) {
        return http.get(`/shipments/shipper/${shipperId}/paginated?limit=5&page=" + page`);
    }

    searchPaginated(search, page = 1) {
        return http.get(`/shipments/search/paginated?name=${search}&limit=5&page=${page}`);
    }

    getDeliveryZone(delivery_id) {
        return http.get(`/delivery-zones/${delivery_id}`);

    }

    changeShipmentStatus(id, status) {
        return http.put(`/shipments/${id}/status/${status}`);
    }

    getMyShipmentsWithStatus(id, status) {
        return http.get(`/shipments/shipper/${id}/status/${status}`)
    }

    getMyShipmentsWithStatusPaginated(id, status) {
        return http.get(`/shipments/shipper/${id}/status/${status}/paginated`)
    }

    getStatusedShipments(status) {
        return http.get(`/shipments/status/${status}`);
    }

    getStatusedShipments(status) {
        return http.get(`/shipments/status/${status}`);
    }

    getListStatusedShippers(status) {
        return http.get(`/shippers/list/status/${status}`);
    }

    getOrderShipment(id) {
        return http.get(`/shipments/order/${id}`)
    }


    // DELIVERY PORTS

    getAllDeliveryPorts() {
        return http.get("/delivery-ports");
    }


    getPaginatedDeliveryPorts(page = 1) {
        return http.get("/delivery-ports/paginated?limit=5&page=" + page);
    }

    deleteDeliveryPort(id) {
        return http.delete(`/delivery-ports/${id}`);
    }

    getDeliveryPort(id) {
        return http.get(`/delivery-ports/${id}`);
    }

    createDeliveryPort(data) {
        return http.post('/delivery-ports', data);
    }

    updateDeliveryPort(id, data) {
        return http.put('/delivery-ports/' + id, data);
    }

    searchPaginatedDeliveryPorts(search, page = 1) {
        return http.get(`/delivery-countries/paginated?query=${search}&limit=5&page=${page}`);
    }


    // DELIVERY COUNTRY ORIGINS

    getDeliveryCountryOrigins() {
        return http.get(`/deliver-shipping-origins`);
    }

    getPaginatedDeliveryCountryOrigins(page = 1) {
        return http.get("/deliver-shipping-origins/paginated?limit=5&page=" + page);
    }

    deleteDeliveryCountryOrigins(id) {
        return http.delete(`/deliver-shipping-origins/${id}`);
    }

    getDeliveryCountryOrigin(id) {
        return http.get(`/deliver-shipping-origins/${id}`);
    }

    createDeliveryCountryOrigin(data) {
        return http.post('/deliver-shipping-origins', data);
    }

    updateDeliveryCountryOrigin(id, data) {
        return http.put('/deliver-shipping-origins/' + id, data);
    }

    searchPaginatedDeliveryCountryOrigins(search, page = 1) {
        return http.get(`/deliver-shipping-origins/paginated?query=${search}&limit=5&page=${page}`);
    }


    //PORT PRICING

    getPortPricings() {
        return http.get(`/port-pricing`);
    }


    getPaginatedPortPricing(page = 1) {
        return http.get("/port-pricing/paginated?limit=5&page=" + page);
    }

    deletePortPricing(id) {
        return http.delete(`/port-pricing/${id}`);
    }

    getPortPricing(id) {
        return http.get(`/port-pricing/${id}`);
    }

    getPortPricingByPortCountryVehicle(port, country, type) {
        return http.get(`/port-pricing/port/${port}/shipping-origin/${country}/vehicle-type/${type}`);
    }


    createPortPricing(data) {
        return http.post('/port-pricing', data);
    }

    updatePortPricing(id, data) {
        return http.put('/port-pricing/' + id, data);
    }

    searchPaginatedPortPricing(search, page = 1) {
        return http.get(`/port-pricing/paginated?query=${search}&limit=5&page=${page}`);
    }

}

export default new ShipmentService();
