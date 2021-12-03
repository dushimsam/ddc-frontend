import React from "react";
import Router from "next/router";
import { gotoPathDirect } from "../../utils/functions";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/components/spare-part.module.css";
import globalStyles from "../../styles/global-colors.module.css";

export const Rating = ({ rating }) => {
  const stars = [1, 2, 3, 4, 5];

  return stars?.map((star) => {
    return (
      <span
        style={{ cursor: "pointer" }}
        className={star <= rating ? globalStyles.globalTextColor : ""}
      >
        {star <= rating ? "★" : "☆"}
      </span>
    );
  });
};
export default function CustomerReviews({
  product,
  hideBtn,
  price = 1000,
  productOnMarketId,
  image,
  containerStyle,
}) {
  let currency = useSelector((state) => state.appCurrency);

  console.log(product);
  const dispatch = useDispatch();

  let cart = useSelector((state) => state.cart);

  const call_action = () => {
    if (cart.filter((item) => item._id === product._id).length === 0) {
      dispatch(addItemToCart(product));
    } else {
      dispatch(increment(product._id));
    }
  };

  const addToCart = async () => {
    if (product.quantity > 0) {
      call_action();
    }
    dispatch(showAddToCartModal(product));
  };
  return (
    <div
      className={`card p-5 ${
        !containerStyle ? styles.container : containerStyle
      }`}
      title={product?.product.name}
      style={{ maxWidth: "350px" }}
    >
      <div className={"d-flex justify-content-start"}>
        <img
          src={"/img/customer.jpg"}
          className={"img-fluid mr-3"}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://images.unsplash.com/photo-1542596594-649edbc13630?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGhhcHB5JTIwY3VzdG9tZXJzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60";
          }}
          style={{
            width: "3rem",
            height: "3rem",
            borderRadius: "100%",
          }}
          alt={product?.product.name}
        />
        <div className={"d-flex flex-column"}>
          <p className={"font-weight-bold"} title={product?.name}>
            {product?.product?.name}
          </p>
          <p className={"mt-n3"}>Customer</p>
        </div>
      </div>
      <div className={"row"}>
        <Rating rating={4} />
      </div>
      <div className={"row"}>
        <p className={"text-justify"}>
          I'm much happy because DDC Cosmetics made it easy to access everything
          online instead of wasting time and money for transport going to find
          the products.
        </p>
      </div>
    </div>
  );
}

const moreStyles = {
  div_category: {
    background: "rgba(112,112,112,0.13)",
    color: "rgba(112,112,112,0.98)",
    fontSize: "0.7em",
    width: "7em",
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
