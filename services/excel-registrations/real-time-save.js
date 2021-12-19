import {PRODUCT_REGISTRATION_TEMP_STORAGE_KEY} from "../../utils/constants";
import {decryptObj, encryptObj} from "../../utils/encryption-decryption";

class RealTimeSaveService {
    getEncData(KEY) {
        if (typeof window !== "undefined")
            return localStorage.getItem(KEY);
        return;
    }

    getDecData(KEY) {
        if (typeof window !== "undefined")
            return decryptObj(localStorage.getItem(KEY), KEY) || [];
        return [];
    }

    setData(data, KEY) {
        localStorage.setItem(KEY, encryptObj(data));
    }

    removeData(KEY) {
        localStorage.removeItem(KEY)
    }
}

export default new RealTimeSaveService();
