import {hide_modal} from "../../utils/modal-funs";
import LoginToConfirmComponent from "../reusable/login-to-confim";
import React from "react";

const ConfirmModal = ({callBack, system_user}) => {
    const handleCancel = () => {
        hide_modal("#updateConfirmationModal");
    }

    return (
        <div id="updateConfirmationModal" className={"modal fade"}>
            <div className={"modal-dialog modal-dialog-centered"}>
                <div className={"modal-content "}>
                    <div className={"modal-body "}>
                        <LoginToConfirmComponent SYSTEM_USER={system_user} continueAction={callBack}
                                                 MESSAGE={"LOGIN TO CONFIRM THE AUTHORITY OF THIS ACTION"}
                                                 handleCancel={handleCancel}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default  ConfirmModal;