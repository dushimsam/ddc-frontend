// PRODUCTS

import * as XLSX from "xlsx";
import ProductCategoryService from "../services/product-categories/ProductCategoryService";
import $ from "jquery";

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


        let _id = 4500;

        let all_items = []
        d.map((item) => {
            let value =
                {
                    value: {
                        complete_info_status: "INCOMPLETE",
                        name: item.PRODUCT_NAME?.toString().trim(),
                        product_code: "0001",
                        product_category: item.PRODUCT_CATEGORY?.toString().trim(),
                        weight: 1,
                        second_hand: false
                    },
                    id: _id,
                    quantity: typeof item.QUANTITY === 'undefined' || item.QUANTITY === null ? 0 : parseInt(item.QUANTITY),
                    price: parseFloat(item.price),
                    supply_price: item.price - (parseFloat(item.price) * 30 / 100),
                    existsObj: "",
                    status: "OK"
                }
            all_items = [...all_items, value]
            _id += 230;
        })

        all_items.map(async (par_item, index) => {

            let item_value;

            if (par_item.value.name) {

                try {
                    const res = await ProductCategoryService.productCategoryNameExists(par_item.value.product_category);
                    if (res.data.exists) {
                        let new_value = all_items[index]
                        new_value.complete_info_status = "COMPLETE";
                        new_value.product_category = res.data.object._id;
                        all_items[index] = new_value;
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
                        name: item.PRODUCT_NAME?.toString().trim(),
                        description: item.PRODUCT_NAME?.toString()
                    },
                    id: _id,
                    existsObj: "",
                    status: "OK"
                }
            all_items = [...all_items, value]
            _id += 230;
        })

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
