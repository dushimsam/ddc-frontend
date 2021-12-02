import React, {useEffect, useState} from "react";
import OrderService from "../../../services/orders/orders"
import customerService from "../../../services/customers/customer.service"
import {filterData, gotoPath, handleDoubleDecryptionPath, sortData} from "../../../utils/functions";
import ShipmentService from '../../../services/shipments/shipment.service';

import {notifyError, notifySuccess} from "../../../utils/alerts"
import ActionButtons from "../../../components/tables/ActionButtons";
import {Th} from "../../../components/reusable/TableComponents";
import svgStyles from '../../../styles/components/Breadcrumb.module.css';
import styles from "../../../styles/pages/table.module.css";
import $ from "jquery"
import SingleSubModuleLayout from "../../../layouts/customer-layouts/SingleSubModule"
import {processDetailedDate} from "../../../utils/process-date";
import ModalContainer from "../../../components/reusable/dialogs/supply-order-dialog";
import OrderPaymentModal from "../../../components/reusable/order-payments-modal";
import ConfirmationModal from "../../../components/tables/confirmation-modal";
import Router, {useRouter} from "next/router";
import {show_modal} from "../../../utils/modal-funs";
import Paginator from "../../../components/tables/paginator";
import {useSelector} from "react-redux";


const Table = ({orders, setOrders, paginator, paginatorLoading, setPaginatorLoading, setPaginator, getInitialData}) => {
    const [item, setItem] = useState(null);

    const [shipmentReadMore, setShipmentReadMore] = useState(null)
    const [paymentReadMore, setPaymentReadMore] = useState(null)

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [loading, setLoading] = useState(false);


    const handlePageChange = (page) => {
        setPaginatorLoading(true)
        setPaginator({...paginator, ['page']: page});
    };

    const [alert, setAlert] = useState({message: "", class: "", show: false})


    const sortBy = (prop, order) => {

        setOrders(sortData(orders, prop, order));
    }

    const [deliverOrder, setDeliverOrder] = useState(null);

    const showDeliverConfirm = (order) => {
        setDeliverOrder(order)
        $(function () {
            $('#confirmationModal').modal('show');
        })
    }

    const handleDeliver = (confirmation) => {
        if (confirmation) {
            OrderService.getOrderDetails(deliverOrder._id)
                .then((res) => {
                    ShipmentService.changeShipmentStatus(res.data.shipments[0]._id, "DELIVERED")
                        .then((res2) => {
                            setLoading(false)
                            notifySuccess("Successfully Recorded");
                            getInitialData();
                            Router.push("/customer/talk-to-us")
                        }).catch(e => {
                        setLoading(false);
                        notifyError(e.response ? e.response.data.message : e.message || "Error occurred. Try again latter.");
                        $(function () {
                            $('#confirmationModal').modal('hide');
                        })
                    })
                }).catch((e) => console.log(e)).finally(() => {
                $(function () {
                    $('#confirmationModal').modal('hide');
                })
                setLoading(false);
            });
        }
    }

    const handleShipmentReadMore = (order) => {
        setShipmentReadMore(order)
        document.getElementById("openShipmentPopBtn").click()
    }

    const handlePaymentReadMore = (order) => {
        Router.push(gotoPath("/order/invoice", order._id, "ORDER_FROM_PAYMENT"))
    }


    const [orderData, setOrderData] = useState(null)

    const readMore = (order) => {
        Router.push(gotoPath("/customer/my-orders/part-orders", order._id))
    }

    const handleReadMore = (order) => {
        setSelectedOrder(order)
        OrderService.orderParts(order._id).then((res) => {
            setOrderData(res.data)
        }).catch(e => console.log(e))
            .finally(() => {
                show_modal('#supplyOrderModalDialog')
            })
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
                        <th scope="col" className={styles.th}>Order Info</th>
                        <th scope="col" className={styles.th}>Invoice</th>
                        <th scope="col" className={styles.th}>Action</th>
                    </tr>
                    </thead>

                    <tbody>

                    {orders && orders?.map((order, index) => {
                        return (
                            <tr key={order._id}>
                                <th scope="row" className={styles.td}><span
                                    className="text-uppercase">{index + 1}</span></th>
                                <td className={styles.td}>{order.code || 'N/A'}</td>
                                <td className={styles.td}>{order.customer.user.firstName + ' ' + order.customer.user.lastName}
                                </td>
                                <td className={styles.td}>
                                        <span
                                            className={(order.status === 'DELIVERED') ? styles.active : (order.status === 'SHIPPING') ? styles.pending : (order.status === 'PAYING') ? styles.info : (order.status === 'INITIATED') ? styles.primary : (order.status === 'FAILED' || order.status === 'ARCHIVED' || order.status === 'EXPIRED') ? styles.inactive : (order.status === 'PAID') ? styles.purple : ''}>
                                            {order.status}
                                        </span>

                                </td>
                                <td className={styles.td}>{processDetailedDate(order.createdAt)}</td>

                                <td className={styles.td}>
                                        <span className={" ml-5"}><ActionButtons handleSetItem={readMore}
                                                                                 item={order}
                                                                                 allowed={["READ_MORE"]}
                                                                                 disabled={order.status === "INITIATED" || order.status === "EXPIRED"}/></span>

                                </td>

                                <td>
                                    {

                                        <span className={svgStyles.svgViewHover + " ml-5"}
                                              onClick={() => {
                                                  order.status !== "INITIATED" ? handlePaymentReadMore(order) : null
                                              }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18"
                                                     height="18"><path fill="none"
                                                                       d="M0 0h24v24H0z"/><path
                                                    d="M17 16h2V4H9v2h8v10zm0 2v3c0 .552-.45 1-1.007 1H4.007A1.001 1.001 0 0 1 3 21l.003-14c0-.552.45-1 1.007-1H7V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3zM5.003 8L5 20h10V8H5.003zM7 16h4.5a.5.5 0 1 0 0-1h-3a2.5 2.5 0 1 1 0-5H9V9h2v1h2v2H8.5a.5.5 0 1 0 0 1h3a2.5 2.5 0 1 1 0 5H11v1H9v-1H7v-2z"
                                                    fill="rgba(52,72,94,1)"/></svg>
                                            </span>

                                    }
                                </td>

                                <td>
                                    <button className="btn btn-danger btn-sm" onClick={() => showDeliverConfirm(order)}
                                            disabled={order.status !== "SHIPPING"}>Mark as delivered
                                    </button>
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

            <ConfirmationModal continueAction={handleDeliver} loading={loading} setLoading={setLoading}
                               message={"Are you sure , you received this Order ? "}
                               alert={"This action can't be undone"} btnColor={"btn-success"}/>

            {
                selectedOrder &&
                <ModalContainer data={orderData} itemObj={selectedOrder} status="order"
                                title={"Order Information : " + selectedOrder?.code}
                                date={processDetailedDate(selectedOrder.createdAt)}/>
            }
            {
                paymentReadMore && <OrderPaymentModal order={paymentReadMore}/>
            }

        </React.Fragment>
    );
}


const Page = () => {

    const [orders, setOrders] = useState([]);
    const [searchOrders, setSearchOrders] = useState([]);
    const [paginator, setPaginator] = useState({page: 1, perPage: 5, total: 0, range: 5});
    const [isSearch, setIsSearch] = useState(false);
    const [searchKey, setSearchKey] = useState('');
    let all = [];
    const [paginatorLoading, setPaginatorLoading] = useState(true);
    const [customer, setCustomer] = useState(null);
    const [total, setTotal] = useState(0);

    const user = useSelector(state => state.authUser);


    useEffect(() => {
        if (user.id) {
            customerService.getCustomer(user.id)
                .then((result) => {
                    console.log("Current user ", result)

                    setCustomer(result.data)
                }).catch(e => console.log(e))
        }
    }, [user])


    const getOrders = (page) => {
        OrderService.getOrderForACustomerPaginated(customer._id, page).then((res) => {
            setOrders(res.data);
            setSearchOrders(res.data.docs);
            setPaginatorLoading(false);
            setTotal(res.data.totalDocs)
            setPaginator({...paginator, total: res.data.length, page: res.data.page});
        }).catch(e => console.log(e))
    }


    useEffect(() => {
        if (customer)
            getOrders(paginator.page);
    }, [paginator.page, customer]);


    const getSearchKey = (val) => {
        setSearchKey(val);
        if (val === '' || val === ' ' || !val.replace(/\s/g, '').length) {
            setSearchOrders(orders);
            setIsSearch(false);
        } else {
            // getSearchOrders(val, paginator.page);
            setIsSearch(true);
        }
    };

    const getFilterKey = (key) => {
        setSearchOrders(filterData(orders, 'status', key));
    }


    const filters = [
        {name: 'ALL', val: 'ALL', title: ""},
        {name: 'INITIATED', val: 'INITIATED', title: "No products added"},
        {name: 'PAYING', val: 'PAYING', title: "Orders that have not been paid"},
        {name: 'PENDING', val: 'PAID', title: "Paid orders waiting to be shipped"},
        {name: 'SHIPPING', val: 'SHIPPING', title: "Orders that are being shipped"},
        {name: 'DELIVERED', val: 'DELIVERED', title: "Delivered Orders"},
        {name: 'FAILED', val: 'FAILED', title: "Failed Orders"}
    ];

    const getInitialData = () => {
        getOrders(paginator.page);
    }

    return (
        <SingleSubModuleLayout
            Content={<Table orders={searchOrders} setOrders={setSearchOrders} getInitialData={getInitialData}
                            paginatorLoading={paginatorLoading} setPaginatorLoading={setPaginatorLoading}
                            paginator={paginator} setPaginator={setPaginator}/>}
            count={total}
            route={"/customer/my-orders"}
            showFilter={true}
            isOrder={true}
            hideSearch={true}
            isArray={false}
            filters={filters}
            setSearch={getSearchKey}
            hideAction={true}
            setFilter={getFilterKey}
            name={"Part Orders"}
            status="new"
        />
    );
}


export default Page;