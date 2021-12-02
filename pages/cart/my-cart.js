import React, {useEffect, useState} from "react";
import styles from "../../styles/cart/my-cart.module.css";
import Navbar from "../../components/navbar";
import {useDispatch, useSelector} from "react-redux";
import {decrement, increment, removeItem} from "../../store/actions/cart-actions";
import Link from "next/link"
import Alert from "../../components/alert";
import globalStyles from "../../styles/global-colors.module.css"

import Footer from "../../components/Footer";
import {doubleEncryption} from "../../utils/encryption-decryption";
import {gotoPathDirect} from "../../utils/functions";
import {currencyMapping} from "../../utils/currency-converter";

const EmptyCart = () => {
    return <div className={"py-3 mx-auto text-center"}>
        {/*<img src={"/img/shopping-bag.jpg"} className={"block col-4 rounded my-4"} />*/}
        <h5 className="text-center">Your shopping cart is empty.</h5>
        <Link href={"/"}>
            <button
                className={"btn btn-outline-danger btn-lg block my-4 col-3 " + globalStyles.globalHoverBackColor + " " + globalStyles.globalTextColor}>Shop
                now
            </button>
        </Link>
    </div>
}

const Nav = () => {
    return (
        <div className="border-bottom">
            <div className="row d-none d-lg-flex font-sm text-secondary">
                <div className="col-lg-2 col-2">
                    <p>PRODUCT</p>
                </div>
                <div className="col-lg-4 col-3">
                    <p>DESCRIPTION</p>
                </div>
                <div className=" col-lg-2  col-2">
                    <p>QUANTITY</p>
                </div>
                <div className=" col-lg-2  col-2">
                    <p>ACTIONS</p>
                </div>
                <div className=" col-lg-1  col-2">
                    <p>TOTAL</p>
                </div>
            </div>
        </div>
    );
};

const SingleProduct = ({item, handleSetAlert, currency}) => {
    const dispatch = useDispatch();
    const handleIncrement = () => {
        dispatch(increment(item._id));
    };

    const handleDecrement = () => {
        dispatch(decrement(item._id));
    };

    const handleRemoveItem = () => {
        handleSetAlert("Item is removed from shopping cart", "alert-success")
        dispatch(removeItem(item._id))
    }

    return (
        <div className="container">
            <div className="row border-bottom pt-5 pb-4">
                <div className="col-lg-2 col-8">
                    <img style={{width: '90px', marginTop: '-8px'}} src={item?.product?.imageUrls[0]}
                         onError={(e) => {
                             e.target.onerror = null;
                             e.target.src = "/img/default-spare-part.png"
                         }} alt="Image"/>
                </div>
                <div className="col-lg-4  col-8">
                    <Link href={gotoPathDirect("/products", item._id)} passHref>
                        <p className={"font-weight-light cursor-pointer mb-2 " + styles.productTitle}>
                            {item.product?.name}
                        </p>
                    </Link>
                    <p className={"h5 mb-2 " + globalStyles.globalTextColor}>

                        <span className={"font-weight-bold "}>     {currencyMapping(currency, item?.unit_price)} </span>
                    </p>
                    {/*<span className={"text-secondary " + styles.productPartNumber}>Part number: </span>*/}
                    {/*<span*/}
                    {/*    className={"text-secondary " + styles.productPartNumber}>{item.product?.spare_part?.part_number}</span>*/}
                </div>
                <div className="col-lg-2 col-6 pt-3">
                    <div className="input-group">
                        <span className="input-group-btn">
                            <button type="button" onClick={handleDecrement} className={styles.btnNumber}
                                    data-type="minus" data-field="quant[1]">-</button>
                        </span>
                        <div className="input" role="textbox">
                            <span className={styles.quantityBox}>  {item.orderedQuantity} </span>
                        </div>

                        <span className="input-group-btn">
                            <button type="button" onClick={handleIncrement} className={styles.btnNumber}
                                    data-type="plus" data-field="quant[1]">+</button>
                        </span>
                    </div>
                </div>
                <div className="col-lg-2 col-3 pt-3  ">
                    <a
                        className={"text-decoration-none text-danger pointer ml-3 " + styles.removeBtn}
                        style={{cursor: "pointer", fontSize: "0.8em"}}
                        onClick={handleRemoveItem}
                    >
                        REMOVE
                    </a>
                </div>
                <div className="col-lg-2 col-8 pt-3">
                    <p className={" ml-4 " + styles.productPrice}>
                        {currencyMapping(currency, item.unit_price * item.orderedQuantity)}
                    </p>
                </div>
            </div>
        </div>
    );
};


const SumUp = ({order, cart}) => {
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        let totalPrices = 0;
        for (const item of cart) totalPrices += item.unit_price * item.orderedQuantity;
        setTotalPrice(totalPrices);
    }, [cart]);
    let currency = useSelector((state) => state.appCurrency);

    return (
        <div className={"card shadow p-3"}>
            <div>
                <span className={"font-weight-bolder"}>Total Amount :</span><span
                className={"font-weight-light"}>{currencyMapping(currency, totalPrice)}</span>
            </div>
            <div>
                <span className={"font-weight-bolder"}>Total Items :</span><span
                className={"font-weight-light"}>16</span>
            </div>

            <div className={"mt-3"}>
                <Link
                    href={gotoPathDirect('/order/shipping-address', order.length > 0 ? order.order?._id : 'INITIAL', doubleEncryption('NEW'))}><span
                    className={"btn text-white px-3 py-2 " + globalStyles.globalBackColor}>Proceed to checkout</span></Link>
            </div>
        </div>
    )
}
const Container = ({order, cart}) => {
    const [totalPrice, setTotalPrice] = useState(0);
    const [alert, setAlert] = useState({message: "", state: false, class: ""})


    const showAlert = (message, className) => {
        setAlert({state: true, message, class: className})
        setTimeout(() => {
            setAlert({...alert, state: false})
        }, 3000);

    }
    let currency = useSelector((state) => state.appCurrency);


    return (
        <React.Fragment>
            <div className={"px-5 py-5 " + styles.cartContainer}>
                {alert.state ? <Alert message={alert.message} className={alert.class}/> : null}
                {
                    cart.length === 0 ?
                        <EmptyCart/> :
                        <div><Nav/>
                            <div className={styles.products}>
                                {cart.map((item, i) => (
                                    <SingleProduct handleSetAlert={showAlert} item={item} key={i} currency={currency}/>
                                ))}
                            </div>

                        </div>
                }
            </div>
        </React.Fragment>
    );
};

export const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const [cartLength, setCartLength] = useState(0);
    useEffect(() => {
        setCartLength(cart.length);
    }, [cart]);
    let order = useSelector((state) => state.order);

    return (
        <div style={{background: "#FCFCFC"}}>
            <Navbar/>
            <div className={"container"}>
                <div className={"row justify-content-start"}>
                    <div className={"col-8 py-3"}>
                        <h5>Your shopping bag </h5>
                        <p className={globalStyles.greyLikeColor} style={{fontSize: "0.9em"}}>Now you
                            have {cartLength} items in your cart.</p>
                    </div>
                </div>
                <div className={"row justify-content-sm-between justify-content-center"}>
                    <div className={"col-11 col-sm-9"}>
                        <Container order={order} cart={cart}/>
                    </div>
                    <div className={"col-6 col-sm-3"}>
                        <SumUp order={order} cart={cart}/>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Cart;