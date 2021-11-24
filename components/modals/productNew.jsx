import React, {useEffect, useState} from "react";
import {FormContent} from "../../pages/admin/products/new";
import FormLayout from "../../layouts/form-layout";
import productCategoriesService from "../../services/product-categories/product-categories.service";
import ModelsService from "../../services/product-models/product-models.service";
import DeleteConfirmation from "../tables/delete-confirmation-modal";
import {hide_modal, show_modal} from "../../utils/modal-funs";
import {alertFailer, notifyError} from "../../utils/alerts";
import ConfirmationModal from "../tables/confirmation-modal";
import $ from "jquery";
import SparePartService from "../../services/products/products.service";
import styles from "../../styles/pages/table.module.css";
import SuppliersDataService from "../../services/supplies/suppliers";
import EmployeeService from "../../services/employees/employees"
import SelectControl from "../reusable/SelectControl";
import {isThisFormValid} from "../../utils/functions";
import InputControl from "../reusable/InputControl";
import Router, {useRouter} from "next/router";
import {useBeforeUnload} from "react-use";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import RealTimeSaveService from "../../services/excel-registrations/real-time-save";
import {SPARE_PART_REGISTRATION_TEMP_STORAGE_KEY} from "../../utils/constants";


const Row = ({d, items, item, index, setItem, status, setCurrItem, supplyInfo}) => {
    const [sub_categories, setSubCategories] = useState([]);

    const [modelYears, setModelYears] = useState([])


    useEffect(() => {

        d.categories.map((item) => {

            productCategoriesService.getSubcategory(item.sub_category)
                .then((res) => {
                    setSubCategories(old => [...old, res.data])
                }).catch(e => console.log(e))

            ModelsService.getModelById(item.model)
                .then((res) => {
                    setModelYears(old => [...old, {
                        model: res.data,
                        yearRange: item.release_years[0] + "-" + item.release_years[item.release_years.length - 1]
                    }])
                }).catch(e => console.log(e));
        })

    }, [items])


    return (
        <tr>
            <td>{index + 1}</td>
            <td>{item.value?.name}</td>
            <td>{item.value?.part_number}</td>
            <td>{item.value?.part_code}</td>
            <td>{item.value?.weight}</td>
            <td>{item?.quantity}</td>
            <td>{item?.supply_price}</td>
            <td>
                <ul>
                    {
                        modelYears?.map((item) => <li
                            key={item}>{item?.model.company.name + " > " + item?.model.name + " " + item?.yearRange}</li>)
                    }
                </ul>
            </td>
            <td>
                {item.vehicle}
            </td>
            <td>
                  <span className="btn"
                        onClick={() => {
                            item.status !== "EXISTS" ? setItem(item) : {}
                        }}><svg xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="16" height="16"><path
                      fill="none" d="M0 0h24v24H0z"/><path
                      d="M9.243 19H21v2H3v-4.243l9.9-9.9 4.242 4.244L9.242 19zm5.07-13.556l2.122-2.122a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414l-2.122 2.121-4.242-4.242z"
                      fill="rgba(50,152,219,1)"/></svg>
                </span>

                <span className="btn"
                      onClick={() => {
                          setCurrItem(item.value);
                          show_modal('#deleteConfirmationModal');
                      }}><svg
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16"
                    height="16"><path fill="none" d="M0 0h24v24H0z"/><path
                    d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-4.586 6l1.768 1.768-1.414 1.414L12 15.414l-1.768 1.768-1.414-1.414L10.586 14l-1.768-1.768 1.414-1.414L12 12.586l1.768-1.768 1.414 1.414L13.414 14zM9 4v2h6V4H9z"
                    fill="rgba(231,76,60,1)"/></svg></span>

            </td>
            <td className={styles.td}>
                        <span
                            className={(status === 'OK') ? "" : (status === 'EXISTS') ? styles.pending : (status === 'INCOMPLETE') ? styles.inactive : (status === 'DUPLICATE') ? styles.purple : ''}>
                                       {status === "OK" ?
                                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32"
                                                height="32">
                                               <path fill="none" d="M0 0h24v24H0z"/>
                                               <path
                                                   d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-.997-6l7.07-7.071-1.414-1.414-5.656 5.657-2.829-2.829-1.414 1.414L11.003 16z"
                                                   fill="rgba(47,204,113,1)"/>
                                           </svg> : status}
                        </span>
            </td>
        </tr>
    )
}


export const ModalDisplay = ({items, setItems, save, saveAllLoading, setSupplyValues, supplyValues}) => {

    console.log(items)
    const [showEdit, setSowEdit] = useState(false);

    const [values, setValues] = useState(null)
    const [supply_price, setSupplyPrice] = useState(1)
    const [currItem, setCurrItem] = useState(null)
    const [selectedValues, setSelectedValues] = useState(null)
    const [imgFiles, setImgFiles] = useState(null)
    const [isFormValid, setIsFormValid] = useState(false)
    const [employees, setEmployees] = useState([]);
    const [suppliers, setSuppliers] = useState([]);

    const [alert, setAlert] = useState({message: "", class: "", status: "", show: false})

    const handleUploadPictures = (files) => {
        setImgFiles(files)
    }

    useEffect(() => {
        SuppliersDataService.getStatusedUnPaginated("ACTIVE").then((res) => {
            setSuppliers(res.data)
        }).catch(e => console.log(e))

        EmployeeService.getStatused("ACTIVE")
            .then((res) => {
                setEmployees(res.data)
            }).catch(e => console.log(e))
    }, [])


    const handleSetItem = (item) => {
        setSowEdit(true)
        setValues(item.value)
        setCurrItem(item.value)
        setSupplyPrice(item.supply_price);
    }
    const [loading, setLoading] = useState(false)

    const handleSave = async () => {
        setLoading(false)
        var new_items = [...items];

        let items_exists = new_items.filter((item) => item.value.part_number === values.part_number)

        if (items_exists.length < 2) {

            if (supply_price < 2) {
                alertFailer(setAlert, "Supply Price should be greater than 1")
            } else {
                var item_index = new_items.findIndex(x => x.value.part_number === currItem.part_number)
                new_items[item_index].value = values
                new_items[item_index].imgUrls = imgFiles
                new_items[item_index].supply_price = supply_price

                try {
                    const res = await SparePartService.partNumberExists(new_items[item_index].value.part_number);
                    if (res.data.exists) {
                        new_items[item_index].status = "EXISTS"
                        new_items[item_index].existsObj = res.data.object;
                    } else {
                        new_items[item_index].status = "OK"
                    }
                } catch (e) {
                    console.log(e)
                }
                setAlert({message: "", class: "", status: "", show: false})
                setItems(new_items);
                setSowEdit(false);

            }

        } else {
            alertFailer(setAlert, "DUPLICATE ERROR: another item has this part-number")
            new_items.filter((item) => item.value.part_number === values.part_number).map((item) => {
                notifyError(item.value.name)
            })
        }


    }

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
            RealTimeSaveService.removeData(SPARE_PART_REGISTRATION_TEMP_STORAGE_KEY);
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
                                <table className="table container rounded border-danger border-1 table-bordered"
                                       id="table-to-xls">
                                    <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">PART NAME</th>
                                        <th scope="col">PART NUMBER</th>
                                        <th scope="col">PART CODE</th>
                                        <th scope="col">WEIGHT</th>
                                        <th scope="col">QUANTITY</th>
                                        <th scope="col">SUPPLY-PRICE</th>
                                        <th scope="col">MODEL-YEARS</th>
                                        <th scope="col">VEHICLE</th>
                                        <th scope="col">ACTION</th>
                                        <th scope="col">STATUS</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {items.map((d, index) => (
                                        <Row d={d.value} key={d} items={items} setItems={setItems} index={index}
                                             setCurrItem={setCurrItem}
                                             item={d}
                                             supplyInfo={{quantity: d.quantity, supply_price: d.supply_price}}
                                             status={d.status} handleRemove={handleRemove}
                                             setItem={handleSetItem}/>
                                    ))}
                                    </tbody>
                                </table>
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
                                            alert={alert} title={"Edit Spare Part Details"} setAlert={setAlert}
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
                                <div className="form-group  col-md-6 col-10  pl-md-5">
                                    <SelectControl handleChangeV2={handleChange("reciever")}
                                                   value={supplyValues.reciever}
                                                   label="Select the employee"
                                                   placeholder=" - select the employee - ">
                                        <option value={""}>Select Employee</option>
                                        {
                                            employees.map((item) =>
                                                <option value={item._id} key={item._id}> {item.user.username} </option>)
                                        }
                                    </SelectControl>
                                </div>
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