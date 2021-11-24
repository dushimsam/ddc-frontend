import React, {useEffect, useState} from 'react';
import styles from "../../../../styles/pages/table.module.css";
// import Update from "./update";
import ActionButtons from "../../../../components/tables/ActionButtons"
import DeleteConfirmation from "../../../../components/tables/delete-confirmation-modal"
import {dateFormat, filterData, gotoPath, handleDoubleDecryptionPath, sortData} from "../../../../utils/functions";
import SuppliersService from "../../../../services/supplies/suppliers";
import SupplyService from "../../../../services/supplies/supplies";
import SuppliedPartsDataService from "../../../../services/supplies/supplied-parts";
import {Th} from "../../../../components/reusable/TableComponents";

import {system_users} from '../../../../utils/constants';
import SingleSubModuleLayoutAdmin from "../../../../layouts/admin-layouts/SingleSubModule";
import ModalContainer from '../../../../components/reusable/dialogs/supply-order-dialog';
import $ from "jquery"
import {notifyError, notifySuccess} from "../../../../utils/alerts";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import Paginator from "../../../../components/tables/paginator";
import SparePartService from "../../../../services/products/products.service";
import {hide_modal, show_modal} from "../../../../utils/modal-funs";
import ConfirmModal from "../../../../components/modals/reusable-confirmation-modal";


async function DeleteSupply(supply, suppliedParts) {
    try {
        for (let i = 0; i < suppliedParts.length; i++) {
            let part = suppliedParts[i];

            const res_on_market_details = await SparePartService.getSparePartDetails(part.spare_part._id);
            let diff = res_on_market_details.data.partOnMarket.quantity - part.quantity;
            await SuppliedPartsDataService.delete(part._id);
            if (diff < 0) {
                notifyError(" We can't deduct " + part.quantity + " quantities of " + part.spare_part.name + " On Market")
            } else {
                await SparePartService.updatePartOnMarket(res_on_market_details.data.partOnMarket._id, {
                    part_in_stock: res_on_market_details.data.partInStock._id,
                    unit_price: res_on_market_details.data.partOnMarket.unit_price,
                    quantity: diff
                })
                notifySuccess(" We have deducted " + part.quantity + "quantities of " + part.spare_part.name + " On Market");
            }
        }
        await SupplyService.delete(supply);
        notifySuccess("Supply is deleted Successfully");
    } catch (e) {
        notifyError(e.message)
    }
}

const Table = ({
                   supplies,
                   setSupplies,
                   paginator,
                   setPaginator,
                   paginatorLoading,
                   setPaginatorLoading,
                   getInitialData,
                   SYSTEM_USER
               }) => {

    const [item, setItem] = useState({item: "", status: ""});
    const [loading, setLoading] = useState(false)
    const [fields, setFields] = useState(null)
    const [data, setData] = useState(null)


    const handleSetMoreItem = (item) => {
        $(function () {
            $('#supplyOrderModalDialog').modal('show');
        })
        console.log("item details", item)
        SuppliedPartsDataService.getFromSupply(item._id)
            .then((res) => {
                setData(res.data)
            }).catch(e => console.log(e))
    }

    const handleSetItem = (inputItem, status) => {
        setItem({item: inputItem, status: status})
        if (status === "update") {
            show_modal("#updateConfirmationModal");
            setUpdateStatus("UPDATE");
        } else if (status === "delete") {
            show_modal("#updateConfirmationModal");
            setUpdateStatus("DELETE");
        } else {
            handleSetMoreItem(inputItem)
        }

    }


    const GotoUpdate = () => {
        router.push(gotoPath("supplies/update", item.item._id))
    }

    const ShowDelete = () => {
        show_modal('#deleteConfirmationModal')
    }

    const handlePageChange = (page) => {
        setPaginatorLoading(true)
        setPaginator({...paginator, ['page']: page});
    };

    const [alert, setAlert] = useState({message: "", class: "", show: false})

    const deleteItem = (item) => {
        SuppliedPartsDataService.getFromSupply(item.item._id)
            .then(async (res) => {
                await DeleteSupply(item.item._id, res.data).then(r => {
                });
            }).catch(e => console.log(e)).finally(() => {
            getInitialData();
            setLoading(false);
            hide_modal('#deleteConfirmationModal')
        })
    }


    const sortBy = (prop, order) => {
        setSupplies(sortData(supplies, prop, order));
    }

    const router = useRouter();

    useEffect(() => {
        if (router.query.subject) {
            SupplyService.get(handleDoubleDecryptionPath(router.query.subject))
                .then((res) => {
                    const item = res.data;
                    setItem({item: item, status: "read-more"})
                    handleSetMoreItem(item);
                }).catch((e) => {
                console.log(e)
            })
        }

    }, [router.query.subject])


    const [updateStatus, setUpdateStatus] = useState(null);

    return (
        <React.Fragment>
            <div className="table-responsive col-12">
                <table className={'table border rounded ' + styles.table} style={{fontSize: '0.8em'}}>
                    <thead>
                    <tr>
                        <th scope="col" className={styles.th}>#</th>
                        <th scope="col" className={styles.th}>Supplier</th>
                        <th scope="col" className={styles.th}>Reciever</th>
                        <th scope="col" className={styles.th}>Price</th>
                        <Th name={'Supplied On'} prop={'supply_date'} sorter={sortBy}/>
                        <th scope="col" className={styles.th}>Action</th>
                    </tr>
                    </thead>

                    <tbody>
                    {supplies && supplies.map((supply, index) => {
                        return (
                            <tr key={supply._id}>
                                <th scope="row" className={styles.td}><span
                                    className="text-uppercase">{index + 1}</span>
                                </th>
                                <td className={styles.td}>{supply.supplier.user.username}</td>
                                <td className={styles.td}>{supply.reciever.user.firstName + ' ' + supply.reciever.user.lastName}</td>
                                <td className={styles.td}>{supply.supply_price || '0'}</td>
                                <td className={styles.td}>{dateFormat(supply.supply_date).fromNow() + " - " + dateFormat(supply.supply_date).onlyDate()}</td>
                                <td className={styles.td}><ActionButtons handleSetItem={handleSetItem} item={supply}
                                                                         allowed={SYSTEM_USER === system_users.ADMIN ? ["READ_MORE", "DELETE"] : ["READ_MORE"]}/>
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

            {item.status === "read-more" ?
                <ModalContainer itemObj={item.item} status="supply" title={"Supply Information"} data={data}
                                date={dateFormat(item.item.createdAt).fromNow()}/> : null}

            <DeleteConfirmation text={item.item.createdAt} item={item} deleteItem={deleteItem} setAlert={setAlert}
                                alert={alert} loading={loading} setLoading={setLoading}/>
            {<ConfirmModal callBack={updateStatus === "UPDATE" ? GotoUpdate : ShowDelete} system_user={SYSTEM_USER}/>}
            <React.Fragment>
                <button id="modal2ShowBtn" className="d-none" data-toggle="modal"
                        data-target="#deleteConfirmationModal">Large modal
                </button>
            </React.Fragment>
        </React.Fragment>
    );
}


const SuppliesTable = () => {

    const [supplies, setSupplies] = useState([]);
    const [searchSupplies, setSearchSupplies] = useState([]);
    const [paginator, setPaginator] = useState({page: 1, perPage: 5, total: 0, range: 5});
    const [isSearch, setIsSearch] = useState(false);
    const [searchKey, setSearchKey] = useState('');

    const [totals, setTotals] = useState({suppliers: 0, supplies: 0, car_supplies: 0});
    const [paginatorLoading, setPaginatorLoading] = useState(true);

    const getSupplies = (page) => {
        SupplyService.getPaginated(page).then((res) => {
            setSupplies(res.data.docs);
            setPaginatorLoading(false);
            setSearchSupplies(res.data.docs);
            setPaginator({...paginator, total: res.data.totalDocs, page: res.data.page});
        }).catch(e => console.log(e))
    }
    const getSearchSupplies = (val, page) => {
        SupplyService.searchPaginated(val, page).then((res) => {
            setSearchSupplies(res.data.docs);
            setPaginatorLoading(false);
            setPaginator({...paginator, total: res.data.totalDocs, page: res.data.page});
        }).catch(e => console.log(e))
    }


    const getTotals = async () => {
        const totals = {suppliers: 0, supplies: 0, car_supplies: 0};

        try {
            const suppliers = await SuppliersService.getPaginated();
            const supplies = await SupplyService.getPaginated();
            totals.suppliers = suppliers.data.totalDocs;
            totals.supplies = supplies.data.totalDocs;

            totals.car_supplies = car_supplies.data.totalDocs;
            setTotals(totals);
        } catch {
            e => console.log(e)
        }

    }
    useEffect(() => {
        getTotals();
        if (!isSearch)
            getSupplies(paginator.page);
        else getSearchSupplies(searchKey, paginator.page);
    }, [paginator.page]);

    const getSearchKey = (val) => {
        setSearchKey(val);
        if (val === '' || val === ' ' || !val.replace(/\s/g, '').length) {
            setSearchSupplies(supplies);
            setIsSearch(false);
        } else {
            getSearchSupplies(val, paginator.page);
            setIsSearch(true);
        }
    };

    const getFilterKey = (key) => {
        setSearchSupplies(filterData(supplies, 'status', key));
    }


    const admin_panes = [
        {name: 'Suppliers', count: totals.suppliers, route: '/shared/supply'},
        {name: 'Part Supplies', count: totals.supplies, route: '/shared/supply/supplies'},
        {name: 'Car Supplies', count: totals.car_supplies, route: '/admin/cars/supplies'}
    ];


    const panes = [
        {name: 'Suppliers', count: totals.suppliers, route: '/shared/supply'},
        {name: 'Supplies', count: totals.supplies, route: '/shared/supply/supplies'},
    ];


    const getInitialData = () => {
        getSupplies(paginator.page);
    }

    const user = useSelector(state => state.authUser);

    return (
        <SingleSubModuleLayoutAdmin
            Content={<Table supplies={searchSupplies} getInitialData={getInitialData}
                            SYSTEM_USER={system_users.ADMIN}
                            paginatorLoading={paginatorLoading} setPaginatorLoading={setPaginatorLoading}
                            setSupplies={setSearchSupplies} paginator={paginator} setPaginator={setPaginator}/>}
            isArray={true}
            panes={panes}
            showFilter={false}
            setFilter={getFilterKey}
            name={'Supplies'}
            setSearch={getSearchKey}
            status={"new"}
            hideAction={true}
            route={"/shared/supply/supplies"}

        />
    );
};


export default SuppliesTable;