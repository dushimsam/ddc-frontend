import http from "../http-common"

class EmployeeRolesDataService {

    getAll() {
        return http.get("/employee-roles");
    }


    getAllPaginated(page = 1) {
        return http.get("/employees-roles?limit=5&page=" + page);
    }

    get(id) {
        return http.get(`/employee-roles/${id}`);
    }

    getStatused(status) {
        return http.get(`/employee-roles/${status}`)
    }

    create(data) {
        return http.post("/employee-roles", data)
    }

    update(id, data) {
        return http.put(`/employee-roles/${id}`, data)
    }

    delete(id) {
        return http.delete(`/employee-roles/${id}`)
    }
}

export default new EmployeeRolesDataService()