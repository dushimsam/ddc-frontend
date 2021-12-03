import React from "react";
import {system_users} from "./constants";

export const customerLinks = [

    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="none" d="M0 0H24V24H0z"/>
                <path
                    d="M5.5 20c.828 0 1.5.672 1.5 1.5S6.328 23 5.5 23 4 22.328 4 21.5 4.672 20 5.5 20zm13 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zM2.172 1.757l3.827 3.828V17L20 17v2H5c-.552 0-1-.448-1-1V6.413L.756 3.172l1.415-1.415zM16 3c.552 0 1 .448 1 1v2h2.993C20.55 6 21 6.456 21 6.995v8.01c0 .55-.45.995-1.007.995H8.007C7.45 16 7 15.544 7 15.005v-8.01C7 6.445 7.45 6 8.007 6h2.992L11 4c0-.552.448-1 1-1h4zm-6 5H9v6h1V8zm6 0h-4v6h4V8zm3 0h-1v6h1V8zm-4-3h-2v1h2V5z"
                    fill="rgba(52,72,94,1)"/>
            </svg>
        ),
        name: "Orders",
        href: "/customer/my-orders"
    },

    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="none" d="M0 0h24v24H0z"/>
                <path
                    d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 0 1-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3zm5.907 8.06l1.47-1.424a.472.472 0 0 0-.656-.678l-1.928 1.866V9.282a.472.472 0 0 0-.944 0v2.557a.471.471 0 0 0 0 .222V13.5a.472.472 0 0 0 .944 0v-1.363l.427-.413 1.428 2.033a.472.472 0 1 0 .773-.543l-1.514-2.155zm-2.958 1.924h-1.46V9.297a.472.472 0 0 0-.943 0v4.159c0 .26.21.472.471.472h1.932a.472.472 0 1 0 0-.944zm-5.857-1.092l.696-1.707.638 1.707H9.092zm2.523.488l.002-.016a.469.469 0 0 0-.127-.32l-1.046-2.8a.69.69 0 0 0-.627-.474.696.696 0 0 0-.653.447l-1.661 4.075a.472.472 0 0 0 .874.357l.33-.813h2.07l.299.8a.472.472 0 1 0 .884-.33l-.345-.926zM8.293 9.302a.472.472 0 0 0-.471-.472H4.577a.472.472 0 1 0 0 .944h1.16v3.736a.472.472 0 0 0 .944 0V9.774h1.14c.261 0 .472-.212.472-.472z"
                    fill="rgba(231,76,60,1)"/>
            </svg>
        ),
        name: "Your Review",
        href: "/customer/talk-to-us"
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="none" d="M0 0h24v24H0z"/>
                <path
                    d="M20 22h-2v-2a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v2H4v-2a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v2zm-8-9a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
                    fill="rgba(52,72,94,1)"/>
            </svg>
        ),
        name: "Account",
        href: "/customer/account"
    },
]

export const shipperLinks = []

export const salesManagerLinks = []


export const adminLinks = [

    {
        name: "Brands",
        href: "/admin/categories",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                <path fill="none" d="M0 0h24v24H0z"/>
                <path
                    d="M7 7V3a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-4v3.993c0 .556-.449 1.007-1.007 1.007H3.007A1.006 1.006 0 0 1 2 20.993l.003-12.986C2.003 7.451 2.452 7 3.01 7H7zm2 0h6.993C16.549 7 17 7.449 17 8.007V15h3V4H9v3z"
                    fill="rgba(112,112,112,1)"/>
            </svg>
        )
    },
    {
        name: "Products",
        href: "/admin/products",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                <path fill="none" d="M0 0h24v24H0z"/>
                <path
                    d="M13.12 17.023l-4.199-2.29a4 4 0 1 1 0-5.465l4.2-2.29a4 4 0 1 1 .959 1.755l-4.2 2.29a4.008 4.008 0 0 1 0 1.954l4.199 2.29a4 4 0 1 1-.959 1.755zM6 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm11-6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
                    fill="rgba(112,112,112,1)"/>
            </svg>
        )
    },
    {
        name: "Delivery",
        href: "/admin/delivery",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                <path fill="none" d="M0 0h24v24H0z"/>
                <path
                    d="M5 9a1 1 0 0 1 1 1 6.97 6.97 0 0 1 4.33 1.5h2.17c1.333 0 2.53.58 3.354 1.5H19a5 5 0 0 1 4.516 2.851C21.151 18.972 17.322 21 13 21c-2.79 0-5.15-.603-7.06-1.658A.998.998 0 0 1 5 20H2a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h3zm1.001 3L6 17.022l.045.032C7.84 18.314 10.178 19 13 19c3.004 0 5.799-1.156 7.835-3.13l.133-.133-.12-.1a2.994 2.994 0 0 0-1.643-.63L19 15h-2.111c.072.322.111.656.111 1v1H8v-2l6.79-.001-.034-.078a2.501 2.501 0 0 0-2.092-1.416L12.5 13.5H9.57A4.985 4.985 0 0 0 6.002 12zM4 11H3v7h1v-7zm14-6a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-7-5a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
                    fill="rgba(112,112,112,1)"/>
            </svg>
        )
    },
    {
        name: "Customers",
        href: "/admin/customers",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                <path fill="none" d="M0 0h24v24H0z"/>
                <path
                    d="M19.938 8H21a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-1.062A8.001 8.001 0 0 1 12 23v-2a6 6 0 0 0 6-6V9A6 6 0 1 0 6 9v7H3a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1.062a8.001 8.001 0 0 1 15.876 0zM3 10v4h1v-4H3zm17 0v4h1v-4h-1zM7.76 15.785l1.06-1.696A5.972 5.972 0 0 0 12 15a5.972 5.972 0 0 0 3.18-.911l1.06 1.696A7.963 7.963 0 0 1 12 17a7.963 7.963 0 0 1-4.24-1.215z"
                    fill="rgba(112,112,112,1)"/>
            </svg>
        )
    },
    {
        key: "ORDERS",
        name: "Orders",
        icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
            <path fill="none" d="M0 0h24v24H0z"/>
            <path
                d="M8.965 18a3.5 3.5 0 0 1-6.93 0H1V6a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2h3l3 4.056V18h-2.035a3.5 3.5 0 0 1-6.93 0h-5.07zM15 7H3v8.05a3.5 3.5 0 0 1 5.663.95h5.674c.168-.353.393-.674.663-.95V7zm2 6h4v-.285L18.992 10H17v3zm.5 6a1.5 1.5 0 1 0 0-3.001 1.5 1.5 0 0 0 0 3.001zM7 17.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z"
                fill="rgba(112,112,112,1)"/>
        </svg>,
        href: '/shared/orders'
    },
    {
        name: "Supply",
        href: "/shared/supply",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                <path fill="none" d="M0 0h24v24H0z"/>
                <path
                    d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm1.334-8a1.5 1.5 0 0 0 0-3H10.5v3h2.834zm0-5a3.5 3.5 0 0 1 0 7H10.5v3h-2V7h4.834z"
                    fill="rgba(112,112,112,1)"/>
            </svg>
        )
    },
    {
        name: "Payments",
        href: "/shared/payments/cash",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                <path fill="none" d="M0 0h24v24H0z"/>
                <path
                    d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-3.5-6H14a.5.5 0 1 0 0-1h-4a2.5 2.5 0 1 1 0-5h1V6h2v2h2.5v2H10a.5.5 0 1 0 0 1h4a2.5 2.5 0 1 1 0 5h-1v2h-2v-2H8.5v-2z"
                    fill="rgba(112,112,112,1)"/>
            </svg>
        )
    }
    ,
    // {
    //     name: "App updates",
    //     href: "/admin/app-updates",
    //     icon: (
    //         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
    //             <path fill="none" d="M0 0h24v24H0z"/>
    //             <path fill="rgba(112,112,112,1)"
    //                   d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm4.82-4.924A7 7 0 0 0 9.032 5.658l.975 1.755A5 5 0 0 1 17 12h-3l2.82 5.076zm-1.852 1.266l-.975-1.755A5 5 0 0 1 7 12h3L7.18 6.924a7 7 0 0 0 7.788 11.418z"/>
    //         </svg>
    //     )
    // },
    {
        name: "FeedBacks",
        href: "/admin/feedbacks",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                <path fill="none" d="M0 0h24v24H0z"/>
                <path
                    d="M14 22.5L11.2 19H6a1 1 0 0 1-1-1V7.103a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1V18a1 1 0 0 1-1 1h-5.2L14 22.5zm1.839-5.5H21V8.103H7V17H12.161L14 19.298 15.839 17zM2 2h17v2H3v11H1V3a1 1 0 0 1 1-1z"
                    fill="rgba(112,112,112,1)"/>
            </svg>
        )
    },
    {
        name: "Account",
        href: "/admin/account",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                <path fill="none" d="M0 0h24v24H0z"/>
                <path
                    d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-4.987-3.744A7.966 7.966 0 0 0 12 20c1.97 0 3.773-.712 5.167-1.892A6.979 6.979 0 0 0 12.16 16a6.981 6.981 0 0 0-5.147 2.256zM5.616 16.82A8.975 8.975 0 0 1 12.16 14a8.972 8.972 0 0 1 6.362 2.634 8 8 0 1 0-12.906.187zM12 13a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
                    fill="rgba(112,112,112,1)"/>
            </svg>
        )
    }
]

export const quickCreateActions = [
    {
        name: "Category",
        href: "categories/new"
    },
    {
        name: "Employee",
        href: "employees/new"
    },
    {
        name: "Supplier",
        href: "not-available"
    },
    {
        name: "Delivery",
        href: "delivery/new"
    },
    {
        name: "Products",
        href: "products/new"
    },
    {
        name: "App update",
        href: "app-updates/new"
    }

]


export const getDashboardLink = (user) => {
    switch (user.category?.name) {
        case system_users.CUSTOMER:
            return "/customer";
        case system_users.ADMIN:
            return "/admin";
        case system_users.SHIPPER:
            return "/shipper";
        default:
            return "/sales-manager";
    }
}