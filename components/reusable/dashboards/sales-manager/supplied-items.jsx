import GrowableTable from "../../growable-tables-layout"
import HeaderTableLayout from "../../header-table-layouts"
import styles from "../../../../styles/pages/table.module.css";
import ModalLayout from "../../../../components/reusable/modal-layout"
import React, { useEffect, useState } from "react";
import Supplies from "../../../../services/supplies/supplies"
import jwt from 'jwt-decode';
import AuthService from "../../../../services/auth/auth.service"
import { processDetailedDate } from "../../../../utils/process-date";
import $ from "jquery";
import SuppliedPartsDataService from "../../../../services/supplies/supplied-parts";
import globalStyles from "../../../../styles/global-colors.module.css"
import ModalContainer from "../../dialogs/supply-order-dialog";
import Router from "next/router";
import {dateFormat, gotoPath} from "../../../../utils/functions";
import {
    currencyMapping,
    customCurrencyMapping,
    defaultCurrencyMapping,
    rwandanCurrency
} from "../../../../utils/currency-converter";


const Table = ({ rowsData }) => {
    const [item, setItem] = useState(null);
    const [data, setData] = useState(null)

    const handleSetItem = (item) => {
        Router.push(gotoPath( "/shared/supply/supplies",item._id))
    }


    return (
        <div className="table-responsive col-12">

            <table className={'table  ' + styles.table} style={{ fontSize: '0.7em' }}>
                <thead>
                    <th scope="col" className={tableStyles.th}>#</th>
                    <th scope="col" className={tableStyles.th}>SUPPLIER</th>
                    <th scope="col" className={tableStyles.th}>QUANTITIES</th>
                    <th scope="col" className={tableStyles.th}>TOTAL PRICE</th>
                    <th scope="col" className={tableStyles.th}>WHEN</th>
                    <th scope="col" className={tableStyles.th}>ACTION</th>

                </thead>
                <tbody>
                    {
                        rowsData.items.slice(0, rowsData.showItems).map((data, index) => {
                            return (
                                <tr key={index}>
                                    <td className={tableStyles.td} >{index + 1}</td>
                                    <td className={tableStyles.td}>{`${data.supplier.address}`}</td>
                                    <td className={tableStyles.td}>{"NOT YET"}</td>

                                    <td className={tableStyles.td}>{defaultCurrencyMapping(data.supply_price)}</td>
                                    <td className={tableStyles.td}>{dateFormat(data.createdAt).fromNow()}</td>

                                    <td className={"cursor-pointer " + tableStyles.td}><a onClick={() => handleSetItem(data)}
                                        className={"text-decoration-none " + globalStyles.globalTextColor}>Read
                                        more</a></td>
                                </tr>
                            )
                        })
                    }
                </tbody>

                {item ? <ModalContainer itemObj={item} status="supply" title={"Supply Information"} data={data}
                    date={processDetailedDate(item.createdAt)} /> : null}

            </table>
        </div>
    )
}

const SuppliedItems = () => {
    const [items, setItems] = useState([])


    function filter_objects(item) {
        var date1 = new Date(item.createdAt);
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        return date1.getTime() > yesterday.getTime()
    }


    function filter_manager(item) {
        let user = jwt(AuthService.getDecToken())
        return item.reciever.user._id === user.id
    }

    useEffect(() => {
        Supplies.getPassedWeek()
          .then((res1) => {
            setItems(res1.data.filter(filter_manager));
          })
          .catch((err) => console.log(err));
    }, [])
    return (
        <HeaderTableLayout Content={<GrowableTable items={items} Table={Table} initialItemsLen={2} />}
            title={"Supplies"} />
    )
}

const tableStyles = {
    td: {
        fontSize: "0.9em",
        color: "#707070"
    },
    th: {
        letterSpacing: "0.4px",
        textTransform: "uppercase",
        fontSize: "0.9em"
    }
}
export default SuppliedItems