import HeaderTableLayout from "../../header-table-layouts"
import styles from "../../../../styles/pages/table.module.css";
import React, {useEffect, useState} from "react";
import ShipmentService from '../../../../services/shipments/shipment.service';
import globalStyles from "../../../../styles/global-colors.module.css"
import Router from "next/router";
import {gotoPath} from "../../../../utils/functions";


const Table = ({shippersFree, shippersWork, ON_WORK}) => {
    const [item, setItem] = useState(null)
    const handleSetItem = (item, status) => {
        if (status === "ON_WORK")
            Router.push(gotoPath("/shared/shippers", item.shipper._id))
        else
            Router.push(gotoPath("/shared/shippers", item._id))
    }

    return (
        <div className="table-responsive col-12">

            <table className={'table  ' + styles.table} style={{fontSize: '0.8em'}}>
                <thead>
                <th scope="col" className={styles.th}>#</th>
                <th scope="col" className={styles.th}>SHIPPER NAMES</th>
                <th scope="col" className={styles.th}>CONTACT</th>
                <th scope="col" className={styles.th}>ACTION</th>

                </thead>
                <tbody>

                {
                    ON_WORK ?
                        shippersWork.map((data, index) => {
                            return (
                                <tr key={index}>
                                    <td className={styles.td}>{index + 1}</td>
                                    <td className={styles.td}>{data.shipper.user.firstName + " " + data.shipper.user.lastName}</td>
                                    <td className={styles.td}>{data.shipper.user.phone}</td>
                                    <td className={"cursor-pointer " + styles.td}><a
                                        className={"text-decoration-none " + globalStyles.globalTextColor}
                                        onClick={() => handleSetItem(data, "ON_WORK")}>Read more</a></td>
                                </tr>
                            )
                        }) :
                        shippersFree.map((data, index) => {
                            return (
                                <tr key={index}>
                                    <td className={styles.td}>{index + 1}</td>
                                    <td className={styles.td}>{data.user.firstName + " " + data.user.lastName}</td>
                                    <td className={styles.td}>{data.user.phone}</td>
                                    <td className={"cursor-pointer " + styles.td}><a
                                        className={"text-decoration-none " + globalStyles.globalTextColor}
                                        onClick={() => handleSetItem(data, "FREE")}>Read more</a></td>
                                </tr>
                            )
                        })

                }


                </tbody>
                {/*{item && <ModalProfileDetails item={item} category={"PRODUCT SHIPPER"}/>}*/}
            </table>
        </div>
    )
}


const Buttons = ({setFilter, ON_WORK}) => {
    return (
        <React.Fragment>
            <button className="btn pt-1 pl-2 pr-2 pb-1" style={ON_WORK ? ButtonStyles.btn1 : ButtonStyles.btn2}
                    onClick={() => setFilter(true)}>On Work
            </button>
            <button className="btn pt-1 pl-2 pr-2 pb-1 ml-3" style={!ON_WORK ? ButtonStyles.btn1 : ButtonStyles.btn2}
                    onClick={() => setFilter(false)}>Free
            </button>
        </React.Fragment>
    )
}


const Container = ({ON_WORK}) => {

    const [shippersWork, setShippersWork] = useState([]);
    const [shippersFree, setFreeShippers] = useState([]);


    function filter_shippers(shipper) {
        return !shippersWork.some(shipperOnWork => shipperOnWork.shipper._id == shipper._id)
    }


    useEffect(() => {
        ShipmentService.getStatusedShipments("PENDING")
            .then((res) => {
                setShippersWork(res.data)
            }).catch(e => console.log(e))
    }, [])


    useEffect(() => {
        if (shippersWork) {
            ShipmentService.getAllShippers()
                .then((res) => {
                    setFreeShippers(res.data.filter(filter_shippers))
                }).catch(e => console.log(e))
        }
    }, [shippersWork])


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <Table shippersFree={shippersFree} shippersWork={shippersWork} ON_WORK={ON_WORK}/>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-3">
                    {/* <button type="button" style={styles.button} className="btn btn-outline-danger d-flex justify-content-center" onClick={() => handleShowMore()}>{data.showItems >= data.items.length ? "Show Less" : "Show More"}</button> */}
                </div>
            </div>
        </div>
    )
}
{/* <HeaderTableLayout Content={} title={"Shippers"} Toolbar={<Buttons setFilter={toggleFilter}/>}/> */
}

const Page = () => {
    const [ON_WORK, setFilter] = useState(true);

    const toggleFilter = (VALUE) => {
        setFilter(VALUE)
    }
    return (

        <HeaderTableLayout Content={<Container ON_WORK={ON_WORK}/>} title={"Shippers"}
                           Toolbar={<Buttons setFilter={toggleFilter} ON_WORK={ON_WORK}/>}/>

    )
}
const ButtonStyles = {
    btn1: {
        backgroundColor: "#5A8DEE",
        fontSize: "0.8em",
        color: "#FFFFFF"
    },
    btn2: {
        backgroundColor: "#E2ECFF",
        fontSize: "0.8em",
        color: "#5A8DEE"
    }
}


export default Page

