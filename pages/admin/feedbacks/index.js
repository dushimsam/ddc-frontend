import React, { useEffect, useState } from 'react';
import styles from "../../../styles/pages/table.module.css";
import SingleSubModuleLayout from "../../../layouts/admin-layouts/SingleSubModule";
import {dateFormat, filterData, getFormattedDate, gotoPath, sortData} from "../../../utils/functions";
import { Th } from "../../../components/reusable/TableComponents";
import Pagination from "react-js-pagination";
import DOMPurify from 'dompurify';

import CustomerReviewsService from "../../../services/feedbacks/CustomerReviewsService";
import ContactUsService from "../../../services/feedbacks/ContactUsService";
import Paginator from "../../../components/tables/paginator";
import ToggleButton from "../../../components/tables/toggle-button";
import SparePartService from "../../../services/products/ProductService";
import {alertFailer, alertSuccess} from "../../../utils/alerts";
import Alert from "../../../components/alert";
import $ from "jquery";
import {ALERT_EXPIRATION_PERIOD} from "../../../utils/constants";
import ActionButtons from "../../../components/tables/ActionButtons";
import Router from "next/router";
import {encryptText} from "../../../utils/encryption-decryption";

const Table = ({ messages, setMessages, paginator, setPaginator,  paginatorLoading, setPaginatorLoading,getInitialData }) => {
    const handlePageChange = (page) => {
        setPaginator({ ...paginator, ['page']: page });
        setPaginatorLoading(true)

    };
    const [alert, setAlert] = useState({message: "", class: "", show: false})

    const sortBy = (prop, order) => {
        setMessages(sortData(messages, prop, order));
    }

    const createMarkup = (html) => {
        return {
            __html: DOMPurify.sanitize(html)
        }
    }
    const handleAlertShow = () => {
        window.setTimeout(() => {
            $(function () {
                getInitialData();
                setAlert({show: false, class: "", message: ""})
            });
        }, ALERT_EXPIRATION_PERIOD);

    }

    const setShowCase = (item) => {

        CustomerReviewsService.toggleStatus(item._id).then((res) => {
            if (res.data.active) {
                alertSuccess(setAlert, "Customer review is changed to active state successfully");
            } else {
                alertFailer(setAlert, "Customer review is  changed to inactive state")
            }
            getInitialData()
        }).catch((e) => {
            alertFailer(setAlert, e.response ? e.response.data.message : e.message || "Error occurred. Try again latter.");
        }).finally(() => {
            handleAlertShow();
        });
    }

    const handleReadMore = (item) =>{
      Router.push(gotoPath("feedbacks/messages/reply",item._id,"CUSTOMER_REVIEW"))
    }
    return (
        <React.Fragment>
            {alert.show ?
                <Alert className={"my-3 alert-" + alert.class} message={alert.message} setAlert={setAlert}/> : null
            }
            <div className="table-responsive col-12">
                <table className={'table border rounded ' + styles.table} style={{ fontSize: '0.8em' }}>
                    <thead>
                        <tr>
                            <th scope="col" className={styles.th}>#</th>
                            <th scope="col" className={styles.th}>Names</th>
                            <th scope="col" className={styles.th}>Message</th>
                            <th scope="col" className={styles.th}>Status</th>
                            <th scope="col" className={styles.th}>Toggle</th>
                            <th scope="col" className={styles.th}>Created At</th>
                            <th scope="col" className={styles.th}>Read More</th>
                        </tr>
                    </thead>

                    <tbody>
                        {messages && messages.map((message, index) => {
                            return (
                                <tr key={message._id}>
                                    <th scope="row" className={styles.td}>
                                        <span className="text-uppercase">{index + 1}</span>
                                    </th>
                                    <td className={styles.td}>{message.customer.user.firstName+" "+message.customer.user.lastName}</td>

                                    <td className={styles.td}><div className="preview" dangerouslySetInnerHTML={createMarkup(message.review_paragraph.substring(0, 30)+" ...")}/></td>
                                    <td className={styles.td}>
                                        <span
                                            className={(message.active === true) ? styles.active : (message.active === false) ? styles.inactive :''}>
                                            {message.active ? " ACTIVE ":"INACTIVE"}
                                        </span>
                                    </td>
                                    <td className={styles.td}><ToggleButton setItem={setShowCase} item={message}
                                                                            defaultCheck={message.active}/>
                                    </td>
                                    <td className={styles.td}>{dateFormat(message.createdAt).onlyDate()}</td>
                                    <td className={styles.td}><ActionButtons handleSetItem={handleReadMore}
                                                                             item={message}
                                                                             allowed={["READ_MORE"]}/>
                                    </td>
                                </tr>
                            )
                        })
                        }
                    </tbody>
                </table>
            </div>
            <Paginator paginator={paginator} handlePageChange={handlePageChange}
                       paginatorLoading={paginatorLoading}/>

        </React.Fragment>
    );
}


const CategoriesTable = () => {
    const [messages, setMessages] = useState([]);
    const [searchMessages, setSearchMessages] = useState([]);
    const [paginator, setPaginator] = useState({ page: 1, perPage: 5, total: 0, range: 5 });
    const [isSearch, setIsSearch] = useState(false);
    const [searchKey, setSearchKey] = useState('');

    const [totals, setTotals] = useState({ customerReviews: 0, contactUs: 0 });
    const [paginatorLoading, setPaginatorLoading] = useState(true);

    const getMessages = (page) => {
        CustomerReviewsService.get_all_paginated(page).then((res) => {
            setMessages(res.data.docs);
            console.log("PAGINATED ",res.data.docs)
            setSearchMessages(res.data.docs);
            setPaginatorLoading(false);
            setTotals({ ...totals, categories: res.data.totalDocs });
            setPaginator({ ...paginator, total: res.data.totalDocs, page: res.data.page });
        }).catch(e => console.log(e))
    }

    const getSearchMessages = (val, page) => {
        CustomerReviewsService.search_paginated(val, page).then((res) => {
            setSearchMessages(res.data.docs);
            setPaginatorLoading(false);
            setPaginator({ ...paginator, total: res.data.totalDocs, page: res.data.page });
        }).catch(e => console.log(e))
    }

    const getTotals = async () => {
        const totals = { customerReviews: 0, contactUs: 0 };
        try {
            totals.customerReviews = (await CustomerReviewsService.get_all_paginated()).data.totalDocs;
            totals.contactUs = (await ContactUsService.get_all_paginated()).data.totalDocs;

            setTotals(totals);

        } catch (e) {
            console.log(e)
        }
    }


    useEffect(() => {
        getTotals().then();
        if (!isSearch)
            getMessages(paginator.page);
        else getSearchMessages(searchKey, paginator.page);
    }, [paginator.page]);

    const getSearchKey = (val) => {
        setSearchKey(val);
        if (val === '' || val === ' ' || !val.replace(/\s/g, '').length) {
            setSearchMessages(messages);
            setIsSearch(false);
        } else {
            getSearchMessages(val, paginator.page);
            setIsSearch(true);
        }
    };

    const getInitialData = () => {
        getMessages(paginator.page);
    }

    const panes = [
        { name: 'Customer Reviews', count: totals.customerReviews, route: '/admin/feedbacks' },
        { name: 'Contact Messages', count: totals.contactUs, route: '/admin/feedbacks/messages' },
    ];

    const getFilterKey = (key) => {
        setSearchMessages(filterData(messages, 'active', key));
    }
    const FILTERS = [
        {name: 'All', val: 'ALL'},
        {name: 'Active', val: true},
        {name: 'In active', val: false},
    ];

    return (
        <SingleSubModuleLayout
            Content={
                <Table
                    messages={searchMessages}
                    setMessages={setSearchMessages}
                    paginatorLoading={paginatorLoading} setPaginatorLoading={setPaginatorLoading}
                    getInitialData={getInitialData}
                    paginator={paginator}
                    setPaginator={setPaginator} />
            }
            isArray={true}
            panes={panes}
            showFilter={true}
            filters={FILTERS}
            name={'Customer Reviews'}
            setSearch={getSearchKey}
            setFilter={getFilterKey}
            hideSearch={true}
            status="new"
            route={"/admin/feedbacks"}
            hideAction={true}
        />
    );
};

export default CategoriesTable;