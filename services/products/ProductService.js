import http from "../http-common";

const market_model_url = "products-on-market";
const products_model_url = "products";

class ProductService {
  getAll() {
    return http.get("/products");
  }

  getProductCategories() {
    return http.get("/product-categories");
  }

  getProductsInCategory(id) {
    return http.get("/products-on-market/category/" + id);
  }

  getAllByCategory(id) {
    return http.get("/products/" + id);
  }

  createProduct(data) {
    return http.post("/products", data);
  }

  updateProduct(id, data) {
    return http.put("/products/" + id, data);
  }

  getCategorizedProducts(sub_category) {
    return http.get("/products/sub-category/" + sub_category);
  }

  getAllProductsOnMarket() {
    return http.get("/products-on-market");
  }

  getProduct(id) {
    return http.get("/products/" + id);
  }

  getPaginatedProducts(page = 1) {
    return http.get("/products/paginated?limit=5&page=" + page);
  }

  searchPaginatedProducts(search, page = 1, limit = 5) {
    return http.get(
      `/products/search/paginated?name=${search}&limit=${limit}&page=${page}`
    );
  }

  deleteProduct(id) {
    return http.delete("/products/" + id);
  }

  deleteSparePartImage(id, imageId) {
    return http.delete(
      `/products/delete-image/spare-part/${id}/image/${imageId}`
    );
  }

  //in stock
  getPartsInStock() {
    return http.get("/parts-in-stock");
  }

  getPaginatedPartsInStock(page = 1) {
    return http.get("/parts-in-stock/paginated?limit=5&page=" + page);
  }

  searchPaginatedPartsInStock(search, page = 1) {
    return http.get(
      `/parts-in-stock/search/paginated?name=${search}&limit=5&page=${page}`
    );
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
    return http.get("/products-on-market/valid");
  }

  addImage(id, formData) {
    return http.put("/products/upload-image/" + id, formData);
  }

  getPartOnMarketById(id) {
    return http.get(`/products-on-market/${id}`);
  }

  createProductOnMarket(data) {
    return http.post("/products-on-market", data);
  }

  getPartsOnMarketByModelSubCategoryYear(sub_category, model, releaseYear) {
    return http.get(
      `/products-on-market/sub-category/${sub_category}/model/${model}/release-year/${releaseYear}`
    );
  }

  getPaginatedProductsOnMarket(page = 1) {
    return http.get("/products-on-market/paginated?limit=5&page=" + page);
  }

  getProductPaginatedOnMarket(page = 1) {
    return http.get(
      "/products-on-market/products/paginated?limit=5&page=" + page
    );
  }

  getPartOnMarketDetails(id) {
    return http.get("/products-on-market/products/" + id);
  }

  searchPaginatedPartsOnMarket(search, page = 1) {
    return http.get(
      `/products-on-market/search/paginated?name=${search}&limit=5&page=${page}`
    );
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
    return http.get(
      `/products-on-market/second_hand?limit=${limit}&page=${page}`
    );
  }

  searchPart(text) {
    return http.get(`/products-on-market/search?name=${text}`);
  }

  setShowcase(id, status) {
    if (status) return http.put(`/products/showcase/${id}`);
    else return http.put(`/products/unshowcase/${id}`);
  }

  getSparePartDetails(id) {
    return http.get(`/products/${id}/details`);
  }

  productNameExists(product_name) {
    return http.get(`/products/product-name/exists/${product_name}`);
  }

  getByProduct(id) {
    return http.get(`/products-on-market/product/${id}`);
  }

  getByProductExists(id) {
    return http.get(`/products-on-market/product/${id}/exists`);
  }

  getSparePartsOnMarketByCompany(id) {
    return http.get("/products-on-market/company/" + id);
  }

  getTopProducts() {
    return http.get(`/products-on-market/top-products`);
  }

  toggleShowCaseOnMarket(id) {
    return http.put(`/products-on-market/toogle/showcase/${id}`);
  }

  getJustForYouProducts(page = 1, limit = 40) {
    return http.get(
      `/products-on-market/recommendation?limit=${limit}&page=${page}`
    );
  }

  getOnMarketDetails(id) {
    return http.get(`/products-on-market/spare-part/${id}/exists`);
  }

  getVanishingItems(page = 1, limit) {
    return http.get(
      `/${market_model_url}/vanishing-products?limit=${limit}&page=${page}`
    );
  }

  //Supp
}

export default new ProductService();
