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
import { FbIcon, IgIcon, TwitterIcon } from "../icons";

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
              <TwitterIcon height={28} width={28} />
              <FbIcon height={25} width={25} />
              <IgIcon height={25} width={25} />
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
                  <p>Monday - Friday</p>
                  <p className={"mt-n3"}>24/24 hr</p>
                </div>
              </div>
              <div className={"col-6 col-sm-5 d-flex flex-column"}>
                <div className={""}>
                  <p>+250 7805 044 70</p>
                  <p className={"mt-n3"}>https://ddc.vercel.app/</p>
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
            <p>deni_clai@yahoo.fr</p>
          </div>
        </div>
      </div>

      <div
        className={`bg-app-red border-top border-light mx-lg-n5 pb-3 pt-2 ${Styles.globalCopyrightColor}`}
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
