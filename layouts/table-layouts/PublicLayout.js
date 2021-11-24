import NavBar from "../../components/navbar";
import React from "react";
import Footer from "../../components/Footer";


export default function PublicLayout({children, title}) {
    return (
        <>
            <NavBar/>
            <title>{title}</title>
            {children}
            <Footer/>
        </>
    )
}