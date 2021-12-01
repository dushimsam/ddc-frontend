import React, {useEffect, useState} from 'react';
import styles from "../../../styles/pages/table.module.css";
// import Update from "./update";
import {filterData, getFormattedDate, sortData} from "../../../utils/functions";
import SupplierService from "../../../services/supplies/SupplierService";
import SuppliersService from "../../../services/supplies/SupplierService";
import SupplyService from "../../../services/supplies/SupplyService";
import {Th} from "../../../components/reusable/TableComponents";
import SingleSubModuleLayoutAdmin from "../../../layouts/admin-layouts/SingleSubModule";
import ModalProfileDetails from '../../../components/reusable/app-user-details';
import {useSelector} from "react-redux";
import Paginator from "../../../components/tables/paginator";


const Table = ({
                   suppliers, setSuppliers, paginator, paginatorLoading,
                   setPaginatorLoading, setPaginator, getInitialData
               }) => {


    const [item, setItem] = useState(null);


    const handleSetItem = (item) => {
        setItem(item);
        document.getElementById("modalShowBtn").click()
    }

    const handlePageChange = (page) => {
        setPaginatorLoading(true)
        setPaginator({...paginator, ['page']: page});
    };

    const [alert, setAlert] = useState({message: "", class: "", show: false})

    const deleteItem = (item) => {
        SupplierService.deleteModel(item._id).then((res) => {
            setAlert({show: true, class: "success", message: "Record is Deleted successfully."});
            window.location.reload();
        }).catch((e) => {
            setAlert({
                show: true,
                class: "danger",
                message: e.response ? e.response.data.message : e.message || "Error occurred. Try again latter."
            })
        });
    }

    const sortBy = (prop, order) => {
        setSuppliers(sortData(suppliers, prop, order));
    }


    return (
        <React.Fragment>
            <div className="table-responsive col-12">

                <table className={'table border rounded ' + styles.table} style={{fontSize: '0.8em'}}>
                    <thead>
                    <tr>
                        <th scope="col" className={styles.th}>#</th>
                        <th scope="col" className={styles.th}>Full Names</th>
                        <th scope="col" className={styles.th}>Address</th>
                        <th scope="col" className={styles.th}>Mobile</th>
                        <th scope="col" className={styles.th}>Username</th>
                        <th scope="col" className={styles.th}>Status</th>
                        <Th name={'Created On'} prop={'createdAt'} sorter={sortBy}/>
                        {/*<th scope="col" className={styles.th}>Action</th>*/}
                    </tr>
                    </thead>

                    <tbody>
                    {suppliers && suppliers.map((supplier, index) => {
                        return (
                            <tr key={supplier._id}>
                                <th scope="row" className={styles.td}><span
                                    className="text-uppercase">{index + 1}</span></th>
                                {/*<td  className={styles.td}>{supplier.user.username}</td>*/}
                                <td className={styles.td}>{supplier.user.firstName + ' ' + supplier.user.lastName}</td>
                                <td className={styles.td}>{supplier.address || 'N/A'}</td>
                                <td className={styles.td}>{supplier.user.phone || 'N/A'}</td>
                                <td className={styles.td}>{supplier.user.username || 'N/A'}</td>
                                <td className={styles.td}>
                                        <span
                                            className={(supplier.status === 'ACTIVE') ? styles.active : (supplier.status === 'INACTIVE') ? styles.inactive : (supplier.status === 'PENDING') ? styles.pending : ''}>
                                            {supplier.status}
                                        </span>
                                </td>
                                <td className={styles.td}>{getFormattedDate(supplier.createdAt)}</td>
                                {/*<td className={styles.td}><ActionButtons handleSetItem={handleSetItem} item={supplier}*/}
                                {/*                                         allowed={["READ_MORE"]}/></td>*/}
                            </tr>
                        )
                    })
                    }
                    </tbody>
                </table>
            </div>
            <Paginator paginator={paginator} handlePageChange={handlePageChange}
                       paginatorLoading={paginatorLoading}/>

            {/* {fields && <RecordDetails title={item.user.firstName} fields={fields}/>} */}
            {item && <ModalProfileDetails item={item} category={"PRODUCT SUPPLIER"} getInitialData={getInitialData}/>}

            <React.Fragment>
                <button id="modalShowBtn" className="d-none" data-toggle="modal" data-target="#itemReadMoreModal">Large
                    modal
                </button>
            </React.Fragment>
        </React.Fragment>
    );
}


const SuppliersTable = () => {

    const [suppliers, setSuppliers] = useState([]);
    const [searchSuppliers, setSearchSuppliers] = useState([]);
    const [paginator, setPaginator] = useState({page: 1, perPage: 5, total: 0, range: 5});
    const [isSearch, setIsSearch] = useState(false);
    const [searchKey, setSearchKey] = useState('');

    const [totals, setTotals] = useState({suppliers: 0, supplies: 0, car_supplies: 0});
    const [paginatorLoading, setPaginatorLoading] = useState(true);

    const getSuppliers = (page) => {
        SupplierService.getPaginated(page).then((res) => {
            setSuppliers(res.data.docs);
            setSearchSuppliers(res.data.docs);
            setPaginatorLoading(false);

            setPaginator({...paginator, total: res.data.totalDocs, page: res.data.page});
        }).catch(e => console.log(e))
    }
    const getSearchSuppliers = (val, page) => {
        SupplierService.searchPaginated(val, page).then((res) => {
            setSearchSuppliers(res.data.docs);
            setPaginatorLoading(false);

            setPaginator({...paginator, total: res.data.totalDocs, page: res.data.page});
        }).catch(e => console.log(e))
    }


    const getTotals = async () => {
        const totals = {suppliers: 0, supplies: 0};

        try {
            const suppliers = await SuppliersService.getPaginated();
            const supplies = await SupplyService.getPaginated();

            totals.suppliers = suppliers.data.totalDocs;
            totals.supplies = supplies.data.totalDocs;

            setTotals(totals);
        } catch {
            e => console.log(e)
        }

    }


    useEffect(() => {
        getTotals();
        if (!isSearch)
            getSuppliers(paginator.page);
        else getSearchSuppliers(searchKey, paginator.page);
    }, [paginator.page]);

    const getSearchKey = (val) => {
        setSearchKey(val);
        if (val === '' || val === ' ' || !val.replace(/\s/g, '').length) {
            setSearchSuppliers(suppliers);
            setIsSearch(false);
        } else {
            getSearchSuppliers(val, paginator.page);
            setIsSearch(true);
        }
    };

    const getFilterKey = (key) => {
        setSearchSuppliers(filterData(suppliers, 'status', key));
    }


    const admin_panes = [
        {name: 'Suppliers', count: totals.suppliers, route: '/shared/supply'},
        {name: 'Supplies', count: totals.supplies, route: '/shared/supply/supplies'},
    ];


    const user = useSelector(state => state.authUser);

    const getInitialData = () => {
        getSuppliers(paginator.page);
    }
    return (

        <SingleSubModuleLayoutAdmin
            Content={<Table suppliers={searchSuppliers} setSuppliers={setSearchSuppliers} paginator={paginator}
                            paginatorLoading={paginatorLoading} setPaginatorLoading={setPaginatorLoading}
                            setPaginator={setPaginator} getInitialData={getInitialData}/>}
            isArray={true}
            panes={admin_panes}
            showFilter={true}
            setFilter={getFilterKey}
            name={'Suppliers'}
            setSearch={getSearchKey}
            status="new"
            route={"/shared/supply"}

        />
    )
};


export default SuppliersTable;