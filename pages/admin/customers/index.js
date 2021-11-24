import React, {useEffect, useState} from 'react';
import styles from "../../../styles/pages/table.module.css";
// import Update from "./update";
import ActionButtons from "../../../components/tables/ActionButtons"
import SingleSubModuleLayout from "../../../layouts/admin-layouts/SingleSubModule";
import {filterData, getFormattedDate, handleDoubleDecryptionPath, sortData} from "../../../utils/functions";
import CustomerService from "../../../services/customers/customer.service"
import UserService from "../../../services/users/user.service"
import {Th} from "../../../components/reusable/TableComponents";
import Pagination from "react-js-pagination";
import ModalProfileDetails from '../../../components/reusable/app-user-details';
import {system_users} from "../../../utils/constants";
import $ from "jquery";
import {show_modal} from "../../../utils/modal-funs";
import {useRouter} from "next/router";

const Table = ({customers, setCustomers, paginator, setPaginator, getInitialData}) => {
    const [item, setItem] = useState(null);
    const [fields, setFields] = useState(null)

    const handleSetItem = (item, status) => {
        setItem(item);
        show_modal('#profileModalDetails')
    }

    const handlePageChange = (page) => {
        setPaginator({...paginator, ['page']: page});
    };

    const [alert, setAlert] = useState({message: "", class: "", show: false})


    const sortBy = (prop, order) => {
        setCustomers(sortData(customers, prop, order));
    }


    const router = useRouter();

    useEffect(() => {
        if (router.query.subject) {
            CustomerService.get(handleDoubleDecryptionPath(router.query.subject))
                .then((res) => {
                    const item = res.data;
                    handleSetItem(item)
                }).catch(e => console.log(e))
        }
    }, [router.query.subject])
    return (
        <React.Fragment>
            <div className="table-responsive col-12">
                <table className={'table border rounded ' + styles.table} style={{fontSize: '0.8em'}}>
                    <thead>
                    <tr>
                        <th scope="col" className={styles.th}>#</th>
                        <th scope="col" className={styles.th}>Full Names</th>
                        <th scope="col" className={styles.th}>Mobile</th>
                        <th scope="col" className={styles.th}>Gender</th>
                        <th scope="col" className={styles.th}>Status</th>
                        <Th name={'Created On'} prop={'createdAt'} sorter={sortBy}/>
                        <th scope="col" className={styles.th}>Action</th>
                    </tr>
                    </thead>

                    <tbody>
                    {customers && customers.map((customer, index) => {
                        return (
                            <tr key={customer._id}>
                                <th scope="row" className={styles.td}><span
                                    className="text-uppercase">{index + 1}</span></th>
                                {/*<td  className={styles.td}>{customer.user.username}</td>*/}
                                <td className={styles.td}>{customer.user.firstName + ' ' + customer.user.lastName}</td>
                                <td className={styles.td}>{customer.user.phone || 'N/A'}</td>
                                <td className={styles.td}>{customer.user.gender || 'N/A'}</td>
                                <td className={styles.td}>
                                        <span
                                            className={(customer.status === 'ACTIVE') ? styles.active : (customer.status === 'INACTIVE') ? styles.inactive : (customer.status === 'PENDING') ? styles.pending : ''}>
                                            {customer.status}
                                        </span>
                                </td>
                                <td className={styles.td}>{getFormattedDate(customer.createdAt)}</td>
                                <td className={styles.td}><ActionButtons handleSetItem={handleSetItem} item={customer}
                                                                         allowed={["READ_MORE"]}/></td>
                            </tr>
                        )
                    })
                    }
                    </tbody>
                </table>
            </div>
            <div className={"row justify-content-end mt-4 mb-4"}>
                <Pagination activePage={paginator.page} itemsCountPerPage={paginator.perPage}
                            totalItemsCount={paginator.total} pageRangeDisplayed={paginator.range}
                            onChange={handlePageChange}/>
            </div>
            {item && <ModalProfileDetails item={item} category={"CUSTOMER"} getInitialData={getInitialData}/>}

        </React.Fragment>
    );
}


const EmployeesTable = () => {
    const [customers, setCustomers] = useState([]);
    const [searchCustomers, setSearchCustomers] = useState([]);
    const [total, setTotal] = useState(0);
    const [paginator, setPaginator] = useState({page: 1, perPage: 5, total: 0, range: 5});
    const [isSearch, setIsSearch] = useState(false);
    const [searchKey, setSearchKey] = useState('');

    let all = [];

    const getEmployees = (page) => {
        UserService.getAll()
            .then((res) => {
                console.log("users ", res.data)
            }).catch(e => console.log(e))
        CustomerService.getAllPaginated(page)
            .then((res) => {
                setCustomers(res.data.docs);
                setSearchCustomers(res.data.docs);
                setTotal(res.data.totalDocs);
                setPaginator({
                    ...paginator,
                    total: res.data.totalDocs,
                    page: res.data.page,
                });
            })
            .catch((e) => console.error(e));
    }
    const getSearchEmployees = (val, page) => {
        CustomerService.searchPaginated(val, page).then((res) => {
            setSearchCustomers(res.data.docs);
            setPaginator({...paginator, total: res.data.totalDocs, page: res.data.page});
        })
    }
    useEffect(() => {
        if (!isSearch)
            getEmployees(paginator.page);
        else getSearchEmployees(searchKey, paginator.page);
    }, [paginator.page]);

    const getSearchKey = (val) => {
        setSearchKey(val);
        if (val === '' || val === ' ' || !val.replace(/\s/g, '').length) {
            setSearchCustomers(customers);
            setIsSearch(false);
        } else {
            getSearchEmployees(val, paginator.page);
            setIsSearch(true);
        }
    };

    const getFilterKey = (key) => {
        setSearchCustomers(filterData(customers, 'status', key));
    }

    const getInitialData = () => {
        getEmployees(paginator.page);
    }

    return (
        <SingleSubModuleLayout
            Content={<Table customers={searchCustomers} setCustomers={setSearchCustomers} paginator={paginator}
                            setPaginator={setPaginator} getInitialData={getInitialData}/>}
            count={total}
            route={"/admin/customers"}
            showFilter={true}
            setSearch={getSearchKey}
            setFilter={getFilterKey}
            name={"Customers"}
            status="new"
            hideAction={true}
        />
    );
};


export default EmployeesTable;