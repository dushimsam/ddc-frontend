import http from "../http-common"
import AuthService from '../auth/auth.service';

const headers = {
    'Authorization': `Bearer ${AuthService.getEncToken()}`,
}

class StatisticsService{

    getCustomerStatistics() {
        return http.get("/statistics/customer");
    }
    getSalesManagerStatistics() {
        return http.get("/statistics/sales-manager");
    }
    getShipperStatistics() {
        return http.get("/statistics/shipper");
    }
    getAdminStatistics() {
        return http.get("/statistics/admin");
    }
}

export default new StatisticsService();