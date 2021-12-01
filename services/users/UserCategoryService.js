import http from "../http-common";

class UserCategoryService {
    getByName(name) {
        return http.get('/user-categories/byName/' + name);
    }
    getAll()
    {
        return http.get('/user-categories')
    }

}

export default new UserCategoryService();
