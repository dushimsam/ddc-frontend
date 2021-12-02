import { useState, useEffect } from "react";
import Head from "next/head";
import { Swiper, SwiperSlide } from "swiper/react";
import Footer from "../components/Footer";
import Navbar from "../components/navbar";
import { app_config } from "../utils/constants";
import styles from "../styles/components/welcomePage.module.css";
import AboutUsPart from "../components/homepage/aboutUs.jsx";
import CarouselPart from "../components/homepage/carousel";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSearchMore = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  useEffect(() => {
    handleSearchMore();
  }, []);

  const breakPoints = {
    600: {
      slidesPerView: 2,
    },
    767: {
      slidesPerView: 3,
    },
    900: {
      slidesPerView: 4,
    },
    1300: {
      slidesPerView: 5.2,
    },
  };

  const jumpToSlide = (slideNumber) => {
    const swiper = document.querySelector(".popular-products-swiper").swiper;
    swiper.slideTo(slideNumber, 1000, false);
  };
  return (
    <div>
      <Head>
        <title>{app_config.APP_NAME}</title>
      </Head>

      <div className={"container-fluid m-0 p-0"}>
        <Navbar />
        <div className={`bg-darkish`}>
          <div className={`d-flex justify-content-between mt-5 mb-5`}>
            <div
              className={`d-flex align-items-start flex-column col-12 col-sm-6`}
              style={{ border: "1px solid red" }}
            >
              <h4 className={"col-9 col-sm-7 text-justify"}>
                Find the best cosmetic products for yourself and friend!
              </h4>
              <p>DDC Cosmetics is an E-Commerce </p>
            </div>
            <div
              className={`d-flex flex-column col-12 col-sm-6`}
              style={{ border: "1px solid red" }}
            >
              <div
                className={`p-0  mt-3 products-area pb-5 bg-light ${styles.products}`}
              >
                {loading ? (
                  <div className="row row-cols-1 row-cols-xs-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 row-cols-xl-6">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="col p-2 top-products">
                        <div className="rounded py-0 bg-whiterounded">
                          <div className="loading h-100 rounded-top my-0 p-0" />
                          <div className="prod-desc py-2 px-3">
                            <p className="h-10 loading col-10" />
                            <p className="loading h-10 mt-0 col-8" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Swiper
                    className={"popular-products-swiper"}
                    slidesPerView={1}
                    breakpoints={breakPoints}
                    onSlideChange={(swiper) =>
                      setCurrentSlide(swiper.activeIndex)
                    }
                    onSwiper={(swiper) => true}
                    spaceBetween={5}
                  >
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                      <SwiperSlide>
                        <div
                          className={
                            "card border-0 pt-3 pb-2 col " +
                            styles.right_top__product
                          }
                          key={item}
                        >
                          <img
                            src="images/perfume.jpg"
                            alt="perfume"
                            className={`rounded `}
                          />
                          <h>Body spray</h>
                          <button
                            style={{
                              border: "none",
                              fontSize: "13px",
                              backgroundColor: "#EBEBEB",
                              color: "#898888",
                            }}
                            className={"btn text-white border-none "}
                            onClick={() => Router.push("/auth/register")}
                          >
                            Body care
                          </button>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
              </div>
              <div className="controls text-right px-3 col-sm-5 col-md-3 ml-auto mb-0">
                <button
                  className="btn btn-default bg-white p-0  border rounded-0 rounded-right"
                  disabled={currentSlide === 0}
                  onClick={() => jumpToSlide(currentSlide - 1)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z" />
                  </svg>
                </button>
                <button
                  className="btn btn-default bg-white p-0 border rounded-0 border-left-0"
                  disabled={currentSlide === 5 - 1 || currentSlide === 5}
                  onClick={() => jumpToSlide(currentSlide + 1)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <CarouselPart />
          <AboutUsPart />
        </div>
        {/*<ReachUsOnWhatsapp/>*/}
        <Footer />
      </div>
    </div>
  );
}
