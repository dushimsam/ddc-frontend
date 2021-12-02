import Header from "../../components/dashboardsV2/Header";
import Navbar from "../../components/dashboardsV2/Navbar";
import {customerLinks} from "../../utils/sidebar-links";
import RouteProtector from "../../middlewares/RouteProtector";
import {system_users} from "../../utils/constants";
import Footer from "../../components/Footer";
import React from "react";
import ReachUsOnWhatsapp from "../../components/reusable/reach-us-on-whatsapp";

export default function CustomerDashboard({children}) {
    return (
        <RouteProtector only={[system_users.CUSTOMER]}>
            <div className="page min-vh-100 d-flex flex-column justify-content-between">
                <div className="mb-5">
                    <Header/>
                    <Navbar navList={customerLinks}/>
                    <div className="main container py-5">{children}</div>
                </div>
                {/*<ReachUsOnWhatsapp/>*/}
                <Footer/>
            </div>
        </RouteProtector>
    );
}