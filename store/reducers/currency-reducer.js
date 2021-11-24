import {encryptObj, decryptText, encryptText} from "../../utils/encryption-decryption"
import {CURRENCY_LOCAL_STORAGE_KEY} from "../../utils/constants";

let currency = null;

if (typeof window !== "undefined") {
    currency = decryptText(localStorage.getItem(CURRENCY_LOCAL_STORAGE_KEY), CURRENCY_LOCAL_STORAGE_KEY) || null;
}

const currencyReducer = (state = currency, action) => {
    let newCurrency;
    switch (action.type) {
        case "SET_APP_CURRENCY":
            newCurrency = state;
            newCurrency = action.payload;
            localStorage.setItem(CURRENCY_LOCAL_STORAGE_KEY, encryptText(newCurrency));
            return newCurrency;

        case "DESTROY_CURRENCY":
            newCurrency = null;
            localStorage.removeItem(CURRENCY_LOCAL_STORAGE_KEY);
            return newCurrency;
        default:
            return state;
    }
}

export default currencyReducer
