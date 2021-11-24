import EmployeeRolesDataService from "../../../../../services/employees/employee-roles"
import React, {useEffect, useState} from 'react';
import EmployeesService from "../../../../../services/employees/employees";
import {getFormattedDate, handleDoubleDecryptionPath} from "../../../../../utils/functions";
import SingleSubModuleLayout from "../../../../../layouts/admin-layouts/SingleSubModule";
import EmployeeCategoriesDataService from "../../../../../services/employees/employee-categories";
import styles from "../../../../../styles/pages/table.module.css";
import ActionButtons from "../../../../../components/tables/ActionButtons";
import Paginator from "../../../../../components/tables/paginator";
import {hide_delete_modal, hide_modal, hide_modal_alert, show_modal} from "../../../../../utils/modal-funs";
import {alertFailer} from "../../../../../utils/alerts";
import {useRouter} from "next/router";
import {processDetailedDate} from "../../../../../utils/process-date";
import Update from "./update";
import DeleteConfirmation from "../../../../../components/tables/delete-confirmation-modal";
import ReadMoreLayout, {ListMapping, MapDetails} from "../../../../../components/layouts/read-more-dialog-layout";


const Table = ({
                   roles,
                   setEmployeeRoles,
                   paginator,
                   setPaginator,
                   paginatorLoading,
                   setPaginatorLoading,
                   getInitialData
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
        EmployeeRolesDataService.delete(item._id).then((res) => {
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

    const router = useRouter();


    const handleSetFields = (item) => {
        setItemFields([{name: "Role", value: item.role}, {
            name: "Description",
            value: item.description
        }, {name: "Created-AT", value: processDetailedDate(item.createdAt)}]);
        show_modal('#itemReadMoreModalLayout');
    }

    window.onbeforeunload = function () {
        hide_modal('#itemReadMoreModalLayout');
    }

    useEffect(() => {
        if (router.query.subject) {
            EmployeeRolesDataService.get(handleDoubleDecryptionPath(router.query.subject))
                .then((res) => {
                    const item = res.data;
                    handleSetFields(item)
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
                        <th scope="col" className={styles.th}>Role</th>
                        {/*<th scope="col" className={styles.th}>Description</th>*/}
                        <th scope="col" className={styles.th}>CreatedAt</th>
                        <th scope="col" className={styles.th}>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {roles.map((item, index) => {
                        return (
                            <tr key={item._id}>
                                <th scope="row" className={styles.td}><span
                                    className="text-uppercase">{index + 1}</span></th>
                                <td className={styles.td}>{item.role}</td>
                                {/*<td className={styles.td} style={{whiteSpace:"initial"}}>{item.description || 'N/A'}</td>*/}
                                <td className={styles.td}>{getFormattedDate(item.createdAt)}</td>
                                <td className={styles.td}><ActionButtons handleSetItem={handleSetItem} item={item}
                                                                         allowed={["READ_MORE", "UPDATE", "DELETE"]}/>
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
            {itemFields && <ReadMoreLayout parentContentTitle={"EMPLOYEE ROLE INFORMATION"} childContentTitle={""}
                                           ParentContent={<MapDetails fields={itemFields}/>} ChildContent={childFields ?
                <ListMapping fields={childFields ?? []}/> : null}/>}
        </React.Fragment>
    );
}


const EmployeesRolesTable = () => {
    const [totals, setTotals] = useState({employees: 0, categories: 0, roles: 0});

    const [employeeRoles, setEmployeeRoles] = useState([]);
    const [searchEmployeesRoles, setSearchEmployeeRoles] = useState([]);
    const [paginator, setPaginator] = useState({page: 1, perPage: 5, total: 0, range: 5});

    const panes = [
        {name: 'Employees', count: totals.categories, route: '/admin/employees'},
        {name: 'Categories', count: totals.categories, route: '/admin/employees/categories'},
        {name: 'Roles', count: totals.roles, route: '/admin/employees/categories/roles'},
    ];

    let all = [];
    const [paginatorLoading, setPaginatorLoading] = useState(true);

    const getEmployeeRoles = (page) => {
        EmployeeRolesDataService.getAll()
            .then((res) => {
                setEmployeeRoles(res.data.docs);
                setSearchEmployeeRoles(res.data.docs);
                setPaginatorLoading(false);
                setPaginator({
                    ...paginator,
                    total: res.data.totalDocs,
                    page: res.data.page,
                });
            })
            .catch((e) => console.error(e));
    }

    useEffect(() => {
        getTotals();
        getEmployeeRoles(paginator.page);
    }, [paginator.page]);

    const getInitialData = () => {
        getEmployeeRoles(paginator.page);
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

    return (
        <SingleSubModuleLayout
            Content={<Table roles={searchEmployeesRoles} setEmployeeRoles={setSearchEmployeeRoles} paginator={paginator}
                            paginatorLoading={paginatorLoading} setPaginatorLoading={setPaginatorLoading}
                            setPaginator={setPaginator} getInitialData={getInitialData}/>}
            route={"/admin/employees/categories/roles"}
            showFilter={false}
            isArray={true}
            panes={panes}
            hideSearch={true}
            name={"Roles"}
            status="new"
        />
    );
};


export default EmployeesRolesTable;