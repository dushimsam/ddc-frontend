import {useSelector} from "react-redux";
import React, {useEffect} from "react";
import Router from "next/router";
import {getUserHref} from "../utils/validations/redirects";
import NavBar from "../components/navbar";
import Footer from "../components/Footer";


export const ForbiddenPage = ({children}) => {
    const authUser = useSelector(state => state.authUser)

    useEffect(() => {
        if (authUser.category) {
            Router.push(getUserHref(authUser)).then()
        }
    }, [authUser])

    return (
        <>
            <NavBar/>
            {children}
            <Footer/>
        </>
    )
}

export  default  ForbiddenPage;