import http from '../http-common'

const market_model_url = "products-on-market";
const products_model_url = "products"

class ProductsService {
    getAll() {
        return http.get("/products");
    }

    createSparePart(data) {
        return http.post("/products", data);
    }

    updateSparePart(id, data) {
        return http.put("/products/" + id, data);
    }

    getCategorizedSpareParts(sub_category) {
        return http.get("/products/sub-category/" + sub_category);
    }

    getAllPartsOnMarket() {
        return http.get("/products-on-market");
    }

    getSparePart(id) {
        return http.get("/products/" + id);
    }

    getPaginatedSpareParts(page = 1) {
        return http.get("/products/paginated?limit=5&page=" + page);
    }

    searchPaginatedSpareParts(search, page = 1, limit = 5) {
        return http.get(`/products/search/paginated?name=${search}&limit=${limit}&page=${page}`);
    }

    deleteSparePart(id) {
        return http.delete("/products/" + id);
    }

    deleteSparePartImage(id, imageId) {
        return http.delete(`/products/delete-image/spare-part/${id}/image/${imageId}`)
    }


    //in stock
    getPartsInStock() {
        return http.get("/parts-in-stock");
    }


    getPaginatedPartsInStock(page = 1) {
        return http.get("/parts-in-stock/paginated?limit=5&page=" + page);
    }

    searchPaginatedPartsInStock(search, page = 1) {
        return http.get(`/parts-in-stock/search/paginated?name=${search}&limit=5&page=${page}`);
    }

    getPartInStock(id) {
        return http.get(`/parts-in-stock/${id}`);
    }

    createSparePartInStock(data) {
        return http.post("/parts-in-stock", data);
    }

    getPartsOnMarketDetails() {
        return http.get("/products-on-market/products");
    }

    getValidPartsOnMarket() {
        return http.get("/products-on-market/valid")
    }


    addImage(id, formData) {
        return http.put("/products/upload-image/" + id, formData)
    }

    getPartOnMarketById(id) {
        return http.get(`/products-on-market/${id}`);
    }

    createPartOnMarket(data) {
        return http.post("/products-on-market", data);
    }


    getPartsOnMarketByModelSubCategoryYear(sub_category, model, releaseYear) {
        return http.get(`/products-on-market/sub-category/${sub_category}/model/${model}/release-year/${releaseYear}`);
    }


    getPaginatedPartsOnMarket(page = 1) {
        return http.get("/products-on-market/paginated?limit=5&page=" + page);
    }

    getSparePartPaginatedOnMarket(page = 1) {
        return http.get("/products-on-market/products/paginated?limit=5&page=" + page);
    }

    getPartOnMarketDetails(id) {
        return http.get("/products-on-market/products/" + id);
    }


    searchPaginatedPartsOnMarket(search, page = 1) {
        return http.get(`/products-on-market/search/paginated?name=${search}&limit=5&page=${page}`);
    }

    updatePartOnMarket(id, data) {
        return http.put(`/products-on-market/${id}`, data);
    }

    updatePartInStock(id, data) {
        return http.put(`/parts-in-stock/${id}`, data);
    }

    getSparePartsOnMarketByGeneralCategory(id) {
        return http.get(`/products/general-category/${id}`);
    }

    deletePartOnMarket(id) {
        return http.delete(`/products-on-market/${id}`);
    }

    getNestedPart(id) {
        return http.get(`/products-on-market/${id}`);
    }


    getSecondHandParts(page = 1, limit) {
        return http.get(`/products-on-market/second_hand?limit=${limit}&page=${page}`)
    }


    searchPart(text) {
        return http.get(`/products-on-market/search?name=${text}`)
    }

    setShowcase(id, status) {
        if (status)
            return http.put(`/products/showcase/${id}`)
        else
            return http.put(`/products/unshowcase/${id}`)
    }

    getSparePartDetails(id) {
        return http.get(`/products/${id}/details`)
    }

    partNumberExists(part_number) {
        return http.get(`/products/part-number/exists/${part_number}`)
    }


    getSparePartsOnMarketByCompany(id) {
        return http.get("/products-on-market/company/" + id)
    }

    getTopProducts(page = 1) {
        return http.get(`/products-on-market/top-products`)
    }

    toggleShowCaseOnMarket(id) {
        return http.put(`/products-on-market/toogle/showcase/${id}`)
    }

    getJustForYouProducts(page = 1, limit = 20) {
        return http.get(`/products-on-market/just-for-you?limit=${limit}&page=${page}`)
    }

    getOnMarketDetails(id) {
        return http.get(`/products-on-market/spare-part/${id}/exists`)
    }

    getVanishingItems(page = 1, limit) {
        return http.get(`/${market_model_url}/vanishing-products?limit=${limit}&page=${page}`)
    }

    //Supp
}

export default new ProductsService()
