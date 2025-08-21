import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
// import axios from 'axios'
import axiosInstance from "../Interceptor/AxiosInterceptor";
 export const successNotification=(title,message)=>{
    notifications.show({
        title: title,
        message: message,
        withCloseButton: true,
        icon: <IconCheck />,
        color: "teal",
        withBorder: true,
      });
}

export const errorNotification=(title,message)=>{
    notifications.show({
        title: title,
        message: message,
        withCloseButton: true,
        icon: <IconX />,
        color: "red",
        withBorder: true,
      });
}


export const getAllNotifications=async(userEmail)=>{
  return axiosInstance.get(process.env.REACT_APP_NOTIFICATIONS_GETALLNOTIFICATIONS+"/"+userEmail)  
   .then(response => response.data)
   .catch(error => {
      console.error('Error updating profile:', error.message);
      throw error;
    });
};


export const readNotification=async(id)=>{
  return axiosInstance.put(process.env.REACT_APP_NOTIFICATIONS_READNOTIFICATION+"/"+id )  
   .then(response => response.data)
   .catch(error => {
      console.error('Error updating profile:', error.message);
      throw error;
    });
};

