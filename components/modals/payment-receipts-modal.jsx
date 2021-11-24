import LoginToConfirmComponent from "../reusable/login-to-confim";
import {system_users} from "../../utils/constants";
import React, {useEffect, useState} from "react";
import {isThisFormValid} from "../../utils/functions";
import ShipmentService from "../../services/shipments/shipment.service";
import {alertFailer, notifyError, notifySuccess} from "../../utils/alerts";
import OrderService from "../../services/cars/cars-order-purchase-service";
import $ from "jquery";
import BookingService from "../../services/cars/booking-service";
import styles from "../../styles/components/deleteConfirm.module.css";
import Alert from "../alert";
import InputControl from "../reusable/InputControl";
import {hide_modal} from "../../utils/modal-funs";
import {useRouter} from "next/router";
import PaymentService from "../../services/cars/car-payment-service"

const ConfirmAuth = ({handleToggle, continueAction}) => {
    return (
        <div className={"col-sm-12 col-12"}><LoginToConfirmComponent SYSTEM_USER={system_users.ADMIN}
                                                                     continueAction={continueAction}
                                                                     MESSAGE={"LOGIN TO CONFIRM THE AUTHORITY OF THIS ACTION"}
                                                                     handleCancel={handleToggle}/></div>
    )
}

export const ConfirmPaymentReceiptModal = ({
                                               documents,
                                               message,
                                               btnColor,
                                               alert,
                                               payment,
                                               getInitialData
                                           }) => {

    const [valid, setValid] = useState({payment_deadline: false});
    const [otherAlert, setAlert] = useState({message: "", class: "", show: false})
    const [loading, setLoading] = useState({success: false, failed: false})
    const [isFormValid, setIsFormValid] = useState(false)

    useEffect(() => {
        setIsFormValid(isThisFormValid(valid))
    }, [valid])


    const markValidity = () => {
        PaymentService.toggleValidity(payment._id, ACTION)
            .then((res2) => {
                if (res2.data.status === "VALID") {
                    notifySuccess("Successfully marked as Valid");
                } else if (res2.data.status === "INVALID") {
                    notifySuccess("Successfully marked as Invalid");
                }
                getInitialData();
            }).catch((e) => {
            notifyError(e.message || "Error occurred. Try again latter.");
        }).finally(() => {
            setLoading({...loading, failed: false});
            $(function () {
                $('#confirmationPaymentReceiptModal').modal('hide');
            });
        })
    }

    const [ACTION, setAction] = useState(null);
    const [show_login, setShowLogin] = useState(false);

    const handleMakeAction = () => {
        markValidity();
    }

    const handleToGoggleShowLogin = () => {
        setShowLogin(!show_login);
    }
    const router = useRouter();

    return (
        <div id="confirmationPaymentReceiptModal" className={"modal fade border-dark "}>
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
                                            documents.map((item, index) =>
                                                <div>
                                                    <button
                                                        className={"btn btn-outline-dark btn-sm mt-2"}
                                                        onClick={() => router.push(item)}> VIEW
                                                        DOCUMENT {index + 1}
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                             width="24" height="24">
                                                            <path fill="none" d="M0 0h24v24H0z"/>
                                                            <path
                                                                d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 9H8v2h4v3l4-4-4-4v3z"
                                                                fill="rgba(231,76,60,1)"/>
                                                        </svg>
                                                    </button>
                                                </div>)
                                            :
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
                                            hide_modal("#confirmationPaymentReceiptModal");
                                        }}>Cancel
                                </button>
                                <button type="button"
                                        className={"btn mt-2 text-white " + styles.btn}
                                        style={{background: "#ef3f2c"}}
                                        disabled={payment.status !== "PENDING"}
                                        onClick={() => {
                                            handleToGoggleShowLogin();
                                            setAction("INVALID");
                                        }}>
                                    {loading.failed ? (
                                        <img
                                            src={"/img/loader.gif"}
                                            alt={"Loading"}
                                            className={"loader"}
                                        />
                                    ) : "RECEIPT INVALID"}
                                </button>

                                <button type="button"
                                        className={"btn mt-2 " + styles.btnSuccess + " " + styles.btn + " " + btnColor}
                                        disabled={payment.status !== "PENDING"}
                                        onClick={() => {
                                            handleToGoggleShowLogin();
                                            setAction("VALID");
                                        }}>
                                    {loading.success ? (
                                        <img
                                            src={"/img/loader.gif"}
                                            alt={"Loading"}
                                            className={"loader"}
                                        />
                                    ) : "RECEIPT VALID"}
                                </button>
                            </div> : <></>}
                </div>
            </div>
        </div>
    )
}

