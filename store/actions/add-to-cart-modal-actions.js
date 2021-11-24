export const showAddToCartModal= (product) =>{    
    return {
        type: 'SHOW_ADD_TO_CART_MODAL',
        payload: product,
    }
}

export const hideAddToCartModal = () =>{
    return {
        type: 'HIDE_ADD_TO_CART_MODAL',
    }
}
