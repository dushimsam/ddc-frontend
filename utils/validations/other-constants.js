import React from "react";

export const DeleteIcon = ({size}) => (<svg style={{cursor: "pointer"}}
                                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                            width={!size ? "16" : size}
                                            height={!size ? "16" : size}>
    <path fill="none" d="M0 0h24v24H0z"/>
    <path
        d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-4.586 6l1.768 1.768-1.414 1.414L12 15.414l-1.768 1.768-1.414-1.414L10.586 14l-1.768-1.768 1.414-1.414L12 12.586l1.768-1.768 1.414 1.414L13.414 14zM9 4v2h6V4H9z"
        fill="rgba(231,76,60,1)"/>
</svg>)

export const EditIcon = ({size}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={!size ? "16" : size} style={{cursor: "pointer"}}
         height={!size ? "16" : size}>
        <path fill="none" d="M0 0h24v24H0z"/>
        <path
            d="M5 19h1.414l9.314-9.314-1.414-1.414L5 17.586V19zm16 2H3v-4.243L16.435 3.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L9.243 19H21v2zM15.728 6.858l1.414 1.414 1.414-1.414-1.414-1.414-1.414 1.414z"
            fill="rgba(50,152,219,1)"/>
    </svg>
)