import React from 'react';
import Head from "next/head";
import styles from '../../styles/pages/SellProduct.module.css';
import {isEmpty} from "../../utils/functions";
import AuthService from "../../services/auth/auth.service";
import Router from "next/router";
import * as Validator from "validatorjs";

export default function SellProduct() {

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
    const [alertData, setAlertData] = React.useState({ alert: false, message: '', class: '' });

    const forgotPassword = async () => {
        setAlertData({ alert: false, message: '', class: '' });
        setLoading(true);

        try {
            await AuthService.initiateResetPassword(form);
            Router.push('/auth/reset-password');
        }
        catch (e) {
            const error = e.response.data;
            setAlertData({ alert: true, message: error.message, class: 'alert-danger' });
        }

        setLoading(false);
    }


    const handleFormChange = (prop) => (event) => {
        setForm({ ...form, [prop]: event.target.value });
        const validator = new Validator(form, validations);
        if (validator.fails(null))
            setErrors({ ...errors, [prop]: validator.errors.get(prop) });
        else
            setErrors({ ...errors, [prop]: null });
    }
    return (
        <React.Fragment>
            <Head><title>Sell Product</title></Head>
            <div className={styles.root}>
                <div className={styles.container}>
                    <div className={styles.containerHeader}>
                        <h4>Sell a product</h4>
                    </div>
                    <div className={styles.containerBody}>
                        <form autoComplete={'off'}>
                            <div className={"form-group row " + styles.formRow}>
                                <div className="col-sm-12 col-md-12 col-lg-4 col-xl-4">
                                    <label htmlFor='user-name' className={styles.inputLabels}>Customer username</label>
                                    <input type="text" onChange={handleFormChange('email')} value={form.email} id={'email'} className={(!isEmpty(errors.email)) ? 'form-control form-control-sm is-invalid' : (!form.email) ? 'form-control form-control-sm ' : 'form-control form-control-sm is-valid'} />
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-sm-12 col-md-12 col-lg-4 col-xl-4 mr-5">
                                    <label htmlFor='user-name' className={styles.inputLabels}>Payment methods</label>
                                    <input type="text" onChange={handleFormChange('email')} value={form.email} id={'email'} className={(!isEmpty(errors.email)) ? 'form-control form-control-sm is-invalid' : (!form.email) ? 'form-control form-control-sm ' : 'form-control form-control-sm is-valid'} />
                                </div>
                                <div className="col-sm-12 col-md-12 col-lg-4 col-xl-4">
                                    <label htmlFor='user-name' className={styles.inputLabels}>Discount</label>
                                    <input type="text" onChange={handleFormChange('email')} value={form.email} id={'email'} className={(!isEmpty(errors.email)) ? 'form-control form-control-sm is-invalid' : (!form.email) ? 'form-control form-control-sm ' : 'form-control form-control-sm is-valid'} />
                                </div>
                            </div>
                        </form>
                    </div>
                        <div className={styles.containerFooter}>
                            <div className="container row">
                                <div className={"col-sm-12 col-md-12 col-lg-7 col-xl-7 " + styles.containerFooterTitle}>
                                    <h5>Products</h5>
                                </div>
                                <div className="col-sm-12 col-md-12 col-lg-2 col-xl-2">
                                    <button type={"button"} className={styles.submitBtn + ' btn btn-danger w-100'}>
                                        {/*<img src={'/img/add-icon.png'} alt="Icon"/>*/}
                                        New Product
                                    </button>
                                </div>
                            </div>
                            <div className="row">
                              <div className="col-sm-12 col-md-12 col-lg-9 col-xl-9">
                                <hr/>
                              </div>
                            </div>
                    </div>
                    <div className={'col-sm-12 col-md-12 col-lg-9 col-xl-9 '  + styles.productsArea}>
                        <div className={styles.noProducts}>
                            <p>No products in the cart</p>
                        </div>
                </div>
                </div>

            </div>
        </React.Fragment>
    )
}
