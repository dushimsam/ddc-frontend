import http from "../http-common";

class UserService {
    create(data) {
        return http.post('/users', data);
    }
    usernameAvailable(username) {
        return http.get('/users/username/exists/' + username);
    }
    emailAvailable(email) {
        return http.get('/users/email/exists/' + email);
    }
    phoneAvailable(phone) {
        return http.get('/users/phone-number/exists/' + phone);
    }

    changeStatus(status,id){
        return http.put(`/users/${id}/status/toggle/${status}`);
    }
    update(id, data) {
        return http.put(`/users/${id}`, data);
    }
    changePassword(id, data) {
        return http.put(`/users/update-password/${id}`, data);
    }

    getAll(){
        return http.get(`/users`)
    }
 
    get(id){
        return http.get(`/users/${id}`)
    }
    delete(id){
        return http.delete(`/users/${id}`)
    }

    uploadImage(id, formData){
        return http.put('/users/upload-profile/'+id, formData)
    }
}

export default new UserService();
