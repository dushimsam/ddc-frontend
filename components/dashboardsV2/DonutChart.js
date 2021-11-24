import React from "react";
import ReactDOM from "react-dom";
import { DonutChart as Chart } from "bizcharts";

const data = [
    {
        type: "Direct",
        value: 270,
    },
    {
        type: "Orders",
        value: 25,
    }
];

export default function DonutChart() {
    return (
        <Chart
            data={data}
            autoFit
            height={350}
            radius={0.8}
            padding="auto"
            angleField="value"
            colorField="type"
            label="Holla"
            statistic={{visible: false}}
            pieStyle={{ stroke: "white", lineWidth: 1 }}
        />
    );
}