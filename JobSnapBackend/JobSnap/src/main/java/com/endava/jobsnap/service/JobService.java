package com.endava.jobsnap.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.endava.jobsnap.dto.ApplicantDTO;
import com.endava.jobsnap.dto.Application;
import com.endava.jobsnap.dto.JobDTO;
import com.endava.jobsnap.response.ApiResponse;

public interface JobService {

	public ApiResponse<JobDTO> postJob(JobDTO jobDTO) ;

	public ApiResponse<Page<JobDTO>> getAllPostedJobs(int pageNumber, int pageSize) ;

	public ApiResponse<JobDTO> getPostedJobById(Long id) ;

	public ApiResponse<JobDTO> applyJob(Long id, ApplicantDTO applicantDTO) ;

	public ApiResponse<JobDTO> changeApplicationStatus(Application application);

	public ApiResponse<List<JobDTO>> getJobsPostedByEmail(String userEmail);


	

}
