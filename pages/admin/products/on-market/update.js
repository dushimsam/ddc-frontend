import SparePartService from "../../../../services/products/ProductService";
import React, {useEffect, useState} from "react";
import UpdateFormLayout from "../../../../layouts/table-layouts/update-form-layout"
import InputControl from "../../../../components/reusable/InputControl"
import FormLayout from "../../../../layouts/form-layout"
import {alertFailer, alertSuccess} from "../../../../utils/alerts"
import {isThisFormValid} from "../../../../utils/functions";
import {hide_current_modal, hide_modal_alert} from "../../../../utils/modal-funs";
import SuppliedPartsDataService from "../../../../services/supplies/SuppliedProductsService";
import SupplyService from "../../../../services/supplies/SupplyService"

export const FormContent = ({setIsFormValid, setValues, values, status, latest_supply_price, setLatestSupplyPrice}) => {

    const [valid, setValid] = useState({
        unit_price: !!status
    })

    useEffect(() => {
        setIsFormValid(isThisFormValid(valid))
    }, [valid])


    const handleChangeV2 = (prop) => ({value, valid: validProp}) => {
        if (prop === "supply_price") {
            setLatestSupplyPrice(value);
        } else {
            setValues({...values, [prop]: value});
            setValid(state => ({...state, [prop]: validProp}));
        }

    };

    return (
        <div className="form-row justify-content-between">
            <div className="form-group col-md-8 col-12">
                <InputControl handleChangeV2={handleChangeV2("unit_price")} step="0.01" value={values.unit_price}
                              min={1} label="Unit price in Rwf" type="number"
                              validations="required|regex:/^-?\d*(\.\d+)?$/"/>
            </div>


            {/* <div className="form-group col-md-8 col-12">
                <InputControl handleChangeV2={handleChangeV2("supply_price")} step="0.01"
                              value={latest_supply_price}
                              min={1} label="Latest Supply Price" type="number"
                              validations="required|regex:/^-?\d*(\.\d+)?$/"/>
            </div> */}
        </div>

    );
};


const Content = ({item, getInitialData}) => {
    const [alert, setAlert] = useState({message: "", class: "", status: "", show: false})
    const [isFormValid, setIsFormValid] = useState(false)
    const [loading, setLoading] = useState(false);

    const [latest_supply_price, setLatestSupplyPrice] = useState(0);
    const [suppliedPartDetails, setSuppliedPartDetails] = useState({})
    const [supplyDetails, setSupplyDetails] = useState({});


    const [values, setValues] = useState({
        unit_price: 1,
        tax: 0,
        quantity: 1,
    });


    useEffect(() => {
        SparePartService.getPartOnMarketById(item._id)
            .then((res) => {
                setValues({
                    tax: res.data.tax,
                    unit_price: res.data.unit_price,
                    quantity: res.data.quantity
                })
            }).catch(err => console.log(err))

        const lastItem = item.supplies[item.supplies.length - 1].supplied_product;
        setSuppliedPartDetails(lastItem);
        setLatestSupplyPrice(lastItem.supply_price / lastItem.quantity)

        SupplyService.get(lastItem.product_supply)
            .then((res) => {
                setSupplyDetails(res.data)
            }).catch(e => console.log(e))
        // console.log("supplies ", item.part_in_stock)
        // console.log("latest supply", item.part_in_stock.supplies[item.part_in_stock.supplies.length - 1])
    }, [item])

    const Update = () => {
        // console.log("Supply  price to be posted ", (supplyDetails.supply_price - suppliedPartDetails.supply_price) + (parseFloat(latest_supply_price) * suppliedPartDetails.quantity))
        let update_values = {...values};
        update_values.complete_info_status = "COMPLETE";

        SparePartService.updatePartOnMarket(item._id, update_values)
            .then((res) => {

                        alertSuccess(setAlert, "Product on the market updated");
                        getInitialData()
                        hide_current_modal(setAlert, '#itemUpdateModal')
            }).catch((e) => {
            alertFailer(setAlert, e.response ? e.response.data.message : e.message || "Error occurred. Try again latter.");
            hide_modal_alert(setAlert);
        }).finally(() => {
            setLoading(false)
        })

    }

    return (
        <div className="container-fluid p-3">
            <div className="row">
                <div className="col-10 align-self-center">
                    <FormLayout
                        Content={<FormContent setIsFormValid={setIsFormValid} latest_supply_price={latest_supply_price}
                                              setLatestSupplyPrice={setLatestSupplyPrice}
                                              setValues={setValues} values={values}
                                              status={"update"}/>} alert={alert}

                        title={"Update Unit Price for "+item?.product.name} setAlert={setAlert} btnTxt="Update"
                        disable={isFormValid} callFun={Update} loading={loading} setLoading={setLoading}/>
                </div>
            </div>
        </div>
    );
};


const Update = ({item, getInitialData}) => {
    return <UpdateFormLayout Content={<Content item={item} getInitialData={getInitialData}/>}
                             title={"CHANGE PRODUCT-ON-MARKET UNIT PRICE'S DETAILS"}/>
}

export default Update