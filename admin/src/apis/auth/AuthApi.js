import request from "../request";
import { POST_LOGIN_URI} from "../../configs/url";




export const postLoginApi=async (payload)=>{
  return await request.post(POST_LOGIN_URI,{userName:payload.userName,password:payload.password});
}
