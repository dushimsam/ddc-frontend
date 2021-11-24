import React, {useEffect, useState} from 'react';
import SuppliesDataService from "../../../../services/supplies/supplies"
import SupplyService from "../../../../services/supplies/supplies"
import EmployeesDataService from "../../../../services/employees/employees"
import SuppliersDataService from "../../../../services/supplies/suppliers"
import SupplierService from "../../../../services/supplies/suppliers"
import SelectProduct from "../../../../components/products/SelectProduct";
import SuppliedPartsDataService from "../../../../services/supplies/supplied-parts";
import SparePartService from "../../../../services/products/products.service";
import {useSelector} from "react-redux";
import SelectControl from "../../../../components/reusable/SelectControl";
import {isThisFormValid} from "../../../../utils/functions";
import {notifyError, notifySuccess} from "../../../../utils/alerts"
import Alert from "../../../../components/alert";
import {system_users} from '../../../../utils/constants';
import SingleSubModuleLayoutAdmin from "../../../../layouts/admin-layouts/SingleSubModule";
import SingleSubModuleLayoutManager from "../../../../layouts/sales-manager-layouts/SingleSubModule";
import Router from "next/router";
import {defaultCurrencyMapping} from "../../../../utils/currency-converter";
import PartAvailabilityService from "../../../../services/products/PartAvailabilityService";

const getTotalProductQuantities = (products) => {
    let total = 0;
    for (let item of products)
        total += parseInt(item.quantity)

    return total
}


const getTotalPrice = (products) => {
    let sum = 0;
    for (let item of products) {
        sum += parseFloat(item.supply_price) * parseInt(item.quantity)
    }
    return sum;
}


async function UpdatedExistingSuppliedParts(supply, suppliedParts, defaultData) {

    let total_diff_quantities = 0;
    let total_diff_prices = 0;

    try {
        for (let i = 0; i < suppliedParts.length; i++) {

            let part = suppliedParts[i];
            var index = defaultData.findIndex(x => x.spare_part._id === suppliedParts[i].spare_part._id);

            let diff = parseInt(part.quantity) - parseInt(defaultData[index].quantity);
            let priceDiff = parseFloat(part.supply_price * part.quantity) - parseFloat(defaultData[index].supply_price);

            if (part.quantity != defaultData[index].quantity || part.supply_price != defaultData[index].supply_price) {
                await SuppliedPartsDataService.update(defaultData[index]._id, {
                    quantity: part.quantity !== defaultData[index].quantity ? part.quantity : defaultData[index].quantity,
                    spare_part: suppliedParts[i].spare_part._id,
                    supply_price: part.supply_price != defaultData[index].supply_price ? parseFloat(part.supply_price * part.quantity) : defaultData[index].supply_price,
                    part_supply: supply._id
                });

                total_diff_prices += part.supply_price != defaultData[index].supply_price ? parseFloat(priceDiff) : total_diff_prices;
                total_diff_quantities += part.quantity != defaultData[index].quantity ? parseInt(diff) : total_diff_quantities;
            }

            if (part.quantity != defaultData[index].quantity) {
                const res_on_market_details = await SparePartService.getSparePartDetails(suppliedParts[i].spare_part._id);

                let market_quantities = parseInt(res_on_market_details.data.partOnMarket.quantity) + parseInt(diff);

                if (market_quantities < 0) {
                    notifyError(" We can not deduct " + diff + " quantities on " + suppliedParts[i].spare_part.name)
                } else {
                    await SparePartService.updatePartOnMarket(res_on_market_details.data.partOnMarket._id, {
                        part_in_stock: res_on_market_details.data.partInStock._id,
                        unit_price: res_on_market_details.data.partOnMarket.unit_price,
                        quantity: market_quantities
                    })
                    notifySuccess(" We have updated quantities of " + suppliedParts[i].spare_part.name + " to " + market_quantities + " on the market")
                }
            }

        }

        return {total_diff_quantities, total_diff_prices};
    } catch (e) {
        notifyError(e)
    }
}


async function DeleteExistingSuppliedParts(supply, suppliedParts, defaultData) {

    let total_deleted_quantities = 0;
    let total_deleted_prices = 0;

    try {
        for (let i = 0; i < suppliedParts.length; i++) {
            let part = suppliedParts[i];

            const res_on_market_details = await SparePartService.getSparePartDetails(part.spare_part._id);
            let diff = parseInt(res_on_market_details.data.partOnMarket.quantity) - parseInt(part.quantity);
            var index = defaultData.findIndex(x => x.spare_part._id === suppliedParts[i].spare_part._id);
            await SuppliedPartsDataService.delete(defaultData[index]._id);

            if (diff < 0) {
                notifyError(" We can't deduct " + part.quantity + " quantities of " + part.spare_part.name + " On Market")
            } else {
                await SparePartService.updatePartOnMarket(res_on_market_details.data.partOnMarket._id, {
                    part_in_stock: res_on_market_details.data.partInStock._id,
                    unit_price: res_on_market_details.data.partOnMarket.unit_price,
                    quantity: diff
                })
                notifySuccess(" We have deducted " + part.quantity + "quantities of " + part.spare_part.name + " On Market");
            }

            total_deleted_quantities += parseInt(defaultData[index].quantity)
            total_deleted_prices += parseFloat(defaultData[index].supply_price);
        }

        return {total_deleted_quantities, total_deleted_prices};
    } catch (e) {
        notifyError(e.message)
    }
}

const UpdateSupplier = async (values, itemSupply, quantity_price_obj) => {
    if (values.supplier !== itemSupply.supplier._id) {
        try {
            const supply_res = await SuppliesDataService.update(itemSupply._id, {
                supplier: values.supplier,
                supply_date: itemSupply.supply_date,
                reciever: itemSupply.reciever._id,
                supply_price: quantity_price_obj.total_supply_price,
                supply_quantity: quantity_price_obj.total_quantities
            })
            itemSupply = supply_res.data;

        } catch (e) {
            notifyError(e.message)
        }
    }
}


const CreateSuppliedParts = async (supply, suppliedParts, status) => {

    let new_quantities = 0;
    let new_prices = 0;
    for (let i = 0; i < suppliedParts.length; i++) {

        try {
            const supplied_parts_data = await SuppliedPartsDataService.create({
                part_supply: supply._id,
                quantity: parseInt(suppliedParts[i].quantity),
                spare_part: suppliedParts[i].spare_part._id,
                supply_price: parseFloat(suppliedParts[i].supply_price * suppliedParts[i].quantity)
            })

            const part_in_stock_data = await SparePartService.createSparePartInStock({
                supplied_part: supplied_parts_data.data._id,
                quantity: parseInt(suppliedParts[i].quantity),
            });
            const part_on_market_res = await SparePartService.createPartOnMarket({
                part_in_stock: part_in_stock_data.data._id,
                unit_price: parseFloat(suppliedParts[i].unit_price),
                quantity: parseInt(suppliedParts[i].quantity)
            });

            try {
                await PartAvailabilityService.unSetActiveByPart(part_on_market_res.data._id);
            } catch (e) {
            }

            if (status === "UPDATE") {

                let new_supply_quantity = parseInt(supply.supply_quantity) + parseInt(suppliedParts[i].quantity);
                let new_supply_price = parseFloat(supply.supply_price) + parseFloat(suppliedParts[i].supply_price * suppliedParts[i].quantity);

                new_quantities += new_supply_quantity;
                new_prices += new_supply_price;
            }

        } catch (e) {
            notifyError(e.message)
        }
    }

    return {new_quantities, new_prices}

}

const TableSummary = ({suppliedParts, removeSupplied, status}) => {
    let empty = [1, 2, 3];

    return (
        status === "UPDATE" && suppliedParts.length < 1 ?
            (
                empty.map((item) => (
                    <div
                        key={item}
                        className="col-md-12 col-12  mb-1  mx-md-1"
                    >
                        <div className="rounded py-0 bg-whiterounded">
                            <div className="loading h-30 rounded-top my-0 p-0"/>
                        </div>
                    </div>
                ))
            )
            : <table className="table table-bordered">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Spare part</th>
                    <th>Quantity</th>
                    <th>Supply</th>
                    <th>Total</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {suppliedParts?.map((part, i) => (
                    <tr key={i}>
                        <td>{i + 1}</td>
                        <td> {part.spare_part.name} </td>
                        <td> {part.quantity} items</td>
                        <td> {defaultCurrencyMapping(part.supply_price)} </td>
                        <td> {defaultCurrencyMapping(part.supply_price * part.quantity)}</td>

                        <td>

                            <button className="btn btn-sm btn-outline-danger"
                                    onClick={() => removeSupplied(part.spare_part._id)}>Remove
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
    )
}
const Form = ({status, itemSupply, setSupply, defaultData}) => {
    const [alert, setAlert] = useState({message: "", class: "", show: false})
    const [suppliers, setSuppliers] = useState([]);
    const [openLog, setOpenLog] = useState(false)

    const [suppliedParts, setSuppliedParts] = useState([]);


    const [editSet, setEditSet] = useState({})
    const authUser = useSelector(state => state.authUser)

    const [values, setValues] = useState({
        supplier: "",
        supply_date: new Date(),
        reciever: ""
    });

    const [loading, setLoading] = useState(false);


    useEffect(() => {
        EmployeesDataService.getByUserId(authUser.id)
            .then((res) => {
                setValues({...values, reciever: res.data._id})
            }).catch((e) => console.log(e))
    }, [authUser])


    useEffect(() => {
        if (status === "UPDATE" && itemSupply) {
            setValues({
                supplier: itemSupply.supplier._id,
                supply_date: itemSupply.supply_date,
                reciever: itemSupply.reciever._id
            })
        }
    }, [itemSupply])


    useEffect(() => {
        if (status === "UPDATE" && defaultData.length > 0) {
            for (let i = 0; i < defaultData.length; i++) {
                SparePartService.getSparePartDetails(defaultData[i].spare_part._id)
                    .then((res) => {
                        setSuppliedParts(old => [...old, {
                            spare_part: defaultData[i].spare_part,
                            quantity: defaultData[i].quantity,
                            unit_price: res.data.partOnMarket.unit_price,
                            supply_price: (defaultData[i].supply_price / defaultData[i].quantity)
                        }]);
                    }).catch((err) => console.log(err))
            }
        }
    }, [defaultData])

    useEffect(() => {
        SuppliersDataService.getStatusedUnPaginated("ACTIVE").then((res) => {
            setSuppliers(res.data)
        }).catch(e => console.log(e))
    }, [])

    const [isFormValid, setIsFormValid] = useState(false)

    const [valid, setValid] = useState({
        supplier: !!status
    })

    const handleChange = (prop) => ({value, valid: validProp}) => {
        setValues({...values, [prop]: value});
        setValid(state => ({...state, [prop]: validProp}));
        setIsFormValid(isThisFormValid(valid))
    }

    const appendSuppliedPart = (value) => {
        setSuppliedParts(parts => [...parts, value])
    }

    const removeSupplied = (id) => {
        setSuppliedParts(parts => parts.filter(part => part.spare_part._id !== id))
    }


    const CreateSupply = () => {
        if (isThisFormValid(valid) && suppliedParts.length > 0) {
            let new_supplies = Object.assign(values);

            new_supplies.supply_date = new Date();
            new_supplies.supply_date.setSeconds(new_supplies.supply_date.getSeconds() - 3);
            SuppliesDataService.create(new_supplies)
                .then((res) => {
                    CreateSuppliedParts(res.data, suppliedParts, "NEW");
                    notifySuccess("New Supply is created")
                    setLoading(false)
                    // window.setTimeout(() => {
                    //     Router.push("/shared/supply/supplies");
                    // }, 4000)
                })
                .catch((e) => {
                    notifyError(e.message || "Error occurred. Try again latter.");
                    setLoading(false)
                });
        } else {
            if (!isThisFormValid(valid)) {
                notifyError(setAlert, "Please select the supplier");
            } else {
                notifyError(setAlert, "A supplier must supply atleast one product .... ");
            }
        }
    }


    const UpdateSupply = async () => {
        const filter_new_parts = (item) => {
            return !defaultData.some(part => part.spare_part._id === item.spare_part._id)
        }
        const filter_delete_parts = (item) => {
            return !suppliedParts.some(part => part.spare_part._id === item.spare_part._id)
        }
        const filter_changed_parts = (item) => {
            return defaultData.some(part => part.spare_part._id === item.spare_part._id)
        }


        let new_parts = suppliedParts.filter(filter_new_parts);
        let changed_parts = suppliedParts.filter(filter_changed_parts);
        let delete_parts = defaultData.filter(filter_delete_parts);


        let shareable_supply = itemSupply;
        let quantity_price_obj = {
            total_quantities: itemSupply.supply_quantity,
            total_supply_price: itemSupply.supply_price
        };

        try {


            const {
                new_supply_quantities,
                new_supply_price
            } = await CreateSuppliedParts(shareable_supply, new_parts, "UPDATE");

            quantity_price_obj.total_quantities += new_supply_quantities;
            quantity_price_obj.total_supply_price += new_supply_price;

            const {
                updated_total_quantities,
                updated_total_supply_price
            } = await UpdatedExistingSuppliedParts(shareable_supply, changed_parts, defaultData);
            quantity_price_obj.total_quantities += updated_total_quantities;
            quantity_price_obj.total_supply_price += updated_total_supply_price;


            const {
                total_deleted_quantities,
                total_deleted_prices
            } = await DeleteExistingSuppliedParts(shareable_supply, delete_parts, defaultData);

            quantity_price_obj.total_quantities -= total_deleted_quantities;
            quantity_price_obj.total_supply_price -= total_deleted_prices;

            await UpdateSupplier(values, itemSupply, quantity_price_obj);
            notifySuccess("Supply is updated successfully");
        } catch (e) {
            notifyError(e)
        } finally {
            setLoading(false);
        }
    }

    const [flush, setFlush] = useState(false)

    return (
        <div className="card-body  px-md-5 py-md-5 mb-5">
            <div className="d-flex justify-content-between align-items-baseline">
                {alert.show ?
                    <Alert className={"my-3 alert-" + alert.class} message={alert.message}
                           setAlert={setAlert}/> : null
                }
                <h3 className="mb-0">{status !== "UPDATE" ? "New supply" : "Update Supply"}</h3>

            </div>
            <form className="mt-4 w-md-25">
                <SelectControl handleChangeV2={handleChange("supplier")}
                               value={status === "UPDATE" ? values.supplier !== "" ? values.supplier : itemSupply?.supplier._id : values.supplier}
                               label="Select the suppler"
                               placeholder=" - select the supplier - " validations="required|string|min:3">
                    <option>Select Supplier</option>
                    {
                        suppliers.map((item) =>
                            <option value={item._id} key={item._id}> {item.user.username} </option>)
                    }
                </SelectControl>
            </form>

            <div className="d-md-flex d-block justify-content-between mt-5">
                <h5 className="font-weight-bold">Product supplies </h5>

                <button className="btn btn-danger rounded-full font-weight-light" id="changeVehicleBtn"
                        data-toggle="modal"
                        data-target="#changeVehicleModel" onClick={() => {
                    setOpenLog(true);
                    setFlush(!flush);
                }}><span
                    className="font-weight-bolder pr-3">+</span> Add supplied products
                </button>

            </div>
            <hr/>
            <div className={"table-responsive col-12"}>
                <TableSummary suppliedParts={suppliedParts} removeSupplied={removeSupplied} status={status}/>
            </div>
            <div className="form-row mt-5 mb-3">
                <div className="form-group col-6">
                    <button
                        type="button"
                        className="btn bg-danger rounded pt-1 pl-5 pr-5 text-white font-weight-light"
                        onClick={() => {
                            setLoading(true);
                            status !== "UPDATE" ? CreateSupply() : UpdateSupply();
                        }}
                        disabled={!(isThisFormValid(valid) && suppliedParts.length > 0)}
                    >

                        {loading ? (
                            <img
                                src={"/img/loader.gif"}
                                alt={"Loading"}
                                className={"loader"}
                            />
                        ) : status !== "UPDATE" ? "Create" : "Update"}
                    </button>
                </div>
            </div>
            {openLog ?
                <div className="modal" id="changeVehicleModel" tabIndex="-1" role="dialog"
                     aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-lg" style={{maxWidth: '900px'}}
                         role="document">
                        <div className="modal-content ">
                            <div className="modal-header">
                                <h5 className="text-center  font-weight-bold">Add Supplied Products</h5>
                                <button type="button" className="close" data-dismiss="modal"
                                        aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="pt-3 pb-5 pl-5 pr-5">
                                <SelectProduct editSet={editSet} appendPartSupply={appendSuppliedPart}
                                               suppliedParts={suppliedParts} flush={flush}/>
                            </div>
                        </div>
                    </div>
                </div> : ""}
        </div>
    )
        ;
};

export const Content = ({getTotals, status, itemSupply, defaultData, UpdateSupply, setSupply}) => {
    return (
        <div className={"card"}>
            <Form getTotals={getTotals} status={status} itemSupply={itemSupply} defaultData={defaultData}
                  setSupply={setSupply}
                  UpdateSupply={UpdateSupply}/>
        </div>
    );
};

const Page = () => {
    const [totals, setTotals] = useState({suppliers: 0, supplies: 0});

    const panes = [
        {name: 'Suppliers', count: totals.suppliers, route: '/shared/supply'},
        {name: 'Supplies', count: totals.supplies, route: '/shared/supply/supplies'}
    ];


    const getTotals = async () => {
        const totals = {suppliers: 0, supplies: 0};

        const suppliers = await SupplierService.getPaginated();
        const supplies = await SupplyService.getPaginated();

        totals.suppliers = suppliers.data.totalDocs;
        totals.supplies = supplies.data.totalDocs;

        setTotals(totals);
    }
    useEffect(() => {
        getTotals();
    }, []);


    const user = useSelector(state => state.authUser);

    const UpdateSupply = () => {
        console.log("Updated")
    }


    return (
        user.category?.name === system_users.ADMIN
            ?
            <SingleSubModuleLayoutAdmin
                Content={<Content getTotals={getTotals} UpdateSupply={UpdateSupply}/>}
                isArray={true}
                panes={panes}
                showFilter={null}
                setFilter={null}
                name={'Supplies'}
                setSearch={null}
                status="all"
                route={"/shared/supply/supplies"}
            /> :
            <SingleSubModuleLayoutManager
                Content={<Content/>}
                isArray={true}
                panes={panes}
                showFilter={null}
                setFilter={null}
                name={'Supplies'}
                setSearch={null}
                status="all"
                route={"/shared/supply/supplies"}
            />
    )
};

export default Page;