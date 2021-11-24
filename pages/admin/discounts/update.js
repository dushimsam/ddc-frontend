import {useEffect, useState} from "react";
import ShipmentService from "../../../services/shipments/shipment.service";
import UpdateFormLayout from "../../../layouts/table-layouts/update-form-layout"
import FormLayout from "../../../layouts/form-layout"
import {alertFailer, alertSuccess} from "../../../utils/alerts"
import {FormContent} from "./new"
import {hide_current_modal, hide_modal_alert} from "../../../utils/modal-funs";
import DiscountService from "../../../services/discount/DiscountService"
import {updateJavaScriptObject} from "../../../utils/functions";
import CustomerService from "../../../services/customers/customer.service";


const Content = ({item, getInitialData}) => {
    const [alert, setAlert] = useState({message: "", class: "", status: "", show: false})
    const [isFormValid, setIsFormValid] = useState(false)
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({
        discount_scope: "GENERAL",
        discount_type: "BOTH",
        usage_count: null,
        duration_type: "DAYS",
        duration: null,
        discount: null,
        customers: [],
        message: "",
        reason: ""
    });


    const [customers, setCustomers] = useState([])

    const getActiveCustomers = async () => {
        try {
            const res = await CustomerService.getAllStatused("ACTIVE")
            for (let item of res.data) {
                setCustomers(old => [...old, {value: item._id, label: item.user.firstName + " " + item.user.lastName}])
            }
        } catch (e) {
            alertFailer(setAlert, e.response ? e.response.data.message : e.message || "Error occurred. Try again latter.");
        }

    }

    useEffect(() => {
        DiscountService.get(item._id)
            .then(async (res) => {
                let temp_values = {...values}
                temp_values = updateJavaScriptObject(temp_values, res.data)
                delete temp_values.customer;
                temp_values.customers = [{
                    value: item._id,
                    label: res.data.customer.user.firstName + " " + res.data.customer.user.lastName
                }];
                setValues(temp_values)
                if (res.data.discount_scope === "CUSTOMER_BASED")
                    await getActiveCustomers();
            }).catch(err => console.log(err))
    }, [item])


    const Update = async () => {
        try {
            let new_values = {...values};
            delete new_values.customers;

            if (values.discount > 0.8) {
                alertFailer("Discount shouldn't be greater than 0.8 boss , otherwise this can lead you into a big loss.");
            } else {
                if (values.discount_scope === "CUSTOMER_BASED") {

                    if (values.customers.length < 1) {
                        alertFailer(setAlert, "CUSTOMERS SHOULD SPECIFIED.")
                    }

                    for (const item of values.customers) {
                        new_values.customer = item.value;
                        try {
                            const res = await DiscountService.update(item._id, new_values);
                        } catch (e) {
                            alertFailer(setAlert, e.response ? e.response.data.message : e.message || "Error occurred. Try again latter.");
                        }
                    }
                } else {
                    const res = await DiscountService.update(item._id, new_values);
                }

                alertSuccess(setAlert, "Discount is set");
                getInitialData();
            }

        } catch (e) {
            alertFailer(setAlert, e.response ? e.response.data.message : e.message || "Error occurred. Try again latter.");
        } finally {
            hide_modal_alert(setAlert);
            setLoading(false)
        }
    };


    return (
        <div className="container-fluid p-3">
            <div className="row">
                <div className="col-10 align-self-center">
                    <FormLayout
                        Content={<FormContent setIsFormValid={setIsFormValid} setValues={setValues} values={values}
                                              getActiveCustomers={getActiveCustomers}
                                              customers={customers}
                                              status={"update"}/>} alert={alert}
                        title={"Update Discount "} setAlert={setAlert} btnTxt="Update" disable={isFormValid}
                        callFun={Update} loading={loading} setLoading={setLoading}/>
                </div>
            </div>
        </div>
    );
}


const Update = ({item, getInitialData}) => {
    return <UpdateFormLayout Content={<Content item={item} getInitialData={getInitialData}/>}
                             title={"CHANGE DISCOUNT DETAILS"}/>
}

export default Update