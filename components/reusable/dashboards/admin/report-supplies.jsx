import React, {useEffect, useState} from 'react';
import styles from "../../../../styles/pages/table.module.css";
import GrowableTable from "../../growable-tables-layout"
import Supplies from "../../../../services/supplies/supplies"
import {dateFormat, find_date_difference, gotoPath} from "../../../../utils/functions";
import Router from "next/router";
import {
    currencyMapping,
    customCurrencyMapping,
    defaultCurrencyMapping,
    rwandanCurrency
} from "../../../../utils/currency-converter";

const Table = ({rowsData}) => {


    const handleShowMore = (item) => {
        Router.push(gotoPath("/shared/supply/supplies", item._id))
    }

    return (
        <div className={"table-responsive col-12"}>
            <table className={'table border  rounded  ' + styles.table} style={{fontSize: '0.8em'}}>
                <thead>
                <tr>
                    <th scope="col" className={styles.th}>#</th>
                    <th scope="col" className={styles.th}>USER</th>
                    <th scope="col" className={styles.th}>ACTION</th>
                    <th scope="col" className={styles.th}>WHEN</th>
                </tr>
                </thead>
                <tbody>
                {
                    rowsData?.items?.slice(0, rowsData.showItems)?.map((data2, index) => {
                        return (<tr key={index}>
                            <td className={styles.td}>{index + 1}</td>
                            <td className={styles.td}>{`${data2.reciever.user.firstName}  ${data2.reciever.user.lastName}`}</td>
                            <td className={styles.td}>
                                <span className={styles.primary} style={{fontSize: "0.87em"}}
                                      onClick={() => handleShowMore(data2)}>{`Recorded a supply of  ${defaultCurrencyMapping(data2.supply_price)}`}</span>
                            </td>
                            <td className={styles.td}>{dateFormat(data2.createdAt).fromNow()}</td>
                        </tr>)
                    })
                }
                </tbody>
            </table>
        </div>
    )
}


const ReportSupplies = () => {
    let date = new Date();
    const [latestSupplies, setLatestSupplies] = useState([])

    function filter_objects(item) {
        let diff = find_date_difference(new Date(item.updatedAt), new Date())
        return (diff[1] <= 8)
    }


    useEffect(() => {
        Supplies.getPassedWeek().then((res1) => {
            setLatestSupplies(res1.data.reverse())
        }).catch(err => console.log(err))

    }, [])


    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <GrowableTable Table={Table} items={latestSupplies} initialItemsLen={4}/>
            </div>
        </div>
    )
}

const new_styles = {
    badges: {
        fontSize: "1em"
    }
}

export default ReportSupplies;