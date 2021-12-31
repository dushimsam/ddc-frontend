import React, { useEffect, useState } from "react";

import styles from "../../styles/components/products.module.css";
import Product from "../../components/reusable/Product";
import ProductService from "../../services/products/ProductService";
import NavBar from "../../components/navbar";
import Footer from "../../components/Footer";
import { RightArrowIcon, LineIcon } from "../../icons";

const Products = ({ loading, products }) => {
  return (
    <div className={`p-0  mt-3 products-area pb-5  ${styles.products}`}>
      {loading ? (
        <div className="row row-cols-1 row-cols-xs-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
            <div key={item} className="col p-4 top-products">
              <div className="rounded py-0 bg-whiterounded">
                <div className="loading h-100 rounded-top my-0 p-0" />
                <div className="prod-desc py-2 px-3">
                  <p className="h-10 loading col-12" />
                  <p className="loading h-10 mt-0 col-8" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-xs-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-4 justify-content-center">
          {products.map((item) => (
            <div key={item?._id} className="col p-4 top-products">
              <Product
                product={item}
                productOnMarketId={item?._id}
                image={item.product?.imageUrls[0]}
                price={item?.unit_price}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ProductsInCategory = () => {
  const [loading, setLoading] = useState(false);
  const [productCategories, setProductCatgories] = useState([]);
  const [products, setProducts] = useState([]);
  const [productCategory, setProductCategory] = useState("All");

  useEffect(() => {
    setLoading(true);
    ProductService.getProductCategories()
      .then((res) => {
        setProductCatgories(res.data);
        setLoading(false);
      })
      .catch((e) => console.log(e));
    ProductService.getAllProductsOnMarket()
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, []);

  const getProdsInSelectedCategory = (prodId, prodName) => {
    setProductCategory(prodName ? prodName : "All");
    if (prodId) {
      setLoading(true);
      ProductService.getProductsInCategory(prodId)
        .then((res) => {
          setProducts(res.data);
          setLoading(false);
        })
        .catch((e) => console.log(e));
    } else {
      ProductService.getAllProductsOnMarket()
        .then((res) => {
          setProducts(res.data);
          setLoading(false);
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <React.Fragment>
      <NavBar />
      <div className="contianer-fluid d-flex">
        {/* <div className="col-2">This is the sidebar</div> */}
        <div className="container-fluid">
          <div className="container">
            <div className="d-flex pt-3">
              <p className={`pr-4 ${styles.firstFont}`}>Home </p>
              <p>
                <RightArrowIcon />
              </p>
              <p className={`pl-4 ${styles.secondFont}`}> All Products</p>
            </div>
            <LineIcon width={"100%"} />
          </div>
          <div>
            <div className={"container pt-5"}>
              <div className={"row d-flex justify-content-between"}>
                <h5 className="col-8 col-sm-4 pl-0">
                  {productCategory ? productCategory : "All "} products
                </h5>
                <select
                  name="product-categories"
                  id="prodct-categories__select"
                  className="col-8 col-sm-2"
                  onChange={(e) =>
                    e.target.value != ""
                      ? getProdsInSelectedCategory(
                          JSON.parse(e.target.value)._id,
                          JSON.parse(e.target.value).name
                        )
                      : getProdsInSelectedCategory("", "")
                  }
                >
                  <option value="">Choose category</option>
                  {productCategories.map((prodCateg) => (
                    <option
                      key={prodCateg._id}
                      value={JSON.stringify(prodCateg)}
                    >
                      {prodCateg.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className={"row d-flex justify-content-center"}>
                <div className={"col-12"}>
                  <Products loading={loading} products={products} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default ProductsInCategory;
