import React from "react";
import { useState } from "react";
import styles from "../../styles/components/sidebar.module.css";
import Link from "next/link"
import RouteProtector from "../../middlewares/RouteProtector";
import {system_users} from "../../utils/constants";
import DashboardLayout from "../../layouts/DashboardLayout";
import Sidebar from "../Sidebar";


const defaultSvg = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="16"
        height="16"
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path
          d="M21 13v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-7H2v-2l1-5h18l1 5v2h-1zM5 13v6h14v-6H5zm1 1h8v3H6v-3zM3 3h18v2H3V3z"
          fill="rgba(112,112,112,1)"
      />
    </svg>
)




const lists = [
  {
    key: "PENDING-SHIPMENTS",
    name: "Pending Shipments",
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
    <path fill="none" d="M0 0h24v24H0z"/>
    <path
        d="M8.965 18a3.5 3.5 0 0 1-6.93 0H1V6a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2h3l3 4.056V18h-2.035a3.5 3.5 0 0 1-6.93 0h-5.07zM15 7H3v8.05a3.5 3.5 0 0 1 5.663.95h5.674c.168-.353.393-.674.663-.95V7zm2 6h4v-.285L18.992 10H17v3zm.5 6a1.5 1.5 0 1 0 0-3.001 1.5 1.5 0 0 0 0 3.001zM7 17.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z"
        fill="rgba(112,112,112,1)"/>
</svg>,
whiteIcon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
    <path fill="none" d="M0 0h24v24H0z"/>
    <path
        d="M8.965 18a3.5 3.5 0 0 1-6.93 0H1V6a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2h3l3 4.056V18h-2.035a3.5 3.5 0 0 1-6.93 0h-5.07zM15 7H3v8.05a3.5 3.5 0 0 1 5.663.95h5.674c.168-.353.393-.674.663-.95V7zm2 6h4v-.285L18.992 10H17v3zm.5 6a1.5 1.5 0 1 0 0-3.001 1.5 1.5 0 0 0 0 3.001zM7 17.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z"
         fill="rgba(255,255,255,1)"/>
</svg>,
    href: '/shipper/shipment/pending'
  },
  {
    key: "SHIPMENT-HISTORY",
    name: "Shipments History",
    icon: defaultSvg,
    href: '/shipper/shipment/history'
  },
  {
    key: "ACCOUNT",
    name: "Account",
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
        <path fill="none" d="M0 0h24v24H0z"/>
        <path
            d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-4.987-3.744A7.966 7.966 0 0 0 12 20c1.97 0 3.773-.712 5.167-1.892A6.979 6.979 0 0 0 12.16 16a6.981 6.981 0 0 0-5.147 2.256zM5.616 16.82A8.975 8.975 0 0 1 12.16 14a8.972 8.972 0 0 1 6.362 2.634 8 8 0 1 0-12.906.187zM12 13a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
            fill="rgba(112,112,112,1)"/>
    </svg>,
    href: '/shipper/account'
},
{
    key: "SETTINGS",
    name: "Settings",
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
        <path fill="none" d="M0 0h24v24H0z"/>
        <path
            d="M3.34 17a10.018 10.018 0 0 1-.978-2.326 3 3 0 0 0 .002-5.347A9.99 9.99 0 0 1 4.865 4.99a3 3 0 0 0 4.631-2.674 9.99 9.99 0 0 1 5.007.002 3 3 0 0 0 4.632 2.672c.579.59 1.093 1.261 1.525 2.01.433.749.757 1.53.978 2.326a3 3 0 0 0-.002 5.347 9.99 9.99 0 0 1-2.501 4.337 3 3 0 0 0-4.631 2.674 9.99 9.99 0 0 1-5.007-.002 3 3 0 0 0-4.632-2.672A10.018 10.018 0 0 1 3.34 17zm5.66.196a4.993 4.993 0 0 1 2.25 2.77c.499.047 1 .048 1.499.001A4.993 4.993 0 0 1 15 17.197a4.993 4.993 0 0 1 3.525-.565c.29-.408.54-.843.748-1.298A4.993 4.993 0 0 1 18 12c0-1.26.47-2.437 1.273-3.334a8.126 8.126 0 0 0-.75-1.298A4.993 4.993 0 0 1 15 6.804a4.993 4.993 0 0 1-2.25-2.77c-.499-.047-1-.048-1.499-.001A4.993 4.993 0 0 1 9 6.803a4.993 4.993 0 0 1-3.525.565 7.99 7.99 0 0 0-.748 1.298A4.993 4.993 0 0 1 6 12c0 1.26-.47 2.437-1.273 3.334a8.126 8.126 0 0 0 .75 1.298A4.993 4.993 0 0 1 9 17.196zM12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0-2a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
            fill="rgba(112,112,112,1)"/>
    </svg>,
    href: '/shipper/account/settings'
}
];



const Layout = (props) => {
  return (
      <RouteProtector only={[system_users.ADMIN,system_users.SHIPPER]}>
          <DashboardLayout sidebar={<Sidebar list={lists}/>}>
              {props.content}
          </DashboardLayout>
      </RouteProtector>
  );
};
export default Layout;