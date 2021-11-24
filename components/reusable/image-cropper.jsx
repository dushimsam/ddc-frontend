import React, {useCallback, useEffect, useRef, useState} from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import styles from "../../styles/components/image-cropper.module.css"
import {base64StringtoFile, extractImageFileExtensionFromBase64} from "../../utils/image-utils";
import {hide_modal} from "../../utils/modal-funs";
import {alertFailer} from "../../utils/alerts";
import Alert from "../alert";

function generateDownload(canvas, crop) {
    if (!crop || !canvas) {
        return;
    }

    canvas.toBlob(
        (blob) => {
            const previewUrl = window.URL.createObjectURL(blob);

            const anchor = document.createElement('a');
            anchor.download = 'cropPreview.png';
            anchor.href = URL.createObjectURL(blob);
            anchor.click();

            window.URL.revokeObjectURL(previewUrl);
        },
        'image/png',
        1
    );
}

const ImageCropper = ({uploadedFile, setImage, aspect, modalSize}) => {
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [crop, setCrop] = useState({unit: '%', width: 100, aspect: aspect ? aspect : 230 / 70});
    const [completedCrop, setCompletedCrop] = useState(null);
    const [upImg, setUpImg] = useState("");
    const [imgExt, setImgExt] = useState(null)
    const [alert, setAlert] = useState({message: "", class: "", status: "", show: false})

    useEffect(() => {
        if (uploadedFile) {
            let reader = new FileReader();
            reader.onload = function (evt) {
                setUpImg(evt.target.result)
                setImgExt(extractImageFileExtensionFromBase64(evt.target.result))
            }
            reader.onerror = function (evt) {
                console.log(evt)
            }
            reader.readAsDataURL(uploadedFile)
        }
    }, [uploadedFile])

    const onLoad = useCallback((img) => {
        imgRef.current = img;
    }, []);

    useEffect(() => {
        if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
            return;
        }

        const image = imgRef.current;
        const canvas = previewCanvasRef.current;
        const crop = completedCrop;

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext('2d');
        const pixelRatio = window.devicePixelRatio;

        canvas.width = crop.width * pixelRatio;
        canvas.height = crop.height * pixelRatio;

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );
    }, [completedCrop]);


    const handleOnCropComplete = (crop, pixelCrop) => {
        setAlert({message: "", class: "", status: "", show: false})
        setCompletedCrop(crop);
    }

    const handleUpload = () => {
        if (upImg) {
            try {
                const canvasRef = previewCanvasRef.current
                const imageData64 = canvasRef.toDataURL('image/' + imgExt)
                const myFilename = "previewFile." + imgExt
                const myNewCroppedFile = base64StringtoFile(imageData64, myFilename)
                setImage(myNewCroppedFile)
                handleCloseModal();
            } catch (e) {
                alertFailer(setAlert, "You haven't cropped the image")
            }
        }
    }


    const handleClearToDefault = () => {
        // if (event) event.preventDefault()
        const canvas = previewCanvasRef.current
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        setImgExt(null)
        setUpImg(null)
    }

    const handleCloseModal = () => {
        handleClearToDefault()
        hide_modal("#imageCropper")
    }

    return (

        <div id="imageCropper" className="modal fade bs-example-modal-new" tabindex="-1" role="dialog"
             aria-labelledby="myLargeModalLabel" aria-hidden="true">

            <div className={"modal-dialog modal-dialog-centered" + (modalSize ? modalSize : "modal-lg")}>

                <div className="modal-content">

                    <div className="modal-header">
                        <h4 className={"modal-title " + styles.model_title} id="gridSystemModalLabel">Adjust The
                            Picture</h4>
                        <button type="button" className="close" onClick={() => {
                            handleCloseModal();
                        }}><span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div className="modal-body">

                        <ReactCrop
                            src={upImg}
                            onImageLoaded={onLoad}
                            crop={crop}
                            onChange={(c) => setCrop(c)}
                            onComplete={handleOnCropComplete}
                        />
                        <div className={"mt-4"}>
                            <h6 className={"mb-2"}>Preview the Output</h6>
                            {alert.show ? (
                                <Alert
                                    className={"my-3 alert-" + alert.class}
                                    message={alert.message}
                                    setAlert={setAlert}
                                />
                            ) : null}
                            <div className={"img img-thumbnail border-dark border"}>
                                <canvas
                                    ref={previewCanvasRef}
                                    // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
                                    style={{
                                        width: Math.round(completedCrop?.width ?? 0),
                                        height: Math.round(completedCrop?.height ?? 0)
                                    }}
                                />
                            </div>
                        </div>
                    </div>


                    <div className="modal-footer">
                        {/*<button type="button" className={"btn btn-default " + styles.btn} data-dismiss="modal">Close*/}
                        {/*</button>*/}
                        <button type="button" id="save_crop"
                                className={"btn btn-dark text-white font-weight-bold " + styles.btn}
                                onClick={() => {
                                    handleUpload()
                                }

                                }>Crop & Save
                        </button>
                    </div>

                </div>

            </div>

        </div>


    )
}


export default ImageCropper;