const convertArrayToOptions=(arr,splitIndex)=>{
  if(arr===null){
    return null
  }
  else{
    return arr.split(splitIndex)
  }
}

 const convertArrayToQuantity=(arr)=>{
  let quantityArr=[];
  const quantity=convertArrayToOptions(arr,", ");
  quantity.map(index=>{
    const temp=convertArrayToOptions(index,": ");
    quantityArr.push(temp[1]);
  })
  return quantityArr;
}

const convertArrayToSize2Price=(arr)=>{
  let totalPriceSet=new Set();
  const totalPrice=convertArrayToOptions(arr,", ");
  totalPrice.map(index=>{
    const temp=convertArrayToOptions(index,": ");
    totalPriceSet.add(temp[1])
  })
  return new Array(...totalPriceSet);
}

module.exports = {
  convertArrayToSize2Price,
  convertArrayToQuantity,
  convertArrayToOptions
};
