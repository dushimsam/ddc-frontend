import http from "./http-common";

class AppInfoService {

    create(data) {
        return http.post("/app-info", data)
    }

    update(data){
        return http.put("/app-info",data)
    }

    get(){
        return http.get("/app-info")
    }
}

export default new AppInfoService();