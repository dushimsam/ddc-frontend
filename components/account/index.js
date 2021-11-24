import { useRouter } from "next/router"
import { useState, useEffect } from "react";
import AuthService from "../../services/auth/auth.service";

import UserService from "../../services/users/user.service";

import jwt from 'jwt-decode';
import { processDetailedDate } from "../../utils/process-date"
import { processRdaMobile } from "../../utils/process-mobile-numbers"
import { useSelector } from "react-redux";
import globalStyles from "../../styles/global-colors.module.css"
import Notifications from "../notifications/Notifications";
import NotificationContext from "../Notification";

export default function AccountDetails({ link }) {
    const authUser = useSelector(state => state.authUser)
    const [ userDetails, setUserDetails ] = useState(authUser)
    
    useEffect(() => {
        let user = jwt(AuthService.getDecToken())

        UserService.get(user.id)
            .then((res) => {
                setUserDetails(res.data);
            }).catch(e => console.log(e))

    }, [])
    
    const router = useRouter();
    return (
        <div className="container-fluid">
            <div className="card py-4 pl-4 pr-5 shadow">
                <div className="row">
                    <div className="col-sm-6 text-left pb-3 pb-sm-0">
                        <div className="row">
                            <div className="col-4">
                                
                                <img
                                    id={"imageContainer"}
                                    className="nav-bar-avatar rounded-circle shadow"
                                    src={userDetails.imageUrl}
                                    height={150}
                                    width={150}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src =
                                            "https://ui-avatars.com/api/?name=" +
                                            userDetails.username;
                                    }}
                                    alt={userDetails.username}
                                    title={userDetails.username}
                                />
                            
                            </div>
                            <div className="col-12 col-md-8 text-left mt-4">
                                <h5 className="font-weight-bold text-secondary">{`${userDetails.firstName} ${userDetails.lastName}`}</h5>
                                <h6 className="text-secondary">{`${userDetails.username}`}</h6>
                                <h6>{userDetails.category?.name}</h6>
                                {/*<div className="change-profile mt-1">*/}
                                {/*    <button className={globalStyles.globalHoverBackColor+" btn px-4 py-1 btn-outline-danger btn-dark text-white "}*/}
                                {/*            onClick={() => router.push(link)}>Add New Admin*/}
                                {/*    </button>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 text-right pb-3 pb-sm-0">
                        <h6 className="text-secondary">{`${userDetails.email}`}</h6>
                        <h6 className="text-secondary"> {`${processRdaMobile(userDetails && userDetails.phone)}`}</h6>
                        <h6 className="text-secondary mt-4">Joined on {`${processDetailedDate(userDetails.createdAt)}`}</h6>
                        
                        <div className="change-profile mt-5">
                            <button className={globalStyles.globalHoverBackColor+" btn px-4 py-2 btn-outline-danger "+globalStyles.globalTextColor}
                                    onClick={() => router.push(link)}>Update profile
                            </button>
                        </div>

                    </div>
                </div>
            </div>
            <h6 className="text-secondary mt-4">Last updated your account {`${processDetailedDate(userDetails.updatedAt)}`}</h6>
            <NotificationContext user={authUser} />
        </div>
    )
}