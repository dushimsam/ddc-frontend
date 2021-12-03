import InputControl, { InputTextArea } from "./reusable/InputControl";
import Link from "next/link";
import Styles from "../styles/global-colors.module.css";
import { useState } from "react";
import contactUsService from "../services/contact/contact-us.service";
import { notifyError, notifySuccess } from "../utils/alerts";
import {
  app_config,
  DEFAULT_TEMPLATE_ID,
  EMAIL_JS_SERVICE_ID,
  USER_EMAIL_ID,
} from "../utils/constants";
import emailjs from "emailjs-com";
import { openInNewTabWinBrowser } from "../utils/functions";

export default function Footer() {
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(false);

  const [values, setValues] = useState({
    names: "",
    email: "",
    message: "",
  });

  const handleChange =
    (prop) =>
    ({ value, valid: validProp }) => {
      setValues({ ...values, [prop]: value });
      setValid((state) => ({ ...state, [prop]: validProp }));
    };

  const sendData = () => {
    if (!valid) return;
    setLoading(true);
    contactUsService
      .create(values)
      .then((res) => {
        setValues({
          names: "",
          email: "",
          message: "",
        });
        setValid(false);
        var template_params = {
          from_name: values.names + " on Contact Us",
          to_name: "Admin",
          reply_to: values.email,
          message: values.message,
        };
        emailjs
          .send(
            EMAIL_JS_SERVICE_ID,
            DEFAULT_TEMPLATE_ID,
            template_params,
            USER_EMAIL_ID
          )
          .then(
            (result) => {
              notifySuccess("Thanks for reaching us.", "TOP_RIGHT");
            },
            (error) => {
              console.log(error.text);
            }
          );
      })
      .catch((e) => {
        const ERROR_MESSAGE = e.response ? e.response.data.message : e.message;
        notifyError(ERROR_MESSAGE);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className={"text-white pt-5 pb-0 px-lg-5 " + Styles.globalFooterColor}>
      <div className="bg-app-red container-fluid px-md-5 mb-2 pb-lg-1">
        <div className="row">
          <div className={"row"}>
            <h4 className={"pl-4"}>DDC Cosmetics</h4>
          </div>
        </div>
        <div className={"row justify-content-around"}>
          <div className={"col-12 col-sm-4 mb-2"}>
            <p className={"text-justify"}>
              DDC Cosmetics is a company operating in Rwanda which sells all
              cosmetic products you may need in your daily life. Lets
              collaborate.
            </p>
            <div className={"row col-6 justify-content-around"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="29.973"
                height="25.249"
                viewBox="0 0 29.973 25.249"
              >
                <path
                  id="Icon_feather-twitter"
                  data-name="Icon feather-twitter"
                  d="M28.473,4.5a13.364,13.364,0,0,1-3.85,1.876,5.493,5.493,0,0,0-9.637,3.678v1.226A13.07,13.07,0,0,1,3.952,5.723s-4.9,11.034,6.13,15.939A14.271,14.271,0,0,1,1.5,24.114c11.034,6.13,24.521,0,24.521-14.1A5.517,5.517,0,0,0,25.923,9a9.465,9.465,0,0,0,2.55-4.5Z"
                  transform="translate(0 -2.885)"
                  fill="none"
                  stroke="#f3a35d"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15.1"
                height="25"
                viewBox="0 0 15.1 25"
              >
                <path
                  id="Icon_feather-facebook"
                  data-name="Icon feather-facebook"
                  d="M22.6,3H19.3a5.5,5.5,0,0,0-5.5,5.5v3.3H10.5v4.4h3.3V25h4.4V16.2h3.3l1.1-4.4H18.2V8.5a1.1,1.1,0,0,1,1.1-1.1h3.3Z"
                  transform="translate(-9 -1.5)"
                  fill="none"
                  stroke="#f3a35d"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22.005"
                height="22"
                viewBox="0 0 22.005 22"
              >
                <path
                  id="Icon_awesome-instagram"
                  data-name="Icon awesome-instagram"
                  d="M11,7.6a5.641,5.641,0,1,0,5.641,5.641A5.632,5.632,0,0,0,11,7.6ZM11,16.9a3.667,3.667,0,1,1,3.667-3.667A3.674,3.674,0,0,1,11,16.9Zm7.187-9.538a1.316,1.316,0,1,1-1.316-1.316A1.313,1.313,0,0,1,18.187,7.366ZM21.922,8.7a6.511,6.511,0,0,0-1.777-4.61,6.554,6.554,0,0,0-4.61-1.777c-1.816-.1-7.261-.1-9.077,0a6.544,6.544,0,0,0-4.61,1.772A6.532,6.532,0,0,0,.072,8.7c-.1,1.816-.1,7.261,0,9.077a6.511,6.511,0,0,0,1.777,4.61,6.562,6.562,0,0,0,4.61,1.777c1.816.1,7.261.1,9.077,0a6.511,6.511,0,0,0,4.61-1.777,6.554,6.554,0,0,0,1.777-4.61c.1-1.816.1-7.256,0-9.072ZM19.576,19.723a3.713,3.713,0,0,1-2.091,2.091c-1.448.574-4.885.442-6.485.442s-5.042.128-6.485-.442a3.713,3.713,0,0,1-2.091-2.091c-.574-1.448-.442-4.885-.442-6.485S1.854,8.2,2.423,6.753A3.713,3.713,0,0,1,4.515,4.662C5.963,4.087,9.4,4.22,11,4.22s5.042-.128,6.485.442a3.713,3.713,0,0,1,2.091,2.091c.574,1.448.442,4.885.442,6.485S20.15,18.279,19.576,19.723Z"
                  transform="translate(0.005 -2.238)"
                  fill="#f3a35d"
                />
              </svg>
            </div>
          </div>
          <div className={"col-12 col-sm-5 mb-2"}>
            <h5>Info</h5>
            <div className={"row d-flex"}>
              <div className={"col-6 col-sm-5 d-flex flex-column"}>
                <div className={""}>
                  <p>Kigali LK 40 Road</p>
                  <p className={"mt-n3"}>Muhima, TL 0240</p>
                </div>
                <div className={""}>
                  <p>Monday - Sunday</p>
                  <p className={"mt-n3"}>24/24 hr</p>
                </div>
              </div>
              <div className={"col-6 col-sm-5 d-flex flex-column"}>
                <div className={""}>
                  <p>+250 793 485 272</p>
                  <p className={"mt-n3"}>www.ddccosmetic.rw</p>
                </div>
                <div className={""}>
                  <p>Cosm. Inc.</p>
                  <p className={"mt-n3"}>Registered trademark.</p>
                </div>
              </div>
            </div>
          </div>
          <div className={"col-12 col-sm-2"}>
            <h5>Reach Us</h5>
            <p>ddccosmetics@gmail.com</p>
          </div>
        </div>
      </div>

      <div
        className={`bg-app-red border-top border-light pb-3 pt-2 ${Styles.globalCopyrightColor}`}
      >
        <p className="text-center font-weight-light h-6 mb-0 text-capitalize">
          &copy; {new Date().getFullYear()} {app_config.APP_NAME}, all rights
          reserved
        </p>
        <div className="text-center">
          <span className="font-weight-light mr-1">powered by</span>
          <span className="font-weight-bold font-italic mb-1">
            <a
              href={"https://grapes.vercel.app/"}
              target="_blank"
              rel="noopener noreferrer"
            >
              Grapes
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
