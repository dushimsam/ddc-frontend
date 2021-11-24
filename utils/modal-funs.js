import $ from "jquery";
import {ALERT_EXPIRATION_PERIOD} from "./constants";

export const show_modal = (modelId, PERSISTENT) => {
    if(PERSISTENT){
        $(function () {
            $(modelId).modal({backdrop: 'static', keyboard: false});
        });
    }else{
        $(function () {
            $(modelId)?.modal('show');
        });
    }
}


export const hide_modal = (modelId) => {
    $(function () {
        $(modelId).modal('hide');
    });
}


export const hide_modal_alert = (setAlert) => {
    window.setTimeout(() => {
        setAlert({show: false, class: "success", message: "Record is Deleted successfully."});
    }, ALERT_EXPIRATION_PERIOD);
}

export const hide_delete_modal = (setAlert) => {
    window.setTimeout(() => {
        hide_modal('#deleteConfirmationModal')
        setAlert({show: false, class: "success", message: "Record is Deleted successfully."});
    }, ALERT_EXPIRATION_PERIOD);
}


export const hide_current_modal = (setAlert, modalId) => {
    window.setTimeout(() => {
        setAlert({show: false, class: "success", message: "Record is Deleted successfully."});
        hide_modal(modalId)
    }, ALERT_EXPIRATION_PERIOD);
}