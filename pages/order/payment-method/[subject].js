import React, {useEffect, useState} from "react"
import Head from "next/head";
import OrderService from "../../../services/orders/orders";
import {useDispatch, useSelector} from "react-redux";
import Router, {useRouter} from "next/router";
import globalStyles from "../../../styles/global-colors.module.css"

import {addCoupon, addProcessedDara, destroyOrder,} from "../../../store/actions/order-actions";
import Alert from "../../../components/alert";
import Link from "next/link"
import {destroyCart} from "../../../store/actions/cart-actions";
import {notifyError, notifySuccess} from "../../../utils/alerts";
import findTotalPrice, {getOrderToTalPrice, getShippingPrice} from "../../../utils/shopping-cart";
import {gotoPath, gotoPathDirect, handleDoubleDecryptionPath} from "../../../utils/functions";
import {app_config, system_users} from "../../../utils/constants";
import AfriPayComponent from "../../../components/payment/afripay-submit";
import Footer from "../../../components/Footer";
import RouteProtector from "../../../middlewares/RouteProtector";
import Navbar from "../../../components/navbar";
import {InvoiceShow} from "../../../components/reusable/invoice/invoice-show";
import AppliedDiscountService from "../../../services/discount/AppliedDiscountService";

export default function PaymentMethod() {
    const dispatch = useDispatch()
    const [discountAmount, setDiscountAmount] = useState(0)
    const cart = useSelector(state => state.cart)


    const [paymentMethod, setPaymentMethod] = useState("momo")

    const [loading, setLoading] = useState(false)
    const [applyingCoupon, setApplyingCoupon] = useState(false)
    const [alert, setAlert] = useState({state: false, message: "", class: ""})

    const [values, setValues] = useState({
        phone: "",
        coupon: ""
    })

    const changePaymentMethod = (option) => {
        // setPaymentMethod(option)
        // if (option === "others" && order && totalToPay?.total > 0) {
        //     document.getElementById("subtmitAfripayBtn").click()
        // }
    }
    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
    }

    const [order, setOrder] = useState(null);


    const router = useRouter();


    const [info, setInfo] = useState({})

    const [totalToPay, setTotalToPay] = useState({})
    const [orderProducts, setOrderProducts] = useState([])
    const [total_discount, setTotalDiscount] = useState(0);

    const [currUrl, setCurrUrl] = useState(null);
    useEffect(() => {
        setCurrUrl(window.location.href)
    }, [])

    useEffect(() => {
   if (orderProducts.length > 0 && order) {
            setTotalToPay(findTotalPrice(orderProducts[orderProducts.length - 1].products, orderProducts[orderProducts.length - 1].order.delivery_zone.delivery_price || 0, "ORDER", total_discount));
        }
    }, [cart, order, orderProducts, total_discount])

    useEffect(() => {
        if (router.query.subject) {
            OrderService.get(handleDoubleDecryptionPath(router.query.subject))
                .then(async (res) => {
                    setOrder(res.data)
                    if (res.data.status !== "INITIATED" && res.data.status !== "PAYING")
                        window.history.back();
                    OrderService.orderParts(res.data._id).then((res) => {
                        setOrderProducts(res.data)
                    }).catch(e => console.log(e))

                    const available_discounts_res = await AppliedDiscountService.getAllAvailableByOrder(res.data._id);
                    if (available_discounts_res.data.available) {
                        setTotalDiscount(res.data.total_order_price * available_discounts_res.data.object.map(item => item.order_discount.discount).reduce((prev, next) => prev + next));
                    }
                }).catch((err) => {
                console.log("error", err)
            })
        }
    }, [router.query.subject])


    const handleNext = () => {
        // setLoading(true)
        // const info = {
        //     order: order._id,
        //     msisdn: "250" + values.phone,
        //     shipping_amount: totalToPay?.delivery,
        //     amountPaid: totalToPay?.total_with_discount,
        //     channel: "WEB"
        // };
        //
        // dispatch(addProcessedDara(info));
        // OrderService.payMoMo(info)
        //     .then(res => {
        //         dispatch(destroyCart())
        //         dispatch(destroyOrder())
        //         notifySuccess("Successfully completed the order process 👏👏👏")
        //
        //         window.setTimeout(() => {
        //             notifySuccess("Your order in process of delivery 🚢🚢🚢 ")
        //         }, 5000)
        //
        //         window.setTimeout(() => {
        //             Router.push(gotoPath("/order/invoice", res.data._id, "ORDER_FROM_PAYMENT"))
        //         }, 5000)
        //     })
        //     .catch(e => {
        //         notifyError(e.response ? e.response.data.message : e.message || "Error occurred. Try again latter.")
        //     })
        //     .finally(() => {
        //         setLoading(false);
        //     })
    }

    const otherImgWidth = 150
    let currency = useSelector((state) => state.appCurrency);

    return (
        <RouteProtector only={[system_users.CUSTOMER]}>
            <div className="container-fluid p-0 m-0 bg-light">
                <Head>
                    <title>Payments | {app_config.APP_NAME_LOWER}</title>
                </Head>
                <Navbar/>
                <div className="bg-lightgray">
                    <div className="container col-md-10 col-lg-8 px-sm-3 px-md-5 bg-white py-4 my-3">
                        <h3 className="text-left text-secondary pt-3 pb-2 font-weight-bold">Payment Method</h3>
                        <InvoiceShow link={gotoPath("/order/invoice", order?._id, "ORDER_FROM_PAYMENT")}/>
                        <div className="text-secondary mt-5">Which payment method would you prefer to use ?
                            <br/>Currently we are working with <span
                                className={"font-weight-bolder"}>MTN Mobile money</span> , <span
                                className={"font-weight-bolder"}>Visa card</span> , <span
                                className={"font-weight-bolder"}>Master Card</span> and <span
                                className={"font-weight-bolder"}>AfriPay</span>.
                        </div>
                        <hr/>
                        <div className="row pb-md-1">

                            <div className="payment-option col-12 col-md-4 c-pointer pr-0"
                                 onClick={() => changePaymentMethod('momo')}>
                                <div
                                    className={(paymentMethod === "momo" ? 'border-primary bg-white ' : ' bg-light ') + " py-4 text-center mt-2 border rounded-lg"}>
                                    <img className="d-block mx-auto img img-thumbnail" width={otherImgWidth}
                                         height={otherImgWidth}
                                         src="https://i0.wp.com/www.gsma.com/mobilefordevelopment/wp-content/uploads/2020/05/MTN-Mobile-Money-Logo-200x200-1.png?fit=200%2C200&ssl=1"
                                         alt="MTN MoMo"/>
                                    <h6 className="mt-3 text-secondary">MTN MoMo</h6>
                                </div>
                            </div>

                            <div className="payment-option col-12 col-md-8 c-pointer pr-0"
                                 onClick={() => changePaymentMethod('others')}>
                                <div
                                    className={(paymentMethod === "others" ? 'border-primary bg-white container ' : 'bg-light ') + "bg-light py-2 text-center mt-2 border rounded-lg"}>

                                    <img className=" img img-thumbnail  mr-5" width={otherImgWidth}
                                         height={otherImgWidth}
                                         src="https://library.kissclipart.com/20191002/rkw/kissclipart-mastercard-icon-payment-method-icon-950bb35c6e487ec1.png"
                                         alt="Master Card"/>

                                    <img className="img img-thumbnail mr-5" width={otherImgWidth} height={otherImgWidth}
                                         src="https://www.howtobd.com/wp-content/uploads/2020/07/Free-Online-virtual-Visa-Card-in-Bangladesh.jpg"
                                         alt="Visa Card"/>

                                    <img className="img img-thumbnail mr-5 mt-4" width={otherImgWidth}
                                         height={otherImgWidth}
                                         src="https://afripay.africa/logos/pay_with_afripay.png"
                                         alt="AfriPay"/>
                                    <h6 className="mt-4 text-secondary">OTHERS</h6>
                                </div>
                                {
                                    currUrl ?
                                        <AfriPayComponent
                                            amount={totalToPay?.total}
                                            client_token={order?.code}
                                            backUrl={currUrl}
                                            currency={currency}
                                        /> : <></>
                                }
                            </div>
                        </div>
                    </div>
                    {
                        alert.state ?
                            <Alert message={alert.message} className={alert.class}/> : null
                    }

                    <div className="container-fluid pt-1 pb-4">
                        <div
                            className={(paymentMethod === 'momo' || paymentMethod === 'AirtelMoney' ? "" : '  d-none ') + " pay-with-card"}>
                            <h5 className="text-secondary mt-2 text-center">Pay with {paymentMethod}</h5>
                            <div className="momo-form col-md-5 mt-1 mx-auto">
                                <div className="input-group mb-3">
                                    <div className="input-group-append">
                                        <button className="btn btn-sm btn-secondary disabled rounded-left"
                                                type="button">+250
                                        </button>
                                    </div>
                                    <input onChange={handleChange("phone")} type="number"
                                           className="form-control pl-4" placeholder="Phone number"/>
                                </div>
                                <hr className={"my-4"}/>
                                {/*{*/}
                                {/*    order?.discount ?*/}
                                {/*        <div*/}
                                {/*            className="text-center py-5 px-4 alert alert-dismissible alert-info">Discount*/}
                                {/*            of {order.discount.discount}% was applied</div>*/}
                                {/*        :*/}
                                {/*        <div className="input-group mb-3">*/}
                                {/*            <input type="text" id="coupon" onChange={handleChange("coupon")}*/}
                                {/*                   className="form-control pl-4" placeholder="Coupon code"/>*/}
                                {/*            <div className="input-group-append">*/}
                                {/*                <button className="btn btn-danger btn-sm" type="button"*/}
                                {/*                        disabled={applyingCoupon || loading || values.coupon.length < 3}*/}
                                {/*                        onClick={applyCoupon}>*/}
                                {/*                    {applyingCoupon ? <img src={"/img/loader.gif"} alt={"Loading"}*/}
                                {/*                                           className={"mx-4 loader"}/> :*/}
                                {/*                        "Apply"}</button>*/}
                                {/*            </div>*/}
                                {/*        </div>*/}
                                {/*}*/}
                            </div>
                        </div>
                    </div>
                    <div className="row  justify-content-between pt-4 mb-4">
                        <div className="col-4 text-right">
                            <Link
                                href={gotoPathDirect("/order/review", order?._id)}
                                passHref
                            >
                                <button className={"btn btn-secondary px-md-5"}>BACK</button>
                            </Link>
                        </div>
                        <div className="col-4 pl-md-5">
                            <button
                                className={
                                    "btn text-white px-md-2  " + globalStyles.globalBackColor
                                }
                                disabled={loading}
                                onClick={() => handleNext()}
                            >
                                {loading ? (
                                    <img
                                        src={"/img/loader.gif"}
                                        alt={"Loading"}
                                        className={"mx-md-4 loader"}
                                    />
                                ) : (
                                    "CONTINUE"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        </RouteProtector>

    )
}