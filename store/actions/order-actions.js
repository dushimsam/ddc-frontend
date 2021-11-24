export const create_order = (order) =>{
    return {
        type: 'CREATE_ORDER',
        payload: order,
    }
}

export const add_delivery = (delivery) =>{
    return {
        type: 'ADD_DELIVERY',
        payload: delivery,
    }
}

export const add_ordered_parts = (products) =>{
    return {
        type: 'ADD_ORDERED_PARTS',
        payload: products,
    }
}

export const addCoupon = (discount) =>{
     return {
        type: 'ADD_DISCOUNT',
        payload: discount,
    }
}

export const addPaymentDetails = (values) =>{
    return {
        type: 'ADD_PAYMENT_METHODS',
        payload: values,
    }
}

export const addProcessedDara = (values) => {
  return {
    type: "ADD_PROCESSED_DATA",
    payload: values,
  };
};

export const destroyOrder = () =>{
      return {
        type: 'DESTROY_ORDER',
        payload: {},
    }
}