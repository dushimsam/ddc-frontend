import React from "react";
import Router from "next/router";

export const InvoiceShow = ({link}) => {
    const handleGoToInvoicePage = () => {
        Router.push(link);
    }
    return (
        <div className="card mt-4">
            <div className="card-body px-md-5 pb-1">
                <h5 className="font-weight-bolder">Proforma Invoice</h5>
                <hr/>
                <div className="row justify-content-center">
                    <div className={"col-12"} style={styles.header}>
                    </div>
                    <button className={"btn font-weight-bold h3 text-white border-light"}
                            onClick={() => handleGoToInvoicePage()}
                            style={{zIndex: 1, position: "absolute", top: "60%"}}>Open the Document
                    </button>
                </div>
            </div>
        </div>
    )
}

const styles = {
    header: {
        height: "200px",
        backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.8)),url(/img/sample-invoice.png)`,
        backgroundSize: "cover",
        borderRadius: "20px"
    }
}
