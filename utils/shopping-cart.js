export default function findTotalPrice(cart, delivery_price, status, discount) {
    let toPay = {subTotal: 0, quantity: 0, total: 0, delivery: 0, sub_total_with_discount: 0, total_discount: 0}

    if (status === "ORDER") {
        cart.map(item => {
            toPay.subTotal += item.price;
            toPay.quantity += item.quantity;
        })
    } else {
        cart.map(item => {
            toPay.subTotal += item.orderedQuantity * item.unit_price;
            toPay.quantity += item.orderedQuantity;
        })
    }
    toPay.total_discount = discount;
    toPay.sub_total_with_discount = toPay.subTotal - discount;
    toPay.delivery = calculateTotalShipping(delivery_price, cart, status)
    toPay.total = toPay.subTotal + toPay.delivery
    toPay.total_with_discount = toPay.sub_total_with_discount + toPay.delivery

    return toPay
}


const calculateTotalShipping = (deliveryFrancs, cartItems, status) => {
    let total = 0

    if (status === "ORDER") {
        for (const item of cartItems) {
            total += (item.product.product.weight * deliveryFrancs * item.quantity)
        }
    } else {
        for (const item of cartItems) {
            total += (item.product.weight * deliveryFrancs * item.orderedQuantity)
        }
    }


    return total;
}

export function getShippingPrice(deliverFrancs, cartItems) {
    return calculateTotalShipping(deliverFrancs, cartItems);
}

export function getOrderToTalPrice(cartItems) {
    let total = 0
    for (const item of cartItems) total += item.unit_price * item.quantity

    return total;
}