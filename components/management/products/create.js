import React, {useEffect, useState} from "react";
import filesService from "../../../services/files-service";
import {replaceCharacter} from "../../../utils/functions";
import {alertSuccess} from "../../../utils/alerts";
import {hide_modal_alert} from "../../../utils/modal-funs";
import Alert from "../../alert";

export const ImagesSuperContainer = ({
                                         imgFiles,
                                         status,
                                         defaultFiles,
                                         item,
                                         setDefaultFiles,
                                         setImgFiles,
                                         getInitialData,
                                         ITEM_CONTEXT
                                     }) => {
    // const [ deleteFiles, setDeleteFiles ] = useState([])
    return (
        <div>
            <div className="form-group">
                {imgFiles && (
                    <>
                        <CreateImagesContainer
                            setImgFiles={setImgFiles}
                            files={imgFiles}
                            status={"create"}
                        />
                    </>
                )}
            </div>
            {status === "update" && defaultFiles.length > 0 ? (
                <div className="form-group col-12 mt-3">
                    <h6 className={"font-weight-bold"}>Existing Images</h6>
                    <UpdateImageContainer
                        ITEM_CONTEXT={ITEM_CONTEXT}
                        defaultFiles={defaultFiles}
                        getInitialData={getInitialData}
                        item={item}
                        setDefaultFiles={setDefaultFiles}
                    />
                </div>
            ) : <></>}
        </div>
    )
}


const CreateImagesContainer = ({files, setImgFiles}) => {
    const [allFiles, setAllFiles] = useState(Array.from(files))

    useEffect(() => {
        setAllFiles(files)
    }, [files])
    const [deleteFiles, setDeleteFiles] = useState([]);

    const removeSelected = () => {
        deleteFiles.forEach((value, index) => {
            var array = [...files];
            array.splice(value, 1);
            setImgFiles(array)
        })
    }

    useEffect(() => {
        // console.log("HERE THE DELETE FILES ", deleteFiles)
    }, [deleteFiles])
    return (

        <div className={"card"}>
            <div className="card-header">
                <div className="d-flex justify-content-between">
                    <h6 className="font-weight-bold">{"Images you selected"}</h6>
                    <div>{deleteFiles.length > 0 && (
                        <a href="#" className="text-danger" onClick={() => removeSelected()}>Remove selected</a>)}</div>
                </div>
            </div>
            <div className="card-body">
                <div className="row">
                    {
                        Object.keys(allFiles).map(function (file, index) {
                            return (
                                <SingleSparePart
                                    key={file}
                                    files={files}
                                    status={"create"}
                                    setDeleteFiles={setDeleteFiles}
                                    deleteFiles={deleteFiles}
                                    fileIndex={index}/>
                            )
                        })
                    }
                </div>
            </div>
        </div>)
}

const UpdateImageContainer = ({defaultFiles, item, setDefaultFiles, getInitialData, ITEM_CONTEXT}) => {
    const [deleteFiles, setDeleteFiles] = useState([]);
    const [alert, setAlert] = useState({message: "", class: "", show: false})

    console.log("item here ",item)

    const removeSelected = () => {
        deleteFiles.forEach((value, index) => {

            if (!ITEM_CONTEXT) {
                filesService.delete(replaceCharacter(item.photos[value].path, '%2F', '/'), "SPARE_PART", item._id)
                    .then((res) => {
                        alertSuccess(setAlert, "File is Deleted");
                        var array = [...defaultFiles];
                        array.splice(value, 1);
                        setDefaultFiles(array);
                        hide_modal_alert(setAlert);
                        getInitialData();
                    }).catch(e => console.log(e))
            } else if (ITEM_CONTEXT === "SUPPLIED_CAR") {
                filesService.delete(replaceCharacter(item.part_photos[value], '%2F', '/'), "SUPPLIED_CAR_PARTS", item._id)
                    .then((res) => {
                        alertSuccess(setAlert, "File is Deleted");
                        var array = [...defaultFiles];
                        array.splice(value, 1);
                        setDefaultFiles(array);
                        hide_modal_alert(setAlert);
                        getInitialData();
                    }).catch(e => console.log(e))
            }
        })
    }


    return (
        <div className={"card mt-4"}>
            <div className="card-header">
                {alert.show ? (
                    <Alert
                        className={"my-3 alert-" + alert.class}
                        message={alert.message}
                        setAlert={setAlert}
                    />
                ) : null}
                <div className="d-flex justify-content-between">
                    <h6 className="font-weight-bold">{"Images You already have"}</h6>
                    <div>{deleteFiles.length > 0 && (
                        <a href="#" className="text-danger font-weight-bold" onClick={() => removeSelected()}>Remove
                            Existing selected images</a>)}</div>
                </div>
            </div>
            <div className="card-body">
                <div className="row">

                    <React.Fragment>
                        {
                            defaultFiles?.map((url, index) => (
                                <SingleSparePart
                                    key={url}
                                    path={url}
                                    status={"update"}
                                    setDeleteFiles={setDeleteFiles}
                                    deleteFiles={deleteFiles}
                                    fileIndex={index}
                                />
                            ))
                        }
                    </React.Fragment>
                </div>
            </div>
        </div>
    )
}


const SingleSparePart = ({files, fileIndex, status, path, setDeleteFiles, deleteFiles = []}) => {
    const [img, setImg] = useState(null)
    const [selected, setSelected] = useState(false)

    useEffect(() => {
        if (status !== "update") {
            if (files[fileIndex]) {
                let reader = new FileReader();
                reader.onload = function (evt) {
                    setImg(evt.target.result)
                }
                reader.onerror = function (evt) {
                    console.log(evt)
                }

                reader.readAsDataURL(files[fileIndex])
            }

        } else {
            setImg(path)
        }

    }, [files, path])

    const handleSetDeleteFile = (choiceState) => {
        if (!choiceState) {
            setDeleteFiles([...deleteFiles, fileIndex])
        } else {
            const array = [...deleteFiles];
            const index = array.indexOf(parseInt(fileIndex));
            if (index !== -1) {
                array.splice(index, 1);
                setDeleteFiles(array);
            }
        }
    }

    return (
        <div className={"col-2 rounded m-1"} style={selected ? otherStyles.imgDivClicked : otherStyles.imgDivUnClicked}>
            <img src={img} id="imageSpace" className="img-fluid my-3 rounded-sm shadow" style={otherStyles.img}
                 alt="spare-part-image" onClick={() => {
                setSelected(!selected);
                handleSetDeleteFile(selected)
            }}/>
        </div>
    )
}


const otherStyles = {
    img: {
        border: "0.5em",
    },

    imgDivClicked: {
        border: "2px solid red",
    },
    imgDivUnClicked: {
        border: "0px solid black",
    }
}