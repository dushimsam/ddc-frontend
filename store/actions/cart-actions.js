export const addItemToCart = (product) =>{    
    return {
        type: 'ADD_ITEM_TO_CART',
        payload: product,
    }
}

export const increment = (productId) =>{
    return {
        type: 'INCREMENT_ITEM',
        payload: productId,
    }
}

export const decrement = (productId) =>{
    return {
        type: 'DECREMENT_ITEM',
        payload: productId,
    }
}
export const removeItem = (productId) =>{
    return {
        type: 'REMOVE_ITEM',
        payload: productId,
    }
}

export const destroyCart = () =>{
    return {
        type: 'DESTROY_CART',
        payload: {},
    }
}