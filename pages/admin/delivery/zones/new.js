import React, {useEffect, useState} from 'react';
import ShipmentService from "../../../../services/shipments/shipment.service"
import DeliveryService from "../../../../services/shipments/shipment.service"
import FormLayout from "../../../../layouts/form-layout"
import {alertFailer, alertSuccess} from "../../../../utils/alerts"
import SelectControl from "../../../../components/reusable/SelectControl"
import SingleSubModuleLayout from "../../../../layouts/admin-layouts/SingleSubModule";
import {isThisFormValid} from "../../../../utils/functions";
import InputControl from "../../../../components/reusable/InputControl"
import {hide_modal_alert} from "../../../../utils/modal-funs";


export const FormContent = ({setIsFormValid, setValues, values, status}) => {

    const [regions, setRegions] = useState([])
    const [valid, setValid] = useState({
        zone: !!status,
        delivery_price: !!status,
        region: !!status,
        transfer_time: !!status
    });


    useEffect(() => {
        ShipmentService.getDeliveryRegions()
            .then(res => {
                setRegions(res.data);
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
            <div className="form-row justify-content-md-between justify-content-center">

                <div className="form-group col-md-5 col-10">

                    <InputControl handleChangeV2={handleChangeV2("zone")} label="Zone Name" value={values.zone}
                                  type="text" validations="required|string|min:3"/>

                </div>
                <div className="form-group col-md-5 col-10">
                    <SelectControl className="form-control" label="Region" value={values.region}
                                   validations="required|string|min:3" handleChangeV2={handleChangeV2("region")}>
                        <option>Select region</option>
                        {regions.map(region => <option value={region._id}>{region.region}</option>)}
                    </SelectControl>
                </div>

                <div className="form-group col-md-5 col-10">
                    <InputControl handleChangeV2={handleChangeV2("delivery_price")} value={values.delivery_price}
                                  min="0" label="Delivery price Per Kg" type="number"
                                  validations="required|regex:/^-?\d*(\.\d+)?$/" step="0.01"/>
                </div>

                <div className="col-md-5 col-10">
                    <InputControl label="Transfer Time in Hours" type="number"
                                  validations="required|regex:/^-?\d*(\.\d+)?$/"
                                  id="transferTime" step="0.01" className="form-control"
                                  placeholder="Example: 0.5 Hr means 30 min" min={"0.1"}
                                  handleChangeV2={handleChangeV2("transfer_time")} value={values.transfer_time}/>
                </div>
            </div>
        </React.Fragment>

    );
};

const Content = ({totals, setTotals}) => {
    const [alert, setAlert] = useState({message: "", class: "", show: false})
    const [values, setValues] = useState({
        zone: "",
        delivery_price: 1,
        region: "",
        transfer_time: 0.1
    });

    const [isFormValid, setIsFormValid] = useState(false)

    const [loading, setLoading] = useState(false);

    const Create = () => {
        ShipmentService.createZone(values)
            .then((res) => {
                alertSuccess(setAlert, "Zone created");
                hide_modal_alert(setAlert);
                setTotals({...totals, zones: totals.zones + 1})
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
                    alert={alert} title={"New Delivery Zone"} setAlert={setAlert} btnTxt="Create" disable={isFormValid}
                    callFun={Create} loading={loading} setLoading={setLoading}/>

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
            name={'Zones'}
            setSearch={null}
            status="all"
            route={"/admin/delivery/zones"}
        />
    );
};

export default Page;
  