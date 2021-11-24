import http from "../http-common"

class NotificationService {
    all(limit = 5, page = 1) {
        return http.get('/notifications?limit=' + limit + '&page=' + page);
    }
    
    new() {
        return http.get('/notifications/new');
    }
    
    unread() {
        return http.get('/notifications/unreads');
    }
    
    markAsRead(notifications) {
        return http.put("/notifications/mark-many-as-read", { notifications })
    }
}


export default new NotificationService();