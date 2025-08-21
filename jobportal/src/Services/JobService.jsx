// import axios from "axios";
import axiosInstance from "../Interceptor/AxiosInterceptor";

export const jobPosting = async (job) => {
    return axiosInstance.post(process.env.REACT_APP_JOBS_JOBPOSTING, job)  
      .then(response => response.data)
      .catch(error => {
        console.error('Error registering user:', error.message);
        throw error;
      });
  };


  // export const getAllJobs=async()=>{
  //   return axiosInstance.get(process.env.REACT_APP_JOBS_GETALL)  
  //    .then(response => response.data)
  //    .catch(error => {
  //       console.error('Error updating profile:', error.message);
  //       throw error;
  //     });
  // };


  export const getAllJobs = async (pageNumber = 0, pageSize = 10) => {
    const params = new URLSearchParams({
        pageNumber: pageNumber.toString(),
        pageSize: pageSize.toString(),
    });
    const url = `${process.env.REACT_APP_JOBS_GETALL}?${params.toString()}`;
    return axiosInstance.get(url)
        .then(response => response.data)
        .catch(error => {
            console.error('Error updating profile:', error.message);
            throw error;
        });
};

  export const getPostedJobById = async (id) => {
    const finalUrl = process.env.REACT_APP_JOBS_GETPOSTEDJOBBYID+"/"+id;
    try {
      const response = await axiosInstance.get(finalUrl);
      return response.data;
    } catch (error) {
      console.error('Error fetching profile:', error.message);
      throw error;
    }
  };

  export const applyJob = async (id,applicant) => {
    const finalUrl = process.env.REACT_APP_JOBS_APPLYJOB
    try {
      const response = await axiosInstance.post(`${finalUrl}/${id}`,applicant)
      return response.data;
    } catch (error) {
      console.error('Error fetching profile:', error.message);
      throw error;
    }
  };

  // export const  getJobsPostedBy=async (id) => {
  //   const finalUrl = process.env.REACT_APP_JOBS_POSTEDBY+"/"+id;
  //   try {
  //     const response = await axios.get(finalUrl);
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error fetching profile:', error.message);
  //     throw error;
  //   }
  // };


  export const  getJobsPostedByEmail=async (userEmail) => {
    const finalUrl = process.env.REACT_APP_JOBS_POSTEDBYEMAIL+"/"+userEmail;
    try {
      const response = await axiosInstance.get(finalUrl);
      return response.data;
    } catch (error) {
      console.error('Error fetching profile:', error.message);
      throw error;
    }
  };

  export const changeApplicationStatus=async (application) => {
    return axiosInstance.post(process.env.REACT_APP_JOBS_CHANGEAPPLICATIONSTATUS,application)
     .then(response => response.data)
     .catch(error => {
        console.error('Error updating profile:', error.message);
        throw error;
      });
  }
  

  export const getAllJobsByCompanyId=async (companyId) => {
  return axiosInstance.get(process.env.REACT_APP_JOBS_GETALLJOBSBYCOMPANYID+"/"+companyId)
     .then(response => response.data)
     .catch(error => {
        console.error('Error while getting company', error.message);
        throw error;
      });
  }

