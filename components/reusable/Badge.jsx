import { useRouter } from 'next/router';
import React from 'react'
const Badge = ({color,text,value,link,col1,col2, small, active}) =>{
    const router = useRouter();
    return(
   <div className="card cursor-pointer rounded-sm border-0" style={{boxShadow: "0px 10px 20px #00000012"}} onClick={()=>router.push(link)}>
     <div className="card-content">
       <div className="card-body cleartfix rounded-sm " style={(active) ? styles.activeCard : null}>
         <div className="media row">
           <div className={"align-self-center "+col1}>
               {small ? (
                   <h6 style={styles.smallTitle}>{text}</h6>
               ) : (
                   <h6 style={styles.title}>{text}</h6>
               )}

           </div>
           <div className={"col-3 align-self-center "+col2}>
               {small ? (
                   <span style={styles.smallBadge}>{value}</span>
               ) : (
                   <span style={styles.badge}>{value}</span>
               )}

           </div>
         </div>
       </div>
     </div>
   </div>
)
}

const styles = {
    title: {
        marginBottom: '0',
        color: '#707070',
        fontFamily: 'sans-serif'
    },
    smallTitle: {
        marginBottom: '0',
        color: '#707070',
        fontSize: '13px',
        fontFamily: 'sans-serif'
    },
    badge: {
        borderRadius: '9999px',
        padding: '0.25rem 0.8rem',
        color: '#fff',
        fontSize: '.8rem',
        fontFamily: 'sans-serif',
        verticalAlign: 'text-bottom',
        backgroundColor: '#ff5555'
    },
    smallBadge: {
        borderRadius: '9999px',
        padding: '0.25rem 0.7rem',
        color: '#fff',
        fontSize: '.6rem',
        fontFamily: 'sans-serif',
        verticalAlign: 'text-top',
        backgroundColor: '#ff5555'
    },
    activeCard: {
        border: '1px solid rgb(255, 85, 85)'
    }
}

export default Badge;