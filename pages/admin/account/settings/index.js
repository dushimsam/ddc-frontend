import ProfileSettings from "../../../../components/account/settings";
import AdminDashboard from "../../../../layouts/dashboardsV2/AdminDashboard";

export default function AccoutnSettings(){
    return (
        <AdminDashboard>
           <div className="px-3">
               <ProfileSettings />
           </div>
        </AdminDashboard>
    )
}