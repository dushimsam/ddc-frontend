import React from "react";
import Head from 'next/head';
import styles from '../../styles/pages/forms.module.css';
import * as Validator from "validatorjs";
import AuthService from "../../services/auth/auth.service";
import Alert from "../../components/alert";
import Router from "next/router";
import Link from 'next/link';
import {gotoPath, isEmpty} from "../../utils/functions";
import globalStyles from "../../styles/global-colors.module.css"
import {alertFailer} from "../../utils/alerts";
import {app_config} from "../../utils/constants";
import ForbiddenPage from "../../layouts/ForbiddenPage";


export default function ForgotPassword() {
    const validations = {
        email: 'required|email',
    };

    const [form, setForm] = React.useState({
        email: ''
    });

    const [errors, setErrors] = React.useState({
        email: null
    });

    const [loading, setLoading] = React.useState(false);
    const [alertData, setAlertData] = React.useState({alert: false, message: '', class: ''});

    const forgotPassword = async () => {
        setAlertData({alert: false, message: '', class: ''});
        setLoading(true);

        try {
            await AuthService.initiateResetPassword(form);
            setAlertData({alert: true, message: "LOOK ON YOUR EMAIL FOR THE TOKEN", class: 'alert-success'});
            window.setTimeout(() => {
                Router.push("/auth/login")
            }, 5000)
        } catch (e) {
            const ERROR_MESSAGE = (e.response) ? e.response.data.message : e.message;
            if (ERROR_MESSAGE === "USER HAS A PENDING PASSWORDRESET") {
                alertFailer(setAlertData, "SORRY YOU STILL HAVE A PENDING PASSWORD RESET");

                window.setTimeout(() => {
                    Router.push(gotoPath("/auth/verify", form.email))
                }, 2000)
            } else {
                setAlertData({alert: true, message: "LOOK ON YOUR EMAIL FOR THE TOKEN", class: 'alert-success'});
            }
        } finally {
            setLoading(false);
        }

    }


    const handleFormChange = (prop) => (event) => {
        setForm({...form, [prop]: event.target.value});
        const validator = new Validator(form, validations);
        if (validator.fails(null))
            setErrors({...errors, [prop]: validator.errors.get(prop)});
        else
            setErrors({...errors, [prop]: null});
    }


    return (
        <ForbiddenPage>
            <div className={styles.root}>
                <Head>
                    <title>Forgot Password | {app_config.APP_NAME_LOWER}</title>
                </Head>
                <div
                    className={
                        " col-xs-12 col-sm-12 col-md-8 col-lg-6 col-xl-5 mb-5"
                    }
                >
                    <div className={styles.pageHeader + " my-5"}>
                        <Link href="/" passHref>
                            <div className="text-center mb-4 c-pointer">
                                <img src={app_config.APP_LOGO} alt="" width={100} height={120}/>
                            </div>
                        </Link>
                        <h3 className={styles.pageHeaderTitle + " text-center"}>
                            Forgot your password
                        </h3>
                        <hr className={styles.pageHeaderLineBottom}/>

                        <div className={styles.pageHeaderSubText}>
                            <p>
                                We are going to send you a reset password on your email. Provide us with your required
                                information in the box bellow.
                            </p>
                        </div>
                    </div>

                    <div className={"mb-5"}>
                        {alertData.alert ? (
                            <Alert
                                message={alertData.message}
                                className={alertData.class}
                                setAlert={setAlertData}
                            />
                        ) : null}
                    </div>

                    <form autoComplete={"off"} className={"container"}>
                        <div className="form-group row">
                            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <label
                                    htmlFor="user-name"
                                    className={styles.inputLabels}
                                >
                                    Enter your e-mail
                                </label>
                                <input
                                    type="text"
                                    onChange={handleFormChange("email")}
                                    value={form.email}
                                    id={"email"}
                                    className={
                                        !isEmpty(errors.email)
                                            ? "form-control form-control-sm is-invalid"
                                            : !form.email
                                                ? "form-control form-control-sm "
                                                : "form-control form-control-sm is-valid"
                                    }
                                />
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <button
                                    type={"submit"}
                                    className={
                                        styles.submitBtn +
                                        " btn w-100 mt-4 text-white " + globalStyles.globalBackColor
                                    }
                                    disabled={
                                        !Object.values(errors).some(
                                            (o) => o === null
                                        ) ||
                                        Object.values(form).some((o) => o === "") ||
                                        loading
                                    }
                                    onClick={forgotPassword}
                                >
                                    {loading ? (
                                        <img
                                            src={"/img/loader.gif"}
                                            alt={"Loading"}
                                            className={"loader"}
                                        />
                                    ) : (
                                        "Send Activation Code"
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className={"meta-info-area"}>
                            <Link href={"/auth/login"}>
                                <a className={styles.metaInfoLink}>
                                    Just remembered your password?
                                </a>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </ForbiddenPage>
    );
}
