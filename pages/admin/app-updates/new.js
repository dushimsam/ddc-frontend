import React, {useEffect, useRef, useState} from 'react';
import AppUpdatesService from "../../../services/app-updates/app-updates"
import AppUpdateService from "../../../services/app-updates/app-updates"
import SingleSubModuleLayout from "../../../layouts/admin-layouts/SingleSubModule";
import InputControl from "../../../components/reusable/InputControl"
import FormLayout from "../../../layouts/form-layout"
import {alertFailer, alertSuccess} from "../../../utils/alerts"
import {isThisFormValid} from "../../../utils/functions";
import {hide_modal_alert, show_modal} from "../../../utils/modal-funs";
import ImageCropper from "../../../components/reusable/image-cropper";
import {acceptedFileTypes} from "../../../utils/image-utils";

export const FormContent = ({
                                handleUploadPicture,
                                setIsFormValid,
                                setValues,
                                values,
                                fileContainer,
                                status,
                                defaultFile,
                                imgFile
                            }) => {

    const [valid, setValid] = useState({
        title: !!status,
        image: !!status
    });

    useEffect(() => {
        setIsFormValid(isThisFormValid(valid))
    }, [valid])


    useEffect(() => {
        if (imgFile)
            setValid({...valid, image: true})
        else
            setValid({...valid, image: false})
    }, [imgFile])

    const handleChangeV2 = (prop) => ({value, valid: validProp}) => {
        setValues({...values, [prop]: value});
        setValid(state => ({...state, [prop]: validProp}))
    };


    return (
        <React.Fragment>
            <div className="form-group col-12 col-md-7 mt-4 px-0">
                <InputControl handleChangeV2={handleChangeV2("title")} value={values.title} label="Title" type="text"
                              validations="required|string|min:5"/>
            </div>

            {status === "update" ?
                <div className="form-group col-7 px-0 mt-3">
                    <h6 className={"font-weight-bold"}>Existing Picture</h6>
                    <ImageContainer file={defaultFile} status={status}/>
                </div> : null}
            <div className="form-group col-12 px-0">
                <h6 className={"font-weight-bold mt-5"}>Choose The Picture</h6>
                <input type="file" hidden={true} name={"image"} className={"form-control-file"} id={"uploadImage"} accept={acceptedFileTypes}
                       onChange={(e) => {
                           handleUploadPicture(e.target.files);
                           e.target.value = "";
                       }}
                       required/>
                <div className="bg-secondary d-inline-block p-4 cursor-pointer rounded shadow-sm" onClick={() => {
                    document.getElementById("uploadImage").click()
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
                        <path fill="none" d="M0 0h24v24H0z"/>
                        <path
                            d="M9 3h6l2 2h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4l2-2zm3 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12zm0-2a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"
                            fill="rgba(236,240,241,1)"/>
                    </svg>
                </div>
            </div>

            <div className="form-group col-12 px-0">
                {imgFile && <ImageContainer file={imgFile}/>}
            </div>
        </React.Fragment>

    )
}


const ImageContainer = ({file, status}) => {
    const [img, setImg] = useState("")

    useEffect(() => {
        if (status !== "update") {
            if (file) {
                let reader = new FileReader();
                reader.onload = function (evt) {
                    setImg(evt.target.result)
                }
                reader.onerror = function (evt) {
                    console.log(evt)
                }
                reader.readAsDataURL(file)
            }
        } else {
            setImg(file)
        }

    }, [file])
    return (
        <div className="col-2">
            <img src={img} id="imageSpace" style={otherStyles.img}/>
        </div>
    )
}


const Content = ({total, setTotal}) => {
    const [alert, setAlert] = useState({message: "", class: "", status: "", show: false})
    const [isFormValid, setIsFormValid] = useState(false)
    const [loading, setLoading] = useState(false);

    const [values, setValues] = useState({
        title: "",
    });

    const [imgFile, setImgFile] = useState(null)

    const [uploadedFile, setUploadedFile] = useState(null)

    const handleUploadPicture = (files) => {
        setUploadedFile(files[0]);
        show_modal("#imageCropper", true)
    }

    const Create = async (e) => {
        if (!values.title) setAlert({show: true, class: "danger", message: "Title is required"})
        else {
            try {
                let result = await AppUpdatesService.create(values)
                const formData = new FormData();
                formData.append("file", imgFile)
                await AppUpdatesService.addImage(result.data._id, formData)
                alertSuccess(setAlert, "App update created ")
                hide_modal_alert(setAlert);
                setTotal(total + 1)
            } catch (error) {
                alertFailer(setAlert, error.response ? error.response.data.message : error.message || "Error occurred. Try again latter.")
                hide_modal_alert(setAlert);
            } finally {
                setLoading(false)
            }
        }
    }

    const fileContainer = useRef();


    return (
        <>
            <FormLayout Content={<FormContent handleUploadPicture={handleUploadPicture} setIsFormValid={setIsFormValid}
                                              setValues={setValues} values={values} fileContainer={fileContainer}
                                              imgFile={imgFile}/>} alert={alert} title={"New App Update"}
                        setAlert={setAlert} btnTxt="Create" disable={isFormValid} callFun={Create} loading={loading}
                        setLoading={setLoading}/>

            <ImageCropper uploadedFile={uploadedFile} setImage={setImgFile}/>
        </>

    );
};


const Page = () => {
    const [total, setTotal] = useState(0);

    useEffect(() => {
        AppUpdateService.getPaginated().then((res) => {
            setTotal(res.data.totalDocs);
        })
    }, [])

    return (
        <SingleSubModuleLayout
            Content={<Content total={total} setTotal={setTotal}/>}
            count={total}
            route={"/admin/app-updates"}
            showFilter={false}
            setSearch={null}
            setFilter={null}
            name={"AppUpdates"}
            status="all"
        />
    );
};


const otherStyles = {
    img: {
        maxWidth: "45em",
        maxHeight: "15em",
        border: "0.5em"
    }
}


export default Page