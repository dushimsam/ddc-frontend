import AdminTableTitle from "../../components/reusable/AdminTableTitle";
import Head from "next/head";
import Badge from "../../components/reusable/Badge";
import React, {useState} from "react";
import AdminDashboard from "../dashboardsV2/AdminDashboard";
import {app_config} from "../../utils/constants";

function TableLayout({
                         Page,
                         name,
                         showFilter,
                         hideSearch,
                         hideAction,
                         route,
                         count,
                         isArray,
                         setSearch,
                         setFilter,
                         filters,
                         status,
                         panes
                     }) {
    const handleSearch = () => {
        setSearch(searchText);
    };
    const [searchText, setSearchText] = useState('');

    const handleChange = (event) => {
        setSearchText(event.target.value);
    }
    const handleKeyDown = (event) => {
        console.log("ksd");
        if (event.key === "Enter") {
            event.preventDefault();
            handleSearch();
        }
    };

    return (
        <div className={"p-0 m-0 px-4"}>
            <Head>
                <title>{name} | {app_config.APP_NAME}</title>
            </Head>

            <div className={"row mb-5 justify-content-center justify-content-md-start"}>
                {!isArray ? (
                    <div className="col-10 col-md-3">
                        <Badge text={name} value={count} link={`${route}`} col1={"col-7"} col2={"col-5"}/>
                    </div>
                ) : (
                    <React.Fragment>
                        {panes.map((pane) => (
                            <div className={"col-10 col-md-3 mt-md-1 mt-2 "}>
                                <Badge text={pane.name} active={(pane.name === name)} small={true} value={pane.count}
                                       link={`${pane.route}`} col1={"col-7"} col2={"col-5"}/>
                            </div>
                        ))}
                    </React.Fragment>
                )}

            </div>

            <div className="my-3 card mx-0 px-md-5">
                <div className="col-12 pt-4 pb-0">
                    <div className={'row ' + (!showFilter ? 'justify-content-between' : '')}>
                        {showFilter ? (
                            <div className="col-5 px-3">
                                <div className={'mb-3'}>
                                    <span className="mr-4"
                                          style={{fontSize: '0.9em', color: '#707070', textDecoration: 'underline'}}>Filter by</span>
                                    {filters.map((filter) => (
                                        <FilterButton name={filter.name} val={filter.val}
                                                      vals={(filter.vals) ? filter.vals : null} setFilter={setFilter}/>
                                    ))}
                                </div>
                            </div>
                        ) : null}
                        <div className="col-md-4 col-12  px-3">
                            {(status === "new" && !hideSearch) ?
                                <React.Fragment>
                                    <input className={'form-control col-9'}
                                           value={searchText}
                                           onChange={handleChange}
                                           onKeyDown={handleKeyDown}
                                           style={styles.formControl}
                                           placeholder={'Search'}/>
                                    <svg xmlns="http://www.w3.org/2000/svg" onClick={handleSearch} viewBox="0 0 24 24"
                                         width="24" style={styles.searchIcon} height="24">
                                        <path fill="none" d="M0 0h24v24H0z"/>
                                        <path
                                            d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"/>
                                    </svg>

                                </React.Fragment> : ""
                            }
                        </div>
                        {!hideAction ? (
                                <div
                                    className={status === "new" ? "col-md-3  mt-md-0 mt-3 col-8 px-0" : "col-md-6 mt-3 col-8 px-0"}>
                                    <AdminTableTitle name={name} route={route} status={status}/>
                                </div>) :
                            null
                        }
                    </div>
                </div>
                <div className="mt-4">
                    {Page}
                </div>
            </div>
        </div>
    )
}

const FilterButton = ({name, val, vals, setFilter}) => {
    return (
        <React.Fragment>
            <button style={styles.button} onClick={() => {
                (vals) ? setFilter(vals) : setFilter(val)
            }}>
                {name}
            </button>
        </React.Fragment>
    )
}
export default function SingleSubModuleLayout({
                                                  Content,
                                                  name,
                                                  route,
                                                  count,
                                                  filters,
                                                  status,
                                                  setFilter,
                                                  setSearch,
                                                  showFilter,
                                                  hideAction,
                                                  hideSearch,
                                                  panes,
                                                  isArray,
                                                  isVerified

                                              }) {
    const DEFAULT_FILTERS = [
        {name: 'All', val: 'ALL'},
        {name: 'Active', val: 'ACTIVE'},
        {name: 'In active', val: 'INACTIVE'},
    ];

    if (isArray) {
        return (
            <AdminDashboard isVerified={isVerified}>
                <TableLayout Page={Content} filters={(filters) ? filters : DEFAULT_FILTERS} name={name}
                             hideAction={hideAction} isArray={true} hideSearch={hideSearch} panes={panes} route={route}
                             showFilter={showFilter} setSearch={setSearch} setFilter={setFilter} status={status}/>
            </AdminDashboard>
        )
    }
    return (
        <AdminDashboard  isVerified={isVerified}>
            <TableLayout Page={Content} name={name} filters={(filters) ? filters : DEFAULT_FILTERS}
                         showFilter={showFilter} hideAction={hideAction} hideSearch={hideSearch} route={route}
                         count={count} setSearch={setSearch} setFilter={setFilter} status={status}/>
        </AdminDashboard>
    )
}

const styles = {
    content: {
        minHeight: "70vh",
    },
    button: {
        marginRight: '10px',
        border: 'none',
        fontSize: '10px',
        color: '#535353c7',
        padding: '4px 10px',
        textTransform: 'uppercase',
    },
    formControl: {
        fontSize: '13px',
        border: 'none',
        borderBottom: '1px solid rgba(19, 19, 19, 0.21)',
        height: 'auto',
        padding: '4px 0px'
    },
    searchIcon: {
        position: 'absolute',
        right: '5.4rem',
        zIndex: 1,
        fill: '#707070',
        top: '5px',
        width: '15px',
        height: '15px',
        cursor: 'pointer'
    }

}