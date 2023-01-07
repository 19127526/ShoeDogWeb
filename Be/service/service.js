export const convertArrayToOptions=(arr,splitIndex)=>{
  if(arr===null){
    return null
  }
  else{
    return arr.split(splitIndex)
  }
}

export const convertArrayToQuantity=(arr)=>{
  let quantityArr=[];
  const quantity=convertArrayToOptions(arr,", ");
  quantity.map(index=>{
    const temp=convertArrayToOptions(index,": ");
    quantityArr.push(temp[1]);
  })
  return quantityArr;
}

export const convertArrayToSize2Price=(arr)=>{
  let totalPriceSet=new Set();
  const totalPrice=convertArrayToOptions(arr,", ");
  totalPrice.map(index=>{
    const temp=convertArrayToOptions(index,": ");
    totalPriceSet.add(temp[1])
  })
  return new Array(...totalPriceSet);
}
