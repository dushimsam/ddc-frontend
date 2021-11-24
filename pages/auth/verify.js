import AuthService from "../../services/auth/auth.service";
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import Alert from "../../components/alert";
import {handleDoubleDecryptionPath} from "../../utils/functions";
import {alertFailer} from "../../utils/alerts";
import ForbiddenPage from "../../layouts/ForbiddenPage";

const Verify = () => {
    const [alertData, setAlertData] = React.useState({alert: false, message: '', class: ''});
    const [loading, setLoading] = React.useState(false);
    const [email, setEmail] = useState("");

    const router = useRouter();

    const [hideBtn, setHideBtn] = useState(false);

    const handleResend = async () => {
        setAlertData({alert: false, message: '', class: ''});
        setLoading(true);

        try {
            await AuthService.resendToken({"email": email});
            setAlertData({
                alert: true,
                message: "OK WE SENT IT AGAIN , PLEASE RECHECK YOUR EMAIL ACCOUNT ",
                class: 'alert-success'
            });
            hideBtn(true)
        } catch (e) {
            const ERROR_MESSAGE = (e.response) ? e.response.data.message : e.message;
            alertFailer(setAlertData, ERROR_MESSAGE)
        } finally {
            setLoading(false);
            window.setTimeout(() => {
                router.push("/auth/login")
            }, [15000])
        }
    }

    useEffect(() => {
        if (router.query.subject) {
            setEmail(handleDoubleDecryptionPath(router.query.subject))
        }
    }, [router.query.subject])
    return (
        <div className={"container card  shadow-lg pt-5 pb-5"}>

            <div className={"row justify-content-center"}>
                <div className={"mb-2 col-12"}>
                    {alertData.alert ? (
                        <Alert
                            message={alertData.message}
                            className={alertData.class}
                            setAlert={setAlertData}
                        />
                    ) : null}
                </div>

                <div className={"col-1"}>
                    <div className={""}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="72" height="72">
                            <path fill="none" d="M0 0h24v24H0z"/>
                            <path
                                d="M22 14h-2V7.238l-7.928 7.1L4 7.216V19h10v2H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v10zM4.511 5l7.55 6.662L19.502 5H4.511zM19 22l-3.536-3.536 1.415-1.414L19 19.172l3.536-3.536 1.414 1.414L19 22z"
                                fill="rgba(47,204,113,1)"/>
                        </svg>
                    </div>
                </div>
            </div>
            <div className={"row justify-content-center"}>
                <div className={"col-4 mt-4"}>
                    <h5 className={"font-weight-bold"}>You have a pending password reset</h5>
                </div>
                <div className={"col-9 mt-4"}>
                    <div>
                        <span>Hey we've sent a reset password link on your email account</span>
                        <span className={"ml-2 font-weight-bold"}>{email}</span>
                    </div>
                    <div>
                        <span>Reset it and continue enjoying our services.</span><br/>
                        <span className={"ml-1 font-italic font-weight-thin"}>If it is not there , feel free to click on the button below to resend it again.</span>
                    </div>
                </div>
                <div className={"col-5 mt-5"}>
                    {
                        !hideBtn ?
                            <button className={"btn btn-danger btn-block"} onClick={() => handleResend()}>
                                {loading ? (
                                    <img
                                        src={"/img/loader.gif"}
                                        alt={"Loading"}
                                        className={"loader"}
                                    />
                                ) : (
                                    "Resend it"
                                )}</button> : <></>
                    }


                </div>
            </div>
        </div>
    )
}

const Page = () => {
    return (
        <ForbiddenPage>
            <div className={"container mb-5"}>
                <div className={"row justify-content-center h-100 mt-3"}>
                    <div className={"col-10 align-self-center mt-5"}>
                        <Verify/>
                    </div>
                </div>
            </div>
        </ForbiddenPage>
    )
}
export default Page