import styles from "../../styles/pages/forms.module.css";
import Head from "next/head";
import React, {useEffect} from "react";

import AuthService from "../../services/auth/auth.service";

import Alert from "../../components/alert";
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import {setAuthUser} from "../../store/actions";
import jwt from "jwt-decode";
import Router, {useRouter} from "next/router";
import {app_config, system_users} from "../../utils/constants";
import RouteService from "../../services/auth/routing"
import globalStyles from "../../styles/global-colors.module.css"
import {getUserHref} from "../../utils/validations/redirects";
import ForbiddenPage from "../../layouts/ForbiddenPage";


export default function Login() {
    const [form, setForm] = React.useState({
        login: "",
        password: "",
    });


    const dispatch = useDispatch();

    const [loading, setLoading] = React.useState(false);
    const [alertData, setAlertData] = React.useState({
        alert: false,
        message: "",
        class: "",
    });


    const handleGoTo = (link) => {
        setTimeout(() => {
            setAlertData({alert: false, message: "", class: ""});
            Router.push(link);
        }, 1000);
    }
    const login = async () => {
        setAlertData({alert: false, message: "", class: ""});
        setLoading(true);

        try {
            const res = await AuthService.login(form);
            AuthService.setToken(res.data.token);
            setAlertData({
                alert: true,
                message: "Logged In Successfully",
                class: "alert-success"
            });

            if (RouteService.getPrevRoute()) {
                let link = RouteService.getPrevRoute();
                RouteService.removePrevRoute();
                handleGoTo(link);
            } else {
                if (res.data.category === system_users.ADMIN)
                    handleGoTo("/admin");
                else if (res.data.category === system_users.CUSTOMER)
                    handleGoTo("/customer");
                else if (res.data.category === system_users.EMPLOYEE)
                    handleGoTo("/sales-manager");
                else if (res.data.category === system_users.SHIPPER)
                    handleGoTo("/shipper");
            }

        } catch (e) {
            // console.log("rr" ,e)
            const ERROR_MESSAGE = e.response ? e.response.data.message : e.message;
            setAlertData({
                alert: true,
                message: ERROR_MESSAGE,
                class: "alert-danger",
            });
        }

        setLoading(false);
    };

    const handleFormChange = (property) => (event) => {
        setForm({...form, [property]: event.target.value});
    };

    const router = useRouter()
    return (
        <ForbiddenPage>
            <div className={styles.root}>
                <Head>
                    <title>Login | {app_config.APP_NAME_LOWER}</title>
                </Head>
                <div
                    className={
                        " col-xs-12 col-sm-12 mb col-md-8 col-lg-6 col-xl-5 mb-5"
                    }
                >
                    <div className={styles.pageHeader + " my-5"}>
                        <Link href="/" passHref>
                            <div className="text-center mb-4 c-pointer">
                                <img
                                    src={app_config.APP_LOGO}
                                    alt=""
                                    width={120}
                                    height={120}
                                />
                            </div>
                        </Link>
                        <h3
                            className={styles.pageHeaderTitle + " text-center cursor-pointer"}
                            onClick={() => router.push("/")}
                        >
                            Log in to {app_config.APP_NAME}
                        </h3>
                        <hr className={styles.pageHeaderLineBottom}/>
                    </div>
                    <div className={"mb-2"}>
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
                                <label htmlFor="user-name" className={styles.inputLabels}>
                                    Email or Username
                                </label>
                                <input
                                    type="text"
                                    onChange={handleFormChange("login")}
                                    value={form.login}
                                    id={"email"}
                                    className={"form-control form-control-sm"}
                                />
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <label htmlFor="password" className={styles.inputLabels}>
                                    Password
                                </label>
                                <input
                                    type="password"
                                    onChange={handleFormChange("password")}
                                    value={form.password}
                                    id={"password"}
                                    className={"form-control form-control-sm"}
                                />
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <button
                                    type={"submit"}
                                    className={styles.submitBtn + " btn w-100 mt-4 text-white " + globalStyles.globalBackColor}
                                    disabled={Object.values(form).some((x) => x === "") || loading}
                                    onClick={login}
                                >
                                    {loading ? (
                                        <img
                                            src={"/img/loader.gif"}
                                            alt={"Loading"}
                                            className={"loader"}
                                        />
                                    ) : (
                                        "Login"
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className={"meta-info-area"}>
                            <Link href={"/auth/register"}>
                                <a className={styles.metaInfoLink}>Don't have an account?</a>
                            </Link>
                            <Link href={"/auth/forgot-password"}>
                                <a className={styles.metaInfoLink + " float-right"}>
                                    Forgot Password?{" "}
                                </a>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </ForbiddenPage>
    );
}