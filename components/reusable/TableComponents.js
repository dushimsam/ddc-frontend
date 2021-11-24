import React from "react";
import styles from "../../styles/pages/table.module.css";
import SortableHead from "../tables/sortableHead";

export const Th = ({name, prop, sorter}) => {
    const sendSetOrder = (val) => {
        sorter(prop, val);
    }
    return (
        <React.Fragment>
            <th scope="col" className={styles.th}>
                <SortableHead subject={name} sortProperty={prop} sortOrder={sendSetOrder} />
            </th>
        </React.Fragment>
    )
}
