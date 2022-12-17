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

export const convertDate=(newDate)=>{
  let dateVal ="/Date("+newDate+")/";
  let date = new Date(parseFloat(dateVal.substr(6)));
  const YYYY = date.getFullYear();
  let DD = date.getMonth()+1;
  let MM = date.getDate();
  let HH = date.getHours() ;
  let mm = date.getMinutes()
  let ss = date.getSeconds();


  if(DD<10)
  {
    DD=`0${DD}`;
  }
  if(MM<10)
  {
    MM=`0${MM}`;
  }

  if(HH<10)
  {
    HH=`0${HH}`;
  }
  if(mm<10)
  {
    mm=`0${mm}`;
  }
  if(ss<10)
  {
    ss=`0${ss}`;
  }
  return (DD+"/"+MM+"/"+YYYY+", "+mm+ss)
}


