import React, {useEffect, useState} from "react";
import EmployeeCategoriesDataService from "../../../../services/employees/employee-categories"
import SingleSubModuleLayout from "../../../../layouts/admin-layouts/SingleSubModule";
import {alertFailer, alertSuccess} from "../../../../utils/alerts";
import {hide_modal_alert} from "../../../../utils/modal-funs";
import FormLayout from "../../../../layouts/form-layout";
import InputControl, {InputTextArea} from "../../../../components/reusable/InputControl";
import {isThisFormValid} from "../../../../utils/functions";
import EmployeesService from "../../../../services/employees/employees"
import EmployeeRolesDataService from "../../../../services/employees/employee-roles"
import Alert from "../../../../components/alert";
import Select from "react-select";
import {mainCustomStyles} from "../../../../components/reusable/select-elements";



const EmployeeRolesSelection = ({roles, values, setValues, status, setValid, valid, item}) => {
    const [existsAlert, setExistsAlert] = useState({message: "", class: "", show: false})


    const [selectedRoles, setSelectedRoles] = useState([])

    const handleRemoveRole = (roleId) => {
        var new_roles = [...values.roles];
        var role_index = new_roles.findIndex(x => x === roleId);

        var array = [...selectedRoles];
        var index = array.findIndex(x => x.value === roleId);

        if (index !== -1) {
            array.splice(index, 1);
            setSelectedRoles(array);
            new_roles.splice(role_index, 1)
            setValues({...values, roles: new_roles});
            if (new_roles.length < 1) {
                setValid(state => ({...state, ["roles"]: false}))
            }
        }
    }


    const [tempSelected, setTempSelected] = useState([])

    const handleStateChange = (prop) => (option) => {
        if (!tempSelected.find(item => item === option.map(item => item))) {
            setTempSelected(option)
        }
    }

    const handleSave = () => {
        setSelectedRoles(tempSelected)
        setValues({...values, roles: tempSelected.map(item => item.value)})
        setValid({...valid, roles: true})
        setTempSelected([])
    }

    useEffect(() => {
        if (status === "update" && item) {
            setSelectedRoles(item.roles.map((i) => {
                return {label: i.role, value: i._id, description: i.description}
            }))
        }
    }, [item])
    return (
        <>
            <div className="row justify-content-center pt-3">
                <div className={"col-12 col-md-10"}>
                    {existsAlert.show ? (
                        <Alert
                            className={"my-3 alert-" + existsAlert.class}
                            message={existsAlert.message}
                            setAlert={setExistsAlert}
                        />
                    ) : null}
                </div>
                {selectedRoles.length > 0 ?
                    <>
                        <div className="col-12 text-center">
                            <h6>SELECTED EMPLOYEE ROLES</h6>
                        </div>
                        <div className="col-12 col-md table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Role</th>
                                    <th>Description</th>
                                    <th>Remove</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    selectedRoles.map((item, i) => (
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{item.label}</td>
                                            <td>{item.description}</td>
                                            <td><span className="btn"
                                                      onClick={() => handleRemoveRole(item.value)}><svg
                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16"
                                                height="16"><path fill="none" d="M0 0h24v24H0z"/><path
                                                d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-4.586 6l1.768 1.768-1.414 1.414L12 15.414l-1.768 1.768-1.414-1.414L10.586 14l-1.768-1.768 1.414-1.414L12 12.586l1.768-1.768 1.414 1.414L13.414 14zM9 4v2h6V4H9z"
                                                fill="rgba(231,76,60,1)"/></svg></span></td>
                                        </tr>))
                                }
                                </tbody>
                            </table>
                        </div>
                    </> : <></>}
            </div>
            <div className={"row justify-content-start"}>
                <div className="col-md-5 col-12 mt-3 d-block">
                    <Select
                        isMulti
                        name="categories"
                        options={roles}
                        getNewOptionData={(inputValue) => ({inputValue})}
                        styles={mainCustomStyles}
                        value={tempSelected}
                        onChange={handleStateChange("ROLE")}
                        classNamePrefix="basic-multi-select"
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-md-3 col-5 pt-2 d-block">
                    <span className="btn btn-primary" onClick={() => {
                        tempSelected.length > 0 ? handleSave() : ""
                    }}>SAVE </span>
                </div>
            </div>
        </>
    )
}
export const FormContent = ({setIsFormValid, setValues, values, status, item}) => {

    const [roles, setRoles] = useState([])

    const [valid, setValid] = useState({
        category: !!status,
        description: !!status,
        roles: !!status
    });

    useEffect(() => {
        EmployeeRolesDataService.getAll()
            .then((res) => {
                res.data.docs.forEach(function (element) {
                    setRoles(old => [...old, {
                        label: element.role,
                        value: element._id,
                        description: element.description
                    }])
                });
            }).catch(e => console.log(e))
    }, [])

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
                <InputControl handleChangeV2={handleChangeV2("category")} value={values.category} label="Category"
                              type="text" validations="required|string|min:3"/>
            </div>
            <div className="form-group col-md-5 col-10">
                <InputTextArea handleChangeV2={handleChangeV2("description")} value={values.description}
                               label="Description" type="text" validations="required|string|min:3"/>
            </div>
            <div className="form-group col-md-12 col-10">
                <EmployeeRolesSelection roles={roles} values={values} setValues={setValues} status={status}
                                        valid={valid}
                                        item={item}
                                        setValid={setValid}/>
            </div>
        </div>
    );
};


const Content = ({totals, setTotals}) => {
    const [isFormValid, setIsFormValid] = useState(false)
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({message: "", class: "", show: false})

    const [values, setValues] = useState({
        category: "",
        description: "",
        roles: []
    });

    const Create = () => {
        EmployeeCategoriesDataService.create(values)
            .then(res => {
                alertSuccess(setAlert, "Employee Category is created");
                hide_modal_alert(setAlert)
                setTotals({...totals, categories: totals.categories + 1})
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
                                          values={values}/>} alert={alert} title={"New Employee Category"}
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
            showFilter={null}
            isArray={true}
            name={'Categories'}
            panes={panes}
            setSearch={null}
            status="all"
            route={"/admin/employees/categories"}
        />
    );
};
export default Page;