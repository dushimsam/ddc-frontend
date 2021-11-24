import React, {useEffect, useState} from 'react'
import PaymentService from "../../../services/payment/payment.service"
import {system_users} from "../../../utils/constants";
import SingleSubModuleLayoutManager from "../../../layouts/sales-manager-layouts/SingleSubModule"
import styles from "../../../styles/pages/table.module.css";
import ActionButtons from "../../../components/tables/ActionButtons";
import Router from "next/router";
import SingleSubModuleLayoutAdmin from "../../../layouts/admin-layouts/SingleSubModule";
import {useSelector} from "react-redux";
import {dateFormat, gotoPath} from "../../../utils/functions";
import Paginator from "../../../components/tables/paginator";
import {currencyMapping, defaultCurrencyMapping} from "../../../utils/currency-converter";


const Table = ({
                   momoPayments, paginator, setPaginator, paginatorLoading,
                   setPaginatorLoading
               }) => {


    const showReceipt = (payment) => {
        Router.push(gotoPath("/order/invoice", payment._id, "ORDER_FROM_PAYMENT")).then()
    }

    const handlePageChange = (page) => {
        setPaginatorLoading(true)

        setPaginator({...paginator, ['page']: page});
    };

    let currency = useSelector((state) => state.appCurrency);

    return (
        <React.Fragment>
            <div className="table-responsive col-12">
                <table className={'table border rounded ' + styles.table} style={{fontSize: '0.8em'}}>
                    <thead>
                    <tr>
                        <th scope="col" className={styles.th}>#</th>
                        <th scope="col" className={styles.th}>Customer</th>
                        <th scope="col" className={styles.th}>MSISDN</th>
                        <th scope="col" className={styles.th}>CHANNEL</th>
                        <th scope="col" className={styles.th}>Products</th>
                        <th scope="col" className={styles.th}>Order Amount</th>
                        <th scope="col" className={styles.th}>Total VAT</th>
                        <th scope="col" className={styles.th}>Amount Paid</th>
                        <th scope="col" className={styles.th}>Made On</th>
                        <th scope="col" className={styles.th}>View Receipt</th>
                    </tr>
                    </thead>

                    <tbody>
                    {momoPayments && momoPayments.map((payment, index) => {
                        return (
                            <tr key={payment._id}>
                                <th scope="row" className={styles.td}><span
                                    className="text-uppercase">{index + 1}</span></th>
                                <td className={styles.td}>{payment.order.customer.user.firstName + " " + payment.order.customer.user.lastName || 'N/A'}</td>
                                <td className={styles.td}>{payment.msisdn}</td>
                                <td className={styles.td}>{payment.channel}</td>
                                <td className={styles.td}>{payment.order.total_order_quantities + " items"}</td>
                                <td className={styles.td}>{currencyMapping(currency, payment?.total_order_amount)}</td>
                                <td className={styles.td}>{currencyMapping(currency,payment?.total_VAT)}</td>
                                <td className={styles.td}>{currencyMapping(currency,payment?.amountToPay)}</td>
                                <td className={styles.td}>{dateFormat(payment.createdAt).fromNow() + " - " + dateFormat(payment.createdAt).onlyDate()}</td>
                                <td><ActionButtons handleSetItem={showReceipt} item={payment} allowed={["READ_MORE"]}/>
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

            <React.Fragment>
                <button id="openModal" className="d-none" data-toggle="modal" data-target="#itemDetailsModal">Large
                    modal
                </button>
            </React.Fragment>

        </React.Fragment>
    );
}


const Page = () => {
    const [momoPayments, setMomoPayments] = useState([]);
    const [searchPayments, setSearchPayments] = useState([]);
    const [total, setTotal] = useState(0);
    const [paginator, setPaginator] = useState({
        page: 1,
        perPage: 5,
        total: 0,
        range: 5,
    });
    const [isSearch, setIsSearch] = useState(false);
    const [searchKey, setSearchKey] = useState("");


    const [totals, setTotals] = useState({cash_payments: 0, momo_payments: 0, loans: 0});

    const getTotals = async () => {
        const totals = {cash_payments: 0, momo_payments: 0, loans: 0};
        try {
            const momo_payments = await PaymentService.getMomoPaginated();
            const cash_payments = await PaymentService.getCashPaginated();
            const loans = await PaymentService.getPaidOrLoanPurchases("DEBT");

            totals.momo_payments = momo_payments.data.totalDocs;
            totals.cash_payments = cash_payments.data.totalDocs;
            totals.loans = loans.data.totalDocs;

            setTotals(totals);
        } catch (error) {
            console.log(error)
        }
    }
    const [paginatorLoading, setPaginatorLoading] = useState(true);

    const getMomoPayments = (page) => {
        PaymentService.getMomoPaginated(page).then((res) => {
            setMomoPayments(res.data.docs);
            setSearchPayments(res.data.docs);
            setPaginatorLoading(false);
            // setTotals({...totals, cash_payments: res.data.totalDocs});
            setPaginator({...paginator, total: res.data.totalDocs, page: res.data.page});
        }).catch(e => console.log(e))
    }

    useEffect(() => {
        getTotals().then();
        if (!isSearch)
            getMomoPayments(paginator.page);
        else getSearchPayments(searchKey, paginator.page);
    }, [paginator.page]);


    const getSearchPayments = (val, page) => {
        setPaginatorLoading(false);
    };

    const getSearchKey = (val) => {
        setSearchKey(val);
        if (val === "" || val === " " || !val.replace(/\s/g, "").length) {
            setSearchPayments(momoPayments);
            setIsSearch(false);
        } else {
            getSearchPayments(val, paginator.page);
            setIsSearch(true);
        }
    };

    const getFilterKey = (key) => {
    };

    const panes = [
        {name: 'Cash', count: totals.cash_payments, route: '/shared/payments/cash'},
        {name: 'Momo', count: totals.momo_payments, route: '/shared/payments/momo'},
        {name: 'Loans', count: totals.loans, route: '/shared/payments/loan'}
    ];
    const user = useSelector(state => state.authUser);

    return (

        user?.category?.name === system_users.ADMIN
            ?
            <SingleSubModuleLayoutAdmin
                Content={<Table
                    paginatorLoading={paginatorLoading} setPaginatorLoading={setPaginatorLoading}
                    momoPayments={momoPayments} setMomoPayments={setMomoPayments} paginator={paginator}
                    setPaginator={setPaginator}/>}
                isArray={true}
                panes={panes}
                showFilter={false}
                setFilter={getFilterKey}
                name={'Momo'}
                setSearch={getSearchKey}
                hideAction={true}
                status={null}
                route={"/shared/payments/momo"}
            /> : user.category?.name === system_users.EMPLOYEE ?
                <SingleSubModuleLayoutManager
                    Content={<Table momoPayments={momoPayments} setMomoPayments={setMomoPayments} paginator={paginator}
                                    setPaginator={setPaginator}/>}
                    isArray={true}
                    panes={panes}
                    showFilter={false}
                    setFilter={getFilterKey}
                    name={'Momo'}
                    setSearch={getSearchKey}
                    hideAction={true}
                    status={null}
                    route={"/shared/payments/momo"}
                /> : <></>
    );
};

export default Page;