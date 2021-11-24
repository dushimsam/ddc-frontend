import { useEffect, useState } from "react"
import globalStyles from "../../styles/global-colors.module.css"



const GrowableTable = ({ Table, items, initialItemsLen, FILTER }) => {
    const [data, setData] = useState({
        items: items,
        showItems: initialItemsLen
    })

    function handleShowMore() {
        setData({ ...data, showItems: data.showItems >= data.items.length ? initialItemsLen : data.showItems + 2 })
    }
    useEffect(() => {
        setData({ ...data, items: items })
    }, [items])
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <Table rowsData={data} FILTER={FILTER} />
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-8 col-sm-6 col-md-4 col-lg-3">
                    {
                        data.items.length > initialItemsLen ? <button type="button" style={styles.button} className={"btn btn-outline-danger d-flex justify-content-center text-white " + globalStyles.globalBackColor} onClick={() => handleShowMore()}>{data.showItems >= data.items.length ? "Show Less" : "Show More"}</button> : ""
                    }
                </div>
            </div>
        </div>
    )
}
const styles = {
    button: {
        fontSize: "0.85em"
    }
}

export default GrowableTable;