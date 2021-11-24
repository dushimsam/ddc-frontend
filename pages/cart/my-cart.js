import React, {useEffect, useState} from "react";
import Navbar from "../../components/navbar";
import {useSelector} from "react-redux";
import Footer from "../../components/Footer";


export const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const [cartLength, setCartLength] = useState(0);
    useEffect(() => {
        setCartLength(cart.length);
    }, [cart]);

    return (
        <div style={{background: "#FCFCFC"}}>
            <Navbar/>
            This is the page for the cart.
            <Footer/>
        </div>
    );
};

export default Cart;