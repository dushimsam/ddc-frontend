import React, {useEffect, useState} from 'react';
import styles from "../../../../styles/pages/table.module.css";
import GrowableTable from "../../growable-tables-layout"
import {dateFormat, gotoPath} from "../../../../utils/functions";
import Router from "next/router";
import OrderService from "../../../../services/orders/orders"


const Table = ({rowsData}) => {

    const handleShowMore = (item) => {
        Router.push(gotoPath("/shared/orders", item._id))
    }

    return (

        <div className={"table-responsive col-12"}>
            <table className={'table border  rounded ' + styles.table} style={{fontSize: '0.8em'}}>
                <thead>
                <tr>
                    <th scope="col" className={styles.th}>#</th>
                    <th scope="col" className={styles.th}>USER</th>
                    <th scope="col" className={styles.th}>ACTION</th>
                    <th scope="col" className={styles.th}>RECENTLY UPDATED</th>
                </tr>
                </thead>
                <tbody>
                {
                    rowsData?.items?.slice(0, rowsData.showItems)?.map((data2, index) => {
                        return (<tr key={index}>
                            <td className={styles.td}>{index + 1}</td>
                            <td className={styles.td}>{`${data2.customer.user.firstName}  ${data2.customer.user.lastName}`}</td>
                            <td className={styles.td}><span className={styles.info} style={{fontSize: "0.87em"}}
                                                            onClick={() => handleShowMore(data2)}>{`Made a ${data2.status} order of ${data2.delivery_zone.zone} in ${data2.delivery_zone.region.region} - ${data2.delivery_zone.region.country.country}`}</span>
                            </td>
                            <td className={styles.td}>{dateFormat(data2.updatedAt).fromNow()}</td>
                        </tr>)
                    })}
                </tbody>
            </table>
        </div>
    )
}


const ReportOrders = () => {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        OrderService.getPassedWeek().then((res) => {
            setOrders(res.data)
        }).catch(e => console.log(e))
    }, [])


    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <GrowableTable Table={Table} items={orders} initialItemsLen={4}/>
            </div>
        </div>
    )
}

const new_styles = {
    badges: {
        fontSize: "1em"
    }
}

export default ReportOrders;