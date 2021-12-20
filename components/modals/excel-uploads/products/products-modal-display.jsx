import React, {useEffect, useState} from "react";
import {FormContent} from "../../../../pages/admin/products/new";
import FormLayout from "../../../../layouts/form-layout";
import DeleteConfirmation from "../../../tables/delete-confirmation-modal";
import {hide_modal} from "../../../../utils/modal-funs";
import {alertFailer} from "../../../../utils/alerts";
import ConfirmationModal from "../../../tables/confirmation-modal";
import $ from "jquery";
import SuppliersDataService from "../../../../services/supplies/SupplierService";
import SelectControl from "../../../reusable/SelectControl";
import Router from "next/router";
import {useBeforeUnload} from "react-use";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import RealTimeSaveService from "../../../../services/excel-registrations/real-time-save";
import {PRODUCT_REGISTRATION_TEMP_STORAGE_KEY} from "../../../../utils/constants";
import {useSelector} from "react-redux";
import ProductDisplayingTable from "./table";


export const ProductsModalDisplay = ({items, setItems, save, saveAllLoading, setSupplyValues, supplyValues}) => {

    const [showEdit, setSowEdit] = useState(false);

    const [values, setValues] = useState(null)
    const [supply_price, setSupplyPrice] = useState(1)
    const [currItem, setCurrItem] = useState(null)
    const [selectedValues, setSelectedValues] = useState(null)
    const [imgFiles, setImgFiles] = useState(null)
    const [isFormValid, setIsFormValid] = useState(false)
    const [employees, setEmployees] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const authUser = useSelector(state => state.authUser)

    const [alert, setAlert] = useState({message: "", class: "", status: "", show: false})

    const handleUploadPictures = (files) => {
        setImgFiles(files)
    }

    useEffect(() => {
        SuppliersDataService.getStatusedUnPaginated("ACTIVE").then((res) => {
            setSuppliers(res.data)
        }).catch(e => console.log(e))

    }, [])

    useEffect(() => {
        if (authUser.id)
            setSupplyValues({...values, reciever: authUser.id})
    }, [authUser])


    const handleSetItem = (item) => {
        setSowEdit(true)
        setValues(item.value)
        setCurrItem(item)
        setSupplyPrice(item.supply_price);
    }
    const [loading, setLoading] = useState(false)

    const handleSave = async () => {
        setLoading(false)
        var new_items = [...items];


        if (supply_price < 2) {
            alertFailer(setAlert, "Supply Price should be greater than 1")
        } else {
            let item_index = new_items.findIndex(x => x.id === currItem.id)
            new_items[item_index].value = values
            new_items[item_index].status = "OK"
            setAlert({message: "", class: "", status: "", show: false})
            setItems(new_items);
            setSowEdit(false);
        }
    }

    const [deleteLoading, setDeleteLoading] = useState(false)
    // useBeforeunload(() => "Are you sure to close this tab?");

    const handleRemove = () => {
        var new_items = [...items];
        var item_index = new_items.findIndex(x => x.id === currItem.id)
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
        // Cancel the event
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

    const handleChange = (prop) => ({value, valid: validProp}) => {
        if (prop === "supply_price") {
            setSupplyPrice(value);
        } else {
            setSupplyValues({...supplyValues, [prop]: value});
        }
    }


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

                        {!showEdit ?
                            <div className="table-responsive col-12">
                                <ReactHTMLTableToExcel
                                    id="test-table-xls-button"
                                    className="btn btn-outline-danger btn-dark mb-3"
                                    table="table-to-xls"
                                    filename="tablexls"
                                    sheet="tablexls"
                                    buttonText="Download as XLS"/>
                                <ProductDisplayingTable setItems={setItems} setCurrItem={setCurrItem} items={items}
                                                        handleRemove={handleRemove} handleSetItem={handleSetItem}/>
                            </div> :

                            <div className={"container"}>
                                <div className={"row justify-content-center"}>
                                    <div className={"col-10 border-dark rounded-pill p-3"}>
                                        {values && <FormLayout
                                            Content={<FormContent setImgFiles={setImgFiles}
                                                                  setIsFormValid={setIsFormValid}
                                                                  setValues={setValues}
                                                                  values={values}
                                                                  item={currItem}
                                                                  includeSupply={true}
                                                                  handleChangeSupply={handleChange}
                                                                  supply_price={supply_price}
                                                                  status="edit"
                                                                  handleUploadPictures={handleUploadPictures}
                                                                  imgFiles={imgFiles}

                                            />}
                                            loading={false}
                                            setLoading={setLoading}
                                            alert={alert} title={"Edit Product Details"} setAlert={setAlert}
                                            btnTxt="  DONE  "
                                            disable={isFormValid} callFun={handleSave}/>}
                                    </div>
                                </div>
                            </div>
                        }

                        {!showEdit ?
                            <div className="form-row row-cols-md-2 justify-content-md-between justify-content-center">
                                <div className="form-group col-md-5 col-10">
                                    <SelectControl handleChangeV2={handleChange("supplier")}
                                                   value={supplyValues.supplier}
                                                   label="Select the suppler"
                                                   placeholder=" - select the supplier - ">
                                        <option value={""}>Select Supplier</option>

                                        {
                                            suppliers.map((item) =>
                                                <option value={item._id} key={item._id}> {item.user.username} </option>)
                                        }
                                    </SelectControl>
                                </div>
                                {/*<div className="form-group  col-md-6 col-10  pl-md-5">*/}
                                {/*    <SelectControl handleChangeV2={handleChange("reciever")}*/}
                                {/*                   value={supplyValues.reciever}*/}
                                {/*                   label="Select the employee"*/}
                                {/*                   placeholder=" - select the employee - ">*/}
                                {/*        <option value={""}>Select Employee</option>*/}
                                {/*        {*/}
                                {/*            employees.map((item) =>*/}
                                {/*                <option value={item._id} key={item._id}> {item.user.username} </option>)*/}
                                {/*        }*/}
                                {/*    </SelectControl>*/}
                                {/*</div>*/}
                            </div> : <></>}
                    </div>
                    <div className="modal-footer">


                        {!showEdit ?
                            <>
                                <button type="button" className="btn btn-danger"
                                        onClick={() => save()}>{saveAllLoading ? (
                                    <img
                                        src={"/img/loader.gif"}
                                        alt={"Loading"}
                                        className={"loader"}
                                    />
                                ) : "SAVE ALL"}
                                </button>
                            </>
                            :
                            <button type="button" className="btn btn-secondary"
                                    onClick={() => setSowEdit(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                    <path fill="none" d="M0 0h24v24H0z"/>
                                    <path d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z"
                                          fill="rgba(255,255,255,1)"/>
                                </svg>
                                <span className={"px-2"}>Back</span></button>
                        }
                    </div>
                </div>

            </div>
            <DeleteConfirmation item={currItem} deleteItem={handleRemove} alert={alert} loading={deleteLoading}
                                setLoading={setDeleteLoading} setAlert={setAlert}/>

            <ConfirmationModal continueAction={hideModal} loading={loading} setLoading={setLoading}
                               message={"Are you sure , you want to close this modal"}
                               alert={"All uploaded data will be forgotten"} btnColor={"btn-danger"}/>
        </div>
    )
}

export default ProductsModalDisplay;