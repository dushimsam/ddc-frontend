export  function checkProperties(obj,expectionArr) {
    if(expectionArr)
    {
      expectionArr.forEach((prop)=>{
 if(obj.hasOwnProperty(prop))
                delete obj[prop]         
      })
    }
   for (var key in obj) {
        if (obj[key] == null || obj[key] == "")
            return false;
    }
    return true;
}