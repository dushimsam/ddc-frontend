import React, {useEffect} from "react";
import styles from "../../styles/components/image-view-modal.module.css";
import {hide_modal} from "../../utils/modal-funs";
import VideoStyles from "../../styles/components/video-player.module.css"

export const YoutubeVideoPlayerModal = ({embedId, handleStopVideo}) => {
    const handleModalOnClose = () => {
        handleStopVideo();
    }

    return (
        <React.Fragment>

            <div className="modal fade" id="videoPopModal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <button type="button" className={"close cursor-pointer " + styles.close}
                        onClick={() => handleModalOnClose()}>
                    <span aria-hidden="true">&times;</span>
                </button>
                <div
                    className={"modal-dialog modal-dialog-centered modal-dialog-scrollable  w-md-100 w-100 modal-xl " + styles.modalDialog}
                    role="document">

                    <div className={"modal-content rounded"}>

                        <div className="card rounded">
                            <div
                                className={" modal-body p-4  text-center  align-items-center " + styles.modalBody}>
                                <div className={"container"}>
                                    <div className={"row justify-content-center"}>
                                        <div className={"col-12"}>
                                            <div className={VideoStyles.videoResponsive}>
                                                <iframe
                                                    className={VideoStyles.iframe}
                                                    width="700"
                                                    height="300"
                                                    src={`https://www.youtube.com/embed/${embedId}`}
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                    title="Embedded youtube"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}