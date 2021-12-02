import React, {useEffect, useState} from 'react';
import styles from "../../../styles/pages/table.module.css";
import ActionButtons from "../../../components/tables/ActionButtons"
import SingleSubModuleLayoutAdmin from "../../../layouts/admin-layouts/SingleSubModule";
import {dateFormat, filterData, gotoPath, handleDoubleDecryptionPath, sortData} from "../../../utils/functions";
import OrderService from "../../../services/orders/orders";
import {Th} from "../../../components/reusable/TableComponents";
import svgStyles from '../../../styles/components/Breadcrumb.module.css';
import OrderShipmentModal from "../../../components/reusable/order-shipments-modal"
import ModalContainer from '../../../components/reusable/dialogs/supply-order-dialog';
import {processDetailedDate} from "../../../utils/process-date";
import Router, {useRouter} from "next/router";
import {show_modal} from "../../../utils/modal-funs";
import {encryptText} from "../../../utils/encryption-decryption";
import {system_users} from "../../../utils/constants";
import Paginator from "../../../components/tables/paginator";
import {notifyError, notifySuccess} from "../../../utils/alerts";
import DeleteConfirmation from "../../../components/tables/delete-confirmation-modal";
import ConfirmModal from "../../../components/modals/reusable-confirmation-modal";

const Table = ({
                   orders, setOrders, paginator, setPaginator, paginatorLoading,
                   setPaginatorLoading, getInitialData, systemUser
               }) => {
    const [item, setItem] = useState(null);

    const [shipmentReadMore, setShipmentReadMore] = useState(null)
    const [paymentReadMore, setPaymentReadMore] = useState(null)

    const [selectedOrder, setSelectedOrder] = useState(null);


    const handlePageChange = (page) => {
        setPaginatorLoading(true)
        setPaginator({...paginator, ['page']: page});
    };

    const [alert, setAlert] = useState({message: "", class: "", show: false})

    const [loading, setLoading] = useState(false)

    const deleteItem = (item) => {
        OrderService.changeStatus(item._id, "ARCHIVED").then((res) => {
            notifySuccess("Order is cancelled Successfully");
            getInitialData();
        }).catch((e) => {
            notifyError(e.response ? e.response.data.message : e.message || "Error occurred. Try again latter.")
        }).finally(() => {
            setLoading(false);
        })
    }

    const sortBy = (prop, order) => {
        setOrders(sortData(orders, prop, order));
    }


    const handleShipmentReadMore = (order) => {
        setShipmentReadMore(order)
        show_modal('#orderShipmentReadMore')
    }

    const handlePaymentReadMore = (order) => {
        Router.push({pathname: "/order/invoice", query: {payment: encryptText(order._id), status: "ORDER"}})
    }

    const [orderData, setOrderData] = useState(null)


    const handleReadMore = (order) => {
        setSelectedOrder(order)
        OrderService.orderProducts(order._id).then((res) => {
            setOrderData(res.data)
        }).catch(e => console.log(e))
            .finally(() => {
                show_modal('#supplyOrderModalDialog')
            })
    }
    const readMore = (order, status) => {
        setItem(order);
        if (status === "delete") {
            show_modal("#updateConfirmationModal");
        } else {
            Router.push(gotoPath("/shared/orders", order._id))
        }
    }

    const ShowDelete = () => {
        show_modal('#deleteConfirmationModal')
    }

    const router = useRouter();
    useEffect(() => {
        if (router.query.subject) {
            OrderService.get(handleDoubleDecryptionPath(router.query.subject))
                .then((res) => {
                    handleReadMore(res.data)
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
                        <th scope="col" className={styles.th}>Code</th>
                        <th scope="col" className={styles.th}>Customer</th>
                        <th scope="col" className={styles.th}>Status</th>
                        <Th name={'Created On'} prop={'createdAt'} sorter={sortBy}/>
                        <th scope="col" className={styles.th}>Action</th>
                        <th scope="col" className={styles.th}>Shipment</th>
                        <th scope="col" className={styles.th}>Payment</th>
                    </tr>
                    </thead>

                    <tbody>
                    {orders && orders.map((order, index) => {
                        return (
                            <tr key={order._id}>
                                <th scope="row" className={styles.td}><span
                                    className="text-uppercase">{index + 1}</span></th>
                                <td className={styles.td}>{order.code || 'N/A'}</td>
                                <td className={styles.td}>
                                    {order.customer.user.firstName + ' ' + order.customer.user.lastName}
                                </td>
                                <td className={styles.td}>
                                        <span
                                            className={(order.status === 'DELIVERED') ? styles.active : (order.status === 'SHIPPING') ? styles.pending : (order.status === 'PAYING') ? styles.info : (order.status === 'INITIATED') ? styles.primary : (order.status === 'FAILED' || order.status === 'ARCHIVED' || order.status === 'EXPIRED') ? styles.inactive : (order.status === 'PAID') ? styles.purple : ''}>
                                            {order.status}
                                        </span>
                                </td>
                                <td className={styles.td}>{dateFormat(order.createdAt).fromNow() + " - " + dateFormat(order.createdAt).onlyDate()}</td>
                                <td className={styles.td}>
                                    {
                                        <ActionButtons handleSetItem={readMore} item={order}
                                                       allowed={systemUser === system_users.ADMIN ? ["READ_MORE", "DELETE"] : ["READ_MORE"]}
                                                       disabled={!(order.status !== "INITIATED" && order.status !== "EXPIRED")}/>
                                    }
                                </td>
                                <td className={styles.td}>
                                        <span className={svgStyles.svgViewHover + " ml-5"} onClick={() => {
                                            order.status != "PAYING" && order.status != "INITIATED" && order.status != "EXPIRED" ? handleShipmentReadMore(order) : null
                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18"
                                                 height="18"><path fill="none" d="M0 0h24v24H0z"/><path
                                                d="M4 10.4V4a1 1 0 0 1 1-1h5V1h4v2h5a1 1 0 0 1 1 1v6.4l1.086.326a1 1 0 0 1 .682 1.2l-1.516 6.068A4.992 4.992 0 0 1 16 16 4.992 4.992 0 0 1 12 18a4.992 4.992 0 0 1-4-2 4.992 4.992 0 0 1-4.252 1.994l-1.516-6.068a1 1 0 0 1 .682-1.2L4 10.4zm2-.6L12 8l2.754.826 1.809.543L18 9.8V5H6v4.8zM4 20a5.978 5.978 0 0 0 4-1.528A5.978 5.978 0 0 0 12 20a5.978 5.978 0 0 0 4-1.528A5.978 5.978 0 0 0 20 20h2v2h-2a7.963 7.963 0 0 1-4-1.07A7.963 7.963 0 0 1 12 22a7.963 7.963 0 0 1-4-1.07A7.963 7.963 0 0 1 4 22H2v-2h2z"
                                                fill="rgba(52,72,94,1)"/></svg>
                                        </span>

                                </td>
                                <td>
                                        <span className={svgStyles.svgViewHover + " ml-5"} onClick={() => {
                                            order.status != "PAYING" && order.status != "INITIATED" && order.status != "EXPIRED" ? handlePaymentReadMore(order) : null
                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18"
                                                 height="18"><path fill="none" d="M0 0h24v24H0z"/><path
                                                d="M17 16h2V4H9v2h8v10zm0 2v3c0 .552-.45 1-1.007 1H4.007A1.001 1.001 0 0 1 3 21l.003-14c0-.552.45-1 1.007-1H7V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3zM5.003 8L5 20h10V8H5.003zM7 16h4.5a.5.5 0 1 0 0-1h-3a2.5 2.5 0 1 1 0-5H9V9h2v1h2v2H8.5a.5.5 0 1 0 0 1h3a2.5 2.5 0 1 1 0 5H11v1H9v-1H7v-2z"
                                                fill="rgba(52,72,94,1)"/></svg>
                                        </span>

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
            {
                selectedOrder &&
                <ModalContainer data={orderData} itemObj={selectedOrder} status="order" title={"Order Information"}
                                date={processDetailedDate(selectedOrder.createdAt)}/>
            }
            {
                shipmentReadMore && <OrderShipmentModal order={shipmentReadMore} getInitialData={getInitialData}/>
            }
            <DeleteConfirmation text={item?.createdAt} item={item} deleteItem={deleteItem} setAlert={setAlert}
                                alert={alert} loading={loading} setLoading={setLoading}/>

            {<ConfirmModal callBack={ShowDelete} system_user={systemUser}/>}


        </React.Fragment>
    );
}


const OrdersTable = () => {

    const [orders, setOrders] = useState([]);
    const [searchOrders, setSearchOrders] = useState([]);
    const [total, setTotal] = useState(0);
    const [paginator, setPaginator] = useState({page: 1, perPage: 5, total: 0, range: 5});
    const [isSearch, setIsSearch] = useState(false);
    const [searchKey, setSearchKey] = useState('');

    let all = [];
    const [paginatorLoading, setPaginatorLoading] = useState(true);

    const [totals, setTotals] = useState({part_orders: 0});



    const getOrders = (page) => {
        OrderService.getPaginated(page).then((res) => {
            setOrders(res.data.docs);
            setSearchOrders(res.data.docs);
            setTotal(res.data.totalDocs);
            setPaginatorLoading(false);
            setPaginator({...paginator, total: res.data.totalDocs, page: res.data.page});
        }).catch(e => console.log(e))
    }

    const getSearchOrders = (val, page) => {
        OrderService.searchPaginated(val, page).then((res) => {
            setSearchOrders(res.data.docs);
            setPaginator({...paginator, total: res.data.totalDocs, page: res.data.page});
            setPaginatorLoading(false);
        }).catch(e => console.log(e))
    }
    useEffect(() => {
        if (!isSearch)
            getOrders(paginator.page);
        else getSearchOrders(searchKey, paginator.page);
    }, [paginator.page]);

    const getSearchKey = (val) => {
        setSearchKey(val);
        if (val === '' || val === ' ' || !val.replace(/\s/g, '').length) {
            setSearchOrders(orders);
            setIsSearch(false);
        } else {
            getSearchOrders(val, paginator.page);
            setIsSearch(true);
        }
    };

    const getFilterKey = (key) => {
        setSearchOrders(filterData(orders, 'status', key));
    }



    const getInitialData = () => {
        getOrders(paginator.page);
    }

    const filters = [
        {name: 'ALL', val: 'ALL'},
        {name: 'INITIATED', val: 'INITIATED'},
        {name: 'PAYING', val: 'PAYING'},
        {name: 'PAID', val: 'PAID'},
        {name: 'SHIPPING', val: 'SHIPPING'},
        {name: 'DELIVERED', val: 'DELIVERED'},
        {name: 'FAILED', val: 'FAILED'},
        {name: 'EXPIRED', val: 'EXPIRED'}

    ];


    return (
        <SingleSubModuleLayoutAdmin
            Content={<Table orders={searchOrders} setOrders={setSearchOrders} paginator={paginator}
                            paginatorLoading={paginatorLoading} setPaginatorLoading={setPaginatorLoading}
                            systemUser={system_users.ADMIN}
                            setPaginator={setPaginator} getInitialData={getInitialData}/>}
            route={"orders"}
            showFilter={true}
            isArray={false}
            isOrder={true}
            filters={filters}
            count={total}
            setSearch={getSearchKey}
            hideAction={true}
            setFilter={getFilterKey}
            name={"Orders"}
            status="new"
        />
    );
};


export default OrdersTable;