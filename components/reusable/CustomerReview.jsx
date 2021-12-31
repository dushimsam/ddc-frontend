import React from "react";
import styles from "../../styles/components/spare-part.module.css";
import { Rating } from "./Product";

export default function CustomerReview({
  product,
  hideBtn,
  price = 1000,
  productOnMarketId,
  image,
  containerStyle,
}) {
  return (
    <div
      className={`card p-5 ${
        !containerStyle ? styles.container : containerStyle
      }`}
      title={product?.product.name}
      style={{ maxWidth: "300px" }}
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
            {"Samuel D."}
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
