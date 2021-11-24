import React, {useEffect, useState} from "react";

import ShipmentService from "../../../../services/shipments/shipment.service";
import DeliveryService from "../../../../services/shipments/shipment.service";
import FormLayout from "../../../../layouts/form-layout"
import {alertFailer, alertSuccess} from "../../../../utils/alerts"
import InputControl from "../../../../components/reusable/InputControl"
import SelectControl from "../../../../components/reusable/SelectControl"
import SingleSubModuleLayout from "../../../../layouts/admin-layouts/SingleSubModule";
import {isThisFormValid} from "../../../../utils/functions";
import {hide_modal_alert} from "../../../../utils/modal-funs";

export const FormContent = ({setIsFormValid, setValues, values, status}) => {

    const [countries, setCountries] = useState([])
    const [valid, setValid] = useState({
        region: !!status,
        country: !!status
    });


    useEffect(() => {
        ShipmentService.getDeliveryCountries()
            .then((res) => {
                setCountries(res.data);
            }).catch(e => console.log(e))
    }, [])

    useEffect(() => {
        setIsFormValid(isThisFormValid(valid))
    }, [valid])


    const handleChangeV2 = (prop) => ({value, valid: validProp}) => {
        setValues({...values, [prop]: value});
        setValid(state => ({...state, [prop]: validProp}))
    };


    return (
        <React.Fragment>
            <div className="form-row justify-content-md-start justify-content-center">
                <div className="form-group col-md-7 col-10">
                    <SelectControl className="form-control" label="Country" value={values.country}
                                   validations="required|string|min:3" handleChangeV2={handleChangeV2("country")}>
                        <option>select country</option>
                        {
                            countries.map((country) => <option value={country._id}>{country.country}</option>)
                        }
                    </SelectControl>
                </div>
                <div className="form-group col-md-7 col-10">
                    <InputControl handleChangeV2={handleChangeV2("region")} value={values.region} label="Region Name"
                                  type="text" validations="required|string|min:3"/>
                </div>
            </div>
        </React.Fragment>
    );
};

const Content = ({totals, setTotals}) => {
    const [alert, setAlert] = useState({message: "", class: "", show: false})
    const [values, setValues] = useState({
        region: "",
        country: "",
    });
    const [isFormValid, setIsFormValid] = useState(false)

    const [loading, setLoading] = useState(false);

    const Create = () => {
        ShipmentService.createRegion(values)
            .then((res) => {
                alertSuccess(setAlert, "Region created");
                hide_modal_alert(setAlert);
                setTotals({...totals, regions: totals.regions + 1})
            })
            .catch((e) => {
                alertFailer(setAlert, e.response ? e.response.data.message : e.message || "Error occurred. Try again latter.");
                hide_modal_alert(setAlert);
            }).finally(() => {
            setLoading(false);
        })
    };


    return (
        <FormLayout Content={<FormContent setIsFormValid={setIsFormValid} setValues={setValues} values={values}/>}
                    alert={alert} title={"New Delivery Region"} setAlert={setAlert} btnTxt="Create"
                    disable={isFormValid} callFun={Create} loading={loading} setLoading={setLoading}/>

    );
};


const Page = () => {
    const [totals, setTotals] = useState({countries: 0, regions: 0, zones: 0, ports: 0, origins: 0, pricing: 0});


    const getTotals = async () => {
        const totals = {countries: 0, regions: 0, zones: 0, ports: 0, origins: 0, pricing: 0};
        try {
            const countries = await DeliveryService.getPaginatedDeliveryCountries();
            const regions = await DeliveryService.getPaginatedDeliveryCountriesRegions();
            const zones = await DeliveryService.getPaginatedDeliveryZones();

            totals.countries = countries.data.totalDocs;
            totals.regions = regions.data.totalDocs;
            totals.zones = zones.data.totalDocs;
            setTotals(totals);
        } catch {
            (e) => console.log(e)
        }
    }

    useEffect(() => {
        getTotals();
    }, [])

    const admin_panes = [
        {name: 'Countries', count: totals.countries, route: '/admin/delivery'},
        {name: 'Regions', count: totals.regions, route: '/admin/delivery/regions'},
        {name: 'Zones', count: totals.zones, route: '/admin/delivery/zones'},
    ];

    return (
        <SingleSubModuleLayout
            Content={<Content totals={totals} setTotals={setTotals}/>}
            isArray={true}
            panes={admin_panes}
            showFilter={false}
            name={'Regions'}
            setSearch={null}
            status="all"
            route={"/admin/delivery/regions"}
        />
    );
};

export default Page;
