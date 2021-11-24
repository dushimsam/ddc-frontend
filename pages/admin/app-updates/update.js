import React, {useEffect, useRef, useState} from 'react';
import AppUpdatesService from "../../../services/app-updates/app-updates"
import UpdateFormLayout from "../../../layouts/table-layouts/update-form-layout"
import {FormContent} from "./new"
import {alertFailer, alertSuccess} from "../../../utils/alerts"
import FormLayout from "../../../layouts/form-layout"
import {hide_current_modal, hide_modal_alert, show_modal} from "../../../utils/modal-funs";
import ImageCropper from "../../../components/reusable/image-cropper";


const Content = ({ item, getInitialData }) => {
    const [alert, setAlert] = useState({ message: "", class: "", status: "", show: false })
    const [isFormValid, setIsFormValid] = useState(false)
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({
        title: ""
    });
    const [defaultValue, setDefaultValue] = useState({
        title: ""
    });
    useEffect(() => {
        AppUpdatesService.get(item._id)
            .then((res) => {
                setValues({ title: res.data.title }); setDefaultFile(res.data.imageUrl);
                setDefaultValue(res.data)
            }).catch(err => console.log(err))
    }, [item])

    const [defaultFile, setDefaultFile] = useState("");
    const [imgUrl, setImgUrl] = useState(null)
    const [uploadedFile,setUploadedFile] = useState(null)

    const Update = async (e) => {
        if (!values.title) setAlert({ show: true, class: "danger", message: "Title is required" })
        else {
            try {
                if (imgUrl || defaultValue.title !== values.title) {

                    if (imgUrl) {
                        const formData = new FormData();
                        formData.append("file", imgUrl)
                        await AppUpdatesService.addImage(item._id, formData)
                    } else {
                        let result = await AppUpdatesService.update(item._id, values)
                    }
                    alertSuccess(setAlert, "App-Update Updated");
                    getInitialData();
                    hide_current_modal(setAlert,'#itemUpdateModal')
                } else {
                    alertFailer(setAlert, "Nothing To Update")
                    hide_modal_alert(setAlert);
                }
            } catch (e) {
                alertFailer(setAlert, e.response ? e.response.data.message : e.message || "Error occurred. Try again latter.")
                hide_modal_alert(setAlert);
            }finally {
                setLoading(false);
            }
        }
    }

    const fileContainer = useRef();


    const handleUploadPicture = (files) => {
        setUploadedFile(files[0])
        show_modal("#imageCropper",true)
    }


    return (
        <div className="container-fluid p-3">
            <div className="row">
                <div className="col-12 align-self-center">
                    <FormLayout Content={<FormContent handleUploadPicture={handleUploadPicture} imgFile={imgUrl} defaultFile={defaultFile} setIsFormValid={setIsFormValid} fileContainer={fileContainer} setValues={setValues} values={values} status="update" status={"update"} />} alert={alert} title={"Update App-Update "} setAlert={setAlert} btnTxt="Update" disable={isFormValid} callFun={Update} loading={loading} setLoading={setLoading} />
                </div>
                <ImageCropper uploadedFile={uploadedFile} setImage={setImgUrl}/>
            </div>
        </div>
    );
}

const Update = ({ item, getInitialData }) => {
    return <UpdateFormLayout Content={<Content item={item} getInitialData={getInitialData} />} title={"CHANGE APP UPDATES DETAILS"} />
}

export default Update