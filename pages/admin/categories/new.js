import React, {useEffect, useState} from 'react';
import ProductCategoriesService from "../../../services/product-categories/ProductCategoryService"
import {alertFailer, alertSuccess, notifyError, notifyInfo, notifySuccess} from "../../../utils/alerts"
import FormLayout from "../../../layouts/form-layout"
import InputControl, {InputTextArea} from "../../../components/reusable/InputControl"
import SingleSubModuleLayout from "../../../layouts/admin-layouts/SingleSubModule";
import {isThisFormValid} from "../../../utils/functions";
import {hide_modal, hide_modal_alert} from "../../../utils/modal-funs";
import ReadFile from "../../../components/modals/excel-uploads/read-file";
import {readProductCategoriesExcel} from "../../../utils/excel-functions";
import RealTimeSaveService from "../../../services/excel-registrations/real-time-save";
import {PRODUCT_CATEGORY_REGISTRATION_TEMP_STORAGE_KEY} from "../../../utils/constants";
import ModalDisplay from "../../../components/modals/excel-uploads/product-categories/modal-display";


export const FormContent = ({setIsFormValid, setValues, values, status}) => {
    const [valid, setValid] = useState({
        name: !!status,
        description: !!status
    });

    useEffect(() => {
        setIsFormValid(isThisFormValid(valid))
    }, [valid])


    const handleChangeV2 = (prop) => ({value, valid: validProp}) => {
        console.log(values)
        setValues({...values, [prop]: value});
        setValid(state => ({...state, [prop]: validProp}))
    };

    return (
        <React.Fragment>
            <div className="form-row justify-content-md-between justify-content-center">
                <div className="form-group col-7">
                    <InputControl handleChangeV2={handleChangeV2("name")} value={values.name} label="Category Name"
                                  type="text" validations="required|string|min:3"/>
                </div>
                <div className="form-group col-7">
                    <InputTextArea handleChangeV2={handleChangeV2("description")} value={values.description}
                                   label="Description" validations="required|string|min:3"/>
                </div>
            </div>
        </React.Fragment>
    );
};

const Content = ({total, setTotal}) => {
        const [alert, setAlert] = useState({message: "", class: "", show: false})
        const [values, setValues] = useState({
            name: "",
            description: "",
        });
        const [isFormValid, setIsFormValid] = useState(false)
        const [readItems, setReadItems] = useState([]);
        const [loading, setLoading] = useState(false);


        useEffect(() => {
            let existing_data = RealTimeSaveService.getDecData(PRODUCT_CATEGORY_REGISTRATION_TEMP_STORAGE_KEY);
            if (existing_data.length > 0) {
                setReadItems(existing_data);
            }
        }, [])

        const Create = () => {
            ProductCategoriesService.createProductCategory(values)
                .then((res) => {
                    alertSuccess(setAlert, "Category created");
                    hide_modal_alert(setAlert)
                    setTotal(total + 1)
                })
                .catch((e) => {
                    alertFailer(setAlert, e.response ? e.response.data.message : e.message || "Error occurred. Try again latter.");
                    hide_modal_alert(setAlert)
                }).finally(() => {
                setLoading(false)
            })
        };

        const [saveAllLoading, setSaveAllLoading] = useState(false);

        const [supplyValues, setSupplyValues] = useState({supplier: "", reciever: ""});

        const SaveAll = async () => {

            try {

                if (readItems.filter((item) => item.status === "INCOMPLETE" || item.status === "DUPLICATE").length === 0) {
                    setSaveAllLoading(true)
                    notifyInfo("Saving categories process")

                    for (let i = 0; i < readItems.length; i++) {
                        try {
                            let value = {
                                name: readItems[i].value.name,
                                description: readItems[i].value.description
                            }
                            const res = await ProductCategoriesService.createProductCategory(value);
                            notifySuccess(res.data.name + " is saved successfully");
                            setTotal(total + 1)
                        } catch (e) {
                            notifyError(e.message + " WHEN SAVING " + readItems[i].value.name);
                        }
                    }

                    notifySuccess("WOW CONGRATULATIONS 🎉🎉🎉");
                    notifySuccess("👏👏👏 ALL PARTS ARE SAVED SUCCESSFULLY");
                    setReadItems([]);
                    RealTimeSaveService.removeData(PRODUCT_CATEGORY_REGISTRATION_TEMP_STORAGE_KEY);
                    window.setTimeout(() => {
                        hide_modal('#uploadedModal')
                    }, 3000);

                }
            } catch (e) {
                notifyError(e.message);
            } finally {
                setSaveAllLoading(false);
            }

        }
        return (
            <>
                <div className="col-12 align-self-center">
                    <ReadFile readItems={readItems} readExcel={readProductCategoriesExcel} setReadItems={setReadItems}/>
                </div>

                <FormLayout
                    Content={<FormContent setIsFormValid={setIsFormValid} setValues={setValues} values={values}/>}
                    alert={alert} title={"New Brand"} setAlert={setAlert} btnTxt="Save" disable={isFormValid}
                    callFun={Create} loading={loading} setLoading={setLoading}/>
                <div className={"col-12"}>
                    <ModalDisplay items={readItems} setItems={setReadItems} save={SaveAll}
                                  saveAllLoading={saveAllLoading}
                                  supplyValues={supplyValues} setSupplyValues={setSupplyValues}/>
                </div>
            </>
        );
    }
;


const Page = () => {
    const [total, setTotal] = useState(0);

    const getTotal = async () => {
        try {
            const res = await ProductCategoriesService.getPaginatedProductCategories();
            setTotal(res.data.totalDocs)
        } catch {
            (error) => {
                console.log(error)
            }
        }
    }

    useEffect(() => {
        getTotal();
    }, [])


    return (
        <SingleSubModuleLayout
            Content={<Content total={total} setTotal={setTotal}/>}
            isArray={false}
            total={total}
            showFilter={false}
            name={'Brands'}
            setSearch={null}
            status="all"
            route={"/admin/categories"}
        />)
};

export default Page;
