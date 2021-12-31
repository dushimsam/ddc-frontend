import styles from "../../styles/components/welcomePage.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import Product from "../reusable/Product";
import ProductService from "../../services/products/ProductService";
import { Cursors } from "../reusable/scrollor-cursors";
import { items } from "../../utils/constants";

export const Products = ({
  loading,
  setCurrentSlide,
  breakPoints,
  products,
}) => {
  return (
    <div
      className={`p-0  mt-3 recommended-products-area pb-5  ${styles.products}`}
    >
      {loading ? (
        <div className="row row-cols-1 row-cols-xs-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 row-cols-xl-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="col p-2 recommended-products">
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
        <Swiper
          className={"recommended-products-swiper"}
          slidesPerView={1}
          breakpoints={breakPoints}
          onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
          onSwiper={(swiper) => true}
          spaceBetween={1}
        >
          {products.map((item) => (
            <SwiperSlide key={item._id}>
              <Product
                product={item}
                productOnMarketId={item?._id}
                image={item.product?.imageUrls[0]}
                price={item?.unit_price}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

const TopProducts = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(false);
  const [productCategories, setProductCatgories] = useState([]);
  const [productCategory, setProductCategory] = useState("Top products");
  const [products, setProducts] = useState(items);
  const [categProds, setCategProds] = useState(items);

  const breakPoints = {
    200: {
      slidesPerView: 1,
    },
    290: {
      slidesPerView: 1.1,
    },
    360: {
      slidesPerView: 1.4,
    },
    440: {
      slidesPerView: 1.7,
    },
    500: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2.3,
    },
    800: {
      slidesPerView: 2.5,
    },
    900: {
      slidesPerView: 2.8,
    },
    1000: {
      slidesPerView: 3.4,
    },
    1300: {
      slidesPerView: 4,
    },
  };

  const jumpToSlide = (slideNumber) => {
    const swiper = document.querySelector(".popular-products-swiper").swiper;
    swiper.slideTo(slideNumber, 1000, false);
  };

  useEffect(() => {
    setLoading(true);
    ProductService.getTopProducts()
      .then((res) => {
        setProducts(res.data);
        setCategProds(res.data);
        setLoading(false);
      })
      .catch((e) => console.log(e));
    ProductService.getProductCategories()
      .then((res) => {
        setProductCatgories(res.data);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, []);

  const getProdsInSelectedCategory = (catId, catName) => {
    setProductCategory(catName ? catName : "Top products");
    if (catId) {
      let filteredProds = products.filter((prod) => {
        return prod.product.product_category._id == catId;
      });
      setCategProds(filteredProds);
    } else {
      setCategProds(products);
    }
  };

  return (
    <div className={"container pt-3"}>
      <div className={"row d-flex justify-content-between"}>
        <div className={"col-8 col-sm-4"}>
          <h5>Top products</h5>
          <Cursors currentSlide={currentSlide} jumpToSlide={jumpToSlide} />
        </div>
        <div className="col-8 col-sm-2">
          <select
            name="product-categories"
            id="prodct-categories__select"
            className="w-100 p-1 col-12"
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
              <option key={prodCateg._id} value={JSON.stringify(prodCateg)}>
                {prodCateg.name}
              </option>
            ))}
          </select>
          <h6>{productCategory}</h6>
        </div>
      </div>
      <div className={"row justify-content-center"}>
        <div className={"col-12"}>
          {categProds != 0 ? (
            <Products
              loading={loading}
              setCurrentSlide={setCurrentSlide}
              breakPoints={breakPoints}
              currentSlide={currentSlide}
              jumpToSlide={jumpToSlide}
              products={categProds}
            />
          ) : (
            <h5 className="pt-2 text-center">
              No top products in the selected category!
            </h5>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopProducts;
