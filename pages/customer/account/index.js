import AccountDetails from "../../../components/account";
import CustomerDashboard from "../../../layouts/dashboardsV2/CustomerDashboard";

export default function () {
    return (
        <CustomerDashboard>
            <AccountDetails link={"/customer/account/settings"}/>
        </CustomerDashboard>
    )
}