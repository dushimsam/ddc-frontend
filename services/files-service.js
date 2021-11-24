import http from "./http-common";

class FileService {

    create(data) {
        return http.post("/app-updates", data)
    }

    get(id) {
        return http.get('app-updates/' + id);
    }

    getPaginated(page = 1) {
        return http.get("/app-updates/paginated?limit=5&page=" + page);
    }

    searchPaginated(search, page = 1) {
        return http.get(`/app-updates/search/paginated?name=${search}&limit=5&page=${page}`);
    }

    delete(path,model,id) {
        return http.delete('/files/delete/' + path+'/from/'+model+"/id/"+id);
    }
    update(id, data) {
        return http.put(`/app-updates/${id}`, data)
    }
    getShowcased() {
        return http.get('app-updates/all/showcase');
    }
    addImage(id, formData) {
        return http.put(`/app-updates/upload-image/${id}`, formData)
    }
    setShowcase(id) {
        return http.put(`/app-updates/showcase/${id}`);
    }

}

export default new FileService();
