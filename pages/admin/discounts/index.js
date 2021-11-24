import React, {useEffect, useState} from 'react';
import styles from "../../../styles/pages/table.module.css";
import Update from "./update";
import ActionButtons from "../../../components/tables/ActionButtons"
import DeleteConfirmation from "../../../components/tables/delete-confirmation-modal"
import SingleSubModuleLayout from "../../../layouts/admin-layouts/SingleSubModule";
import {dateFormat, filterData, handleDoubleDecryptionPath, sortData} from "../../../utils/functions";
import DiscountService from "../../../services/discount/DiscountService"
import {Th} from "../../../components/reusable/TableComponents";
import Pagination from "react-js-pagination";
import {defaultCurrencyMapping} from "../../../utils/currency-converter";
import {processDetailedDate} from "../../../utils/process-date";
import {show_modal} from "../../../utils/modal-funs";
import ReadMoreLayout, {ListMapping, MapDetails} from "../../../components/layouts/read-more-dialog-layout";
import DeliveryService from "../../../services/shipments/shipment.service";
import {useRouter} from "next/router";
import {alertFailer} from "../../../utils/alerts";


const Table = ({discounts, setDiscounts, paginator, setPaginator, getInitialData}) => {
    const [item, setItem] = useState(null);

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

    const [itemFields, setItemFields] = useState(null);

    const handleSetFields = (item) => {

        let timeStampFields = [{
            name: "CREATED AT",
            value: dateFormat(item.createdAt).fromNow() + " - " + dateFormat(item.createdAt).onlyDate()
        }, {
            name: "RECENTLY UPDATED AT",
            value: dateFormat(item.updatedAt).fromNow() + " - " + dateFormat(item.updatedAt).onlyDate()
        }]

        let fields = [{
            name: "COUPON-CODE", value: item.coupon_code
        }, {
            name: "Discount",
            value: `${item.discount * 100}% OFF`
        }, {
            name: "Discount Scope", value: item.discount_scope
        },
            {
                name: "Usage Per Customer", value: item.usage_count
            },
            {
                name: "Total Usages", value: item.total_usages
            },
            {name: "Applicable To", value: item.discount_type},
            {
                name: "Duration",
                value: item.duration + " " + item.duration_type
            },
            {name: "Reason", value: item.reason},
            {name: "Message", value: item.message}
        ]

        if (item.discount_scope === "CUSTOMER_BASED") {
            fields.push({
                name: "Customer",
                value: `${item.customer.user?.firstName} ${item.customer.user?.lastName} ${item.customer._id}`,
                href: "/admin/customers",
                _id: item.customer._id
            })
        }


        setItemFields([...fields, ...timeStampFields]);
        show_modal('#itemReadMoreModalLayout');
    }

    const handlePageChange = (page) => {
        setPaginator({...paginator, ['page']: page});
    };

    const [alert, setAlert] = useState({message: "", class: "", show: false})

    const deleteItem = (item) => {
        DiscountService.delete(item._id).then((res) => {
            setAlert({show: true, class: "success", message: "Discount is successfully cancelled."});
            getInitialData()
        }).catch((e) => {
            alertFailer(setAlert, e.response ? e.response.data.message : e.message || "Error occurred. Try again latter.")
        });
    }
    const [loading, setLoading] = useState(false);

    const sortBy = (prop, order) => {
        setDiscounts(sortData(discounts, prop, order));
    }
    const router = useRouter();

    useEffect(() => {
        if (router.query.subject) {
            setLoading(true)
            DiscountService.get(handleDoubleDecryptionPath(router.query.subject))
                .then((res) => {
                    const item = res.data;
                    handleSetFields(item)
                    setLoading(false);
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
                        <th scope="col" className={styles.th}>Code</th>
                        <th scope="col" className={styles.th}>Scope</th>
                        <Th name={'Discount(%)'} prop={'discount'} sorter={sortBy}/>
                        <Th name={'Usage Count'} prop={'usage_count'} sorter={sortBy}/>
                        <th scope="col" className={styles.th}>Duration</th>
                        <th scope="col" className={styles.th}>Status</th>
                        <Th name={'Created On'} prop={'createdAt'} sorter={sortBy}/>
                        <th scope="col" className={styles.th}>Action</th>
                    </tr>
                    </thead>

                    <tbody>
                    {discounts && discounts.map((discount, index) => {
                        return (
                            <tr key={discount._id}>
                                <th scope="row" className={styles.td}><span
                                    className="text-uppercase">{index + 1}</span></th>
                                <td className={styles.td}>{discount.coupon_code}</td>
                                <td className={styles.td}>{discount.discount_scope}</td>
                                <td className={styles.td}>{`${discount.discount * 100}% OFF`}</td>
                                <td className={styles.td}>{discount.usage_count}</td>
                                <td className={styles.td}>{discount.duration} {discount.duration_type}</td>
                                <td className={styles.td}>
                                        <span
                                            className={(discount.status === 'ACTIVATED') ? styles.active : (discount.status === 'USAGE_COUNT_EXPIRED' || discount.status === 'DURATION_EXPIRED' || discount.status === "CANCELLED") ? styles.inactive : (discount.status === 'UNUSED') ? styles.pending : ''}>
                                            {discount.status}
                                        </span>
                                </td>
                                <td className={styles.td}>{dateFormat(discount.createdAt).onlyDate()}</td>
                                <td className={styles.td}><ActionButtons handleSetItem={handleSetItem}
                                                                         allowed={["READ_MORE", "DELETE"]}
                                                                         item={discount}/>
                                </td>
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

            {item && <Update item={item} getInitialData={getInitialData}/>}

            {item &&
            <DeleteConfirmation text={""} item={item} deleteItem={deleteItem} alert={alert} setAlert={setAlert}
                                loading={loading} setLoading={setLoading}/>}
            <React.Fragment>
                {itemFields && <ReadMoreLayout parentContentTitle={"DISCOUNT INFORMATION"} childContentTitle={""}
                                               ParentContent={<MapDetails fields={itemFields}/>}
                                               ChildContent={null}/>}
            </React.Fragment>

        </React.Fragment>
    );
}


const EmployeesTable = () => {

    const [discounts, setDiscounts] = useState([]);
    const [searchDiscounts, setSearchDiscounts] = useState([]);
    const [total, setTotal] = useState(0);
    const [paginator, setPaginator] = useState({page: 1, perPage: 5, total: 0, range: 5});
    const [isSearch, setIsSearch] = useState(false);
    const [searchKey, setSearchKey] = useState('');

    let all = [];

    const getDiscounts = (page) => {
        DiscountService.getPaginated(page).then((res) => {
            setDiscounts(res.data.docs);
            setSearchDiscounts(res.data.docs);
            setTotal(res.data.totalDocs);
            setPaginator({...paginator, total: res.data.totalDocs, page: res.data.page});
        })
    }
    const getSearchDiscounts = (val, page) => {
        DiscountService.searchPaginated(val, page).then((res) => {
            setSearchDiscounts(res.data.docs);
            setPaginator({...paginator, total: res.data.totalDocs, page: res.data.page});
        })
    }
    useEffect(() => {
        if (!isSearch)
            getDiscounts(paginator.page);
        else getSearchDiscounts(searchKey, paginator.page);
    }, [paginator.page]);

    const getSearchKey = (val) => {
        setSearchKey(val);
        if (val === '' || val === ' ' || !val.replace(/\s/g, '').length) {
            setSearchDiscounts(discounts);
            setIsSearch(false);
        } else {
            getSearchDiscounts(val, paginator.page);
            setIsSearch(true);
        }
    };

    const getFilterKey = (key) => {
        setSearchDiscounts(filterData(discounts, 'status', key));
    }


    const filters = [
        {name: 'ALL', val: 'ALL'},
        {name: 'ACTIVATED', val: 'ACTIVATED'},
        {name: 'UNUSED', val: 'UNUSED'},
        {name: 'EXPIRED', vals: ['USAGE_COUNT_EXPIRED', 'DURATION_COUNT_EXPIRED']},
    ];

    const getInitialData = () => {
        getDiscounts(paginator.page);
    }

    return (
        <SingleSubModuleLayout
            Content={<Table discounts={searchDiscounts} setDiscounts={setSearchDiscounts} paginator={paginator}
                            setPaginator={setPaginator} getInitialData={getInitialData}/>}
            count={total}
            route={"discounts"}
            showFilter={true}
            filters={filters}
            setSearch={getSearchKey}
            setFilter={getFilterKey}
            name={"Discounts"}
            status="new"
        />
    );
};


export default EmployeesTable;