import Resizer from "react-image-file-resizer";

export const getWindowHeight = () => {
  const {innerHeight} = window;
  return {innerHeight};
}
export const getWindowWidth=()=>{
  const {innerWidth}=window;
  return {innerWidth}
}


export const resizeImage=(url,width,height)=>{
  return Resizer.imageFileResizer(
    url,
    width,
    height,
    "JPEG,PNG",
    100,
    0,
    uri=>{
      return uri;
    },
    "base64",
    width,
    height
  )
}


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

export const convertArrayToSize=(arr)=>{
  let totalPriceSet=new Set();
  const totalPrice=convertArrayToOptions(arr,", ");
  totalPrice.map(index=>{
    const temp=convertArrayToOptions(index,": ");
    totalPriceSet.add(temp[1])
  })
  return new Array(...totalPriceSet);
}

export const onlyUnique = (value, index, self) => {
  return self.indexOf(value) === index;
}

export const minValue = (...args) => {
  const min = args.reduce((acc, val) => {
    return Number(acc) < Number(val) ? acc : val;
  });
  return min;
}

export const maxValue = (...args) => {
  const max = args.reduce((acc, val) => {
    return Number(acc) > Number(val) ? acc : val;
  });
  return max;
}


