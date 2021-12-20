import SparePartService from "../../../services/products/ProductService";
import ProductService from "../../../services/products/ProductService";
import React, {useEffect, useRef, useState} from "react";
import productCategoriesService from "../../../services/product-categories/ProductCategoryService";
import FormLayout from "../../../layouts/form-layout"
import InputControl from "../../../components/reusable/InputControl"
import SingleSubModuleLayout from "../../../layouts/admin-layouts/SingleSubModule";
import {isThisFormValid} from "../../../utils/functions";
import {alertFailer, alertSuccess, notifyError, notifyInfo, notifySuccess} from "../../../utils/alerts"
import {ALERT_EXPIRATION_PERIOD, PRODUCT_REGISTRATION_TEMP_STORAGE_KEY} from "../../../utils/constants";
import {hide_modal, hide_modal_alert} from "../../../utils/modal-funs";
import {ImagesSuperContainer} from "../../../components/management/products/create";
import {acceptedFileTypes} from "../../../utils/image-utils";
import SuppliesDataService from "../../../services/supplies/SupplyService";
import SuppliedPartsDataService from "../../../services/supplies/SuppliedProductsService";
import {useRouter} from "next/router";
import RealTimeSaveService from "../../../services/excel-registrations/real-time-save"
import SelectControl from "../../../components/reusable/SelectControl";
import {readProductsExcel} from "../../../utils/excel-functions";
import ReadFile from "../../../components/modals/excel-uploads/read-file";
import ProductsModalDisplay from "../../../components/modals/excel-uploads/products/products-modal-display";


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
            let existing_data = RealTimeSaveService.getDecData(PRODUCT_REGISTRATION_TEMP_STORAGE_KEY);
            if (existing_data.length > 0) {
                setIsExisting(true)
                setReadItems(existing_data);
            }
        }, [])


        const [saveAllLoading, setSaveAllLoading] = useState(false);

        const [supplyValues, setSupplyValues] = useState({supplier: "", reciever: ""});

        const SaveAll = async () => {
            try {
                if (readItems.filter((item) => item.status === "INCOMPLETE" || item.status === "DUPLICATE").length === 0) {

                    if (supplyValues.supplier === "") {
                        notifyError("Specify the supplier please");
                    } else {
                        setSaveAllLoading(true)

                        notifyInfo("Saving supply process")

                        let new_supplies = {}
                        new_supplies.supplier = supplyValues.supplier;
                        new_supplies.reciever = supplyValues.reciever;
                        new_supplies.supply_date = new Date();
                        new_supplies.supply_date.setSeconds(new_supplies.supply_date.getSeconds() - 3);
                        const supply_res = await SuppliesDataService.create(new_supplies);
                        notifySuccess("Supply saved successfully")

                        notifyInfo("Saving products process")

                        for (let i = 0; i < readItems.length; i++) {
                            try {
                                let res;
                                if (readItems[i].status === "EXISTS") {
                                    res = await ProductService.getProduct(readItems[i].id);
                                } else {
                                    let productValues = {...readItems[i].value};
                                    productValues.product_category = productValues.product_category.trim();
                                    productValues.name = productValues.name.trim();
                                    res = await ProductService.createProduct(productValues);
                                    setTotals({...totals, products: totals.products + 1});
                                }

                                const supplied_products_res = await SuppliedPartsDataService.create({
                                    product_supply: supply_res.data._id,
                                    quantity: parseInt(readItems[i].quantity),
                                    product: res.data._id,
                                    supply_price: parseFloat(readItems[i].supply_price)
                                })


                                await ProductService.createProductOnMarket({
                                    supplied_product: supplied_products_res.data._id,
                                    unit_price: parseFloat(readItems[i].price),
                                    complete_info_status: readItems[i].value.complete_info_status,
                                    quantity: parseInt(readItems[i].quantity),
                                    tax: 0
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
                        RealTimeSaveService.removeData(PRODUCT_REGISTRATION_TEMP_STORAGE_KEY);
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
                RealTimeSaveService.setData(readItems, PRODUCT_REGISTRATION_TEMP_STORAGE_KEY);
            }
        }, [readItems])
        return (
            <>
                <div className="col-12 align-self-center">

                    <ReadFile readItems={readItems} readExcel={readProductsExcel} setReadItems={setReadItems}/>
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
                    <ProductsModalDisplay items={readItems} setItems={setReadItems} save={SaveAll}
                                          saveAllLoading={saveAllLoading}
                                          supplyValues={supplyValues} setSupplyValues={setSupplyValues}/>
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