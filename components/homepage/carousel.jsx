import React from "react";
import Router from "next/router";
import { Carousel } from "react-bootstrap";

import globalStyles from "../../styles/global-colors.module.css";

export default function CarouselPart() {
  return (
    <div className={"container-fluid col-12"}>
      <div className={"row justify-content-center"}>
        <h4 className={"text-center d-block"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="14.25"
            viewBox="0 0 15 14.25"
          >
            <path
              id="Icon_material-star"
              data-name="Icon material-star"
              d="M10.5,14.453l4.635,2.8-1.23-5.273L18,8.43l-5.392-.458L10.5,3,8.392,7.972,3,8.43l4.1,3.547L5.865,17.25Z"
              transform="translate(-3 -3)"
              fill="#f3a35d"
            />
          </svg>
          &nbsp;&nbsp;&nbsp;Promotions
        </h4>
      </div>
      <div className={"row justify-content-center"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="62"
          height="0.6"
          viewBox="0 0 62 0.6"
        >
          <rect
            id="Rectangle_72"
            data-name="Rectangle 72"
            width="62"
            height="0.6"
            fill="#f3a35d"
          />
        </svg>
      </div>
      <Carousel className={"row mt-5 mb-5"} style={{ height: "50vh" }}>
        <Carousel.Item>
          <img
            className={"img-fluid opacity-25"}
            style={{ width: "100%", height: "50vh" }}
            src="images/cosmeticbg.jpg"
            alt="First slide"
          />
          <Carousel.Caption className={"col-10 mx-auto mt-n20"}>
            <h3 className={"col-12 col-sm-10 text-center"}>
              Get 50% OFF your next order!
            </h3>
            <p className={"col-12 col-sm-10 text-center"}>
              We've now put discount on all products. So, do order quick before
              it ends
            </p>
            <div className={"col-10"}>
              <button
                onClick={() => Router.push("/products")}
                className={`btn text-white border-none pl-4 pr-4 ${globalStyles.globalDeepOrange}`}
              >
                Order Now
              </button>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className={"img-fluid opacity-25"}
            style={{ width: "100%", height: "50vh" }}
            src="images/cosmeticbg.jpg"
            alt="First slide"
          />
          <Carousel.Caption className={"col-10 mx-auto mt-n20"}>
            <h3 className={"col-12 col-sm-10"}>Get 50% OFF your next order!</h3>
            <p className={"col-12 col-sm-10 text-center"}>
              We've now put discount on all products. So, do order quick before
              it ends
            </p>
            <div className={"col-10"}>
              <button
                onClick={() => Router.push("/products")}
                className={`btn text-white border-none pl-4 pr-4 ${globalStyles.globalDeepOrange}`}
              >
                Order Now
              </button>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className={"img-fluid opacity-25"}
            style={{ width: "100%", height: "50vh" }}
            src="images/cosmeticbg.jpg"
            alt="First slide"
          />
          <Carousel.Caption className={"col-10 mx-auto mt-n20"}>
            <h3 className={"col-12 col-sm-10"}>Get 50% OFF your next order!</h3>
            <p className={"col-12 col-sm-10 text-center"}>
              We've now put discount on all products. So, do order quick before
              it ends
            </p>
            <div className={"col-10"}>
              <button
                onClick={() => Router.push("/products")}
                className={`btn text-white border-none pl-4 pr-4 ${globalStyles.globalDeepOrange}`}
              >
                Order Now
              </button>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
