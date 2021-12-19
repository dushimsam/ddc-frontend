import React, {useEffect, useState} from "react";
import DeleteConfirmation from "../../../tables/delete-confirmation-modal";
import {hide_modal} from "../../../../utils/modal-funs";
import ConfirmationModal from "../../../tables/confirmation-modal";
import $ from "jquery";
import Router from "next/router";
import {useBeforeUnload} from "react-use";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import RealTimeSaveService from "../../../../services/excel-registrations/real-time-save";
import {PRODUCT_REGISTRATION_TEMP_STORAGE_KEY} from "../../../../utils/constants";
import DisplayingTable from "./table";


export const ModalDisplay = ({items, setItems, save, saveAllLoading, setSupplyValues, supplyValues}) => {
    const [currItem, setCurrItem] = useState(null)
    const [alert, setAlert] = useState({message: "", class: "", status: "", show: false})
    const [loading, setLoading] = useState(false)


    const [deleteLoading, setDeleteLoading] = useState(false)
    // useBeforeunload(() => "Are you sure to close this tab?");

    const handleRemove = () => {
        var new_items = [...items];
        var item_index = new_items.findIndex(x => x.value.part_number === currItem.part_number)
        new_items.splice(item_index, 1);
        setDeleteLoading(false)
        setItems(new_items)
        hide_modal('#deleteConfirmationModal');
    }


    const hideModal = (status) => {
        if (status) {
            hide_modal("#confirmationModal");
            hide_modal("#uploadedModal");
            setItems([]);
            RealTimeSaveService.removeData(PRODUCT_REGISTRATION_TEMP_STORAGE_KEY);
            setLoading(false)
        }
    }

    window.onbeforeunload = (event) => {
        const e = event || window.event;
        e.preventDefault();
        if (e) {
            e.returnValue = ''; // Legacy method for cross browser support
        }
        return ''; // Legacy method for cross browser support
    };

    window.addEventListener("beforeunload", (ev) => {
        ev.preventDefault();
        return ev.returnValue = 'Are you sure you want to close?';
    });


    const [leavePageInfo, setLeavePageInfo] = useState({
        message: "Are you sure you want leave ???",
        isConfirm: true
    })
    useBeforeUnload(leavePageInfo.isConfirm, leavePageInfo.message);

    useEffect(() => {
        const handler = () => {
            if (leavePageInfo.isConfirm && !window.confirm(leavePageInfo.message)) {
                throw "Route Canceled";
            }
        };

        Router.events.on("routeChangeStart", handler);

        return () => {
            Router.events.off("routeChangeStart", handler);
        };
    }, [leavePageInfo]);


    return (
        <div id="uploadedModal" className={"modal fade"} style={{overflowY: "auto"}}>

            <div className={"modal-dialog modal-dialog-centered  modal-xl"}>
                <div className={"modal-content "}>
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Uploaded Data</h5>
                        <button type="button" className="close" onClick={() => {
                            $(function () {
                                $('#confirmationModal').modal('show');
                            })
                        }}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className={"modal-body "}>

                        <div className="table-responsive col-12">
                            <ReactHTMLTableToExcel
                                id="test-table-xls-button"
                                className="btn btn-outline-danger btn-dark mb-3"
                                table="table-to-xls"
                                filename="tablexls"
                                sheet="tablexls"
                                buttonText="Download as XLS"/>
                            <DisplayingTable setItems={setItems} setCurrItem={setCurrItem} items={items}
                                             handleRemove={handleRemove}/>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger"
                                    onClick={() => save()}>{saveAllLoading ? (
                                <img
                                    src={"/img/loader.gif"}
                                    alt={"Loading"}
                                    className={"loader"}
                                />
                            ) : "SAVE ALL"}
                            </button>

                        </div>
                    </div>

                    <DeleteConfirmation item={currItem} deleteItem={handleRemove} alert={alert} loading={deleteLoading}
                                        setLoading={setDeleteLoading} setAlert={setAlert}/>

                    <ConfirmationModal continueAction={hideModal} loading={loading} setLoading={setLoading}
                                       message={"Are you sure , you want to close this modal"}
                                       alert={"All uploaded data will be forgotten"} btnColor={"btn-danger"}/>
                </div>
            </div>
        </div>
    )
}

export default ModalDisplay;