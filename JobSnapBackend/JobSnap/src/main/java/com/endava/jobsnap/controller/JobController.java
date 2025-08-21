//package com.endava.jobsnap.controller;

//
//import java.util.List;
//
//import org.springframework.data.domain.Page;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.validation.annotation.Validated;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.endava.jobsnap.configurations.CrossOriginConfig;
//import com.endava.jobsnap.dto.ApplicantDTO;
//import com.endava.jobsnap.dto.Application;
//import com.endava.jobsnap.dto.JobDTO;
//import com.endava.jobsnap.response.ApiResponse;
//import com.endava.jobsnap.service.JobService;
//
//import jakarta.validation.Valid;
//import lombok.RequiredArgsConstructor;
//
//@RestController
//@CrossOrigin(CrossOriginConfig.CROSS_ORIGIN)
//@Validated
//@RequestMapping("/jobs")
//@RequiredArgsConstructor
//public class JobController {
//	
//    private final JobService jobService;
//
//    @PostMapping("/jobposting")
//    public ResponseEntity<ApiResponse<JobDTO>> postJob(@RequestBody @Valid JobDTO jobDTO) {
//        ApiResponse<JobDTO> response = jobService.postJob(jobDTO);
//        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatusCode()));
//    }
//
////    @GetMapping("/getAll")
////    public ResponseEntity<ApiResponse<List<JobDTO>>> getAllPostedJobs() {
////        ApiResponse<List<JobDTO>> response = jobService.getAllPostedJobs();
////        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatusCode()));
////    }
//    
//    @GetMapping("/getAll")
//    public ResponseEntity<ApiResponse<Page<JobDTO>>> getAllPostedJobs(
//        @RequestParam(defaultValue = "0") int pageNumber,
//        @RequestParam(defaultValue = "0") int pageSize
//    ) {
//        ApiResponse<Page<JobDTO>> response = jobService.getAllPostedJobs(pageNumber, pageSize);
//        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatusCode()));
//    }
//
//
//    @GetMapping("/getPostedJobById/{id}")
//    public ResponseEntity<ApiResponse<JobDTO>> getPostedJobById(@PathVariable("id") Long id) {
//        ApiResponse<JobDTO> response = jobService.getPostedJobById(id);
//        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatusCode()));
//    }
//
//    @PostMapping("/applyJob/{id}")
//    public ResponseEntity<ApiResponse<JobDTO>> applyJob(@PathVariable Long id, @RequestBody ApplicantDTO applicantDTO) {
//        ApiResponse<JobDTO> response = jobService.applyJob(id, applicantDTO);
//        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatusCode()));
//    }
//
//    @GetMapping("/postedBy/{userEmail}")
//    public ResponseEntity<ApiResponse<List<JobDTO>>> getJobsPostedBy(@PathVariable String userEmail) {
//        ApiResponse<List<JobDTO>> response = jobService.getJobsPostedByEmail(userEmail);
//        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatusCode()));
//    }
//
//    @PostMapping("/changeApplicationStatus")
//    public ResponseEntity<ApiResponse<JobDTO>> changeApplicationStatus(@RequestBody Application application) {
//        ApiResponse<JobDTO> response = jobService.changeApplicationStatus(application);
//        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatusCode()));
//    }
//	 
//}


package com.endava.jobsnap.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.endava.jobsnap.configurations.CrossOriginConfig;
import com.endava.jobsnap.dto.ApplicantDTO;
import com.endava.jobsnap.dto.Application;
import com.endava.jobsnap.dto.JobDTO;
import com.endava.jobsnap.response.ApiResponse;
import com.endava.jobsnap.service.JobService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(CrossOriginConfig.CROSS_ORIGIN)
@Validated
@RequestMapping("/jobs")
@RequiredArgsConstructor
public class JobController {
    
    private final JobService jobService;

    /**
     * Endpoint to post a new job.
     * 
     * @param jobDTO the job details to be posted
     * @return ResponseEntity<ApiResponse<JobDTO>> the response containing the posted job details
     */
    @PostMapping("/jobposting")
    public ResponseEntity<ApiResponse<JobDTO>> postJob(@RequestBody @Valid JobDTO jobDTO) {
        ApiResponse<JobDTO> response = jobService.postJob(jobDTO);
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatusCode()));
    }

    /**
     * Endpoint to fetch all posted jobs with pagination.
     * 
     * @param pageNumber the page number to retrieve (default is 0)
     * @param pageSize the number of items per page (default is 0)
     * @return ResponseEntity<ApiResponse<Page<JobDTO>>> the response containing a paginated list of job details
     */
    @GetMapping("/getAll")
    public ResponseEntity<ApiResponse<Page<JobDTO>>> getAllPostedJobs(
        @RequestParam(defaultValue = "0") int pageNumber,
        @RequestParam(defaultValue = "5") int pageSize
    ) {
        ApiResponse<Page<JobDTO>> response = jobService.getAllPostedJobs(pageNumber, pageSize);
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatusCode()));
    }

    /**
     * Endpoint to fetch a specific job by its ID.
     * 
     * @param id the job ID
     * @return ResponseEntity<ApiResponse<JobDTO>> the response containing the job details
     */
    @GetMapping("/getPostedJobById/{id}")
    public ResponseEntity<ApiResponse<JobDTO>> getPostedJobById(@PathVariable("id") Long id) {
        ApiResponse<JobDTO> response = jobService.getPostedJobById(id);
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatusCode()));
    }

    /**
     * Endpoint for applying to a job.
     * 
     * @param id the job ID
     * @param applicantDTO the applicant details
     * @return ResponseEntity<ApiResponse<JobDTO>> the response after applying to the job
     */
    @PostMapping("/applyJob/{id}")
    public ResponseEntity<ApiResponse<JobDTO>> applyJob(@PathVariable Long id, @RequestBody ApplicantDTO applicantDTO) {
        ApiResponse<JobDTO> response = jobService.applyJob(id, applicantDTO);
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatusCode()));
    }

    /**
     * Endpoint to get jobs posted by a specific user.
     * 
     * @param userEmail the email of the user who posted the jobs
     * @return ResponseEntity<ApiResponse<List<JobDTO>>> the response containing the list of jobs posted by the user
     */
    @GetMapping("/postedBy/{userEmail}")
    public ResponseEntity<ApiResponse<List<JobDTO>>> getJobsPostedBy(@PathVariable String userEmail) {
        ApiResponse<List<JobDTO>> response = jobService.getJobsPostedByEmail(userEmail);
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatusCode()));
    }

    /**
     * Endpoint to change the application status for a job.
     * 
     * @param application the application details (includes the job and applicant info)
     * @return ResponseEntity<ApiResponse<JobDTO>> the response after changing the application status
     */
    @PostMapping("/changeApplicationStatus")
    public ResponseEntity<ApiResponse<JobDTO>> changeApplicationStatus(@RequestBody Application application) {
        ApiResponse<JobDTO> response = jobService.changeApplicationStatus(application);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
