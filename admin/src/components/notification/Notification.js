import { notification } from "antd";
import * as constraints from "./Notification.constraints"


const Notification = (title, description,status) => {
  setTimeout(() => {
    notification.destroy(status);
  },3000)
  if(status===constraints.NOTIFICATION_SUCCESS){
    return notification.success({
      key: status,
      message: title,
      description,
    });
  }
  else if(status===constraints.NOTIFICATION_WARN){
    return notification.warn({
      key: status,
      message: title,
      description
    });
  }
  else if(status===constraints.NOTIFICATION_ERROR){
    return notification.error({
      key: status,
      message: title,
      description
    });
  }

};

export default Notification;
