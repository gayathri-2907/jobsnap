
import axiosInstance from '../Interceptor/AxiosInterceptor';

export const getProfile = async (profileId) => {
  const finalUrl = process.env.REACT_APP_PROFILES_GETPROFILE + "/" + profileId;
  try {
    const response = await axiosInstance.get(finalUrl); 
    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error.message);
    throw error;
  }
};

export const getProfileByEmail = async (email) => {
  const finalUrl = process.env.REACT_APP_PROFILES_GETPROFILEBYEMAIL + "/" + email;
  try {
    const response = await axiosInstance.get(finalUrl); 
    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error.message);
    throw error;
  }
};

export const getAllProfiles = async (pageNumber=0 ,pageSize=10) => {
  const params=new URLSearchParams({
    pageNumber:pageNumber.toString(),
    pageSize:pageSize.toString(),
  });
 
    const url = `${process.env.REACT_APP_PROFILES_GETALLPROFILES}?${params.toString()}`;
    return axiosInstance.get(url)
    .then(response=>response.data)
    . catch (error =>{
    console.error('Error fetching all profiles:', error.message);
    throw error;
  });
};

export const updateProfile = async (profile) => {
  try {
    const response = await axiosInstance.put(process.env.REACT_APP_PROFILES_UPDATEPROFILE, profile); 
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error.message);
    throw error;
  }
};
