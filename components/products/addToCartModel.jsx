import Modal from "react-bootstrap/Modal";
import { hideAddToCartModal } from "../../store/actions/add-to-cart-modal-actions";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import router from "next/router";
import styles from "../../styles/components/model.module.css";
import { decrement, increment } from "../../store/actions/cart-actions";
import globalStyles from "../../styles/global-colors.module.css";
import { currencyMapping } from "../../utils/currency-converter";
import { useEffect, useState } from "react";
// import PartAvailabilityService from "../../services/spare-parts/PartAvailabilityService";
// import {handle_part_availability, handle_set_availability} from "../../utils/reusables";
import { PartAvailability } from "../alerts/part-availability";

export default function AddToCartModel() {
  let dispatch = useDispatch();
  let thisModalState = useSelector((state) => state.showAddToCartModal);
  const prod = useSelector((state) => state.cart).find(
    (product) => product._id === thisModalState.product?._id
  );

  const [availabilityDetails, setAvailabilityDetails] = useState({
    available: true,
    visible: false,
    message: "Not Available at this moment",
  });
  const [available, setAvailable] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    if (thisModalState.product) {
      setAvailable(true);
      // if (thisModalState.product.quantity < 1) {
      //     setAvailable(false);
      //     handle_set_availability(setAvailabilityDetails, thisModalState.product)
      // } else {
      //
      // }
    }
  }, [thisModalState]);

  const handleIncrement = () => {
    dispatch(increment(thisModalState.product._id));
  };
  const handleDecrement = () => {
    dispatch(decrement(thisModalState.product._id));
  };

  const handleClose = () => {
    dispatch(hideAddToCartModal());
    router.push("/products");
  };
  let currency = useSelector((state) => state.appCurrency);

  return (
    <Modal
      show={thisModalState.show}
      className={styles.modal}
      onHide={handleClose}
      size="lg"
    >
      <Modal.Header className={styles.modalHeader}>
        {available ? (
          <h5
            className={
              "modal-title px-2 pr-5 " +
              styles.modalTitle +
              " " +
              styles.modalTitleCartSuccess
            }
            id="exampleModalLabel"
          >
            You've successfully added a product to the cart
          </h5>
        ) : (
          <div className={"col-10"}>
            <PartAvailability
              availabilityDetails={availabilityDetails}
              setAvailabilityDetails={setAvailabilityDetails}
            />
          </div>
        )}

        <div className={"model-close  " + styles.modalClose}>
          {/*<button  onClick={handleClose} className={'' + styles.modalXBtn}>X</button>*/}
          <button
            onClick={handleClose}
            className={styles.modalXBtn + " " + globalStyles.globalBackColor}
          >
            <span aria-hidden={"true"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="18"
                height="18"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"
                  fill="rgba(255,255,255,1)"
                />
              </svg>
            </span>
          </button>
        </div>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        {thisModalState.show == true ? (
          <div className="row">
            <div className="col-md-4">
              <img
                className={"d-block w-100 " + styles.productImage}
                src={thisModalState.product?.product?.imageUrls[0]}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/img/default-spare-part.png";
                }}
                alt={thisModalState.product.product.name}
              />
            </div>
            <div className="col-md-8 py-3 pr-4">
              <h5 className={"text-left mb-4 " + styles.productName}>
                {thisModalState.product.product.name || ""}
              </h5>
              {/*<h6 className={"text-left " + styles.productMeta}>*/}
              {/*   */}
              {/*</h6>*/}
              <h4
                className={
                  "mt-0 text-left mb-0 " +
                  styles.productPricing +
                  " " +
                  globalStyles.globalTextColor
                }
              >
                <span className={styles.productPrice}>
                  {currencyMapping(currency, thisModalState.product.unit_price)}
                </span>
              </h4>

              <p className={"" + styles.productPartNumber}>
                Product code:{" "}
                {thisModalState.product.product.product_code || ""}
              </p>
            </div>
          </div>
        ) : (
          <></>
        )}

        <div className="mx-auto col-lg-4 col-12">
          <div className="input-group">
            <span className="input-group-btn">
              <button
                type="button"
                onClick={handleDecrement}
                disabled={!available}
                className={styles.btnNumber}
                data-type="minus"
                data-field="quant[1]"
              >
                -
              </button>
            </span>
            <div className="input" role="textbox">
              <span className={styles.quantityBox}>
                {" "}
                {available ? prod?.orderedQuantity : 0}{" "}
              </span>
            </div>

            <span className="input-group-btn">
              <button
                type="button"
                disabled={!available}
                onClick={handleIncrement}
                className={styles.btnNumber}
                data-type="plus"
                data-field="quant[1]"
              >
                +
              </button>
            </span>
          </div>
        </div>
      </Modal.Body>
      <div className="row px-2 px-sm-3 px-md-5 py-5 ">
        <div className="col-8 col-sm-10 col-md-6 mx-auto text-lg-left text-center">
          <button
            type="button"
            className={
              "btn border-0" +
              styles.buttonContinue +
              " " +
              globalStyles.globalTextColor
            }
            onClick={handleClose}
          >
            Continue Shopping
          </button>
        </div>
        <div className="col-8 col-sm-10 col-md-6 mx-auto text-lg-right text-center mt-3 mt-md-0">
          <Link href={"/cart/my-cart"}>
            <button
              type="button"
              className={
                "btn " + styles.buttonCart + " " + globalStyles.globalBackColor
              }
              onClick={handleClose}
            >
              Visit the cart
            </button>
          </Link>
        </div>
      </div>
    </Modal>

    // <div className="modal fade" id="addToCartModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    //     aria-hidden="true">
    //     <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
    //         <div className="modal-content">
    //             <div className="model-close">
    //                 <button className="bg-app-red rounded-circle px-2" data-dismiss="modal">X</button>
    //             </div>
    //             <div className="modal-header">
    //                 <h5 className="modal-title p-2 pr-5" id="exampleModalLabel">You've successfully added a product to the cart</h5>
    //             </div>
    //             <div className="modal-body">
    //                 <div className="row">
    //                     <div className="col-md-4">
    //                         <img className="d-block w-100" src={thisModalState.product.profile || '/img/product-tyre.webp'} alt=""/>
    //                     </div>
    //                     <div className="col-md-8 py-3 pr-4">
    //                         <h5 className="text-left text-secondary">{thisModalState.product.sparePart.name || 'Yamaha k t 123 - 201'}</h5>
    //                         <h6 className="text-left text-secondary">in body &gt; accessories</h6>
    //                         <h4 className="mt-3 text-left text-app-red font-weight-bold">{thisModalState.product.unit_price} FRW</h4>
    //                         <p className="text-secondary">Part code: {thisModalState.product.sparePart.part_code || '034164'}</p>
    //                         <div className="desc col-12 col-sm-10 p-0 m-0">
    //                             <p className="text-left text-secondary mt-4">
    //                                 {thisModalState.product.sparePart.description.fit_none || "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur iure atque placeat consectetur, molestiae facere. Necessitatibus, sapiente! Quia sed ipsam sunt, dicta officiis iusto, possimus minus distinctio reiciendis error exercitationem!"}
    //                             </p>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //             <div className="row px-2 px-sm-3 px-md-5 py-4 ">
    //                 <div className="col text-left">
    //                     <button type="button" data-dismiss="modal" className="btn btn-outline-danger border-app-red text-app-red ml-3">CONTINUE SHOPPING</button>
    //                 </div>
    //                 <div className="col text-right">
    //                     <button type="button" className="btn btn-danger bg-app-red" data-dismiss="modal">VISIT THE CART</button>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // </div>
  );
}
