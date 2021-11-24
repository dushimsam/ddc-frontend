import http from "../http-common";

class AppUpdatesService {
    getAll(p) {
        return http.get("/app-updates");
    }
    create(data){
        return http.post("/app-updates",data)
    }

    get(id){
        return http.get('app-updates/'+id);
    }

    getPaginated(page=1) {
        return http.get("/app-updates/paginated?limit=5&page=" + page);
    }

    searchPaginated(search, page = 1){
        return http.get(`/app-updates/search/paginated?name=${search}&limit=5&page=${page}`);
    }

    delete(id){
        return http.delete('app-updates/'+id);
    }
    update(id,data){
        return http.put(`/app-updates/${id}`,data)
    }
    getShowcased() {
        return http.get('app-updates/all/showcase');
    }
    addImage(id,formData){
        return http.put(`/app-updates/upload-image/${id}`,formData)
    }
    setShowcase(id) {
        return http.put(`/app-updates/showcase/${id}`);
    }

}

export default new AppUpdatesService();
