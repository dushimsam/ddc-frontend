import React, {useState} from 'react'
import styles from '../../styles/components/SortableHead.module.css';

const SortableHead = ({subject, sortOrder}) => {
    const [order, setOrder] = useState('');

    const setSortOrder = (order) => {
        setOrder(order);
        sortOrder(order);
    }
    return (
        <React.Fragment>
            <span style={{marginRight: '4px'}}>{subject}</span>
            <span className={styles.span + ' ' + (order === 'ASC' ? styles.disabled : null)}
                  onClick={() => setSortOrder('ASC')}>&#8593;</span>
            <span className={styles.span + ' ' + (order === 'DSC' ? styles.disabled : null)}
                  onClick={() => setSortOrder('DSC')}>&#8595;</span>
        </React.Fragment>
    )
}


export default SortableHead;