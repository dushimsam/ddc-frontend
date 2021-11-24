import React, {useEffect} from 'react';
import {useDropzone} from 'react-dropzone';

export default function UploadDragAndDrop({setFiles}) {
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
        accept: "image/x-png,image/jpeg,image/png,image/jpg,application/pdf"
    });

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    useEffect(() => {
        setFiles(acceptedFiles);
    }, [acceptedFiles])

    return (
        <div className="container shadow rounded p-5"
             style={{borderStyle: "dotted", border: "2px dotted #ff5555", background: "#ecf0f1"}}>
            <div className={"row justify-content-center"}>
                <div className={"col-md-6 col-11"}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="80" height="80">
                        <path fill="none" d="M0 0h24v24H0z"/>
                        <path
                            d="M12.414 5H21a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7.414l2 2zM20 11H4v8h16v-8zm0-2V7h-8.414l-2-2H4v4h16z"
                            fill="rgba(231,76,60,1)"/>
                    </svg>
                </div>
            </div>
            <div className={"row justify-content-center"}>
                <div className={"col-10"}>
                    <div {...getRootProps({className: 'dropzone'})}>
                        <input {...getInputProps()}/>
                        <p className={"text-dark font-weight-bold h4"}>Proof of Payment</p>
                        <p className={" font-weight-light text-secondary"}>Drag your receipt documents here or upload
                            them directly.</p>
                        <button className={"btn btn-danger font-weight-bolder"}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                <path fill="none" d="M0 0h24v24H0z"/>
                                <path
                                    d="M7 20.981a6.5 6.5 0 0 1-2.936-12 8.001 8.001 0 0 1 15.872 0 6.5 6.5 0 0 1-2.936 12V21H7v-.019zM13 13h3l-4-5-4 5h3v4h2v-4z"
                                    fill="rgba(255,255,255,1)"/>
                            </svg>
                            <span className={"ml-1"}>Browse Files</span></button>
                    </div>
                </div>
                {acceptedFiles.length > 0 ? <aside>
                    <h5 className={"mt-5"}>Selected Files</h5>
                    <ul className={"text-secondary"}>{files}</ul>
                </aside> : <></>}
            </div>
        </div>
    );
}


