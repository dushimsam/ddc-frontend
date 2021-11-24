import {useEffect, useState} from "react"
import styles from "../../styles/components/profile-details.module.css"
import {processDetailedDate} from "../../utils/process-date"
import UserService from "../../services/users/user.service"
import {notifyError, notifySuccess} from "../../utils/alerts"
import $ from "jquery"
import AuthService from "../../services/auth/auth.service"
import jwt from "jwt-decode";
import {system_users} from "../../utils/constants";
import LoginToConfirmComponent from "./login-to-confim";


const MainContainer = ({item, UserObj, category, getInitialData, loading, setLoading, showConfirmModal}) => {
    return (
        <div className={"container"}>
            <div className="mb-3 row mx-0 px-5 py-md-5 py-2">
                <div className={"col-md-4 col-12 " + styles.cardBody}>
                    <div className="d-flex flex-column">
                        <img
                            id={"imageContainer"}
                            src={UserObj?.imageUrl}
                            className="rounded-circle shadow-sm" width="100"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                    "https://ui-avatars.com/api/?name=" +
                                    UserObj.username;
                            }}
                            alt={UserObj.username}
                            title={UserObj.username}
                        />

                        <div className="mt-3">
                            <h4>{`${UserObj.firstName} ${UserObj.lastName}`}</h4>
                            <p className="text-secondary mb-1">{category}</p>
                            <p className="text-muted font-size-sm">{processDetailedDate(UserObj.createdAt)}</p>
                            {/* <button className="btn btn-outline-primary">Message</button> */}
                            <button
                                className={"btn text-white " + (UserObj.status === "ACTIVE" ? "btn-danger" : "btn-success")}
                                onClick={() => {
                                    showConfirmModal()
                                }} data-toggle="modal" data-target="#userConfirmationModal"
                                disabled={jwt(AuthService.getDecToken()).category.name !== system_users.ADMIN}>

                                {loading ?
                                    (<img
                                            src={"/img/loader.gif"}
                                            alt={"Loading"}
                                            className={"loader"}
                                        />
                                    ) : (
                                        UserObj.status === "ACTIVE" ? "DEACTIVATE" : "ACTIVATE"
                                    )}</button>
                        </div>
                    </div>
                </div>

                <div className="col-md-8 col-12">
                    <div className="row justify-content-center">


                        <div className={"card mt-3 col-12 p-3"}>

                            <ul className="list-group list-group-flush">
                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    <h6 className="mb-0">Full Names</h6>
                                    <span
                                        className="text-secondary">{`${UserObj.firstName} ${UserObj.lastName}`}</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    <h6 className="mb-0">Username</h6>
                                    <span className="text-secondary">{`${UserObj.username}`}</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    <h6 className="mb-0">Email</h6>
                                    <span className="text-secondary">{`${UserObj.email}`}</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    <h6 className="mb-0">Telephone</h6>
                                    <span className="text-secondary">{`${UserObj.phone}`}</span>
                                </li>

                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    <h6 className="mb-0">Gender</h6>
                                    <span className="text-secondary">{`${UserObj.gender || `N/A`}`}</span>
                                </li>

                                {
                                    category === "SALES_MANAGER" ?
                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                            <h6 className="mb-0">National Id</h6>
                                            <span className="text-secondary">{`${item.nationalId}`}</span>
                                        </li> : null
                                }

                                <li className={"list-group-item d-flex justify-content-between align-items-center flex-wrap text-white"}>
                                    <h6 className="mb-0">STATUS</h6>
                                    <span className="text-white">{item.status}</span>
                                </li>

                            </ul>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}

export const AppUserProfile = ({UserObj, category, item, getInitialData}) => {
    const [loading, setLoading] = useState(false)
    console.log(item)
    const [isUser, setIsUser] = useState(false);

    const checkIsUser = (isUser) => {
        if (isUser)
            toggleUserStatus()
        else
            alert("NOT USER")
    }

    const showModal = () => {
        $(function () {
            $('#checkUserModal').modal('show');
        });
    }

    const toggleUserStatus = () => {
        const change = UserObj.status === "ACTIVE" ? "INACTIVE" : "ACTIVE"
        const subject = `${UserObj.firstName} ${UserObj.lastName}`
        UserService.changeStatus(change, UserObj._id)
            .then((res) => {
                notifySuccess(change === "INACTIVE" ? `${subject}'s account is deactivated successfully` : `${subject}'s account is activated successfully`)
                setLoading(false);
                getInitialData();
            })
            .catch((e) => {
                setLoading(false)
                notifyError(e.response ? e.response.data.message : e.message || "Error occurred. Try again latter.")
            }).finally(() => {
            $(function () {
                $('#checkUserModal').modal('hide');
            });
            $(function () {
                $('#profileModalDetails').modal('hide');
            });
        })
    }

    const [showConfirmAuthority, setShowConfirmAuthority] = useState(false);
    useEffect(() => {
        setShowConfirmAuthority(false)
    }, [item])
    const showConfirmModal = () => {
        setShowConfirmAuthority(!showConfirmAuthority)
    }


    return (
        <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className={"modal-content"}>
                <div className={"row justify-content-end"}>
                    <div className={"col-3 pr-5 pt-2"}>
                        <button type="button" className={"close "} data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" style={{fontSize: "1.4em"}}>&times;</span>
                        </button>
                    </div>

                </div>
                {
                    showConfirmAuthority ?
                        <div className={"row justify-content-center"}>
                       <div className={"col-sm-8 col-12"}> <LoginToConfirmComponent SYSTEM_USER={system_users.ADMIN} continueAction={toggleUserStatus}
                                                 MESSAGE={"LOGIN TO CONFIRM THE AUTHORITY OF THIS ACTION"}
                                                                          handleCancel={showConfirmModal}/></div></div>
                        :
                        <MainContainer UserObj={UserObj} category={category} item={item}
                                       getInitialData={getInitialData} showConfirmModal={showConfirmModal}
                                       loading={loading} setLoading={setLoading}/>
                }

            </div>
        </div>
    )
}


const ModalProfileDetails = ({item, category, getInitialData}) => {

    const [UserObj, setUserObj] = useState("")

    useEffect(() => {
        setUserObj(item.user)
    }, [item])

    useEffect(() => {
        return () => {
            $(function () {
                $('#profileModalDetails').modal('hide');
                $(".modal-backdrop").remove();
            })
            location.reload();
        }
    }, [])

    return (
        <div className="modal fade bd-example-modal-lg" id="profileModalDetails" tabIndex="-1" role="dialog"
             aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <AppUserProfile UserObj={UserObj} category={category} item={item} getInitialData={getInitialData}/>
        </div>

    )
}

export default ModalProfileDetails;