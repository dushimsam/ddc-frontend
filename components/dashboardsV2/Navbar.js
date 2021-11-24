import {useSelector} from "react-redux";
import Link from "next/link"
import {getDashboardLink} from "../../utils/sidebar-links";
import React from "react";
import Router from "next/router";
import {app_config} from "../../utils/constants";

export default function Navbar({navList}) {
    const authUser = useSelector(state => state.authUser)

    return (
        <div style={{minHeight: 50}} className="bg-white shadow-sm px-2 px-lg-5 d-md-flex align-items-center pb-1">
            <div className="image pr-4 my-2 my-md-0 cursor-pointer" onClick={() => Router.push("/")}>
                <img src={app_config.APP_LOGO} className="mr-2" width={25} alt=""/>
                Home
            </div>
            <Link href={getDashboardLink(authUser)} passHref>
                <div
                    className={!((Router.pathname === "/customer") || (Router.pathname === "/shipper")) ? "border border-secondary cursor-pointer px-3 py-1 my-2 my-md-0 rounded-sm mr-4 d-flex align-items-center __nav-link" : "btn btn-danger shadow px-3 py-1 my-2 my-md-0  mr-4 __active-nav-link"}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="none" d="M0 0h24v24H0z"/>
                        <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"
                              fill="rgba(52,72,94,1)"/>
                    </svg>
                    <span className="px-3">Dashboard</span>
                </div>
            </Link>
            {
                navList.map((list, i) => (
                    <Link href={list.href} passHref key={i}>
                        <div key={i}
                             className={!Router.pathname.includes(list.href, 0) ? "border border-secondary cursor-pointer px-3 py-1 my-2 my-md-0 rounded-sm mr-4 d-flex align-items-center __nav-link" : "btn btn-danger shadow px-3 py-1 my-2 my-md-0  mr-4 __active-nav-link"}>
                            {list.icon}
                            <span className="px-3">{list.name}</span>
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}