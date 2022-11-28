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
