import GrowableTable from "../../growable-tables-layout"
import HeaderTableLayout from "../../header-table-layouts"
import styles from "../../../../styles/pages/table.module.css";
import React, {useEffect, useState} from "react";
import jwt from 'jwt-decode';
import AuthService from "../../../../services/auth/auth.service"
import DirectPurchasesService from "../../../../services/orders/direct-purchase";
import ModalContainer from "../../dialogs/supply-order-dialog";
import {processDetailedDate} from "../../../../utils/process-date";

import globalStyles from "../../../../styles/global-colors.module.css"
import Router from "next/router";
import {encryptText} from "../../../../utils/encryption-decryption";
import {
    currencyMapping,
    customCurrencyMapping,
    defaultCurrencyMapping,
    rwandanCurrency
} from "../../../../utils/currency-converter";
import {gotoPath} from "../../../../utils/functions";


const Table = ({rowsData}) => {
    const [item, setItem] = useState(null);


    const [purchaseParts, setPurchaseParts] = useState(null)

    const handleSetItem = (item) => {
        Router.push(gotoPath("/shared/direct-purchases", item._id))
    }

    return (

        <div className="table-responsive col-12">
            <table className={'table  ' + styles.table} style={{fontSize: '0.8em'}}>
                <thead>
                <th scope="col" className={tableStyles.th}>#</th>
                <th scope="col" className={tableStyles.th}>CUSTOMER NAME</th>
                <th scope="col" className={tableStyles.th}>QUANTITIES</th>
                <th scope="col" className={tableStyles.th}>TOTAL PAID MONEY</th>

                <th scope="col" className={tableStyles.th}>ACTION</th>

                </thead>
                <tbody>
                {
                    rowsData.items.slice(0, rowsData.showItems).map((data, index) => {
                        return (
                            <tr key={index}>
                                <td className={tableStyles.td}>{index + 1}</td>
                                <td className={tableStyles.td}>{data.customer_names}</td>
                                <td className={tableStyles.td}>{`${data.total_product_quantities} Items`}</td>
                                <td className={tableStyles.td}>{`${defaultCurrencyMapping(data.amountToPay)}`}</td>
                                <td className={"cursor-pointer " + tableStyles.td}><a
                                    className={"text-decoration-none " + globalStyles.globalTextColor}
                                    onClick={() => handleSetItem(data)}>Read more</a></td>
                            </tr>
                        )
                    })
                }
                </tbody>

                {
                    item && <ModalContainer data={item.products} itemObj={item} status="direct_purchase"
                                            title={"Direct Purchase Information"}
                                            date={processDetailedDate(item.createdAt)}/>
                }

            </table>
        </div>
    )
}


const Container = () => {
    const [items, setItems] = useState([])


    function filter_manager(item) {
        let user = jwt(AuthService.getDecToken())
        return item.created_by.user._id === user.id
    }

    useEffect(() => {
        DirectPurchasesService.getPastWeek().then((res) => {
            setItems(res.data.filter(filter_manager));
        }).catch(err => console.log(err))
    }, [])


    return (
        <HeaderTableLayout Content={<GrowableTable items={items} Table={Table} initialItemsLen={2}/>}
                           title={"Items You Sold"}/>
    )
}

const tableStyles = {
    td: {
        fontSize: "0.85em",
        color: "#707070"
    },
    th: {
        letterSpacing: "0.4px",
        textTransform: "uppercase",
        fontSize: "0.85em"
    }
}

export default Container