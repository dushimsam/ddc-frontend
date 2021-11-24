import http from "../http-common";

class SiteTrafficService {
    get_all() {
        return http.get("/site-visitors")
    }

    create(data) {
        return http.post("/site-visitors", data)
    }
}

export default new SiteTrafficService();