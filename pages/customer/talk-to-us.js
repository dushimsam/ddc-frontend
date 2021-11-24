import {EditorState} from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import dynamic from 'next/dynamic';
import React, {useEffect, useState} from "react";
import CustomerDashboard from "../../layouts/dashboardsV2/CustomerDashboard";
import Styles from "../../styles/components/editor.module.css"
import {convertToHTML} from 'draft-convert';
import StarRating from "../../components/StarRating";
import {notifyError, notifyInfo, notifySuccess} from "../../utils/alerts";
import CustomerReviewsService from "../../services/feedbacks/CustomerReviewsService"
import {useSelector} from "react-redux";
import CustomerService from "../../services/customers/customer.service";


const Editor = dynamic(
    () => import('react-draft-wysiwyg').then(mod => mod.Editor),
    {ssr: false}
)
const EditorContainer = ({editorState, onEditorStateChange}) => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-10 col-12">
                    {
                        editorState ?
                            <Editor
                                editorState={editorState}
                                onEditorStateChange={onEditorStateChange}
                                wrapperClassName={Styles.wrapperClass}
                                editorClassName={Styles.editorClass}
                                toolbarClassName={Styles.toolbarClass}
                            /> : <></>
                    }

                </div>
            </div>
        </div>
    )
}


const Container = () => {
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState)
    }
    const [rating, setRating] = useState(3)
    const [currUser, setCurrUser] = useState();
    const authUser = useSelector(state => state.authUser)

    const getCurrUser = async () => {
        try {
            let {data} = await CustomerService.getCustomer(authUser.id)
            setCurrUser(data);
        } catch (e) {
            console.log("error loading", e)
        }
    }

    useEffect(() => {

        CustomerService.getCustomer(authUser.id)
            .then((res) => {
                setCurrUser(res.data);
            }).catch(e => console.log(e))

    }, [authUser])

    const [loading, setLoading] = useState(false);

    const handleSend = () => {

        if (editorState.getCurrentContent().hasText()) {
            setLoading(true)
            CustomerReviewsService.create({
                customer: currUser._id,
                rating: rating,
                review_paragraph: convertToHTML(editorState.getCurrentContent())
            }).then((res) => {
                notifySuccess("THANKS FOR THE FEEDBACK")
                notifyInfo("Your review will make our service more better")
                console.log(res.data.status)
                setEditorState(EditorState.createEmpty())
            }).catch(e => console.log(e)).finally(() => {
                setLoading(false)
            })
        } else {
            notifyError("Please Add some Content")
        }
    }

    return (
        <div className={"container"}>
            <div className={"row justify-content-center"}>
                <div className={"col-md-4 col-12 ml-5"}>
                    <h4>RESPOND TO OUR SERVICE</h4>
                </div>
                <div className={"col-md-11 col-12 mt-3"}>
                    <EditorContainer editorState={editorState}
                                     onEditorStateChange={onEditorStateChange}/>
                </div>
            </div>
            <div className={"row justify-content-center"}>
                <div className={"col-md-3 col-10"}>
                    <StarRating rating={rating} setRating={setRating}/>
                </div>
            </div>
            <div className={"row justify-content-center"}>
                <div className={"col-md-3 col-10 mt-3"}>
                    <button type="button" className="btn" style={styles.saveBtn} onClick={() => handleSend()}>
                        {loading ? (
                                <img
                                    src={"/img/loader.gif"}
                                    alt={"Loading"}
                                    className={"loader"}
                                />
                            ) :
                            <><span className={"mr-3"} style={styles.nextText}><svg xmlns="http://www.w3.org/2000/svg"
                                                                                    viewBox="0 0 24 24" width="18"
                                                                                    height="18"><path fill="none"
                                                                                                      d="M0 0h24v24H0z"/><path
                                d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                                fill="rgba(255,255,255,1)"/></svg></span><span>SEND</span></>}
                    </button>
                </div>
            </div>
        </div>
    )
}
const Page = () => {
    return (
        <CustomerDashboard>
            <Container/>
        </CustomerDashboard>
    )
}

export default Page
const styles = {
    nextBtn: {
        backgroundColor: "#ff5555",
        color: "white"
    },
    saveBtn: {
        backgroundColor: "#62231d",
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
