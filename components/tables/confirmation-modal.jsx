import React, {useEffect, useState} from 'react'
import styles from '../../styles/components/deleteConfirm.module.css';
import {hide_modal} from "../../utils/modal-funs";
import {isThisFormValid} from "../../utils/functions";
import InputControl from "../reusable/InputControl";
import {alertFailer, notifyError, notifySuccess} from "../../utils/alerts";
import $ from "jquery";
import ShipmentService from "../../services/shipments/shipment.service"
import Alert from "../alert";
import LoginToConfirmComponent from "../reusable/login-to-confim";
import {system_users} from "../../utils/constants";
import UploadDragAndDrop from "../reusable/upload-drag-drop";


const ConfirmAuth = ({handleToggle, continueAction}) => {
    return (
        <div className={"col-sm-12 col-12"}><LoginToConfirmComponent SYSTEM_USER={system_users.ADMIN}
                                                                     continueAction={continueAction}
                                                                     MESSAGE={"LOGIN TO CONFIRM THE AUTHORITY OF THIS ACTION"}
                                                                     handleCancel={handleToggle}/></div>
    )
}
export const ConfirmBookingModal = ({
                                        message,
                                        btnColor,
                                        alert,
                                        booking,
                                        getInitialData
                                    }) => {

    const [values, setValues] = useState({payment_deadline: ""})
    const [valid, setValid] = useState({payment_deadline: false});
    const [shipment_amount, setShipmentAmount] = useState(0)
    const [otherAlert, setAlert] = useState({message: "", class: "", show: false})
    const [loading, setLoading] = useState({success: false, failed: false})
    const [isFormValid, setIsFormValid] = useState(false)

    useEffect(() => {
        setIsFormValid(isThisFormValid(valid))
    }, [valid])


    const handleChangeV2 = (prop) => ({value, valid: validProp}) => {
        setValues({...values, [prop]: value});
        setValid(state => ({...state, [prop]: validProp}))
    };


    useEffect(() => {
        if (booking) {
            ShipmentService.getPortPricingByPortCountryVehicle(booking.delivery_port._id, booking.car_on_market.supplied_car.country_origin._id, booking.car_on_market.supplied_car.vehicle_type._id)
                .then((res) => {
                    console.log("shipping price", res.data);
                    console.log("Shipping price ", res.data.delivery_price);
                    setShipmentAmount(res.data.delivery_price);
                }).catch(e => {
                alertFailer(setAlert, e.response ? e.response.data.message : e.message || "Error occurred. Try again latter.")
            });
        }
    }, [booking])

    const markAsSuccess = async () => {
        const order_values = {
            "booking": booking._id,
            "payment_deadline": values.payment_deadline,
            "product_price": booking.car_on_market.selling_price,
            "shipping_amount": shipment_amount,
            "amount_to_pay": booking.car_on_market.selling_price + shipment_amount
        }
        // OrderService.createOrder(order_values)
        //     .then((res2) => {
        //         notifySuccess("Successfully marked as Available");
        //         getInitialData();
        //     }).catch((e) => {
        //     notifyError(e.message || "Error occurred. Try again latter.");
        // }).finally(() => {
        //     setLoading({...loading, success: false});
        //     $(function () {
        //         $('#confirmationBookingModal').modal('hide');
        //     });
        // })
    }


    const markAsFailed = async () => {
        OrderService.changeOrderStatus(booking._id, "FAILED")
            .then((res2) => {
                notifySuccess("Successfully marked as Failed");
                getInitialData();
            }).catch((e) => {
            notifyError(e.message || "Error occurred. Try again latter.");
        }).finally(() => {
            setLoading({...loading, failed: false});
            $(function () {
                $('#confirmationBookingModal').modal('hide');
            });
        })
    }

    const [ACTION, setAction] = useState(null);
    const [show_login, setShowLogin] = useState(false);

    const handleMakeAction = () => {
        if (ACTION === "FAILED") {
            markAsFailed();
        } else if (ACTION === "SUCCESS") {
            markAsSuccess();
        }
    }

    const handleToGoggleShowLogin = () => {
        setShowLogin(!show_login);
    }
    return (
        <div id="confirmationBookingModal" className={"modal fade border-dark "}>
            <div className={"modal-dialog modal-dialog-centered modal-lg "}>
                <div className={"modal-content " + styles.modalContent}>
                    {alert.show ? <Alert className={"my-3 alert-" + otherAlert.class} message={otherAlert.message}
                                         setAlert={setAlert}/> : null}
                    <div className={"modal-body " + styles.modalBody}>
                        <div className={"container"}>
                            <div className={"row justify-content-center"}>
                                <div className={"col-8"}>
                                    <span className={"font-weight-bold h5"}>{message}</span> <br/>
                                    {
                                        alert &&
                                        <span className={"text-danger font-weight-bold font-italic"}>{alert}</span>
                                    }
                                </div>
                                <div className={"col-8 mt-2"}>
                                    {
                                        !show_login ?
                                            <InputControl handleChangeV2={handleChangeV2("payment_deadline")}
                                                          label="Deadline in  number of days from Now"
                                                          value={values.payment_deadline}
                                                          type="number" validations="required|integer|min:1"/> :
                                            <ConfirmAuth continueAction={handleMakeAction}
                                                         handleToggle={handleToGoggleShowLogin}/>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    {
                        !show_login ?
                            <div className={"modal-footer justify-content-center " + styles.modalFooter}>
                                <button type="button"
                                        className={"btn btn-secondary " + styles.btnSecondary + " " + styles.btn}
                                        onClick={() => {
                                            hide_modal("#confirmationBookingModal");
                                        }}>Cancel
                                </button>
                                <button type="button"
                                        className={"btn mt-2 text-white " + styles.btn}
                                        style={{background: "#ef3f2c"}}
                                        onClick={() => {
                                            handleToGoggleShowLogin();
                                            setAction("FAILED");
                                            // setLoading({...loading, failed: true});
                                        }}>
                                    {loading.failed ? (
                                        <img
                                            src={"/img/loader.gif"}
                                            alt={"Loading"}
                                            className={"loader"}
                                        />
                                    ) : "BOOK REQUEST FAILED"}
                                </button>

                                <button type="button"
                                        className={"btn mt-2 " + styles.btnSuccess + " " + styles.btn + " " + btnColor}
                                        disabled={!isFormValid}
                                        onClick={() => {
                                            handleToGoggleShowLogin();
                                            setAction("SUCCESS");
                                            // setLoading({...loading, success: true});
                                        }}>
                                    {loading.success ? (
                                        <img
                                            src={"/img/loader.gif"}
                                            alt={"Loading"}
                                            className={"loader"}
                                        />
                                    ) : "BOOK REQUEST SUCCEEDED"}
                                </button>
                            </div> : <></>}
                </div>
            </div>
        </div>
    )
}


const ConfirmationModal = ({
                               continueAction,
                               loading,
                               setLoading,
                               message,
                               btnColor,
                               alert,
                               setFiles,
                               includeReceipt
                           }) => {
    return (
        <div id="confirmationModal" className={"modal fade border-dark "}>
            <div className={"modal-dialog modal-dialog-centered " + styles.modalConfirm}>
                <div className={"modal-content " + styles.modalContent}>

                    <div className={"modal-body " + styles.modalBody}>
                        <div className={"container"}>
                            <div className={"row"}>
                                <div className={"col-12"}>
                                    <span className={"font-weight-bold h5"}>{message}</span> <br/>
                                    {
                                        alert &&
                                        <span className={"text-danger font-weight-bold font-italic"}>{alert}</span>
                                    }
                                </div>
                                {
                                    includeReceipt ?
                                        <div className={"col-md-10 col-12"}>
                                            <UploadDragAndDrop setFiles={setFiles}/>
                                        </div> : <></>
                                }
                            </div>
                        </div>
                    </div>
                    <div className={"modal-footer justify-content-center " + styles.modalFooter}>
                        <button type="button" className={"btn btn-secondary " + styles.btnSecondary + " " + styles.btn}
                                onClick={() => {
                                    hide_modal("#confirmationModal");
                                    continueAction(false);
                                }}>Cancel
                        </button>
                        <button type="button" className={"btn " + styles.btnSuccess + " " + styles.btn + " " + btnColor}
                                onClick={() => {
                                    continueAction(true);
                                    setLoading(true)
                                }}>
                            {loading ? (
                                <img
                                    src={"/img/loader.gif"}
                                    alt={"Loading"}
                                    className={"loader"}
                                />
                            ) : "Yes"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ConfirmationModal;


