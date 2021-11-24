import Header from "../../components/dashboardsV2/Header";
import Navbar from "../../components/dashboardsV2/Navbar";
import { shipperLinks } from "../../utils/sidebar-links";
import RouteProtector from "../../middlewares/RouteProtector";
import {system_users} from "../../utils/constants";
import Footer from "../../components/Footer";

export default function ShippersDashboard({children}) {
    return (
      <RouteProtector only={[system_users.SHIPPER]}>
        <div className="page min-vh-100 d-flex flex-column justify-content-between">
          <div>
            <Header />
            <Navbar navList={shipperLinks} />
            <div className="main mt-4 container">{children}</div>
          </div>
           <Footer />
        </div>
      </RouteProtector>
    );
}