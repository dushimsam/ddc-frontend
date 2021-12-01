import React, {Component, useState} from "react";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import {mainCustomStyles} from "../components/reusable/select-elements";
import SparePartService from "../services/products/ProductService";


//
// export default function GeneratePdf() {
//     const ref = React.createRef();
//
//     return (
//         <div className="App">
//             <Pdf targetRef={ref} filename="code-example.pdf">
//                 {({toPdf}) => <button onClick={toPdf}>Generate Pdf</button>}
//             </Pdf>
//             <div ref={ref}>
//                 <h1>Hello CodeSandbox</h1>
//                 <h2>Start editing to see some magic happen!</h2>
//             </div>
//         </div>
//     )
// }

const ReactSelectExample = () => {

    const [state, setState] = useState({
        selectedOption: {},
        normalSelectOption: null,
    })


    const fetchData = (inputValue, callback) => {
        setTimeout(() => {
            if (inputValue) {
                SparePartService.searchPaginatedProducts(inputValue, 1, 30).then((res) => {
                    const data = res.data.docs;
                    const tempArray = [];
                    if (data) {
                        if (data.length) {
                            data.forEach((element) => {
                                tempArray.push({
                                    label: `${element.name} , ${element.part_number} , ${element.part_code}`,
                                    value: element
                                });
                            });
                        } else {
                            tempArray.push({
                                label: `${data.name} , ${data.part_number} , ${data.part_code}`,
                                value: data._id,
                            });
                        }
                    }
                    callback(tempArray);
                }).catch(e => console.log(e))
            } else {
                callback([])
            }

        }, 1000);
    };

    const onSearchChange = (selectedOption) => {
        console.log(selectedOption)
        if (selectedOption) {
            setState({
                ...state, selectedOption: selectedOption
            });
        }
    };
    const handleChange = (normalSelectOption) => {
        setState({...state, normalSelectOption: normalSelectOption});
    };

    return (
        <div style={{marginLeft: "40%", width: "200px"}}>

            <div>
                <p>Remote data</p>
                <AsyncSelect
                    // value={state.selectedOption}
                    styles={mainCustomStyles}
                    loadOptions={fetchData}
                    placeholder="Select the Spare part"
                    onChange={(e) => {
                        onSearchChange(e.value);
                    }}
                    defaultOptions={true}
                />
            </div>
        </div>
    );

}

export default ReactSelectExample;
