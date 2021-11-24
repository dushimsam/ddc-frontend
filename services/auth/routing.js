import {PREV_LINK_LOCAL_STORAGE_KEY} from "../../utils/constants";
import {decryptText} from "../../utils/encryption-decryption";

class RouteService {

    getPrevRoute() {
        if (typeof window !== "undefined")
            if (localStorage.getItem(PREV_LINK_LOCAL_STORAGE_KEY))
                return decryptText(localStorage.getItem(PREV_LINK_LOCAL_STORAGE_KEY),PREV_LINK_LOCAL_STORAGE_KEY);
            else
                return null;
    }

    removePrevRoute() {
        localStorage.removeItem(PREV_LINK_LOCAL_STORAGE_KEY)
    }
}

export default new RouteService();
