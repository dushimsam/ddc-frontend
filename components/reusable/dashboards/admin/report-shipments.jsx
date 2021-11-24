import React, {useEffect, useState} from 'react';
import styles from "../../../../styles/pages/table.module.css";
import GrowableTable from "../../growable-tables-layout"
import ShipmentService from "../../../../services/shipments/shipment.service"
import {dateFormat, find_date_difference, gotoPath} from "../../../../utils/functions";
import Router from "next/router";
import {encryptText} from "../../../../utils/encryption-decryption";
import OrderService from "../../../../services/orders/orders"

const Table = ({rowsData}) => {

    const handleShowMore = (item) => {
        Router.push(gotoPath("/shared/orders",item._id))
    }

    return (
        <div className={"table-responsive col-12"}>

            <table className={'table border  rounded ' + styles.table} style={{fontSize: '0.8em'}}>
                <thead>
                <tr>
                    <th scope="col" className={styles.th}>#</th>
                    <th scope="col" className={styles.th}>USER</th>
                    <th scope="col" className={styles.th}>ACTION</th>
                    {/* <th scope="col" className={styles.th}>TIME</th> */}
                    {/* <th scope="col" className={styles.th}>PRICE</th> */}
                    <th scope="col" className={styles.th}>WHEN</th>

                </tr>
                </thead>
                <tbody>
                {
                    rowsData?.items?.slice(0, rowsData.showItems)?.map((data2, index) => {
                        return (<tr key={data2.index}>
                                <td className={styles.td}>{index + 1}</td>
                                <td className={styles.td}>{`${data2.shipper.user.firstName}  ${data2.shipper.user.lastName}`}</td>
                                <td className={styles.td}>
                                <span onClick={() => handleShowMore(data2.order)} style={{fontSize: "0.85em"}}
                                      className={(data2.status === 'DELIVERED') ? styles.active : (data2.status === 'PENDING') ? styles.pending : (data2.status === 'CANCELLED' || data2.status === 'FAILED') ? styles.inactive : ''}>
                                    {data2.status == "DELIVERED" ? "Delivered an " : data2.status == "FAILED" ? "Has a failed " : "Has a pending "} Order with Code {" " + data2?.order?.code}
                                </span>
                                </td>
                                <td className={styles.td}>{dateFormat(data2.createdAt).fromNow()}</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    )
}


const ReportShipments = () => {
    let date = new Date();

    const [latestDelivery, setLatestDerivery] = useState([])

    function filter_objects(item) {
        let diff = find_date_difference(new Date(item.updatedAt), new Date())
        return (diff[1] <= 8)
    }


    useEffect(() => {

        ShipmentService.getAll().then((res3) => {
            setLatestDerivery(res3.data.filter(filter_objects))
        }).catch(err => console.log(err))

        OrderService.getPassedWeek().then((res)=>{
            console.log("Passed weeks orders ",res.data)
        }).catch(e=>console.log(e))
    }, [])


    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <GrowableTable Table={Table} items={latestDelivery} initialItemsLen={4}/>
            </div>
        </div>
    )
}

const new_styles = {
    badges: {
        fontSize: "1em"
    }
}

export default ReportShipments;