import globalStyles from "../../styles/global-colors.module.css";
import { PlayIcon } from "../../icons";
import styles from "../../styles/components/welcomePage.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import React, { useEffect, useState } from "react";
import ProductService from "../../services/products/ProductService";
import { Cursors } from "../reusable/scrollor-cursors";
import { items } from "../../utils/constants";
import productStyles from "../../styles/components/spare-part.module.css";
import Product from "../reusable/Product";

export const Products = ({
  loading,
  setCurrentSlide,
  breakPoints,
  products,
}) => {
  return (
    <div
      className={`p-0  mt-3 welcoming-products-area pb-5  ${styles.products}`}
    >
      {loading ? (
        <div className="row row-cols-1 row-cols-xs-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 row-cols-xl-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="col p-2 welcoming-products">
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
          className={"welcoming-products-swiper"}
          slidesPerView={1}
          breakpoints={breakPoints}
          onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
          onSwiper={(swiper) => true}
          spaceBetween={1}
        >
          {products.map((item) => (
            <SwiperSlide>
              <Product
                product={item}
                hideBtn={true}
                containerStyle={productStyles.container2}
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

const WelcomingProducts = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(false);

  const breakPoints = {
    200: {
      slidesPerView: 1.5,
    },
    800: {
      slidesPerView: 3,
    },
    900: {
      slidesPerView: 3.1,
    },
    1300: {
      slidesPerView: 3.1,
    },
  };

  const jumpToSlide = (slideNumber) => {
    const swiper = document.querySelector(".welcoming-products-swiper").swiper;
    swiper.slideTo(slideNumber, 1000, false);
  };

  const [products, setProducts] = useState(items);

  useEffect(() => {
    // setProducts(items)

    setLoading(true);
    ProductService.getAllProductsOnMarket()
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className={"container"}>
      <div className={"row justify-content-sm-between justify-content-center mt-5"}>
        <div className={"col-sm-5 pt-3 col-11 "}>
          <h4>Find the best cosmetic products for yourself and friend!</h4>
          <p className={"mt-2"}>
            DDC only picks products with immediate effect: „THE WOW EFFECT “, combining natural and luxurious ingredients with aroma packaged into unique designs.
          </p>
          <div className={"d-flex"}>
            <button
              className={
                "btn py-2 px-4 text-white font-weight-bold " +
                globalStyles.globalBackColor
              }
            >
              Order Now
            </button>
            <>
              <button className={"btn mx-4"}>Watch our story</button>
              <PlayIcon height={40} width={40} />
            </>
          </div>
        </div>
        <div className={"col-sm-7 col-12"}>
          <div className={"container"}>
            <div className={"row"}>
              <Products
                loading={loading}
                setCurrentSlide={setCurrentSlide}
                breakPoints={breakPoints}
                currentSlide={currentSlide}
                jumpToSlide={jumpToSlide}
                products={products}
              />
            </div>
            <div className={"row justify-content-center mt-n4"}>
              <Cursors
                currentSlide={currentSlide}
                jumpToSlide={jumpToSlide}
                width={30}
                height={30}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomingProducts;

const moreStyles = {
  div_category: {
    background: "rgba(112,112,112,0.13)",
    color: "rgba(112,112,112,0.98)",
    fontSize: "0.7em",
    width: "7em",
  },
  button: {
    background: "#E652DC",
    color: "white",
  },
  text: {
    display: "block",
    maxWidth: "8em",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontSize: "0.8em",
  },
};
