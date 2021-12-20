// PRODUCTS

import * as XLSX from "xlsx";
import ProductCategoryService from "../services/product-categories/ProductCategoryService";
import $ from "jquery";
import {generateProductCode} from "./functions";


export const readProductsExcel = (file, setReadItems) => {

    const promise = new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);

        fileReader.onload = (e) => {
            const bufferArray = e.target.result;

            const wb = XLSX.read(bufferArray, {type: "buffer"});

            const wsname = wb.SheetNames[0];

            const ws = wb.Sheets[wsname];

            const data = XLSX.utils.sheet_to_json(ws);

            resolve(data);
        };

        fileReader.onerror = (error) => {
            reject(error);
        };
    });

    promise.then((d) => {


        console.log("source ", d)
        let _id = 4500;

        let all_items = []
        d.map((item) => {
            if (parseFloat(item.PRICE) > 1) {
                let value =
                    {
                        value: {
                            complete_info_status: "COMPLETE",
                            name: item.PRODUCT_NAME?.trim(),
                            product_code: generateProductCode(),
                            product_category: item.BRAND_NAME?.trim(),
                            weight: 1,
                            second_hand: false
                        },
                        brand_name: item.BRAND_NAME?.trim(),
                        id: _id,
                        quantity: typeof item.QUANTITY === 'undefined' || item.QUANTITY === null ? 0 : parseInt(item.QUANTITY),
                        price: parseFloat(item.PRICE),
                        supply_price: parseFloat(item.PRICE) - (parseFloat(item.PRICE) * 30 / 100),
                        existsObj: "",
                        status: "OK"
                    }
                all_items = [...all_items, value]
                _id += 230;
            }
        })


        console.log("Modified", all_items)
        all_items.map(async (par_item, index) => {

            let item_value;

            if (par_item.value.name) {

                try {
                    let new_value = all_items[index]
                    const res = await ProductCategoryService.productCategoryNameExists(par_item.value.product_category);
                    if (res.data.exists) {
                        new_value.complete_info_status = "COMPLETE";
                        new_value.value.product_category = res.data.object._id;
                        all_items[index] = new_value;
                    } else {
                        new_value.status = "INCOMPLETE"
                    }


                    // let duplicates = all_items.filter((item) => item.value.part_number === par_item.value.part_number)
                    // if (duplicates.length > 1) {
                    //
                    //     let total_quantity = duplicates.map(item => item.quantity).reduce((prev, next) => prev + next);
                    //     let new_value = all_items[index];
                    //     new_value.quantity = total_quantity;
                    //
                    //     duplicates.map((duplicate, dup_index) => {
                    //         if (dup_index > 0) {
                    //             let duplicate_index = all_items.indexOf(duplicate);
                    //             if (duplicate_index > -1) {
                    //                 all_items.splice(duplicate_index, 1);
                    //             }
                    //         }
                    //     })
                    //
                    //     all_items[index] = new_value;
                    // }
                    all_items[index] = new_value;

                    if (all_items[index]) {
                        setReadItems(old => [...old, all_items[index]]);
                    } else {
                        console.log("err ", all_items[index])
                    }
                } catch (e) {
                    console.log("Fell in error ", par_item)
                    console.log(e)
                }
            }
        });

        $(function () {
            $("#uploadedModal").modal({backdrop: 'static', keyboard: false});
        });

    });
};

// product categories

export const readProductCategoriesExcel = (file, setReadItems) => {

    const promise = new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);

        fileReader.onload = (e) => {
            const bufferArray = e.target.result;

            const wb = XLSX.read(bufferArray, {type: "buffer"});

            const wsname = wb.SheetNames[0];

            const ws = wb.Sheets[wsname];

            const data = XLSX.utils.sheet_to_json(ws);

            resolve(data);
        };

        fileReader.onerror = (error) => {
            reject(error);
        };
    });

    promise.then((d) => {

        let _id = 4500;
        let all_items = []

        d.map((item) => {

            let value =
                {
                    value: {
                        name: item.BRAND_NAME?.trim(),
                        description: item.BRAND_NAME
                    },
                    id: _id,
                    existsObj: "",
                    status: "OK"
                }
            all_items = [...all_items, value]
            _id += 230;

        })
        console.log("here data ", all_items)

        all_items.map(async (par_item, index) => {

                let item_value;
                if (par_item.value.name) {

                    try {
                        const res = await ProductCategoryService.productCategoryNameExists(par_item.value.product_category);
                        if (res.data.exists) {
                            let duplicate = all_items[index];
                            let duplicate_index = all_items.indexOf(duplicate);
                            if (duplicate_index > -1)
                                all_items.splice(duplicate_index, 1);
                        }

                        let duplicates = all_items.filter((item) => item.value.name === par_item.value.name)
                        if (duplicates.length > 1) {
                            let new_value = all_items[index];
                            duplicates.map((duplicate, dup_index) => {
                                if (dup_index > 0) {
                                    let duplicate_index = all_items.indexOf(duplicate);
                                    if (duplicate_index > -1) {
                                        all_items.splice(duplicate_index, 1);
                                    }
                                }
                            })

                            all_items[index] = new_value;
                        }

                        if (all_items[index]) {
                            setReadItems(old => [...old, all_items[index]]);
                        } else {
                            console.log("err ", all_items[index])
                        }
                    } catch
                        (e) {
                        console.log("Fell in error ", par_item)
                        console.log(e)
                    }
                }
            }
        )
        ;

        $(function () {
            $("#uploadedModal").modal({backdrop: 'static', keyboard: false});
        });

    });
};
