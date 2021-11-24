import React, {useEffect, useState} from "react";

import styles from "../../styles/search/results.module.css";
import Router, {useRouter} from "next/router";
import ProductModelsService from "../../services/product-models/product-models.service";
import Head from "next/head";
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer";
import {useDispatch, useSelector} from 'react-redux'
import {addItemToCart, increment} from '../../store/actions/cart-actions';
import {showAddToCartModal} from '../../store/actions/add-to-cart-modal-actions';
import SparePartService from "../../services/products/products.service"
import globalStyles from "../../styles/global-colors.module.css"
import {encryptTextSimple} from "../../utils/encryption-decryption";
import {app_config} from "../../utils/constants";
import ProductPreviewDetailed from "../../components/products/product-preview-detailed";
import {globalConverterMapping} from "../../utils/currency-converter";

const ToggleResult = ({setFilter, results, all_results}) => {


    function returnLowerValues(user_price) {
        return function (element) {
            return element.unit_price < user_price;
        }
    }

    function returnHigherValues(user_price) {
        return function (element) {
            return element.unit_price > user_price;
        }
    }

    function inBetweenValues(user_price1, user_price2) {
        return function (element) {
            return element.unit_price > user_price1 && element.unit_price < user_price2;
        }
    }

    function filterResults(amount, amount2, status, CHECK_VALUE) {
        const new_results = [...all_results];
        let new_values;

        if (CHECK_VALUE) {
            switch (status) {
                case "lower":
                    new_values = new_results.filter(returnLowerValues(amount));
                    break;
                case "between":
                    new_values = new_results.filter(inBetweenValues(amount, amount2))
                    break;
                case "higher":
                    new_values = new_results.filter(returnHigherValues(amount))
                    break;
                default:
                    console.log("INVALID CHOICE")
            }
            setFilter(new_values);
        } else {
            setFilter(all_results)
        }

    }


    const [checkboxControls, setCheckboxControl] = useState({
        CHECK_1: false,
        CHECK_2: false,
        CHECK_3: false,
        CHECK_4: true
    })

    const [CHECK, setCheck] = useState(null);

    // const setCheck=(prop,state)=>{
    // setCheckboxControl({CHECK_1:false,CHECK_2:false,CHECK_3:false,CHECK_4:false})
    // setCheckboxControl({...checkboxControls,[prop]:state})
    //     if(!state){
    //        setFilter(all_results)
    //     }
    //
    // }

    let currency = useSelector((state) => state.appCurrency);

    return (
        <div className="container-fluid" id="radiocb">
            <div className="row mb-2">
                <input
                    checked={CHECK === "CHECK_1"}
                    type="checkbox" id="cb1"
                    className="form-check-input"
                    onChange={() => {
                        setCheck(CHECK === "CHECK_1" ? null : "CHECK_1");
                        filterResults(100 * 1000, 100 * 1000, "lower", CHECK !== "CHECK_1");
                    }}
                />
                <span style={{fontSize: "0.8em"}}>Less than {globalConverterMapping(currency, 100 * 1000,"V2")} {currency}</span>
            </div>
            <div className="row mb-2">
                <input
                    checked={CHECK === "CHECK_2"}
                    type="checkbox" id="cb2"
                    className="form-check-input"
                    onChange={() => {
                        setCheck(CHECK === "CHECK_2" ? null : "CHECK_2");
                        filterResults(100 * 1000, 200 * 1000, "between", CHECK !== "CHECK_2")
                    }}
                />

                <span
                    style={{fontSize: "0.8em"}}>Between {globalConverterMapping(currency, 100 * 1000,"V2")} and {globalConverterMapping(currency, 200 * 1000,"V2")} {currency}</span>
            </div>
            <div className="row mb-2">
                <input
                    checked={CHECK === "CHECK_3"}
                    type="checkbox" id="cb3"
                    className="form-check-input"
                    onChange={() => {
                        setCheck(CHECK === "CHECK_3" ? null : "CHECK_3");
                        filterResults(200 * 1000, 300 * 1000, "between", CHECK !== "CHECK_3")
                    }}
                />
                <span
                    style={{fontSize: "0.8em"}}>Between {globalConverterMapping(currency, 200 * 1000,"V2")} and {globalConverterMapping(currency, 300 * 1000,"V2")} {currency}</span>
            </div>
            <div className="row mb-2">
                <input
                    checked={CHECK === "CHECK_4"}
                    type="checkbox" id="cb4"
                    className="form-check-input"
                    onChange={() => {
                        setCheck(CHECK === "CHECK_4" ? null : "CHECK_4");
                        filterResults(300 * 1000, 300 * 1000, "higher", CHECK !== "CHECK_4")
                    }}/>
                <span
                    style={{fontSize: "0.8em"}}
                >
          More than {globalConverterMapping(currency, 300 * 1000,"V2")} {currency}
        </span>
            </div>
        </div>
    );
};

const Categories = ({setFilter, results, all_results}) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <p
                        className="dropdown-toggle"
                        data-toggle="collapse"
                        href="#collapseListPrice"
                        role="button"
                        aria-expanded={true}
                        aria-controls="collapseListPrice"
                        style={{cursor: "pointer", fontSize: '14px', letterSpacing: '0.4px'}}
                    >
                        Price
                    </p>
                    <div className="collapse show pl-4" id="collapseListPrice">
                        <ToggleResult
                            setFilter={setFilter}
                            results={results}
                            all_results={all_results}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
const PRE_LOADER = () => {
    return (
        <div className='container mt-4'>
            <div className="row">
                <div className="col-12 mx-md-0 col-sm-12 col-md-4 col-lg-3 col-xl-3 mb-4 mr-5">
                    <div className="rounded p-0 bg-white p-relative rounded">
                        <div className={"loading my-2 rounded-top " + styles.myVehicleLoader}/>
                    </div>
                    <div className="rounded p-0 bg-white p-relative rounded mt-3">
                        <div className={"loading my-2 rounded-top " + styles.categoriesSideBarHeaderLoader}/>
                    </div>
                </div>
                <div className="col-12 mx-md-0 col-sm-12 col-md-8 col-lg-8  col-xl-8 mb-4">
                    <div className="rounded p-0 bg-white p-relative rounded">
                        <div className={"loading  my-2 rounded-top " + styles.productAreaLoader}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

const SideBar = ({setFilter, results, all_results}) => {
    return (
        <div className="card" style={{width: "17rem", color: '#707070'}}>
            <div className={"card-header " + styles.cardFilterHeader}>Filter</div>
            <div className="card-body container">
                <div className="row">
                    <div className="col-12">
                        <div>
                            <Categories
                                setFilter={setFilter}
                                results={results}
                                all_results={all_results}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Description = ({obj}) => {
    // const date = new Date(obj.part_in_stock.spare_part.production_date);

    return (
        <div className="container ">
            <div className="row justify-content-center">
                <div className="col-5">
                    {/*<h6 className="font-weight-bold text-dark">Other Details</h6>*/}
                </div>
            </div>
            <div className="row">
                  <span className={"" + styles.productAttribute}>
                      Part Number: {" "}
                  </span>
                <span className={" " + styles.productValue}> {` ${obj.part_in_stock.spare_part.part_number}`}</span>
            </div>
            <div className="row">
                   <span className={"" + styles.productAttribute}>
                      Part Code: {" "}
                  </span>
                <span className={" " + styles.productValue}> {` ${obj.part_in_stock.spare_part.part_code}`}</span>
            </div>
            <div className={'row'}>

                  <span className={"" + styles.productAttribute}>
                   <br/>
                  </span>
                <span
                    className={" " + styles.productValue}>{` ${obj.part_in_stock.spare_part.description?.fit_note}`}</span>

            </div>
            {/*<div className={'row'}>*/}
            {/*       <span className={"" + styles.productAttribute}>*/}
            {/*            Production Date: {" "}*/}
            {/*        </span>*/}
            {/*        <span className={" " + styles.productValue}> {` ${date.getFullYear()}/${date.getMonth()}/${date.getDay()}`}</span>*/}
            {/*</div>*/}

        </div>
    );
};

const Result = ({result}) => {
    return (
        <div className="container">
            <ProductPreviewDetailed product={result}/>
        </div>
    );
};

const ResultTitle = ({len, query_string}) => {
    return (
        <h3 className="h3 px-1" style={{color: "#707070"}}>
            {len > 1 ? (
                <span>
          {" "}
                    {`${len}`} results of &nbsp; {`"${query_string}"`}
        </span>
            ) : len == 1 ? (
                <span>
          {`${len}`} result of &nbsp; {`"${query_string}"`}
        </span>
            ) : (
                <div className={'mt-4'}>
                <span className="font-weight-bold h3 ml-5">
                  NO RESULTS FOUND{`" ${query_string} "`}
                </span>
                </div>
            )}
        </h3>
    );
};

const Results = ({results, all_results, query_string}) => {
    return (
        <div className="container-fluid">
            <div className="row d-block mb-3 mt-4">
                <ResultTitle len={results.length} query_string={query_string}/>
            </div>
            <div className="row mt-1 mt-lg-0">
                {results.map((result) => {
                    return (
                        <div className="col-12 bg-white pt-4 mb-1" key={result}>
                            <Result result={result}/>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const ResultsPage = () => {
    const [all_results, setResults] = useState(null);
    const [filtered_results, setFilteredResults] = useState([]);

    const router = useRouter();

    const {
        query: {text},
    } = router;

    const fetchData = () => {
        SparePartService.searchPart(text)
            .then((res) => {
                setResults(res.data);
                setFilteredResults(res.data);
            }).catch(e => console.log(e))
    };

    useEffect(() => {
        if (router.query.text) {
            fetchData();
        }
    }, [router.query.text]);

    const setFilter = (new_results) => {
        setFilteredResults(new_results);
    };


    const [modalState, setModalState] = useState(true);
    return (
        <React.Fragment>
            <Head>
                <title>Search Results | {app_config.APP_NAME}</title>
            </Head>
            <Navbar/>
            <div style={{background: "#FCFCFC"}}>
                {all_results != null ? (
                    all_results.length > 0 ? (
                        <div className="container-fluid pb-5">
                            <div className="row justify-content-lg-between justify-content-center">
                                <div className="col-12 col-lg-2  mt-5 col-10 ">
                                    <div className="p-0 px-sm-1 px-md-4 px-lg-2">
                                        {all_results && (
                                            <SideBar
                                                setFilter={setFilter}
                                                results={filtered_results}
                                                all_results={all_results}
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className="col-12 col-lg-9 mt-4">
                                    {filtered_results.length > 0 ? (
                                        <Results

                                            results={filtered_results} query_string={text}

                                        />
                                    ) : (
                                        <div className={styles.filterNotFound}>
                                                        <span className="font-weight-light h3 ml-lg-5">
                                                              No Product found 😞
                                                        </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div
                            className={styles.noResultsContainer}
                        >
                            <div>
                                <h2>
                                    Sorry no results found ! 😕
                                </h2>
                            </div>
                        </div>
                    )
                ) : (
                    <PRE_LOADER/>
                )}
            </div>
            <div>
                <Footer/>
            </div>
        </React.Fragment>
    );
};

export default ResultsPage;
