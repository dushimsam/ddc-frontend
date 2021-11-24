import React, {useEffect, useState} from 'react';
import ShipmentService from '../../services/shipments/shipment.service';
import RecordDetails from "../../components/record-details/record-details"
import {processDetailedDate} from "../../utils/process-date"
import {notifyError, notifySuccess} from "../../utils/alerts"
import Snack from "../../components/reusable/snackbar"
import {hide_modal} from "../../utils/modal-funs";
import {ALERT_EXPIRATION_PERIOD} from "../../utils/constants";
import {UserContainer} from "./dialogs/supply-order-dialog";
import {currencyMapping, defaultCurrencyMapping, rwandanCurrency} from "../../utils/currency-converter";


const ModalContent = ({orderFields, order, UserObj}) => {


    const [fields, setFields] = useState(null);

    const handleSetShipper = (item) => {

        setFields([
            {name: "First Name", value: item.user.firstName},
            {name: "Last Name", value: item.user.lastName},
            {name: "Phone Number", value: item.user.phone},
            {name: "Email", value: item.user.email},
            {name: "Gender", value: item.user.gender != null ? item.user.gender : " UNKNOWN "},
            {name: "Username", value: item.user.username},
            {name: "Registered At ", value: processDetailedDate(item.createdAt)}
        ]);
        document.getElementById("modalShowBtn").click()

    }


    return (
        <div className="bg-white rounded border p-3 mt-2 mb-3">
            <h6 className="font-weight-bold text-dark" style={{fontSize: "0.95em"}}>Order Shipment Details</h6>
            <div className="container">
                <div className="row pt-2 pl-2">

                    <div className="col-6">
                        {orderFields.map((field, index) => {
                            return (
                                <div className="col-8 pt-2">
                                    <span className="font-weight-bold">{field.name}: </span><span
                                    className="font-weight-light">{field.value}</span>
                                </div>)
                        })
                        }
                    </div>
                    <div className="col-6">
                        {UserObj && <UserContainer userTitle={"PRODUCT SHIPPER"} UserObj={UserObj}/>}
                    </div>
                </div>
            </div>

            {fields && <RecordDetails title={fields[0].value} fields={fields} only="data"/>}
            <button id="modalShowBtn" className="d-none" data-toggle="modal" data-target="#itemReadMoreModal">Large
                modal
            </button>
        </div>
    );
};


const OrderShipmentModal = ({order, getInitialData}) => {

    const [shipments, setShipments] = useState([]);
    const [orderFields, setOrderFields] = useState([])
    const [ShipperObj, setShipperObj] = useState(null);

    useEffect(() => {

        ShipmentService.getOrderShipment(order._id)
            .then((res) => {
                const result = res.data[0];
                setShipperObj(result.shipper.user);
                setOrderFields(
                    [
                        {name: "Shipment Initiated At", value: processDetailedDate(result.createdAt)},
                        {name: "Delivery Zone", value: order.delivery_zone.zone},
                        {name: "Delivery Country", value: order.delivery_zone.region.country.country},
                        {name: "Region", value: order.delivery_zone.region.region},
                        {
                            name: "Delivery Price",
                            value: defaultCurrencyMapping(order.delivery_zone.delivery_price)
                        }
                    ])
            }).catch(e => console.log(e))


    }, [order])

    return (
        <div className="modal fade" id="orderShipmentReadMore" tabIndex="-1" role="dialog"
             aria-labelledby="exampleModalLabel"
             aria-hidden="false">
            <Snack/>
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div className="modal-content">
                    <div class="modal-header">
                        <span> SHIPMENT INFO ABOUT THE ORDER </span> <span class="modal-title ml-3 font-weight-bold"
                                                                           id="exampleModalLabel"> {`# ${order.code} `} </span><span></span>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body  rounded">
                        {
                            order.status != "PAID" ?
                                <ModalContent orderFields={orderFields} order={order} UserObj={ShipperObj}/> : ""
                        }{
                        order.status != "DELIVERED" && order.status != "FAILED" ?
                            <Shippers order={order} getInitialData={getInitialData}/> : ""
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}


const Shippers = ({order, getInitialData}) => {
    const [loading, setLoading] = useState(false)
    const [shippersOnWork, setShippersOnWork] = useState(null)
    const [freeShippers, setFreeShippers] = useState([])

    // const [shippersIds, setShipperIds] = useState([])


    function filter_free_shippers(data) {
        return function (shipper) {
            return !data.some(shipperOnWork => shipperOnWork.shipper._id === shipper._id)
        }
    }

    function filter_working_shippers(data) {
        return function (shipper) {
            return data.some(shipperOnWork => shipperOnWork.shipper._id === shipper._id)
        }
    }


    useEffect(() => {
        ShipmentService.getStatusedShipments("PENDING")
            .then((res) => {
                ShipmentService.getAllShippers()
                    .then((res2) => {
                        setFreeShippers(res2.data.filter(filter_free_shippers(res.data)))
                        setShippersOnWork(res2.data.filter(filter_working_shippers(res.data)))
                    }).catch(e => console.log(e))
            }).catch(e => console.log(e))

    }, [])

    const [filter, setFilter] = useState(freeShippers.length > 0 ? "FREE" : "ALL")

    const [alert, setAlert] = useState({message: "", class: "", status: "", show: false})


    return (
        <div className="card py-4 px-5">
            {order.status === "PAID" ?
                <React.Fragment>
                    <div className="title d-flex justify-content-between">
                        <h6 className={"font-weight-bold"}>ASSIGN SHIPMENT</h6>
                        <div>
                            <span className="pr-5">Filter by</span>
                            <span className="badge badge-primary cursor-pointer  p-1 px-2 font-weight-light mr-2"
                                  onClick={() => setFilter("ALL")}>All</span>
                            <span className="badge badge-info cursor-pointer  p-1 px-2 font-weight-light mr-2"
                                  onClick={() => setFilter("FREE")}>Free</span>
                            <span className="badge badge-warning cursor-pointer  p-1 px-2 font-weight-light mr-2"
                                  onClick={() => setFilter("BUSY")}>Busy</span>
                        </div>
                    </div>
                    <table className="table mt-5" style={{fontSize: "0.85em"}}>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Names</th>
                            <th>Phone</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filter == "ALL" || filter == "FREE" ?
                            freeShippers.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{`${item.user.firstName} ${item.user.lastName}`}</td>
                                    <td>{`${item.user.phone}`}</td>
                                    <td>
                                        <AssignShipment item={item} getInitialData={getInitialData} order={order}
                                                        status={"FREE"}/>
                                    </td>
                                </tr>
                            )) : null
                        }

                        {filter == "ALL" || filter == "BUSY" ?
                            shippersOnWork && shippersOnWork.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{`${item.user.firstName} ${item.user.lastName}`}</td>
                                    <td>{`${item.user.phone}`}</td>
                                    <td>
                                        <AssignShipment item={item} getInitialData={getInitialData} order={order}
                                                        status={"BUSY"}/>
                                    </td>
                                </tr>
                            )) : null
                        }
                        </tbody>
                    </table>
                </React.Fragment>
                : ""}
        </div>
    )
}


const AssignShipment = ({item, getInitialData, order, status}) => {
    const [loading, setLoading] = useState(false);

    const [local_status, setLocalStatus] = useState("")

    useEffect(() => {
        setLocalStatus(status);
    }, [status])

    const assignOrder = () => {
        let value = {
            "shipper": item._id,
            "order": order._id
        }
        ShipmentService.create(value)
            .then((res2) => {
                notifySuccess(`Order is assigned to ${item.user.firstName} Successfully`);
                window.setTimeout(() => {
                    hide_modal('#orderShipmentReadMore')
                }, ALERT_EXPIRATION_PERIOD)
            }).catch(e => {
            notifyError(e.response ? e.response.data.message : e.message || "Error occurred. Try again latter.")
        }).finally(() => {
            setLoading(false);
            getInitialData();
        })
    }
    return (
        <button className={"btn  btn-sm  " + local_status === "BUSY" ? " btn-warning " : " btn-info "}
                style={ButtonStyles.button}
                onClick={() => {
                    setLoading(true);
                    assignOrder();
                }}>{loading ? (
            <img
                src={"/img/loader.gif"}
                alt={"Loading"}
                className={"loader"}
            />
        ) : (
            "   Assign Shipment"
        )}
        </button>
    )
}
const ButtonStyles = {
    button: {
        marginRight: '10px',
        border: 'none',
        fontSize: '0.8em',
        color: 'white',
        padding: '2px 5px',
        textTransform: 'uppercase',
        borderRadius: '4px'
    },

    button2: {
        marginRight: '10px',
        border: 'none',
        fontSize: '10px',
        color: '#535353c7',
        padding: '4px 10px',
        textTransform: 'uppercase',
    }


}

export default OrderShipmentModal;
