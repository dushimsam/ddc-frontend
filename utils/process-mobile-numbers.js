
export const processRdaMobile =(phone) =>{
    let processed_phone = phone?.substring(1);
    processed_phone = "+250 "+processed_phone;
    return processed_phone;
}