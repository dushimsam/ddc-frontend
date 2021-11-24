import styles from "../../styles/components/spare-part.module.css"

import Link from "next/link"
import {domain} from "../../services/http-common";
import globalStyles from "../../styles/global-colors.module.css"
import Router, {useRouter} from "next/router";
import {decryptTextSimple, encryptText, encryptTextSimple} from "../../utils/encryption-decryption";
import {gotoPath, gotoPathDirect} from "../../utils/functions";
import {useSelector} from "react-redux";
import {
    convertFromRdaToEuro,
    convertFromRdaToUsd,
    currencyMapping,
    defaultCurrency, defaultCurrencyMapping
} from "../../utils/currency-converter";
import React from "react";

export default function SparePart({sparePart, price = 10000, addToCart, partOnMarketId, image}) {
    let currency = useSelector((state) => state.appCurrency);

    return (
        <div className={"card border-0 pt-3 pb-2 " + styles.container} title={sparePart?.name}>
            <img
                onClick={() => Router.push(gotoPathDirect("/products", partOnMarketId))}
                src={image}
                className={"img-fluid img-thumbnail m-auto cursor-pointer " + styles.image}
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/img/default-spare-part.png";
                }}
                style={{width: "100%", height: "10em"}}
                alt={sparePart?.name}/>

            <div className="mt-3 d-flex justify-content-between align-items-end px-3">
                <div className="pl-1">
                    <Link href={gotoPathDirect("/products", partOnMarketId)} passHref>
                        <h6 className="text-secondary mb-1 cursor-pointer link" data-toggle="tooltip"
                            data-placement="bottom"
                            style={testStyles.text}
                            title={sparePart?.part_number}>{sparePart?.part_number}</h6>
                    </Link>
                    <Link href={gotoPathDirect("/products", partOnMarketId)} passHref>
                        <h6 className="text-secondary mb-1 cursor-pointer link" data-toggle="tooltip"
                            data-placement="bottom"
                            style={testStyles.text}
                            title={sparePart?.name}>{sparePart?.name}</h6>
                    </Link>
                    <h5 className={"font-weight-bold " + globalStyles.globalTextColor}>{currencyMapping(currency, price)}</h5>
                </div>
                <div>
                    {
                        partOnMarketId && (<div
                            className={"p-1 rounded-circle mb-2 cursor-pointer shadow-sm " + styles.addToCartButton}
                            onClick={addToCart}>{
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="18"
                                 fill="#ff5555" style={{verticalAlign: 'text-top'}}>
                                <path fill="none" d="M0 0h24v24H0z"/>
                                <path
                                    d="M4 6.414L.757 3.172l1.415-1.415L5.414 5h15.242a1 1 0 0 1 .958 1.287l-2.4 8a1 1 0 0 1-.958.713H6v2h11v2H5a1 1 0 0 1-1-1V6.414zM6 7v6h11.512l1.8-6H6zm-.5 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm12 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
                                />
                            </svg>
                        }
                        </div>)
                    }
                </div>
            </div>
        </div>
    )
}

const testStyles = {
    text: {
        display: "block", maxWidth: "8em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"
    }
}