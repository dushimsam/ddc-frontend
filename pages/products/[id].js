import React, {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"

import Head from "next/head";
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer";
import {useRouter} from "next/router"

import SparePartService from "../../services/products/ProductService"

import {addItemToCart, increment} from "../../store/actions/cart-actions";
import {showAddToCartModal} from "../../store/actions/add-to-cart-modal-actions";
import {decryptText, decryptTextSimple, doubleDecryption} from "../../utils/encryption-decryption";
import {app_config} from "../../utils/constants";
import productCategoriesService from "../../services/product-categories/product-categories.service";
import CursorZoom from 'react-cursor-zoom';
import {handleDoubleDecryptionPath} from "../../utils/functions";
import {
    convertFromRdaToEuro,
    convertFromRdaToUsd,
    currencyMapping,
    defaultCurrency
} from "../../utils/currency-converter";
import PartAvailabilityService from "../../services/products/PartAvailabilityService";
import {handle_set_availability} from "../../utils/reusables";
import {PartAvailability} from "../../components/alerts/part-availability";

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

const SingleList = ({category}) => {
    console.log("Category ", category)

    return (
        <li>{category?.model?.company.name + " | " + category?.model.name + " | " + category.release_years[0] + " - " + category.release_years[category.release_years.length - 1]}</li>
    )
}

const SpareFits = ({sparePart}) => {
    const [mutableCategories, setMutableCategories] = useState()

    function update(endIndex) {
        let newArray = [];
        for (let i = 0; i <= endIndex; i++) {
            newArray = [...newArray, sparePart.categories[i]]
        }
        setMutableCategories(newArray);
    }

    useEffect(() => {
        update(sparePart.categories.length <= 4 ? (sparePart.categories.length - 1) : 3);
    }, [])

    return (
        <div className={"container"}>
            <div className={"row"}>
                <div className={"col-12"}>
                    <ul>
                        {
                            mutableCategories?.map((category) => <SingleList category={category} key={category}/>)
                        }
                    </ul>
                    {(mutableCategories?.length < sparePart.categories.length) ?
                        <a className={"cursor-pointer text-decoration-none text-primary"}
                           style={{textDecoration: "underline"}}
                           onClick={() => update(sparePart.categories.length - 1)}>show
                            more</a> : (mutableCategories?.length > 4) ?
                            <a className={"cursor-pointer text-decoration-none text-info"}
                               style={{textDecoration: "underline"}} onClick={() => update(3)}>show
                                less</a> : <></>
                    }

                </div>
            </div>
        </div>
    )
}
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
                setCurrentImage(data.part_in_stock.spare_part.imageUrls[0]);

                if (data.quantity < 1) {
                    handle_set_availability(setAvailabilityDetails, data)
                } else {
                    setDisabled(false)
                }
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
                    {product?.part_in_stock.spare_part.name + " - " + product?.part_in_stock.spare_part.part_number} | {app_config.APP_NAME}{" "}
                </title>
                <meta name={"description"}
                      content={"More about " + product?.part_in_stock.spare_part.name + " - " + product?.part_in_stock.spare_part.part_number}/>
                <meta property={"og:title"}
                      content={"Buy " + product?.part_in_stock.spare_part.name + " - " + product?.part_in_stock.spare_part.part_number}/>
            </Head>
            <div>
                <Navbar/>
              This is the product's Page.
                <Footer/>
            </div>
        </div>
    );
}
