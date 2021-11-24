
function sortExtractedData(extractedData,order){

function encreasing( a, b) {
  if ( a.value < b.value ){
    return -1;
  }
  if ( a.value > b.value ){
    return 1;
  }
  return 0;
}

function decreasing( a, b) {
  if ( a.value > b.value ){
    return -1;
  }
  if ( a.value < b.value ){
    return 1;
  }
  return 0;
}


if(order == "DSC")
{
  extractedData.sort( decreasing );
}else{
  extractedData.sort( encreasing );
}

return extractedData;
}

function map(extractedData,realData)
{
  let  ids =  extractedData.map(item => item["id"]);
  let  order = {};

ids.forEach(function (a, i) { order[a] = i; });

realData.sort(function (a, b) {
    return order[a._id] - order[b._id];
});

return realData;
}



 const SortTables  = (extractedData,realData,order) =>{
    return map(sortExtractedData(extractedData, order), realData);
}

export default SortTables;



