import {allCountries} from "./countries";
import {allManufactures} from "./manufacturers";

var countries = allCountries;
var manufacturers = allManufactures;


var validate = function (vin) {
    if (vin.length == 0)
        return false;

    if (vin.length != 17)
        return false;

    return true;
};

var split = function(vin) {
    var INDEXES = {
        MADE_IN_START: 0,
        MADE_IN_END: 2,
        MANUFACTURER_START: 0,
        MANUFACTURER_END: 3,
        DETAILS_START: 3,
        DETAILS_END: 8,
        SECURITY_CODE: 8,
        YEAR: 9,
        ASSEMBLY_PLANT: 10,
        SERIAL_NUMBER_START: 11
    };

    var rawInfo = {
        madeIn: vin.substring(INDEXES.MADE_IN_START,INDEXES.MADE_IN_END),
        manufacturer: vin.substring(INDEXES.MANUFACTURER_START,INDEXES.MANUFACTURER_END),
        details: vin.substring(INDEXES.DETAILS_START,INDEXES.DETAILS_END),
        securityCode: vin.charAt(INDEXES.SECURITY_CODE),
        year: vin.charAt(INDEXES.YEAR),
        assemblyPlant: vin.charAt(INDEXES.ASSEMBLY_PLANT),
        serialNumber: vin.substring(INDEXES.SERIAL_NUMBER_START)
    };

    return rawInfo;
};


var lookup = function(keyName, key, elements) {
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];

        if (element[keyName] == key)
            return element;
    }

    return '';
};

export  const getCountry = function(countryCode) {
    const country = lookup('code', countryCode, countries);
    return country.name;
};

export const getManufacturer = function(manufacturerCode) {
    const manufacturer = lookup('code', manufacturerCode, manufacturers);
    return manufacturer.name;
};

export const decode = function(vin) {
    const codeValues = split(vin);

    return {
        country: getCountry(codeValues.madeIn),
        serialNumber: codeValues.serialNumber,
        manufacturer: getManufacturer(codeValues.manufacturer),
        year:codeValues.year
    };
};

