import React, {useEffect, useState} from 'react';
import styles from "../../../styles/pages/table.module.css";
import Update from "./update";
import ActionButtons from "../../../components/tables/ActionButtons"
import DeleteConfirmation from "../../../components/tables/delete-confirmation-modal"
import SingleSubModuleLayout from "../../../layouts/admin-layouts/SingleSubModule";
import {getFormattedDate, handleDoubleDecryptionPath, sortData} from "../../../utils/functions";
import ProductCategoriesService from "../../../services/product-categories/product-categories.service";
import {Th} from "../../../components/reusable/TableComponents";
import Pagination from "react-js-pagination";
import {alertFailer} from '../../../utils/alerts';
import {hide_delete_modal, hide_modal, hide_modal_alert, show_modal} from "../../../utils/modal-funs";
import ReadMoreLayout, {ListMapping, MapDetails} from "../../../components/layouts/read-more-dialog-layout";
import {processDetailedDate} from "../../../utils/process-date";
import Router, {useRouter} from "next/router";
import SingleSubModuleLayoutManager from "../../../layouts/sales-manager-layouts/SingleSubModule";
import {system_users} from '../../../utils/constants';
import {useSelector} from "react-redux";
import Paginator from "../../../components/tables/paginator";
import RouteProtector from "../../../middlewares/RouteProtector";


const Table = ({
                   categories, setCategories, paginator, setPaginator,
                   paginatorLoading, setPaginatorLoading, getInitialData, systemUser
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
            handleSetChildFields(item);
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
        ProductCategoriesService.deleteProductCategory(item._id).then((res) => {
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
        setCategories(sortData(categories, prop, order));
    }
    const router = useRouter();


    const handleSetFields = (item) => {
        setItemFields([{name: "Name", value: item.name}, {
            name: "Description",
            value: item.description
        }, {name: "Created-AT", value: processDetailedDate(item.createdAt)}]);
        show_modal('#itemReadMoreModalLayout');
    }
    const handleSetChildFields = (item) => {
        ProductCategoriesService.getProductSubCategoriesByCategory(item._id)
            .then((res) => {
                setChildFields(res.data.map((resItem, index) => {
                    return {
                        name: (index + 1),
                        value: res.data[index].name,
                        href: "/admin/categories/sub-categories",
                        _id: res.data[index]._id
                    }
                }))
            }).catch(e => console.log(e))
    }

    window.onbeforeunload = function () {
        hide_modal('#itemReadMoreModalLayout');
    }


    useEffect(() => {
        if (router.query.subject) {
            ProductCategoriesService.getProductCategory(handleDoubleDecryptionPath(router.query.subject))
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
                        <th scope="col" className={styles.th}>Name</th>
                        <th scope="col" className={styles.th}>Description</th>
                        <Th name={'Created On'} prop={'createdAt'} sorter={sortBy}/>
                        <th scope="col" className={styles.th}>Action</th>
                    </tr>
                    </thead>

                    <tbody>
                    {categories && categories.map((category, index) => {
                        return (
                            <tr key={category._id}>
                                <th scope="row" className={styles.td}><span
                                    className="text-uppercase">{index + 1}</span></th>
                                <td className={styles.td}>{category.name}</td>
                                <td className={styles.td}>{category.description || 'N/A'}</td>
                                <td className={styles.td}>{getFormattedDate(category.createdAt)}</td>
                                <td className={styles.td}><ActionButtons handleSetItem={handleSetItem} item={category}
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
            <DeleteConfirmation text={item.name} item={item} setAlert={setAlert} deleteItem={deleteItem} alert={alert}
                                loading={loading} setLoading={setLoading}/>}
            {itemFields && <ReadMoreLayout parentContentTitle={"CATEGORY INFORMATION"}
                                           childContentTitle={"All Products Under This Brand"}
                                           ParentContent={<MapDetails fields={itemFields}/>} ChildContent={childFields ?
                <ListMapping fields={childFields ?? []}/> : null}/>}
        </React.Fragment>
    );
}


const CategoriesTable = () => {

    const [categories, setCategories] = useState([]);
    const [searchCategories, setSearchCategories] = useState([]);
    const [paginator, setPaginator] = useState({page: 1, perPage: 5, total: 0, range: 5});
    const [isSearch, setIsSearch] = useState(false);
    const [searchKey, setSearchKey] = useState('');

    const [totals, setTotals] = useState({categories: 0, subCategories: 0, subCategoryModelYears: 0});

    let all = [];
    const [paginatorLoading, setPaginatorLoading] = useState(true);

    const getCategories = (page) => {
        ProductCategoriesService.getPaginatedProductCategories(page).then((res) => {
            setCategories(res.data.docs);
            setSearchCategories(res.data.docs);
            setPaginatorLoading(false);
            setTotals({...totals, categories: res.data.totalDocs});
            setPaginator({...paginator, total: res.data.totalDocs, page: res.data.page});
        }).catch(e => console.log(e))
    }
    const getSearchCategories = (val, page) => {
        ProductCategoriesService.searchPaginatedProductCategories(val, page).then((res) => {
            setSearchCategories(res.data.docs);
            setPaginator({...paginator, total: res.data.totalDocs, page: res.data.page});
            setPaginatorLoading(false);
        }).catch(e => console.log(e))
    }


    const getTotals = async () => {
        const totals = {categories: 0, subCategories: 0, subCategoryModelYears: 0};

        try {
            const categories = await ProductCategoriesService.getPaginatedProductCategories();
            const subCategories = await ProductCategoriesService.getPaginatedProductSubCategories();
            const subCategoryModelYears = await ProductCategoriesService.getPaginatedProductSubCategoryModelYears();

            totals.categories = categories.data.totalDocs;
            totals.subCategories = subCategories.data.totalDocs;
            totals.subCategoryModelYears = subCategoryModelYears.data.totalDocs;

            setTotals(totals);

        } catch {
            (e) => console.log(e)
        }

    }
    useEffect(() => {
        getTotals();
        if (!isSearch)
            getCategories(paginator.page);
        else getSearchCategories(searchKey, paginator.page);
    }, [paginator.page]);

    const getSearchKey = (val) => {
        setSearchKey(val);
        if (val === '' || val === ' ' || !val.replace(/\s/g, '').length) {
            setIsSearch(false);
            getInitialData();

        } else {
            getSearchCategories(val, paginator.page);
            setIsSearch(true);
        }
    };

    const getInitialData = () => {
        getCategories(paginator.page);
    }

    const panes = [
        {name: 'Brands', count: totals.categories, route: '/admin/categories'}
    ];

    const user = useSelector(state => state.authUser);

    return (
        <RouteProtector only={[system_users.ADMIN, system_users.EMPLOYEE]}>
            <SingleSubModuleLayout
                Content={<Table categories={searchCategories} systemUser={system_users.ADMIN}
                                paginatorLoading={paginatorLoading} setPaginatorLoading={setPaginatorLoading}
                                setCategories={setSearchCategories} getInitialData={getInitialData}
                                paginator={paginator} setPaginator={setPaginator}/>}
                isArray={true}
                panes={panes}
                showFilter={false}
                name={'Brands'}
                setSearch={getSearchKey}
                status="new"
                route={"/admin/categories"}
                isVerified={true}
            />
        </RouteProtector>
    );
};


export default CategoriesTable;