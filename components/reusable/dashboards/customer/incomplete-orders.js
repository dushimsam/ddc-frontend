import React, {useEffect, useState} from "react";
import OrderService from "../../../../services/orders/orders"
import customerService from "../../../../services/customers/customer.service";
import jwt from "jwt-decode";
import AuthService from "../../../../services/auth/auth.service";
import {dateFormat, filterData, gotoPath, gotoPathDirect} from "../../../../utils/functions";
import Router from "next/router";
import {encryptText} from "../../../../utils/encryption-decryption";
import styles from "../../../../styles/pages/table.module.css";
import {useSelector} from "react-redux";

const ContinueIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30">
    <path fill="none" d="M0 0h24v24H0z"/>
    <path
        d="M12 11V8l4 4-4 4v-3H8v-2h4zm0-9c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 18c4.42 0 8-3.58 8-8s-3.58-8-8-8-8 3.58-8 8 3.58 8 8 8z"
        fill="rgba(231,76,60,1)"/>
</svg>
const Container = () => {

    const [initiatedOrders, setInitiated] = useState([]);
    const [payingOrders, setPayingOrders] = useState([]);

    const authUser = useSelector(state => state.authUser)
    useEffect(() => {
        if (authUser.id)
            customerService.getCustomer(authUser.id)
                .then((result) => {
                    OrderService.getOrderForACustomer(result.data._id)
                        .then((res) => {
                            setInitiated(filterData(res.data, 'status', "INITIATED"));
                            setPayingOrders(filterData(res.data, 'status', "PAYING"));
                        }).catch((e) => console.log(e))
                }).catch((e) => console.log)
    }, [authUser])


    const readMore = (order) => {
        Router.push({pathname: "/customer/my-orders", query: {id: encryptText(order._id)}})
    }

    const handleContinueProcess = (data, status) => {
        if (status === 'INITIATED') {
            Router.push(gotoPathDirect('/order/review', data._id))
        } else {
            Router.push(gotoPathDirect('/order/payment-method', data._id))
        }
    }


    return (
        <div className="container card col-lg-8">
            <div className={"card-body"}>
                <div className={"row justify-content-start"}>
                    <div className={"col-8"}>
                        <h4 className={"font-weight-bold"}>Orders in progress</h4>
                        <p className={"text-secondary font-weight-lighter"}> {[...initiatedOrders, ...payingOrders].length} orders
                            are waited to be
                            completed.</p>
                    </div>

                </div>
                <hr className={"my-2"} style={{border: "1.5px solid grey"}}/>
                <div className={"row pt-3"}>
                    <div className={"container"}>
                        {
                            [...initiatedOrders, ...payingOrders].map((data, index) =>
                                <>
                                    <div className={"row justify-content-center"}>
                                        <div className={"col-8"}>
                                    <span className="mr-3"
                                          style={tableStyles.majorFont}>Order with code <span
                                        className="font-weight-bold">( {`${data.code}`} )</span><span
                                        style={tableStyles.majorFont}> To be delivered at </span>  <span
                                        className="font-weight-bold">{`${data.delivery_zone.zone}`}</span></span>
                                        </div>
                                        <div className={"col-3"}>
                                    <span
                                        className={"badge badge-pill  px-4 py-2 my-2 mx-2 " + (data.status === "PAYING" ? "badge-info" : data.status === "INITIATED" ? "badge-primary" : "")}>
                                        {data.status}
                                    </span>
                                        </div>
                                        <div className={"col-1"}>
                                            <button className={"btn"} onClick={() => {
                                                handleContinueProcess(data, data.status);
                                            }}><ContinueIcon/></button>
                                        </div>
                                        <div className={"col-12"}>
                                            <span
                                                className={"font-weight-lighter font-italic"}
                                                style={{fontSize: "0.8em"}}>{dateFormat(data.createdAt).fromNow() + " - " + dateFormat(data.createdAt).onlyDate()}</span>
                                        </div>
                                        <div className={"col-12"}>
                                            <hr/>
                                        </div>
                                    </div>
                                    <div className={"row"}>
                                    </div>
                                </>)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

const tableStyles = {
    head: {
        borderTop: "none"
    },
    td: {
        fontSize: "0.85em"
    },
    majorFont: {
        fontSize: "0.95em",
        color: "#707070"
    },
    orderTd: {
        fontSize: "0.9em"
    }
}

export default Container;


