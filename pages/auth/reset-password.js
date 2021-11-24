import styles from '../../styles/pages/forms.module.css';
import Head from 'next/head';
import AuthService from "../../services/auth/auth.service";
import React, {useState} from "react";
import Router, {useRouter} from "next/router";
import * as Validator from "validatorjs";
import Alert from "../../components/alert";
import {handleDoubleDecryptionPath, isEmpty} from "../../utils/functions";
import Link from 'next/link';
import {GLOBAL_KEY} from "../../utils/encryption-decryption";
import {alertFailer, alertSuccess} from "../../utils/alerts";
import {app_config} from "../../utils/constants";
import ForbiddenPage from "../../layouts/ForbiddenPage";


export const ResetPassword = () => {
    const validations = {
        password: 'required|regex:^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*?><}{_)(])[a-zA-Z0-9!@#$%^&*?><}{_)(]{6,15}$'
    };

    const [form, setForm] = React.useState({
        activationToken: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = React.useState({
        password: null,
        confirmPassword: null
    });

    const [confirmPassword, setConfirmPassword] = React.useState(null);

    const [loading, setLoading] = React.useState(false);
    const [alert, setAlert] = useState({message: "", class: "", show: false})


    const resetPassword = async () => {
        setLoading(true);
        try {
            await AuthService.resetPassword({
                activationToken: router.query.token,
                email: handleDoubleDecryptionPath(router.query.subject, GLOBAL_KEY),
                password: form.password
            });
            alertSuccess(setAlert, "Password reset")
            window.setTimeout(() => {
                Router.push('/auth/login');
            }, 2000)
        } catch (e) {
            const error = e.response.data;
            alertFailer(setAlert, e.response ? e.response.data.message : e.message || "Error occurred. Try again latter.")
        } finally {
            setLoading(false)
        }

    }


    const handleFormChange = (prop) => (event) => {
        setForm({...form, [prop]: event.target.value});
        const validator = new Validator(form, validations);
        if (validator.fails(null)) {
            setErrors({...errors, [prop]: validator.errors.get(prop)});
        } else {
            setErrors({...errors, [prop]: null});
        }
    }

    const handleConfirmPassword = () => (event) => {
        setConfirmPassword(event.target.value);
        if (event.target.value !== form.password)
            setErrors({...errors, ['confirmPassword']: ["Passwords don't match"]});
        else
            setErrors({...errors, ['confirmPassword']: null});
    }
    const router = useRouter();
    return (
        <ForbiddenPage>
            <div className={styles.root}>
                <Head>
                    <title>Reset Password | {app_config.APP_NAME_LOWER}</title>
                </Head>
                <div
                    className={
                        " col-xs-12 col-sm-12 col-md-8 col-lg-6 col-xl-5 mt-2 mb-5"
                    }
                >
                    <div className={styles.pageHeader + " mb-5"}>


                        <Link href="/" passHref>
                            <div className="text-center mb-4 c-pointer">
                                <img src={app_config.APP_LOGO} alt="" width={100} height={120}/>
                            </div>
                        </Link>
                        <div className={"mb-5"}>
                            {alert.show ? (
                                <Alert
                                    className={"my-3 alert-" + alert.class}
                                    message={alert.message}
                                    setAlert={setAlert}
                                />
                            ) : null}
                        </div>
                        <h3 className={styles.pageHeaderTitle + " text-center"}>
                            Reset your password
                        </h3>
                        <hr className={styles.pageHeaderLineBottom}/>
                    </div>

                    <div>
                        <div className="form-group row">
                            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <label
                                    htmlFor="user-name"
                                    className={styles.inputLabels}
                                >
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    id={"new-password"}
                                    onChange={handleFormChange("password")}
                                    value={form.password}
                                    className={
                                        !isEmpty(errors.password)
                                            ? "form-control form-control-sm is-invalid"
                                            : !form.password
                                                ? "form-control form-control-sm "
                                                : "form-control form-control-sm is-valid"
                                    }
                                />
                                <div className="invalid-feedback">{"Password should be atleast 5 characters"}</div>
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <label
                                    htmlFor="user-name"
                                    className={styles.inputLabels}
                                >
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    id={"confirm-password"}
                                    onChange={handleConfirmPassword()}
                                    value={confirmPassword}
                                    className={
                                        !isEmpty(errors.confirmPassword)
                                            ? "form-control form-control-sm is-invalid"
                                            : !confirmPassword
                                                ? "form-control form-control-sm "
                                                : "form-control form-control-sm is-valid"
                                    }
                                />
                                <div className="invalid-feedback">
                                    Passwords don't match
                                </div>
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <button
                                    // type={"submit"}
                                    className={
                                        styles.submitBtn +
                                        " btn btn-danger w-100 mt-4"
                                    }
                                    disabled={
                                        !Object.values(errors).some(
                                            (o) => o === null
                                        ) ||
                                        loading
                                    }
                                    onClick={resetPassword}
                                >
                                    {loading ? (
                                        <img
                                            src={"/img/loader.gif"}
                                            alt={"Loading"}
                                            className={"loader"}
                                        />
                                    ) : (
                                        "Reset Password"
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className={"meta-info-area"}>
                            <Link href={"/auth/login"}>
                                <a className={styles.metaInfoLink}>
                                    Just remembered your password?{" "}
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </ForbiddenPage>
    );
}

export default ResetPassword;
