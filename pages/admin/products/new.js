import SparePartService from "../../../services/products/ProductService";
import React, {useEffect, useRef, useState} from "react";
import productCategoriesService from "../../../services/product-categories/product-categories.service";
import FormLayout from "../../../layouts/form-layout"
import InputControl from "../../../components/reusable/InputControl"
import SingleSubModuleLayout from "../../../layouts/admin-layouts/SingleSubModule";
import {isThisFormValid} from "../../../utils/functions";
import {alertFailer, alertSuccess, notifyError, notifyInfo, notifySuccess} from "../../../utils/alerts"
import {ALERT_EXPIRATION_PERIOD, SPARE_PART_REGISTRATION_TEMP_STORAGE_KEY} from "../../../utils/constants";
import {hide_modal, hide_modal_alert} from "../../../utils/modal-funs";
import * as XLSX from "xlsx";
import $ from "jquery";
import {ImagesSuperContainer} from "../../../components/management/products/create";
import {acceptedFileTypes} from "../../../utils/image-utils";
import SuppliesDataService from "../../../services/supplies/SupplyService";
import SuppliedPartsDataService from "../../../services/supplies/SuppliedProductsService";
import {useRouter} from "next/router";
import RealTimeSaveService from "../../../services/excel-registrations/real-time-save"
import SelectControl from "../../../components/reusable/SelectControl";


export const FormContent = ({
                                setIsFormValid, setValues, values, defaultFiles, setDefaultFiles,
                                status, handleUploadPictures, getInitialData,
                                imgFiles, item, setImgFiles
                            }) => {


    const [valid, setValid] = useState({
        name: !!status,
        product_code: !!status,
        product_category: !!status,
        weight: true
    });


    useEffect(() => {
        setIsFormValid(isThisFormValid(valid))
    }, [valid])

    const handleChangeV2 = (prop) => ({value, valid: validProp}) => {
        setValues({...values, [prop]: value});
        setValid(state => ({...state, [prop]: validProp}))
    }


    const [categories, setCategories] = useState([])

    useEffect(() => {
        productCategoriesService.getAllProductCategories()
            .then((res) => {
                setCategories(res.data)
            }).catch(e => console.log(e))
    }, []);


    return (
        <React.Fragment>
            <div className="form-row row-cols-md-2 justify-content-md-between justify-content-center">
                <div className="form-group col-md-5 col-10">
                    <InputControl handleChangeV2={handleChangeV2("name")} value={values.name}
                                  label="Product name"
                                  type="text" validations="required|string|min:3"/>
                </div>
                <div className="form-group  col-md-5 col-10">
                    <InputControl handleChangeV2={handleChangeV2("product_code")} value={values.product_code}
                                  label="Product code" type="text" validations="required|string|min:3"/>
                </div>

                <div className="form-group  col-md-5 col-10">
                    <InputControl handleChangeV2={handleChangeV2("description")}
                                  value={values?.description} label="Description" type="text"
                                  validations="string|min:3"/>
                </div>

                <div className="form-group col-md-5 col-10">
                    <InputControl label={"Select the weight in Kg"} handleChangeV2={handleChangeV2("weight")}
                                  value={values.weight} type="number" validations="required|integer|min:1"/>
                </div>
                <div className="form-group  col-md-5 col-10">
                    <label htmlFor="is_second_hand">Condition</label>
                    <select value={values?.second_hand} name="is_second_hand" id="is_second_hand"
                            className="form-control"
                            onChange={(event) => setValues({...values, second_hand: event.target.value})}>
                        <option value={false}>NEW</option>
                        <option value={true}>USED</option>
                    </select>
                </div>

                <div className="form-group  col-md-5 col-10">
                    <SelectControl label="Brand" handleChangeV2={handleChangeV2("product_category")}
                                   value={values.product_category} validations="required|string">
                        <option value="">Select Brand</option>
                        {categories.map((item) => (
                            <option value={item._id} key={item._id}>
                                {item.name}
                            </option>
                        ))}
                    </SelectControl>
                </div>
            </div>

            {
                status !== "edit" ?
                    <div className="form-row row-cols-12 justify-content-center justify-content-md-start mt-4">
                        <div className="form-group col-5">
                            <label htmlFor="images">
                                <h6 className={"font-weight-bold"}> {status !== "update" ? "Select Images" : "Add More Images"}</h6>
                            </label>
                            <input
                                type="file"
                                className="form-control-file"
                                hidden={true}
                                name="images"
                                id="images"
                                accept={acceptedFileTypes}
                                multiple={true}
                                onChange={(e) =>
                                    handleUploadPictures(e.target.files)
                                }
                                onClick={(event) => {
                                    event.target.value = null
                                }}
                            /><br/>
                            <div className="bg-secondary d-inline-block p-4 cursor-pointer rounded shadow-sm"
                                 onClick={() => {
                                     document.getElementById("images").click()
                                 }}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
                                    <path fill="none" d="M0 0h24v24H0z"/>
                                    <path
                                        d="M9 3h6l2 2h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4l2-2zm3 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12zm0-2a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"
                                        fill="rgba(236,240,241,1)"/>
                                </svg>
                            </div>
                        </div>
                        <div className="col-12">
                            <ImagesSuperContainer getInitialData={getInitialData} imgFiles={imgFiles}
                                                  setImgFiles={setImgFiles}
                                                  status={status} item={item} defaultFiles={defaultFiles}
                                                  setDefaultFiles={setDefaultFiles}/>
                        </div>
                    </div> : <></>

            }

        </React.Fragment>
    );
};

const Content = ({totals, setTotals}) => {
        const [alert, setAlert] = useState({message: "", class: "", show: false})
        const [values, setValues] = useState({
            name: "",
            product_code: "",
            second_hand: false,
            product_category: "",
            weight: 1
        });
        const [isFormValid, setIsFormValid] = useState(false)

        const [loading, setLoading] = useState(false);
        let imagesContainer = useRef(null);

        const [imgFiles, setImgFiles] = useState(null)


        const handleUploadPictures = (files) => {
            setImgFiles(files)
        }

        const Create = () => {

            let temp_values = Object.assign({}, values);
            temp_values.product_code = temp_values.product_code.trim();
            temp_values.name = temp_values.name.trim();

            SparePartService.createProduct(temp_values)
                .then((res) => {

                    if (imgFiles) {
                        for (let i = 0; i < imgFiles.length; i++) {
                            const formData = new FormData();
                            formData.append("image", imgFiles[i]);
                            SparePartService.addImage(res.data._id, formData)
                                .then((res1) => {
                                })
                                .catch((e) => {
                                    alertFailer(setAlert, e.response ? e.response.data.message : e.message || "Error occurred. Try again latter.")
                                }).finally(() => {
                                setLoading(false)
                            })
                        }
                    }


                    alertSuccess(setAlert, "Spare-part  created");
                    setTotals({...totals, spareParts: totals.spareParts + 1})

                    window.setTimeout(function () {
                        setIsFormValid(false)
                        setValues({
                            name: "",
                            product_code: "",
                            second_hand: false,
                            product_category: "",
                            weight: 0
                        })
                        imagesContainer = null;
                    }, ALERT_EXPIRATION_PERIOD);

                })
                .catch((e) => {
                    alertFailer(setAlert, e.response ? e.response.data.message : e.message || "Error occurred. Try again latter.")
                }).finally(() => {
                setLoading(false)
                hide_modal_alert(setAlert)
            })


        };

        const router = useRouter();

        const [isExisting, setIsExisting] = useState(false);
        const [readItems, setReadItems] = useState([]);


        useEffect(() => {
            let existing_data = RealTimeSaveService.getDecData(SPARE_PART_REGISTRATION_TEMP_STORAGE_KEY);
            if (existing_data.length > 0) {
                setIsExisting(true)
                setReadItems(existing_data);
            }
        }, [])


        const readExcel = (file) => {

            const promise = new Promise((resolve, reject) => {
                const fileReader = new FileReader();
                fileReader.readAsArrayBuffer(file);

                fileReader.onload = (e) => {
                    const bufferArray = e.target.result;

                    const wb = XLSX.read(bufferArray, {type: "buffer"});

                    const wsname = wb.SheetNames[0];

                    const ws = wb.Sheets[wsname];

                    const data = XLSX.utils.sheet_to_json(ws);

                    resolve(data);
                };

                fileReader.onerror = (error) => {
                    reject(error);
                };
            });

            promise.then((d) => {

                let _id = 4500;
                let all_items = []
                // console.log(d)
                d.map((item) => {
                    let value =
                        {
                            value: {
                                complete_info_status: "INCOMPLETE",
                                name: item.PART_NAME?.toString().trim(),
                                part_code: "0001",
                                part_number: (item.PART_NUMBER)?.toString().trim(),
                                // weight: typeof item.WEIGHT === 'undefined' || item.WEIGHT === null ? 1 : parseFloat(item.WEIGHT),
                                weight: 5,
                                categories: [{
                                    sub_category: "6139ce77bff567d16f577287",
                                    model: "61388c6b1868e046039a2f95",
                                    release_years: [2001, 2002, 2003, 2004, 2005]
                                }],
                                second_hand: false
                            },
                            id: _id,
                            quantity: typeof item.QUANTITY === 'undefined' || item.QUANTITY === null ? 0 : parseInt(item.QUANTITY),
                            // supply_price: typeof item.SUPPLY_PRICE === 'undefined' || item.SUPPLY_PRICE === null ? 1 : parseFloat(item.SUPPLY_PRICE),
                            supply_price: 80000,
                            existsObj: "",
                            vehicle: item.VEHICLE,
                            imgUrls: [],
                            status: "OK"
                        }
                    all_items = [...all_items, value]
                    _id += 230;
                })

                all_items.map(async (par_item, index) => {

                    let item_value;

                    if (par_item.value.part_number) {

                        try {
                            const res = await SparePartService.partNumberExists(par_item.value.part_number);
                            if (res.data.exists) {

                                let new_value = all_items[index]
                                new_value.status = "EXISTS"
                                new_value.complete_info_status = "COMPLETE";
                                new_value.id = res.data.object._id;
                                const partExists_res = await SparePartService.getSparePartDetails(res.data.object._id);

                                if ('partOnMarket' in partExists_res.data) {
                                    new_value.unit_price = parseFloat(partExists_res.data.partOnMarket.unit_price);
                                    let supplies = partExists_res.data.partInStock.supplies;
                                    let supplied_part_res = await SuppliedPartsDataService.get(supplies[supplies.length - 1].supplied_part);
                                    new_value.supply_price = parseFloat(supplied_part_res.data.supply_price / supplied_part_res.data.quantity);
                                }

                                all_items[index] = new_value;
                            }

                            let duplicates = all_items.filter((item) => item.value.part_number === par_item.value.part_number)
                            if (duplicates.length > 1) {

                                let total_quantity = duplicates.map(item => item.quantity).reduce((prev, next) => prev + next);
                                let new_value = all_items[index];
                                new_value.quantity = total_quantity;

                                duplicates.map((duplicate, dup_index) => {
                                    if (dup_index > 0) {
                                        let duplicate_index = all_items.indexOf(duplicate);
                                        if (duplicate_index > -1) {
                                            all_items.splice(duplicate_index, 1);
                                        }
                                    }
                                })

                                all_items[index] = new_value;
                            }

                            if (all_items[index]) {
                                setReadItems(old => [...old, all_items[index]]);
                            } else {
                                console.log("err ", all_items[index])
                            }
                        } catch (e) {
                            console.log("Fell in error ", par_item)
                            console.log(e)
                        }
                    }
                });

                $(function () {
                    $("#uploadedModal").modal({backdrop: 'static', keyboard: false});
                });

            });
        };


        const [saveAllLoading, setSaveAllLoading] = useState(false);

        const [supplyValues, setSupplyValues] = useState({supplier: "", reciever: ""});

        const SaveAll = async () => {
            try {
                if (readItems.filter((item) => item.status === "INCOMPLETE" || item.status === "DUPLICATE").length === 0) {

                    if (supplyValues.reciever === "" || supplyValues.supplier === "") {
                        notifyError("Complete the supply values");
                    } else {
                        setSaveAllLoading(true)

                        notifyInfo("Saving supply process")

                        let new_supplies = Object.assign(supplyValues);
                        new_supplies.supply_date = new Date();
                        new_supplies.supply_date.setSeconds(new_supplies.supply_date.getSeconds() - 3);
                        const supply_res = await SuppliesDataService.create(new_supplies);
                        notifySuccess("Supply saved successfully")

                        notifyInfo("Saving products process")

                        for (let i = 0; i < readItems.length; i++) {
                            try {
                                let res;
                                if (readItems[i].status === "EXISTS") {
                                    res = await SparePartService.getSparePart(readItems[i].id);
                                } else {
                                    let partValues = {...readItems[i].value};
                                    partValues.part_number = partValues.part_number.trim();
                                    partValues.name = partValues.name.trim();
                                    res = await SparePartService.createProduct(partValues);
                                    setTotals({...totals, spareParts: totals.spareParts + 1});
                                }

                                const supplied_parts_data = await SuppliedPartsDataService.create({
                                    part_supply: supply_res.data._id,
                                    quantity: parseInt(readItems[i].quantity),
                                    spare_part: res.data._id,
                                    supply_price: parseFloat(readItems[i].supply_price * readItems[i].quantity)
                                })

                                const part_in_stock_data = await SparePartService.createSparePartInStock({
                                    supplied_part: supplied_parts_data.data._id,
                                    quantity: parseInt(readItems[i].quantity),
                                });

                                let unit_price = parseFloat(parseFloat(parseFloat(readItems[i].supply_price) * (80 / 100)) + parseFloat(readItems[i].supply_price));

                                if (readItems[i].status === "EXISTS") {
                                    unit_price = readItems[i].unit_price;
                                }

                                const part_on_market_data = await SparePartService.createPartOnMarket({
                                    part_in_stock: part_in_stock_data.data._id,
                                    unit_price: unit_price,
                                    complete_info_status: readItems[i].value.complete_info_status,
                                    quantity: parseInt(readItems[i].quantity)
                                });

                                if (readItems[i].status === "EXISTS") {
                                    notifySuccess(readItems[i].quantity + " quantities are added on " + readItems[i].value.name + " successfully");
                                } else {
                                    notifySuccess(readItems[i].value.name + " is saved successfully")
                                }
                            } catch (e) {
                                notifyError(e.message + " WHEN SAVING " + readItems[i].value.name);
                            }
                        }

                        notifySuccess("WOW CONGRATULATIONS 🎉🎉🎉");
                        notifySuccess("👏👏👏 ALL PARTS ARE SAVED SUCCESSFULLY");
                        setReadItems([]);
                        RealTimeSaveService.removeData(SPARE_PART_REGISTRATION_TEMP_STORAGE_KEY);
                        window.setTimeout(() => {
                            hide_modal('#uploadedModal')
                        }, 3000);

                    }
                } else {
                    notifyError("SORRY SOME ROW/S ARE STILL INCOMPLETE")
                }
            } catch (e) {
                notifyError(e.message);
            } finally {
                setSaveAllLoading(false);
            }
        }


        useEffect(() => {
            if (readItems.length > 0) {
                RealTimeSaveService.setData(readItems, SPARE_PART_REGISTRATION_TEMP_STORAGE_KEY);
            }
        }, [readItems])
        return (
            <>
                <div className="col-12 align-self-center">
                    {/*<div>*/}
                    {/*    <button className={"btn mt-md-n5"} onClick={() => {*/}
                    {/*        readItems.length > 0 ? show_modal("#uploadedModal", true) : document.getElementById("xcelUpload").click();*/}
                    {/*    }}>*/}
                    {/*        {*/}
                    {/*            readItems.length > 0 ? <ContinueIcon/> :*/}
                    {/*                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="42" height="42">*/}
                    {/*                    <path fill="none" d="M0 0h24v24H0z"/>*/}
                    {/*                    <path*/}
                    {/*                        d="M16 2l5 5v14.008a.993.993 0 0 1-.993.992H3.993A1 1 0 0 1 3 21.008V2.992C3 2.444 3.445 2 3.993 2H16zm-3 10h3l-4-4-4 4h3v4h2v-4z"*/}
                    {/*                        fill="rgba(231,76,60,1)"/>*/}
                    {/*                </svg>*/}
                    {/*        }*/}
                    {/*    </button>*/}
                    {/*    <input*/}
                    {/*        type="file"*/}
                    {/*        id={"xcelUpload"}*/}
                    {/*        hidden={true}*/}
                    {/*        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"*/}
                    {/*        onChange={(e) => {*/}
                    {/*            readExcel(e.target.files[0]);*/}
                    {/*            e.target.value = "";*/}
                    {/*        }}*/}
                    {/*        onClick={(event) => {*/}
                    {/*            event.target.value = null*/}
                    {/*        }}*/}
                    {/*    />*/}
                    {/*</div>*/}
                </div>

                <FormLayout
                    Content={
                        <FormContent
                            handleUploadPictures={handleUploadPictures}
                            imgFiles={imgFiles}
                            setIsFormValid={setIsFormValid}
                            setValues={setValues}
                            setImgFiles={setImgFiles}
                            values={values}
                            imagesContainer={imagesContainer}/>
                    }
                    alert={alert}
                    title={"New Product"}
                    setAlert={setAlert}
                    btnTxt="Create"
                    disable={isFormValid}
                    callFun={Create}
                    loading={loading}
                    setLoading={setLoading}/>
                <div className={"col-12"}>
                    {/*<ModalDisplay items={readItems} setItems={setReadItems} save={SaveAll}*/}
                    {/*              saveAllLoading={saveAllLoading}*/}
                    {/*              supplyValues={supplyValues} setSupplyValues={setSupplyValues}/>*/}
                </div>
            </>
        );
    }
;


const Page = () => {

    const [totals, setTotals] = useState({products: 0, productsOnMarket: 0});


    const getTotals = async () => {
        const totals = {products: 0, productsOnMarket: 0};

        try {
            const products = await SparePartService.getPaginatedProducts();
            const productsOnMarket = await SparePartService.getPaginatedProductsOnMarket();

            totals.products = products.data.totalDocs;

            totals.productsOnMarket = productsOnMarket.data.totalDocs;
            setTotals(totals);

        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        (async function () {
            await getTotals();
        })()
    }, [])
    const panes = [
        {name: 'Products', count: totals.products, route: '/admin/products'},
        {name: 'ProductsOnMarket', count: totals.productsOnMarket, route: '/admin/products/on-market'}
    ];

    return (
        <SingleSubModuleLayout
            Content={<Content totals={totals} setTotals={setTotals}/>}
            isArray={true}
            panes={panes}
            showFilter={false}
            name={'Products'}
            setSearch={null}
            status="all"
            route={"/admin/products"}
        />
    );
};


const otherStyles = {
    img: {
        border: "0.5em",
    },

    imgDivClicked: {
        border: "2px solid red",
    },
    imgDivUnClicked: {
        border: "0px solid black",
    }
}

export default Page;