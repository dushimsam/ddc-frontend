import SparePartService from "../../../services/products/ProductService";
import React, {useEffect, useRef, useState} from "react";
import UpdateFormLayout from "../../../layouts/table-layouts/update-form-layout"
import {alertFailer, alertSuccess} from "../../../utils/alerts"
import FormLayout from "../../../layouts/form-layout"
import {FormContent} from "./new"
import {hide_current_modal, hide_modal_alert, show_modal} from "../../../utils/modal-funs";


const Content = ({item, getInitialData}) => {
    const [alert, setAlert] = useState({message: "", class: "", status: "", show: false})
    const [isFormValid, setIsFormValid] = useState(false)
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({
        name: "",
        product_code: "",
        product_category: "",
        second_hand: false,
        description: ""
    });

    const imagesContainer = useRef(null);

    const [imgFiles, setImgFiles] = useState(null)

    const handleUploadPictures = (files) => {
        setImgFiles(files)
    }


    const [defaultValues, setDefaultValues] = useState({
        name: "",
        description: "",
    });
    const [defaultFiles, setDefaultFiles] = useState([])


    useEffect(() => {
        setImgFiles(null)
        SparePartService.getProduct(item._id)
            .then((res) => {
                setValues({
                    name: res.data.name,
                    product_code: res.data.product_code,
                    product_category: res.data.product_category,
                    weight: res.data.weight,
                    second_hand: res.data?.second_hand,
                    description: res.data.description
                })

                setDefaultValues({
                    name: res.data.name,
                    product_code: res.data.product_code,
                    product_category: res.data.product_category,
                    weight: res.data.weight,
                    second_hand: res.data?.second_hand,
                    description: res.data.description
                })
                setDefaultFiles(res.data.imageUrls)
            }).catch(err => console.log(err))
    }, [item])


    const Update = async () => {
        if ((JSON.stringify(values) === JSON.stringify(defaultValues)) && imagesContainer.current.files.length < 1) {
            alertFailer(setAlert, "No Spare part update required");
            setAlert({show: false, class: "success", message: ""});
            window.setTimeout(() => {
                setLoading(false);
            }, 1000);
        } else {


            try {

                if (imgFiles) {
                    for (let i = 0; i < imgFiles.length; i++) {
                        const formData = new FormData();
                        formData.append("image", imgFiles[i]);
                        await SparePartService.addImage(item._id, formData)
                    }
                }


                if ((JSON.stringify(values) !== JSON.stringify(defaultValues))) {
                    let update_values = {...values};
                    update_values.complete_info_status = "COMPLETE";

                    await SparePartService.updateProduct(item._id, update_values);
                    alertSuccess(setAlert, "Product Updated");
                    setLoading(false);
                    getInitialData();
                    hide_current_modal(setAlert, '#itemUpdateModal')
                }
            } catch (e) {
                alertFailer(setAlert, e.response ? e.response.data.message : e.message || "Error occurred. Try again latter.")
                hide_modal_alert(setAlert);
            } finally {
                setLoading(false);
            }

        }

    };


    return (
        <div className="container-fluid p-3">
            <div className="row">

                <div className="col-12 align-self-center">
                    <FormLayout
                        Content={<FormContent getInitialData={getInitialData} item={item} setImgFiles={setImgFiles}
                                              setIsFormValid={setIsFormValid} setDefaultFiles={setDefaultFiles}
                                              defaultFiles={defaultFiles} setValues={setValues} values={values}
                                              status="update" imagesContainer={imagesContainer}
                                              handleUploadPictures={handleUploadPictures} imgFiles={imgFiles}/>}
                        alert={alert} title={"Update Product"} setAlert={setAlert} btnTxt="Update"
                        disable={isFormValid} callFun={Update} loading={loading} setLoading={setLoading}/>
                </div>
            </div>
        </div>
    );
};


const Update = ({item, getInitialData}) => {
    return <UpdateFormLayout Content={<Content item={item} getInitialData={getInitialData}/>}
                             title={"CHANGE PRODUCT'S DETAILS"}/>
}

export default Update