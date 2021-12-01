import styles from "../../styles/components/spare-part.module.css"
import Router from "next/router";
import {gotoPathDirect} from "../../utils/functions";
import {useDispatch, useSelector} from "react-redux";
import React from "react";
import {addItemToCart, increment} from "../../store/actions/cart-actions";
import {showAddToCartModal} from "../../store/actions/add-to-cart-modal-actions";
import globalStyles from "../../styles/global-colors.module.css"
import {CartIcon} from "../../icons";

const Rating = ({rating}) => {
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
export default function Product({product, price = 1000, productOnMarketId, image}) {
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
        <div className={"card  p-1 " + styles.container} title={product?.name}>
            <img
                onClick={() => Router.push(gotoPathDirect("/products", productOnMarketId))}
                src={"https://media.self.com/photos/57e00e471db118765d302bdd/4:3/w_768,c_limit/sub-channel-beauty_makeup.jpg"}
                className={"img-fluid  m-auto cursor-pointer " + styles.image}
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://media.self.com/photos/57e00e471db118765d302bdd/4:3/w_768,c_limit/sub-channel-beauty_makeup.jpg"
                }}
                style={{width: "100%", height: "12em"}}
                alt={product?.name}/>

            <div className="mt-3 d-flex justify-content-between align-items-start px-1">
                <div className="pl-1">
                    <p className="text-secondary mb-1 cursor-pointer font-weight-bolder"
                       style={moreStyles.text}
                       data-placement="bottom"
                       title={product?.name}>{product?.name}</p>
                </div>
                <div className={"pr)&"}>
                    <p className={"font-weight-lighter"}>{price} Frw</p>
                </div>
            </div>
            <div className={"rounded p-2 mr-5"} style={moreStyles.div_category}>
                {product.product_category.name}
            </div>
            <div>
                <Rating rating={3}/>
            </div>

            <hr className={globalStyles.globalBackColor}/>
            <button className={"btn px-2 py-1 my-2"} style={moreStyles.button}><CartIcon height={16} width={16}/> Add to
                cart
            </button>
        </div>
    )
}

const moreStyles = {
    div_category: {
        background: "rgba(112,112,112,0.13)",
        color: "rgba(112,112,112,0.98)"
    },
    button: {
        background: "#E652DC",
        color:"white"
    },
    text: {
        display: "block", maxWidth: "8em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        fontSize:"0.8em"
    }
}