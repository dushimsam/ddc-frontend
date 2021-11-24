import React, { useEffect, useState } from "react";
import { ALERT_EXPIRATION_PERIOD } from "../../utils/constants";

export default function FormLayout({ children, showMessage = 1, message, title = "New Input" }) {
    const [ status, setStatus ] = useState(false)
    
    useEffect(() => {
        (showMessage !== 1) && setStatus(true)
        setTimeout(() => {
            setStatus(false)
        }, ALERT_EXPIRATION_PERIOD)
    }, [ showMessage ])
    
    const close = () => {
        setStatus(false)
    }
    
    return (
        <div>
            <div>
                <h3 className="font-weight-bold mb-4">{title}</h3>
                <hr/>
                {
                    status && (
                        <div
                            className={"alert shadow alert-light-" + message.color + " d-flex justify-content-between"}>
                            <strong>{message.title} </strong>
                            <div onClick={close}>
                                <span aria-hidden="true">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24" width="18"
                                        height="18">
                                        <path fill="none" d="M0 0h24v24H0z"/>
                                        <path
                                            d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"/></svg>
                                </span>
                            </div>
                        </div>
                    )
                }
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}