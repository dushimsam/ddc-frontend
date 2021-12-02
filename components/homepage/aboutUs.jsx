import React from "react";
import Router from "next/router";

import globalStyles from "../../styles/global-colors.module.css";

const ImagesContainer = () => {
  return (
    <div className="container">
      <div className="row justify-content-between">
        <div className="col pt-5">
          <img
            src={"images/aboutus2.jpg"}
            alt="Product"
            className={"rounded img-responsive"}
            style={{ height: "249px", width: "200px" }}
          />
        </div>
        <div className="col pb-4 mb-5">
          <img
            src={"images/aboutus.jpg"}
            alt="Product"
            className={"rounded img-responsive"}
            style={{ height: "264px", width: "200px" }}
          />
        </div>
      </div>
      <div className="row">
        <div className="col pt-2">
          <img
            src={"images/aboutus1.jpg"}
            alt="Product"
            className={"rounded img-responsive"}
            style={{ height: "127px", width: "200px" }}
          />
        </div>
        <div className="col mt-n5">
          <img
            src={"images/aboutus2.jpg"}
            alt="Product"
            className={"rounded img-responsive"}
            style={{ height: "186px", width: "200px" }}
          />
        </div>
      </div>
    </div>
  );
};
export default function AboutUsPart() {
  return (
    <div className={"container"}>
      <div className={"row justify-content-around"}>
        <div className={"col-12 col-md-6"}>
          <h3 className={"col-9 col-sm-6"} style={{ padding: "0px" }}>
            About Us - Related Info on Cosmetic
          </h3>
          <p className={"text-justify"}>
            We're a very great company for selling cosmetic materials which is
            based in Rwanda, Kigali city. We're a very great company for selling
            cosmetic materials which is based in Rwanda, Kigali city. We're a
            very great company for selling cosmetic materials which is based in
            Rwanda, Kigali city. We're a very great company for selling cosmetic
            materials which is based in Rwanda, Kigali city. We're a very great
            company for selling cosmetic materials which is based in Rwanda,
            Kigali city.
          </p>
          <button
            style={{
              border: "1px solid #F3A35D",
              fontSize: "16px",
              padding: "10px 30px",
            }}
            className={
              "btn text-white border-none rounded-0 " +
              globalStyles.globalBackColor
            }
            onClick={() => Router.push("/about-us")}
          >
            Read more
          </button>
        </div>
        <div className={"col-12 col-sm-6"}>
          <ImagesContainer />
        </div>
      </div>
    </div>
  );
}
