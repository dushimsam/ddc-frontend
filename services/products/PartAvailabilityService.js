import http from '../http-common'

class PartAvailabilityService {
    getAll() {
        return http.get("/part-availabilities");
    }

    create(data) {
        return http.post("/part-availabilities", data);
    }

    update(id, data) {
        return http.put("/part-availabilities/" + id, data);
    }


    get(id) {
        return http.get("/part-availabilities/" + id);
    }

    getAllByPart(partId) {
        return http.get("/part-availabilities/part-on-market/" + partId);
    }

    getAllByPartActive(partId) {
        return http.get("/part-availabilities/part-on-market/" + partId + "/active");
    }

    unSetActiveByPart(partId) {
        return http.put("/part-availabilities/part-on-market/" + partId + "/unset");
    }

}

export default new PartAvailabilityService()
