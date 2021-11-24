import React, {useEffect, useState} from 'react';
import ProductCategoriesService from "../../../services/product-categories/product-categories.service"
import {alertFailer, alertSuccess} from "../../../utils/alerts"
import FormLayout from "../../../layouts/form-layout"
import InputControl, {InputTextArea} from "../../../components/reusable/InputControl"
import SingleSubModuleLayout from "../../../layouts/admin-layouts/SingleSubModule";
import {isThisFormValid} from "../../../utils/functions";
import {hide_modal_alert} from "../../../utils/modal-funs";


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

const Content = ({totals, setTotals}) => {
    const [alert, setAlert] = useState({message: "", class: "", show: false})
    const [values, setValues] = useState({
        name: "",
        description: "",
    });
    const [isFormValid, setIsFormValid] = useState(false)

    const [loading, setLoading] = useState(false);

    const Create = () => {
        ProductCategoriesService.createProductCategory(values)
            .then((res) => {
                alertSuccess(setAlert, "Category created");
                hide_modal_alert(setAlert)
                setTotals({...totals, categories: totals.categories + 1})
            })
            .catch((e) => {
                alertFailer(setAlert, e.response ? e.response.data.message : e.message || "Error occurred. Try again latter.");
                hide_modal_alert(setAlert)
            }).finally(() => {
            setLoading(false)
        })
    };

    return (
        <FormLayout Content={<FormContent setIsFormValid={setIsFormValid} setValues={setValues} values={values}/>}
                    alert={alert} title={"New Brand"} setAlert={setAlert} btnTxt="Save" disable={isFormValid}
                    callFun={Create} loading={loading} setLoading={setLoading}/>

    );
};


const Page = () => {
    const [totals, setTotals] = useState({categories: 0, subCategories: 0, subCategoryModelYears: 0});

    const getTotals = async () => {
        const totals = {categories: 0, subCategories: 0, subCategoryModelYears: 0};
        try {
            const categories = await ProductCategoriesService.getPaginatedProductCategories();
            const subCategories = await ProductCategoriesService.getPaginatedProductSubCategories();
            const subCategoryModelYears = await ProductCategoriesService.getPaginatedProductSubCategoryModelYears();

            totals.categories = categories.data.totalDocs;
            totals.subCategories = subCategories.data.totalDocs;
            totals.subCategoryModelYears = subCategoryModelYears.data.totalDocs;

            setTotals(totals);
        } catch {
            (error) => {
                console.log(error)
            }
        }

    }

    useEffect(() => {
        getTotals();
    }, [])

    const panes = [
        {name: 'Brands', count: totals.categories, route: '/admin/categories'}
    ];


    return (
        <SingleSubModuleLayout
            Content={<Content totals={totals} setTotals={setTotals}/>}
            isArray={true}
            panes={panes}
            showFilter={false}
            name={'Brands'}
            setSearch={null}
            status="all"
            route={"/admin/categories"}
        />)
};

export default Page;
