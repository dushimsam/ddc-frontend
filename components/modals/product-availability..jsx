import styles from "../../styles/components/deleteConfirm.module.css";
import Alert from "../alert";
import React, {useEffect, useState} from "react";
import Datetime from "react-datetime";
import moment from "moment";
import InputControl, {InputTextArea} from "../reusable/InputControl";
import {isThisFormValid} from "../../utils/functions";
import ProductModelsService from "../../services/product-models/product-models.service";
import {alertFailer, alertSuccess} from "../../utils/alerts";
import {hide_current_modal, hide_modal_alert} from "../../utils/modal-funs";
import PartAvailabilityService from "../../services/products/PartAvailabilityService";
import globalStyles from "../../styles/global-colors.module.css"
import {ALERT_EXPIRATION_PERIOD} from "../../utils/constants";

export const ProductAvailability = ({item, getAllItems}) => {
    const [values, setValues] = useState({
        deadline: "",
        reminder_paragraph: "",
        quantities: 1
    })
    const [isFormValid, setIsFormValid] = useState(false)
    const [loading, setLoading] = useState(false);

    const [alert, setAlert] = useState({message: "", class: "", show: false});
    const [status, setStatus] = useState("CREATE")

    const handleChange = (prop, value) => {
        if (prop === "deadline") {
            setValues({...values, [prop]: new Date(value)});
            setValid(state => ({...state, [prop]: true}))
        }
    };


    const [valid, setValid] = useState({
        deadline: false,
        reminder_paragraph: false,
        quantities: false
    });

    const handleChangeV2 = (prop) => ({value, valid: validProp}) => {
        setValues({...values, [prop]: value});
        setValid(state => ({...state, [prop]: validProp}))
    };

    useEffect(() => {
        setIsFormValid(isThisFormValid(valid))
    }, [valid])

    const [existing, setExisting] = useState({});

    useEffect(() => {


        PartAvailabilityService.getAllByPartActive(item._id)
            .then((res) => {

                if (res.data.exists) {
                    setValues({
                        deadline: res.data.object.deadline,
                        reminder_paragraph: res.data.object.reminder_paragraph,
                        quantities: res.data.object.quantities
                    })
                    setExisting(res.data.object)
                    setValid(
                        {
                            deadline: true,
                            reminder_paragraph: true,
                            quantities: true
                        }
                    )
                    setStatus("UPDATE")
                } else {
                    setValues({
                        deadline: "",
                        reminder_paragraph: "",
                        quantities: 1
                    })

                    setValid({
                        deadline: false,
                        reminder_paragraph: false,
                        quantities: false
                    })
                }
            }).catch(e => console.log(e))
    }, [item])

    const create = async () => {
        let new_values = {...values}
        new_values.part_on_market = item._id;
        new_values.quantities = parseInt(new_values.quantities);

        const diffTime = new Date(new_values.deadline) - new Date();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) {
            alertFailer(setAlert, "Deadline should be today or later");
            hide_modal_alert(setAlert)
        } else {
            try {
                setLoading(true)
                if (status === "CREATE") {
                    await PartAvailabilityService.create(new_values);
                    alertSuccess(setAlert, "Availability is set");
                    setStatus("UPDATE");
                } else {
                    await PartAvailabilityService.update(existing._id, new_values);
                    alertSuccess(setAlert, "Availability is updated");
                }
                getAllItems();
                hide_current_modal(setAlert, "#setPartAvailabilityModal");
            } catch (e) {
                alertFailer(setAlert, e.response ? e.response.data.message : e.message || "Error occurred. Try again latter.");
            } finally {
                setLoading(false);
            }

        }

    };

    return (
        <div id="setPartAvailabilityModal" className={"modal fade border-dark "}>
            <div className={"modal-dialog modal-dialog-centered"}>
                <div className={"modal-content " + styles.modalContent}>
                    <div className="modal-header">
                        <h5 className="modal-title text-dark">{item.part_in_stock.spare_part.name + " ( " + item.part_in_stock.spare_part.part_number + " )"}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div className={"modal-body text-dark"}>
                        {alert.show ? <Alert className={"my-3 alert-" + alert.class} message={alert.message}
                                             setAlert={setAlert}/> : null}
                        <div className={"container"}>
                            <div className={"row justify-content-center"}>
                                <div className={"col-8"}>
                                    <label className={"font-weight-bolder"}>Available Date</label>
                                    <Datetime dateFormat="MMMM Do YYYY" value={new Date(values.deadline)}
                                              onChange={(date) => handleChange("deadline", date._d)}/>
                                </div>
                                <div className={"col-8 font-weight-bolder pt-5"}>
                                    <InputControl label="Quantities to be available" type="number"
                                                  validations="required|integer|min:1"
                                                  className="form-control" placeholder="Quantity"
                                                  handleChangeV2={handleChangeV2("quantities")}
                                                  value={values.quantities}/>
                                </div>
                                <div className={"col-8 pt-5 font-weight-bolder"}>
                                    <InputTextArea handleChangeV2={handleChangeV2("reminder_paragraph")}
                                                   value={values.reminder_paragraph}
                                                   label="Write a paragraph reminder" type="text"
                                                   validations="required|string|min:3"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button"
                                disabled={!isFormValid}
                                className={"btn text-white  " + globalStyles.globalBackColor}
                                onClick={() => create()}>{loading ? (
                            <img
                                src={"/img/loader.gif"}
                                alt={"Loading"}
                                className={"loader"}
                            />
                        ) : (
                            "SAVE CHANGES"
                        )}
                        </button>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}