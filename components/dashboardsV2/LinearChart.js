import React from 'react';
import { Chart, LineAdvance } from 'bizcharts';

export default function LinearChart({ data, position }) {
    return <Chart padding={[ 10, 20, 50, 40 ]} autoFit height={320} data={data}>
        <LineAdvance
            shape="smooth"
            point
            area
            position={position}
            color="blue"
        />
    </Chart>
}