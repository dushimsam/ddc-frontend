import React from 'react';
import styles from '../styles/components/Breadcrumb.module.css';

export default function BreadCrumb(props) {
    return (
        <nav aria-label="breadcrumb">
            <ol className={'breadcrumb ' + styles.breadCrumb}>
                {!props.isCars ? 
                    <React.Fragment>
                        <li className="breadcrumb-item"><a>{props.navigation.model}</a></li>
                        <li className="breadcrumb-item"><a>{props.navigation.year}</a></li>
                        <li className="breadcrumb-item"><a>{props.navigation.category}</a></li>
                        <li className="breadcrumb-item active" aria-current="page">{props.navigation.subCategory}</li>
                    </React.Fragment>
                :   <React.Fragment>
                        <li className="breadcrumb-item"><a>{props.navigation.company}</a></li>
                        <li className="breadcrumb-item"><a>{props.navigation.model}</a></li>
                    </React.Fragment>
                }
               
            </ol>
        </nav>
    )
}
