import GrowableTable from "../../growable-tables-layout"
import HeaderTableLayout from "../../header-table-layouts"
import styles from "../../../../styles/pages/table.module.css";
import ModalLayout from "../../../../components/reusable/modal-layout"
import React, { useEffect, useState } from "react";
import ShipmentService from "../../../../services/shipments/shipment.service"
import { processDetailedDate } from "../../../../utils/process-date";
import Router from "next/router";
import {dateFormat, gotoPath} from "../../../../utils/functions";





const ModalTable = ({ item }) => {

    return (
        <React.Fragment>
            <h5 className="mt-4 font-weight-bolder">All Parts Under This Purchase</h5>
            <hr />
            <div className="table-responsive col-12">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Part Name</th>
                            <th>Part Number</th>
                            <th>Part Code</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            item.products?.map((item, i) => (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td> {item.product.part_in_stock?.spare_part?.name} </td>
                                    <td> {item.product.part_in_stock?.spare_part?.part_number} </td>
                                    <td> {item.product.part_in_stock?.spare_part?.part_code} </td>
                                    <td> {item?.quantity} </td>
                                    <td> {item?.total_price} </td>

                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    )
}


const Table = ({ rowsData }) => {
    const [fields, setFields] = useState(null)
    const [item, setItem] = useState(null);

    const handleSetItem = (item) => {
        Router.push(gotoPath("/shared/orders",item._id))
    }



    return (
        <div className="table-responsive col-12">

            <table className={'table  ' + styles.table} style={{ fontSize: '0.8em' }}>
                <thead>
                    <th scope="col" className={styles.th}>#</th>
                    <th scope="col" className={styles.th}>SHIPPER NAMES</th>
                    <th scope="col" className={styles.th}>ORDER CODE</th>

                    <th scope="col" className={styles.th}>STATUS</th>
                    <th scope="col" className={styles.th}>WHEN</th>
                </thead>
                <tbody>
                    {
                        rowsData.items.slice(0, rowsData.showItems).map((data2, index) => {
                            return (<tr key={data2.index}>
                                <td className={styles.td}>{index + 1}</td>
                                <td className={styles.td}>{`${data2.shipper.user.firstName}  ${data2.shipper.user.lastName}`}</td>
                                <td className={styles.td}>{data2.payment?.order?.code}</td>
                                <td className={styles.td}>
                                    <span style={{ fontSize: "0.85em" }} className={(data2.status === 'DELIVERED') ? styles.active : (data2.status === 'PENDING') ? styles.pending : (data2.status === 'CANCELLED' || data2.status === 'FAILED') ? styles.inactive : ''}>
                                        {data2.status}
                                    </span>
                                </td>
                                <td className={styles.td}>{dateFormat(data2.updatedAt).fromNow()}</td>
                            </tr>
                            )
                        })
                    }
                </tbody>

                {/*{fields && item && <ModalLayout fields={fields} Table={<ModalTable item={item} />} Title={() => <React.Fragment><span> PURCHASE MADE ON </span> <span class="modal-title ml-3 font-weight-bold" id="exampleModalLabel"> {`${processDetailedDate(item.createdAt)}`} </span><span></span></React.Fragment>} />}*/}

                {/*<React.Fragment>*/}
                {/*    <button id="openModal" className="d-none" data-toggle="modal" data-target="#itemDetailsModal">Large modal</button>*/}
                {/*</React.Fragment>*/}
            </table>
        </div>
    )
}


// const items = [
//     {"name":"IRUMVA Anselme","total":"2000 K Frw"},
//     {"name":"IRUMVA Anselme","total":"2000 K Frw"},    {"name":"IRUMVA Anselme","total":"2000 K Frw"},    {"name":"IRUMVA Anselme","total":"2000 K Frw"},    {"name":"IRUMVA Anselme","total":"2000 K Frw"},
//     {"name":"IRUMVA Anselme","total":"2000 K Frw"},
//     {"name":"IRUMVA Anselme","total":"2000 K Frw"},
//     {"name":"IRUMVA Anselme","total":"2000 K Frw"},    {"name":"IRUMVA Anselme","total":"2000 K Frw"},    {"name":"IRUMVA Anselme","total":"2000 K Frw"},    {"name":"IRUMVA Anselme","total":"2000 K Frw"},    {"name":"IRUMVA Anselme","total":"2000 K Frw"},    {"name":"IRUMVA Anselme","total":"2000 K Frw"},    {"name":"IRUMVA Anselme","total":"2000 K Frw"},

//     {"name":"IRUMVA Anselme","total":"2000 K Frw"},
// ]


const Shipments = () => {
    const [items, setItems] = useState([])
    function filter_objects(item) {
        var date1 = new Date(item.updatedAt);
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

        return date1.getTime() > yesterday.getTime()
    }


    useEffect(() => {

        ShipmentService.getAll().then((res) => {
            // setReportItems([ {"DISCRIPTO":"SUPPLY","DATA":res1.data.filter(filter_objects)},  {"DISCRIPTO":"SHIPMENT","DATA":res3.data.filter(filter_objects)} , {"DISCRIPTO":"PURCHASE","DATA":res2.data.filter(filter_objects)}])
            setItems(res.data.filter(filter_objects))
        }).catch(err => console.log(err))

    }, [])
    return (
        <HeaderTableLayout Content={<GrowableTable items={items} Table={Table} initialItemsLen={4} />} title={"Shipment Report"} />
    )
}



export default Shipments