import React, {useEffect, useState} from 'react';
import {EditorState} from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import dynamic from 'next/dynamic';
import SingleSubModuleLayout from "../../../../layouts/admin-layouts/SingleSubModule";

import CustomerReviewsService from "../../../../services/feedbacks/CustomerReviewsService";
import ContactUsService from "../../../../services/feedbacks/ContactUsService";
import Router, {useRouter} from "next/router";
import {dateFormat, handleDoubleDecryptionPath} from "../../../../utils/functions";
import {alertSuccess, notifyError} from "../../../../utils/alerts";
import DOMPurify from "dompurify";
import DeleteConfirmation from "../../../../components/tables/delete-confirmation-modal";
import {show_modal} from "../../../../utils/modal-funs";


const Editor = dynamic(
    () => import('react-draft-wysiwyg').then(mod => mod.Editor),
    {ssr: false}
)

const MessageContainerHeader = ({message, PAGE_STATUS}) => {
    return (
        <div className="container">
            <div className="row justify-content-md-between justify-content-center">

                <div className="col-md-4 col-8">
                    <div className={"row justify-content-start"}>
                        {
                            PAGE_STATUS === "CUSTOMER_REVIEW" ?
                                <div className={"col-md-3 col-4"}>
                                    <img
                                        id={"imageContainer"}
                                        src={message.customer.user.imageUrl}
                                        className="rounded-circle shadow-sm" width="50"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src =
                                                "https://ui-avatars.com/api/?name=" +
                                                message.customer.user.username;
                                        }}
                                        alt={message.customer.user.username}
                                        title={message.customer.user.username}
                                    />
                                </div>
                                : <></>
                        }
                        <div className={"col-md-9 col-11"}>
                            {
                                PAGE_STATUS === "CONTACT_US" ?
                                    <>

                                        <h5>{message.names}</h5>
                                        <h6>{message.email}</h6>
                                    </> : <>

                                        <h5>{message.customer.user.firstName + " " + message.customer.user.lastName}</h5>
                                        <h6>{message.customer.user?.email}</h6>
                                    </>
                            }
                        </div>
                    </div>
                </div>
                <div className="col-md-4 col-6">
                    <p className={"font-italic"}>{dateFormat(message.createdAt).fromNow() + " " + dateFormat(message.createdAt).onlyDate()}</p>
                </div>
            </div>
        </div>
    )
}

const MessageBody = ({message, PAGE_STATUS}) => {

    const createMarkup = (html) => {
        return {
            __html: DOMPurify.sanitize(html)
        }
    }

    const [state, setState] = useState({
        stars: [1, 2, 3, 4, 5],
        rating: message.rating,
        selectedIcon: "★",
        deselectedIcon: "☆"
    })

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-10 overflow-auto">
                    {PAGE_STATUS === "CONTACT_US" ?
                        <p>
                            {message.message}
                        </p> :
                        <div className="preview" dangerouslySetInnerHTML={createMarkup(message.review_paragraph)}/>}
                </div>
                {PAGE_STATUS === "CUSTOMER_REVIEW" ?
                    <div className="col-md-4 col-8 overflow-auto">
                        <div className="rating h3" style={{color: "#f39c12"}}>
                            {state.stars?.map(star => {
                                return (
                                    <span
                                        style={{cursor: 'pointer'}}
                                    >
                                        {
                                            star <= state.rating ? state.selectedIcon : state.deselectedIcon
                                        }
                            </span>
                                );
                            })}

                        </div>

                    </div> : <></>}
            </div>
        </div>
    )
}

const MessageUtils = ({showReply, setShowReply, message, PAGE_STATUS}) => {

    const [alert, setAlert] = useState({message: "", class: "", show: false})
    const [loading, setLoading] = useState(false)

    const handleShowModal = () => {
        show_modal('#deleteConfirmationModal');
    }
    const handleDelete = (item) => {
        if (PAGE_STATUS === "CONTACT_US") {
            ContactUsService.delete(message._id)
                .then((res) => {
                    alertSuccess(setAlert, "Record is Deleted")
                    window.setTimeout(() => {
                        location.reload();
                    }, [1500])

                }).catch(e => notifyError(e)).finally(() => {
                setLoading(false)
            })
        } else {
            CustomerReviewsService.delete(message._id)
                .then((res) => {
                    alertSuccess(setAlert, "Record is Deleted")
                    window.setTimeout(() => {
                        location.reload()
                    }, [1000])
                }).catch(e => notifyError(e)).finally(() => {
                setLoading(false)
            })
        }

    }

    return (
        <div className="container mt-3">
            <div className="row justify-content-md-between justify-content-center">
                <div className="col-md-3 col-8">

                    <button className="btn btn-primary"
                            onClick={() => window.open('mailto:' + (PAGE_STATUS === "CONTACT_US" ? message.email : message.customer.user.email))}><span
                        className="mr-3"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18"
                                              height="18"><path fill="none" d="M0 0H24V24H0z"/><path
                        d="M11 20L1 12l10-8v5c5.523 0 10 4.477 10 10 0 .273-.01.543-.032.81-1.463-2.774-4.33-4.691-7.655-4.805L13 15h-2v5zm-2-7h4.034l.347.007c1.285.043 2.524.31 3.676.766C15.59 12.075 13.42 11 11 11H9V8.161L4.202 12 9 15.839V13z"
                        fill="rgba(255,255,255,1)"/></svg></span><span>Reply</span></button>
                </div>
                <div className="col-md-3 col-8 mt-3 mt-md-0">
                    <button className="btn btn-danger" onClick={() => {
                        handleShowModal();
                    }}><span className="mr-3"><svg xmlns="http://www.w3.org/2000/svg"
                                                   viewBox="0 0 24 24" width="18"
                                                   height="18"><path fill="none"
                                                                     d="M0 0h24v24H0z"/><path
                        d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z"
                        fill="rgba(255,255,255,1)"/></svg></span>
                        <span>Delete</span></button>
                </div>
            </div>
            <DeleteConfirmation text={message} item={message} deleteItem={handleDelete} alert={alert} loading={loading}
                                setLoading={setLoading} setAlert={setAlert}/>
        </div>
    )
}
const MessageContainer = ({showReply, setShowReply, message, PAGE_STATUS}) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <MessageContainerHeader message={message} PAGE_STATUS={PAGE_STATUS}/>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col">
                    <MessageBody message={message} PAGE_STATUS={PAGE_STATUS}/>
                </div>
            </div>
            <div className="row">
                {

                    <div className="col">
                        <MessageUtils message={message} showReply={showReply} setShowReply={setShowReply}
                                      PAGE_STATUS={PAGE_STATUS}/>
                    </div>

                }

            </div>
        </div>
    )
}

// const MessageReplyContainer = ({ editorState, onEditorStateChange }) => {
//
//     return (
//         <div className="container">
//             <div className="row justify-content-center">
//                 <div className="col-4">
//                     <h4> Write A reply</h4>
//                 </div>
//             </div>
//             <div className="row justify-content-center">
//                 <div className="col-10">
//                     {
//                         editorState ?
//                             <Editor
//                                 editorState={editorState}
//                                 onEditorStateChange={onEditorStateChange}
//                                 wrapperClassName={Styles.wrapperClass}
//                                 editorClassName={Styles.editorClass}
//                                 toolbarClassName={Styles.toolbarClass}
//                             /> : <></>
//                     }
//
//                 </div>
//             </div>
//             <div className="row justify-content-center">
//                 <div className="col-4 mt-3">
//                     <button type="button" className="btn" style={styles.saveBtn}>
//                         <span className={"mr-3"} style={styles.nextText}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path fill="none" d="M0 0h24v24H0z" /><path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" fill="rgba(255,255,255,1)" /></svg></span><span>SEND</span>
//                     </button>
//                 </div>
//             </div>
//
//         </div>
//     )
// }

const Page = () => {
    const [showReply, setShowReply] = useState(false);
    const [totals, setTotals] = useState({customerReviews: 0, contactUs: 0});
    const [message, setMessage] = useState({})
    const [PAGE_STATUS, setPageStatus] = useState(null);

    const getTotals = async () => {
        const totals = {customerReviews: 0, contactUs: 0};
        try {
            totals.customerReviews = (await CustomerReviewsService.get_all_paginated()).data.totalDocs;
            totals.contactUs = (await ContactUsService.get_all_paginated()).data.totalDocs;

            setTotals(totals);

        } catch (e) {
            console.log(e)
        }
    }
    const panes = [
        {name: 'Customer Reviews', count: totals.customerReviews, route: '/admin/feedbacks'},
        {name: 'Contact Messages', count: totals.contactUs, route: '/admin/feedbacks/messages'},
    ];

    useEffect(() => {
        getTotals().then();
    }, []);

    const router = useRouter();
    useEffect(() => {
        if (router.query.subject) {
            if (router.query.addition === "CONTACT_US") {
                ContactUsService.get_by_id(handleDoubleDecryptionPath(router.query.subject))
                    .then((res) => {
                        setMessage(res.data);
                        setPageStatus("CONTACT_US")

                    }).catch((e) => console.log(e))
            } else if (router.query.addition === "CUSTOMER_REVIEW") {
                CustomerReviewsService.get_by_id(handleDoubleDecryptionPath(router.query.subject))
                    .then((res) => {
                        setMessage(res.data);
                        setPageStatus("CUSTOMER_REVIEW")
                    }).catch(e => console.log(e))
            }

        }
    }, [router.query.subject])
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState)
    }

    return (
        <SingleSubModuleLayout
            Content={
                <div className="container mt-md-3 mb-5">
                    {PAGE_STATUS &&
                    <>
                        <div className="row">
                            <MessageContainer showReply={showReply} setShowReply={setShowReply} message={message}
                                              PAGE_STATUS={PAGE_STATUS}/>
                        </div>
                    </>}
                </div>}
            isArray={true}
            panes={panes}
            showFilter={false}
            name={PAGE_STATUS === "CONTACT_US" ? "Contact Messages" : "Customer Reviews"}
            hideSearch={true}
            status="new"
            route={"/admin/feedbacks/messages"}
            hideAction={true}
        />
    )
}


export default Page;

const styles = {
    nextBtn: {
        backgroundColor: "#1A4894",
        color: "white"
    },
    saveBtn: {
        backgroundColor: "#1A4894",
        color: "white",
        borderRadius: "0.5em",
        paddingLeft: "3em",
        paddingRight: "3em",
        width: "12em"
    },
    nextText: {
        fontWeight: "bold",
        fontSize: "1em"
    },
}
