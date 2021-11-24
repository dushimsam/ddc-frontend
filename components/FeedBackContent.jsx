import DOMPurify from "dompurify";
import {dateFormat} from "../utils/functions";
import React from "react";

export const FeedBackContent = ({item, isHomePage}) => {
    const createMarkup = (html) => {
        return {
            __html: DOMPurify.sanitize(html)
        }
    }

    const stars = [1, 2, 3, 4, 5];

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="row justify-content-center">
                        <div className="col-12">
                            <p className="font-weight-bold">{item.customer.user.firstName + " " + item.customer.user.lastName}</p>
                        </div>
                        <div className="col-12">
                            <div className="preview" dangerouslySetInnerHTML={createMarkup(item.review_paragraph)}/>
                        </div>
                        <div className="col-md-5 col-10" style={{fontSize: '1.5em', color: "#f39c12"}}>

                            {stars?.map(star => {
                                return (
                                    <span
                                        style={{cursor: 'pointer'}}
                                    >
                                        {
                                            star <= item.rating ? "★" : "☆"
                                        }
                                                         </span>
                                );
                            })}
                        </div>
                    </div>
                </div>
                {!isHomePage ?
                    <div className="col-3">
                        <span style={styles.date}>{dateFormat(item.createdAt).fromNow()}</span>
                    </div>
                    : <></>
                }
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