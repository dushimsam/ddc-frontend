import React, {useEffect, useRef, useState} from "react";
import ProductsService from "../../services/products/products.service";
import SparePartService from "../../services/products/products.service"
import InputControl from "../reusable/InputControl";
import {isThisFormValid} from "../../utils/functions";
import {alertFailer, alertSuccess} from "../../utils/alerts"
import Alert from "../alert";
import {hide_modal_alert} from "../../utils/modal-funs";
import Select from "react-select";
import {mainCustomStyles} from "../reusable/select-elements";
import AsyncSelect from "react-select/async";

const fetchData = (inputValue, callback) => {
    setTimeout(() => {
        if (inputValue) {
            SparePartService.searchPaginatedSpareParts(inputValue.trim(), 1, 30).then((res) => {
                const data = res.data.docs;
                const tempArray = [];
                if (data) {
                    if (data.length) {
                        data.forEach((element) => {
                            tempArray.push({
                                label: `${element.name} , ${element.part_number} , ${element.part_code}`,
                                value: element
                            });
                        });
                    } else {
                        tempArray.push({
                            label: `${data.name} , ${data.part_number} , ${data.part_code}`,
                            value: data._id,
                        });
                    }
                }
                callback(tempArray);
            }).catch(e => console.log(e))
        } else {
            callback([])
        }

    }, 1000);
};

export default function SelectProduct({editSet, flush, appendPartSupply, suppliedParts}) {
    const [spareParts, setSpareParts] = useState([])
    const [values, setValues] = useState({
        spare_part: "",
        quantity: 1,
        unit_price: undefined,
        supply_price: undefined,
    })


    useEffect(() => {

        setValues({
            spare_part: "",
            quantity: 1,
            unit_price: 0,
            supply_price: 0
        })

        setValid({
            spare_part: true,
            quantity: true,
            unit_price: false,
            supply_price: false
        })

    }, [flush])
    const [isLoading, setIsLoading] = useState(true)

    // useEffect(() => {
    //     setLoading(false)
    //     ProductsService.getAllSpareParts()
    //         .then((res) => {
    //             setSpareParts(res.data);
    //             setIsLoading(false);
    //         })
    //         .catch((e) => console.log(e));
    //
    //     if (editSet) {
    //         setValues(editSet);
    //         console.log(editSet)
    //     }
    // }, [editSet]);

    const [isFormValid, setIsFormValid] = useState(false)

    const [valid, setValid] = useState({
        spare_part: false,
        quantity: true,
        unit_price: false,
        supply_price: false
    })

    const [not_on_market, setNotMarket] = useState(false);

    const handleChange = (prop) => ({value, valid: validProp}) => {
        if (prop === "quantity")
            setValues({...values, [prop]: parseInt(value)});
        else if (prop === "unit_price" || prop === "supply_price")
            setValues({...values, [prop]: parseFloat(value)});

        setValid(state => ({...state, [prop]: validProp}));
        setIsFormValid(isThisFormValid(valid))
    }

    const [alert, setAlert] = useState({message: "", class: "", show: false})
    const [loading, setLoading] = useState(false)

    const [loadComponent, setLoadComponent] = useState(false)

    const addNewPartSupply = () => {

        if (values.unit_price < values.supply_price) {
            if (not_on_market)
                alertFailer(setAlert, "Sorry the unit Supply price can not be greater than the unit-price at the market");
            else
                alertFailer(setAlert, "Please tell the admin to Increase the unit-price at the market because the unit-supply-price is exceeding");
        } else {
            if (isThisFormValid(valid)) {
                if (!suppliedParts.some(part => part.spare_part._id === values.spare_part._id)) {
                    let temp_values = {...values};

                    if (values.quantity) temp_values.quantity = values.quantity
                    else temp_values.quantity = 1;

                    appendPartSupply(temp_values)
                    alertSuccess(setAlert, values.spare_part.name + " is Added")
                } else {
                    alertFailer(setAlert, "Spare Part Already Exists on the List");
                }
            } else {
                alertFailer(setAlert, "Validation Error");
            }
            hide_modal_alert(setAlert);
        }
        setLoading(false)
    }
    const selectInputRef = useRef();

    const onClear = () => {
        selectInputRef.current.select.clearValue();
    };

    const [selectedPart, setSelectedPart] = useState(null);

    const [hideInput, setHideInput] = useState(true);

    const handleChangeProduct = newValue => {
        if (newValue) {
            setLoadComponent(true);
            SparePartService.getSparePartDetails(newValue._id)
                .then((res) => {
                    if ('partOnMarket' in res.data) {
                        setHideInput(true);
                        setValid(state => ({...state, ["unit_price"]: true}));
                        setValues(state => ({...state, ["unit_price"]: parseFloat(res.data.partOnMarket.unit_price)}));
                    } else {
                        setHideInput(false);
                        setValid(state => ({...state, ["unit_price"]: false}));
                        setValues(state => ({...state, ["unit_price"]: ""}));
                        setNotMarket(true)
                    }
                }).catch((err) => console.log(err)).finally(() => setLoadComponent(false))

            setValues({...values, ["spare_part"]: newValue});
            setSelectedPart(newValue)
            setValid(state => ({...state, ["spare_part"]: true}));
        }

    };


    return (
        <>
            {/*<h3 className="text-center mb-5">Add a new supplied product</h3>*/}
            {/*<hr/>*/}
            <div>
                {alert.show ?
                    <Alert className={"my-3 alert-" + alert.class} message={alert.message} setAlert={setAlert}/> : null
                }
                <div className="row">

                    <div className="col-md-10 col-12">
                        <label htmlFor="inputI">Search Spare part</label>
                        <AsyncSelect
                            ref={selectInputRef}

                            // value={selectedPart}
                            styles={mainCustomStyles}
                            loadOptions={fetchData}
                            placeholder="Select the Spare part"
                            onChange={(e) => {
                                handleChangeProduct(e.value);
                            }}
                            defaultOptions={true}
                        />
                    </div>
                    <div className="col-md-5 col-8">
                        <InputControl label="Quantity" type="number" validations="required|integer|min:1"
                                      className="form-control" placeholder="Quantity"
                                      handleChangeV2={handleChange("quantity")} value={values.quantity}/>
                    </div>
                    <div className="col-md-5 col-8">
                        <InputControl label="Unit Supply Price" type="number"
                                      validations="required|regex:/^-?\d*(\.\d+)?$/" step="0.01" id="unitPrice"
                                      className="form-control" placeholder="Unit price"
                                      handleChangeV2={handleChange("supply_price")} value={values.supply_price}/>
                    </div>

                    <div className="col-md-5 col-8 mt-3">
                        {
                            loadComponent ?
                                <img
                                    src={"/img/loader.gif"}
                                    alt={"Loading"}
                                    style={{width: "60px", height: "60px", background: "black"}}
                                    className={"loader"}
                                /> :
                                !hideInput ?
                                    <InputControl label="Unit Price on Market" type="number"
                                                  validations="required|integer|min:1" id="unitPrice"
                                                  className="form-control" placeholder="Unit price"
                                                  handleChangeV2={handleChange("unit_price")}
                                                  value={values.unit_price}/> : <></>
                        }
                    </div>
                </div>
                <div>
                    <button className="btn btn-danger mt-5" disabled={!isThisFormValid(valid)} onClick={() => {
                        setLoading(true);
                        addNewPartSupply();
                    }}>
                        {editSet?.spare_part ? "Edit spare part " : "Add spare part"}

                        {loading ?
                            <img
                                src={"/img/loader.gif"}
                                alt={"Loading"}
                                className={"loader"}
                            />
                            : editSet?.spare_part ? "Edit spare part " : "Add spare part"}
                    </button>
                    <button id="closeModalBtn" className="d-none" data-dismiss="modal" aria-label="Close"></button>
                </div>
            </div>
        </>
    )
}