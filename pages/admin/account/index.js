import AccountDetails from "../../../components/account";
import AdminDashboard from "../../../layouts/dashboardsV2/AdminDashboard";

export default function AdminAccountDetails () {
    return (
        <AdminDashboard>
            <AccountDetails link={"/admin/account/settings"}/>
        </AdminDashboard>
    )
}