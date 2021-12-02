import styles from '../../styles/pages/forms.module.css';
import Head from 'next/head';
import React from "react";
import UserService from "../../services/users/user.service";
import * as Validator from "validatorjs";
import {isEmpty} from "../../utils/functions";
import Alert from "../../components/alert";
import Router, {useRouter} from 'next/router';
import Link from 'next/link';
import {userTypes} from "../../utils/user-types";
import globalStyles from "../../styles/global-colors.module.css"
import {app_config} from "../../utils/constants";
import ForbiddenPage from "../../layouts/ForbiddenPage";
import UserCategoryService from "../../services/users/UserCategoryService";


export default function Register() {


    const validations = {
        username: 'required|min:5',
        firstName: 'required|min:3',
        lastName: 'required|min:3',
        email: 'required|email',
        phone: ['min:9', 'max:13', 'regex:^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$'],
        password: "required|regex:^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*?><}{_)(])[a-zA-Z0-9!@#$%^&*?><}{_)(]{6,15}$",
        category: 'required'
    };

    const [form, setForm] = React.useState({
        username: '',
        firstName: '',
        lastName: '',
        category: userTypes.customer,
        email: '',
        phone: '',
        password: ''
    });

    const [errors, setErrors] = React.useState({
        username: null,
        firstName: null,
        lastName: null,
        email: null,
        phone: null,
        password: null,
        category: null,
        confirmPassword: null
    });


    const [confirmPassword, setConfirmPassword] = React.useState(null);

    const [loading, setLoading] = React.useState(false);
    const [asyncLoader, setAsyncLoader] = React.useState({username: false, email: false, phone: false});

    const [alertData, setAlertData] = React.useState({alert: false, message: '', class: ''});

    const register = async () => {
        setAlertData({alert: false, message: '', class: ''});
        setLoading(true);
        form.extra = {};

        try {
            const {data} = await UserCategoryService.getByName("CUSTOMER");
            let new_form = {...form}
            new_form.category = data._id;

            await UserService.create(new_form);
            setAlertData({alert: true, message: 'Account Created Successfully', class: 'alert-success'});
            setTimeout(() => {
                setAlertData({alert: false, message: '', class: ''});
                Router.push('/auth/login');
            }, 1000);
        } catch (e) {
            const ERROR_MESSAGE = (e.response) ? e.response.data.message : e.message;
            setAlertData({alert: true, message: ERROR_MESSAGE, class: 'alert-danger'});
        }

        setLoading(false);
    }


    const handleFormChange = (prop) => async (event) => {
        setAsyncLoader({username: false, email: false, phone: false});

        setForm({...form, [prop]: event.target.value});
        const validator = new Validator(form, validations);
        if (validator.fails(null))
            setErrors({...errors, [prop]: validator.errors.get(prop)});
        else
            setErrors({...errors, [prop]: null});

        if (prop === 'username' && isEmpty(validator.errors.get(prop))) {
            setAsyncLoader({...asyncLoader, ['username']: true});
            try {
                const res = await UserService.usernameAvailable(event.target.value);
                if (res.data.exists) {
                    setErrors({...errors, [prop]: 'Username already taken'});
                } else {
                    setErrors({...errors, [prop]: null});
                }
                setAsyncLoader({...asyncLoader, ['username']: false});
            } catch (e) {
                console.error(e)
                const ERROR_MESSAGE = (e.response) ? e.response.data.message : e.message;
                setAlertData({alert: true, message: ERROR_MESSAGE, class: 'alert-danger'});
            }
        }
        if (prop === 'email' && isEmpty(validator.errors.get(prop))) {
            setAsyncLoader({...asyncLoader, ['email']: true});
            try {
                const res = await UserService.emailAvailable(event.target.value);
                if (res.data.exists) {
                    setErrors({...errors, [prop]: 'Email already taken'});
                } else {
                    setErrors({...errors, [prop]: null});
                }
                setAsyncLoader({...asyncLoader, ['email']: false});
            } catch (e) {
                console.error(e)
                const ERROR_MESSAGE = (e.response) ? e.response.data.message : e.message;
                setAlertData({alert: true, message: ERROR_MESSAGE, class: 'alert-danger'});
            }
        }
        if (prop === 'phone' && isEmpty(validator.errors.get(prop))) {
            setAsyncLoader({...asyncLoader, ['phone']: true});
            try {
                const res = await UserService.phoneAvailable(event.target.value);
                if (res.data.exists) {
                    setErrors({...errors, [prop]: 'Phone already taken'});
                } else {
                    setErrors({...errors, [prop]: null});
                }
                setAsyncLoader({...asyncLoader, ['phone']: false});
            } catch (e) {
                console.error(e)
                const ERROR_MESSAGE = (e.response) ? e.response.data.message : e.message;
                setAlertData({alert: true, message: ERROR_MESSAGE, class: 'alert-danger'});
            }
        }
    }

    const handleConfirmPassword = () => (event) => {
        setConfirmPassword(event.target.value);
        if (event.target.value !== form.password)
            setErrors({...errors, ['confirmPassword']: ["Passwords don't match"]});
        else
            setErrors({...errors, ['confirmPassword']: null});
    }


    const router = useRouter()
    return (
        <ForbiddenPage>

            <div className={styles.root}>
                <Head>
                    <title>Register | {app_config.APP_NAME_LOWER}</title>
                </Head>
                <div
                    className={
                        " col-xs-12 col-sm-12 col-md-8 col-lg-6 col-xl-5 mt-0 mb-4"
                    }
                >
                    <div className={styles.pageHeader + " my-5"}>
                        <Link href="/" passHref>
                            <div className="text-center mb-4 c-pointer">
                                <img
                                    src={app_config.APP_LOGO}
                                    alt=""
                                    width={100}
                                    height={120}
                                />
                            </div>
                        </Link>

                        <h3
                            className={styles.pageHeaderTitle + " text-center cursor-pointer"}
                            onClick={() => router.push("/")}
                        >
                            Register into {app_config.APP_NAME}
                        </h3>
                        <hr className={styles.pageHeaderLineBottom}/>
                    </div>

                    <div className={"mb-5"}>
                        {alertData.alert ? (
                            <Alert message={alertData.message} setAlert={setAlertData} className={alertData.class}/>
                        ) : (
                            <div/>
                        )}
                    </div>
                    <form autoComplete={"off"} className={"container"}>
                        <div className="form-group row">
                            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <label htmlFor="user-name" className={styles.inputLabels}>
                                    Username
                                </label>
                                <input
                                    type="text"
                                    id={"user-name"}
                                    onChange={handleFormChange("username")}
                                    value={form.username}
                                    className={
                                        !isEmpty(errors.username)
                                            ? "form-control form-control-sm is-invalid"
                                            : !form.username
                                                ? "form-control form-control-sm "
                                                : "form-control form-control-sm is-valid"
                                    }
                                />
                                {asyncLoader.username ? (
                                    <img
                                        src={"/img/spinner.gif"}
                                        alt="Loading"
                                        className={"loading-spinner"}
                                    />
                                ) : null}
                                <div className="invalid-feedback">Username not available</div>
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <label htmlFor="first-name" className={styles.inputLabels}>
                                    First name
                                </label>
                                <input
                                    type="text"
                                    id={"first-name"}
                                    onChange={handleFormChange("firstName")}
                                    value={form.firstName}
                                    className={
                                        !isEmpty(errors.firstName)
                                            ? "form-control form-control-sm  is-invalid"
                                            : !form.firstName
                                                ? "form-control form-control-sm "
                                                : "form-control form-control-sm  is-valid"
                                    }
                                />
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <label htmlFor="last-name" className={styles.inputLabels}>
                                    Last name
                                </label>
                                <input
                                    type="text"
                                    id={"last-name"}
                                    onChange={handleFormChange("lastName")}
                                    value={form.lastName}
                                    className={
                                        !isEmpty(errors.lastName)
                                            ? "form-control form-control-sm  is-invalid"
                                            : !form.lastName
                                                ? "form-control form-control-sm "
                                                : "form-control form-control-sm is-valid"
                                    }
                                />
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <label htmlFor="first-name" className={styles.inputLabels}>
                                    Email
                                </label>
                                <input
                                    type="text"
                                    id={"email"}
                                    onChange={handleFormChange("email")}
                                    value={form.email}
                                    className={
                                        !isEmpty(errors.email)
                                            ? "form-control form-control-sm is-invalid"
                                            : !form.email
                                                ? "form-control form-control-sm "
                                                : "form-control form-control-sm is-valid"
                                    }
                                />
                                {asyncLoader.email ? (
                                    <img
                                        src={"/img/spinner.gif"}
                                        alt="Loading"
                                        className={"loading-spinner"}
                                    />
                                ) : null}
                                <div className="invalid-feedback">Email not available</div>
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <label htmlFor="last-name" className={styles.inputLabels}>
                                    Phone number
                                </label>
                                <input
                                    type="text"
                                    id={"phone"}
                                    onChange={handleFormChange("phone")}
                                    value={form.phone}
                                    className={
                                        !isEmpty(errors.phone)
                                            ? "form-control form-control-sm is-invalid"
                                            : !form.phone
                                                ? "form-control form-control-sm "
                                                : "form-control form-control-sm is-valid"
                                    }
                                />
                                {asyncLoader.phone ? (
                                    <img
                                        src={"/img/spinner.gif"}
                                        alt="Loading"
                                        className={"loading-spinner"}
                                    />
                                ) : null}
                                <div className="invalid-feedback">Phone not available</div>
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <label htmlFor="first-name" className={styles.inputLabels}>
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id={"password"}
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
                                <div className="invalid-feedback">You must have an uppercase , lowercase letter ,
                                    special character and a number
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <label htmlFor="last-name" className={styles.inputLabels}>
                                    Confirm
                                </label>
                                <input
                                    type="password"
                                    id={"confirm-password"}
                                    onChange={handleConfirmPassword()}
                                    value={confirmPassword || ""}
                                    className={
                                        !isEmpty(errors.confirmPassword)
                                            ? "form-control form-control-sm is-invalid"
                                            : !confirmPassword
                                                ? "form-control form-control-sm "
                                                : "form-control form-control-sm is-valid"
                                    }
                                />
                                <div className="invalid-feedback">Passwords don't match</div>
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <button
                                    type={"submit"}
                                    className={styles.submitBtn + " btn text-white w-100 mt-4 " + globalStyles.globalBackColor}
                                    disabled={
                                        !Object.values(errors).some((o) => o === null) ||
                                        Object.values(form).some((o) => o === "") ||
                                        loading
                                    }
                                    onClick={register}
                                >
                                    {loading ? (
                                        <img
                                            src={"/img/loader.gif"}
                                            alt={"Loading"}
                                            className={"loader"}
                                        />
                                    ) : (
                                        "Register"
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className={"meta-info-area mb-5"}>
                            <Link href={"/auth/login"}>
                                <a className={styles.metaInfoLink}>Already have an account? </a>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </ForbiddenPage>

    );
}
