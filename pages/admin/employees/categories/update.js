import React, {useEffect, useState} from 'react';
import EmployeeCategoriesService from "../../../../services/employees/employee-categories"
import UpdateFormLayout from "../../../../layouts/table-layouts/update-form-layout"
import {FormContent} from "./new"
import FormLayout from "../../../../layouts/form-layout"
import {alertFailer, alertSuccess} from "../../../../utils/alerts"
import {hide_current_modal, hide_modal_alert} from "../../../../utils/modal-funs";

const Content = ({item, getInitialData}) => {
    const [alert, setAlert] = useState({message: "", class: "", status: "", show: false})
    const [isFormValid, setIsFormValid] = useState(false)
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({
        category: "",
        description: "",
    });

    const [defaultValues, setDefaultValues] = useState({
        category: "",
        description: "",
    });


    const [defaultItem, setDefaultItem] = useState(null);

    useEffect(() => {
        EmployeeCategoriesService.get(item._id)
            .then((res) => {
                setValues({
                    category: res.data.category,
                    description: res.data.description,
                    roles: res.data.roles.map(i => i._id)
                })
                setDefaultItem(res.data)
            }).catch(err => console.log(err))

    }, [item])


    useEffect(() => {
        console.log(values)
    }, [values])
    const Update = () => {
        EmployeeCategoriesService.update(item._id, values)
            .then((res) => {
                alertSuccess(setAlert, "Employee Category Updated")
                getInitialData();
                hide_current_modal(setAlert, '#itemUpdateModal')
            })
            .catch((e) => {
                alertFailer(setAlert, e.response ? e.response.data.message : e.message || "Error occurred. Try again latter.")
                hide_modal_alert(setAlert);
            }).finally(() => {
            setLoading(false);
        })
    };


    return (
        <div className="container-fluid p-3">
            <div className="row">
                <div className="col-10 align-self-center">
                    <FormLayout
                        Content={<FormContent setIsFormValid={setIsFormValid} setValues={setValues} values={values}
                                              item={defaultItem}
                                              status={"update"}/>} alert={alert} title={"Update Category"}
                        setAlert={setAlert} btnTxt="Update" disable={isFormValid} callFun={Update} loading={loading}
                        setLoading={setLoading}/>
                </div>
            </div>
        </div>
    );
};


const Update = ({item, getInitialData}) => {
    return <UpdateFormLayout Content={<Content item={item} getInitialData={getInitialData}/>}
                             title={"CHANGE EMPLOYEE CATEGORY DETAILS"}/>
}

export default Update