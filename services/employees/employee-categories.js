import http from "../http-common"

class EmployeeCategoriesDataService{

    getAll(){
        return http.get("/employee-categories");
    }

    getAllPaginated(page=1){
        return http.get("/employees-categories?limit=5&page="+page);
    }
    get(id){
        return http.get(`/employee-categories/${id}`);
    }

    getRoles(id){
        return http.get(`/employee-categories/get/roles/${id}`);
    }

    addRoles(id,data){
        return http.post(`/employee-categories/create/roles/${id}`,data);
    }

    deleteRole(categoryId,roleId){
        return http.delete(`/employee-categories/category/${categoryId}/delete/role/${roleId}`);
    }
    create(data){
        return http.post("/employee-categories",data)
    }

    update(id,data){
        return http.put(`/employee-categories/${id}`,data)
    }

    delete(id){
        return http.delete(`/employee-categories/${id}`)
    }
}

export default new EmployeeCategoriesDataService()