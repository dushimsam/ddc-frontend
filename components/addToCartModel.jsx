import {currencyMapping, defaultCurrencyMapping} from "../utils/currency-converter";
import {useSelector} from "react-redux";

export default function AddToCartModel({product}) {
    let currency = useSelector((state) => state.appCurrency);

    return (
        <div className="modal fade" id="addToCartModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div className="modal-content">
                    <div className="model-close">
                        <button className="bg-app-red rounded-circle px-2" data-dismiss="modal">X</button>
                    </div>
                    <div className="modal-header">
                        <h5 className="modal-title p-2 pr-5" id="exampleModalLabel">You've successfully added a product
                            to the cart</h5>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-md-4">
                                <img className="d-block w-100" src={product.profile || '/img/product-tyre.webp'}
                                     alt=""/>
                            </div>
                            <div className="col-md-8 py-3 pr-4">
                                <h5 className="text-left text-secondary">{product.sparePart.name || 'Yamaha k t 123 - 201'}</h5>
                                <h6 className="text-left text-secondary">in body &gt; accessories</h6>
                                <h4 className="mt-3 text-left text-app-red font-weight-bold">{currencyMapping(currency, product.unit_price)}</h4>
                                <p className="text-secondary">Part code: {product.sparePart.part_code || '034164'}</p>
                                <div className="desc col-12 col-sm-10 p-0 m-0">
                                    <p className="text-left text-secondary mt-4">
                                        {product.sparePart.description.fit_none || ""}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row px-2 px-sm-3 px-md-5 py-4 ">
                        <div className="col text-left">
                            <button type="button" data-dismiss="modal"
                                    className="btn btn-outline-danger border-app-red text-app-red ml-3">CONTINUE
                                SHOPPING
                            </button>
                        </div>
                        <div className="col text-right">
                            <button type="button" className="btn btn-danger bg-app-red" data-dismiss="modal">VISIT THE
                                CART
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}