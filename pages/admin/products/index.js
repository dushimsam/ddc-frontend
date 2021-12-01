import React, {useEffect, useLayoutEffect, useState} from 'react';
import styles from "../../../styles/pages/table.module.css";
import Update from "./update";
import ActionButtons from "../../../components/tables/ActionButtons"
import DeleteConfirmation from "../../../components/tables/delete-confirmation-modal"
import SingleSubModuleLayout from "../../../layouts/admin-layouts/SingleSubModule";
import {handleDoubleDecryptionPath, sortData} from "../../../utils/functions";
import SparePartService from "../../../services/products/ProductService";
import {alertFailer, alertSuccess} from "../../../utils/alerts"
import ImageModalView from '../../../components/reusable/image-modal-view';
import {hide_delete_modal, hide_modal_alert, show_modal} from "../../../utils/modal-funs";
import {useRouter} from "next/router";
import {processDetailedDate} from "../../../utils/process-date";
import ReadMoreLayout, {
    ImageContainer,
    ListMapping,
    MapDetails
} from "../../../components/layouts/read-more-dialog-layout";
import SingleSubModuleLayoutManager from "../../../layouts/sales-manager-layouts/SingleSubModule";
import {system_users} from '../../../utils/constants';
import {useSelector} from "react-redux";
import Paginator from "../../../components/tables/paginator";
import $ from "jquery";
import RouteProtector from "../../../middlewares/RouteProtector";
import ProductService from "../../../services/products/ProductService";


const DenseRows = ({part}) => {
    const [data, setData] = useState(null)
    const [mutableCategories, setMutableCategories] = useState([])

    function update(endIndex) {
        let newArray = [];
        for (let i = 0; i <= endIndex; i++) {
            newArray = [...newArray, part.categories[i]]
        }
        setMutableCategories(newArray);
    }

    useEffect(() => {
        update(part.categories.length <= 1 ? (part.categories.length - 1) : 0);
    }, [part])
    return (
        <React.Fragment>
            <ol>
                {
                    mutableCategories?.map(item => <React.Fragment>
                        <li key={item}>{item.model.name}
                            <ul>
                                {
                                    item.release_years.map((item2) => <li key={item2}>{item2}</li>)
                                }
                            </ul>
                        </li>
                    </React.Fragment>)
                }
            </ol>
            {(mutableCategories?.length < part.categories.length) ?
                <a className={"cursor-pointer text-decoration-none text-primary"}
                   style={{textDecoration: "underline", fontSize: "0.85em"}}
                   onClick={() => update(part.categories.length - 1)}>show
                    more</a> : (mutableCategories?.length > 1) ?
                    <a className={"cursor-pointer text-decoration-none text-info"}
                       style={{textDecoration: "underline", fontSize: "0.85em"}} onClick={() => update(0)}>show
                        less</a> : <></>
            }
        </React.Fragment>
    )
}

const Table = ({
                   spareParts, setSpareParts, paginator, paginatorLoading,
                   setPaginatorLoading, setPaginator, getInitialData, systemUser
               }) => {
    const [item, setItem] = useState(null);
    const [itemFields, setItemFields] = useState(null);
    const [childFields, setChildFields] = useState(null);

    const [isModalOpened, setIsModalOpened] = useState({status: false, modalId: ""});

    const handleSetItem = (item, status) => {
        setItem(item);

        if (status === 'update') {
            setModalStatus(true)
            show_modal('#itemUpdateModal', setIsModalOpened)
        } else if (status === 'read-more') {
            handleSetFields(item);
            setItem(item);
            handleSetChildFields(item);
        } else {
            setModalStatus(true)
            show_modal('#deleteConfirmationModal', setIsModalOpened)
        }
    }

    const handlePageChange = (page) => {
        setPaginatorLoading(true)
        setPaginator({...paginator, ['page']: page});
    };

    const [alert, setAlert] = useState({message: "", class: "", show: false})
    const [loading, setLoading] = useState(false)

    const deleteItem = (item) => {

        SparePartService.deleteProduct(item._id).then((res) => {
            alertSuccess(setAlert, "Record is Deleted")
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

    const [modalStatus, setModalStatus] = useState(false)

    const sortBy = (prop, order) => {
        setSpareParts(sortData(spareParts, prop, order));
    }

    const [selectedImageUrls, setSelectedImageUrls] = useState([]);


    const handleSetFields = (item) => {
        let modelsYears = [
            {name: "Name", value: item.name}, {name: "Product Code", value: item.product_code}, {
                name: "Weight",
                value: item?.weight
            }, {name: "Condition", value: item?.second_hand ? "USED" : "NEW"},
            {name: "CREATED AT", value: processDetailedDate(item.createdAt)}
        ];
        setItemFields(modelsYears);
        setModalStatus(true)
        show_modal('#itemReadMoreModalLayout', setIsModalOpened);
    }
    const handleSetChildFields = (item) => {
        // ProductModelsService.companyModels(item._id)
        //    .then((res)=>{
        //        setChildFields(res.data.map((resItem,index)=>{return  {name:(index+1),value:res.data[index].name,href:"/admin/products/models",_id:res.data[index]._id}}))
        //   }).catch(e=>console.log(e))
    }

    const router = useRouter();

    useEffect(() => {
        if (router.query.subject) {
            SparePartService.getSparePart(handleDoubleDecryptionPath(router.query.subject))
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
                        <th scope="col" className={styles.th}>Picture</th>
                        <th scope="col" className={styles.th}>Name</th>
                        <th scope={"col"} className={styles.th}>Status</th>
                        <th scope="col" className={styles.th}>ProductCode</th>
                        <th scope="col" className={styles.th}>Brand</th>
                        <th scope="col" className={styles.th}>Action</th>
                    </tr>
                    </thead>

                    <tbody>
                    {spareParts && spareParts.map((sparePart, index) => {
                        return (
                            <tr key={sparePart._id}>
                                <th scope="row" className={styles.td}><span
                                    className="text-uppercase">{index + 1}</span></th>
                                <td className={styles.td}>
                                    <div className="cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" data-toggle="modal"
                                             data-target="#imagePopModal"
                                             onClick={() => setSelectedImageUrls(sparePart.imageUrls)}
                                             style={{verticalAlign: 'super', fill: '#707070'}} viewBox="0 0 24 24"
                                             width="20" height="20">
                                            <path fill="none" d="M0 0h24v24H0z"/>
                                            <path
                                                d="M2 3.993A1 1 0 0 1 2.992 3h18.016c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993H2.992A.993.993 0 0 1 2 20.007V3.993zM4 5v14h16V5H4zm8 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 2a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm5-11h2v2h-2V6z"/>
                                        </svg>
                                    </div>
                                </td>
                                <td className={styles.td}>{sparePart.name}</td>
                                <td className={styles.td}>      <span
                                    className={(sparePart?.complete_info_status === "COMPLETE") ? styles.active : styles.inactive}>
                                            {sparePart?.complete_info_status}
                                        </span></td>
                                <td className={styles.td}>{sparePart.product_code}</td>
                                <td className={styles.td}>{sparePart.product_category.name}</td>
                                <td className={styles.td}><ActionButtons handleSetItem={handleSetItem} item={sparePart}
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
            {selectedImageUrls && <ImageModalView imgUrl={selectedImageUrls}/>}
            {itemFields && <ReadMoreLayout parentContentTitle={"PRODUCT INFORMATION"}
                                           ParentContent={<MapDetails fields={itemFields}/>}
                                           ChildContent={childFields ? <ListMapping fields={childFields ?? []}/> : null}
                                           hasImage={true} ImageContent={item &&
            <ImageContainer imgs={item.imageUrls} mainTitle={item.name}
                            moreDetail={processDetailedDate(item.createdAt)}/>}/>}
        </React.Fragment>
    );
}


const SparePartsTable = () => {

    const [products, setProducts] = useState([]);
    const [searchProducts, setSearchProducts] = useState([]);
    const [paginator, setPaginator] = useState({page: 1, perPage: 5, total: 0, range: 5});
    const [isSearch, setIsSearch] = useState(false);
    const [searchKey, setSearchKey] = useState('');

    const [totals, setTotals] = useState({products: 0, productsOnMarket: 0});
    const [paginatorLoading, setPaginatorLoading] = useState(true);

    const getProducts = (page) => {
        ProductService.getPaginatedProducts(page).then((res) => {
            setProducts(res.data.docs);
            setSearchProducts(res.data.docs);
            setPaginatorLoading(false);

            setPaginator({...paginator, total: res.data.totalDocs, page: res.data.page});
        }).catch(e => console.log(e))
    }
    const getSearchProducts = (val, page) => {
        ProductService.searchPaginatedProducts(val, page).then((res) => {
            setSearchProducts(res.data.docs);
            setPaginator({...paginator, total: res.data.totalDocs, page: res.data.page});
            setPaginatorLoading(false);

        }).catch(e => console.log(e))
    }

    const getTotals = async () => {
        const total = {products: 0, productsOnMarket: 0};
        try {
            const products = await ProductService.getPaginatedProducts();
            const productsOnMarket = await ProductService.getPaginatedProductsOnMarket();
            total.products = products.data.totalDocs;
            total.productsOnMarket = productsOnMarket.data.totalDocs;
            setTotals(total);
        } catch {
            (e) => console.log("SORRY ERROR occcured", e)
        }
    }

    useEffect(() => {
        getTotals();
    }, [])

    useEffect(() => {
        if (!isSearch)
            getProducts(paginator.page);
        else getSearchProducts(searchKey, paginator.page);
    }, [paginator.page]);

    const getSearchKey = (val) => {
        setSearchKey(val);
        if (val === '' || val === ' ' || !val.replace(/\s/g, '').length) {
            setIsSearch(false);
            getInitialData();
        } else {
            getSearchProducts(val, paginator.page);
            setIsSearch(true);
        }
    };


    const panes = [
        {name: 'Products', count: totals.products, route: '/admin/products'},
        {name: 'ProductsOnMarket', count: totals.productsOnMarket, route: '/admin/products/on-market'}
    ];

    const getInitialData = () => {
        getProducts(paginator.page);
    }

    return (
        <RouteProtector only={[system_users.ADMIN]}>
            <SingleSubModuleLayout
                Content={<Table spareParts={searchProducts} systemUser={system_users.ADMIN}
                                getInitialData={getInitialData}
                                paginatorLoading={paginatorLoading} setPaginatorLoading={setPaginatorLoading}
                                setSpareParts={setSearchProducts} paginator={paginator}
                                setPaginator={setPaginator}/>}
                isArray={true}
                panes={panes}
                showFilter={false}
                name={'Products'}
                setSearch={getSearchKey}
                status="new"
                route={"/admin/products"}
                isVerified={true}
            />
        </RouteProtector>
    );
};


const otherStyles = {
    img: {
        width: "4em",
        height: "4em",
        cursor: "pointer"
    }
}
export default SparePartsTable;