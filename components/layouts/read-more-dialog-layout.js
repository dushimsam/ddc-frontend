import React, {useEffect, useState} from "react";
import Router from "next/router";
import {hide_modal} from "../../utils/modal-funs";
import styles from "../../styles/components/profile-details.module.css";
import {capitalize} from "../../utils/transformText";
import $ from "jquery";
import {gotoPath} from "../../utils/functions";


export const MapDetails = ({fields}) => {

    const handleVisitPage = (field) => {
        hide_modal('#itemReadMoreModalLayout')
        window.setTimeout(() => {
            if (field._id) {
                Router.push(gotoPath(field.href, field._id))
            } else {
                Router.push(field.href)
            }
        }, 1000)
    }
    return (
        <div className="row justify-content-center">
            <div className={"card mt-3 col-12 p-3"}>

                <ul className="list-group list-group-flush">
                    {
                        fields.map((field, index) => {
                            return (
                                <li key={index}
                                    className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    <h6 className="mb-0">{capitalize(field.name)}</h6>
                                    <span className={!field.href ? "text-secondary" : "text-primary cursor-pointer"}
                                          onClick={() => {
                                              field.href && handleVisitPage(field);
                                          }}>{field.value} </span>
                                </li>)
                        })
                    }
                < /ul>
            </div>
        </div>
    )
}


export const ListMapping = ({fields}) => {


    const handleVisitPage = (field) => {
        hide_modal('#itemReadMoreModalLayout')
        window.setTimeout(() => {
            Router.push(gotoPath(field.href, field._id))
        }, 1000)
    }


    return (
        <ul className="b">
            {
                fields.map((field, index) => {
                    return <li><span className={!field.href ? "text-secondary" : "text-primary cursor-pointer"}
                                     onClick={() => {
                                         field.href && handleVisitPage(field);
                                     }}>{field.value}</span></li>
                })
            }
        </ul>
    )
}


export const ImageContainer = ({imgs, multiple, mainTitle, moreDetail, itemName, largeProperty}) => {
    const [imageUrl, setImageUrl] = useState(null);
 console.log("images ",imgs)
    return (
        <div className={"col-4 mt-3 " + styles.cardBody}>
            <div className="d-flex flex-column">

                {
                    imgs?.map((image) => {
                        return (
                            <img

                                id={"imageContainer"}
                                src={image}
                                // onClick={()=>setImageUrl(image)}
                                // data-toggle="modal"
                                // data-target="#imagePopModal"
                                className="border border-secondary border-2 cursor-pointer rounded shadow-sm mt-2 "
                                width={largeProperty ? "200" : "140"}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src =
                                        "https://ui-avatars.com/api/?name=" +
                                        itemName;
                                }}
                                alt={itemName}
                                title={itemName}
                            />
                        )
                    })
                }


                <div className="mt-3">
                    <h4>{mainTitle}</h4>
                    <p className="text-secondary mb-1">{itemName}</p>
                    <p className="text-muted font-size-sm">{moreDetail}</p>
                    {/* <button className="btn btn-outline-primary">Message</button> */}
                </div>
            </div>
            {/*{imageUrl && <ImageModalView imgUrl={imageUrl}/>}*/}
        </div>
    )
}

export const ReadMoreLayout = ({
                                   ParentContent,
                                   ChildContent,
                                   parentContentTitle,
                                   childContentTitle,
                                   hasImage,
                                   ImageContent
                               }) => {
    useEffect(() => {
        return () => {
            $(function () {
                $('#itemReadMoreModalLayout').modal('hide');
                $(".modal-backdrop").remove();
            })
            location.reload();
        }
    }, [])

    return (
        <div className="modal fade bd-example-modal-lg" id="itemReadMoreModalLayout" tabIndex="-1" role="dialog"
             aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className={"modal-content"}>
                    <button type="button" className={"close " + styles.close} data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <div>
                        <div className="mb-3 row mx-0 px-md-5 py-5 justify-content-md-center">
                            {hasImage ? ImageContent : null}
                            <div className={"col-md-7 col-12"}>
                                <h5 className={"font-weight-bold"}>{parentContentTitle}</h5>
                                <div>
                                    {ParentContent}
                                </div>
                            </div>
                        </div>
                        {ChildContent ?
                            <div className="mb-3 row mx-0 px-md-5 py-1 justify-content-center">
                                <div className={"col-md-8 col-12"}>
                                    <h5>{childContentTitle}</h5>
                                </div>
                                <div className={"col-md-8 col-12"}>
                                    {ChildContent}
                                </div>
                            </div> : <></>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReadMoreLayout;