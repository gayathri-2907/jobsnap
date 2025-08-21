import axios from "axios"
import { removeUser } from "../Slices/UserSlice";

export const loginUser=async(login)=>{
    return axios.post(process.env.REACT_APP_AUTH_LOGIN,login)
    .then(result=>result.data)
        .catch(error => {
      if (error.response) {
        if (error.response.status === 404) {
          throw new Error('User not found');
        } else if (error.response.status === 401) {
          throw new Error('Incorrect credentials');
        }
      }
      throw error;
    });
}



export const navigateToLogin=(navigate)=>{
    localStorage.removeItem('token');
    removeUser();
    navigate('/login');

}