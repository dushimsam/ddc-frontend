import http from "../http-common";

class IncomeStatisticsService {
    report() {
        return http.get("/income/statistics")
    }

    runIncome() {
        return http.get("/income/run")
    }
}

export default new IncomeStatisticsService();
