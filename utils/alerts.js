import { ToastContainer, toast } from 'react-toastify';
import {ALERT_EXPIRATION_PERIOD} from "./constants";

export const alertSuccess = (setAlert,message,status)=>
{
    setAlert({show: true, class: "success", message: message+" sucessfully",status:status});          
}


export const alertFailer = (setAlert,message,status)=>
{
    setAlert({show: true, class: "danger", message: message,status:status});   
}



export const notifySuccess = (successMess,POSITION="BOTTOM_LEFT") => toast.success(successMess,{position:toast.POSITION[POSITION]});
export const notifyError = (errorMess,POSITION="BOTTOM_LEFT") => toast.error(errorMess,{position:toast.POSITION[POSITION]});
export const notifyInfo = (errorMess,POSITION="BOTTOM_LEFT") => toast.info(errorMess,{position:toast.POSITION[POSITION]});


export  const basic_alerts = (setLoading,setAlert)=>{
    window.setTimeout(function () {
          setLoading(false);
          setAlert({ message: "", class: "", show: false })
       }, ALERT_EXPIRATION_PERIOD);
}