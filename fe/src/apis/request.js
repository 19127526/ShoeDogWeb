
import axios from "axios";
import {SERVER_URL} from "../configs/url";

const request = axios.create({
  baseURL: SERVER_URL,
});

request.interceptors.request.use(index=>{
  return index;
})
request.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    if(error.response.status===404){
      return error.response;
    }
    return error;
  }
);


export default request;

