import React, {useEffect, useState} from 'react';
import styles from "../../../styles/pages/table.module.css";
// import Update from "./update";
import ActionButtons from "../../../components/tables/ActionButtons"
import SingleSubModuleLayout from "../../../layouts/admin-layouts/SingleSubModule";
import {filterData, getFormattedDate, sortData} from "../../../utils/functions";
import EmployeesService from "../../../services/employees/employees"
import {Th} from "../../../components/reusable/TableComponents";
import ModalProfileDetails from '../../../components/reusable/app-user-details';
import {show_modal} from "../../../utils/modal-funs";
import Paginator from "../../../components/tables/paginator";
import EmployeeCategoriesDataService from "../../../services/employees/employee-categories";
import EmployeeRolesDataService from "../../../services/employees/employee-roles";

const Table = ({employees, setEmployees, paginator, setPaginator, paginatorLoading, setPaginatorLoading,getInitialData}) => {
    const [item, setItem] = useState(null);
    const [fields, setFields] = useState(null)

    const handleSetItem = (item, status) => {
        setItem(item);
        show_modal('#profileModalDetails')
    }

    const handlePageChange = (page) => {
        setPaginatorLoading(true)
        setPaginator({...paginator, ['page']: page});
    };

    const [alert, setAlert] = useState({message: "", class: "", show: false})


    const sortBy = (prop, order) => {
        setEmployees(sortData(employees, prop, order));
    }


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
                        <th scope="col" className={styles.th}>Category</th>
                        <th scope="col" className={styles.th}>Status</th>
                        <Th name={'Created On'} prop={'createdAt'} sorter={sortBy}/>
                        <th scope="col" className={styles.th}>Action</th>
                    </tr>
                    </thead>

                    <tbody>
                    {employees && employees.map((employee, index) => {
                        return (
                            <tr key={employee._id}>
                                <th scope="row" className={styles.td}><span
                                    className="text-uppercase">{index + 1}</span></th>
                                {/*<td  className={styles.td}>{employee.user.username}</td>*/}
                                <td className={styles.td}>{employee.user.firstName + ' ' + employee.user.lastName}</td>
                                <td className={styles.td}>{employee.user.phone || 'N/A'}</td>
                                <td className={styles.td}>{employee.user.gender || 'N/A'}</td>
                                <td className={styles.td}>{employee.employeeCategory.category}</td>
                                <td className={styles.td}>
                                        <span
                                            className={(employee.status === 'ACTIVE') ? styles.active : (employee.status === 'INACTIVE') ? styles.inactive : (employee.status === 'PENDING') ? styles.pending : ''}>
                                            {employee.status}
                                        </span>
                                </td>
                                <td className={styles.td}>{getFormattedDate(employee.createdAt)}</td>
                                <td className={styles.td}><ActionButtons handleSetItem={handleSetItem} item={employee}
                                                                         allowed={["READ_MORE"]}/></td>
                            </tr>
                        )
                    })
                    }
                    </tbody>
                </table>
            </div>
            <Paginator paginator={paginator} handlePageChange={handlePageChange}
                       paginatorLoading={paginatorLoading}/>

            {item && <ModalProfileDetails item={item} category={item.employeeCategory.category} getInitialData={getInitialData}/>}
        </React.Fragment>
    );
}


const EmployeesTable = () => {

    const [employees, setEmployees] = useState([]);
    const [searchEmployees, setSearchEmployees] = useState([]);
    const [totals, setTotals] = useState({employees: 0, categories: 0, roles: 0});
    const [paginator, setPaginator] = useState({page: 1, perPage: 5, total: 0, range: 5});
    const [isSearch, setIsSearch] = useState(false);
    const [searchKey, setSearchKey] = useState('');

    let all = [];
    const [paginatorLoading, setPaginatorLoading] = useState(true);

    const getEmployees = (page) => {
        EmployeesService.getPaginated(page)
            .then((res) => {
                setEmployees(res.data.docs);
                setSearchEmployees(res.data.docs);
                // setTotal(res.data.totalDocs);
                setPaginatorLoading(false);
                setPaginator({
                    ...paginator,
                    total: res.data.totalDocs,
                    page: res.data.page,
                });
            })
            .catch((e) => console.error(e));
    }
    const getSearchEmployees = (val, page) => {
        EmployeesService.searchPaginated(val, page).then((res) => {
            setSearchEmployees(res.data.docs);
            setPaginatorLoading(false);
            setPaginator({...paginator, total: res.data.totalDocs, page: res.data.page});
        })
    }
    useEffect(() => {
        if (!isSearch)
            getEmployees(paginator.page);
        else getSearchEmployees(searchKey, paginator.page);
    }, [paginator.page]);

    useEffect(()=>{
        getTotals();
    },[])

    const getSearchKey = (val) => {
        setSearchKey(val);
        if (val === '' || val === ' ' || !val.replace(/\s/g, '').length) {
            setSearchEmployees(employees);
            setIsSearch(false);
        } else {
            getSearchEmployees(val, paginator.page);
            setIsSearch(true);
        }
    };

    const getFilterKey = (key) => {
        setSearchEmployees(filterData(employees, 'status', key));
    }

    const getInitialData=()=>{
        getEmployees(paginator.page);
    }


    const getTotals = async () => {
        const totals = {employees: 0, categories: 0, roles: 0};

        try {
            const employees = await EmployeesService.getPaginated();
            const categories = await EmployeeCategoriesDataService.getAll();
            const roles = await EmployeeRolesDataService.getAll();

            totals.employees = employees.data.totalDocs;

            totals.categories = categories.data.totalDocs;
            totals.roles = roles.data.totalDocs;

            setTotals(totals);
        } catch (e) {
            console.log(e)
        }
    }


    const panes = [
        {name: 'Employees', count: totals.employees, route: '/admin/employees'},
        {name: 'Categories', count: totals.categories, route: '/admin/employees/categories'},
        {name: 'Roles', count: totals.roles, route: '/admin/employees/categories/roles'},
    ];


    return (
        <SingleSubModuleLayout
            Content={<Table employees={searchEmployees} setEmployees={setSearchEmployees} paginator={paginator}
                            paginatorLoading={paginatorLoading} setPaginatorLoading={setPaginatorLoading}
                            setPaginator={setPaginator} getInitialData={getInitialData}/>}
            isArray={true}
            panes={panes}
            name={"Employees"}
            route={"/admin/employees"}
            showFilter={true}
            setSearch={getSearchKey}
            setFilter={getFilterKey}
            status="new"
        />
    );
};


export default EmployeesTable;