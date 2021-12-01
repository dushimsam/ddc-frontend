import globalStyles from "../../styles/global-colors.module.css"
import {PlayIcon} from "../../icons";
import styles from "../../styles/components/welcomePage.module.css";
import {Swiper, SwiperSlide} from "swiper/react";
import Product from "../reusable/Product";
import {useEffect, useState} from "react";
import ProductService from "../../services/products/ProductService";
import {Cursors} from "../reusable/scrollor-cursors";

export const Products = ({loading, setCurrentSlide, breakPoints, products}) => {
    return (
        <div
            className={`p-0  mt-3 products-area pb-5  ${styles.products}`}
        >
            {loading ? (
                <div
                    className="row row-cols-1 row-cols-xs-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 row-cols-xl-6">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="col p-2 top-products">
                            <div className="rounded py-0 bg-whiterounded">
                                <div className="loading h-100 rounded-top my-0 p-0"/>
                                <div className="prod-desc py-2 px-3">
                                    <p className="h-10 loading col-10"/>
                                    <p className="loading h-10 mt-0 col-8"/>
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
                    onSlideChange={(swiper) =>
                        setCurrentSlide(swiper.activeIndex)
                    }
                    onSwiper={(swiper) => true}
                    spaceBetween={1}
                >
                    {products.map((item) => (
                        <SwiperSlide>
                            <Product product={item.product}
                                     productOnMarketId={item?._id}
                                     image={item.product?.imageUrls[0]}
                                     price={item?.unit_price}/>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>

    )
}


const WelcomingProducts = () => {

    const [currentSlide, setCurrentSlide] = useState(0);
    const [loading, setLoading] = useState(false);

    const breakPoints = {
        200: {
            slidesPerView: 2,
        },
        800: {
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
        const swiper = document.querySelector(".recommended-products-swiper").swiper;
        swiper.slideTo(slideNumber, 1000, false);
    };

    const [products, setProducts] = useState([]);

    useEffect(() => {
        ProductService.getAllProductsOnMarket()
            .then((res) => {
                setProducts(res.data)
            }).catch(e => console.log(e))
    }, [])

    return (
        <div className={"container"}>
            <div className={"row justify-content-between"}>
                <div className={"col-5"}>
                    <h4>Find the best cosmetic products for yourself and friend!</h4>
                    <p className={"mt-2"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit
                        sed do eiusmod tempor incididunt ut labore et dolore ma
                        gna aliqua. Ut enim ad minim veniam..</p>
                    <div className={"d-flex"}>
                        <button className={"btn py-2 px-4 " + globalStyles.globalBackColor}>Order Now</button>
                        <button className={"btn mx-4"}>Watch our story</button>
                        <PlayIcon height={30} width={30}/>
                    </div>
                </div>
                <div className={"col-7"}>
                    <div className={"container"}>
                        <div className={"row"}>
                            <Products loading={loading} setCurrentSlide={setCurrentSlide} breakPoints={breakPoints}
                                      currentSlide={currentSlide} jumpToSlide={jumpToSlide} products={products}/>
                        </div>
                        <div className={"row justify-content-center"}>
                            <Cursors currentSlide={currentSlide} jumpToSlide={jumpToSlide}/>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default WelcomingProducts;