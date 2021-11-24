export const create_booking = (car) => {
    return {
        type: 'CREATE_BOOKING',
        payload: car,
    }
}


export const destroy_booking = () => {
    return {
        type: 'DESTROY_BOOKING',
        payload: {},
    }
}