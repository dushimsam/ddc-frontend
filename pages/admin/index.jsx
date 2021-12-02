import AdminDashboard from "../../layouts/dashboardsV2/AdminDashboard";
import Card from "../../components/dashboardsV2/Card";
import React, {useEffect, useState} from "react";
import statisticsService from "../../services/statistics/statistics.service"
import LinearChart from "../../components/dashboardsV2/LinearChart";
import RingChart from "../../components/dashboardsV2/RingChart";
import FeedbackContainer from "../../components/reusable/dashboards/admin/feedback"
import Title from "../../components/dashboardsV2/Title"
import IncomeStatisticsService from "../../services/reporting/income.service"
import ReportSupplies from "../../components/reusable/dashboards/admin/report-supplies";
import ReportOrders from "../../components/reusable/dashboards/admin/report-orders";
import {defaultCurrencyMapping} from "../../utils/currency-converter";
// import {ProductAvailability} from "../../components/modals/part-availability.";

const UsersCard = ({linearGradient, label, value}) => {
    return (
        <div className="col mb-4 mb-lg-0">
            <div className="card card-body py-3 border-0 text-light" style={{background: linearGradient}}>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="font-weight-bold">{label}</div>
                    <div>{value}</div>
                </div>
            </div>
        </div>
    )
}

const LoadingComponent = () => {
    let empty = [1, 2, 3];
    return (
        <div className={"container mt-2"}>
            {empty.map((item) => (
                <div className="row">
                    <div
                        key={item}
                        className="col-12"
                    >
                        <p className="h-10 loading col-12"/>
                    </div>
                </div>
            ))}
        </div>
    )
}


// const VanishingItem = ({item, setSelectedItem, index}) => {
//     return (
//         <div className="row justify-content-between mt-4">
//             <div className={"col-2"}>
//                 {index + 1}
//             </div>
//             <div className={"col-4"} style={{minWidth: "5em"}}>
//                 {item.part_in_stock.spare_part.name + " ( " + item.part_in_stock.spare_part.part_number + " )"}
//             </div>
//             <div className={"col-2"}>{item.quantity}</div>
//             <div className={"col-3"}>
//                 {item.availability.exists ? dateFormat(item.availability.object.deadline).onlyDate() : "------"}
//             </div>
//             <div className={"col-1"}>
//                 <button className={"btn"} onClick={() => {
//                     setSelectedItem(item);
//                     show_modal("#setPartAvailabilityModal");
//                 }}><EditIcon/></button>
//             </div>
//         </div>
//     )
// }

// const VanishingItems = () => {
//
//     const [vanishingItems, setVanishingItems] = useState([])
//     const [newItems, setNewItems] = useState([])
//     const scrollDiv = useRef();
//     const [isLoading, setIsLoading] = useState(false);
//     const [paginator, setPaginator] = useState({currPage: 1, itemsPerPage: 5, total: 0, totalPages: 0})
//     const [reached, setReached] = useState(false)
//
//     useEffect(() => {
//         if (newItems.length > 1 && paginator.totalPages > 0) {
//             if (paginator.totalPages !== vanishingItems.length)
//                 setVanishingItems(old => [...old, ...newItems]);
//         }
//     }, [newItems, paginator])
//
//     const getVanishingItems = async (page) => {
//         setIsLoading(true)
//         let {data} = await PartsOnMarkertService.getVanishingItems(page, paginator.itemsPerPage)
//         setNewItems(data.docs);
//         setPaginator({itemsPerPage: 5, total: data.totalDocs, currPage: data.page, totalPages: data.totalPages})
//         setIsLoading(false)
//     }
//
//     useEffect(() => {
//         var sd = scrollDiv.current;
//
//         sd.addEventListener("scroll", (e) => {
//
//             console.log("scrolling height ", sd.scrollHeight - sd.offsetHeight)
//             console.log("scrolloing top ", sd.scrollTop)
//
//             if (sd.scrollHeight - sd.offsetHeight <= Math.ceil(sd.scrollTop) + 41) {
//                 setTimeout(() => {
//                     getVanishingItems(paginator.currPage + 1)
//                 }, [1000])
//             } else {
//                 console.log("Not in condition")
//             }
//         })
//     }, [])
//
//     useEffect(() => {
//         getVanishingItems(paginator.currPage)
//     }, [])
//
//     const [selectedItem, setSelectedItem] = useState(null);
//
//     return (
//         <div className={"container "}>
//             <div className={"row"}>
//                 <div className={"col-5"}>
//                     {paginator.total} ITEMS
//                 </div>
//             </div>
//             <div className={"row font-weight-bold text-white py-2"}>
//                 <div className={"col-4"}>
//                     ITEM
//                 </div>
//                 <div className={"col-3"}>
//                     QUANTITY
//                 </div>
//                 <div className={"col-3"}>
//                     DATE
//                 </div>
//                 <div className={"col-2"}>
//                     EDIT
//                 </div>
//             </div>
//             <div className={"row"}>
//                 <div className={"col-12"}>
//                     <div className={"container " + VanishingItemsStyles.scroll} ref={scrollDiv}>
//                         {vanishingItems.map((item, index) => (
//                             <VanishingItem item={item} setSelectedItem={setSelectedItem} key={index} index={index}/>
//                         ))}
//                         {isLoading ? <LoadingComponent/> : <></>}
//                     </div>
//                 </div>
//             </div>
//             {selectedItem && <ProductAvailability item={selectedItem} getAllItems={getVanishingItems}/>}
//         </div>
//     )
// }

export default function AdminDashboardPage() {

    const [statistics, setStatistics] = useState(null)
    const [incomeStatistics, setIncomeStatistics] = useState(null)
    const [showWhat, setShowWhat] = useState("for-month")
    const [showIncomeOf, setShowIncomeOf] = useState("month")
    const [showTrafficOf, setShowTrafficOf] = useState("month")


    useEffect(() => {
        (async function getData() {
            try {
                // get all statistics
                let {data} = await statisticsService.getAdminStatistics();
                setStatistics(data)

                let {data: incomes} = await IncomeStatisticsService.report()
                setIncomeStatistics(incomes)

            } catch (e) {
                console.log("Internal server error")
            }
        })()
    }, [])

    const calcPercentage = (web = 0, direct = 0) => {
        return Math.round((web / (web + direct)) * 100);
    }

    const data = {
        myData: [
            {type: "Web orders", percent: statistics?.paymentPerChannel?.webOrders},
            {type: "Direct purchases", percent: statistics?.orders?.general?.successfull},
        ],
        myContent: {
            percent: calcPercentage(statistics?.paymentPerChannel?.webOrders, statistics?.orders?.general?.successfull).toString(),
        }
    }

    const getStatistics = () => {
        switch (showWhat) {
            case "for-month":
                return {
                    newCustomers: statistics?.customers?.currentMonth?.total,
                    totalProfit: incomeStatistics?.currentMonth?.total?.income,
                    totalOrders: statistics?.orders?.currentMonth?.successfull,
                    suppliedValue: statistics?.supplies?.amounts?.currentMonth?.total,
                }
            case "for-year":
                return {
                    newCustomers: statistics?.customers?.currentYear?.total,
                    totalProfit: incomeStatistics?.currentYear?.total?.income,
                    totalOrders: statistics?.orders?.currentYear?.successfull,
                    suppliedValue: statistics?.supplies?.amounts?.currentYear?.total,
                }
            case "for-general":
                return {
                    newCustomers: statistics?.customers?.general?.total,
                    totalProfit: incomeStatistics?.general,
                    totalOrders: statistics?.orders?.general?.successfull,
                    suppliedValue: statistics?.supplies?.amounts?.general?.total,
                }
        }
    }


    const handleChangeWhatToShow = (event) => {
        setShowWhat(event.target.value)
    }

    const getStatisticsToShow = () => {
        if (incomeStatistics) {
            if (showIncomeOf === "month") {
                return incomeStatistics?.currentMonth?.perMonthDay
            } else if (showIncomeOf === "year") {
                return incomeStatistics?.currentYear?.perMonth
            }
        } else return []
    }

    const getTrafficToShow = () => {
        if (statistics) {
            if (showTrafficOf === "month") {
                return statistics?.siteVisitors?.currentMonth?.perMonthDay
            } else if (showTrafficOf === "year") {
                return statistics?.siteVisitors?.currentYear?.perMonth
            }
        } else return []
    }

    const handleTrackIncome = async () => {
        await IncomeStatisticsService.runIncome();
        location.reload();
    }

    return (
        <AdminDashboard>
            <div className="container-fluid">
                <div className="px-md-3 d-flex justify-content-between align-items-center mb-3">
                    <h5 className="font-weight-bold text-secondary">Statistics</h5>
                    <div>
                        <select
                            name=""
                            id=""
                            className="bg-transparent border-0 text-primary"
                            value={showWhat}
                            onChange={handleChangeWhatToShow}
                        >
                            <option value="for-month">For this Month</option>
                            <option value="for-year">For this Year</option>
                            <option value="for-general">All the time</option>
                        </select>
                    </div>
                </div>
                <div className="cards row row-cols-12 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 mx-0">
                    <div className="col mb-4 mb-lg-0">
                        <Card
                            label="New Customers"
                            value={getStatistics().newCustomers}
                            icon={
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                >
                                    <path fill="none" d="M0 0h24v24H0z"/>
                                    <path
                                        d="M12 11a5 5 0 0 1 5 5v6h-2v-6a3 3 0 0 0-2.824-2.995L12 13a3 3 0 0 0-2.995 2.824L9 16v6H7v-6a5 5 0 0 1 5-5zm-6.5 3c.279 0 .55.033.81.094a5.947 5.947 0 0 0-.301 1.575L6 16v.086a1.492 1.492 0 0 0-.356-.08L5.5 16a1.5 1.5 0 0 0-1.493 1.356L4 17.5V22H2v-4.5A3.5 3.5 0 0 1 5.5 14zm13 0a3.5 3.5 0 0 1 3.5 3.5V22h-2v-4.5a1.5 1.5 0 0 0-1.356-1.493L18.5 16c-.175 0-.343.03-.5.085V16c0-.666-.108-1.306-.309-1.904.259-.063.53-.096.809-.096zm-13-6a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zm13 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zm-13 2a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1zm13 0a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1zM12 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                                </svg>
                            }
                            color="danger"
                        />
                    </div>
                    <div className="col mb-4 mb-lg-0">
                        <Card
                            label="Total Profit"
                            value={getStatistics().totalProfit}
                            icon={
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                >
                                    <path fill="none" d="M0 0h24v24H0z"/>
                                    <path
                                        d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-3.5-6H14a.5.5 0 1 0 0-1h-4a2.5 2.5 0 1 1 0-5h1V6h2v2h2.5v2H10a.5.5 0 1 0 0 1h4a2.5 2.5 0 1 1 0 5h-1v2h-2v-2H8.5v-2z"/>
                                </svg>
                            }
                            color="success"
                        />
                    </div>
                    <div className="col mb-4 mb-lg-0">
                        <Card
                            label="Successfull orders"
                            value={getStatistics().totalOrders}
                            icon={
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                >
                                    <path fill="none" d="M0 0H24V24H0z"/>
                                    <path
                                        d="M5.5 20c.828 0 1.5.672 1.5 1.5S6.328 23 5.5 23 4 22.328 4 21.5 4.672 20 5.5 20zm13 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zM2.172 1.757l3.827 3.828V17L20 17v2H5c-.552 0-1-.448-1-1V6.413L.756 3.172l1.415-1.415zM16 3c.552 0 1 .448 1 1v2h2.993C20.55 6 21 6.456 21 6.995v8.01c0 .55-.45.995-1.007.995H8.007C7.45 16 7 15.544 7 15.005v-8.01C7 6.445 7.45 6 8.007 6h2.992L11 4c0-.552.448-1 1-1h4zm-5 5h-1v6h1V8zm7 0h-1v6h1V8zm-3-3h-2v1h2V5z"/>
                                </svg>
                            }
                            color="info"
                        />
                    </div>
                    <div className="col mb-4 mb-lg-0">
                        <Card
                            label="Supplied value"
                            value={getStatistics().suppliedValue}
                            icon={
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                >
                                    <path fill="none" d="M0 0h24v24H0z"/>
                                    <path
                                        d="M8.965 18a3.5 3.5 0 0 1-6.93 0H1V6a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2h3l3 4.056V18h-2.035a3.5 3.5 0 0 1-6.93 0h-5.07zM15 7H3v8.05a3.5 3.5 0 0 1 5.663.95h5.674c.168-.353.393-.674.663-.95V7zm2 6h4v-.285L18.992 10H17v3zm.5 6a1.5 1.5 0 1 0 0-3.001 1.5 1.5 0 0 0 0 3.001zM7 17.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z"/>
                                </svg>
                            }
                            color="warning"
                        />
                    </div>
                </div>
                <div className="row mx-0 mt-5">
                    <div className="col-12 col-lg-8">

                        <div className="card shadow-sm" style={{height: 450}}>
                            <div className="card-body">
                                {/*<div className="card border-0 py-4 mb-3 px-4 __shadow rounded-sm">*/}
                                {/*</div>*/}
                                <div className="d-flex justify-content-between">
                                    <h5 className="mb-5">Business Income</h5>
                                    <div>
                                        <div>
                                            <button
                                                className={"btn btn-outline-danger text-white btn-dark font-weight-bolder"}
                                                onClick={() => handleTrackIncome()}> TRACK
                                                MY INCOME
                                            </button>
                                        </div>
                                        <div className={"mt-2 d-inline-flex"}>
                                            <button
                                                onClick={() => setShowIncomeOf("month")}
                                                className={
                                                    "btn btn-sm mr-3 px-3 " +
                                                    (showIncomeOf === "month"
                                                        ? "btn-danger shadow"
                                                        : "btn-light border text-danger")
                                                }
                                            >
                                                Month
                                            </button>
                                            <button
                                                onClick={() => setShowIncomeOf("year")}
                                                className={
                                                    "btn btn-sm mr-3 px-3 " +
                                                    (showIncomeOf === "year"
                                                        ? "btn-danger shadow"
                                                        : "btn-light border text-danger")
                                                }
                                            >
                                                Year
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <LinearChart
                                    data={getStatisticsToShow()}
                                    position={"day*income"}
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <h5 className="font-weight-bold text-secondary">All users</h5>
                            <div className="row row-cols-12 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
                                <UsersCard
                                    label="Customers"
                                    value={statistics?.users?.customers}
                                    linearGradient="linear-gradient(284deg, #961276 0%, #F36265 100%)"
                                />
                                {/*<UsersCard*/}
                                {/*    label="Suppliers"*/}
                                {/*    value={statistics?.users.suppliers}*/}
                                {/*    linearGradient="linear-gradient(104deg, #FAD961 0%, #F76B1C 100%)"*/}
                                {/*/>*/}
                                {/*<UsersCard*/}
                                {/*    label="Employees"*/}
                                {/*    value={statistics?.users.employees}*/}
                                {/*    linearGradient="linear-gradient(105deg, #184E68 0%, #57CA85 100%)"*/}
                                {/*/>*/}
                            </div>
                        </div>

                        <div className="card shadow-sm mt-4" style={{height: 390}}>
                            <div className="card-body">
                                <div className="d-flex justify-content-between">
                                    <h5 className="mb-5">Site traffic</h5>
                                    <div>
                                        <button
                                            onClick={() => setShowTrafficOf("month")}
                                            className={
                                                "btn btn-sm mr-3 px-3 " +
                                                (showTrafficOf === "month"
                                                    ? "btn-danger shadow"
                                                    : "btn-light border text-danger")
                                            }
                                        >
                                            Month
                                        </button>
                                        <button
                                            onClick={() => setShowTrafficOf("year")}
                                            className={
                                                "btn btn-sm mr-3 px-3 " +
                                                (showTrafficOf === "year"
                                                    ? "btn-danger shadow"
                                                    : "btn-light border text-danger")
                                            }
                                        >
                                            Year
                                        </button>
                                    </div>
                                </div>
                                <LinearChart
                                    data={getTrafficToShow()}
                                    position="day*visits"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4">

                        <div className="card border-0 py-4 px-4 __shadow rounded-sm">
                            <div className="d-flex justify-content-between px-2">
                                <div>
                                    <h5 className="font-weight-bold text-danger">
                                        Part in stock
                                    </h5>
                                    <h1>{statistics?.products?.partsOnMarket.toLocaleString()}</h1>
                                </div>
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="45"
                                        height="35.998"
                                        viewBox="0 0 45 35.998"
                                    >
                                        <path
                                            id="Icon_awesome-warehouse"
                                            data-name="Icon awesome-warehouse"
                                            d="M35.438,24.75H9.591a.564.564,0,0,0-.562.563l-.007,3.375a.564.564,0,0,0,.563.563H35.438A.564.564,0,0,0,36,28.688V25.313A.564.564,0,0,0,35.438,24.75Zm0,6.75H9.57a.564.564,0,0,0-.562.563L9,35.438A.564.564,0,0,0,9.563,36H35.438A.564.564,0,0,0,36,35.438V32.063A.564.564,0,0,0,35.438,31.5Zm0-13.5H9.6a.564.564,0,0,0-.562.563l-.007,3.375A.564.564,0,0,0,9.6,22.5h25.84A.564.564,0,0,0,36,21.938V18.563A.564.564,0,0,0,35.438,18Zm7.488-9.773L23.794.26A3.386,3.386,0,0,0,21.2.26L2.074,8.227A3.383,3.383,0,0,0,0,11.341v24.1A.564.564,0,0,0,.563,36H6.188a.564.564,0,0,0,.563-.562V18a2.275,2.275,0,0,1,2.292-2.25H35.958A2.275,2.275,0,0,1,38.25,18V35.438a.564.564,0,0,0,.563.563h5.625A.564.564,0,0,0,45,35.438v-24.1A3.383,3.383,0,0,0,42.926,8.227Z"
                                            transform="translate(0 -0.002)"
                                            fill="#707070"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="card mb-5 __shadow text-center px-4 py-4 mt-4">
                            <h4 className="font-weight-bolder pt-2">Sales payments per chanel</h4>
                            <p className="text-secondary px-5">
                                Your customers who bought on site Versus who bought directly
                            </p>
                            <div className="chart py-3">
                                <RingChart data={data}/>
                            </div>
                            <div className="d-flex justify-content-between px-5 pt-4 pb-3">
                                <div className="d-flex align-items-center">
                                    <div
                                        className="shadow-sm"
                                        style={{
                                            width: 20,
                                            height: 20,
                                            backgroundColor: "rgba(236, 102, 102, 1)",
                                        }}
                                    />
                                    <span className="pl-2">Orders</span>
                                </div>
                                <div className="d-flex align-items-center">
                                    <div
                                        className="shadow-sm"
                                        style={{
                                            width: 20,
                                            height: 20,
                                            backgroundColor: "rgba(225, 229, 235, 1)",
                                        }}
                                    />
                                    <span className="pl-2">Direct</span>
                                </div>
                            </div>
                        </div>
                        <div className="card __shadow my-5 pb-1">
                            <div className="card-header px-4">
                                <h5 className="font-weight-bold text-secondary my-0">
                                    So far with the system
                                </h5>
                            </div>
                            <div className="card-body py-4">
                                <div className="d-flex justify-content-between">
                                    <div>Total shipping</div>

                                </div>
                                <div className="d-flex justify-content-between mt-2">
                                    <div>Total Sale</div>
                                    <div>
                                        {defaultCurrencyMapping(statistics?.payments?.amounts?.general?.total)}
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between mt-2">
                                    <div>Total Sales (web + order)</div>
                                    <div>
                                        {(statistics?.paymentPerChannel?.webOrders + statistics?.orders?.general?.successfull).toLocaleString()} Sales
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between mt-2">
                                    <div>Total Supply</div>
                                    <div>{defaultCurrencyMapping(statistics?.supplies?.amounts?.general.total)}</div>
                                </div>
                                <div className="d-flex justify-content-between mt-2">
                                    <div>Business Income</div>
                                    <div>
                                        {defaultCurrencyMapping(statistics?.payments?.amounts?.general?.total - statistics?.supplies?.amounts.general.total)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mx-0 mt-5">
                    <div className="col-12 col-lg-7">
                        <div
                            className="card __shadow card-body border-0 text-white"
                            style={{
                                background:
                                    "linear-gradient(139deg, rgba(234, 90, 103, 1) 0%, rgba(161, 5, 29, 1) 100%, rgba(245, 81, 95, 1) 100%)",
                            }}
                        >
                            <h5 className="font-weight-bold">
                                items to vanish in the store
                            </h5>
                            <div className="line"/>
                            {/*<VanishingItems/>*/}
                        </div>
                    </div>
                    <div className="col-12 col-lg-5 mt-md-5 mt-5 mt-lg-0 mt-xl-0">
                        <FeedbackContainer/>
                    </div>
                </div>

                <div className="my-5">
                    <Title>Weekly Received Orders Report</Title>
                    <div className="card card-body px-0">
                        <ReportOrders/>
                    </div>
                </div>
                <div className="my-5">
                    <Title>Weekly Supplies Report</Title>
                    <div className="card card-body px-0">
                        <ReportSupplies/>
                    </div>
                </div>


            </div>
        </AdminDashboard>
    );
}