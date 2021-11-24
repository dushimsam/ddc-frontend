import Router, {useRouter} from 'next/router';

import React, {useEffect, useState} from 'react';
import ProductModelsService from '../services/product-models/product-models.service'
import CompanyService from "../services/companies/companies";
import globalStyles from "../styles/global-colors.module.css"
import give_range from "../utils/range";
import {hide_modal} from "../utils/modal-funs";
import {doubleEncryption} from "../utils/encryption-decryption";
import {gotoPath} from "../utils/functions";

export const ChangeDialog = ({defaultModel, defaultYear, routerChange}) => {
    const [companies, setCompanies] = useState([])
    const [models, setModels] = useState([])
    const [years, setYears] = useState([])

    const [selected, setSelected] = useState({
        year: "",
        model: "",
        company: ""
    })


    const getCompanies = () => {
        CompanyService.getValid()
            .then((resp) => {
                setCompanies(resp.data);
            })
            .catch((e) => console.error(e));
    }

    const router = useRouter();
    const [defaultValues, setDefaultValues] = useState({})

    useEffect(() => {
        getCompanies();
        if (Object.keys(defaultModel).length > 0 && defaultYear !== 0) {
            (async function () {
                let data2 = await ProductModelsService.companyModels(defaultModel.company._id)
                setModels(data2.data)
                // setYears(give_range(defaultModel.range.start, defaultModel.range.end))
                // setSelected({model: defaultModel._id, company: defaultModel.company._id, year: defaultYear})
                setDefaultValues({model: defaultModel._id, company: defaultModel.company._id, year: defaultYear})
            })()
        }

    }, [defaultModel, defaultYear])


    const getModels = async event => {
        if (event.target.value !== "") {
            const {data} = await ProductModelsService.companyModels(event.target.value)
            setModels(data)
            setSelected({...selected, ["company"]: event.target.value})
        } else {
            setModels([])
            setYears([])
            setSelected({})
        }
    }

    const getYears = async event => {
        if (event.target.value !== "") {
            setSelected(state => ({...state, ["model"]: models[event.target.value]._id, ["year"]: ""}))
            setYears(give_range(models[event.target.value].range.start, models[event.target.value].range.end))
        } else {
            setSelected(state => ({...state, ["model"]: "", ["year"]: ""}))
            setYears([])
        }
    }

    const changeVehicle = () => {
        hide_modal('#changeVehicleModel')
        window.setTimeout(() => {
            Router.push(gotoPath("/find-my-parts",selected.model,selected.year))
        }, 500);
    }

    return (
        <React.Fragment>
            <div className="card">
                <div className="card-header px-5 pt-4">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 className="font-weight-bolder">Change the Vehicle</h4>

                </div>
                <div className="card-body px-5">
                    <select name="" onChange={(e) => getModels(e)} className="form-control mt-3">
                        <option value="" selected>- select the company -</option>
                        {
                            companies.map((company, i) => {
                                    return(<option value={company._id} key={i}>{company.name}</option>)
                            })
                        }
                    </select>
                    <select name="" value={models.map(function (x) {
                        return x._id;
                    }).indexOf(selected.model)} className="form-control mt-3" onChange={getYears}>
                        <option value="" selected>- select the Model -</option>
                        {
                            models.map((model, i) => (
                                <option value={i} key={i}>{model.name}</option>
                            ))
                        }
                    </select>
                    <select name="" className="form-control mt-3" value={selected.year}
                            onChange={(event) => setSelected({...selected, year: event.target.value})}>
                        <option value="" selected>- select the year -</option>
                        {
                            years?.map(year => (
                                <option value={year} key={year}>{year}</option>
                            ))
                        }
                    </select>

                    <button
                        disabled={selected.year === "" || selected.model === "" || selected.company === "" || (JSON.stringify(selected) === JSON.stringify(defaultValues))}
                        className={"btn my-4 text-white " + globalStyles.globalBackColor} onClick={()=>changeVehicle()}>Change
                        Vehicle
                    </button>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ChangeDialog;
