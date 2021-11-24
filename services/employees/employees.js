import http from "../http-common"

class EmployeesDataService {

    getAll() {
        return http.get("/employees");
    }
    getPaginated(page = 1){
        return http.get("/employees/paginated?limit=5&page="+page);
    }
    searchPaginated(search, page = 1){
        return http.get(`/employees/search/paginated?name=${search}&limit=5&page=${page}`);
    }

    getByUserId(id){
        return http.get(`/employees/user/${id}`)
    }

    getAllActive(){
        return http.get("/employees/status/ACTIVE")
    }

    getStatused(status){
        return http.get(`/employees/status/${status}`)
    }

    get(id) {
        return http.get(`/employees/${id}`);
    }

    create(data) {
        return http.post("/employees", data)
    }

    update(id, data) {
        return http.put(`/employees/${id}`, data)
    }

    delete(id) {
        return http.delete(`/employees/${id}`)
    }
}

export default new EmployeesDataService()