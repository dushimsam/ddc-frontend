import React, {useEffect, useState} from 'react';
import styles from "../../../../styles/pages/table.module.css";
import Update from "./update";
import ActionButtons from "../../../../components/tables/ActionButtons"
import DeleteConfirmation from "../../../../components/tables/delete-confirmation-modal"
import SingleSubModuleLayout from "../../../../layouts/admin-layouts/SingleSubModule";
import {getFormattedDate, handleDoubleDecryptionPath, sortData} from "../../../../utils/functions";
import DeliveryService from "../../../../services/shipments/shipment.service";
import {Th} from "../../../../components/reusable/TableComponents";
import {hide_delete_modal, hide_modal_alert, show_modal} from "../../../../utils/modal-funs";
import {alertFailer} from "../../../../utils/alerts";
import {useRouter} from "next/router";
import {processDetailedDate} from "../../../../utils/process-date";
import ReadMoreLayout, {ListMapping, MapDetails} from "../../../../components/layouts/read-more-dialog-layout";
import Paginator from "../../../../components/tables/paginator";
import {useSelector} from "react-redux";
import {system_users} from "../../../../utils/constants";
import {defaultCurrencyMapping} from "../../../../utils/currency-converter";


const Table = ({
                   zones,
                   setZones,
                   paginatorLoading,
                   setPaginatorLoading,
                   paginator,
                   setPaginator,
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
            // handleSetChildFields(item)
        } else {
            show_modal('#deleteConfirmationModal')
        }
    }

    const handlePageChange = (page) => {
        setPaginatorLoading(true)
        setPaginator({...paginator, ['page']: page});
    };

    const [alert, setAlert] = useState({message: "", class: "", show: false})
    const [loading, setLoading] = useState(false);

    const deleteItem = (item) => {
        DeliveryService.deleteDeliveryZone(item._id).then((res) => {
            setAlert({show: true, class: "success", message: "Record is Deleted successfully."});
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
        setZones(sortData(zones, prop, order));
    }

    const router = useRouter();

    const handleSetFields = (item) => {
        setItemFields([{name: "ZONE", value: item.zone}, {
            name: "REGION",
            value: item.region.region,
            href: "/admin/delivery/regions",
            _id: item.region._id
        }, {name: "PRICE PER WEIGHT", value: defaultCurrencyMapping(item.delivery_price)}, {
            name: "Transfer Time",
            value: item?.transfer_time + " hr/s - " + (item?.transfer_time * 60) + " minutes"
        }, {name: "CREATED AT", value: processDetailedDate(item.createdAt)}]);
        show_modal('#itemReadMoreModalLayout');
    }


    useEffect(() => {
        if (router.query.subject) {
            DeliveryService.getDeliveryZone(handleDoubleDecryptionPath(router.query.subject))
                .then((res) => {
                    const item = res.data;
                    handleSetFields(item)
                    // handleSetChildFields(item);
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
                        <th scope="col" className={styles.th}>Zone</th>
                        <th scope="col" className={styles.th}>Region</th>
                        <th scope="col" className={styles.th}>Country</th>
                        <Th name={'Delivery Price'} prop={'delivery_price'} sorter={sortBy}/>
                        <Th name={'Created On'} prop={'createdAt'} sorter={sortBy}/>
                        <th scope="col" className={styles.th}>Action</th>
                    </tr>
                    </thead>

                    <tbody>
                    {zones && zones.map((zone, index) => {
                        return (
                            <tr key={zone._id}>
                                <th scope="row" className={styles.td}><span
                                    className="text-uppercase">{index + 1}</span></th>
                                <td className={styles.td}>{zone.zone}</td>
                                <td className={styles.td}>{(zone.region) ? zone.region.region : 'N/A'}</td>
                                <td className={styles.td}>{(zone.region) ? (zone.region.country) ? zone.region.country.country : 'N/A' : 'N/A'}</td>
                                <td className={styles.td}>{defaultCurrencyMapping(zone.delivery_price)}</td>
                                <td className={styles.td}>{getFormattedDate(zone.createdAt)}</td>
                                <td className={styles.td}><ActionButtons handleSetItem={handleSetItem} item={zone}
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
            <DeleteConfirmation text={item.name} item={item} deleteItem={deleteItem} alert={alert} loading={loading}
                                setLoading={setLoading} setAlert={setAlert}/>}
            {itemFields && <ReadMoreLayout parentContentTitle={"DELIVERY ZONE INFORMATION"} childContentTitle={""}
                                           ParentContent={<MapDetails fields={itemFields}/>} ChildContent={childFields ?
                <ListMapping fields={childFields ?? []}/> : null}/>}
        </React.Fragment>
    );
}


const ZonesTable = () => {

    const [zones, setZones] = useState([]);
    const [searchZones, setSearchZones] = useState([]);
    const [paginator, setPaginator] = useState({page: 1, perPage: 5, total: 0, range: 5});
    const [isSearch, setIsSearch] = useState(false);
    const [searchKey, setSearchKey] = useState('');

    const [totals, setTotals] = useState({countries: 0, regions: 0, zones: 0, ports: 0, origins: 0, pricing: 0});
    const [paginatorLoading, setPaginatorLoading] = useState(true);

    const getZones = (page) => {
        DeliveryService.getPaginatedDeliveryZones(page).then((res) => {
            setZones(res.data.docs);
            setSearchZones(res.data.docs);
            setPaginatorLoading(false);
            setTotals({...totals, zones: res.data.totalDocs});
            setPaginator({...paginator, total: res.data.totalDocs, page: res.data.page});
        }).catch(e => console.log(e))
    }
    const getSearchZones = (val, page) => {
        DeliveryService.searchPaginatedDeliveryZones(val, page).then((res) => {
            setSearchZones(res.data.docs);
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

    useEffect(() => {
        if (!isSearch)
            getZones(paginator.page);
        else getSearchZones(searchKey, paginator.page);
    }, [paginator.page]);

    const getSearchKey = (val) => {
        setSearchKey(val);
        if (val === '' || val === ' ' || !val.replace(/\s/g, '').length) {
            setSearchZones(zones);
            setIsSearch(false);
        } else {
            getSearchZones(val, paginator.page);
            setIsSearch(true);
        }
    };


    const getInitialData = () => {
        getZones(paginator.page);
    }


    const panes = [
        {name: 'Countries', count: totals.countries, route: '/admin/delivery'},
        {name: 'Regions', count: totals.regions, route: '/admin/delivery/regions'},
        {name: 'Zones', count: totals.zones, route: '/admin/delivery/zones'},
    ];

    const admin_panes = [
        {name: 'Countries', count: totals.countries, route: '/admin/delivery'},
        {name: 'Regions', count: totals.regions, route: '/admin/delivery/regions'},
        {name: 'Zones', count: totals.zones, route: '/admin/delivery/zones'},
        {name: 'Ports', count: totals.ports, route: '/admin/delivery/ports'},
        {name: 'Origin Countries', count: totals.origins, route: '/admin/delivery/ports/origins'},
        {name: 'Port Pricing', count: totals.pricing, route: '/admin/delivery/ports/pricing'},
    ];
    const user = useSelector(state => state.authUser);

    return (

        <SingleSubModuleLayout
            Content={<Table zones={searchZones} paginatorLoading={paginatorLoading}
                            setPaginatorLoading={setPaginatorLoading}
                            systemUser={system_users.ADMIN}
                            setZones={setSearchZones} paginator={paginator} setPaginator={setPaginator}
                            getInitialData={getInitialData}/>}
            isArray={true}
            panes={panes}
            showFilter={false}
            name={'Zones'}
            setSearch={getSearchKey}
            status="new"
            route={"/admin/delivery/zones"}
        />
    );
};


export default ZonesTable;