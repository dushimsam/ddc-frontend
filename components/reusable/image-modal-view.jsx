import React, {useEffect, useState} from "react";
import styles from "../../styles/components/image-view-modal.module.css"
import {hide_modal} from "../../utils/modal-funs";

const ImageModalView = ({imgUrl = [], alt = "An Image"}) => {
    const [currentImage, setCurrentImage] = useState(0)
    const [currentPosition, setCurrentPosition] = useState(0);
    console.log(imgUrl)
    useEffect(() => {
        setCurrentImage(0)
    }, [imgUrl])

    const handleModalOnClose = () => {
        hide_modal('#imagePopModal')
    }

    return (
        <React.Fragment>

            <div className="modal fade" id="imagePopModal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div
                    className={"modal-dialog modal-dialog-centered modal-dialog-scrollable p-3 w-md-100 w-100 " + styles.modalDialog}
                    role="document">
                    <div className={"modal-content rounded"}>

                        <div className="card rounded">
                            <div
                                className={" modal-body py-3 px-2 text-center d-flex align-items-center justify-content-between  " + styles.modalBody}>

                                {/*<button type="button" className={"close " + styles.close} onClick={()=>handleModalOnClose()}>*/}
                                {/*    <span aria-hidden="true">&times;</span>*/}
                                {/*</button>*/}
                                <div className="mr-1">
                                    {
                                        imgUrl.length > 1 && currentImage > 0 && (
                                            <div
                                                className={"prev shadow rounded-pill " + styles.arrow + " " + styles.prev}
                                                onClick={() => setCurrentImage(currentImage - 1)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24"
                                                     height="24">
                                                    <path fill="none" d="M0 0h24v24H0z"/>
                                                    <path fill="white"
                                                          d="M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z"/>
                                                </svg>
                                            </div>
                                        )
                                    }
                                </div>
                                <div>
                                    <img src={imgUrl[currentImage]} id="image"
                                         className={"img-fluid rounded " + styles.image + " " + styles.prev}
                                         alt={alt}/>
                                </div>
                                <div className="ml-1">
                                    {
                                        imgUrl.length > 1 && currentImage < imgUrl.length - 1 && (
                                            <div className={"next shadow rounded-pill " + styles.arrow}
                                                 onClick={() => setCurrentImage(currentImage + 1)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24"
                                                     height="24">
                                                    <path fill="none" d="M0 0h24v24H0z"/>
                                                    <path fill="white"
                                                          d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z"/>
                                                </svg>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ImageModalView;