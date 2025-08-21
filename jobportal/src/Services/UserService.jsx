// import axios from 'axios'
import axiosInstance from '../Interceptor/AxiosInterceptor';

import { jwtDecode } from "jwt-decode";
import { errorNotification } from './NotificationService';

let storedToken = localStorage.getItem("token");

if (storedToken) {
  try {
    const decodedToken = jwtDecode(storedToken);
    if (decodedToken.exp * 1000 < Date.now()) {
      console.warn("Token expired, logging out...");
      errorNotification("Token expired", "Please login again");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      storedToken = null; 
    }
  } catch (error) {
    console.error("Invalid token:", error);
    localStorage.removeItem("token");
    storedToken = null; 
  }
}

export const registerUser = async (user) => {
  return axiosInstance.post(process.env.REACT_APP_USERS_REGISTERUSER, user)
    .then(response => response.data)
    .catch(error => {
      console.error('Error registering user:', error.message);
      throw error;
    });
};

export const loginUser = async (login) => {

  return axiosInstance.post(process.env.REACT_APP_USERS_LOGINUSER, login)
    .then(response => response.data)
    .catch(error => {
      if (error.response) {
        if (error.response.status === 404) {
          throw new Error('User not found');
        } else if (error.response.status === 401) {
          throw new Error('Incorrect credentials');
        }
      }
      console.error('Error logging in user:', error.message);
      throw error;
    });
};

export const getAllUsers = async (pageNumber=0 ,pageSize=10) => {
  const params=new URLSearchParams({
    pageNumber:pageNumber.toString(),
    pageSize:pageSize.toString(),
  });
 
    const url = `${process.env.REACT_APP_USERS_GETALLUSERS}?${params.toString()}`;
    return axiosInstance.get(url)
    .then(response=>response.data)
    . catch (error =>{
    console.error('Error fetching all users', error.message);
    throw error;
  });
};

export const sendOTP = async (userEmail) => {
  return axiosInstance.post(process.env.REACT_APP_USERS_SENDOTP.replace('{userEmail}', userEmail))
    .then(response => response.data)
    .catch(error => {
      console.error('Error sending OTP:', error.message);
      throw error;
    });
};

export const verifyOTP = async (userEmail, otp) => {
  return axiosInstance.get(process.env.REACT_APP_USERS_VERIFYOTP.replace('{userEmail}', userEmail).replace('{otp}', otp))
    .then(response => response.data)
    .catch(error => {
      console.error('Error sending OTP:', error.message);
      throw error;
    });
}

// Function to change password
export const changePassword = async (userEmail, userPassword) => {
  const url = process.env.REACT_APP_USERS_CHANGEPASSWORD;
  if (!url) {
    console.error('API URL not defined in environment variables');
    throw new Error('API URL not defined in environment variables');
  }
  const payload = {
    userEmail: userEmail,
    userPassword: userPassword
  };
  return axiosInstance.post(url, payload)
    .then(response => {
      if (response && response.data) {
        return response.data;
      } else {
        throw new Error('Unexpected response format');
      }
    })
    .catch(error => {
      console.error('Error changing password:', error.message);
      throw error;
    });
};
