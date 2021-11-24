import React, {useEffect, useState} from "react";
import styles from "../styles/components/sidebar.module.css";
import Link from "next/link"
import Router, {useRouter} from "next/router"
import {useSelector} from "react-redux";
import {app_config} from "../utils/constants";


export default function zSidebarComponent({list}) {
    return <Sidebar lists={list}/>
}

const SingleList = ({list}) => {
    const [clickedState, setClickedState] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (router.pathname.includes(list.href)) {
            setClickedState(true);
        }
    }, []);


    return (
        <div style={{fontFamily: 'sans-serif !important'}}>
            <Link href={list.href} passHref style={{textDecoration: 'none', color: 'white'}}>
                <div
                    className={"list-group-item list-group-item-action container p-10  border-0 " + (clickedState ? styles.active : null)}
                    style={list.key == "SETTINGS" ? {marginTop: "2em", cursor: "pointer"} : {cursor: "pointer"}}
                >
                    <div className="row">
                        <div className="col-3">
                            {(!clickedState) ? list.icon : list.whiteIcon}
                        </div>
                        {" "}
                        <div className="col-9">
                            <a
                                className={styles.common + " " + styles.linkA}
                                style={{textDecoration: "none", fontSize: '1rem'}}

                            >
                                {list.name}
                            </a>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

const Sidebar = ({lists}) => {
    const [clickedState, setClickedState] = useState(false);
    const authUser = useSelector(state => state.authUser)

    const router = useRouter();

    useEffect(() => {
        if (router.pathname === getUserHref()) {
            setClickedState(true);
        }
    }, [])

    const getUserHref = () => {
        if (authUser.category) {
            switch (authUser.category.name) {
                case "CUSTOMER":
                    return "/customer/dashboard";
                case "SYSTEM_ADMIN":
                    return "/admin";
                case "SHIPPER":
                    return "/shipper/dashboard";
                default:
                    return "/sales-manager/dashboard";
            }
        }
        return "/404";
    };

    return (
      <div className={"container-fluid "}>
        <div className={"row justify-content-center " + styles.divRow}>
          <div className={"col-11 mt-3 col-12"}>
            <h5 className="font-weight-bold">
              <img
                src="/favicon_io/android-chrome-192x192.png"
                alt="KAR Logo"
                width={30}
                height={30}
              />
              <Link href={"/"}>
                <span
                  style={{
                    fontSize: "15px",
                    marginLeft: "6px",
                    letterSpacing: "1px",
                    color: "#707070",
                    cursor: "pointer",
                  }}
                >
                 {app_config.APP_NAME}
                </span>
              </Link>
            </h5>
          </div>
          <div className={"col-12 mb-3 " + styles.col1}>
            <hr className={"mt-0"} />
          </div>

          <div className={"col-12 " + styles.col2}>
            <div className="list-group list-group-flush">
              <div
                className={
                  clickedState
                    ? styles.mainIconsDashDivActive
                    : styles.mainIconsDashDiv
                }
              >
                <div className="container-fluid">
                  <Link href={getUserHref()}>
                    <div className={"row "}>
                      <div className="col-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="18"
                          height="18"
                        >
                          <path fill="none" d="M0 0h24v24H0z" />
                          <path
                            d="M13 21V11h8v10h-8zM3 13V3h8v10H3zm6-2V5H5v6h4zM3 21v-6h8v6H3zm2-2h4v-2H5v2zm10 0h4v-6h-4v6zM13 3h8v6h-8V3zm2 2v2h4V5h-4z"
                            fill={
                              clickedState
                                ? "rgba(255, 255, 255, 1)"
                                : "rgba(112,112,122,1)"
                            }
                          />
                        </svg>
                      </div>
                      <div className="col-9">
                        <a
                          href="#"
                          className={
                            "text-white text-decoration-none " + styles.common
                          }
                        >
                          Dashboard
                        </a>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
              <div style={{ paddingTop: "1.5em" }}>
                {lists.map((list) => (
                  <SingleList key={list.key} list={list} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

const Sell = () => {
    return (
        <button className={"btn " + styles.sellDiv}>
      <span>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="18"
            height="18"
        >
          <path fill="none" d="M0 0h24v24H0z"/>
          <path
              d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"
              fill="rgba(203,46,37,1)"
          />
        </svg>
          {" "}
      </span>
            <span className={styles.sellText + " " + styles.common}> Sell Here</span>
        </button>
    );
};