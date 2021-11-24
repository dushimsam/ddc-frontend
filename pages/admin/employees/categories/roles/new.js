import EmployeeRolesDataService from "../../../../../services/employees/employee-roles"
import React, {useEffect, useState} from "react";
import InputControl, {InputTextArea} from "../../../../../components/reusable/InputControl";
import FormLayout from "../../../../../layouts/form-layout";
import {alertFailer, alertSuccess} from "../../../../../utils/alerts";
import {hide_modal_alert} from "../../../../../utils/modal-funs";
import SingleSubModuleLayout from "../../../../../layouts/admin-layouts/SingleSubModule";
import {isThisFormValid} from "../../../../../utils/functions";
import EmployeesService from "../../../../../services/employees/employees";
import EmployeeCategoriesDataService from "../../../../../services/employees/employee-categories";

export const FormContent = ({setIsFormValid, setValues, values, status}) => {

    const [valid, setValid] = useState({
        role: !!status,
        description: !!status
    });

    const handleChangeV2 = (prop) => ({value, valid: validProp}) => {
        setValues({...values, [prop]: value});
        setValid(state => ({...state, [prop]: validProp}))
    };

    useEffect(() => {
        setIsFormValid(isThisFormValid(valid))
    }, [valid])


    return (
        <div className="form-row justify-content-center justify-content-md-start">
            <div className="form-group col-md-5 col-10 mr-md-5 mr-0">
                <InputControl handleChangeV2={handleChangeV2("role")} value={values.role} label="Role"
                              type="text" validations="required|string|min:3"/>
            </div>
            <div className="form-group col-md-5 col-10">
                <InputTextArea handleChangeV2={handleChangeV2("description")} value={values.description}
                               label="Role Description" type="text" validations="required|string|min:3"/>
            </div>
        </div>
    );
};

const Content = ({totals, setTotals}) => {
    const [isFormValid, setIsFormValid] = useState(false)
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({message: "", class: "", show: false})

    const [values, setValues] = useState({
        role: "",
        description: ""
    });


    const Create = () => {
        EmployeeRolesDataService.create(values)
            .then(res => {
                alertSuccess(setAlert, "Employee Role is created");
                hide_modal_alert(setAlert)
                setTotals({...totals, roles: totals.roles + 1})
            })
            .catch(e => {
                alertFailer(setAlert, e.response ? e.response.data.message : e.message || "Error occurred. Try again latter.");
                hide_modal_alert(setAlert)
            }).finally(() => {
            setLoading(false);
        });
    };


    return (
        <FormLayout Content={<FormContent setIsFormValid={setIsFormValid} setValues={setValues}
                                          values={values}/>} alert={alert} title={"New Employee Role"}
                    setAlert={setAlert} btnTxt="Create" disable={isFormValid} callFun={Create} loading={loading}
                    setLoading={setLoading}/>

    );
};

const Page = () => {
    const [totals, setTotals] = useState({employees: 0, categories: 0, roles: 0});


    const panes = [
        {name: 'Employees', count: totals.employees, route: '/admin/employees'},
        {name: 'Categories', count: totals.categories, route: '/admin/employees/categories'},
        {name: 'Roles', count: totals.roles, route: '/admin/employees/categories/roles'},
    ];


    const getTotals = async () => {
        const totals = {employees: 0, categories: 0, roles: 0};

        try {
            const employees = await EmployeesService.getPaginated();
            const categories = await EmployeeCategoriesDataService.getAll();
            const roles = await EmployeeRolesDataService.getAll();

            totals.employees = employees.data.totalDocs;

            totals.categories = categories.data.totalDocs;
            totals.roles = roles.data.totalDocs;

            setTotals(totals);
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        (async function () {
            await getTotals();
        })()
    }, [])


    return (
        <SingleSubModuleLayout
            Content={<Content totals={totals} setTotals={setTotals}/>}
            isArray={true}
            panes={panes}
            showFilter={null}
            count={totals}
            name={'Roles'}
            setSearch={null}
            status="all"
            route={"/admin/employees/categories/roles"}
        />
    );
};
export default Page;