import Styles from "../../styles/pages/about-us.module.css"
import React from "react"
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer";
import {app_config} from "../../utils/constants";
import Head from "next/head";


const CallUsComponent = () => {
    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-3">
                    <div
                        className="footer-icon d-flex align-items-center text-center justify-content-center rounded-circle cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30">
                            <path fill="none" d="M0 0h24v24H0z"/>
                            <path
                                d="M9.366 10.682a10.556 10.556 0 0 0 3.952 3.952l.884-1.238a1 1 0 0 1 1.294-.296 11.422 11.422 0 0 0 4.583 1.364 1 1 0 0 1 .921.997v4.462a1 1 0 0 1-.898.995c-.53.055-1.064.082-1.602.082C9.94 21 3 14.06 3 5.5c0-.538.027-1.072.082-1.602A1 1 0 0 1 4.077 3h4.462a1 1 0 0 1 .997.921A11.422 11.422 0 0 0 10.9 8.504a1 1 0 0 1-.296 1.294l-1.238.884zm-2.522-.657l1.9-1.357A13.41 13.41 0 0 1 7.647 5H5.01c-.006.166-.009.333-.009.5C5 12.956 11.044 19 18.5 19c.167 0 .334-.003.5-.01v-2.637a13.41 13.41 0 0 1-3.668-1.097l-1.357 1.9a12.442 12.442 0 0 1-1.588-.75l-.058-.033a12.556 12.556 0 0 1-4.702-4.702l-.033-.058a12.442 12.442 0 0 1-.75-1.588z"
                                fill="rgba(231,76,60,1)"/>
                        </svg>
                    </div>
                </div>
                <div className="col-6">
                    <p className="h6">Call Us Directly</p>
                    <p className="mt-2">+250 788526512 / +250 788656653</p>
                </div>
            </div>


            <div className="row mt-3">
                <div className="col-3">
                    <div
                        className="footer-icon d-flex align-items-center text-center justify-content-center rounded-circle cursor-pointer">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="27"
                            height="27"
                        >
                            <path fill="none" d="M0 0h24v24H0z"/>
                            <path
                                d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm17 4.238l-7.928 7.1L4 7.216V19h16V7.238zM4.511 5l7.55 6.662L19.502 5H4.511z"
                                fill="rgba(231,76,60,1)"
                            />
                        </svg>
                    </div>

                </div>
                <div className="col-6">
                    <p className="h6">Email Us</p>
                    <p className="mt-2">info@koreaautop.com</p>
                </div>
            </div>


            <div className="row mt-3">
                <div className="col-3">
                    <div
                        className="footer-icon d-flex align-items-center text-center justify-content-center rounded-circle cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="27" height="27">
                            <path fill="none" d="M0 0h24v24H0z"/>
                            <path
                                d="M2.004 22l1.352-4.968A9.954 9.954 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.954 9.954 0 0 1-5.03-1.355L2.004 22zM8.391 7.308a.961.961 0 0 0-.371.1 1.293 1.293 0 0 0-.294.228c-.12.113-.188.211-.261.306A2.729 2.729 0 0 0 6.9 9.62c.002.49.13.967.33 1.413.409.902 1.082 1.857 1.971 2.742.214.213.423.427.648.626a9.448 9.448 0 0 0 3.84 2.046l.569.087c.185.01.37-.004.556-.013a1.99 1.99 0 0 0 .833-.231c.166-.088.244-.132.383-.22 0 0 .043-.028.125-.09.135-.1.218-.171.33-.288.083-.086.155-.187.21-.302.078-.163.156-.474.188-.733.024-.198.017-.306.014-.373-.004-.107-.093-.218-.19-.265l-.582-.261s-.87-.379-1.401-.621a.498.498 0 0 0-.177-.041.482.482 0 0 0-.378.127v-.002c-.005 0-.072.057-.795.933a.35.35 0 0 1-.368.13 1.416 1.416 0 0 1-.191-.066c-.124-.052-.167-.072-.252-.109l-.005-.002a6.01 6.01 0 0 1-1.57-1c-.126-.11-.243-.23-.363-.346a6.296 6.296 0 0 1-1.02-1.268l-.059-.095a.923.923 0 0 1-.102-.205c-.038-.147.061-.265.061-.265s.243-.266.356-.41a4.38 4.38 0 0 0 .263-.373c.118-.19.155-.385.093-.536-.28-.684-.57-1.365-.868-2.041-.059-.134-.234-.23-.393-.249-.054-.006-.108-.012-.162-.016a3.385 3.385 0 0 0-.403.004z"
                                fill="rgba(231,76,60,1)"/>
                        </svg>
                    </div>
                </div>
                <div className="col-6">
                    <p className="h6">WhatsApp</p>
                    <p className="mt-2">+250 788656653</p>
                </div>
            </div>


            <div className="row mt-3">
                <div className="col-3">
                    <div
                        className="footer-icon d-flex align-items-center text-center justify-content-center rounded-circle cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="27" height="27">
                            <path fill="none" d="M0 0h24v24H0z"/>
                            <path
                                d="M18.364 17.364L12 23.728l-6.364-6.364a9 9 0 1 1 12.728 0zM12 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0-2a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
                                fill="rgba(231,76,60,1)"/>
                        </svg>
                    </div>
                </div>
                <div className="col-6">
                    <p className="h6">KN 1 RD , house 11</p>
                    <p className="mt-2">KIGALI-RWANDA MUHIMA, NYARUGENGE</p>
                </div>
            </div>


        </div>)
}
const CompanyContactPart = () => {
    return (
        <div className="container pt-5">
            <div className="row">
                <div className="col-12 text-center">
                    <h4>Reach Out</h4>
                </div>
                <CallUsComponent/>
            </div>
        </div>
    )
}


const MissionPart = () => {
    return (
        <div className="container pt-5">
            <div className="row justify-content-center">
                <div className="col-12 text-center">
                    <h4>Our Mission</h4>
                </div>
                <div className="col-12 p-4">
                    <p>
                        We are specialists in supplying genuine brand new cars like Sedans, SUV’s, Pickup Trucks, Bus
                        Van, Xtreme edition vehicles etc..for customers spread across the world. Our product range
                        extends from low cost budget vehicles to premium luxury riding options and our association with
                        leading brands ensure that the customer is always endowed with superior quality, value for money
                        and the best solution for their transporting needs.
                    </p>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-3">

                </div>
            </div>
        </div>
    )
}
const Page = () => {
    return (
        <React.Fragment>
            <Head>
                <title>
                    {" About Us"} | {app_config.APP_NAME}{" "}
                </title>
                <meta name={"description"}
                      content={"Know more about " + app_config.APP_NAME}/>
                <meta property={"og:title"}
                      content={"About " + app_config.APP_NAME}/>
            </Head>
            <Navbar/>
            <div className="header">
                <div className="overlay">
                    <div className={"text-center pb-5 " + Styles.jumbotron}>
                        <div className="pb-md-5">
                            <h2 className={"pb-4 " + Styles.title}>{app_config.APP_NAME}</h2>
                            <p className="col-lg-10 mx-auto px-4 lg-px-5">Welcome to the KoreaAutoParts&Cars
                                store: a convenient way to buy Korean Cars , Genuine New Parts and accessories for Your
                                Vehicle.
                                Our products does not just stand for dynamics and efficiency. It also stands for
                                quality and reliability. Qualities like safety, fitting accuracy and performance are of
                                the utmost importance.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container bg-darkish mb-5 pb-5 shadow-md mt-md-n5">
                <div className="row justify-content-md-between justify-content-center">
                    <div className="col-md"/>
                    <div className="col-md-4 col-10 bg-light mt-5">
                        <CompanyContactPart/>
                    </div>
                    <div className="col-md"/>
                    <div className="col-md-6 col-10 bg-light mt-5">
                        <MissionPart/>
                    </div>
                    <div className="col-md"/>
                </div>
            </div>
            <div className="justify-content-end">
                <a href="#myPage" title="To Top">
                    <span className="glyphicon glyphicon-chevron-up"/>
                </a>
            </div>
            <Footer/>
        </React.Fragment>
    )
}


export default Page;