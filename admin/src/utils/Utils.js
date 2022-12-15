export const getWindowHeight = () => {
  const {innerHeight} = window;
  return {innerHeight};
}
export const getWindowWidth = () => {
  const {innerWidth} = window;
  return {innerWidth}
}

export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });


export const convertArrayToOptions=(arr,splitIndex)=>{
  if(arr===null){
    return null
  }
  else{
    return arr.split(splitIndex)
  }
}


