import React, {useEffect, useState} from "react";
import OrderService from "../../../../services/orders/orders"
import ShipmentService from '../../../../services/shipments/shipment.service';
import $ from "jquery";
import globalStyles from "../../../../styles/global-colors.module.css"
import {notifyError, notifySuccess} from "../../../../utils/alerts";
import Router from "next/router";
import {gotoPath} from "../../../../utils/functions";
import SelectEmployee from "../../select-shipper-pop";


const Container = () => {

    const [paidOrders, setPaidOrders] = useState([]);

    const getOrders = () => {
        OrderService.getOrdersStatus("PAID")
            .then((res) => {
                setPaidOrders(res.data);
            }).catch((e) => console.log(e))
    }
    useEffect(() => {
        getOrders()
    }, [])
    const [orderData, setOrderData] = useState(null)
    const [selectedOrder, setSelectedOrder] = useState(null);

    const readMore = (order) => {
        setSelectedOrder(order)
        OrderService.orderParts(order._id)
            .then((res) => {
                setOrderData(res.data);
            })
            .catch((e) => console.log(e));
        $(function () {
            $('#supplyOrderModalDialog').modal('show');
        });
    }


    const [shippers, setShippers] = useState([]);


    const selectShipper = () => {
        ShipmentService.getAllShippers("ACTIVE")
            .then((res) => {
                setShippers(res.data)
                $(function () {
                    $('#selectShipperDialog').modal('show');
                });
            }).catch((e) => console.log(e))
    }


    const [shipOrder, setShipOrder] = useState(null);

    const assignOrder = (shipper) => {

        let value = {
            "order": shipOrder._id,
            "shipper": shipper._id
        }
        ShipmentService.create(value)
            .then((res2) => {
                notifySuccess("Successfully assigned shipment to " + shipper.user.firstName)
                getOrders()
            }).catch(e => {
            notifyError(e.response ? e.response.data.message : e.message || "Error occurred. Try again latter.")
            // setLoading(false);
        })

    }


    const getEmployee = (emp) => {
        assignOrder(emp)
    }

    const handleChangeRoute = (item) => {
        Router.push(gotoPath("/shared/orders", item._id))
    }

    return (
        <div className="card">
            <div className="table-responsive col-12">
                <table className="table">
                    <thead>
                    <th scope="col" className="font-weight-bold h6" style={tableStyles.head}>Remaining orders</th>
                    <th style={tableStyles.head}/>
                    <th scope="col" className="font-weight-bold cursor-pointer" style={tableStyles.head}><span
                        className="text-primary">View all</span></th>
                    </thead>
                    <tbody>
                    {
                        paidOrders?.map((data, index) => {
                            return (
                                <tr key={data}>
                                    <td style={tableStyles.orderTd}><span
                                        className="text-dark mr-5 ml-2">{index + 1}</span><span className="mr-3"
                                                                                                style={tableStyles.majorFont}>Order with code <span
                                        className="font-weight-bold">( {`${data.code}`} )</span><span
                                        style={tableStyles.majorFont}> To be delivered at </span>  <span
                                        className="font-weight-bold">{`${data.delivery_zone.zone}`}</span></span></td>
                                    <td className="cursor-pointer" style={tableStyles.td}>
                                        <span onClick={() => {
                                            selectShipper();
                                            setShipOrder(data);
                                        }} className="text-danger mr-3"> Assign to someone</span></td>
                                    <td className="cursor-pointer" style={tableStyles.td}><a
                                        className={"text-decoration-none " + globalStyles.globalTextColor}
                                        onClick={() => handleChangeRoute(data)}>Read more</a></td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
                {paidOrders.length < 1 ? <div><h6>You don't have any order yet</h6></div> : <></>}

                <SelectEmployee setEmployee={getEmployee} employees={shippers}/>
                <button id="orderDetailsBtn" className="d-none" data-toggle="modal"
                        data-target="#orderDetailsModal">Large
                    modal
                </button>
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
        fontSize: "0.85em",
        color: "#707070"
    },
    orderTd: {
        fontSize: "0.85em"
    }
}

export default Container;


