import {useSelector} from "react-redux";
import {system_users} from "./constants";

export const rwandanCurrency = "RWF";
export const dollarCurrency = "USD";
export const koreanCurrency = "KRW";
export const dubaiCurrency = "UAE";
export const euroCurrency = "EUR";


function numFormatter(num, v = "V1") {
    if (num >= 1000000 && v === "V2") {
        return (num / 1000000)?.toFixed(1) + 'M'; // convert to M for number from > 1 million
    } else if (num >= 1000 && v === "V2") {
        return (num / 1000)?.toFixed(1) + 'K'; // convert to M for number from > 1 million
    } else {
        return num?.toLocaleString(); // if value < 1000, nothing to do
    }
}


export const convertFromRdaToUsd = (francs, v) => numFormatter(Math.ceil(((0.00098 * francs)) * 100) / 100, v);
export const convertFromRdaToSkw = (francs, v) => numFormatter(Math.ceil(((1.18 * francs)) * 100) / 100, v);
export const convertFromRdaToUae = (francs, v) => numFormatter(Math.ceil(((0.0036 * francs)) * 100) / 100, v);
export const convertFromRdaToEuro = (francs, v) => numFormatter(Math.ceil(((0.00085 * francs)) * 100) / 100, v);
export const defaultCurrency = (francs, v) => numFormatter(francs, v);
export const globalConverterMapping = (currency, francs, v) => currency === dollarCurrency ? convertFromRdaToUsd(francs, v) : currency === euroCurrency ? convertFromRdaToEuro(francs, v) : currency === koreanCurrency ? convertFromRdaToSkw(francs, v) : currency === dubaiCurrency ? convertFromRdaToUae(francs, v) : defaultCurrency(francs, v)

export const currencyMapping = (currency, francs) => currency === dollarCurrency ? "$" + convertFromRdaToUsd(francs) : currency === euroCurrency ? "€" + convertFromRdaToEuro(francs) : currency === koreanCurrency ? "₩" + convertFromRdaToSkw(francs) : currency === dubaiCurrency ? "AED " + convertFromRdaToUae(francs) : "RWF " + defaultCurrency(francs)

export const customCurrencyMapping = (currency, user, francs) => {
    return (currencyMapping(user?.category?.name === system_users.CUSTOMER ? currency : rwandanCurrency, francs));
}

export const defaultCurrencyMapping = (francs) => {
    return (currencyMapping(rwandanCurrency, francs));
}