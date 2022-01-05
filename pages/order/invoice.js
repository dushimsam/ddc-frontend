import React, {useEffect, useState} from "react"
import RouteProtector from "../../middlewares/RouteProtector"
import styles from "../../styles/components/invoice.module.css"
import {app_config, system_users} from "../../utils/constants"
import {dateFormat, handleDoubleDecryptionPath} from "../../utils/functions";
import OrderService from "../../services/orders/orders";
import {useRouter} from "next/router";
import PaymentService from "../../services/payment/payment.service"
import {decryptText} from "../../utils/encryption-decryption";
import jsPDF from "jspdf";

import {
    currencyMapping,
    customCurrencyMapping,
    defaultCurrencyMapping,
    rwandanCurrency
} from "../../utils/currency-converter";
import {useSelector} from "react-redux";
import findTotalPrice from "../../utils/shopping-cart";

if (typeof window !== "undefined") {
    require('jquery');
}

const Header = () => {
    return (
        <div className={"container"}>
            <div className={"row"}>
                <div className={"col-2"}>
                    <img src={app_config.APP_LOGO} width={100} height={120}/>
                </div>
                <div className={"col-6"}>
                    <p style={{borderBottom: "2px solid black"}}
                       className={"font-weight-bolder h2 mt-3"}>{app_config.APP_COMPANY_NAME}</p>
                </div>
                {/*<div className={"col-4"}>*/}
                {/*    <p>Phone: {app_config.APP_PHONE}</p>*/}
                {/*    <p>Email: {app_config.APP_EMAIL}</p>*/}
                {/*    <p>Location: {app_config.APP_LOCATION}</p>*/}
                {/*</div>*/}
            </div>
        </div>
    )
}

const UserInfo = ({UserObj, SINGLE}) => {
    return (
        <React.Fragment>
            {
                !SINGLE ?
                    <>
                        <div className="font-weight-bolder">{UserObj.firstName + " " + UserObj.lastName}</div>
                        <div>{UserObj.email}</div>
                        <div>{UserObj.phone}</div>
                    </> : <div className="font-weight-bolder">{UserObj}</div>

            }

        </React.Fragment>
    )
}

const MapPaymentInfoFields = ({fields, currency, user, hideCurrency}) => {
    return (
        fields.map((field) => {
            return (
                <div>{field.name} : <span
                    className="font-weight-bolder">{hideCurrency ? field.value : customCurrencyMapping(currency, user, field.value)}</span>
                </div>
            )
        })
    )
}
const PaymentInfo = ({title, fields, currency, user, hideCurrency}) => {
    return (
        <React.Fragment>
            <h6 className="pb-1 font-weight-bolder">{title}</h6>
            <MapPaymentInfoFields fields={fields} currency={currency} user={user} hideCurrency={hideCurrency}/>
        </React.Fragment>)
}


const OrderHeadTable = () => {
    return (
        <tr>
            <th>#</th>
            <th>Item</th>
            <th>Quantity</th>
            <th>Unit price</th>
            <th>Total price</th>
        </tr>)
}


const OrderTableValues = ({products, status, currency, user}) => {

    return (
        products?.map((item, index) => (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{"Name " + item.product.product.name + " , Part-Code " + item.product.product.product_code}</td>
                <th>{item.quantity}</th>
                <td>{customCurrencyMapping(currency, user, item.product.unit_price)}</td>
                {status !== "ORDER" ?
                    <td>{customCurrencyMapping(currency, user, item?.discounted_price)}</td> : <></>}
                <td>{customCurrencyMapping(currency, user, status === "ORDER" ? item?.price : item.total_price - item.discounted_price)}</td>
            </tr>
        ))
    )
}

const SupplyHeadTable = () => {
    return (
        <tr>
            <th>#</th>
            <th>Item</th>
            <th>Quantity</th>
            <th>Unit Supply price</th>
            <th>Total price</th>
        </tr>)
}


// const SupplyPurchaseTableValues = ({data, status}) => {
//     return (
//         data?.map((item, index) => (
//             <tr key={index}>
//                 <td>{index + 1}</td>
//                 <td>{"Name " + status === "supply" ? item.spare_part.name + " , Part-Number " + item.spare_part.part_number + " , Part-Code " + item.spare_part.part_code : item.product.part_in_stock.spare_part.name + " , Part-Number " + item.product.part_in_stock.spare_part.part_number}</td>
//                 <th>{item.quantity}</th>
//                 <td>{status === "supply" ? item.supply_price : status === "direct_purchase" ? item.total_price : item.price} Frw</td>
//
//                 <td>{status === "supply" ? item.supply_price : status === "direct_purchase" ? item.total_price : item.price} Frw</td>
//             </tr>
//         )))
// }


const DirectPurchaseHeadTable = () => {
    return (
        <tr>
            <th>#</th>
            <th>Item</th>
            <th>Quantity</th>
            <th>Unit price</th>
            <th>Discount</th>
            <th>Total price</th>
        </tr>)
}

export default function InvoiceDemo() {

    // var order;
    // if(!order) return <div>loading...</div>

    const printTheInvoice = () => {
        // const doc = new jsPDF();
        //
        // doc.html(document.getElementById("invoice-body").innerHTML, {
        //     x: 1,
        //     y: 1
        // }).then(res => {
        //     doc.save('sample-file.pdf');
        // })
        window.print();

    }

    const router = useRouter();

    const [main_payment_details, setMainPaymentDetails] = useState(null)

    const [orderedProducts, setOrderedProducts] = useState([])
    // if (isEmpty(main_payment_details)) return <div>loading...</div>

    const [paymentInfoFields, setPaymentInfoFields] = useState([])
    const [paymentDetailsFields, setPaymentDetailsFields] = useState([]);
    const [shippingInfoFields, setShippingInfoFields] = useState([])


    const searchOrder = (orderId) => {
        OrderService.getOrderDetails(orderId)
            .then((res) => {
                let partOrders = res.data.productOrders;

                let totalToPay = findTotalPrice(partOrders[partOrders.length - 1].products, res.data.delivery_zone.delivery_price || 0, "ORDER");

                setMainPaymentDetails(res.data)
                setPaymentInfoFields([{name: "Order Code", value: res.data?.code}, {
                    name: "Initiated at",
                    value: dateFormat(res.data?.createdAt).onlyDate()
                },
                    res.data.status !== "PAYING" && {
                        name: "Payed at",
                        value: dateFormat(res.data?.payments[0].createdAt).onlyDate()
                    }
                ])

                let tax = (res.data?.total_order_price * 18) / 100
                setPaymentDetailsFields([{
                    name: "SUB-TOTAL",
                    value: res.data?.total_order_price
                },
                    {
                        name: "Estimated tax",
                        value: tax
                    }
                    ,
                    {
                        name: "Discount Amount",
                        value: res.data.status === "PAYING" ? res.data.discount_amount : res.data?.payments[0].discount_amount
                    }
                    , {
                        name: "Shipping",
                        value: res.data.status === "PAYING" ? totalToPay.delivery : res.data?.payments[0].shipping_amount
                    }, {
                        name: "Total",
                        value: res.data.status === "PAYING" ? totalToPay.total : res.data?.payments[0].amountPaid
                    }
                ])

                setShippingInfoFields([{
                    name: "Country",
                    value: res.data?.delivery_zone.region.country.country
                }, {name: "Region", value: res.data?.delivery_zone.region.region}, {
                    name: "Zone",
                    value: res.data.delivery_zone.zone
                }])
                setOrderedProducts(partOrders[partOrders.length - 1]?.products)
            }).catch((error => console.error(error)))

    }

    const searchDirectPurchase = (purchaseId) => {
        PaymentService.getDirectPurchasePaymentDetails(purchaseId)
            .then(res => {
                const response_data = res.data[res.data.length - 1];
                setMainPaymentDetails(response_data)
                setOrderedProducts(response_data.direct_purchase.products)
                setPaymentInfoFields([{
                    name: "Initiated at",
                    value: dateFormat(response_data.createdAt).onlyDate()
                }])
                setPaymentDetailsFields([{
                    name: "TOTAL-PRODUCTS-PRICE",
                    value: customCurrencyMapping(currency, user, response_data.direct_purchase.total_products_price)
                }, {
                    name: "TOTAL-DISCOUNT",
                    value: customCurrencyMapping(currency, user, response_data.direct_purchase.discount_amount)
                },
                    {
                        name: "PAID AMOUNT",
                        value: customCurrencyMapping(currency, user, response_data.amountPaid)
                    }])
            }).catch(err => {
            console.log(err)
        })
    }

    const [PAGE_STATUS, setPageStatus] = useState(null)

    useEffect(() => {
        if (router.query.subject) {
            if (router.query.addition === "ORDER_FROM_PAYMENT") {
                setPageStatus("ORDER")
                searchOrder(handleDoubleDecryptionPath(router.query.subject))
            } else if (router.query.addition === "DIRECT_PURCHASE") {
                searchDirectPurchase(handleDoubleDecryptionPath(router.query.subject))
                setPageStatus("DIRECT_PURCHASE")
            }
            // else if (router.query.addition === "ORDER_FROM_PAYMENT") {
            //     setPageStatus("ORDER")
            //     PaymentService.getPayment(handleDoubleDecryptionPath(router.query.subject), "mtn-momo")
            //         .then((res) => {
            //             searchOrder(res.data.order._id)
            //         }).catch(err => {
            //         console.log(err)
            //     })
            // }
        }
    }, [router.query.subject])
    let currency = useSelector((state) => state.appCurrency);
    const user = useSelector(state => state.authUser);

    const generatePdf = () => {
        var doc = new jsPDF('landscape', 'px', 'a4', 'false');
        doc.save('invoice.pdf');
    }

    return (
        orderedProducts.length > 0 ?
            <RouteProtector
                only={[system_users.CUSTOMER, system_users.EMPLOYEE, system_users.SHIPPER, system_users.ADMIN]}>
                <div
                    className="invoice-container bg-light  min-vh-100 d-flex align-items-center justify-content-center py-5">
                    <button className={"btn btn-dark shadow " + styles.printButton} onClick={printTheInvoice}>PRINT
                    </button>
                    <div className="card" id="invoice-body">
                        <div className={styles.container + " card-body py-5"}>
                            <Header/>
                            <div className={"p-4"}>
                                <h3><span
                                    className={"font-italic font-weight-bolder"}>Proforma invoice</span> {PAGE_STATUS === "ORDER" &&
                                <span>#{main_payment_details?.code}</span>}</h3>
                                <hr/>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <div>{app_config.APP_LOCATION.SHORT}</div>
                                        <div>{app_config.APP_LOCATION.FULL}</div>
                                        <div>{app_config.APP_PHONE}</div>
                                        <div>{app_config.APP_EMAIL}</div>
                                        <a href={app_config.APP_URL_HTTPS}
                                           className="btn-link d-block">{app_config.APP_URL}</a>
                                    </div>
                                    <div className="text-right">
                                        {PAGE_STATUS === "ORDER" ?
                                            <UserInfo UserObj={main_payment_details?.customer.user}/> :
                                            <UserInfo UserObj={main_payment_details.customer_names} SINGLE={true}/>}
                                    </div>
                                </div>
                                <hr/>
                                <div className="row">
                                    <div className="col-4">
                                        {
                                            <PaymentInfo fields={paymentInfoFields}
                                                         hideCurrency={true}
                                                         title={PAGE_STATUS === "ORDER" ? "Order Information" : "Direct Purchase Information"}
                                                         currency={currency} user={user}/>
                                        }
                                    </div>
                                    <div className={PAGE_STATUS === "ORDER" ? "col-4" : "col-5"}>
                                        <PaymentInfo fields={paymentDetailsFields} title={"Payment Details"} user={user}
                                                     currency={currency}/>
                                    </div>
                                    <div className="col-4">
                                        {PAGE_STATUS === "ORDER" &&
                                        <PaymentInfo fields={shippingInfoFields} title={"Shipping address"}
                                                     hideCurrency={true}/>}
                                    </div>
                                </div>
                                <hr/>
                                <h6 className="my-4 font-weight-bolder">Products details</h6>

                                <div className="table-responsive col-12">
                                    <table className="table table-bordered table-striped">
                                        <thead>
                                        {PAGE_STATUS === "ORDER" ? <OrderHeadTable/> : <DirectPurchaseHeadTable/>}
                                        </thead>
                                        <tbody>
                                        <OrderTableValues products={orderedProducts} status={PAGE_STATUS}
                                                          currency={currency} user={user}/>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="text-right">
                                    <div className="font-weight-bolder text-secondary">SUB-TOTAL
                                        : {customCurrencyMapping(currency, user, PAGE_STATUS === "ORDER" || PAGE_STATUS === "ORDER_FROM_PAYMENT" ? paymentDetailsFields[0].value : main_payment_details?.direct_purchase.total_products_price)}
                                    </div>
                                    {PAGE_STATUS === "ORDER" ? <div>Estimated tax
                                        : {customCurrencyMapping(currency, user, (paymentDetailsFields[1]?.value))}</div> : <></>}
                                    {PAGE_STATUS === "ORDER" &&
                                    <div>Shipping: {customCurrencyMapping(currency, user, paymentDetailsFields[3].value)}</div>}
                                    <h6 className="mt-3">Total
                                        : {customCurrencyMapping(currency, user, PAGE_STATUS === "ORDER" ? paymentDetailsFields[4].value : main_payment_details?.amountPaid)}</h6>
                                </div>
                                <div>
                                    {/* <img src={"/favicon_io/favicon-32x32.png"} alt="" />
                                <h6 className="font-weight-bolder ">KOREA-AUTO-PARTS</h6> */}
                                    <div className="text-right">
                                        <img
                                            src={"/img/company_info.svg"}
                                            alt="" width={150}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </RouteProtector> : <div>loading ...</div>
    )
}