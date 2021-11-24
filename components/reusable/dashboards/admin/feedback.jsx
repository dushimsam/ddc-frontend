import React, {useEffect, useState} from "react";
import CustomerReviewsService from "../../../../services/feedbacks/CustomerReviewsService";
import globalStyles from "../../../../styles/global-colors.module.css";
import {FeedBackContent} from "../../../FeedBackContent";

const FeedbackList = () => {
    const initialItemsLen = 1;
    const [data, setData] = useState({
        items: [],
        showItems: initialItemsLen
    })

    function handleShowMore() {
        setData({...data, showItems: data.showItems >= data.items.length ? initialItemsLen : data.showItems + 2})
    }


    useEffect(() => {
        CustomerReviewsService.get_all_paginated(1)
            .then((res) => {
                setData({...data, items: res.data.docs})
            })
            .catch((e) => console.log(e));
    }, []);
    return (
        <div className={"table-responsive col-12"}>
            <table className="table rounded">
                <tbody>
                {data.items.slice(0, data.showItems)?.map((item, index) => {
                    return (
                        <tr className="cursor-pointer" key={index}>
                            <td style={{border: "none"}}>
                                <img
                                    id={"imageContainer"}
                                    src={item.customer.user.imageUrl}
                                    className="rounded-circle shadow-sm" width="50"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src =
                                            "https://ui-avatars.com/api/?name=" +
                                            item.customer.user.username;
                                    }}
                                    alt={item.customer.user.username}
                                    title={item.customer.user.username}
                                />
                            </td>
                            <td style={styles.td}>
                                <FeedBackContent item={item}
                                />
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
            <div className="row justify-content-center">
                <div className="col-8 col-sm-6 col-md-4 col-lg-3">
                    {
                        data.items.length > initialItemsLen ? <button type="button" style={styles.button}
                                                                      className={"btn btn-outline-danger d-flex justify-content-center text-white " + globalStyles.globalBackColor}
                                                                      onClick={() => handleShowMore()}>{data.showItems >= data.items.length ? "Show Less" : "Show More"}</button> : ""
                    }
                </div>
            </div>
        </div>
    );
};

const Container = () => {
    return (
        <div
            className="container border rounded p-3 bg-white"
            style={{fontSize: "0.8em"}}
        >
            <div className="row">
                <div className="col-5">
                    <p className="h5" style={styles.title}>
                        Customer Reviews
                    </p>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-12">
                    <FeedbackList/>
                </div>
            </div>
        </div>
    );
};

const styles = {
    title: {
        color: "#727E8C",
        fontSize: "1.3em",
    },
    mess: {
        color: "#727E8C",
        width: "25em",
    },
    date: {
        fontSize: "0.95em",
        color: "#727E8C",
    },
    td: {
        borderTop: "none",
        borderBottom: "1px solid #727E8C",
    },
    image: {
        width: "50px",
        height: "50px",
    },
};
export default Container;
