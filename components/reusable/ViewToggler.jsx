import styles from '../../styles/components/cars/Lander.module.css';
import Link from 'next/link';

export default function ViewToggler ({index=true}) {
    const paths = [
        {name: 'Full Car', href: '/cars'},
        {name: 'Full Car', href: '/'}
    ];
    return (
        <div className="row">
            <div className="col-12 col-md-12 col-lg-12 col-xl-12 col-sm-12 mb-4">
                <Link href={(index) ? '/' : '/cars'} passHref>
                    <button className={"btn mr-3 " + styles.btn + ' ' + styles.btnOne}>{(index) ? 'Spare Parts' : 'Cars'}</button>
                </Link>
                <Link href={(index) ? '/cars' : '/'} passHref>
                    <button className={"btn " + styles.btn + ' ' + styles.btnTwo}>{(index) ? 'Cars' : 'Spare Parts'}</button>
                </Link>
            </div>
        </div>
    )
}