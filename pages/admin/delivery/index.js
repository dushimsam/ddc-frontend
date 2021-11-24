import React, {useEffect, useState} from 'react';
import styles from "../../../styles/pages/table.module.css";
import Update from "./update";
import ActionButtons from "../../../components/tables/ActionButtons"
import DeleteConfirmation from "../../../components/tables/delete-confirmation-modal"
import SingleSubModuleLayout from "../../../layouts/admin-layouts/SingleSubModule";
import {getFormattedDate, handleDoubleDecryptionPath, sortData} from "../../../utils/functions";
import DeliveryService from "../../../services/shipments/shipment.service";
import {Th} from "../../../components/reusable/TableComponents";
import {alertFailer} from '../../../utils/alerts';
import {hide_delete_modal, hide_modal_alert, show_modal} from "../../../utils/modal-funs";
import {processDetailedDate} from "../../../utils/process-date";
import ReadMoreLayout, {ListMapping, MapDetails} from "../../../components/layouts/read-more-dialog-layout";
import {useRouter} from "next/router";
import Paginator from "../../../components/tables/paginator";
import {system_users} from "../../../utils/constants";
import {useSelector} from "react-redux";


const Table = ({
                   countries,
                   setCountries,
                   paginator,
                   setPaginator,
                   paginatorLoading,
                   setPaginatorLoading,
                   getInitialData,
                   systemUser
               }) => {
    const [item, setItem] = useState(null);
    const [itemFields, setItemFields] = useState(null);
    const [childFields, setChildFields] = useState(null);

    const handleSetItem = (item, status) => {
        setItem(item);

        if (status === 'update') {
            show_modal('#itemUpdateModal')
        } else if (status === 'read-more') {
            handleSetFields(item)
            handleSetChildFields(item)
        } else {
            show_modal('#deleteConfirmationModal')
        }
    }

    const handleSetFields = (item) => {
        setItemFields([{name: "COUNTRY", value: item.country}, {
            name: "CREATED AT",
            value: processDetailedDate(item.createdAt)
        }]);
        show_modal('#itemReadMoreModalLayout');
    }

    const handleSetChildFields = (item) => {
        DeliveryService.getDeliveryCountryRegions(item._id)
            .then((res) => {
                setChildFields(res.data.map((resItem, index) => {
                    return {
                        name: (index + 1),
                        value: res.data[index].region,
                        href: "/admin/delivery/regions",
                        _id: res.data[index]._id
                    }
                }))
            }).catch(e => console.log(e))
    }

    const handlePageChange = (page) => {
        setPaginatorLoading(true)
        setPaginator({...paginator, ['page']: page});
    };

    const [alert, setAlert] = useState({message: "", class: "", show: false})
    const [loading, setLoading] = useState(false);

    const deleteItem = (item) => {
        DeliveryService.deleteDeliveryCountry(item._id).then((res) => {
            setAlert({show: true, class: "success", message: "Record is Deleted successfully."});
            setLoading(false)
            getInitialData();
            hide_delete_modal(setAlert);

        }).catch((e) => {
            alertFailer(setAlert, e.response ? e.response.data.message : e.message || "Error occurred. Try again latter.")
            hide_modal_alert(setAlert);
        }).finally(() => {
            setLoading(false)
        })
    }

    const sortBy = (prop, order) => {
        setCountries(sortData(countries, prop, order));
    }

    const router = useRouter();

    useEffect(() => {
        if (router.query.subject) {
            DeliveryService.getDeliveryCountry(handleDoubleDecryptionPath(router.query.subject))
                .then((res) => {
                    const item = res.data;
                    handleSetFields(item)
                    handleSetChildFields(item);
                }).catch((e) => {
                console.log(e)
            })
        }

    }, [router.query.subject])


    return (
        <React.Fragment>
            <div className="table-responsive col-12">
                <table className={'table border rounded ' + styles.table} style={{fontSize: '0.8em'}}>
                    <thead>
                    <tr>
                        <th scope="col" className={styles.th}>#</th>
                        <th scope="col" className={styles.th}>Country</th>
                        <Th name={'Created On'} prop={'createdAt'} sorter={sortBy}/>
                        <th scope="col" className={styles.th}>Action</th>
                    </tr>
                    </thead>

                    <tbody>
                    {countries && countries.map((country, index) => {
                        return (
                            <tr key={country._id}>
                                <th scope="row" className={styles.td}><span
                                    className="text-uppercase">{index + 1}</span></th>
                                <td className={styles.td}>{country.country}</td>
                                <td className={styles.td}>{getFormattedDate(country.createdAt)}</td>
                                <td className={styles.td}><ActionButtons handleSetItem={handleSetItem} item={country}
                                                                         allowed={systemUser === "EMPLOYEE" ? ["READ_MORE"] : ["READ_MORE", "UPDATE", "DELETE"]}/>
                                </td>
                            </tr>
                        )
                    })
                    }
                    </tbody>
                </table>
            </div>
            <Paginator paginator={paginator} handlePageChange={handlePageChange}
                       paginatorLoading={paginatorLoading}/>

            {item && <Update item={item} getInitialData={getInitialData}/>}
            {item &&
            <DeleteConfirmation text={item.name} item={item} deleteItem={deleteItem} setAlert={setAlert} alert={alert}
                                loading={loading} setLoading={setLoading}/>}
            {itemFields && <ReadMoreLayout parentContentTitle={"DELIVERY COUNTRY INFORMATION"}
                                           childContentTitle={"All Delivery Regions Under This Country"}
                                           ParentContent={<MapDetails fields={itemFields}/>} ChildContent={childFields ?
                <ListMapping fields={childFields ?? []}/> : null}/>}
        </React.Fragment>
    );
}


const CountriesTable = () => {

    const [countries, setCountries] = useState([]);
    const [searchCountries, setSearchCountries] = useState([]);
    const [paginator, setPaginator] = useState({page: 1, perPage: 5, total: 0, range: 5});
    const [isSearch, setIsSearch] = useState(false);
    const [searchKey, setSearchKey] = useState('');
    const [paginatorLoading, setPaginatorLoading] = useState(true);

    const [totals, setTotals] = useState({countries: 0, regions: 0, zones: 0, ports: 0, origins: 0, pricing: 0});

    const getCountries = (page) => {
        DeliveryService.getPaginatedDeliveryCountries(page).then((res) => {
            setCountries(res.data.docs);
            setSearchCountries(res.data.docs);
            setTotals({...totals, countries: res.data.totalDocs});
            setPaginatorLoading(false);
            setPaginator({...paginator, total: res.data.totalDocs, page: res.data.page});
        }).catch(e => console.log(e))
    }
    const getSearchCountries = (val, page) => {
        DeliveryService.searchPaginatedDeliveryCountries(val, page).then((res) => {
            setSearchCountries(res.data.docs);
            setPaginatorLoading(false);
            setPaginator({...paginator, total: res.data.totalDocs, page: res.data.page});
        }).catch(e => console.log(e))
    }


    const getTotals = async () => {
        const totals = {countries: 0, regions: 0, zones: 0, ports: 0, origins: 0, pricing: 0};
        try {
            const countries = await DeliveryService.getPaginatedDeliveryCountries();
            const regions = await DeliveryService.getPaginatedDeliveryCountriesRegions();
            const zones = await DeliveryService.getPaginatedDeliveryZones();
            const ports = await DeliveryService.getPaginatedDeliveryPorts();
            const pricing = await DeliveryService.getPaginatedPortPricing();
            const origins = await DeliveryService.getPaginatedDeliveryCountryOrigins();

            totals.countries = countries.data.totalDocs;
            totals.regions = regions.data.totalDocs;
            totals.zones = zones.data.totalDocs;
            totals.pricing = pricing?.data.totalDocs;
            totals.ports = ports?.data.totalDocs;
            totals.origins = origins.data.totalDocs;

            setTotals(totals);
        } catch {
            (e) => console.log(e)
        }
    }

    useEffect(() => {
        if (!isSearch)
            getCountries(paginator.page);
        else getSearchCountries(searchKey, paginator.page);
    }, [paginator.page]);

    const getSearchKey = (val) => {
        setSearchKey(val);
        if (val === '' || val === ' ' || !val.replace(/\s/g, '').length) {
            setSearchCountries(countries);
            setIsSearch(false);
        } else {
            getSearchCountries(val, paginator.page);
            setIsSearch(true);
        }
    };


    const getInitialData = () => {
        getCountries(paginator.page);
    }

    useEffect(() => {
        getTotals();
    }, [])


    const panes = [
        {name: 'Countries', count: totals.countries, route: '/admin/delivery'},
        {name: 'Regions', count: totals.regions, route: '/admin/delivery/regions'},
        {name: 'Zones', count: totals.zones, route: '/admin/delivery/zones'},
    ];


    return (
        <SingleSubModuleLayout
            Content={<Table countries={searchCountries} paginatorLoading={paginatorLoading}
                            setPaginatorLoading={setPaginatorLoading} systemUser={system_users.ADMIN}
                            setCountries={setSearchCountries} getInitialData={getInitialData}
                            paginator={paginator}
                            setPaginator={setPaginator}/>}
            isArray={true}
            panes={panes}
            showFilter={false}
            name={'Countries'}
            setSearch={getSearchKey}
            status="new"
            route={"/admin/delivery"}
        />
    );
};


export default CountriesTable;