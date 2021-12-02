import React, {useEffect, useState} from "react"
import {useDispatch, useSelector} from 'react-redux'
import Navbar from "../../../components/navbar";
import Head from "next/head";
import Link from "next/link";
import findTotalPrice from "../../../utils/shopping-cart";
import OrderService from "../../../services/orders/orders"
import RouteProtector from "../../../middlewares/RouteProtector";
import {app_config, system_users} from "../../../utils/constants";
import Modal from "react-bootstrap/Modal";
import Router, {useRouter} from "next/router";
import {dateFormat, gotoPathDirect, handleDoubleDecryptionPath} from "../../../utils/functions";
import Footer from "../../../components/Footer";
import globalStyles from "../../../styles/global-colors.module.css"
import {alertSuccess, notifyError, notifyInfo, notifySuccess} from "../../../utils/alerts";
import {currencyMapping} from "../../../utils/currency-converter";
import AppliedDiscountService from "../../../services/discount/AppliedDiscountService";
import DiscountService from "../../../services/discount/DiscountService"
import CustomerService from "../../../services/customers/customer.service"

const ApplyDiscount = ({customer, order, setAvailableDiscounts, subTotal, setTotalDiscount}) => {

    const [found_discount, setFoundDiscount] = useState(null);
    const [application_status, setApplicationStatus] = useState(false);

    const [coupon_code, setCouponCode] = useState("")
    const [alert, setAlert] = useState({message: "", class: "", show: false})
    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");

    const handleApplyDiscount = async () => {
        try {
            setLoading(true);

            const discount_res = await DiscountService.getByCodeDetails(coupon_code.trim());
            if (discount_res.data.status === "AVAILABLE") {
                const res = await AppliedDiscountService.create({
                    customer: customer._id,
                    order_discount: discount_res.data.object._id,
                    order: order._id
                });

                setTotalDiscount(subTotal * discount_res.data.object.discount)
                setAvailableDiscounts(old => [...old, res.data]);
                setFoundDiscount(discount_res.data.object);
                alertSuccess(setAlert, "Discount is set");
                setApplicationStatus("SUCCESS");
                setMessage("Discount is set successfully.")
            } else {
                if (discount_res.data.status === "EXPIRED")
                    setMessage("Sorry this coupon code has expired.")
                else if (discount_res.data.status === "CANCELLED")
                    setMessage("Sorry this promotion was cancelled.")
                else if (discount_res.data.status === "USAGE_COUNT_EXCEEDED")
                    setMessage("Sorry you have reached the maximum usage of this coupon code.")
                setApplicationStatus("FAILED");
            }
            setLoading(false)
        } catch (e) {
            setMessage(e.response ? e.response.data.message : e.message || "Error occurred. Try again latter.");
            setApplicationStatus("FAILED");
            setLoading(false)
        }
    }
    return (
        <div className={"container"}>
            <div className={"row"}>
                <div className={"col-12"}>
                    {
                        application_status === "FAILED" ?
                            <div
                                className={"alert shadow alert-danger d-flex justify-content-between text-light"}>
                                <strong>{message} </strong>
                                <div className={"cursor-pointer rounded-circle text-light "}
                                     onClick={() => setApplicationStatus(false)}>
                                <span aria-hidden="true">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path
                                    fill="none" d="M0 0h24v24H0z"/><path
                                    d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"
                                    fill="rgba(255,255,255,1)"/></svg>
                                </span>
                                </div>
                            </div>
                            : application_status === "SUCCESS" ? <div
                                className={"alert shadow alert-success d-flex justify-content-between text-light"}>
                                <strong>{message} </strong>
                                <div className={"cursor-pointer rounded-circle text-light "}
                                     onClick={() => setApplicationStatus(false)}>
                                <span aria-hidden="true">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path
                                    fill="none" d="M0 0h24v24H0z"/><path
                                    d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"
                                    fill="rgba(255,255,255,1)"/></svg>
                                </span>
                                </div>
                            </div> : <></>
                    }
                </div>
            </div>

            <div className={"row"}>
                <div className={"col-3"}>
                    <p className={"font-weight-bolder"}>GET A PROMOTIONAL DISCOUNT</p>
                </div>
                <div className={"col-9"}>
                    <div className="input-group mb-3">
                        <input type="text" id="coupon" onChange={(e) => setCouponCode(e.target.value)}
                               className="form-control" placeholder="Coupon code"/>
                        <div className="input-group-append">
                            <button className="btn btn-danger btn-sm" type="button"
                                    disabled={loading || coupon_code.length < 3}
                                    onClick={() => handleApplyDiscount()}>
                                {loading ? <img src={"/img/loader.gif"} alt={"Loading"}
                                                className={"mx-4 loader"}/> :
                                    "Apply"}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
const DisplayProducts = ({order, product, quantity, handleRemoveProduct, currency}) => {
    return (
        <tr key={product._id}>
            <td className="p-4">
                <img
                    width={150}
                    src={
                        product.product?.imageUrls[0]
                    }
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/img/default.png";
                    }}
                    alt={product?.product?.name}
                />
            </td>
            <td>{product?.product?.name}</td>
            <td>{product?.product?.product_code}</td>

            <td>                <span className="font-weight-bold">
                                                    {quantity}
            </span>
            </td>

            <td><span
                className="font-weight-bold">{product.product.weight}</span>
            </td>
            <td><span
                className="font-weight-bold">{currencyMapping(currency, order?.delivery_zone.delivery_price)}</span>
            </td>
            <td>
                <span
                    className="font-weight-bold h5"><b>{currencyMapping(currency, product.product.weight * order?.delivery_zone.delivery_price * quantity)}</b></span>
            </td>
            <td>
                                             <span className="font-weight-bold">
                                                 {currencyMapping(currency, product.unit_price)}
                                             </span>
            </td>

            <td>
                                            <span className="font-weight-bold h5">
                                                <b>{currencyMapping(currency, quantity * product.unit_price)}</b>
                                            </span>
            </td>
            <td>
                                            <span className="font-weight-bold h4">
                                                <b>{currencyMapping(currency, (product.product.weight * order.delivery_zone.delivery_price * quantity) + (quantity * product.unit_price))}</b>
                                            </span>
            </td>

        </tr>
    )
}

export default function ReviewOrder() {
    const dispatch = useDispatch()
    const [readMore, setReadMore] = useState(0)
    const [loading, setLoading] = useState(false)
    const [showProductsNow, setShowProductsNow] = useState(false)
    const [discountAmount, setDiscountAmount] = useState(0)
    const [alert, setAlert] = useState({
        show: false,
        status: 500,
        message: "",
    });

    const cart = useSelector(state => state.cart);
    const [order, setOrder] = useState(null)
    const stateOrder = useSelector((state) => state.order);
    const user = useSelector(state => state.authUser)
    const [totalToPay, setTotalToPay] = useState({})
    const [orderProducts, setOrderProducts] = useState([])
    const [total_discount, setTotalDiscount] = useState(0);

    const [availableDiscounts, setAvailableDiscounts] = useState([]);

    const [customer, setCustomer] = useState(null);

    useEffect(() => {
        if (order && order.status !== "PAYING") {
            if (cart) {
                setTotalToPay(findTotalPrice(cart, order.delivery_zone.delivery_price || 0, "CART", total_discount));
            }
        } else if (orderProducts.length > 0 && order) {
            setTotalToPay(findTotalPrice(orderProducts[orderProducts.length - 1].products, orderProducts[orderProducts.length - 1].order.delivery_zone.delivery_price || 0, "ORDER", total_discount));
        }
    }, [cart, order, orderProducts, total_discount])


    useEffect(async () => {
        if (user.id) {
            const res = await CustomerService.getCustomer(user.id)
            setCustomer(res.data);
        }
    }, [user])
    const addOrderProducts = () => {

        let products = cart.map((item) => ({
            product: item._id,
            quantity: item.orderedQuantity,
        }));

        OrderService.addOrderedProducts({
            order: order._id,
            products: products,
        })
            .then((res) => {
                notifySuccess("Successfully Added  Products")
                notifyInfo("Continue with Payment Process")
                window.setTimeout(() => {
                    Router.push(gotoPathDirect("/order/payment-method", order._id)
                    ).then(r => console.log(r))
                }, 4000);
            }).catch(e => {
            notifyError(e.response ? e.response.data.message : e.message || "Error occurred. Try again latter.")
        })
            .finally(() => {
                setLoading(false);
            })
    }


    const handleNext = () => {
        setLoading(true)
        if (order.status === "INITIATED")
            addOrderProducts();
        else
            Router.push(gotoPathDirect("/order/payment-method", order._id)
            ).then(r => console.log(r))
    }


    const hideAlert = () => {
        if (alert.status === 201) {
            Router.push("/customer/dashboard");
        }
        setAlert({...alert, show: false})
    }

    const showProducts = (e) => {
        e.preventDefault();
        setShowProductsNow(!showProductsNow)
    }


    const router = useRouter();


    useEffect(() => {
        if (router.query.subject) {
            OrderService.get(handleDoubleDecryptionPath(router.query.subject))
                .then(async (res) => {
                    setOrder(res.data)
                    if (res.data.status !== "INITIATED" && res.data.status !== "PAYING") {
                        window.history.back();
                    }

                    const available_discounts_res = await AppliedDiscountService.getAllAvailableByOrder(res.data._id);

                    if (available_discounts_res.data.available) {
                        let total_discount = available_discounts_res.data.object.map(item => item.order_discount.discount).reduce((prev, next) => prev + next);
                        if (res.data.status === "INITIATED")
                            setTotalDiscount(findTotalPrice(cart, res.data.delivery_zone.delivery_price || 0, "CART", 0).subTotal * total_discount);
                        else
                            setTotalDiscount(res.data.total_order_price * total_discount);
                    }

                    if (Object.entries(res.data).length === 0) {
                        if (typeof window != "undefined") window.history.back();
                        return <div>Loading ....... </div>;
                    }

                    if (res.data.status === "PAYING") {
                        OrderService.orderProducts(res.data._id).then((res) => {
                            setOrderProducts(res.data)
                        }).catch(e => console.log(e))
                    }
                }).catch((err) => {
            })
        }
    }, [router.query.subject])
    let currency = useSelector((state) => state.appCurrency);

    return (
        <RouteProtector only={[system_users.CUSTOMER]}>
            {
                order && <div className="container-fluid p-0 m-0 bg-light">
                    <Head>
                        <title>Order Review | {app_config.APP_NAME_LOWER}</title>
                    </Head>
                    <Navbar/>
                    <Modal
                        show={alert.show}
                        size="lg"
                        aria-labelledby="contained-modal-title-center"
                        centered
                    >
                        <Modal.Header>
                            <h5
                                className={
                                    "modal-title px-2 pr-5 " + alert.status === 500
                                        ? "text-danger"
                                        : ""
                                }
                                id="order-created-modal"
                            >
                                {alert.status === 201
                                    ? " Order successfully received!"
                                    : "Error occurred"}
                            </h5>
                            <div className={"model-close "}>
                                <button className={"btn text-secondary"} onClick={hideAlert}>
                                    X
                                </button>
                            </div>
                        </Modal.Header>
                        <Modal.Body>
                            {alert.status === 201 ? (
                                <div className="row">
                                    <div className="col-5">
                                        <svg
                                            className={"d-block w-100"}
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                        >
                                            <path fill="none" d="M0 0h24v24H0z"/>
                                            <path
                                                d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-.997-4L6.76 11.757l1.414-1.414 2.829 2.829 5.656-5.657 1.415 1.414L11.003 16z"
                                                fill="rgba(8,140,83,1)"
                                            />
                                        </svg>
                                    </div>
                                    <div className="col-6 my-auto">
                                        {/*<h6 className="">Your order will be delivered in 2 days</h6>*/}
                                        <h5 className="text-bold">Thank you for choosing us.</h5>
                                    </div>
                                </div>
                            ) : (
                                <div className={"alert alert-dismissible alert-warning"}>
                                    {alert.message}
                                </div>
                            )}
                        </Modal.Body>
                        <div className={"py-4 px-5 text-right"}>
                            {alert.status === 201 ? (
                                <Link href={"/customer/dashboard"}>
                                    <span className={"btn btn-info"}>Track delivery</span>
                                </Link>
                            ) : (
                                <button className={"btn btn-danger"} onClick={hideAlert}>
                                    Cancel
                                </button>
                            )}
                        </div>
                    </Modal>
                    <div className="mx-auto col-md-10 col-lg-10 px-sm-3 px-md-5 card py-4 my-4">
                        <div className="d-flex justify-content-between align-items-center pt-3">
                            <div className="d-flex">
                                <h3 className="text-left text-secondary">
                <span className="text-dark font-weight-bold">
                  Review Your Order
                </span>{" "}
                                    <span style={{fontSize: 13}}>
                  {dateFormat(order?.order?.createdAt).fromNow()}
                </span>
                                    &emsp;
                                </h3>
                                <div>
                                    <div className="badge badge-warning font-weight-bold">
                                        {" "}
                                        {order?.status}
                                    </div>
                                </div>
                            </div>

                        </div>
                        <hr/>
                        <div className="card">
                            <div className="card-body px-md-5 py-4 shadow-sm">
                                <div className="row">


                                    <div className="col-12 col-lg-6 border-right">
                                        <h5 className="font-weight-bolder border-bottom pb-3">
                                            Customer information
                                        </h5>
                                        <div className="d-flex row mr-md-1 mt-4">
                                            <div className="col-12 col-md-3">
                                                <div className="text-center">
                                                    <img
                                                        className="nav-bar-avatar rounded-circle shadow"
                                                        src={user.imageUrl}
                                                        height={50}
                                                        width={50}
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src =
                                                                "https://ui-avatars.com/api/?name=" +
                                                                user.username;
                                                        }}
                                                        alt={user.username}
                                                        title={user.username}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-8">
                                                <div className="d-flex justify-content-between my-2">
                                                    <div className="text-secondary">Full names :</div>
                                                    <div>{user.fullNames}</div>
                                                </div>

                                                <div className="d-flex justify-content-between my-2">
                                                    <div className="text-secondary">Email :</div>
                                                    <div>{user.email}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-12 col-lg-5 mt-5 mt-lg-0">
                                        <h5 className="font-weight-bolder border-bottom pb-3">
                                            Shipping information
                                        </h5>
                                        <div className="pr-lg-2 mt-4">
                                            <div className="d-flex justify-content-between my-2">
                                                <div className="text-secondary">Country :</div>
                                                <div>
                                                    {order?.delivery_zone?.region?.country.country}
                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-between my-2">
                                                <div className="text-secondary">Region :</div>
                                                <div>{order?.delivery_zone?.region?.region}</div>
                                            </div>

                                            <div className="d-flex justify-content-between my-2">
                                                <div className="text-secondary">Zone :</div>
                                                <div>{order?.delivery_zone?.zone}</div>
                                            </div>

                                            <div className="d-flex justify-content-between my-2">
                                                <div className="text-secondary">Shipping period :</div>
                                                <div>{order?.delivery_zone?.transfer_time + " hr/s (" + (order?.delivery_zone?.transfer_time * 60) + " minutes )"}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card mt-4">
                            <div className="card-body px-md-5 pb-1">
                                <h5 className="font-weight-bolder">Payment details</h5>
                                <hr/>
                                <div className={"row"}>
                                    <div className={"col-12"}>
                                        <ApplyDiscount order={order} customer={customer} subTotal={totalToPay?.subTotal}
                                                       setTotalDiscount={setTotalDiscount}
                                                       setAvailableDiscounts={setAvailableDiscounts}/>
                                    </div>
                                </div>
                                <div className="row">

                                    <div className="col-6">Sub total</div>
                                    <div className="col-6 text-right">
                                        {currencyMapping(currency, totalToPay?.subTotal)}
                                    </div>
                                    <div className="col-6">
                                        <td>Discount</td>
                                    </div>
                                    <div
                                        className="col-6 text-right">{currencyMapping(currency, totalToPay?.total_discount)} </div>

                                    {totalToPay?.total_discount > 0 ? <>
                                        <div className="col-6">
                                            <td>Total</td>
                                        </div>
                                        <div
                                            className="col-6 text-right">{currencyMapping(currency, totalToPay?.sub_total_with_discount)} </div>
                                    </> : <></>
                                    }
                                    <div className="col-6">Shipping</div>
                                    <div className="col-6 text-right">
                                        {currencyMapping(currency, totalToPay?.delivery)}
                                    </div>


                                    <div className="col-6">
                                        <h4 className="font-weight-bolder">Estimated total</h4>
                                    </div>
                                    <div className="col-6 text-right">
                                        <h4 className="font-weight-bolder">
                                            {/*{totalToPay?.total?.toLocaleString()} {DEFAULT_CURRENCY}*/}
                                            {currencyMapping(currency, totalToPay?.total_with_discount)}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            className={"text-right mt-3 " + (showProductsNow ? globalStyles.globalTextColor : " text-primary")}>
                            <a href="#" onClick={showProducts}>
                                {showProductsNow ? "Hide" : "Show"} products details in my order {" "}
                            </a>
                        </div>
                        {showProductsNow && (
                            <div className="ordered-products mt-4">
                                <h4 className="font-weight-bolder pb-5 pt-3">
                                    Products in Your order
                                </h4>
                                <table className="table table-bordered table-hover table-responsive">
                                    <thead className="thead-light">
                                    <tr>
                                        <th>Product image</th>
                                        <th>Name</th>
                                        <th>Product Code</th>
                                        <th>Quantity</th>
                                        <th>Weight</th>
                                        <th>Shipping per kg in your location</th>
                                        <th>Total Shipping francs</th>
                                        <th>Unit price</th>
                                        <th>Total products price</th>
                                        <th>Total Amount</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {order?.status !== "PAYING" ? cart.map((product) => (
                                            <DisplayProducts order={order} product={product}
                                                             quantity={product.orderedQuantity} currency={currency}/>
                                        )) :
                                        order?.status === "PAYING" ? orderProducts[orderProducts.length - 1]?.products?.map((product) => (
                                            <DisplayProducts order={order} product={product.product}
                                                             quantity={product.quantity} currency={currency}/>
                                        )) : <></>
                                    }
                                    </tbody>
                                </table>
                            </div>
                        )}
                        <div className="row pt-4 mb-4">
                            <div className="col text-left">
                                <Link
                                    href={gotoPathDirect("/order/shipping-address", order?._id)}
                                    passHref
                                >
                                    <button className={"btn btn-secondary px-md-5"}>BACK</button>
                                </Link>
                            </div>
                            <div className="text-right col">
                                <button
                                    className={
                                        "btn  px-md-5 text-white " + globalStyles.globalBackColor
                                    }
                                    disabled={loading}
                                    onClick={() => handleNext()}
                                >
                                    {" "}
                                    {loading ? (
                                        <img
                                            src={"/img/loader.gif"}
                                            alt={"Loading"}
                                            className={"inline mx-5 loader"}
                                        />
                                    ) : (
                                        "CONTINUE"
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="py-2 my-1 text-secondary text-center">
                        These are the details of your order
                    </div>
                    <Footer/>
                </div>
            }

        </RouteProtector>
    )
        ;
}