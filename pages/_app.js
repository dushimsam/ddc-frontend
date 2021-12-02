import 'bootstrap/dist/css/bootstrap.min.css';
import "swiper/swiper-bundle.css";
import '../styles/globals.css'
import "../styles/loading.css";

import 'popper.js';


// import { io } from "socket.io-client";
import UserService from "../services/users/user.service";
import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress
import {updateJavaScriptObject} from '../utils/functions'

import {Provider, useDispatch} from 'react-redux';
import reducer from '../store/reducers';
import {createStore} from "redux";
import {useEffect} from "react";
import AuthService from "../services/auth/auth.service";
import jwt from "jwt-decode";
import {setAuthUser} from "../store/actions";
import Head from "next/head";
import Snack from "../components/reusable/snackbar"
import {details} from "../utils/site-traffic";
import SiteTrafficService from "../services/site-traffic";
import {app_config, DEVICE_DETAILS_LOCAL_STORAGE_KEY} from "../utils/constants";
import AddToCartModel from "../components/products/addToCartModel";

NProgress.configure({showSpinner: false});
//Binding events.
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());


let store = createStore(reducer);

if (typeof window !== "undefined") {


    store = createStore(
        reducer, /* preloadedState, */
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
}

function AppMeta() {

    // console.log("here vin ",decode("KMHJ3815GJU487164"))
    useEffect(() => {
        setUser();
    })
    const dispatch = useDispatch();

    const setUser = () => {
        if (AuthService.isLoggedIn()) {
            if (!AuthService.tokenExpired()) {
                const token = AuthService.getDecToken()
                UserService.get(jwt(token).id).then((res) => {
                    const curr_user = updateJavaScriptObject(jwt(token), res.data)
                    // console.log("Curr user ",curr_user)
                    curr_user.fullNames = res.data.firstName + " " + res.data.lastName
                    dispatch(setAuthUser(curr_user))
                }).catch(e => console.log(e))
            }
        }
    }

    return (
        <div>
            <Head>
                <title>{app_config.APP_NAME}</title>
                <meta name={"description"}
                      content={"You can book , order , shop or buy Korean Cars and their Spare parts on a reasonable price."}/>
                <meta property={"og:title"} content={"Online Shopping"}/>
                <link rel="icon" href="/favicon_io/favicon.ico"/>
                <meta name="keywords" content="e-commerce,online-store,korean-cars,spare-parts,book,buy"/>
                <meta name="application-name" content="KoreaAutoParts And Cars"/>
                <meta name="author" content="Grapes Team"/>
                <meta property="og:description"
                      content={"You can book , order , shop or buy Korean Cars and their Spare parts on a reasonable price."}/>
            </Head>
        </div>
    );
}


function MyApp({Component, pageProps}) {

    useEffect(() => {
        (async function () {
            try {
                let detail = await details()
                if (!sessionStorage.getItem(DEVICE_DETAILS_LOCAL_STORAGE_KEY)) {
                    sessionStorage.setItem(DEVICE_DETAILS_LOCAL_STORAGE_KEY, JSON.stringify(detail))
                    try {
                        await SiteTrafficService.create(detail);
                    } catch {
                        (e) => console.log(e)
                    }
                }
            } catch {
                (e) => console.log(e)
            }

        })()

        import("jquery").then($ => {
            // jQuery must be installed to the `window`:
            window.$ = window.jQuery = $;
            return import("bootstrap");
        });
    }, []);
    return (
        <Provider store={store}>
            <div>
                <Snack/>
                <AppMeta/>
                <Component {...pageProps} />
                <AddToCartModel/>
            </div>
        </Provider>
    )

}

export default MyApp;
