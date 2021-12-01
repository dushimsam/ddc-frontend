import {AES, enc} from 'crypto-js';

export const GLOBAL_KEY = "****DDC&234@ECOMMERCE@@@_#Stock****"
const GLOBAL_KEY_SIMPLE = "****LINK_ADDRESS_ENCRYPTION####**123";

export const encryptText = (text) => {
    return AES.encrypt(text, GLOBAL_KEY).toString();
};

export const encryptTextV2 = (text) => {
    return AES.encrypt(text, GLOBAL_KEY_SIMPLE).toString();
};

export const decryptTextV2 = (encryptedText, KEY = GLOBAL_KEY_SIMPLE) => {
    let decryptedText = null;
    if (encryptedText) {
        const decrypted = AES.decrypt(encryptedText, KEY);
        decryptedText = decrypted.toString(enc.Utf8);
    }
    return decryptedText;
};

export const customizedDecryption = (encryptedText, KEY) => {
    let decryptedText = null;
    if (encryptedText) {
        try {
            const decrypted = AES.decrypt(encryptedText, KEY);
            decryptedText = decrypted.toString(enc.Utf8);
        } catch (e) {
            console.log(e)
        }

    }

    return decryptedText;
};

export const decryptText = (encryptedText, LOCAL_STORAGE_VARIABLE) => {
    let decryptedText = null;
    if (encryptedText) {
        try {
            const decrypted = AES.decrypt(encryptedText, GLOBAL_KEY);
            decryptedText = decrypted.toString(enc.Utf8);
        } catch (e) {
            alert("Something unusual happened from The Storage")
            removeItem(LOCAL_STORAGE_VARIABLE);
            location.reload();
        }

    }

    return decryptedText;
};

export const encryptObj = (obj) => {
    return AES.encrypt(JSON.stringify(obj), GLOBAL_KEY).toString();
};


export const decryptObj = (encryptedObj, LOCAL_STORAGE_VARIABLE) => {
    let decryptedObj = null
    if (encryptedObj) {
        try {
            const decrypted = AES.decrypt(encryptedObj, GLOBAL_KEY);
            decryptedObj = JSON.parse(decrypted.toString(enc.Utf8));
        } catch (e) {
            alert("Something unusual happened from The Storage")
            removeItem(LOCAL_STORAGE_VARIABLE)
            location.reload();
        }

    }

    return decryptedObj;
}


export const doubleEncryption = (text) => {
    return encodeURIComponent(encryptTextV2(text));
}

export const doubleDecryption = (encrypted, KEY) => {
    let decrypted;
    decrypted = decodeURIComponent(encrypted)
    return decryptTextV2(decrypted, KEY);
}


function removeItem(ELEMENT_KEY) {
    localStorage.removeItem(ELEMENT_KEY)
}

export const decryptTextSimple = (encoded) => {
    const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
    const applySaltToChar = (code) => textToChars(GLOBAL_KEY_SIMPLE).reduce((a, b) => a ^ b, code);
    return encoded
        .match(/.{1,2}/g)
        .map((hex) => parseInt(hex, 16))
        .map(applySaltToChar)
        .map((charCode) => String.fromCharCode(charCode))
        .join("");

};


export const encryptTextSimple = (text) => {
    const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
    const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);
    const applySaltToChar = (code) => textToChars(GLOBAL_KEY_SIMPLE).reduce((a, b) => a ^ b, code);

    return text
        ?.split("")
        .map(textToChars)
        .map(applySaltToChar)
        .map(byteHex)
        .join("");
};