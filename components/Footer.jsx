import InputControl, {InputTextArea} from "./reusable/InputControl";
import Link from "next/link"
import Styles from "../styles/global-colors.module.css"
import {useState} from "react";
import contactUsService from "../services/contact/contact-us.service";
import {notifyError, notifySuccess} from "../utils/alerts";
import {app_config, DEFAULT_TEMPLATE_ID, EMAIL_JS_SERVICE_ID, USER_EMAIL_ID} from "../utils/constants";
import emailjs from "emailjs-com";
import {openInNewTabWinBrowser} from "../utils/functions";

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
            ({value, valid: validProp}) => {
                setValues({...values, [prop]: value});
                setValid((state) => ({...state, [prop]: validProp}));
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
                    "from_name": values.names + " on Contact Us",
                    "to_name": "Admin",
                    "reply_to": values.email,
                    "message": values.message
                }
                emailjs.send(EMAIL_JS_SERVICE_ID, DEFAULT_TEMPLATE_ID, template_params, USER_EMAIL_ID)
                    .then((result) => {
                        notifySuccess("Thanks for reaching us.", "TOP_RIGHT");
                    }, (error) => {
                        console.log(error.text);
                    });
            })
            .catch((e) => {
                const ERROR_MESSAGE = e.response ? e.response.data.message : e.message;
                notifyError(ERROR_MESSAGE);
            })
            .finally(() => setLoading(false))
    };

    return (
        <div className={"text-white pt-5 pb-0 px-lg-5 " + Styles.globalBackColor}>
            <div className="bg-app-red container-fluid px-md-5 mb-2 pb-lg-1">
                <div className="row">
                    THIS IS THE NAVBAR
                </div>
            </div>

            <div className="bg-app-red border-top border-light pb-3 pt-2">
                <p className="text-center font-weight-light h-6 text-light mb-0 text-capitalize">
                    &copy; {new Date().getFullYear()} {app_config.APP_NAME}, all rights
                    reserved
                </p>
                <div className="text-center">
                    <span className="font-weight-light mr-1">powered by</span>
                    <span className="font-weight-bold text-light  font-italic mb-1">
              <a href={"https://grapes.vercel.app/"} target="_blank" rel="noopener noreferrer">Grapes</a>
            </span>
                </div>
            </div>
        </div>
    );
}