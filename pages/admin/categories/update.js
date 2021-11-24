import React, {useEffect, useState} from 'react';
import ProductCategoriesService from "../../../services/product-categories/product-categories.service"
import UpdateFormLayout from "../../../layouts/table-layouts/update-form-layout"
import {FormContent} from "./new"
import FormLayout from "../../../layouts/form-layout"
import {alertFailer, alertSuccess} from "../../../utils/alerts"
import {hide_current_modal, hide_modal_alert} from "../../../utils/modal-funs";

const Content = ({item,getInitialData}) => {
    const [alert, setAlert] = useState({message: "", class: "", status: "", show: false})
    const [isFormValid, setIsFormValid] = useState(false)
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({
        name: "",
        description: "",
    });
  
    const [defaultValues,setDefaultValues] = useState({
        name: "",
        description: "",
    });
    
    
    useEffect(()=>{
        ProductCategoriesService.getProductCategory(item._id)
        .then((res)=>{
            setValues({
                name:res.data.name,
                description: res.data.description,
            })
        }).catch(err=>console.log(err))
    
        },[item])
  
  
      const Update = () => {
        ProductCategoriesService.updateProductCategory(item._id,values)
            .then((res) => {
                alertSuccess(setAlert,"Product Category Updated")
                getInitialData();
                hide_current_modal(setAlert,'#itemUpdateModal')
            })
            .catch((e) => {
               alertFailer(setAlert,e.response ? e.response.data.message : e.message || "Error occurred. Try again latter.")
        hide_modal_alert(setAlert);
                        }).finally(() => {
          setLoading(false);
})
    };

  
  
    return (
        <div className="container-fluid p-3">
            <div className="row">
                <div className="col-10 align-self-center">
                    <FormLayout Content={<FormContent setIsFormValid={setIsFormValid} setValues={setValues} values={values} status="update" status={"update"}/>} alert={alert} title={"Update Brand"} setAlert={setAlert} btnTxt="Update" disable={isFormValid} callFun={Update} loading={loading} setLoading={setLoading}/>
                </div>
            </div>
        </div>
    );
  };
  

  
const Update = ({item,getInitialData})=>{
    return <UpdateFormLayout Content={<Content item={item} getInitialData={getInitialData}/>} title={"CHANGE PRODUCT BRAND DETAILS"}/>
}

export default Update