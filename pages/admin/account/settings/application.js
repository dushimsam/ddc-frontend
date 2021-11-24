import React, {useEffect, useState} from "react";
import TextField from "../../../../components/forms/TextField";
import {notifyError, notifySuccess} from "../../../../utils/alerts";
import globalStyles from "../../../../styles/global-colors.module.css";
import AppInfoService from "../../../../services/app-info-service"
import {Form, Formik} from "formik";
import {AppInfoFieldsSchema} from "../../../../utils/validations/schemas/appInfoFields";
import AdminDashboard from "../../../../layouts/dashboardsV2/AdminDashboard";


const ApplicationSettings = () => {

    const [values, setValues] = useState({
        APP_NAME: "",
        APP_PASSWORD: "",
        APP_EMAIL: ""
    })


    const [APP_STATUS, setAppStatus] = useState("UPDATE")

    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
    };

    const [loading, setLoading] = useState(false);

    const updateRecords = (values) => {
        AppInfoService.update({APP_NAME:values.app_name,APP_EMAIL:values.app_email,APP_CURR_PASSWORD:values.current_password,APP_NEW_PASSWORD:values.new_password})
            .then((res) => {
                notifySuccess("Application Information updated Successfully")
            })
            .catch((e) => {
                notifyError(e.response ? e.response.data.message : e.message || "Error occurred. Try again latter.")
            }).finally(() => {
            setLoading(false)
        })
    }

    useEffect(()=>{
        AppInfoService.get()
            .then((res)=>{
                setValues({
                    APP_NAME: res.data[0].APP_NAME,
                    APP_EMAIL: res.data[0].APP_EMAIL
                })
            }).catch(e=>console.log(e))
    },[])


    return (
        <div className="border rounded">
            <div className="bg-light px-4 py-3">
                <h5 className={"font-weight-bold"}>Application Settings</h5>
            </div>
            <Formik
                initialValues={{
                    app_name: values.APP_NAME,
                    app_email: values.APP_EMAIL,
                    current_password: "",
                    new_password: ""
                }}
                onSubmit={updateRecords}
                validationSchema={AppInfoFieldsSchema}
            >
                {(formik) => (
                    <Form>
                        <div className="bg-white px-5 py-2">
                            <div className="row mt-3">
                                <div className="col-sm-12 col-md-12 mt-0">
                                    <div className="form-group">
                                        <TextField label="Application Name" name="app_name"
                                                   type="text"/>
                                    </div>
                                    <div className="form-group">
                                        <TextField label="Application Email" name="app_email"
                                                   type="email"/>
                                    </div>
                                    <div className="form-group">
                                        <TextField label="Current password" name="current_password"
                                                   type="password"/>
                                    </div>
                                    <div className="form-group">
                                        <TextField label="New password" name="new_password" type="password"/>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 justify-content-center">
                                <button className={"btn bg-app-red text-white col-sm-4 col-md-6 mt-0 " + globalStyles.globalBackColor}
                                        type="submit"
                                        onClick={() => {
                                            setLoading(true);
                                        }}>
                                    {loading ? (
                                        <img
                                            src={"/img/loader.gif"}
                                            alt={"Loading"}
                                            className={"loader"}
                                        />
                                    ) : (
                                        "YES I am done"
                                    )}
                                </button>
                            </div>
                        </div>

                    </Form>
                    )}
            </Formik>
        </div>
    )
}

const ApplicationInfoSettings = () => {
    return (
        <AdminDashboard>
            <div className="row justify-content-center">
                <div className="col-md-8 col-12">
                    <ApplicationSettings/>
                </div>
            </div>

        </AdminDashboard>
    )
}

export default ApplicationInfoSettings;