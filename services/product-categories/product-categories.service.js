import http from "../http-common";

class ProductCategoriesService {



    // Product Categories
    getProductCategories(page = 1) {
        return http.get('/product-categories?limit=5?page=' + page);
    }

    getAllProductCategories() {
        return http.get('/product-categories');
    }

    getValidProductCategories(model) {
        return http.get(`/product-categories/model/${model}/valid`);
    }


    getPaginatedProductCategories(page = 1) {
        return http.get("/product-categories/paginated?limit=5&page=" + page);
    }

    searchPaginatedProductCategories(search, page = 1) {
        return http.get(`/product-categories/search/paginated?name=${search}&limit=5&page=${page}`);
    }


    getProductCategory(id) {
        return http.get('/product-categories/' + id);
    }

    deleteProductCategory(id) {
        return http.delete('/product-categories/' + id);
    }

    updateProductCategory(id, values) {
        return http.put('/product-categories/' + id, values);
    }

    createProductCategory(data) {
        return http.post('/product-categories', data);
    }


}

export default new ProductCategoriesService();
