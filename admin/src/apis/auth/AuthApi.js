import request from "../request";
import { POST_LOGIN_URI} from "../../configs/url";




export const postLoginApi=async (payload)=>{
  return await request.post(POST_LOGIN_URI,{username:payload.username,password:payload.password});
}
