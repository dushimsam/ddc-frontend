import React from 'react';
import {useEffect, useState} from 'react';
import styles from "../../../../styles/pages/table.module.css";
import GrowableTable from "../../growable-tables-layout"
import Supplies from "../../../../services/supplies/supplies"
import DirectPurchasesService from "../../../../services/orders/direct-purchase";
import ShipmentService from "../../../../services/shipments/shipment.service"
import {processDetailedDate} from '../../../../utils/process-date';
import {dateFormat, find_date_difference} from "../../../../utils/functions";
import Router from "next/router";
import {encryptText} from "../../../../utils/encryption-decryption";
import $ from "jquery";
import {
    currencyMapping,
    customCurrencyMapping,
    defaultCurrencyMapping,
    rwandanCurrency
} from "../../../../utils/currency-converter";

const Table = ({latestPurchases, latestSupplies, latestDelivery}) => {


    const handleShowMore = (item, status) => {
        if (status === 'PURCHASE') {
            Router.push({pathname: "/shared/direct-purchases", query: {id: encryptText(item._id)}})
        } else if (status === 'SUPPLY') {
            Router.push({pathname: "/shared/supply/supplies", query: {id: encryptText(item._id)}})
        }
    }

    return (
        <table className={'table border  rounded ' + styles.table} style={{fontSize: '0.8em'}}>
            <thead>
            <tr>
                <th scope="col" className={styles.th}>#</th>
                <th scope="col" className={styles.th}>USER</th>
                <th scope="col" className={styles.th}>CONTEXT</th>
                <th scope="col" className={styles.th}>Full names</th>
                <th scope="col" className={styles.th}>ACTION</th>
                {/* <th scope="col" className={styles.th}>TIME</th> */}
                {/* <th scope="col" className={styles.th}>PRICE</th> */}
                <th scope="col" className={styles.th}>WHEN</th>

            </tr>
            </thead>
            <tbody>
            {

                latestPurchases?.map((data2, index) => {
                    return (
                        <tr key={index}>
                            <td className={styles.td}>{index + 1}</td>
                            <td className={styles.td}>{"SALESMANAGER"}</td>
                            <td className={styles.td}>{"PURCHASE"}</td>
                            <td className={styles.td}>{`${data2.created_by.user.firstName}  ${data2.created_by.user.lastName}`}</td>
                            <td className={styles.td}><span className={styles.info} style={{fontSize: "0.87em"}}
                                                            onClick={() => handleShowMore(data2, "PURCHASE")}>{`Purchased  ${data2.total_product_quantities} Quantities at ${defaultCurrencyMapping(data2.amountToPay)}`}</span>
                            </td>
                            <td className={styles.td}>{dateFormat(data2.createdAt).fromNow()}</td>
                        </tr>)
                })
            }
            {
                latestSupplies?.map((data2, index) => {
                    return (<tr key={index}>
                        <td className={styles.td}>{latestPurchases.length + index + 1}</td>
                        <td className={styles.td}>{"SALESMANAGER"}</td>
                        <td className={styles.td}>{"SUPPLY"}</td>
                        <td className={styles.td}>{`${data2.reciever.user.firstName}  ${data2.reciever.user.lastName}`}</td>
                        <td className={styles.td}>
                            <span className={styles.primary} style={{fontSize: "0.87em"}}
                                  onClick={() => handleShowMore(data2, "SUPPLY")}>{`Recorded a supply of  ${defaultCurrencyMapping(data2.supply_price)}`}</span>
                        </td>
                        <td className={styles.td}>{dateFormat(data2.createdAt).fromNow()}</td>
                    </tr>)
                })
            }
            {
                latestDelivery.map((data2, index) => {
                    return (<tr key={data2.index}>
                            <td className={styles.td}>{latestPurchases.length + latestSupplies.length + index + 1}</td>
                            <td className={styles.td}>{"SHIPPER"}</td>
                            <td className={styles.td}>{"SHIPMENT"}</td>
                            <td className={styles.td}>{`${data2.shipper.user.firstName}  ${data2.shipper.user.lastName}`}</td>
                            <td className={styles.td}>
    <span style={{fontSize: "0.85em"}}
          className={(data2.status === 'DELIVERED') ? styles.active : (data2.status === 'PENDING') ? styles.pending : (data2.status === 'CANCELLED' || data2.status === 'FAILED') ? styles.inactive : ''}>
    {data2.status == "DELIVERED" ? "Delivered an " : data2.status == "FAILED" ? "Has a failed " : "Has a pending "} Order with Code {" " + data2.payment?.order?.code}
      </span>
                            </td>
                            <td className={styles.td}>{dateFormat(data2.createdAt).fromNow()}</td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    )
}


const Container = () => {
    let date = new Date();
    const [latestPurchases, setLatestPurchases] = useState([])
    const [latestSupplies, setLatestSupplies] = useState([])
    const [latestDelivery, setLatestDerivery] = useState([])
    const [reportItems, setReportItems] = useState([])

    function filter_objects(item) {
        let diff = find_date_difference(new Date(item.updatedAt), new Date())
        return (diff[1] <= 8)
    }


    useEffect(() => {


        Supplies.getAll()
            .then((res1) => {
                setLatestSupplies(res1.data.filter(filter_objects));
            })
            .catch((err) => console.log(err));

        ShipmentService.getAll()
            .then((res3) => {
                setLatestDerivery(res3.data.filter(filter_objects));
            })
            .catch((err) => console.log(err));

        DirectPurchasesService.getAll()
            .then((res2) => {
                setLatestPurchases(res2.data.filter(filter_objects));
            })
            .catch((err) => console.log(err));


    }, [])


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <Table latestPurchases={latestPurchases} latestSupplies={latestSupplies}
                           latestDelivery={latestDelivery}/>
                </div>
            </div>
            <div className="row justify-content-center">
                {/* <div className="col-3">
                <button type="button" style={styles.button} className="btn btn-outline-danger d-flex justify-content-center" onClick={() => handleShowMore()}>{data.showItems >= data.items.length ? "Show Less" : "Show More"}</button>
            </div> */}
            </div>
            {/* <GrowableTable Table={Table} items={reportItems} initialItemsLen={4} /> */}
        </div>
    )
}

const new_styles = {
    badges: {
        fontSize: "1em"
    }
}

export default Container;