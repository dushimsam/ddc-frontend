import {encryptObj,decryptObj} from "../../utils/encryption-decryption"
import {CAR_BOOKING_LOCAL_STORAGE_KEY} from "../../utils/constants";

let booking = {};

if (typeof window !== "undefined") {
    booking = decryptObj(localStorage.getItem(CAR_BOOKING_LOCAL_STORAGE_KEY),CAR_BOOKING_LOCAL_STORAGE_KEY) || {};
}

const bookingReducer = (state = booking, action) => {
    let newBooking, existingItem
    switch (action.type) {
        case "CREATE_BOOKING":
            newBooking = state;
            newBooking.car_on_market = action.payload;
            localStorage.setItem(CAR_BOOKING_LOCAL_STORAGE_KEY, encryptObj(newBooking));
            return { ...newBooking };

        case "DESTROY_BOOKING":
            newBooking = {};
            localStorage.removeItem(CAR_BOOKING_LOCAL_STORAGE_KEY);
            return { ...newBooking };
        default:
            return state;
    }
}

export default bookingReducer
