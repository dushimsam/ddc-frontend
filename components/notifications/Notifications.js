import React from "react";
import Notification from "./Notification";
import styles from "../../styles/components/Notifications.module.css"
import {handleGoTo} from "../../utils/notification-redirects";

export default function Notifications({notifications, triggerLoadMore, isLoading, isDone}) {
    return (
        <div className="mt-4 card px-5 py-4">
            <h3 className="font-weight-bold d-flex align-items-center">
                <div className="pr-3">Recent Notifications</div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="none" d="M0 0h24v24H0z"/>
                        <path
                            d="M22 20H2v-2h1v-6.969C3 6.043 7.03 2 12 2s9 4.043 9 9.031V18h1v2zM5 18h14v-6.969C19 7.148 15.866 4 12 4s-7 3.148-7 7.031V18zm4.5 3h5a2.5 2.5 0 1 1-5 0z"/>
                    </svg>
                </div>
            </h3>
            <div className={styles.line}/>
            <div className="my-3">
                {
                    notifications.map((notification, i) => (
                        <Notification notification={notification} key={i} handleGoTo={handleGoTo}/>
                    ))
                }
                <div className="mt-4 text-center">
                    {
                        isDone ? (
                            <div>No More Notifications ...</div>
                        ) : !isLoading ? (
                            <a href="#" onClick={(e) => {
                                e.preventDefault();
                                triggerLoadMore();
                            }}>Load More</a>
                        ) : (
                            <span>Loading ....</span>
                        )
                    }
                </div>
            </div>
        </div>
    )
}