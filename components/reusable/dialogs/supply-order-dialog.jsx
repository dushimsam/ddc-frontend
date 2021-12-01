import React, {useEffect, useState} from "react"
import styles from "../../../styles/components/productsDetailsDialog.module.css"
import ImageModalView from "../image-modal-view";
import {gotoPath} from "../../../utils/functions";
import ProductService from "../../../services/products/ProductService";
import $ from "jquery";
import Router from "next/router";
import {customCurrencyMapping, defaultCurrencyMapping} from "../../../utils/currency-converter";
import {useSelector} from "react-redux";


// SHARABLE TABLE DESIGN

const SingleTdDetails = ({product, quantity, price, currency, user}) => {
    const [imageUrl, setImageUrl] = useState(null);
    const [onMarketInfo, setOnMarketInfo] = useState(null);

    useEffect(() => {
        ProductService.getByProductExists(product._id)
            .then((res) => {
                if (res.data.exists)
                    setOnMarketInfo(res.data.object)
            }).catch(e => console.log(e))
    }, [product])

    return (
        <React.Fragment>
            <td>
                <img className="img-thumbnail rounded"
                     src={product.imageUrls[0]}

                     onError={(e) => {
                         e.target.onerror = null;
                         e.target.src = "/img/default-spare-part.png";
                     }}
                     height={80}
                     width={80}
                     alt={product?.name}
                     onClick={() => setImageUrl(product?.imageUrls[0] ? product.imageUrls[0] : "/img/default-spare-part.png")}
                />
            </td>
            <td>
                <div className={"col-12"}>
                    <h5 className={"font-weight-bold text-primary cursor-pointer " + styles.mainInfoTitle}
                        onClick={() => Router.push(gotoPath(
                            "/admin/products/on-market",
                            onMarketInfo._id
                        ))}>{`${product?.name}`}</h5>

                       <span
                        className={"font-weight-bold " + styles.generalColor + " " + styles.mainInfoMeta}>Product Code</span>
                    <span
                        className={"font-weight-light " + styles.generalColor + " " + styles.mainInfoMetaValue}>:{`${product?.product_code}`}</span>
                    <br/>

                    <span
                        className={"font-weight-bold " + styles.generalColor + " " + styles.mainInfoMeta}>Description</span>
                    <span
                        className={"font-weight-light " + styles.generalColor + " " + styles.mainInfoMetaValue}>: {`${product?.description}`}</span>
                </div>
            </td>

            <td>
                {`${quantity.toLocaleString()}`}
                {quantity > 1 ? " items" : " item"}
            </td>
            <td>
                {`${customCurrencyMapping(currency, user, (price / quantity))} `}
            </td>

            <td>
                {`${customCurrencyMapping(currency, user, price)}`}
            </td>


            {
                imageUrl && <ImageModalView imgUrl={product?.imageUrls}/>
            }
        </React.Fragment>
    )
}

const TotalSumUp = ({totalQuantities, totalAmount, data, status, currency, user}) => {
    // console.log("Total amount ", defaultCurrencyMapping(totalAmount))
    return (
        <React.Fragment>
            <td/>
            <td>
                <div className="font-weight-bold h5"> Total Sum Up:</div>
            </td>
            <td><p className="font-weight-bold h5">
                {`${totalQuantities?.toLocaleString()}`}
                {totalQuantities > 1 ? " items" : " item"}
            </p></td>
            <td/>
            {status === "direct_purchase" ? <>
                <td/>
                <td/>
            </> : <></>}
            <td>
                <p className="font-weight-bold h5">{defaultCurrencyMapping(totalAmount)}</p>
            </td>

        </React.Fragment>
    )
}


const TableContainer = ({data, totalQuantities, totalPrice, status, itemObj, currency, user}) => {
    return (

        <table className={"border  table " + styles.tableContainer}>
            <thead>
            <th className={styles.tableHead}/>
            <th className={styles.tableHead}><h6
                className={"font-weight-bold " + " " + styles.generalColor}>PRODUCT</h6></th>
            <th className={styles.tableHead}><h6
                className={"font-weight-bold " + styles.tableHead + " " + styles.generalColor}>QUANTITY</h6></th>
            <th className={styles.tableHead}><h6
                className={"font-weight-bold " + styles.tableHead + " " + styles.generalColor}>UNIT PRICE</h6></th>


            {
                status === "direct_purchase" ?
                    <th className={styles.tableHead}><h6
                        className={"font-weight-bold " + styles.tableHead + " " + styles.generalColor}>DISCOUNT</h6>
                    </th> : <></>
            }
            <th className={styles.tableHead}><h6
                className={"font-weight-bold " + styles.tableHead + " " + styles.generalColor}>TOTAL</h6></th>
            {
                status === "direct_purchase" ? <th className={styles.tableHead}><h6
                        className={"font-weight-bold " + styles.tableHead + " " + styles.generalColor}>SUB-TOTAL</h6></th>
                    : <></>
            }
            </thead>
            <tbody>
            {
                data.length > 0 ? data.map((item) => {
                    return (<tr className={styles.td} key={item._id}><SingleTdDetails key={item}
                                                                                      item={item}
                                                                                      product={item.product}
                                                                                      quantity={item.quantity}
                                                                                      status={status}
                                                                                      currency={currency}
                                                                                      user={user}
                                                                                      price={status === "supply" ? item.supply_price : status === "direct_purchase" ? item.total_price : item.price}/>
                    </tr>)
                }) : null
            }
            <tr>
                <TotalSumUp data={data}
                            currency={currency}
                            user={user}
                            status={status}
                            totalQuantities={status === "order" ? itemObj.total_order_quantities : status === "supply" ? itemObj.supply_quantity : itemObj.total_product_quantities}
                            totalAmount={status === "order" ? itemObj.total_order_price : status === "supply" ? itemObj.supply_price : itemObj.amountToPay}/>
            </tr>
            </tbody>

        </table>
    )
}


const otherStyles = {
    profile: {},
    td: {
        width: "4em"
    }
}

// SHARABLE USER CONTAINER
export const UserContainer = ({userTitle, UserObj, status}) => {
    return (
        <div className="container">

            <h5 className={styles.generalColor + " font-weight-bold " + styles.userTitle}>{userTitle}</h5>
            <hr className={"mt-3"}/>
            <div className="row">

                <div className="col-3">
                    {
                        status !== "SUPPLIER" ?
                            <img className={"rounded-circle " + styles.profileImg}
                                 src={UserObj.imageUrl}
                                 onError={(e) => {
                                     e.target.onerror = null;
                                     e.target.src =
                                         "https://ui-avatars.com/api/?name=" +
                                         UserObj.username;
                                 }}
                                 alt={UserObj.username}
                                 title={UserObj.username}
                            />
                            :
                            <img className={"rounded-circle " + styles.profileImg}
                                 src={"https://ui-avatars.com/api/?name=" + status}
                                 alt={status}
                                 title={status}
                            />
                    }

                </div>

                <div className="col-6">
                    <div>
                        <h5 className={styles.userName + " font-weight-bold"}>{`${UserObj.firstName} ${UserObj.lastName}`}</h5>
                    </div>
                    <div className="ml-2">
                        <p className={styles.locationDetails + " " + styles.generalColor}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                                <path fill="none" d="M0 0h24v24H0z"/>
                                <path
                                    d="M18.364 17.364L12 23.728l-6.364-6.364a9 9 0 1 1 12.728 0zM12 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
                                    fill="rgba(149,164,166,1)"/>
                            </svg>
                            Kigali, Rwanda
                        </p>
                        <p className={styles.emailDetails}>{UserObj.email}</p>
                        <p className={styles.phoneDetails + " " + styles.generalColor}>{UserObj.phone}</p>
                    </div>

                </div>

            </div>

        </div>
    )
}


// SUPPLY INFO
export const SupplyInfo = ({itemObj, status}) => {
    return (
        <div className="container">
            <div className="row justify-content-between">

                <div className="col-md-5 col-10">
                    <UserContainer userTitle={"Supplier Information"} UserObj={itemObj.supplier.user}
                                   status={"SUPPLIER"}/>

                </div>

                <div className="col-md-5 col-10 mt-2 mt-md-0">
                    <UserContainer userTitle={"Receiver Information"}
                                   UserObj={status === "cars" ? itemObj.receiver : itemObj.reciever.user}/>
                </div>
            </div>
        </div>
    )
}


// ORDER INFO


const OrderInfo = ({itemObj}) => {

    const orderFields = [{
        name: "Sub total",
        value: itemObj.total_order_price?.toLocaleString() + " Rwf"
    }, {name: "Total Amount", value: "NONE"}]
    const shipmentFields = [{name: "Country", value: itemObj.delivery_zone.region.country.country}, {
        name: "Region",
        value: itemObj.delivery_zone.region.region
    }, {name: "Zone", value: itemObj.delivery_zone.zone}]
    return (

        <div className="container">
            <div className="row justify-content-between ">
                {/*<div className="col-sm-4 col-12">*/}
                {/*    <SingleOrderList title={"Order and Payment information"} fields={orderFields}/>*/}
                {/*</div>*/}

                <div className="col-sm-5 col-12 pl-5">
                    <SingleOrderList title={"Shipment information"} fields={shipmentFields}/>
                </div>

                <div className="col-sm-5 col-12 pr-2">
                    <UserContainer userTitle={"Customer Information"} UserObj={itemObj.customer.user}/>
                </div>
            </div>
        </div>

    )
}

const DirectPurchaseInfo = ({itemObj}) => {
    console.log(itemObj)
    const orderFields = [{
        name: "Total Product Quantities",
        value: itemObj.total_product_quantities.toLocaleString() + " Items"
    }, {
        name: "Total Product price",
        value: itemObj.total_products_price.toLocaleString() + " Rwf"
    }, {name: "Payment Method ", value: itemObj.payment_method}, {
        name: "Total Amount Paid",
        value: `${itemObj.amountToPay} Rwf`
    }]
    // const shipmentFields = [{name:"Country",value:itemObj.delivery_zone.region.country.country},{name:"Region",value:itemObj.delivery_zone.region.region},{name:"Zone",value:itemObj.delivery_zone.zone}]
    return (

        <div className="container">
            <div className="row">
                <div className="col-sm-6 col-12">
                    <SingleOrderList title={"Purchase and Payment Info"} fields={orderFields}/>
                </div>

                <div className="col-sm-5 mt-md-0 mt-5 col-12">
                    {/* <UserContainer userTitle={"Customer Information"} UserObj={itemObj.customer.user}/> */}
                    <div>
                        <h5 className={styles.generalColor + " font-weight-bold " + styles.userTitle}>{"Customer Information"}</h5>
                        <div className="mt-3">
                            <hr/>
                        </div>
                        <h5 className={styles.userName + " font-weight-bold"}>{`Names : ${itemObj.customer_names}`}</h5>
                        <h5 className={styles.userName + " font-weight-bold"}>{`Phone : ${itemObj?.customer_phone}`}</h5>
                    </div>

                    <div className={"mt-5"}>
                        <UserContainer userTitle={"Seller Information"} UserObj={itemObj.created_by.user}
                                       status={"EMPLOYEE"}/>
                    </div>
                </div>
            </div>
        </div>

    )
}


const SingleOrderList = ({title, fields}) => {
    return (
        <div>
            <div>
                <h5 className={styles.generalColor + " font-weight-bold " + styles.userTitle}>{title}</h5>
            </div>
            <div className="mt-3">
                <hr/>
            </div>
            <div>

                {fields.map((field, index) => {
                    return (
                        <div className="col-8 pt-2" key={index}>
                            <span className={"font-weight-bold " + styles.fieldName}>{field.name}: </span><span
                            className={"font-weight-light " + styles.fieldName}>{field.value}</span>
                        </div>)
                })
                }
            </div>
        </div>
    )
}

const ModalContainer = ({title, date, status, itemObj, data}) => {
    useEffect(() => {
        return () => {
            $(function () {
                $('#supplyOrderModalDialog').modal('hide');
                $(".modal-backdrop").remove();
            })
            location.reload();
        }
    }, [])
    let currency = useSelector((state) => state.appCurrency);
    const user = useSelector(state => state.authUser);

    return (
        <div className="modal fade" id="supplyOrderModalDialog" tabIndex="-1" role="dialog"
             aria-labelledby="exampleModalLabe" aria-hidden="false">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div className="modal-content">
                    <div className={"row justify-content-end"}>
                        <div className={"col-3 pr-5 pt-2"}>
                            <button type="button" className={"close "} data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true" style={{fontSize: "1.4em"}}>&times;</span>
                            </button>
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="row mt-0">
                            <div className="col-12">
                                <div className="d-flex justify-content-start">
                                    <span className={"font-weight-bold  " + styles.modalTitle}>{title}</span>
                                </div>
                                <div className="d-flex justify-content-end">
                <span
                    className={"font-weight-bold " + styles.dateText}>{status === "supply" ? "Supply made On " : status === "direct_purchase" ? "Purchase made On " : "Order made On "}</span>
                                    <span className={"font-weight-light ml-2 " + styles.dateText}>{date}</span>
                                </div>
                                <hr className={"mt-1 " + styles.titleLine}/>

                            </div>
                        </div>

                        <div className="row mt-5 mb-5">
                            {
                                status === "supply" ? <SupplyInfo itemObj={itemObj}/> : status === "direct_purchase" ?
                                    <DirectPurchaseInfo itemObj={itemObj}/> : <OrderInfo itemObj={itemObj}/>
                            }
                        </div>


                        <div className="row justify-content-center">
                            <div className={"col-6"}>
                                <p className="justify-content-center font-weight-bold">{status === "supply" ? "SUPPLIED PARTS" : "ORDERED PARTS"}</p>
                            </div>
                        </div>
                        <div className="row">


                            <div className="col-12 pb-4 table-responsive">
                                {data && data.length > 0 ?
                                    <TableContainer
                                        user={user}
                                        currency={currency}
                                        data={data ? status === "supply" || status === "direct_purchase" ? data : data[0].products : []}
                                        status={status} itemObj={itemObj}/> : <></>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ModalContainer;
