import React, {useState} from "react";
import AuthService from "../../services/auth/auth.service";
import {useSelector} from "react-redux";
import {notifyError} from "../../utils/alerts";
import jwt from "jwt-decode";
import {hide_modal} from "../../utils/modal-funs";

export const LoginToConfirmComponent = ({SYSTEM_USER, MESSAGE, continueAction,handleCancel}) => {
    const [loading, setLoading] = useState(false)
    const [form, setForm] = React.useState({
        login: "",
        password: "",
    });
    const handleFormChange = (property) => (event) => {
        setForm({...form, [property]: event.target.value});
    };

    const authUser = useSelector(state => state.authUser)

    const login = async () => {
        setLoading(true);
        try {
            const res = await AuthService.login(form);
            if (res.data.category === SYSTEM_USER) {
                const user = jwt(res.data.token);
                if (user.username === authUser.username) {
                    continueAction();
                } else {
                    notifyError("Sorry Your Request Failed");
                    handleCancel();
                }
            } else {
                notifyError("Sorry Your Request Failed");
                handleCancel();
            }
        } catch (e) {
            notifyError("Sorry Your Request Failed");
            handleCancel();
        }finally {
            setLoading(false);
            hide_modal("#updateConfirmationModal");
        }
    }

    return (
        <div className={"container pb-5"}>
            <div className={"row justify-content-center mt-2"}>
                <div className={"col-8"}>
                    <h6 className={"text-dark font-weight-bold"}>{MESSAGE}</h6>
                </div>
            </div>
            <div className="form-group row justify-content-center mt-4">
                <div className="col-10 col-md-8">
                    <label htmlFor="user-name">
                        Email or Username
                    </label>
                    <input
                        type="text"
                        onChange={handleFormChange("login")}
                        value={form.login}
                        id={"email"}
                        className={"form-control form-control-sm"}
                    />
                </div>
            </div>

            <div className="form-group row justify-content-center">
                <div className="col-10 col-md-8">
                    <label htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        onChange={handleFormChange("password")}
                        value={form.password}
                        id={"password"}
                        className={"form-control form-control-sm"}
                    />
                </div>
            </div>

            <div className="form-group row justify-content-center">
                <div className="col-sm-5 col-md-5 col-5">
                    <button
                        className={"btn btn-danger text-white btn-outline-dark"}
                        onClick={() => login()}
                    >
                        {loading ? (
                            <img
                                src={"/img/loader.gif"}
                                alt={"Loading"}
                                className={"loader"}
                            />
                        ) : (
                            "LET'S GO"
                        )}
                    </button>
                </div>

                <div className="col-sm-5 col-md-3 pl-md-5 col-4">
                    <button
                        className={"btn btn-light btn-outline-dark"}
                        onClick={() => handleCancel()}
                    >
                       Cancel
                    </button>
                </div>
            </div>
        </div>

    )
}

export default LoginToConfirmComponent;