import React from 'react';
import Head from "next/head";
import styles from '../../styles/pages/SellProduct.module.css';
import AuthService from "../../services/auth/auth.service";
import Router from "next/router";
import * as Validator from "validatorjs";
import myStyles from "../../styles/pages/ProductCategory.module.css";


export default function AddProduct() {

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
                    <div className={styles.containerHeaderModal}>
                        <h4 className={'text-center'}>Add a new product</h4>
                    </div>
                    <div className={styles.containerBody}>
                     <form className="form-inline col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 ml-auto mr-auto mt-5">
                        <input className={'form-control mr-sm-2 col-12 ' + styles.searchInput} type="text" placeholder="Search products" />
                        <img src="/img/search.png" className={styles.searchImg} alt="Search"  />
                    </form>
                    </div>
                    <div className={"container col-xs-12 col-sm-12 col-md-12 col-lg-9 col-xl-9 " + styles.productsArea }>
                        <ProductView />
                    </div>

            </div>
        </React.Fragment>
    )
}


const ProductView = (props)  => {
    return (
        <div className={myStyles.singleProductView + ' row pb-4'}>
            <div className={myStyles.singleProductViewImageArea + ' col-xs-12 col-sm-12 col-md-12 col-lg-2 col-xl-2'}>
                <img src={'/img/tire.png'} onError={(e) => { e.target.onerror = null; e.target.src = "/img/spare-part.png" }} alt="Image" />
            </div>
            <div className={myStyles.singleProductViewDescriptionArea + ' col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 mr-4'}>
                <h5 className={myStyles.singleProductViewDescriptionAreaTitle + ' col-xs-10 col-sm-10 col-md-12 col-lg-12 col-xl-12'}>Yamaha Tire 1</h5>
                <hr className={'mt-2 col-xs-8 col-sm-8  col-md-8 col-lg-3 col-xl-3 ' + myStyles.productBottomLine} />
                <div className={myStyles.productAttributes}>
                    <div className={'mb-0 d-flex'}>
                        <p className={myStyles.productAttributeKey + ' col-xs-8 col-sm-8 col-md-8 col-lg-6 col-xl-6'}>Part code:</p>
                        <p className={myStyles.productAttributeValue + ' col-xs-8 col-sm-8 col-md-8 col-lg-6 col-xl-6'}> &nbsp; 374894</p>
                    </div>
                    <div className={'mb-0 d-flex'}>
                        <p className={myStyles.productAttributeKey + ' col-xs-8 col-sm-8 col-md-8 col-lg-6 col-xl-6'}>Part number:</p>
                        <p className={myStyles.productAttributeValue + ' col-xs-8 col-sm-8 col-md-8 col-lg-6 col-xl-6'}> &nbsp; 783478HJDF</p>
                    </div>
                    <div className={'mb-0 d-flex'}>
                        <p className={myStyles.productAttributeKey + ' col-xs-8 col-sm-8 col-md-8 col-lg-6 col-xl-6'}>Fit note:</p>
                        <p className={myStyles.productAttributeValue + ' col-xs-8 col-sm-8 col-md-8 col-lg-6 col-xl-6'}> &nbsp; This is a cool product</p>
                    </div>
                    <div className={'mb-0 d-flex'}>
                        <p className={myStyles.productAttributeKey + ' col-xs-8 col-sm-8 col-md-8 col-lg-6 col-xl-6'}>Production date:</p>
                        <p className={myStyles.productAttributeValue + ' col-xs-8 col-sm-8 col-md-8 col-lg-6 col-xl-6'}> &nbsp; 2020-32-2</p>
                    </div>


                </div>
            </div>
            <div className={myStyles.singleProductViewMainArea + ' col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3'}>
                <p>
                    <span className={myStyles.productAttributeKey}>Price : </span> <span className={myStyles.productAttributeValue}>5900 FRW </span>
                </p>
                <button className={'btn btn-danger col-12 mt-5 ' + myStyles.addToListBtn}>Add to the list</button>
            </div>
        </div>
    )
}

