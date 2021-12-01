import React, {useEffect, useState} from 'react';
import userService from "../../../services/users/user.service";
import {alertFailer, alertSuccess} from "../../../utils/alerts"
import FormLayout from "../../../layouts/form-layout"
import InputControl from "../../../components/reusable/InputControl"
import SingleSubModuleLayoutAdmin from "../../../layouts/admin-layouts/SingleSubModule";

import {useRouter} from 'next/router';
import {isThisFormValid} from "../../../utils/functions";
import {ALERT_EXPIRATION_PERIOD, supplierUserTypeId, system_users} from "../../../utils/constants";
import {useSelector} from "react-redux";
import SuppliersService from "../../../services/supplies/SupplierService";
import SupplyService from "../../../services/supplies/SupplyService";
import UserCategoryService from "../../../services/users/UserCategoryService"

export const FormContent = ({setIsFormValid, setValues, values, status}) => {


    const [valid, setValid] = useState({
        username: !!status,
        email: !!status,
        firstName: !!status,
        lastName: !!status,
        phone: !!status,
        password: !!status,
        extra: {address: !!status, supplier_type: !!status}

    });

    useEffect(() => {
        setIsFormValid(isThisFormValid(valid))
    }, [valid])

    const handleChangeV2 = (prop) => ({value, valid: validProp}) => {
        if (prop === "extra.address") {
            setValues({...values, extra: {...values.extra, address: value}});
            setValid(state => ({...state, extra: {...values.extra, address: validProp}}));
        } else if (prop === "extra.supplier_type") {
            setValues({...values, extra: {...values.extra, supplier_type: value}});
            setValid(state => ({...state, extra: {...values.extra, supplier_type: validProp}}));
        } else {
            setValues({...values, [prop]: value});
            setValid(state => ({...state, [prop]: validProp}))
        }
    };


    return (

        <div className="form-row justify-content-between">
            <div className="form-group col-6">
                <InputControl handleChangeV2={handleChangeV2("username")} label="Username" type="text"
                              validations="required|string|min:5"/>
            </div>
            <div className="form-group col-6">
                <InputControl handleChangeV2={handleChangeV2("firstName")} label="First Name" type="text"
                              validations="required|string|min:3"/>
            </div>

            <div className="form-group col-6">
                <InputControl handleChangeV2={handleChangeV2("lastName")} label="Last Name" type="text"
                              validations="required|string|min:3"/>
            </div>

            <div className="form-group col-6">
                <InputControl handleChangeV2={handleChangeV2("phone")} label="Phone" type="text"
                              validations="required|regex:^!*(\d!*){10,}$"/>
            </div>

            <div className="form-group col-6">
                <InputControl handleChangeV2={handleChangeV2("email")} label="Email" type="email"
                              validations="required|string|min:5"/>
            </div>

            <div className="form-group col-6">
                <p className="font-weight-bold">Gender</p>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        id="exampleRadios1"
                        onClick={() => {
                            values.gender = "MALE"
                        }}
                        value="MALE"
                    />
                    <label className="form-check-label" htmlFor="exampleRadios1">
                        Male
                    </label>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        id="exampleRadios2"
                        onClick={() => {
                            values.gender = "FEMALE"
                        }}
                        value="FEMALE"
                    />
                    <label className="form-check-label" htmlFor="exampleRadios2">
                        Female{" "}
                    </label>
                </div>
            </div>


            <div className="form-group col-6">
                <InputControl className="form-control" handleChangeV2={handleChangeV2("password")} label="Password"
                              type={"text"}
                              validations="required|string|regex:^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"/>
            </div>
            <div className="form-group col-6">
                <InputControl handleChangeV2={handleChangeV2("extra.address")} label="Address" type="text"
                              validations="required|string|min:3"/>
            </div>
        </div>


    );
};


const Content = ({totals, setTotals}) => {
    const [alert, setAlert] = useState({message: "", class: "", status: "", show: false})
    const [isFormValid, setIsFormValid] = useState(false)
    const [loading, setLoading] = useState(false);

    const router = useRouter()

    const [values, setValues] = useState({
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
        category: supplierUserTypeId,
        gender: "",
        password: "",
        extra: {address: ""}
    });


    useEffect(async () => {
        try {
            const {data} = await UserCategoryService.getByName("SUPPLIER");
            setValues({...values, category: data._id});
        } catch (e) {
            console.log(e)
        }
    }, [])

    const Create = () => {
        userService
            .create(values)
            .then((res) => {
                alertSuccess(setAlert, " Supplier created");
                setLoading(false)
                setTotals({...totals, suppliers: totals.suppliers + 1})
                setTimeout(() => {
                    router.push('/shared/supply');
                }, ALERT_EXPIRATION_PERIOD);
            }).catch((e) => {
            alertFailer(setAlert, e.response ? e.response.data.message : e.message || "Error occurred. Try again latter.")
            setLoading(false)
        });
    };


    return (
        <div className="container-fluid p-3">
            <div className="row">
                <div className="col-12 align-self-center">
                    <FormLayout
                        Content={<FormContent setIsFormValid={setIsFormValid} setValues={setValues} values={values}/>}
                        title={"New Supplier"} alert={alert} setAlert={setAlert} btnTxt="Create" disable={isFormValid}
                        callFun={Create} loading={loading} setLoading={setLoading}/>
                </div>
            </div>
        </div>
    );
};

const Page = () => {
    const [totals, setTotals] = useState({suppliers: 0, supplies: 0});


    const admin_panes = [
        {name: 'Suppliers', count: totals.suppliers, route: '/shared/supply'},
        {name: 'Product Supplies', count: totals.supplies, route: '/shared/supply/supplies'}
    ];


    const getTotals = async () => {
        const totals = {suppliers: 0, supplies: 0};

        try {
            const suppliers = await SuppliersService.getPaginated();
            const supplies = await SupplyService.getPaginated();
            totals.suppliers = suppliers.data.totalDocs;
            totals.supplies = supplies.data.totalDocs;
            setTotals(totals);
        } catch {
            e => console.log(e)
        }

    }

    const user = useSelector(state => state.authUser);

    return (
        user.category?.name === system_users.ADMIN
            ?
            <SingleSubModuleLayoutAdmin
                Content={<Content setTotals={setTotals} totals={totals}/>}
                isArray={true}
                panes={admin_panes}
                showFilter={null}
                setFilter={null}
                name={'Suppliers'}
                setSearch={null}
                status="all"
                route={"/shared/supply"}
            /> : <></>
    );
};


export default Page;
