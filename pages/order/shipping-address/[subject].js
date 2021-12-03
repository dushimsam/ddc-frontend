import Navbar from "../../../components/navbar";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import ShipmentService from "../../../services/shipments/shipment.service";
import CustomerService from "../../../services/customers/customer.service";
import OrderService from "../../../services/orders/orders";
import {add_delivery, create_order, destroyOrder} from "../../../store/actions/order-actions";
import Router, {useRouter} from "next/router";
import Head from "next/head";
import findTotalPrice from "../../../utils/shopping-cart";
import RouteProtector from "../../../middlewares/RouteProtector";
import {app_config, system_users} from "../../../utils/constants";
import Link from "next/link";
import globalStyles from "../../../styles/global-colors.module.css"
import Footer from "../../../components/Footer";
import {notifyInfo, notifySuccess} from "../../../utils/alerts";
import {gotoPathDirect, handleDoubleDecryptionPath} from "../../../utils/functions";

export default function PayOrder() {
    const dispatch = useDispatch();
    const authUser = useSelector((state) => state.authUser);
    const cart = useSelector((state) => state.cart);
    let local_order = useSelector((state) => state.order);

    const [order, setOrder] = useState(null)
    const [countries, setCountries] = useState([]);
    const [regions, setRegions] = useState([]);
    const [zones, setZones] = useState([]);
    const [loading, setLoading] = useState(false);

    const [regionsInSelectedCountry, setRegionsInSelectedCountry] = useState([]);
    const [zonesInSelectedRegions, setZonesInSelectedRegions] = useState([]);

    const getCountries = () => {
        ShipmentService.getDeliveryCountries()
            .then((res) => {
                setCountries(res.data);
            })
            .catch((err) => console.error(err));
    };
    const getRegions = () => {
        ShipmentService.getDeliveryRegions()
            .then((res) => {
                setRegions(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const getZones = () => {
        ShipmentService.getDeliveryZones()
            .then((res) => {
                setZones(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    };
    const router = useRouter();

    useEffect(() => {
        getCountries();
        getRegions();
        getZones();
    }, [router.query.subject])

    const [initialStatus, setInitialStatus] = useState(null);


    const handleSetOrder = (id) => {
        OrderService.get(id)
            .then((res) => {
                if (res.data.status !== "INITIATED" && res.data.status !== "PAYING") {
                    dispatch(destroyOrder());
                    setInitialStatus("CREATE")
                } else {
                    setOrder(res.data)
                    setInitialStatus("UPDATE")
                    setSelectedDelivery({
                        zone: res.data.delivery_zone._id,
                        region: res.data.delivery_zone.region._id,
                        country: res.data.delivery_zone.region.country._id
                    });
                    setDefaultValues({
                        zone: res.data.delivery_zone._id,
                        region: res.data.delivery_zone.region._id,
                        country: res.data.delivery_zone.region.country._id
                    })
                    setRegionsInSelectedCountry(regions.filter((region) => region.country?._id === res.data.delivery_zone.region.country._id))
                    setZonesInSelectedRegions(zones.filter((zone) => zone.region?._id === res.data.delivery_zone.region._id));
                }
            }).catch((err) => {
            console.log(err);
            window.history.back();
        })
    }

    function isEmpty(obj) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                return false;
            }
        }

        return JSON.stringify(obj) === JSON.stringify({});
    }

    useEffect(() => {

        if (regions.length > 0 && zones.length > 0 && router.query.subject) {
            const router_order = handleDoubleDecryptionPath(router.query.subject);

            if (router_order === "INITIAL") {
                if (cart.length < 1 && isEmpty(local_order)) {
                    Router.push("/cart/my-cart")
                } else {
                    if (cart.length > 0 && isEmpty(local_order)) {
                        setInitialStatus("CREATE")
                    } else {
                        handleSetOrder(local_order.order._id)
                    }
                }
            } else {
                handleSetOrder(router_order)
            }
        }
    }, [regions, zones, router.query.subject])


    const [selectedDelivery, setSelectedDelivery] = useState({
        country: "",
        region: "",
        zone: "",
    });

    const [defaultValues, setDefaultValues] = useState({
        country: "",
        region: "",
        zone: "",
    })

    const handleChange = (prop) => (event) => {
        if (prop === "country") {
            setRegionsInSelectedCountry(
                regions.filter((region) => region.country?._id === event.target.value)
            );
        } else if (prop === "region") {
            setZonesInSelectedRegions(
                zones.filter((zone) => zone.region?._id === event.target.value)
            );
        }
        setSelectedDelivery({...selectedDelivery, [prop]: event.target.value});
    };

    const UpdateOrder = async (customer) => {

        if (order.status === "INITIATED" || order.status === "PAYING") {
            const totalToPay = findTotalPrice(
                cart,
                zones.find((zone) => zone._id === selectedDelivery.zone)
            );

            OrderService.updateOrder(order._id, {
                customer: customer._id,
                delivery_zone: selectedDelivery.zone,
                total_order_price: findTotalPrice
            }).then((order) => {
                const delivery = {
                    country: countries.find(
                        (country) => country._id === selectedDelivery.country
                    ),
                    region: regions.find(
                        (region) => region._id === selectedDelivery.region
                    ),
                    zone: zones.find((zone) => zone._id === selectedDelivery.zone),
                };
                dispatch(create_order(order.data));
                dispatch(add_delivery(delivery))
                notifySuccess("Successfully updated the shipping address");
                window.setTimeout(() => {
                    Router.push(gotoPathDirect("/order/review", order.data._id))
                }, 2000)
            })
                .catch((err) => {
                    console.error(err);
                }).finally(() => {
                setLoading(false);
            })
        }

    }

    const CreateOrder = async (customer) => {


        OrderService.createOrder({
            customer: customer._id,
            delivery_zone: selectedDelivery.zone
        })
            .then((order) => {
                const delivery = {
                    country: countries.find(
                        (country) => country._id === selectedDelivery.country
                    ),
                    region: regions.find(
                        (region) => region._id === selectedDelivery.region
                    ),
                    zone: zones.find((zone) => zone._id === selectedDelivery.zone),
                };
                dispatch(create_order(order.data));
                dispatch(add_delivery(delivery));
                notifySuccess("Successfully initiated order");
                notifyInfo("Two processes remaining")

                window.setTimeout(() => {
                    Router.push(gotoPathDirect("/order/review", order.data._id))
                }, 4000);
            })
            .catch((err) => {
                console.error(err);
            }).finally(() => {
            setLoading(false);
        })
    }

    const handleGoNext = async () => {
        let customer = await CustomerService.getCustomer(authUser.id);
        customer = customer.data;
        if (!customer._id) Router.push("/auth/login");

        if (initialStatus === "CREATE") {
            setLoading(true);
            await CreateOrder(customer);
        } else {
            if (JSON.stringify(defaultValues) !== JSON.stringify(selectedDelivery))
                await UpdateOrder(customer);
            else
                await Router.push(gotoPathDirect("/order/review", order._id))
        }
    };

    return (
        <RouteProtector only={[system_users.CUSTOMER]}>
            <div className="container-fluid p-0 m-0 bg-light">
                <Head>
                    <title>Shipping information | {app_config.APP_NAME}</title>
                    <link rel="icon" href={"/favicon.ico"}/>
                </Head>
                <Navbar/>
                <div className="bg-lightgray">
                    <div className="container col-md-8 px-sm-3 px-md-5 bg-white py-4 my-4">
                        <h3 className="text-left text-secondary pt-4 font-weight-bold">
                            SHIPPING INFORMATION
                        </h3>
                        <p className="text-secondary" style={{fontSize: '14px'}}>
                            Choose your desired location
                        </p>
                        <hr/>
                        <div className="mt-4" style={{color: '#707070'}}>
                            <div className="form-group">
                                <label htmlFor="">Select Country</label>
                                {
                                    <select
                                        className="form-control form-control"
                                        style={{color: '#707070', fontSize: '13px'}}
                                        onChange={handleChange("country")}
                                        value={selectedDelivery.country}
                                    >
                                        <option>Select Country</option>
                                        {countries.map((country) => (
                                            <option value={country._id} key={country._id}>
                                                {country.country}
                                            </option>
                                        ))}
                                    </select>
                                }
                            </div>
                            <div className="form-group mt-4">
                                <label htmlFor="">Select Region</label>
                                {
                                    <select
                                        value={selectedDelivery.region}
                                        className="form-control form-control"
                                        style={{color: '#707070', fontSize: '13px'}}
                                        onChange={handleChange("region")}
                                    >
                                        <option>Region</option>
                                        {regionsInSelectedCountry.map((region) => (
                                            <option value={region._id} key={region._id}>
                                                {region.region}
                                            </option>
                                        ))}
                                    </select>
                                }
                            </div>
                            <div className="form-group mt-4">
                                <label htmlFor="">Select Zone</label>
                                {
                                    <select
                                        className="form-control form-control"
                                        onChange={handleChange("zone")}
                                        style={{color: '#707070', fontSize: '13px'}}
                                        value={selectedDelivery.zone}
                                    >
                                        <option>Zone</option>
                                        {zonesInSelectedRegions.map((zone) => {
                                            return (
                                                <option value={zone._id} key={zone._id}>
                                                    {zone.zone}
                                                </option>
                                            );
                                        })}
                                    </select>
                                }
                            </div>
                        </div>
                        <div className="row pt-4 mb-4">
                            <div className="col text-left">
                                <Link href="/cart/my-cart" passHref>
                                    <button className={"btn btn-secondary px-5"} style={{fontSize: '14px'}}>
                                        Cancel
                                    </button>
                                </Link>
                            </div>
                            <div className="text-right col">
                                <button
                                    style={{fontSize: '14px'}}
                                    className={"btn  px-5 text-white " + globalStyles.globalBackColor}
                                    disabled={
                                        !(
                                            selectedDelivery.zone &&
                                            selectedDelivery.region &&
                                            selectedDelivery.country
                                        ) || loading
                                    }
                                    onClick={() => handleGoNext()}
                                >
                                    {loading ? (
                                        <img
                                            src={"/img/loader.gif"}
                                            alt={"Loading"}
                                            className={"mx-4 loader"}
                                        />
                                    ) : (
                                        "Continue"
                                    )}{" "}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        </RouteProtector>
    );
}