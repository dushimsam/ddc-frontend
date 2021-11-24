import {combineReducers} from 'redux'
import cartReducer from "./cart-reducer";
import showAddToCartModalReducer from './add-to-cart-modal-reducer'
import orderReducer from "./order-reducer";
import bookingReducer from "./car-booking-reducer";
import currencyReducer from "./currency-reducer";

const authUser = (state = {}, action) => {
    switch (action.type) {
        case 'SET_AUTH_USER':
            return action.payload;
        default:
            return state
    }
}


const reducers = combineReducers({
    cart: cartReducer,
    authUser: authUser,
    showAddToCartModal: showAddToCartModalReducer,
    order: orderReducer,
    carBooking: bookingReducer,
    appCurrency: currencyReducer
})


export default reducers;
