import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../../../components/navbar";
import Head from "next/head";
import Link from "next/link";
import RouteProtector from "../../../../middlewares/RouteProtector";
import {
  app_config,
  DEFAULT_CURRENCY,
  system_users,
} from "../../../../utils/constants";
import Router, { useRouter } from "next/router";
import Footer from "../../../../components/Footer";
import globalStyles from "../../../../styles/global-colors.module.css";
import { BookingComponent } from "../../../../components/customer/booking-component";
import UploadDragAndDrop from "../../../../components/reusable/upload-drag-drop";
import ReachUsOnWhatsapp from "../../../../components/reusable/reach-us-on-whatsapp";
// import BookingService from "../../../../services/cars/booking-service";
import {
  gotoPathDirect,
  handleDoubleDecryptionPath,
} from "../../../../utils/functions";
import OrderService from "../../../../services/cars/cars-order-purchase-service";
import ShipmentService from "../../../../services/shipments/shipment.service";
import {
  alertFailer,
  notifyError,
  notifyInfo,
  notifySuccess,
} from "../../../../utils/alerts";
import PaymentService from "../../../../services/cars/car-payment-service";
// import CarService from "../../../../services/cars/car-service";
import {
  currencyMapping,
  defaultCurrencyMapping,
} from "../../../../utils/currency-converter";
import { InvoiceShow } from "../../../../components/reusable/invoice/invoice-show";

export default function PayOrder() {
  const [loading, setLoading] = useState(false);
  const [showProductsNow, setShowProductsNow] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);

  const [alert, setAlert] = useState({
    show: false,
    status: 500,
    message: "",
  });
  const [order, setOrder] = useState(null);
  const customer = useSelector((state) => state.authUser);

  const [amountToPay, setAmountToPay] = useState(0);

  const [files, setFiles] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (router.query.subject) {
      OrderService.getOrder(handleDoubleDecryptionPath(router.query.subject))
        .then((res) => {
          setOrder(res.data);
        })
        .catch((e) => console.log(e));
    }
  }, [router.query.subject]);

  const [shippingInfo, setShippingInfo] = useState({ amount: 0, days: 1 });

  const handlePayment = async () => {
    if (files.length > 0) {
      try {
        if (shippingInfo.amount > 1) {
          setLoading(true);
          let paymentValues = {
            order: order._id,
            shipping_amount: shippingInfo.amount,
            product_price: order.booking.car_on_market.selling_price,
            amount_paid: amountToPay,
          };
          let payment_res = await PaymentService.createOrderPayment(
            paymentValues
          );
          for (let u = 0; u < files.length; u++) {
            const formData = new FormData();
            formData.append("receipt", files[u]);
            await PaymentService.addOrderReceipts(
              payment_res.data._id,
              formData
            );
          }

          notifySuccess("Successfully sent the payment documents.");
          notifyInfo(
            "We are going to prompt you about the delivery of your order as soon as possible."
          );
          setLoading(false);
          window.setTimeout(() => {
            router.push("/customer/my-orders/car-orders");
          }, 3000);
        } else {
          notifyError("Sorry shipping amount is not yet set");
        }
      } catch (e) {
        notifyError(
          e.response
            ? e.response.data.message
            : e.message || "Error occurred. Try again latter."
        );
      }
    } else {
      notifyError("You should upload some receipt documents");
    }
  };

  useEffect(() => {
    if (order) {
      ShipmentService.getPortPricingByPortCountryVehicle(
        order.booking.delivery_port._id,
        order.booking.car_on_market.supplied_car.country_origin._id,
        order.booking.car_on_market.supplied_car.vehicle_type._id
      )
        .then((res) => {
          setShippingInfo({
            amount: res.data.delivery_price,
            days: res.data.transfer_time,
          });
          setAmountToPay(
            res.data.delivery_price + order.booking.car_on_market.selling_price
          );
        })
        .catch((e) => {
          console.log(
            e.response
              ? e.response.data.message
              : e.message || "Error occurred. Try again latter."
          );
        });
    }
  }, [order]);

  let currency = useSelector((state) => state.appCurrency);

  return (
    <RouteProtector only={[system_users.CUSTOMER]}>
      {order && (
        <div className="container-fluid p-0 m-0 bg-light">
          <Head>
            <title>Booking Review | {app_config.APP_NAME_LOWER}</title>
          </Head>
          <Navbar />
          <div className="mx-auto col-md-11 col-lg-11 px-sm-3 px-md-5 card py-4 my-4">
            <div className="d-flex justify-content-between align-items-center pt-3">
              <div className="d-flex">
                <h3 className="text-left text-secondary">
                  <span className="text-dark font-weight-bold mr-2">
                    Order Payment
                  </span>
                </h3>
                <div>
                  <div
                    className={
                      "badge  font-weight-bold " +
                      (order.status === "PAYING"
                        ? "badge-warning"
                        : order.status === "PAID"
                        ? "badge-success"
                        : "badge-success")
                    }
                  >
                    {order.status}
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="row mt-4">
              <BookingComponent item={order.booking} text={"REVIEW"} />
            </div>
            <div className="card mt-4">
              <div className="card-body px-md-5 pb-1">
                <h5 className="font-weight-bolder">Payment details</h5>
                <hr />
                <div className="row">
                  <div className="col-6">Sub total</div>
                  <div className="col-6 text-right">
                    {currencyMapping(
                      currency,
                      order.booking.car_on_market.selling_price
                    )}
                  </div>
                  <div className="col-6">Shipping</div>
                  <div className="col-6 text-right">
                    {currencyMapping(currency, shippingInfo.amount)}
                  </div>

                  {discountAmount !== 0 && (
                    <>
                      <div className="col-6">
                        <td>Discount</td>
                      </div>
                      <div className="text-right">
                        {currencyMapping(currency, discountAmount)}
                      </div>
                    </>
                  )}
                  <div className="col-6">
                    <h4 className="font-weight-bolder">Estimated total</h4>
                  </div>
                  <div className="col-6 text-right">
                    <h4 className="font-weight-bolder">
                      {currencyMapping(currency, amountToPay)}
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            <InvoiceShow />

            {order.status === "PAYING" ? (
              <div className={"row justify-content-center mt-4 mb-4"}>
                <div className={"col-md-6 col-11"}>
                  <UploadDragAndDrop setFiles={setFiles} />
                </div>
              </div>
            ) : (
              <></>
            )}
            <div className="row pt-4 mb-4">
              <div className="col text-left">
                <Link
                  href={gotoPathDirect(
                    "/customer/book-now/review",
                    order.booking._id
                  )}
                  passHref
                >
                  <button className={"btn btn-secondary px-md-5"}>BACK</button>
                </Link>
              </div>
              <div className="text-right col">
                <button
                  className={
                    "btn  px-md-5 text-white " + globalStyles.globalBackColor
                  }
                  disabled={loading || order.status !== "PAYING"}
                  onClick={() => handlePayment()}
                >
                  {" "}
                  {loading ? (
                    <img
                      src={"/img/loader.gif"}
                      alt={"Loading"}
                      className={"inline mx-5 loader"}
                    />
                  ) : (
                    "DONE"
                  )}
                </button>
              </div>
            </div>
          </div>
          <ReachUsOnWhatsapp />

          <Footer />
        </div>
      )}
    </RouteProtector>
  );
}
