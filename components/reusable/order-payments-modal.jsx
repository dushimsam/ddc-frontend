import React, {useMemo} from 'react';
import {useEffect, useState} from 'react';
import ShipmentService from '../../services/shipments/shipment.service';
import RecordDetails from "../../components/record-details/record-details"
import {processDetailedDate} from "../../utils/process-date"
import {} from "../../services/payment/payment.service"
import Link from "next/link";
import globalStyles from "../../styles/global-colors.module.css";
import Router from "next/router";
import $ from "jquery";
import {currencyMapping, defaultCurrencyMapping, rwandanCurrency} from "../../utils/currency-converter";

const ModalContent = ({payments, orderFields}) => {


    const [fields, setFields] = useState(null);

    const handleSetShipper = (item) => {
        ShipmentService.getShipper(item)
            .then(res => {
                setFields([
                    {name: "First Name", value: res.data.user.firstName},
                    {name: "Last Name", value: res.data.user.lastName},
                    {name: "Phone Number", value: res.data.user.phone},
                    {name: "Email", value: res.data.user.email},
                    {name: "Gender", value: res.data.user.gender != null ? res.data.user.gender : " UNKNOWN "},
                    {name: "Username", value: res.data.user.username},
                    {name: "Registered At ", value: processDetailedDate(res.data.createdAt)}
                ]);
                document.getElementById("modalShowBtn").click()
            }).catch(e => console.log(e))
    }


    return (
        <div className="bg-white rounded border p-3 mt-2 mb-3">
            <h6 className="font-weight-bold text-dark" style={{fontSize: "0.95em"}}>Order Payment Details</h6>
            <div className="row pt-2 pl-5">

                {orderFields.map((field, index) => {
                    return (
                        <div className="col-8 pt-2">
                            <span className="font-weight-bold">{field.name}: </span><span
                            className="font-weight-light">{field.value}</span>
                        </div>)
                })
                }


            </div>

            <h3 className="mt-5 font-weight-bolder">All Payments Under The Order</h3>
            <hr/>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Payment Date</th>
                    <th>Today Amount</th>
                    <th>status</th>
                    <th>Payment Method</th>
                </tr>
                </thead>
                <tbody>
                {/* {
                    payments?.map((payment, i) => (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td> {processDetailedDate(payment.createdAt)} </td>
                            <td> {processDetailedDate(payment.updatedAt)} </td>
                            <td> {payment.status} </td>
                            <td>
                 <a className="text-decoration-none" onClick={()=>handleSetShipper(payment.shipper)} href="#">Find</a>
                            </td>
                        </tr>
                    ))
                } */}
                </tbody>
            </table>

            {fields && <RecordDetails title={fields[0].value} fields={fields}/>}
            <button id="modalShowBtn" className="d-none" data-toggle="modal" data-target="#itemReadMoreModal">Large
                modal
            </button>
        </div>
    );
};


const OrderPaymentModal = ({order}) => {

    const [payments, setPayments] = useState([]);
    const [orderFields, setOrderFields] = useState([])


    const handleViewReceiptRoute = () => {

        $(function () {
            $('#orderPaymentReadMore').modal('hide');
        })
        window.setTimeout(() => {
            Router.push({pathname: "/order/invoice", query: {payment: "60b790ddea7ab4d53f10b958"}})
        }, 1000)

    }
    useEffect(() => {

        ShipmentService.getOrderShipment(order._id)
            .then((res) => {

                setOrderFields([
                    {name: "Initiated At", value: processDetailedDate(order.createdAt)},
                    {
                        name: "Shipping  Amount",
                        value: defaultCurrencyMapping(res.data[0].payment.shipping_amount)
                    },
                    {
                        name: "Total Order Amount ",
                        value: defaultCurrencyMapping(res.data[0].payment.order.total_order_price)
                    },
                    {
                        name: "Dicount Amount ",
                        value: defaultCurrencyMapping(res.data[0].payment.discount_amount)
                    },
                    {name: "VAT", value: defaultCurrencyMapping(res.data[0].payment.VAT)},
                    {name: "Total VAT  ", value: defaultCurrencyMapping(res.data[0].payment.total_VAT)},
                    {name: "Amount To Paid ", value: defaultCurrencyMapping(res.data[0].payment.amountToPay)},
                    {name: "Payment Method Used ", value: res.data[0].payment_method}])
                setPayments(res.data)

            }).catch(e => console.log(e))


    }, [order])

    return (
        <div className="modal fade" id="orderPaymentReadMore" tabIndex="-1" role="dialog"
             aria-labelledby="exampleModalLabel"
             aria-hidden="false">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div className="modal-content">
                    <div class="modal-header">
                        <span> PAYMENT INFO ABOUT THE ORDER </span> <span class="modal-title ml-3 font-weight-bold"
                                                                          id="exampleModalLabel"> {`# ${order._id} `} </span><span></span>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body  rounded">
                        <ModalContent payments={payments} orderFields={orderFields}/>
                    </div>
                    <div className="modal-footer">
                        <button onClick={() => handleViewReceiptRoute()}
                                className={"btn text-white  btn-sm  col-2 " + globalStyles.globalBackColor}>VIEW THE
                            RECEIPT
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderPaymentModal;
