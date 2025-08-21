package com.endava.jobsnap.service.impl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.endava.jobsnap.configurations.AppConstantsConfig;
import com.endava.jobsnap.dto.AccountType;
import com.endava.jobsnap.dto.ApplicantDTO;
import com.endava.jobsnap.dto.Application;
import com.endava.jobsnap.dto.ApplicationStatus;
import com.endava.jobsnap.dto.JobDTO;
import com.endava.jobsnap.dto.JobStatus;
import com.endava.jobsnap.dto.NotificationDTO;
import com.endava.jobsnap.entities.Applicant;
import com.endava.jobsnap.entities.Job;
import com.endava.jobsnap.entities.User;
import com.endava.jobsnap.mapper.ApplicantMapper;
import com.endava.jobsnap.mapper.JobMapper;
import com.endava.jobsnap.repositories.JobRepository;
import com.endava.jobsnap.repositories.UserRepository;
import com.endava.jobsnap.response.ApiResponse;
import com.endava.jobsnap.service.JobService;
import com.endava.jobsnap.service.NotificationService;

import lombok.RequiredArgsConstructor;

@Service(value = "jobService")
@RequiredArgsConstructor
public class JobServiceImpl implements JobService {
	
    private final AppConstantsConfig constants;  

    private final JobRepository jobRepository;
    private final JobMapper jobMapper;
    private final UserRepository userRepository;
    private final ApplicantMapper applicantMapper;
    private final NotificationService notificationService;
    private static final Logger logger = LoggerFactory.getLogger(JobService.class);
    /**
     * Posts a new job or updates an existing one. Sends notifications to the employer and applicants.
     * 
     * @param jobDTO the job details to be posted or updated
     * @return ApiResponse containing the posted/updated job information
     */
    @Override
    public ApiResponse<JobDTO> postJob(JobDTO jobDTO) {
        Job savedJob;
        if (jobDTO.getId() == null || jobDTO.getId() == 0) {
            jobDTO.setPostTime(LocalDateTime.now());
            savedJob = jobRepository.save(jobMapper.toJob(jobDTO));

            // Sending notification to the employer
            NotificationDTO notificationDTO = new NotificationDTO();
            notificationDTO.setAction("Job Posted");
            notificationDTO.setMessage("Job Posted Successfully for: " + jobDTO.getJobTitle() + " at " + jobDTO.getCompany());
            notificationDTO.setUserEmail(jobDTO.getPostedBy());
            notificationDTO.setRoute("/posted-job/" + savedJob.getId());
            notificationService.sendNotification(notificationDTO);

            // Send notification to all users with AccountType 'APPLICANT'
            sendNotificationToUsers(jobDTO, savedJob);
        } else {
            Job job = jobRepository.findById(jobDTO.getId()).orElse(null);
            if (job == null || job.getJobStatus().equals(JobStatus.DRAFT) || jobDTO.getJobStatus().equals(JobStatus.CLOSED)) {
                jobDTO.setPostTime(LocalDateTime.now());
            }
            savedJob = jobRepository.save(jobMapper.toJob(jobDTO));
        }
        return ApiResponse.success(jobMapper.toJobDto(savedJob), "Job posted Successfully", HttpStatus.CREATED.value());
    }

    /**
     * Sends notifications to all users with AccountType 'APPLICANT' about a new job posting.
     * 
     * @param jobDTO the job details to notify applicants about
     * @param savedJob the saved job to send notifications for
     */
    void sendNotificationToUsers(JobDTO jobDTO, Job savedJob) {
        List<User> usersWithAccountTypeApplicant = userRepository.findByAccountType(AccountType.APPLICANT);

        for (User user : usersWithAccountTypeApplicant) {
            NotificationDTO userNotification = new NotificationDTO();
            userNotification.setAction("New Job Posted");
            userNotification.setMessage("A new job has been posted: " + jobDTO.getJobTitle() + " job at " + jobDTO.getCompany());
            userNotification.setUserEmail(user.getUserEmail());
            userNotification.setRoute("/job-history");

            try {
                notificationService.sendNotification(userNotification);
            } catch (Exception e) {
            	logger.error("Error sending notification to {}: {}", user.getUserEmail(), e.getMessage(), e);
            }
        }
    }

    /**
     * Retrieves all posted jobs with pagination.
     * 
     * @param pageNumber the page number to retrieve
     * @param pageSize the number of jobs per page
     * @return ApiResponse containing a Page of JobDTOs
     */
    @Override
    public ApiResponse<Page<JobDTO>> getAllPostedJobs(int pageNumber, int pageSize) {
        PageRequest pageable = PageRequest.of(pageNumber, pageSize);
        Page<Job> jobs = jobRepository.findAll(pageable);
        List<JobDTO> jobDTOList = jobs.getContent().stream().map(jobMapper::toJobDto).toList();
        
        return ApiResponse.success(
            new PageImpl<>(jobDTOList, pageable, jobs.getTotalElements()),
            "Jobs retrieved successfully",
            HttpStatus.OK.value()
        );
       
    }

    /**
     * Retrieves a posted job by its ID.
     * 
     * @param id the job ID to search for
     * @return ApiResponse containing the job details or an error message
     */
    @Override
    public ApiResponse<JobDTO> getPostedJobById(Long id) {
        Job job = jobRepository.findById(id).orElse(null);
        if (job == null) {
            return ApiResponse.failure("Job not found", HttpStatus.NOT_FOUND.value());
        }
        if (job.getApplicants() == null) {
            job.setApplicants(new ArrayList<>());
        }
        return ApiResponse.success(jobMapper.toJobDto(job), "Job retrieved successfully", HttpStatus.OK.value());
    }

    /**
     * Allows an applicant to apply for a job.
     * 
     * @param id the job ID to apply for
     * @param applicantDTO the applicant details
     * @return ApiResponse indicating success or failure of the application
     */
    @Override
    public ApiResponse<JobDTO> applyJob(Long id, ApplicantDTO applicantDTO) {
        Job job = jobRepository.findById(id).orElse(null);
        if (job == null) {
            return ApiResponse.failure("Job not found", HttpStatus.NOT_FOUND.value());
        }

        List<Applicant> applicants = job.getApplicants();
        if (applicants == null) {
            applicants = new ArrayList<>();
        }

        if (applicantDTO.getEmail() != null) {
            boolean hasAlreadyApplied = applicants.stream()
                    .anyMatch(x -> x.getEmail().equals(applicantDTO.getEmail()));

            if (hasAlreadyApplied) {
                return ApiResponse.failure("Job already applied", HttpStatus.BAD_REQUEST.value());
            }
        }

        applicantDTO.setApplicationStatus(ApplicationStatus.APPLIED);
        Applicant applicant = applicantMapper.toApplicant(applicantDTO);
        applicant.setJob(job);

        applicants.add(applicant);
        job.setApplicants(applicants);
        jobRepository.save(job);

        return ApiResponse.success(null, "Application submitted successfully", HttpStatus.CREATED.value());
    }

    /**
     * Retrieves all jobs posted by a specific user based on their email.
     * 
     * @param userEmail the email of the user who posted the jobs
     * @return ApiResponse containing a list of JobDTOs
     */
    @Override
    public ApiResponse<List<JobDTO>> getJobsPostedByEmail(String userEmail) {
        List<JobDTO> jobs = jobRepository.findByPostedBy(userEmail).stream().map(jobMapper::toJobDto).toList();
        return ApiResponse.success(jobs, "Jobs retrieved successfully", HttpStatus.OK.value());
    }

    /**
     * Changes the application status of a job applicant.
     * 
     * @param application the application details including new status
     * @return ApiResponse indicating success or failure of the status update
     */
    @Override
    public ApiResponse<JobDTO> changeApplicationStatus(Application application) {
        Job job = jobRepository.findById(application.getId()).orElse(null);
        if (job == null) {
            return ApiResponse.failure("Job not found", HttpStatus.NOT_FOUND.value());
        }

        for (Applicant applicant : job.getApplicants()) {
            if (application.getEmail().equals(applicant.getEmail())) {
                applicant.setApplicationStatus(application.getApplicationStatus());

                // Handle different application statuses
                if (application.getApplicationStatus() == ApplicationStatus.INTERVIEWING) {
                    applicant.setInterviewTime(application.getInterviewTime());
                    sendNotification(application.getEmail(), "Interview Scheduled", "Interview scheduled for job Id: " + application.getId(), "/job-history");
                } else if (application.getApplicationStatus() == ApplicationStatus.OFFERED) {
                    sendNotification(application.getEmail(), "Job Offered", job.getJobTitle() + " job is offered for you", "/job-history");
                } else if (application.getApplicationStatus() == ApplicationStatus.REJECTED) {
                    sendNotification(application.getEmail(), "Job Rejected", "Job application has been rejected","/job-history");
                }
            }
        }

        jobRepository.save(job);
        return ApiResponse.success(null, "Application status changed successfully", HttpStatus.OK.value());
    }

    /**
     * Sends a notification to the user about the application status update.
     * 
     * @param userEmail the email of the user to notify
     * @param action the action for the notification (e.g., "Job Offered")
     * @param message the message to send in the notification
     * @param route the route for the notification (e.g., "/job-history")
     */
    private void sendNotification(String userEmail, String action, String message, String route) {
        NotificationDTO notificationDTO = new NotificationDTO();
        notificationDTO.setAction(action);
        notificationDTO.setMessage(message);
        notificationDTO.setUserEmail(userEmail);
        notificationDTO.setRoute(route);
        notificationService.sendNotification(notificationDTO);
    }
}