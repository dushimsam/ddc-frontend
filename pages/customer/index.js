import CustomerDashboard from "../../layouts/dashboardsV2/CustomerDashboard";
import Title from "../../components/dashboardsV2/Title";
import Card from "../../components/dashboardsV2/Card";
import PromotionDeals from "../../components/homepage/promo-deals";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import statisticsService from "../../services/statistics/statistics.service";
import PendingOrdersTable from "../../components/reusable/dashboards/client/order-table"
import IncompleteOrders from "../../components/reusable/dashboards/customer/incomplete-orders"
import customerService from "../../services/customers/customer.service";
import OrderService from "../../services/orders/orders";
import {filterData} from "../../utils/functions";

export default function CustomerPage() {
    const cart = useSelector(state => state.cart)
    const [statistics, setStatistics] = useState(null)

    useEffect(() => {
        (async function getData() {
            try {
                let {data} = await statisticsService.getCustomerStatistics();
                setStatistics(data)
            } catch (e) {
                console.log(e)
            }
        })()
    }, [])
    const authUser = useSelector(state => state.authUser);

    const [pending, setPending] = useState(0)

    const getPending = async () => {
        try {
            const customer_res = await customerService.getCustomer(authUser.id);
            const orders_res = await OrderService.getOrderForACustomer(customer_res.data._id);
            setPending(filterData(orders_res.data, 'status', "SHIPPING").length);
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (authUser.id)
            getPending();
    }, [authUser])
    return (
        <CustomerDashboard>
            <div className="cards">
                <Title>Incomplete Orders</Title>
                <div className="row justify-content-center">
                    <IncompleteOrders/>
                </div>
            </div>

            <div className="cards">
                <Title>statistics</Title>
                <div className="row justify-content-center row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
                    <div className="col mb-3 mb-lg-0">
                        <Card
                            color="primary"
                            label="Total orders made"
                            value={statistics?.orders?.total}
                            icon={(
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                    <path fill="none" d="M0 0h24v24H0z"/>
                                    <path
                                        d="M4 16V4H2V2h3a1 1 0 0 1 1 1v12h12.438l2-8H8V5h13.72a1 1 0 0 1 .97 1.243l-2.5 10a1 1 0 0 1-.97.757H5a1 1 0 0 1-1-1zm2 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm12 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>
                                </svg>
                            )}
                        />
                    </div>
                    <div className="col mb-3 mb-lg-0">
                        <Card
                            color="danger"
                            label="Shipping Orders"
                            value={pending}
                            icon={(
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                    <path fill="none" d="M0 0h24v24H0z"/>
                                    <path
                                        d="M17 3h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4V1h2v2h6V1h2v2zM4 9v10h16V9H4zm2 2h2v2H6v-2zm0 4h2v2H6v-2zm4-4h8v2h-8v-2zm0 4h5v2h-5v-2z"/>
                                </svg>
                            )}
                        />
                    </div>
                    <div className="col mb-3 mb-lg-0">
                        <Card
                            color="info"
                            label="Items in the wishlist"
                            value={cart.length}
                            icon={(
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                    <path fill="none" d="M0 0H24V24H0z"/>
                                    <path
                                        d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2zm-3.566 15.604c.881-.556 1.676-1.109 2.42-1.701C18.335 14.533 20 11.943 20 9c0-2.36-1.537-4-3.5-4-1.076 0-2.24.57-3.086 1.414L12 7.828l-1.414-1.414C9.74 5.57 8.576 5 7.5 5 5.56 5 4 6.656 4 9c0 2.944 1.666 5.533 4.645 7.903.745.592 1.54 1.145 2.421 1.7.299.189.595.37.934.572.339-.202.635-.383.934-.571z"/>
                                </svg>
                            )}
                        />
                    </div>
                </div>
            </div>
            <div className="">
                <Title>Waited for Shipment</Title>
                <div className="bg-white">
                    <PendingOrdersTable/>
                </div>
            </div>
            <div>
                <Title>App updates</Title>
                <PromotionDeals/>
            </div>
        </CustomerDashboard>
    )
}