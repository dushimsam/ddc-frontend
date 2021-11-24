import React from 'react'
import styles from '../../styles/components/deleteConfirm.module.css';
import Alert from "../../components/alert";
import {hide_modal} from "../../utils/modal-funs";


const DeleteConfirmation = ({item, deleteItem, alert, setAlert, loading, setLoading, title, btnText}) => {

    return (
        <div id="deleteConfirmationModal" className={"modal fade"}>
            <div className={"modal-dialog modal-dialog-centered " + styles.modalConfirm}>
                <div className={"modal-content " + styles.modalContent}>
                    {alert.show ? <Alert className={"my-3 alert-" + alert.class} message={alert.message}
                                         setAlert={setAlert}/> : null}
                    <div className={"modal-body " + styles.modalBody}>
                        <span>{!title ? "Do you really want to delete this record?" : title}</span> <br/>
                    </div>
                    <div className={"modal-footer justify-content-center " + styles.modalFooter}>
                        <button type="button" className={"btn btn-secondary " + styles.btnSecondary + " " + styles.btn}
                                onClick={() => {
                                    hide_modal('#deleteConfirmationModal')
                                }}>Cancel
                        </button>
                        <button type="button" className={"btn btn-danger " + styles.btnDanger + " " + styles.btn}
                                onClick={() => {
                                    setLoading(true);
                                    deleteItem(item);
                                }}>
                            {loading ? (
                                <img
                                    src={"/img/loader.gif"}
                                    alt={"Loading"}
                                    className={"loader"}
                                />
                            ) : !btnText ? "Delete" : btnText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default DeleteConfirmation;