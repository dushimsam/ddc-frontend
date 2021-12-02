import Link from "next/link";
import React from 'react';
import globalStyles from "../../styles/global-colors.module.css"
import {global_color} from "../../utils/constants";

export default function AdminTableTitle({name, route, status, setFilter, isSalesManager}) {
    return (

        <div className="text-right">
            {

                status === "new" ?
                    (
                        <div className="ml-auto mr-0 text-right" style={{paddingRight: 0}}>
                            <Link href={`${route}/new`}>
                                <button style={styles.button}
                                        className={"btn shadow btn-sm px-3 " + globalStyles.globalBackColor}
                                >
                                    <svg style={styles.svgAdd} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                         width="20" height="20" fill={'white'}>
                                        <path fill="none" d="M0 0h24v24H0z"/>
                                        <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"/>
                                    </svg>
                                    New
                                </button>
                            </Link>
                        </div>
                    )
                    : (<div className="ml-auto" style={{paddingRight: 0}}>
                        <Link href={`${route}`}>
                            <button className={"btn shadow btn-sm px-3 text-white " + globalStyles.globalBackColor}
                                    style={styles.buttonShow}
                            >

                                <svg xmlns="http://www.w3.org/2000/svg" width="15"
                                     style={{marginRight: '0.4rem', marginTop: '-1px'}} height="15" viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                     stroke-linejoin="round" className="feather feather-book-open">
                                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                                </svg>
                                Display
                            </button>
                        </Link></div>)
            }

            {
                setFilter &&
                <div className="row justify-content-center">
                    <div className="col-7">
                        <span className="mr-1">Filter by: </span>
                        <button className="btn btn-primary text-white py-0  mr-3 rounded-full"
                                style={{fontSize: "0.5em"}} onClick={() => setFilter("ALL")}>ALL
                        </button>
                        <button className="btn btn-success rounded-full py-0 mr-3 " style={{fontSize: "0.5em"}}
                                onClick={() => setFilter("ACTIVE")}>ACkkkTIVE
                        </button>
                        <button className="btn btn-info rounded-full py-0 mr-3" style={{fontSize: "0.5em"}}
                                onClick={() => setFilter("INACTIVE")}>NOT ACTIVE
                        </button>
                    </div>
                </div>
            }

        </div>
    )
}

const styles = {
    button: {
        backgroundColor: global_color,
        border: 'none',
        fontSize: '14px',
        color: 'white',
        padding: '0.4rem 1rem'
    },
    buttonShow: {
        padding: '0.4rem 1rem',
        fontSize: '14px',
        border: 'none'

    },
    formControl: {
        fontSize: '12px',
        border: 'none',
        borderBottom: '1px solid #707070',
        height: 'auto',
        padding: '4px 2px'
    },
    svgAdd: {
        marginTop: '-4px',
        marginRight: '6px',
        height: '17px'
    }
}