
import Router, {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import globalStyles from "../styles/global-colors.module.css";
import {app_config} from "../utils/constants";
import AuthService from "../services/auth/auth.service";
import {gotoPath} from "../utils/functions";
import {setAppCurrency} from "../store/actions/currency-action";
import {
    dollarCurrency,
    dubaiCurrency,
    euroCurrency,
    koreanCurrency,
    rwandanCurrency
} from "../utils/currency-converter";

export default function NavBar() {
    const authUser = useSelector((state) => state.authUser);
    const cart = useSelector((state) => state.cart);
    const [cartLength, setCartLength] = useState(0);

    const [isLoggedIn, setIsLoggedIn] = useState(true);

    useEffect(() => {
        if (authUser.fullNames) setIsLoggedIn(true);
        else setIsLoggedIn(false);

        setCartLength(cart.length);
    }, [authUser, cart]);

    const [search, setSearch] = useState("");

    const [companies, setCompanies] = useState([]);
    const [currencies, setCurrencies] = useState([rwandanCurrency, dollarCurrency, euroCurrency, koreanCurrency, dubaiCurrency]);

    const getCompanies = async () => {
        try {
            const response = await CompanyService.getAll();
            setCompanies(response.data);
            console.log("My companies ", response.data)
        } catch (err) {
            console.log(err);
        }
    };

    const router = useRouter();

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSearch();
        }
    };

    const handleSearch = () => {
        if (search !== "") {
            router
                .push({
                    pathname: "/search/results",
                    query: {text: search.trim()},
                })
                .then()
                .catch((e) => console.error(e));
        }

    };

    const logOut = () => {
        // e.preventDefault();
        AuthService.logout();
    };
    let currency = useSelector((state) => state.appCurrency);

    const dispatch = useDispatch();

    const handleSetCurrency = (curr) => {
        dispatch(setAppCurrency(curr))
    }

    useEffect(() => {
        console.log("Here currency ", currency)
    }, [currency])
    return (
        <div className="sticky-top">
            <p>THIS IS THE NAVBAR</p>
        </div>
    );
}