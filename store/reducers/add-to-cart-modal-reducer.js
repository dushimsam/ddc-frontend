let showOrNot = {show:false,product:{}}


const showAddToCartModalReducer = (state=showOrNot,action) =>{
    switch(action.type){
        case 'SHOW_ADD_TO_CART_MODAL':
            return {...state,show:true,product:action.payload}
        case 'HIDE_ADD_TO_CART_MODAL':
            return {...state,show:false}
        default:
            return state
    }
}

export default showAddToCartModalReducer