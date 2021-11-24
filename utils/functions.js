import moment from "moment";
import Router from "next/router";

import SortTables from "./sort-tables";
import $ from "jquery";
import {doubleDecryption, doubleEncryption} from "./encryption-decryption";
// import {useRouter} from "next/router";

export const isEmpty = (value) => {
    return (value == null || value.length === 0);
}

export const formatDate = (date) => {
    const DATE = new Date(date);
    const day = ((DATE.getDate() + 1) < 10) ? ('0' + (DATE.getDate() + 1)) : DATE.getDate() + 1
    const month = ((DATE.getMonth() + 1) < 10) ? ('0' + (DATE.getMonth() + 1)) : DATE.getMonth() + 1
    return (DATE)
}

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export const getFormattedDate = (date) => {
    return dateFormat(date).onlyDate()
}

export const toDate = (timestamp) => {
    return (new Date(parseInt(timestamp)))
}

export const splitArray = (array, chunks = 2) => {
    const items = [...array];

    const split = [[], []]

    const per = Math.ceil(items.length / 2)

    for (let i = 0; i < chunks; i++) {
        for (let j = 0; j < per; j++) {
            const value = items[j + i * per]
            if (!value) continue
            split[i].push(value)
        }
    }

    return split;
}

export const sortData = (data, prop, order) => {
    const copy = [...data];

    const structured = copy.map(item => {
        return {
            id: item['_id'],
            value: item[prop]
        };
    });

    return SortTables(structured, copy, order);
}

export const isThisFormValid = (form) => {
    let keys = Object.keys(form)
    for (const key of keys) if (!form[key]) return false
    return true
}


export const updateJavaScriptObject = (details1, details2) => {
    const outputObject = {};
    Object.keys(details1)
        .forEach(obj => outputObject[obj] =
            (details2.hasOwnProperty(obj) ? details2[obj] : details1[obj]));
    return outputObject;
}


export const filterData = (array, prop, val) => {
    const arr = [...array];


    if (val === 'ALL') return arr;


    if (val.constructor === Array)
        return arr.filter((item) => {
            return val.includes(item);
        });


    return arr.filter((item) => {
        return item[prop] === val
    });
}

export const dateFormat = (date) => ({
    fromNow() {
        return moment(date).fromNow();
    },

    onlyDate() {
        return moment(date).format("MMM Do YY")
    }
})

export const find_date_difference = (date1, date2) => {
// To calculate the time difference of two dates
    var Difference_In_Time = date2.getTime() - date1.getTime();

// To calculate the no. of days between two dates
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    return [Difference_In_Time, Difference_In_Days]
}


export const goto = (link) => (Router.push(link).then())


export const handleDoubleDecryptionPath = (encrypted, KEY) => {
    const decrypted = doubleDecryption(encrypted, KEY)
    if (!decrypted)
        Router.push("/404");
    else
        return decrypted

}

export const gotoPath = (path, id, addition) => {
    if (addition) {
        return {pathname: path, query: {subject: doubleEncryption(id), addition: addition}}
    } else {
        return {pathname: path, query: {subject: doubleEncryption(id)}}
    }
}


export const gotoPathDirect = (path, id, addition) => {
    return path + "/" + doubleEncryption(id)
}


export const gotoPathDirectCustomized = (path) => {
    return path
}

export const hideModalAndClean = (modalId, includeReload) => {
    $(function () {
        $(modalId).modal('hide');
        $(".modal-backdrop").remove();
    })
    if (includeReload)
        location.reload()
}

//
export const replaceCharacter = (str, newCharacter, oldCharacter) => {
    return str.split(oldCharacter).join(newCharacter)
}


export function isYouTubeUrlValid(url) {

    if (url !== undefined || url !== '') {
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
        var match = url?.match(regExp);
        if (match && match[2].length === 11) {
            // Do anything for being valid
            // if need to change the url to embed url then use below line
            $('#ytplayerSide').attr('src', 'https://www.youtube.com/embed/' + match[2] + '?autoplay=0');
            return true;
        } else {
            return false;
        }
    }
}


export function setPropertiesTo(myObject, value) {
    let values_copy = {...myObject};
    Object.keys(values_copy).forEach(v => values_copy[v] = value)
    return values_copy;
}


export function getYoutubeVideoId(url) {
    let videoId = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
    if (videoId != null) {
        return videoId[1];
    } else {
        return "";
    }
}

export function sortAlphabetically(data, prop) {
    data.sort(function (a, b) {
        if (a[prop] < b[prop]) {
            return -1;
        }
        if (a[prop] > b[prop]) {
            return 1;
        }
        return 0;
    })

    return data;
}

export const filterCars = (filter, cars) => {
    console.log(filter);
    console.log(cars);
    const filterString = `car.${filter.filter.path}`;
    console.log(filterString);
    const filtered = cars.filter((car) => {
        console.log(eval(filterString))
        return (eval(filterString) == filter.value)
    });
    console.log(filtered);
    return filtered;
}

export function openInNewTabWinBrowser(url) {
    var win = window.open(url, '_blank');
    win.focus();
}