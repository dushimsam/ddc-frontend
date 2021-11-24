import React, {useEffect, useState} from 'react';
import styles from "../../../../styles/pages/table.module.css";
import GrowableTable from "../../growable-tables-layout"
import customerService from "../../../../services/customers/customer.service"
import ordersService from "../../../../services/orders/orders"
import OrderDetails from '../../../order/order-details-modal';
import AuthService from "../../../../services/auth/auth.service"
import jwt from 'jwt-decode';
import {processDetailedDate} from "../../../../utils/process-date";
import {
    currencyMapping,
    customCurrencyMapping,
    defaultCurrencyMapping,
    rwandanCurrency
} from "../../../../utils/currency-converter";

const Table = ({rowsData}) => {
    console.log(rowsData)
    const changeStatus = (order) => {
        ShipmentService.getOrderShipment(order._id)
            .then((res) => {
                ShipmentService.changeShipmentStatus(res.data[0]._id, "DELIVERED")
                    .then((res2) => {
                        alertSuccess(setAlert, "Action Done Successfully");
                        window.location.reload();
                    }).catch(e => {
                    alertFailer(setAlert, e.response ? e.response.data.message : e.message || "Error occurred. Try again latter.");
                })
            }).catch(e => {
            alertFailer(setAlert, e.response ? e.response.data.message : e.message || "Error occurred. Try again latter.");
        })
    }


    const [selectedOrder, setSelectedOrder] = useState(null);

    const readMore = (order) => {
        setSelectedOrder(order)
        document.getElementById("orderDetailsBtn").click()
    }


    return (
        <div className="table-responsive col-12">

            <table className={"table border rounded " + styles.table} style={{fontSize: '0.8em'}}>
                <thead>
                <tr>
                    <th scope="col" className={styles.th}>#</th>
                    <th scope="col" className={styles.th}>ORDER CODE</th>
                    <th scope="col" className={styles.th}>ORDER DATE</th>
                    <th scope="col" className={styles.th}>TOTAL AMOUNT PAID</th>
                    <th scope="col" className={styles.th}>WHERE TO SHIP</th>
                    {/* <th scope="col" className={styles.th}>ACTIONS</th> */}
                </tr>
                </thead>
                <tbody>
                {
                    rowsData.items.slice(0, rowsData.showItems).map((data, index) => {
                        return (
                            <tr key={data._id}>
                                <td className={styles.td}>{index + 1}</td>
                                <td className={styles.td}>{data.code}</td>
                                <td className={styles.td}> {processDetailedDate(data.createdAt)}</td>
                                <td className={styles.td}>{defaultCurrencyMapping(data.total_order_price)}</td>
                                <td className={styles.td}>{data.delivery_zone.zone + " - " + data.delivery_zone.region.region}</td>
                                {/* <td className={styles.td}><a href="" className="text-decoration-none text-primary">Read more</a></td> */}

                            </tr>)
                    })
                }
                </tbody>
                {
                    selectedOrder ?
                        <OrderDetails order={selectedOrder} status={null} payment={null} isCustomer={true}/> : <></>
                }
            </table>
        </div>
    )
}


const Container = () => {

    const [items, setItems] = useState([]);

    function filter_pending(item) {
        return item.status == "DELIVERED"
    }

    useEffect(() => {

        let user = jwt(AuthService.getDecToken())

        customerService.getCustomer(user.id)
            .then((res) => {
                ordersService.getOrderForACustomer(res.data._id)
                    .then((res2) => {
                        setItems(res2.data.filter(filter_pending))
                    }).catch(err => console.log(err))
            }).catch(err => console.log(err))

    }, [])

    return (
        <GrowableTable Table={Table} items={items} initialItemsLen={4}/>
    )
}

export default Container;