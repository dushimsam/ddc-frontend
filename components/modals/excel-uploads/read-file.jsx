import {show_modal} from "../../../utils/modal-funs";
import React from "react";
import {ContinueIcon} from "../../../icons";

export default function ReadFile({readItems, setReadItems, readExcel}) {
    return (<div>
        <button className={"btn mt-md-n5"} onClick={() => {
            readItems.length > 0 ? show_modal("#uploadedModal", true) : document.getElementById("xcelUpload").click();
        }}>
            {
                readItems.length > 0 ? <ContinueIcon/> :
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="42" height="42">
                        <path fill="none" d="M0 0h24v24H0z"/>
                        <path
                            d="M16 2l5 5v14.008a.993.993 0 0 1-.993.992H3.993A1 1 0 0 1 3 21.008V2.992C3 2.444 3.445 2 3.993 2H16zm-3 10h3l-4-4-4 4h3v4h2v-4z"
                            fill="rgba(231,76,60,1)"/>
                    </svg>
            }
        </button>
        <input
            type="file"
            id={"xcelUpload"}
            hidden={true}
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            onChange={(e) => {
                readExcel(e.target.files[0], setReadItems);
                e.target.value = "";
            }}
            onClick={(event) => {
                event.target.value = null
            }}
        />
    </div>)
}
