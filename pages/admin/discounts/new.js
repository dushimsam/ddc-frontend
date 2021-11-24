import React, {useEffect, useState} from 'react';
import DiscountService from "../../../services/discount/DiscountService"
import SingleSubModuleLayout from "../../../layouts/admin-layouts/SingleSubModule";
import {isThisFormValid} from "../../../utils/functions";
import {useRouter} from "next/router";
import ShipmentService from "../../../services/shipments/shipment.service";
import VehicleTypeService from "../../../services/cars/vehicle-types";
import {alertFailer, alertSuccess} from "../../../utils/alerts";
import {ALERT_EXPIRATION_PERIOD} from "../../../utils/constants";
import {hide_modal_alert} from "../../../utils/modal-funs";
import FormLayout from "../../../layouts/form-layout";
import SelectControl from "../../../components/reusable/SelectControl";
import InputControl, {InputTextArea} from "../../../components/reusable/InputControl";
import CustomerService from "../../../services/customers/customer.service"
import Select from "react-select";
import {mainCustomStyles} from "../../../components/reusable/select-elements";
import {carFeatures} from "../../../utils/global-options/car-features";
import makeAnimated from 'react-select/animated';
import give_range from "../../../utils/range";

const animatedComponents = makeAnimated();

export const FormContent = ({setValues, values, getActiveCustomers, status, setIsFormValid, customers}) => {


    const discount_scopes = [{name: "ALL CUSTOMERS", value: "GENERAL"}, {
        name: "SPECIFIC CUSTOMERS",
        value: "CUSTOMER_BASED"
    }];
    const discount_types = [{name: "BOTH", value: "BOTH"}, {
        name: "CAR_ORDER",
        value: "CAR_ORDER_BASED"
    }, {name: "PART_ORDER", value: "PART_ORDER_BASED"}];

    const duration_types = [
        'SECONDS',
        'MINUTES',
        'HOURS',
        'DAYS',
        'WEEKS',
        'MONTHS',
        'YEARS'];

    const [valid, setValid] = useState({
        discount_scope: true,
        discount_type: true,
        usage_count: !!status,
        duration_type: true,
        duration: !!status,
        discount: !!status,
        reason: !!status
    });

    useEffect(() => {
        setIsFormValid(isThisFormValid(valid))
    }, [valid])

    const handleChangeV2 = (prop) => ({value, valid: validProp}) => {

        if (prop === "discount_scope" && value === "CUSTOMER_BASED") {
            getActiveCustomers();
        }
        if (['usage_count', 'duration'].includes(prop)) {
            setValues({...values, [prop]: parseInt(value)});
            setValid(state => ({...state, [prop]: validProp}))
        } else if (['discount'].includes(prop)) {
            setValues({...values, [prop]: parseFloat(value)});
            setValid(state => ({...state, [prop]: validProp}))
        } else {
            setValues({...values, [prop]: value});
            setValid(state => ({...state, [prop]: validProp}))
        }
    };

    useEffect(() => {
        console.log("values ", values)
    }, [values])

    useEffect(() => {
        console.log("valid ", valid)
    }, [valid])
    const handleCustomSelectChange = (prop) => async (option) => {
        if (prop === "CUSTOMERS")
            setValues({...values, customers: option});
    }
    return (
        <React.Fragment>
            <div className="form-row justify-content-md-between justify-content-center">
                <div className="form-group col-5">
                    <SelectControl className="form-control" label="Scope" value={values.discount_scope}
                                   validations="required"
                                   handleChangeV2={handleChangeV2("discount_scope")}>
                        <option value={""}>Select scope</option>
                        {discount_scopes.map(scope => <option value={scope.value}>{scope.name}</option>)}
                    </SelectControl>
                </div>
                {values.discount_scope === "CUSTOMER_BASED" ?
                    <div className="form-group col-12 my-2">
                        <label>Select Customers</label>
                        <Select
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            styles={mainCustomStyles}
                            onChange={handleCustomSelectChange("CUSTOMERS")}
                            value={values.customers}
                            isMulti
                            options={customers}
                        />
                    </div> : <></>
                }

                <div className="form-group col-5">
                    <SelectControl className="form-control" label="Applicable TO" value={values.discount_type}
                                   validations="required" handleChangeV2={handleChangeV2("discount_type")}>
                        <option value={""}>Select type</option>
                        {discount_types.map(type => <option value={type.value}>{type.name}</option>)}
                    </SelectControl>
                </div>
                <div className="form-group col-5">
                    <SelectControl className="form-control" label="Duration Type" value={values.duration_type}
                                   validations="required" handleChangeV2={handleChangeV2("duration_type")}>
                        <option value={""}>Select Duration type</option>
                        {duration_types.map(type => <option value={type}>{type}</option>)}
                    </SelectControl>
                </div>
                <div className="form-group col-md-5 col-10">
                    <InputControl label="Duration" type="number"
                                  validations="required|integer|min:1"
                                  className="form-control" placeholder="eg: 2"
                                  handleChangeV2={handleChangeV2("duration")}
                                  value={values.duration}/>
                </div>
                <div className="form-group col-md-5 col-10">
                    <InputControl label="Usage count per customer" type="number"
                                  validations="required|integer|min:1"
                                  className="form-control" placeholder="eg: 1"
                                  handleChangeV2={handleChangeV2("usage_count")}
                                  value={values.usage_count}/>
                </div>
                <div className="form-group col-md-5 col-10">
                    <InputControl label={"Discount rate in %"} handleChangeV2={handleChangeV2("discount")}
                                  value={values.discount} type="number" validations="required|regex:/^-?\d*(\.\d+)?$/"
                                  step="0.01"
                                  placeholder={"eg: enter 0.10 to refer 10%"}/>
                </div>

                <div className="form-group col-md-5 col-10">
                    <InputTextArea handleChangeV2={handleChangeV2("reason")}
                                   value={values.reason}
                                   label="Reason for discount" type="text"
                                   validations="required|string|min:6"/>
                </div>

                <div className="form-group col-md-5 col-10">
                    <InputTextArea handleChangeV2={handleChangeV2("message")}
                                   value={values.message}
                                   label="Message to the customers" type="text"
                                   validations="required|string|min:6"/>
                </div>
            </div>
        </React.Fragment>
    )
}


const Content = ({totals, setTotals}) => {
    const [alert, setAlert] = useState({message: "", class: "", show: false})
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

    const [isFormValid, setIsFormValid] = useState(false)

    const router = useRouter();
    const [loading, setLoading] = useState(false);

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
    const Create = async () => {
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
                            const res = await DiscountService.create(new_values);
                        } catch (e) {
                            alertFailer(setAlert, e.response ? e.response.data.message : e.message || "Error occurred. Try again latter.");
                        }
                    }
                } else {
                    const res = await DiscountService.create(new_values);
                }

                alertSuccess(setAlert, "Discount is set");
                window.setTimeout(() => {
                    router.push("/admin/discounts");
                }, 3000)
            }

        } catch (e) {
            alertFailer(setAlert, e.response ? e.response.data.message : e.message || "Error occurred. Try again latter.");
        } finally {
            hide_modal_alert(setAlert);
            setLoading(false)
        }
    }
    return (
        <FormLayout Content={<FormContent setIsFormValid={setIsFormValid} customers={customers}
                                          getActiveCustomers={getActiveCustomers} setValues={setValues}
                                          values={values}/>}
                    alert={alert} title={"New Order Discount"} setAlert={setAlert} btnTxt="Create"
                    disable={isFormValid}
                    callFun={Create} loading={loading} setLoading={setLoading}/>

    );
}


const Page = () => {
    const [total, setTotal] = useState(0);

    useEffect(() => {
        DiscountService.getPaginated().then(res => {
            setTotal(res.data.totalDocs);
        })
    }, [])

    return (
        <SingleSubModuleLayout name={"Order Discounts"} route={"/admin/discounts"} count={total}
                               Content={<Content total={total} setTotal={setTotal}/>}/>
    )
}

export default Page;