import styles from "../styles/components/sidebar.module.css";
import React, {useState} from "react";
import {useSelector} from "react-redux";
import {domain} from "../services/http-common";
import AuthService from "../services/auth/auth.service"
const logOut = () => {
    AuthService.logout();
}

export default function DashboardLayout ({ children, sidebar }) {
    const authUser = useSelector(state => state.authUser)
    console.log("user", authUser);
    const [showSidebar, setShowSidebar] = useState(false)

    return (
        <div className={"container-fluid " + styles.root}>
            <div className="row">
                <div className={styles.menuIcon+" d-md-none pt-2 rounded-circle shadow-sm cursor-pointer text-center"} onClick={() => {setShowSidebar(state => !state)}}>
                    {
                        !showSidebar ? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M16 18v2H5v-2h11zm5-7v2H3v-2h18zm-2-7v2H8V4h11z"/></svg>
                        ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"/></svg>
                        )
                    }
                </div>
                <div className={(!showSidebar && "col-0 d-none") +" d-md-block col-md-3 col-lg-2 p-0 " + styles.sideDiv}>
                    <div id="sidebar-content">
                        {sidebar}
                    </div>
                </div>
                <div
                    className={"col-lg-10 col-12 "+styles.content}>
                    <div className="d-flex  pb-3 justify-content-end mr-5">
                        <div className="dropdown cursor-pointer">
                            <img className="rounded-circle" id="dropdownMenuButton" data-toggle="dropdown" src={domain + '/' + authUser.profile} onError={(e) => { e.target.onerror = null; e.target.src = "https://ui-avatars.com/api/?name=" + authUser.username }}
                                        alt={authUser.username}  width={35} height={35} />
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a className="dropdown-item" href="#">Account settings</a>
                                <div className="dropdown-divider"/>
                                <a className="dropdown-item" href="#" onClick={()=>logOut()}>Log out</a>
                            </div>
                        </div>
                    </div>
                    <div className={" main-content " + styles.mainContent} >{children}</div>
                </div>
            </div>
        </div>
    )
}