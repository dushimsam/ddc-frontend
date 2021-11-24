import React, { useEffect, useState } from 'react';
import styles from "../../../../styles/pages/table.module.css";
import GrowableTable from "../../growable-tables-layout"
import ShipmentService from '../../../../services/shipments/shipment.service';
import AuthService from "../../../../services/auth/auth.service"
import jwt from 'jwt-decode';
import OrderDetails from '../../../order/order-details-modal';
import { dateFormat } from "../../../../utils/functions";
import { show_modal } from "../../../../utils/modal-funs";


const Table = ({ rowsData }) => {
    const [selectedOrder, setSelectedOrder] = useState(null)
    console.log(rowsData)
    const readMore = (order) => {
        setSelectedOrder(order)
        show_modal('#orderDetailsModal')
    }

    return (
        <div className="table-responsive col-12">

            <table className={'table border  rounded ' + styles.table} style={{ fontSize: '0.8em' }}>
                <thead>
                    <tr>
                        <th scope="col" className={styles.th}>#</th>
                        <th scope="col" className={styles.th}>ORDER ID</th>
                        <th scope="col" className={styles.th}>ASSIGNED AT</th>
                        <th scope="col" className={styles.th}>Contacts Phone</th>
                        <th scope="col" className={styles.th}>Where to Deliver</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        rowsData.items.slice(0, rowsData.showItems).map((data, index) => {
                            return (
                                <tr>
                                    <td className={styles.td}>{index + 1}</td>
                                    <td className={styles.td}>{data.order?.code}</td>
                                    <td className={styles.td}> {dateFormat(data.createdAt).onlyDate() + " - " + dateFormat(data.createdAt).fromNow()}</td>
                                    <td className={styles.td}>{data.order?.customer.user.phone}</td>
                                    <td className={styles.td}>{data.order?.delivery_zone.zone + " - " + data.order?.delivery_zone.region.region}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>

            </table>
        </div>
    )
}


const items = [
    { "ORDER_ID": "DSDSjkldjskljd", "ORDER_DATE": "Thur 19, April 2020", "phone": "+025 789434343", "DELIVER": "Kirehe" },
    { "ORDER_ID": "Dkdjklsjdsds", "ORDER_DATE": "Thur 19, April 2020", "phone": "+025 789434343", "DELIVER": "Kirehe" },
    {
        "ORDER_ID": "jkljfLDJIfjulkj",
        "ORDER_DATE": "Thur 19, April 2020",
        "phone": "+025 789434343",
        "DELIVER": "Kirehe"
    },
    { "ORDER_ID": "jlkjdKLJFD", "ORDER_DATE": "Thur 19, April 2020", "phone": "+025 789434343", "DELIVER": "Kirehe" },
    { "ORDER_ID": "jkljKLDJdd", "ORDER_DATE": "Thur 19, April 2020", "phone": "+025 789434343", "DELIVER": "Kirehe" },
    { "ORDER_ID": "fDKJKLJDS", "ORDER_DATE": "Thur 19, April 2020", "phone": "+025 789434343", "DELIVER": "Kirehe" },
    { "ORDER_ID": "kdjLJDLKJSP", "ORDER_DATE": "Thur 19, April 2020", "phone": "+025 789434343", "DELIVER": "Kirehe" },
    { "ORDER_ID": "ppDJKLSJKLD", "ORDER_DATE": "Thur 19, April 2020", "phone": "+025 789434343", "DELIVER": "Kirehe" },
    { "ORDER_ID": "uuujdlkJKLDJ", "ORDER_DATE": "Thur 19, April 2020", "phone": "+025 789434343", "DELIVER": "Kirehe" },
    { "ORDER_ID": "kjdlkJUDLS", "ORDER_DATE": "Thur 19, April 2020", "phone": "+025 789434343", "DELIVER": "Kirehe" },
    { "ORDER_ID": "HKJLKFjpd", "ORDER_DATE": "Thur 19, April 2020", "phone": "+025 789434343", "DELIVER": "Kirehe" },
]

const Container = () => {

    const [items, setItems] = useState([])


    useEffect(() => {
        let user = jwt(AuthService.getDecToken())
        ShipmentService.getUserShipper(user.id)
            .then((res) => {
                ShipmentService.getMyShipmentsWithStatus(
                  res.data._id,
                  "PENDING"
                )
                  .then((res2) => {
                    setItems(res2.data);
                  })
                  .catch((e) => console.log(e));
            }).catch(e => console.log(e))
    }, [])

    return (
        <GrowableTable Table={Table} items={items} initialItemsLen={2} />
    )
}

export default Container;