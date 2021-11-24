import React, {useEffect, useState} from 'react'
import styles from '../../styles/components/toggleButton.module.css';

const ToggleButton = ({defaultCheck, setItem, item}) => {
    const [checked,setCheck] = useState(defaultCheck);
    return (
        <label className={styles.switch}>
            <input type="checkbox" className={styles.input} onChange={() => {
                setItem(item);
                setCheck(!checked);
            }} checked={checked}/>
            <span className={`${styles.slider}  ${styles.round} ${(!checked) ? styles.roundedUnchecked : ''}`}/>
        </label>)
}

export default ToggleButton;