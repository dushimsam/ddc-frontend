import {
    Chart,
    Interval,
    Coordinate,
    Legend,
    View,
    Annotation,
} from "bizcharts";

function Ring({ data = [], content = {}, intervalConfig = {} }) {
    return (
        <Chart placeholder={false} height={200} autoFit>
            <Legend visible={false} />
            <View
                data={data}
                scale={{
                    percent: {
                        formatter: (val) => {
                            return val + " Items";
                        },
                    },
                }}
            >
                {
                    "APP_COMPANY_LDC"
                }

                <Coordinate type="theta" innerRadius={0.75} />
                <Interval
                    position="percent"
                    adjust="stack"
                    color={["type", ["#EC6666", "#eee"]]}
                    size={25}
                    {...intervalConfig}
                />
                <Annotation.Text
                    position={["50%", "50%"]}
                    content={content.percent+" %"}
                    style={{
                        fontSize: "24",
                        fill: "gray",
                        fontWeight: 700,
                        textAlign: "center",
                    }}
                />
            </View>
        </Chart>
    );
}

export default function RingChart({ data }) {
    return <Ring data={data?.myData} content={data?.myContent}/>
}