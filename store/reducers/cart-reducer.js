import {encryptObj,decryptObj} from "../../utils/encryption-decryption"
import {SHOPPING_CART_LOCAL_STORAGE_KEY} from "../../utils/constants";

let cart = [];

if (typeof window !== "undefined") {
    cart  = decryptObj(localStorage.getItem(SHOPPING_CART_LOCAL_STORAGE_KEY),SHOPPING_CART_LOCAL_STORAGE_KEY) || [];
}

const cartReducer = (state=cart,action) =>{
    let newCart,existingItem
    switch(action.type){
        case 'ADD_ITEM_TO_CART':
            action.payload.orderedQuantity = 1
            newCart = [...state,action.payload]
            localStorage.setItem(SHOPPING_CART_LOCAL_STORAGE_KEY,encryptObj(newCart))
            return [...newCart]

        case 'INCREMENT_ITEM':   
            newCart = state;

            existingItem = newCart.find(cartItem => cartItem._id == action.payload);
            console.log("Item to increment",existingItem)
            console.log("payload was"+ action.payload)
            if(!existingItem || existingItem.orderedQuantity === existingItem.quantity) return state

            existingItem.orderedQuantity +=1
            localStorage.setItem(SHOPPING_CART_LOCAL_STORAGE_KEY,encryptObj(newCart))

            return [...newCart]

        case 'DECREMENT_ITEM':               
            newCart = state;

            existingItem = state.find(cartItem => cartItem._id == action.payload);
            if(!existingItem || existingItem.orderedQuantity === 1) return state
            
            if(existingItem.orderedQuantity < 2) newCart = newCart.filter(item => item._id != action.payload )
            else existingItem.orderedQuantity -=1
            
            localStorage.setItem(SHOPPING_CART_LOCAL_STORAGE_KEY,encryptObj(newCart))

            return  [...newCart]


        case 'REMOVE_ITEM':
            newCart = state.filter(cartItem => cartItem._id != action.payload)
             localStorage.setItem(SHOPPING_CART_LOCAL_STORAGE_KEY,encryptObj(newCart))
            return newCart

        case 'DESTROY_CART':
            newCart = []
            localStorage.removeItem(SHOPPING_CART_LOCAL_STORAGE_KEY)
            return [newCart]
 
        default:
            return state
    }
}

export default cartReducer
