import ToggleButton from "../../../../components/tables/toggle-button"
import Alert from "../../../../components/alert";
import React, {useEffect, useState} from 'react';
import styles from "../../../../styles/pages/table.module.css";
import Update from "./update";
import ActionButtons from "../../../../components/tables/ActionButtons"
import SingleSubModuleLayout from "../../../../layouts/admin-layouts/SingleSubModule";
import {handleDoubleDecryptionPath} from "../../../../utils/functions";
import ProductService from "../../../../services/products/ProductService";

// import ToggleButton from "../../../../components/reusable/toggleButton";
import {alertFailer, alertSuccess} from "../../../../utils/alerts";
import $ from "jquery";
import ImageModalView from "../../../../components/reusable/image-modal-view";
import {ALERT_EXPIRATION_PERIOD, system_users} from "../../../../utils/constants";
import ReadMoreLayout, {
    ImageContainer,
    ListMapping,
    MapDetails
} from "../../../../components/layouts/read-more-dialog-layout";
import {processDetailedDate} from "../../../../utils/process-date";
import {show_modal} from "../../../../utils/modal-funs";
import {useRouter} from "next/router";
import Paginator from "../../../../components/tables/paginator";
import {defaultCurrencyMapping} from "../../../../utils/currency-converter";


const Table = ({
                   partsOnMarket, setSpareParts, paginator, paginatorLoading,
                   setPaginatorLoading, setPaginator, getInitialData, systemUser
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
            // Router.push({pathname: "/admin/products/on-market", query: {id: item._id}})
        } else {
            show_modal('#deleteConfirmationModal')
        }
    }

    const handleSetFields = (item) => {
        setItemFields([{
            name: "Product",
            value: "Name: " + item.product.name + " , Code: " + item.product.product_code,
            href: "/admin/products",
            _id: item.part_in_stock.spare_part?._id
        }, {name: "Unit Price", value: defaultCurrencyMapping(item.unit_price)}, {
            name: "Tax",
            value: defaultCurrencyMapping(item?.tax)
        }, {
            name: "Available Quantity",
            value: item.quantity
        }, {name: "Recently updated On ", value: processDetailedDate(item.updatedAt)}]);
        show_modal('#itemReadMoreModalLayout');
    }

    const handlePageChange = (page) => {
        setPaginatorLoading(true)
        setPaginator({...paginator, ['page']: page});
    };

    const handleAlertShow = () => {
        window.setTimeout(() => {
            $(function () {
                getInitialData();
                setAlert({show: false, class: "", message: ""})
            });
        }, ALERT_EXPIRATION_PERIOD);

    }
    const setShowCase = (item) => {

        ProductService.toggleShowCaseOnMarket(item._id).then((res) => {
            if (res.data.showcase) {
                alertSuccess(setAlert, "Added on the top products list ");
            } else {
                alertFailer(setAlert, "Removed from the top products")
            }
        }).catch((e) => {
            alertFailer(setAlert, e.response ? e.response.data.message : e.message || "Error occurred. Try again latter.");
        }).finally(() => {
            handleAlertShow();
        });
    }

    const [alert, setAlert] = useState({message: "", class: "", show: false})

    const [imageUrl, setImageUrl] = useState(null);


    const router = useRouter();

    useEffect(() => {
        if (router.query.subject) {
            ProductService.getPartOnMarketById(handleDoubleDecryptionPath(router.query.subject))
                .then((res) => {
                    const item = res.data;
                    handleSetFields(item);
                    setItem(item);
                }).catch((e) => {
                console.log(e)
            })
        }
    }, [router.query.subject])


    return (
        <React.Fragment>
            {alert.show ?
                <Alert className={"my-3 alert-" + alert.class} message={alert.message} setAlert={setAlert}/> : null
            }
            <div className="table-responsive col-12">

                <table className={'table border rounded ' + styles.table} style={{fontSize: '0.8em'}}>
                    <thead>
                    <tr>
                        <th scope="col" className={styles.th}>#</th>
                        <th scope="col" className={styles.th}>Picture</th>
                        <th scope="col" className={styles.th}>Name</th>
                        <th scope={"col"} className={styles.th}>Status</th>
                        <th scope="col" className={styles.th}>Code</th>
                        <th scope="col" className={styles.th}>Quantity</th>
                        <th scope="col" className={styles.th}>Unit Price</th>
                        <th scope="col" className={styles.th}>Tax</th>
                        {systemUser === "SYSTEM_ADMIN" ? <th scope="col" className={styles.th}>Showcase</th> : <></>}
                        <th scope="col" className={styles.th}>Action</th>
                    </tr>
                    </thead>

                    <tbody>
                    {partsOnMarket.length > 0 ? partsOnMarket.map((partOnMarket, index) => {
                        return (
                            <tr key={partOnMarket._id}>
                                <th scope="row" className={styles.td}><span
                                    className="text-uppercase">{index + 1}</span></th>
                                <td className={styles.td}>
                                    <svg xmlns="http://www.w3.org/2000/svg" data-toggle="modal"
                                         data-target="#imagePopModal"
                                         onClick={() => setImageUrl(partOnMarket?.part_in_stock.spare_part.imageUrls)}
                                         style={{verticalAlign: 'super', fill: '#707070'}} viewBox="0 0 24 24"
                                         width="20" height="20">
                                        <path fill="none" d="M0 0h24v24H0z"/>
                                        <path
                                            d="M2 3.993A1 1 0 0 1 2.992 3h18.016c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993H2.992A.993.993 0 0 1 2 20.007V3.993zM4 5v14h16V5H4zm8 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 2a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm5-11h2v2h-2V6z"/>
                                    </svg>
                                </td>
                                <td className={styles.td}>{partOnMarket.part_in_stock.spare_part?.name}</td>

                                <td className={styles.td}>      <span
                                    className={(partOnMarket?.complete_info_status === "COMPLETE") ? styles.active : styles.inactive}>
                                            {partOnMarket?.complete_info_status}
                                        </span></td>
                                <td className={styles.td}>{partOnMarket.part_in_stock.spare_part?.product_code}</td>
                                <td className={styles.td}>{partOnMarket.quantity}</td>
                                <td className={styles.td}>{defaultCurrencyMapping(partOnMarket.unit_price)}</td>
                                <td className={styles.td}>{defaultCurrencyMapping(partOnMarket?.tax)}</td>

                                {systemUser === "SYSTEM_ADMIN" ?
                                    <td className={styles.td}><ToggleButton setItem={setShowCase} item={partOnMarket}
                                                                            defaultCheck={partOnMarket?.showcase}/>
                                    </td> : <></>}
                                <td className={styles.td}><ActionButtons handleSetItem={handleSetItem}
                                                                         item={partOnMarket}
                                                                         allowed={systemUser === "EMPLOYEE" ? ["READ_MORE"] : ["READ_MORE", "UPDATE"]}/>
                                </td>
                            </tr>
                        )
                    }) : null
                    }
                    </tbody>
                </table>
            </div>
            <Paginator paginator={paginator} handlePageChange={handlePageChange}
                       paginatorLoading={paginatorLoading}/>

            {imageUrl && <ImageModalView imgUrl={imageUrl}/>}
            {item && <Update item={item} getInitialData={getInitialData}/>}
            {itemFields && <ReadMoreLayout parentContentTitle={"SPARE PART ON MARKET INFORMATION"}
                                           ParentContent={<MapDetails fields={itemFields}/>}
                                           ChildContent={childFields ? <ListMapping fields={childFields ?? []}/> : null}
                                           hasImage={true} ImageContent={item &&
            <ImageContainer imgs={item.part_in_stock.spare_part?.imageUrls}
                            mainTitle={item.part_in_stock.spare_part?.name}
                            moreDetail={processDetailedDate(item.createdAt)}/>}/>}
        </React.Fragment>
    );
}

const PartsOnMarketTable = () => {

    const [partsOnMarket, setSpareParts] = useState([]);
    const [searchPartsOnMarket, setSearchPartsOnMarket] = useState([]);
    const [paginator, setPaginator] = useState({page: 1, perPage: 5, total: 0, range: 5});
    const [isSearch, setIsSearch] = useState(false);
    const [searchKey, setSearchKey] = useState('');

    const [totals, setTotals] = useState({products: 0, productsOnMarket: 0});
    const [paginatorLoading, setPaginatorLoading] = useState(true);

    const getPartsOnMarket = (page) => {
        ProductService.getPaginatedProductsOnMarket(page).then((res) => {
            setSpareParts(res.data.docs);
            setSearchPartsOnMarket(res.data.docs);
            setPaginator({...paginator, total: res.data.totalDocs, page: res.data.page});
            setPaginatorLoading(false);

        }).catch(e => console.log("sorry error captured", e))
    }


    const getSearchPartsOnMarket = (val, page) => {
        ProductService.searchPaginatedPartsOnMarket(val, page).then((res) => {
            setSearchPartsOnMarket(res.data.docs);
            setPaginator({...paginator, total: res.data.totalDocs, page: res.data.page});
            setPaginatorLoading(false);

        }).catch(e => console.log(e))
    }
    const getTotals = async () => {
        const totals = {products: 0, productsOnMarket: 0};

        try {
            const products = await ProductService.getPaginatedProducts();
            const productsOnMarket = await ProductService.getPaginatedProductsOnMarket();
            totals.products = products.data.totalDocs;
            totals.productsOnMarket = productsOnMarket.data.totalDocs;
        } catch {
            (e) => console.log(e)
        }

        setTotals(totals);
    }
    useEffect(() => {
        getTotals();
        if (!isSearch)
            getPartsOnMarket(paginator.page);
        else getSearchPartsOnMarket(searchKey, paginator.page);
    }, [paginator.page]);

    const getSearchKey = (val) => {
        setSearchKey(val);
        if (val === '' || val === ' ' || !val.replace(/\s/g, '').length) {
            getInitialData();
            setIsSearch(false);
        } else {
            getSearchPartsOnMarket(val, paginator.page);
            setIsSearch(true);
        }
    };

    const getInitialData = () => {
        getPartsOnMarket(paginator.page);
    }


    const panes = [
        {name: 'Products', count: totals.products, route: '/admin/products'},
        {name: 'ProductsOnMarket', count: totals.productsOnMarket, route: '/admin/products/on-market'}
    ];


    return (
        <SingleSubModuleLayout
            Content={<Table partsOnMarket={searchPartsOnMarket} systemUser={system_users.ADMIN}
                            paginatorLoading={paginatorLoading} setPaginatorLoading={setPaginatorLoading}
                            setSpareParts={setSearchPartsOnMarket} getInitialData={getInitialData}
                            paginator={paginator} setPaginator={setPaginator}/>}
            isArray={true}
            panes={panes}
            showFilter={false}
            hideAction={true}
            name={'ProductsOnMarket'}
            setSearch={getSearchKey}
            status="new"
            route={"/admin/products/on-market"}
        />
    );
};


export default PartsOnMarketTable;