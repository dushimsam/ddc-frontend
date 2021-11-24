import GrowableTable from "../../growable-tables-layout"
import HeaderTableLayout from "../../header-table-layouts"
import styles from "../../../../styles/pages/table.module.css";
import ModalLayout from "../../../../components/reusable/modal-layout"
import React, { useState, useEffect } from "react"
// import SuppliesDataService from "../../../../services/supplies/supplies"
import SuppliedPartsDataService from '../../../../services/supplies/supplied-parts';




const ModalTable = ({ supply }) => {

    const [orderFields, setOrderFields] = useState([])
    const [suppliedParts, setSuppliedParts] = useState([])


    useEffect(() => {
        SuppliedPartsDataService.getFromSupply(supply._id)
            .then((res) => {
                setSuppliedParts(res.data)
            }).catch(e => console.log(e))

    }, [supply])

    return (
        <React.Fragment>
            <h5 className="mt-4 font-weight-bolder">All Parts Under This Supply</h5>

            <hr />
            <div className="table-responsive col-12">

                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Part Name</th>
                            <th>Part Number</th>
                            <th>Part Code</th>
                            <th>Quantities</th>
                            <th>Quantities Left</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            suppliedParts?.map((item, i) => (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td> {item.spare_part?.name} </td>
                                    <td> {item.spare_part?.part_number} </td>
                                    <td> {item.spare_part?.part_code} </td>
                                    <td> {item?.quantity} </td>
                                    <td> {item?.current_quantity} </td>

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

    const [supply, setSupply] = useState(null);
    const [fields, setFields] = useState(null);

    const handleSetItem = (item) => {

        setFields(
            {
                title: "Supply Details", value: [{ name: "Supply Date", value: item.supply_date },
                { name: "Receiver Info.", value: `${item.reciever.user.firstName} ${item.reciever.user.lastName} , ${item.reciever.user.phone}` },
                { name: "Supplier Info. ", value: `${item.supplier.user.firstName} ${item.supplier.user.lastName} , ${item.supplier.user.phone}, Email : ${item.supplier.user.email} , Address: ${item.supplier.address} ` }
                ]
            }
        )
        setSupply(item)
        document.getElementById("openSupplyPopBtn").click()
    }


    return (

        <table className={'table  ' + styles.table} style={{ fontSize: '0.8em' }}>
            <thead>
                <th scope="col" className={styles.th}>#</th>
                <th scope="col" className={styles.th}>CUSTOMER NAME</th>
                <th scope="col" className={styles.th}>TOTAL PAID MONEY</th>
                <th scope="col" className={styles.th}>ACTION</th>

            </thead>
            <tbody>
                {
                    rowsData.items.slice(0, rowsData.showItems).map((data, index) => {
                        return (
                            <tr key={index} >
                                <td className={styles.td}>{index + 1}</td>
                                <td className={styles.td}>{data.name}</td>
                                <td className={styles.td}>{data.total}</td>
                                <td className={"cursor-pointer " + styles.td}><a href="" className="text-decoration-none text-primary">Read more</a></td>
                            </tr>
                        )
                    })
                }
            </tbody>
            {
                supply && fields && <ModalLayout Table={<ModalTable supply={supply} />} fields={fields} Title={() => <React.Fragment><span> SUPPLY DONE ON </span> <span class="modal-title ml-3 font-weight-bold" id="exampleModalLabel"> {`# ${supply.supply_date} `} </span><span></span></React.Fragment>
                } />
            }
            <button id="openSupplyPopBtn" className="d-none" data-toggle="modal" data-target="#itemDetailsModal">Large modal</button>
        </table>
    )
}


const items = [
    { "name": "IRUMVA Anselme", "total": "2000 K Frw" },
    { "name": "IRUMVA Anselme", "total": "2000 K Frw" }, { "name": "IRUMVA Anselme", "total": "2000 K Frw" }, { "name": "IRUMVA Anselme", "total": "2000 K Frw" }, { "name": "IRUMVA Anselme", "total": "2000 K Frw" },
    { "name": "IRUMVA Anselme", "total": "2000 K Frw" },
    { "name": "IRUMVA Anselme", "total": "2000 K Frw" },
    { "name": "IRUMVA Anselme", "total": "2000 K Frw" }, { "name": "IRUMVA Anselme", "total": "2000 K Frw" }, { "name": "IRUMVA Anselme", "total": "2000 K Frw" }, { "name": "IRUMVA Anselme", "total": "2000 K Frw" }, { "name": "IRUMVA Anselme", "total": "2000 K Frw" }, { "name": "IRUMVA Anselme", "total": "2000 K Frw" }, { "name": "IRUMVA Anselme", "total": "2000 K Frw" },

    { "name": "IRUMVA Anselme", "total": "2000 K Frw" },
]


const Container = () => {
    return (
        <HeaderTableLayout Content={<GrowableTable items={items} Table={Table} initialItemsLen={4} />} title={"Supplies"} />
    )
}



export default Container