import React from 'react'
import styles from '../../styles/components/Breadcrumb.module.css';
import { useSelector } from "react-redux";

const ActionButtons = ({ handleSetItem, item, allowed, disabled }) => {
    return (
        <React.Fragment>
            {
                allowed && allowed.includes("READ_MORE") || !allowed ?
                    (<span className={"mx-2 " + styles.svgViewHover} onClick={() => {
                            !disabled ? handleSetItem(item, "read-more") : null
                        }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill={"#707070"} viewBox="0 0 24 24" width="18" height="18">
                <path fill="none" d="M0 0h24v24H0z"/><path
                d="M12 3c5.392 0 9.878 3.88 10.819 9-.94 5.12-5.427 9-10.819 9-5.392 0-9.878-3.88-10.819-9C2.121 6.88 6.608 3 12 3zm0 16a9.005 9.005 0 0 0 8.777-7 9.005 9.005 0 0 0-17.554 0A9.005 9.005 0 0 0 12 19zm0-2.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm0-2a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
            </svg> 
            </span>
                    ) : null
            }
            {
                allowed && allowed.includes("DELETE") || !allowed ?
                    (<span className={"mx-2 " + styles.svgDeleteHover} onClick={() => {
                        !disabled ? handleSetItem(item, "delete") : null
                    }}>

         <svg
             xmlns="http://www.w3.org/2000/svg"
             fill={"#707070"}
             viewBox="0 0 24 24"
             width="18"
             height="20"
         >
           <path fill="none" d="M0 0h24v24H0z"/>
           <path
               d="M7 4V2h10v2h5v2h-2v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6H2V4h5zM6 6v14h12V6H6zm3 3h2v8H9V9zm4 0h2v8h-2V9z"/>
         </svg></span>)
                    : null
                
            }
            {
                allowed && allowed.includes("UPDATE") || !allowed ?
                    (
                        <span className={"mx-2 " + styles.svgUpdateHover} onClick={() => {
                            !disabled ? handleSetItem(item, "update") : null
                        }}>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={"#707070"}
        viewBox="0 0 24 24"
        width="20"
        height="20"
    >
      <path fill="none" d="M0 0h24v24H0z"/>
      <path
          d="M6.414 16L16.556 5.858l-1.414-1.414L5 14.586V16h1.414zm.829 2H3v-4.243L14.435 2.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 18zM3 20h18v2H3v-2z"/>
    </svg>
  </span>
                    ) : null
            }
        
        
        </React.Fragment>
    
    )
}

export default ActionButtons;