import React, {useEffect, useRef, useState} from "react";
import ProductsService from "../../services/products/ProductService";
import ProductService from "../../services/products/ProductService";
import InputControl from "../reusable/InputControl";
import {isThisFormValid} from "../../utils/functions";
import {alertFailer, alertSuccess} from "../../utils/alerts"
import Alert from "../alert";
import {hide_modal_alert} from "../../utils/modal-funs";
import {mainCustomStyles} from "../reusable/select-elements";
import AsyncSelect from "react-select/async";

const fetchData = (inputValue, callback) => {
    setTimeout(() => {
        if (inputValue) {
            ProductsService.searchPaginatedProducts(inputValue.trim(), 1, 30).then((res) => {
                const data = res.data.docs;
                const tempArray = [];
                if (data) {
                    if (data.length) {
                        data.forEach((element) => {
                            tempArray.push({
                                label: `${element.name}  , ${element.product_code}`,
                                value: element
                            });
                        });
                    } else {
                        tempArray.push({
                            label: `${data.name} , ${data.product_code}`,
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

export default function SelectProduct({editSet, flush, appendProductSupply, suppliedProducts}) {
    const [products, setProducts] = useState([])
    const [values, setValues] = useState({
        product: "",
        quantity: 1,
        unit_price: undefined,
        supply_price: undefined,
        tax: undefined
    })
    const [valid, setValid] = useState({
        product: false,
        quantity: true,
        unit_price: false,
        supply_price: false,
        tax: false
    })

    useEffect(() => {

        setValues({
            product: "",
            quantity: 1,
            unit_price: 0,
            supply_price: 0,
            tax: 0
        })

        setValid({
            product: true,
            quantity: true,
            unit_price: false,
            supply_price: false,
            tax: false
        })

    }, [flush])
    const [isLoading, setIsLoading] = useState(true)

    const [isFormValid, setIsFormValid] = useState(false)


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
                if (!suppliedProducts.some(item => item.product._id === values.product._id)) {
                    let temp_values = {...values};

                    if (values.quantity) temp_values.quantity = values.quantity
                    else temp_values.quantity = 1;

                    appendProductSupply(temp_values)
                    alertSuccess(setAlert, values.product.name + " is Added")
                } else {
                    alertFailer(setAlert, "Product Already Exists on the List");
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

    const [selectedProduct, setSelectedProduct] = useState(null);

    const [hideInput, setHideInput] = useState(true);

    const handleChangeProduct = newValue => {
        if (newValue) {
            setLoadComponent(true);
            ProductService.getByProductExists(newValue._id)
                .then((res) => {
                    if (res.data.exists) {
                        setHideInput(true);
                        setValid(state => ({...state, ["unit_price"]: true}));
                        setValues(state => ({...state, ["unit_price"]: parseFloat(res.data.unit_price)}));
                    } else {
                        setHideInput(false);
                        setValid(state => ({...state, ["unit_price"]: false}));
                        setValues(state => ({...state, ["unit_price"]: ""}));
                        setNotMarket(true)
                    }
                }).catch((err) => console.log(err)).finally(() => setLoadComponent(false))

            setValues({...values, ["product"]: newValue});
            setSelectedProduct(newValue)
            setValid(state => ({...state, ["product"]: true}));
        }

    };


    return (
        <>
            <div>
                {alert.show ?
                    <Alert className={"my-3 alert-" + alert.class} message={alert.message} setAlert={setAlert}/> : null
                }
                <div className="row">

                    <div className="col-md-10 col-12">
                        <label htmlFor="inputI">Search Product</label>
                        <AsyncSelect
                            ref={selectInputRef}
                            styles={mainCustomStyles}
                            loadOptions={fetchData}
                            placeholder="Select the Product"
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
                                    <>
                                        <div><InputControl label="Unit Price on Market" type="number"
                                                           validations="required|integer|min:1" id="unitPrice"
                                                           className="form-control" placeholder="Unit price"
                                                           handleChangeV2={handleChange("unit_price")}
                                                           value={values.unit_price}/></div>
                                        <div><InputControl
                                            label="Customer Tax" type="number"
                                            validations="required|integer|min:1" id="customerTax"
                                            className="form-control" placeholder="Tax"
                                            handleChangeV2={handleChange("tax")}
                                            value={values.tax}/></div>
                                    </> : <></>
                        }
                    </>
                </div>
                <div>
                    <button className="btn btn-danger mt-5" disabled={!isThisFormValid(valid)} onClick={() => {
                        setLoading(true);
                        addNewPartSupply();
                    }}>
                        {editSet?.product ? "Edit product " : "Add product"}

                        {loading ?
                            <img
                                src={"/img/loader.gif"}
                                alt={"Loading"}
                                className={"loader"}
                            />
                            : editSet?.product ? "Edit product  " : "Add product"}
                    </button>
                    <button id="closeModalBtn" className="d-none" data-dismiss="modal" aria-label="Close"/>
                </div>
            </div>
        </>
    )
}