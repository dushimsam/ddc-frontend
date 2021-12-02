import styles from "../../styles/components/spare-part.module.css"
import Router from "next/router";
import {gotoPathDirect} from "../../utils/functions";
import {useDispatch, useSelector} from "react-redux";
import React from "react";
import {addItemToCart, increment} from "../../store/actions/cart-actions";
import {showAddToCartModal} from "../../store/actions/add-to-cart-modal-actions";
import globalStyles from "../../styles/global-colors.module.css"
import {CartIcon} from "../../icons";

export const Rating = ({rating}) => {
    const stars = [1, 2, 3, 4, 5];

    return (
        stars?.map(star => {
            return (
                <span
                    style={{cursor: 'pointer'}}
                    className={(star <= rating) ? globalStyles.globalTextColor : ""}
                >
                                        {
                                            star <= rating ? "★" : "☆"
                                        }
                                                         </span>
            );
        })
    )
}
export default function Product({product, hideBtn, price = 1000, productOnMarketId, image, containerStyle}) {
    let currency = useSelector((state) => state.appCurrency);

    console.log(product)
    const dispatch = useDispatch();

    let cart = useSelector((state) => state.cart);


    const call_action = () => {
        if (cart.filter((item) => item._id === product._id).length === 0) {
            dispatch(addItemToCart(product));
        } else {
            dispatch(increment(product._id));
        }
    }

    const addToCart = async () => {
        if (product.quantity > 0) {
            call_action();
        }
        dispatch(showAddToCartModal(product));
    };
    return (
        <div className={"card  p-1  " + (!containerStyle ? styles.container : containerStyle)} title={product?.product.name}>
            <img
                onClick={() => Router.push(gotoPathDirect("/products", productOnMarketId))}
                src={"/img/default.jpg"}
                className={"img-fluid  m-auto cursor-pointer " + styles.image}
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://media.self.com/photos/57e00e471db118765d302bdd/4:3/w_768,c_limit/sub-channel-beauty_makeup.jpg"
                }}
                style={{width: "100%", height: "9.5em"}}
                alt={product?.product.name}/>

            <div className="mt-2 d-flex justify-content-between align-items-start px-1">
                <div className="pl-1">
                    <p className="text-secondary  cursor-pointer font-weight-bolder"
                       style={moreStyles.text}
                       data-placement="bottom"
                       title={product?.name}>{product?.product?.name}</p>
                </div>
                <div className={""}>
                    <p className={"font-weight-lighter"}>{price} Frw</p>
                </div>
            </div>
            <div className={"ml-2 mt-n2"}>
                <div className={"rounded px-2 py-1 mr-5"} style={moreStyles.div_category}>
                    {product.product.product_category.name}
                </div>
                <div>
                    <Rating rating={3}/>
                </div>
            </div>

            {
                !hideBtn ? <>
                    <hr className={" mx-5 mt-n0 " + globalStyles.globalBackColor}/>
                    <button onClick={()=>addToCart()} className={"btn px-2 py-1 text-white " + globalStyles.globalBackColor}
                            style={moreStyles.button}><CartIcon height={16} width={16}/> Add to
                        cart
                    </button>
                </> : <></>
            }

        </div>
    )
}

const moreStyles = {
    div_category: {
        background: "rgba(112,112,112,0.13)",
        color: "rgba(112,112,112,0.98)",
        fontSize: "0.7em",
        width: "7em"
    },
    text: {
        display: "block", maxWidth: "8em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        fontSize: "0.8em"
    }
}
