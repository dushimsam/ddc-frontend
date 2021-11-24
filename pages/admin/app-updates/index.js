import React, { useEffect, useState } from 'react';
import styles from "../../../styles/pages/table.module.css";
import Update from "./update";
import ActionButtons from "../../../components/tables/ActionButtons"
import DeleteConfirmation from "../../../components/tables/delete-confirmation-modal"
import SingleSubModuleLayout from "../../../layouts/admin-layouts/SingleSubModule";
import { filterData, getFormattedDate, sortData } from "../../../utils/functions";
import AppUpdateService from "../../../services/app-updates/app-updates";
import { Th } from "../../../components/reusable/TableComponents";
import Pagination from "react-js-pagination";
import ToggleButton from "../../../components/tables/toggle-button";
import { alertFailer, alertSuccess } from "../../../utils/alerts";
import Alert from "../../../components/alert";
import ImageModalView from '../../../components/reusable/image-modal-view';
import { hide_delete_modal, hide_modal_alert, show_modal } from "../../../utils/modal-funs";
import { processDetailedDate } from "../../../utils/process-date";
import ReadMoreLayout, { ImageContainer, MapDetails } from "../../../components/layouts/read-more-dialog-layout";
import { useRouter } from "next/router";
import { ALERT_EXPIRATION_PERIOD } from "../../../utils/constants";
import $ from "jquery";
import Paginator from "../../../components/tables/paginator";


const Table = ({ appUpdates, setAppUpdates,paginatorLoading, setPaginatorLoading, paginator, setPaginator, getInitialData }) => {
    const [item, setItem] = useState(null);
    const [itemFields, setItemFields] = useState(null);
    const [childFields, setChildFields] = useState(null);

    const handleSetItem = (item, status) => {
        setItem(item);


        if (status === 'update') {
            show_modal('#itemUpdateModal')
        } else if (status === 'read-more') {
            handleSetFields(item)
            // handleSetChildFields(item)
        } else {
            show_modal('#deleteConfirmationModal')
        }
    }

    const handleSetFields = (item) => {
        setItemFields([{ name: "Title", value: item.title }, {
            name: "Showcase",
            value: item.showcase ? "TRUE" : "FALSE"
        }, { name: "CREATED AT", value: processDetailedDate(item.createdAt) }]);
        show_modal('#itemReadMoreModalLayout');
    }

    const handlePageChange = (page) => {
        setPaginatorLoading(true)
        setPaginator({ ...paginator, ['page']: page });
    };

    const [alert, setAlert] = useState({ message: "", class: "", show: false })
    const [loading, setLoading] = useState(false);

    const deleteItem = (item) => {
        AppUpdateService.delete(item._id).then((res) => {
            setAlert({ show: true, class: "success", message: "Record is Deleted successfully." });
            setLoading(false)
            getInitialData();
            hide_delete_modal(setAlert);
        }).catch((e) => {
            alertFailer(setAlert, e.response ? e.response.data.message : e.message || "Error occurred. Try again latter.")
            hide_modal_alert(setAlert);
        }).finally(() => {
            setLoading(false)
        })
    }

    const sortBy = (prop, order) => {
        setAppUpdates(sortData(appUpdates, prop, order));
    }

    const [showCaseAlert, setShowCaseAlert] = useState({ message: "", class: "", show: false })

    const handleAlertShow = () => {
        window.setTimeout(() => {
            $(function () {
                getInitialData();
                setShowCaseAlert({ show: false, class: "", message: "" })
            });
        }, ALERT_EXPIRATION_PERIOD);

    }

    const setShowCase = (item) => {
        AppUpdateService.setShowcase(item._id).then((res) => {
            if (res.data.showcase) {
                alertSuccess(setShowCaseAlert, "Added on  Our Company Updates");
            } else {
                alertFailer(setShowCaseAlert, "Removed from Our Company updates")
            }
        }).catch((e) => {
            alertFailer(setShowCaseAlert, e.response ? e.response.data.message : e.message || "Error occurred. Try again latter.");
        }).finally(() => {
            handleAlertShow();
        });
    }

    const [imageUrl, setImageUrl] = useState([])
    const router = useRouter();

    useEffect(() => {
        if (router.query.id) {
            AppUpdateService.get(router.query.id)
                .then((res) => {
                    const item = res.data;
                    handleSetFields(item);
                    setItem(item);
                }).catch((e) => {
                    console.log(e)
                })
        }

    }, [router.query.id])
    return (
        <React.Fragment>
            {showCaseAlert.show ?
                <Alert className={"my-3 alert-" + showCaseAlert.class} message={showCaseAlert.message}
                    setAlert={showCaseAlert} /> : null
            }
            <div className="table-responsive col-12">

                <table className={'table border rounded ' + styles.table} style={{ fontSize: '0.8em' }}>
                    <thead>
                        <tr>
                            <th scope="col" className={styles.th}>#</th>
                            <th scope="col" className={styles.th}>Title</th>
                            <th scope="col" className={styles.th}>Showcase</th>
                            <th scope="col" className={styles.th}>Photo</th>
                            <Th name={'Created On'} prop={'createdAt'} sorter={sortBy} />
                            <th scope="col" className={styles.th}>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {appUpdates && appUpdates.map((appUpdate, index) => {
                            return (
                                <tr key={appUpdate._id}>
                                    <th scope="row" className={styles.td}><span className="text-uppercase">{index + 1}</span>
                                    </th>
                                    <td className={styles.td}>{appUpdate.title}</td>
                                    <td className={styles.td}><ToggleButton setItem={setShowCase} item={appUpdate}
                                        defaultCheck={appUpdate?.showcase} /></td>
                                    <td className={styles.td}>
                                        <svg xmlns="http://www.w3.org/2000/svg" data-toggle="modal" data-target="#imagePopModal"
                                            onClick={() => setImageUrl([appUpdate.imageUrl])}
                                            style={{ verticalAlign: 'super', fill: '#707070' }} viewBox="0 0 24 24" width="20"
                                            height="20">
                                            <path fill="none" d="M0 0h24v24H0z" />
                                            <path
                                                d="M2 3.993A1 1 0 0 1 2.992 3h18.016c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993H2.992A.993.993 0 0 1 2 20.007V3.993zM4 5v14h16V5H4zm8 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 2a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm5-11h2v2h-2V6z" />
                                        </svg>
                                    </td>
                                    <td className={styles.td}>{getFormattedDate(appUpdate.createdAt)}</td>
                                    <td className={styles.td}><ActionButtons handleSetItem={handleSetItem} item={appUpdate}
                                        allowed={["READ_MORE", "UPDATE", "DELETE"]} /></td>
                                </tr>
                            )
                        })
                        }
                    </tbody>
                </table>
            </div>
            <Paginator paginator={paginator} handlePageChange={handlePageChange}
                       paginatorLoading={paginatorLoading}/>

            {item && <Update item={item} getInitialData={getInitialData} />}
            {item &&
                <DeleteConfirmation text={item.name} item={item} deleteItem={deleteItem} alert={alert} loading={loading}
                    setLoading={setLoading} setAlert={setAlert} />}
            {imageUrl && <ImageModalView imgUrl={imageUrl} />}
            {itemFields && <ReadMoreLayout parentContentTitle={"APP UPDATE INFORMATION"}
                ParentContent={<MapDetails fields={itemFields} />} hasImage={true}
                ImageContent={item &&
                    <ImageContainer imgs={[item.imageUrl]} mainTitle={item.title}
                        moreDetail={processDetailedDate(item.createdAt)} largeProperty={true} />} />}

        </React.Fragment>
    );
}


const AppUpdatesTable = () => {

    const [appUpdates, setAppUpdates] = useState([]);
    const [searchAppUpdates, setSearchAppUpdates] = useState([]);
    const [total, setTotal] = useState(0);
    const [paginator, setPaginator] = useState({ page: 1, perPage: 5, total: 0, range: 5 });
    const [isSearch, setIsSearch] = useState(false);
    const [searchKey, setSearchKey] = useState('');

    let all = [];
    const [paginatorLoading, setPaginatorLoading] = useState(true);

    const getAppUpdates = (page) => {
        AppUpdateService.getPaginated(page).then((res) => {
            setAppUpdates(res.data.docs);
            setSearchAppUpdates(res.data.docs);
            setTotal(res.data.totalDocs);
            setPaginatorLoading(false);
            setPaginator({ ...paginator, total: res.data.totalDocs, page: res.data.page });
        }).catch(e => console.log(e))
    }
    const getSearchAppUpdates = (val, page) => {
        AppUpdateService.searchPaginated(val, page).then((res) => {
            setSearchAppUpdates(res.data.docs);
            setPaginatorLoading(false);
            setPaginator({ ...paginator, total: res.data.totalDocs, page: res.data.page });
        }).catch(e => console.log(e))
    }
    useEffect(() => {
        if (!isSearch)
            getAppUpdates(paginator.page);
        else getSearchAppUpdates(searchKey, paginator.page);
    }, [paginator.page]);

    const getSearchKey = (val) => {
        setSearchKey(val);
        if (val === '' || val === ' ' || !val.replace(/\s/g, '').length) {
            setSearchAppUpdates(appUpdates);
            setIsSearch(false);
        } else {
            getSearchAppUpdates(val, paginator.page);
            setIsSearch(true);
        }
    };

    const getFilterKey = (key) => {
        setSearchAppUpdates(filterData(appUpdates, 'status', key));
    }
    const getInitialData = () => {
        getAppUpdates(paginator.page);
    }


    return (
        <SingleSubModuleLayout
            Content={<Table appUpdates={searchAppUpdates} getInitialData={getInitialData}
                            paginatorLoading={paginatorLoading} setPaginatorLoading={setPaginatorLoading}
                            setAppUpdates={setSearchAppUpdates} paginator={paginator} setPaginator={setPaginator} />}
            count={total}
            route={"/admin/app-updates"}
            showFilter={false}
            setSearch={getSearchKey}
            setFilter={getFilterKey}
            name={"AppUpdates"}
            status="new"
        />
    );
};


export default AppUpdatesTable;