import React from "react";

export  const PartAvailability = ({availabilityDetails, setAvailabilityDetails}) => {
    return (
        availabilityDetails.visible ?
            <div
                className={"alert shadow alert-danger d-flex justify-content-between text-light"}>
                <strong>{availabilityDetails.message} </strong>
                <div className={"cursor-pointer rounded-circle text-light "}
                     onClick={() => setAvailabilityDetails({
                         ...availabilityDetails,
                         visible: false
                     })}>
                                <span aria-hidden="true">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path
                                    fill="none" d="M0 0h24v24H0z"/><path
                                    d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"
                                    fill="rgba(255,255,255,1)"/></svg>
                                </span>
                </div>
            </div> : <></>
    )
}