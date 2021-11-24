import Router from "next/router";
import {gotoPath, gotoPathDirect, openInNewTabWinBrowser} from "./functions";
import {app_config} from "./constants";
import {doubleEncryption} from "./encryption-decryption";

const moveTo = (path, link) => {
    openInNewTabWinBrowser(path + "?subject=" + doubleEncryption(link));
}

const moveToAddition = (path, link, addition) => {
    openInNewTabWinBrowser(path + "?subject=" + doubleEncryption(link) + "&addition=" +
        addition
    );
}


export const handleGoTo = (notification) => {

    switch (notification.type) {
        case 'DIRECT_PURCHASE':
            moveTo("/shared/direct-purchases", notification.link);
            break;
        case 'SUPPLY_MADE':
            moveTo("/shared/supply/supplies", notification.link);
            break;
        case 'NEW_CUSTOMER_REVIEW':
            moveToAddition("/admin/feedbacks/messages/reply", notification.link, "CUSTOMER_REVIEW")
            break;
        case 'NEW_CONTACT_MESSAGE':
            moveToAddition("/admin/feedbacks/messages/reply", notification.link, "CONTACT_US")
            break;
        case 'NEW_SHIPPING_ORIGIN':
            moveTo("/admin/delivery/ports/origins", notification.link);
            break;
        case 'NEW_DELIVERY_PORT':
            moveTo("/admin/delivery/ports", notification.link);
            break;
        case 'NEW_VEHICLE_TYPE':
            moveTo("/admin/cars/vehicle-types", notification.link);
            break;
        case 'CAR_ORDER_DELIVERED':
            moveTo("/admin/cars/orders", notification.link);
            break;
        case 'CAR_ORDER_SHIPPED':
            Router.push(gotoPathDirect("/customer/order/payment", notification.link));
            break;
        case 'PAYMENT_FAILED':
            // Router.push(gotoPathDirect("/customer/order/payment", getOrderFromCarOrderPayment(notification.link)._id));
            break;
        case 'PAYMENT_RECEIVED':
            // Router.push(gotoPathDirect("/customer/order/payment", getOrderFromCarOrderPayment(notification.link)._id));
            break;
        case 'BOOK_SUCCESS':
            Router.push(gotoPathDirect("/customer/order/payment", notification.link));
            break;
        case 'BOOK_FAILURE':
            Router.push(gotoPathDirect("/customer/book-now/review", notification.link));
            break;
        case 'PAID_CAR_ORDER':
            moveTo("/admin/cars/payments/orders", notification.link);
            break;
        case 'ORDER_PAYED':
            moveToAddition("/order/invoice", notification.link, "ORDER_FROM_PAYMENT")
            break;
        case 'NEW_BOOKING':
            moveTo("/admin/bookings", notification.link);
            break;

        case 'NEW_SHIPPER_CREATED':
            moveTo("/shared/shippers", notification.link);
            break;

        case 'CAR_PURCHASE_MARKED_AS_PAID':
            moveToAddition("/order/invoice", notification.link, "DIRECT_PURCHASE")
            break;
        case 'NEW_ORDER':
            moveTo("/shared/orders", notification.link);
            break;
        case 'DIRECT_PURCHASE_DELETION':
            moveTo("/shared/direct-purchases", notification.link);
            break;
        case 'SUPPLY_DELETION':
            moveTo("/shared/supply/supplies", notification.link);
            break;
        case 'DELIVERY_CONFIRMATION':
            moveTo("/shared/orders", notification.link);
            break;
        case 'ORDER_GOES_TO_SHIPPING':
            moveTo("/customer/my-orders/part-orders", notification.link)
            break;
        default:
            console.log("invalid type ", notification.type)
    }
}
