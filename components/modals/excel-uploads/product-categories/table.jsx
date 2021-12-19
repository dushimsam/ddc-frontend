import React from "react";
import {show_modal} from "../../../../utils/modal-funs";
import styles from "../../../../styles/pages/table.module.css";


const Row = ({item, index, setItem, status, setCurrItem}) => {
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>
                  <span className="btn"
                        onClick={() => {
                            item.status !== "EXISTS" ? setItem(item) : {}
                        }}><svg xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="16" height="16"><path
                      fill="none" d="M0 0h24v24H0z"/><path
                      d="M9.243 19H21v2H3v-4.243l9.9-9.9 4.242 4.244L9.242 19zm5.07-13.556l2.122-2.122a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414l-2.122 2.121-4.242-4.242z"
                      fill="rgba(50,152,219,1)"/></svg>
                </span>

                <span className="btn"
                      onClick={() => {
                          setCurrItem(item.value);
                          show_modal('#deleteConfirmationModal');
                      }}><svg
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16"
                    height="16"><path fill="none" d="M0 0h24v24H0z"/><path
                    d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-4.586 6l1.768 1.768-1.414 1.414L12 15.414l-1.768 1.768-1.414-1.414L10.586 14l-1.768-1.768 1.414-1.414L12 12.586l1.768-1.768 1.414 1.414L13.414 14zM9 4v2h6V4H9z"
                    fill="rgba(231,76,60,1)"/></svg></span>

            </td>
            <td className={styles.td}>
                        <span
                            className={(status === 'OK') ? "" : (status === 'EXISTS') ? styles.pending : (status === 'INCOMPLETE') ? styles.inactive : (status === 'DUPLICATE') ? styles.purple : ''}>
                                       {status === "OK" ?
                                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32"
                                                height="32">
                                               <path fill="none" d="M0 0h24v24H0z"/>
                                               <path
                                                   d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-.997-6l7.07-7.071-1.414-1.414-5.656 5.657-2.829-2.829-1.414 1.414L11.003 16z"
                                                   fill="rgba(47,204,113,1)"/>
                                           </svg> : status}
                        </span>
            </td>
        </tr>
    )
}

const DisplayingTable = ({items, setCurrItem, setItems, handleSetItem, handleRemove}) => {
    return (
        <table className="table container rounded border-danger border-1 table-bordered"
               id="table-to-xls">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">NAME</th>
                <th scope="col">ACTION</th>
                <th scope="col">STATUS</th>
            </tr>
            </thead>
            <tbody>
            {items.map((d, index) => (
                <Row key={d} setItems={setItems} index={index}
                     setCurrItem={setCurrItem}
                     item={d}
                     status={d.status} handleRemove={handleRemove}
                     setItem={handleSetItem}/>
            ))}
            </tbody>
        </table>
    )
}

export default DisplayingTable;