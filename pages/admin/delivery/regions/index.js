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
import {processDetailedDate} from "../../../../utils/process-date";
import {useRouter} from "next/router";
import ReadMoreLayout, {ListMapping, MapDetails} from "../../../../components/layouts/read-more-dialog-layout";
import Paginator from "../../../../components/tables/paginator";
import {system_users} from "../../../../utils/constants";


const Table = ({
                   regions,
                   setRegions,
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

    const handlePageChange = (page) => {
        setPaginatorLoading(true)
        setPaginator({...paginator, ['page']: page});
    };

    const [alert, setAlert] = useState({message: "", class: "", show: false})
    const [loading, setLoading] = useState(false);

    const deleteItem = (item) => {
        DeliveryService.deleteDeliveryRegion(item._id).then((res) => {
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
        setRegions(sortData(regions, prop, order));
    }
    const handleSetFields = (item) => {
        setItemFields([{name: "REGION", value: item.region}, {
            name: "COUNTRY",
            value: item.country.country,
            href: "/admin/delivery",
            _id: item.country._id
        }, {name: "CREATED AT", value: processDetailedDate(item.createdAt)}]);
        show_modal('#itemReadMoreModalLayout');
    }

    const handleSetChildFields = (item) => {
        DeliveryService.getDeliveryRegionZones(item._id)
            .then((res) => {
                setChildFields(res.data.map((resItem, index) => {
                    return {
                        name: (index + 1),
                        value: res.data[index].zone,
                        href: "/admin/delivery/zones",
                        _id: res.data[index]._id
                    }
                }))
            }).catch(e => console.log(e))
    }


    const router = useRouter();


    useEffect(() => {
        if (router.query.subject) {
            DeliveryService.getDeliveryRegion(handleDoubleDecryptionPath(router.query.subject))
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
                        <th scope="col" className={styles.th}>Region</th>
                        <th scope="col" className={styles.th}>Country</th>
                        <Th name={'Created On'} prop={'createdAt'} sorter={sortBy}/>
                        <th scope="col" className={styles.th}>Action</th>
                    </tr>
                    </thead>

                    <tbody>
                    {regions && regions.map((region, index) => {
                        return (
                            <tr key={region._id}>
                                <th scope="row" className={styles.td}><span
                                    className="text-uppercase">{index + 1}</span></th>
                                <td className={styles.td}>{region.region}</td>
                                <td className={styles.td}>{(region.country) ? region.country.country : 'N/A'}</td>
                                <td className={styles.td}>{getFormattedDate(region.createdAt)}</td>
                                <td className={styles.td}><ActionButtons handleSetItem={handleSetItem} item={region}
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
            <DeleteConfirmation text={item.name} item={item} deleteItem={deleteItem} alert={alert} setAlert={setAlert}
                                loading={loading} setLoading={setLoading}/>}
            {itemFields && <ReadMoreLayout parentContentTitle={"DELIVERY REGION INFORMATION"}
                                           childContentTitle={"All Delivery Zones Under This Region"}
                                           ParentContent={<MapDetails fields={itemFields}/>} ChildContent={childFields ?
                <ListMapping fields={childFields ?? []}/> : null}/>}
        </React.Fragment>
    );
}


const RegionsTable = () => {

    const [regions, setRegions] = useState([]);
    const [searchRegions, setSearchRegions] = useState([]);
    const [paginator, setPaginator] = useState({page: 1, perPage: 5, total: 0, range: 5});
    const [isSearch, setIsSearch] = useState(false);
    const [searchKey, setSearchKey] = useState('');

    const [totals, setTotals] = useState({countries: 0, regions: 0, zones: 0});
    const [paginatorLoading, setPaginatorLoading] = useState(true);

    const getRegions = (page) => {
        DeliveryService.getPaginatedDeliveryCountriesRegions(page).then((res) => {
            setRegions(res.data.docs);
            setSearchRegions(res.data.docs);
            setPaginatorLoading(false);
            setTotals({...totals, regions: res.data.totalDocs});
            setPaginator({...paginator, total: res.data.totalDocs, page: res.data.page});
        }).catch(e => console.log(e))
    }
    const getSearchRegions = (val, page) => {
        DeliveryService.searchPaginatedDeliveryCountriesRegions(val, page).then((res) => {
            setSearchRegions(res.data.docs);
            setPaginatorLoading(false);
            setPaginator({...paginator, total: res.data.totalDocs, page: res.data.page});
        }).catch(e => console.log(e))
    }

    const getTotals = async () => {
        const totals = {countries: 0, regions: 0, zones: 0};
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
        if (!isSearch)
            getRegions(paginator.page);
        else getSearchRegions(searchKey, paginator.page);
    }, [paginator.page]);

    const getSearchKey = (val) => {
        setSearchKey(val);
        if (val === '' || val === ' ' || !val.replace(/\s/g, '').length) {
            setSearchRegions(regions);
            setIsSearch(false);
        } else {
            getSearchRegions(val, paginator.page);
            setIsSearch(true);
        }
    };


    const getInitialData = () => {
        getRegions(paginator.page);
    }

    const panes = [
        {name: 'Countries', count: totals.countries, route: '/admin/delivery'},
        {name: 'Regions', count: totals.regions, route: '/admin/delivery/regions'},
        {name: 'Zones', count: totals.zones, route: '/admin/delivery/zones'},
    ];


    return (
        <SingleSubModuleLayout
            Content={<Table regions={searchRegions} paginatorLoading={paginatorLoading}
                            setPaginatorLoading={setPaginatorLoading}
                            paginator={paginator} setPaginator={setPaginator}
                            systemUser={system_users.ADMIN}
                            setRegions={setSearchRegions}
                            getInitialData={getInitialData}/>}
            isArray={true}
            panes={panes}
            showFilter={false}
            name={'Regions'}
            setSearch={getSearchKey}
            status="new"
            route={"/admin/delivery/regions"}
        />
    );
};


export default RegionsTable;