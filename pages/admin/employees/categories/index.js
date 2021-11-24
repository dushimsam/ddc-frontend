import React, {useEffect, useState} from 'react';
import {processDetailedDate} from "../../../../utils/process-date"
import {hide_modal, show_modal} from "../../../../utils/modal-funs";
import {useRouter} from "next/router";
import {getFormattedDate, handleDoubleDecryptionPath} from "../../../../utils/functions";
import styles from "../../../../styles/pages/table.module.css";
import ActionButtons from "../../../../components/tables/ActionButtons";
import Paginator from "../../../../components/tables/paginator";
import {ALERT_EXPIRATION_PERIOD, system_users} from "../../../../utils/constants";
import EmployeeCategoriesDataService from "../../../../services/employees/employee-categories"
import ReadMoreLayout, {ListMapping, MapDetails} from "../../../../components/layouts/read-more-dialog-layout";
import Update from "./update";
import DeleteConfirmation from "../../../../components/tables/delete-confirmation-modal";
import EmployeesService from "../../../../services/employees/employees";
import EmployeeRolesDataService from "../../../../services/employees/employee-roles";
import SingleSubModuleLayout from "../../../../layouts/admin-layouts/SingleSubModule";


const Table = ({
                   categories,
                   setCategories,
                   paginator,
                   setPaginator,
                   paginatorLoading,
                   setPaginatorLoading,
                   getInitialData
               }) => {

    const [item, setItem] = useState(null);
    const [itemFields, setItemFields] = useState(null);
    const [childFields, setChildFields] = useState(null);


    const handleSetFields = (item) => {
        setItemFields([{name: "CATEGORY", value: item.category}, {
            name: "Description",
            value: item.description
        }, {name: "CREATED AT", value: processDetailedDate(item.createdAt)}]);
        show_modal('#itemReadMoreModalLayout');
    }
    const handleSetChildFields = (item) => {
        EmployeeCategoriesDataService.getRoles(item._id)
            .then((res) => {
                console.log("found", res.data)
                setChildFields(res.data.map((resItem, index) => {
                    return {
                        name: (index + 1),
                        value: res.data[index].name,
                        href: "/admin/employees/categories/roles",
                        _id: res.data[index]._id
                    }
                }))
            }).catch(e => console.log(e))
    }


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

    const deleteItem = (item) => {
        EmployeeCategoriesDataService.delete(item._id).then((res) => {
            setAlert({show: true, class: "success", message: "Record is Deleted successfully."});
            getInitialData();
            window.setTimeout(() => {
                hide_modal('#deleteConfirmationModal')
                setAlert({show: false, class: "success", message: "Record is Deleted successfully."});
            }, ALERT_EXPIRATION_PERIOD);

        }).catch((e) => {
            setAlert({
                show: true,
                class: "danger",
                message: e.response ? e.response.data.message : e.message || "Error occurred. Try again latter."
            })
            window.setTimeout(() => {
                setAlert({show: false, class: "success", message: "Record is Deleted successfully."});
            }, ALERT_EXPIRATION_PERIOD);
        }).finally(() => {
            setLoading(false)
        })
    }


    const [loading, setLoading] = useState(false);


    const router = useRouter();

    useEffect(() => {
        if (router.query.subject) {
            EmployeeCategoriesDataService.get(handleDoubleDecryptionPath(router.query.subject))
                .then((res) => {
                    const item = res.data;
                    handleSetFields(item);
                    setItem(item);
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
                        <th scope="col" className={styles.th}>Category</th>
                        {/*<th scope="col" className={styles.th}>Description</th>*/}
                        <th scope="col" className={styles.th}>CreatedAt</th>
                        <th scope="col" className={styles.th}>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {categories.map((item, index) => {
                        return (
                            <tr key={item._id}>
                                <th scope="row" className={styles.td}><span
                                    className="text-uppercase">{index + 1}</span></th>
                                <td className={styles.td}>{item.category}</td>
                                {/*<td className={styles.td}>{item.description || 'N/A'}</td>*/}
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
            <DeleteConfirmation text={item.category} item={item} setAlert={setAlert} deleteItem={deleteItem}
                                alert={alert}
                                loading={loading} setLoading={setLoading}/>}

            {itemFields && <ReadMoreLayout parentContentTitle={"CATEGORY INFORMATION"}
                                           childContentTitle={"All Roles under this category"}
                                           ParentContent={<MapDetails fields={itemFields}/>} ChildContent={childFields ?
                <ListMapping fields={childFields ?? []}/> : null}/>}
        </React.Fragment>
    );
}


const CategoriesTable = () => {

    const [categories, setCategories] = useState([]);
    const [searchCategories, setSearchCategories] = useState([]);
    const [paginator, setPaginator] = useState({page: 1, perPage: 5, total: 0, range: 5});
    const [totals, setTotals] = useState({employees: 0, categories: 0, roles: 0});

    let all = [];
    const [paginatorLoading, setPaginatorLoading] = useState(true);

    const getCategories = (page) => {
        EmployeeCategoriesDataService.getAll().then((res) => {
            setCategories(res.data.docs);
            setSearchCategories(res.data.docs);
            setPaginatorLoading(false);
            setTotals({...totals, categories: res.data.totalDocs});
            setPaginator({...paginator, total: res.data.totalDocs, page: res.data.page});
        }).catch(e => console.log(e))
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


    useEffect(() => {
        getTotals();
        getCategories(paginator.page);
    }, [paginator.page]);


    const getInitialData = () => {
        getCategories(paginator.page);
    }


    const panes = [
        {name: 'Employees', count: totals.employees, route: '/admin/employees'},
        {name: 'Categories', count: totals.categories, route: '/admin/employees/categories'},
        {name: 'Roles', count: totals.roles, route: '/admin/employees/categories/roles'},
    ];


    return (
        <SingleSubModuleLayout
            Content={<Table categories={searchCategories} systemUser={system_users.ADMIN}
                            paginatorLoading={paginatorLoading} setPaginatorLoading={setPaginatorLoading}
                            setCategories={setSearchCategories} getInitialData={getInitialData}
                            paginator={paginator} setPaginator={setPaginator}/>}
            isArray={true}
            panes={panes}
            showFilter={false}
            name={'Categories'}
            hideSearch={true}
            status="new"
            route={"/admin/employees/categories"}
        />
    );
};


export default CategoriesTable;