
import axios from "axios";
import {SERVER_URL} from "../configs/url";

const messageToken = ['Unauthorized', 'Token expired', 'Invalid token']
const request = axios.create({
  baseURL: SERVER_URL,
  headers:{
    
  }
});


request.interceptors.request.use(
    async config => {
      config.headers.Authorization =  `${localStorage.getItem('accessToken')}`;
      return config;
    },
    error => {
      return Promise.reject(error);
    });


request.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    if(error.response.status===404){
      return error.response;
    }
    // else if(error.response.status===401){
    //     localStorage.removeItem('accessToken')
    // }
    return Promise.reject(error);
  }
);


export default request;

