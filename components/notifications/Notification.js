import React from "react";

import styles from "../../styles/components/Notifications.module.css"
import moment from "moment";
import {dateFormat} from "../../utils/functions";

export default function Notification({notification, handleGoTo}) {
    return (
        <div
            className={"border my-4 py-3 px-4 d-flex " + styles.container + " " + ((notification.status === "UNREAD") ? "bg-light" : "bg-white")}>
            <div className="pl-3">
                <div className={"cursor-pointer " + styles.notificationPar} style={{fontSize: 17}}
                     onClick={() => handleGoTo(notification)}><a target="_blank" rel="noopener noreferrer">{notification.message}</a></div>
                <div className="mt-3 text-secondary"
                     style={{fontSize: 13}}>{moment(notification.createdAt).fromNow() + "  - " + dateFormat(notification.createdAt).onlyDate()}</div>
            </div>
        </div>
    )
}