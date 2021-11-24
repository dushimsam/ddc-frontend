import React, {useEffect, useState} from 'react';
import styles from "../../../../styles/pages/table.module.css";
import SingleSubModuleLayout from "../../../../layouts/admin-layouts/SingleSubModule";
import {getFormattedDate, gotoPath, sortData} from "../../../../utils/functions";
import {Th} from "../../../../components/reusable/TableComponents";
import CustomerReviewsService from "../../../../services/feedbacks/CustomerReviewsService";
import ContactUsService from "../../../../services/feedbacks/ContactUsService";
import Router from 'next/router';
import Paginator from "../../../../components/tables/paginator";

const Table = ({messages, setMessages, paginator, paginatorLoading, setPaginatorLoading, setPaginator}) => {
    const handlePageChange = (page) => {
        setPaginatorLoading(true)
        setPaginator({...paginator, ['page']: page});
    };

    const sortBy = (prop, order) => {
        setMessages(sortData(messages, prop, order));
    }

    return (
        <React.Fragment>
            <div className="table-responsive col-12">
                <table className={'table border rounded ' + styles.table} style={{fontSize: '0.8em'}}>
                    <thead>
                    <tr>
                        <th scope="col" className={styles.th}>#</th>
                        <th scope="col" className={styles.th}>Name</th>
                        <th scope="col" className={styles.th}>Email</th>
                        <th scope="col" className={styles.th}>Message</th>
                        <Th name={'Created On'} prop={'createdAt'} sorter={sortBy}/>
                        <th scope="col" className={styles.th}>Reply</th>
                    </tr>
                    </thead>

                    <tbody>
                    {messages && messages.map((message, index) => {
                        return (
                            <tr key={message._id}>
                                <th scope="row" className={styles.td}>
                                    <span className="text-uppercase">{index + 1}</span>
                                </th>
                                <td className={styles.td}>{message.names}</td>
                                <td className={styles.td}>{message.email || 'N/A'}</td>
                                <td className={styles.td}>{message.message.substring(0, 10) + " ..." || 'N/A'}</td>
                                <td className={styles.td}>{getFormattedDate(message.createdAt)}</td>
                                <td>
                                    <button className="btn"
                                            onClick={() => Router.push(gotoPath("messages/reply", message._id, "CONTACT_US"))}>
                                        <span className="mr-3"><svg xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 24 24" width="18" height="18"><path
                                            fill="none" d="M0 0H24V24H0z"/><path
                                            d="M11 20L1 12l10-8v5c5.523 0 10 4.477 10 10 0 .273-.01.543-.032.81-1.463-2.774-4.33-4.691-7.655-4.805L13 15h-2v5zm-2-7h4.034l.347.007c1.285.043 2.524.31 3.676.766C15.59 12.075 13.42 11 11 11H9V8.161L4.202 12 9 15.839V13z"
                                            fill="#1A4894"/></svg></span></button>
                                </td>
                            </tr>
                        )
                    })
                    }
                    </tbody>
                </table>

                <Paginator paginator={paginator} handlePageChange={handlePageChange}
                           paginatorLoading={paginatorLoading}/>
            </div>
        </React.Fragment>
    );
}

const CategoriesTable = () => {
    const [messages, setMessages] = useState([]);
    const [searchMessages, setSearchMessages] = useState([]);
    const [paginator, setPaginator] = useState({page: 1, perPage: 5, total: 0, range: 5});
    const [isSearch, setIsSearch] = useState(false);
    const [searchKey, setSearchKey] = useState('');

    const [totals, setTotals] = useState({customerReviews: 0, contactUs: 0});
    const [paginatorLoading, setPaginatorLoading] = useState(true);

    const getMessages = (page) => {
        ContactUsService.get_all_paginated(page).then((res) => {
            setMessages(res.data.docs);
            setSearchMessages(res.data.docs);
            setPaginatorLoading(false);
            setTotals({...totals, categories: res.data.totalDocs});
            setPaginator({...paginator, total: res.data.totalDocs, page: res.data.page});
        }).catch(e => console.log(e))
    }

    const getSearchMessages = (val, page) => {
        ContactUsService.search_paginated(val, page).then((res) => {
            setSearchMessages(res.data.docs);
            setPaginatorLoading(false);
            setPaginator({...paginator, total: res.data.totalDocs, page: res.data.page});
        }).catch(e => console.log(e))
    }

    const getTotals = async () => {
        const totals = {customerReviews: 0, contactUs: 0};
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
        {name: 'Customer Reviews', count: totals.customerReviews, route: '/admin/feedbacks'},
        {name: 'Contact Messages', count: totals.contactUs, route: '/admin/feedbacks/messages'},
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
                    setPaginator={setPaginator}/>
            }
            isArray={true}
            panes={panes}
            showFilter={false}
            name={'Contact Messages'}
            setSearch={getSearchKey}
            status="new"
            route={"/admin/feedbacks/messages"}
            hideAction={true}
        />
    );
};

export default CategoriesTable;