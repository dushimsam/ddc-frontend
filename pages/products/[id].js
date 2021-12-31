import React, {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"

import Head from "next/head";
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer";
import {useRouter} from "next/router"
import globalStyles from "../../styles/global-colors.module.css"
import SparePartService from "../../services/products/ProductService"

import {addItemToCart, increment} from "../../store/actions/cart-actions";
import {showAddToCartModal} from "../../store/actions/add-to-cart-modal-actions";
import {app_config} from "../../utils/constants";
import CursorZoom from 'react-cursor-zoom';
import {handleDoubleDecryptionPath} from "../../utils/functions";
import {currencyMapping} from "../../utils/currency-converter";

const ImageZoom = ({imgUrl}) => {
    return (
        <CursorZoom
            image={{
                src: imgUrl,
                width: "100%",
                height: "100%"
            }}
            zoomImage={{
                src: imgUrl,
                width: 700,
                height: 100
            }}
            cursorOffset={{x: 0, y: 0}}
        />
    );
};


export default function ProductView() {
    const cart = useSelector(state => state.cart)

    const [availabilityDetails, setAvailabilityDetails] = useState({available: true, visible: false})
    const [disabled, setDisabled] = useState(true)

    const dispatch = useDispatch()
    const router = useRouter();
    const id = router.query.id

    const [product, setPartOnMarket] = useState(null)
    const [currentImage, setCurrentImage] = useState("https://flevix.com/wp-content/uploads/2019/12/Barline-Loading-Images-1.gif")
    const currency = useSelector((state) => state.appCurrency);
    useEffect(() => {
        document.addEventListener('copy', (event) => {
            const pagelink = `\n\nRead more at: ${document.location.href}`;
            event.clipboardData.setData('text', document.getSelection() + pagelink);
            event.preventDefault();
        });
    })

    const getPartOnMarket = () => {
        (async function () {
            try {
                let {data} = await SparePartService.getNestedPart(
                    handleDoubleDecryptionPath(id)
                );
                setPartOnMarket(data);
                setDisabled(false)
                setCurrentImage(data.product.imageUrls[0]);

                //
                // if (data.quantity < 1) {
                //     handle_set_availability(setAvailabilityDetails, data)
                // } else {
                //     setDisabled(false)
                // }
            } catch (e) {
                console.log(JSON.stringify(e.response?.data?.message));
            }
        })();
    };

    const [currUrl, setCurrUrl] = useState(null);
    useEffect(() => {
        setCurrUrl(window.location.href)
    }, []);

    useEffect(() => {
        id && getPartOnMarket();
    }, [id]);

    if (!product) return <div></div>;

    const handleAddToCart = () => {
        if (cart.filter((item) => item._id === product._id).length === 0) {
            dispatch(addItemToCart(product));
        } else {
            dispatch(increment(product._id));
        }
        // notifySuccess("1 Quantity added on the cart successfully")
        dispatch(showAddToCartModal(product));
    };


    // const currency="RWF"
    const majorWid = 280;
    return (
        <div>
            <Head>
                <title>
                    {" "}
                    {product?.product.name + " - " + product?.product.product_category.name} | {app_config.APP_NAME}{" "}
                </title>
                <meta name={"description"}
                      content={"More about " + product?.product.description}/>
                <meta property={"og:title"}
                      content={"Buy " + product?.product.name + " - " + product?.product.product_category.name}/>
            </Head>
            <div>
                <Navbar/>
                <main className="container py-5">
                    <div className="row justify-content-lg-between">
                        <div className="col-lg-5 col-12">
                            {/*<PartAvailability availabilityDetails={availabilityDetails}*/}
                            {/*                  setAvailabilityDetails={setAvailabilityDetails}/>*/}
                            <div className="card p-4">
                                <ImageZoom imgUrl={currentImage}/>
                            </div>
                            <div className="row row-cols-5 mt-4">
                                {product.product?.imageUrls?.length > 1 ? product.product.imageUrls.map(
                                    (image, i) => (
                                        <div className="col mb-3" key={i}>
                                            <img
                                                src={image}
                                                onClick={() => setCurrentImage(image)}
                                                alt="Image at I"
                                                className="rounded-sm border cursor-pointer"
                                                style={{width: "100%"}}
                                            />

                                        </div>
                                    )
                                ) : <></>}
                            </div>
                        </div>
                        <div className="col-lg-5 col-12">
                            <h3 className="font-weight-bold mb-4">
                                {product?.product.name}
                            </h3>
                            <hr/>
                            <div className="mt-4 container">

                                <div
                                    className="row"
                                >
                                    <div className="col-4 text-secondary font-weight-bold">
                                        Product code :
                                    </div>
                                    <div className="col-4">{product?.product.product_code}</div>
                                </div>

                                <div
                                    className="row"
                                >
                                    <div className="col-4 text-secondary font-weight-bold">
                                        Weight :
                                    </div>
                                    <div className="col-4">{product?.product.weight}</div>
                                </div>

                                <div
                                    className="row"
                                >
                                    <div className="col-4 text-secondary font-weight-bold">
                                        Description :
                                    </div>
                                    <div className="col-4">{product?.product.description}</div>
                                </div>
                            </div>
                            <div className="mt-5">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="289.943"
                                    height="68.953"
                                    viewBox="0 0 289.943 68.953"
                                >
                                    <g
                                        id="Group_22"
                                        data-name="Group 22"
                                        transform="translate(-751 -258)"
                                    >
                                        <g
                                            id="Path_19"
                                            data-name="Path 19"
                                            transform="translate(751 258)"
                                            fill="#fff"
                                        >
                                            <path
                                                d="M 247.2080230712891 68.45262145996094 L 0.5000011324882507 68.45262145996094 L 0.5000011324882507 0.5000174045562744 L 289.04833984375 0.5000174045562744 L 247.2080230712891 68.45262145996094 Z"
                                                stroke="none"
                                            />
                                            <path
                                                d="M 1 0.9999923706054688 L 1 67.95261383056641 L 246.9286956787109 67.95261383056641 L 288.1532897949219 0.9999923706054688 L 1 0.9999923706054688 M 0 -7.62939453125e-06 L 289.943359375 -7.62939453125e-06 L 247.4873352050781 68.95261383056641 L 0 68.95261383056641 L 0 -7.62939453125e-06 Z"
                                                stroke="none"
                                                fill="#e89c9a"
                                            />
                                        </g>
                                        <text
                                            id="_200_000_FRW"
                                            data-name="200, 000 FRW"
                                            transform="translate(784 305)"
                                            fill="#cb2e25"
                                            fontSize="34"
                                            fontFamily="Larsseit-Bold, Larsseit"
                                            fontWeight="700"
                                        >
                                            <tspan x="0" y="0">
                                                {product && currencyMapping(currency, product?.unit_price)}
                                            </tspan>
                                        </text>
                                    </g>
                                </svg>
                            </div>
                            <hr/>

                            <div className="d-flex justify-content-between">
                                <button className={"btn text-white font-weight-bold " + globalStyles.globalBackColor}
                                        onClick={handleAddToCart}
                                        disabled={disabled}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="16"
                                        height="16"
                                    >
                                        <path fill="none" d="M0 0h24v24H0z"/>
                                        <path
                                            d="M4 6.414L.757 3.172l1.415-1.415L5.414 5h15.242a1 1 0 0 1 .958 1.287l-2.4 8a1 1 0 0 1-.958.713H6v2h11v2H5a1 1 0 0 1-1-1V6.414zM5.5 23a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm12 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
                                            fill="rgba(255,255,255,1)"
                                        />
                                    </svg>
                                    <span className="pl-3">Add to cart</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer/>
            </div>
        </div>
    );
}
