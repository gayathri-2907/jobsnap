package com.endava.jobsnap.service.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.ArgumentMatchers.contains;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;

import com.endava.jobsnap.dto.AccountType;
import com.endava.jobsnap.dto.ApplicantDTO;
import com.endava.jobsnap.dto.Application;
import com.endava.jobsnap.dto.ApplicationStatus;
import com.endava.jobsnap.dto.JobDTO;
import com.endava.jobsnap.dto.NotificationDTO;
import com.endava.jobsnap.entities.Applicant;
import com.endava.jobsnap.entities.Job;
import com.endava.jobsnap.entities.User;
import com.endava.jobsnap.mapper.ApplicantMapper;
import com.endava.jobsnap.mapper.JobMapper;
import com.endava.jobsnap.repositories.JobRepository;
import com.endava.jobsnap.repositories.UserRepository;
import com.endava.jobsnap.response.ApiResponse;
import com.endava.jobsnap.service.NotificationService;

class JobServiceImplTest {

    @InjectMocks
    private JobServiceImpl jobService;

    @Mock
    private JobRepository jobRepository;

    @Mock
    private JobMapper jobMapper;

    @Mock
    private UserRepository userRepository;

    @Mock
    private ApplicantMapper applicantMapper;

    @Mock
    private NotificationService notificationService;
    @Mock
    private JobDTO jobDTO;  
    @Mock
    private Application application;
    
    @Mock
    private Applicant applicant;
      

    @Mock
    private Job savedJob;  
    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void postJob_NewJob_Success() {
        // Given
        JobDTO jobDTO = new JobDTO();
        jobDTO.setJobTitle("Software Engineer");
        jobDTO.setCompany("Endava");
        jobDTO.setPostedBy("employer@endava.com");

        Job job = new Job();
        job.setId(1L);

        // Mocking the service calls
        when(jobMapper.toJob(any(JobDTO.class))).thenReturn(job);
        when(jobRepository.save(any(Job.class))).thenReturn(job);
        when(jobMapper.toJobDto(any(Job.class))).thenReturn(jobDTO);

        // When
        ApiResponse<JobDTO> response = jobService.postJob(jobDTO);

        // Then
        assertEquals(201, response.getStatusCode());
        assertEquals("Job posted Successfully", response.getMessage());
        verify(notificationService, times(1)).sendNotification(any(NotificationDTO.class));
    }

    @Test
    void getPostedJobById_Found() {
        // Given
        Job job = new Job();
        job.setId(1L);
        when(jobRepository.findById(1L)).thenReturn(Optional.of(job));
        when(jobMapper.toJobDto(any(Job.class))).thenReturn(new JobDTO());

        // When
        ApiResponse<JobDTO> response = jobService.getPostedJobById(1L);

        // Then
        assertEquals(200, response.getStatusCode());
        assertNotNull(response.getData());
    }

    @Test
    void getPostedJobById_NotFound() {
        // Given
        when(jobRepository.findById(1L)).thenReturn(Optional.empty());

        // When
        ApiResponse<JobDTO> response = jobService.getPostedJobById(1L);

        // Then
        assertEquals(404, response.getStatusCode());
        assertEquals("Job not found", response.getMessage());
    }

    @Test
    void applyJob_NewApplicant_Success() {
        // Given
        Job job = new Job();
        job.setId(1L);
        job.setApplicants(new ArrayList<>());

        ApplicantDTO applicantDTO = new ApplicantDTO();
        applicantDTO.setEmail("applicant@endava.com");

        Applicant applicant = new Applicant();

        // Mocking the service calls
        when(jobRepository.findById(1L)).thenReturn(Optional.of(job));
        when(applicantMapper.toApplicant(any(ApplicantDTO.class))).thenReturn(applicant);

        // When
        ApiResponse<JobDTO> response = jobService.applyJob(1L, applicantDTO);

        // Then
        assertEquals(201, response.getStatusCode());
        assertEquals("Application submitted successfully", response.getMessage());
        verify(jobRepository, times(1)).save(any(Job.class));
    }

    @Test
    void applyJob_AlreadyApplied_Failure() {
        // Given
        Job job = new Job();
        job.setId(1L);
        Applicant existingApplicant = new Applicant();
        existingApplicant.setEmail("applicant@endava.com");
        job.setApplicants(Collections.singletonList(existingApplicant));

        ApplicantDTO applicantDTO = new ApplicantDTO();
        applicantDTO.setEmail("applicant@endava.com");

        // Mocking the service call
        when(jobRepository.findById(1L)).thenReturn(Optional.of(job));

        // When
        ApiResponse<JobDTO> response = jobService.applyJob(1L, applicantDTO);

        // Then
        assertEquals(400, response.getStatusCode());
        assertEquals("Job already applied", response.getMessage());
    }

    @Test
    void getAllPostedJobs_Success() {
        // Given
        Page<Job> jobPage = new PageImpl<>(Collections.singletonList(new Job()));
        when(jobRepository.findAll(any(PageRequest.class))).thenReturn(jobPage);
        when(jobMapper.toJobDto(any(Job.class))).thenReturn(new JobDTO());

        // When
        ApiResponse<Page<JobDTO>> response = jobService.getAllPostedJobs(0, 10);

        // Then
        assertEquals(200, response.getStatusCode());
        assertEquals(1, response.getData().getContent().size());
    }

    @Test
    void getJobsPostedByEmail_Success() {
        // Given
        when(jobRepository.findByPostedBy("employer@endava.com"))
                .thenReturn(Collections.singletonList(new Job()));
        when(jobMapper.toJobDto(any(Job.class)))
                .thenReturn(new JobDTO());

        // When
        ApiResponse<List<JobDTO>> response = jobService.getJobsPostedByEmail("employer@endava.com");

        // Then
        assertEquals(200, response.getStatusCode());
        assertEquals(1, response.getData().size());
    }

    @Test
    void changeApplicationStatus_Success() {
        // Given
        Job job = new Job();
        Applicant applicant = new Applicant();
        applicant.setEmail("applicant@endava.com");
        job.setApplicants(Collections.singletonList(applicant));

        Application application = new Application();
        application.setId(1L);
        application.setEmail("applicant@endava.com");
        application.setApplicationStatus(ApplicationStatus.INTERVIEWING);

        // Mocking the service calls
        when(jobRepository.findById(1L)).thenReturn(Optional.of(job));

        // When
        ApiResponse<JobDTO> response = jobService.changeApplicationStatus(application);

        // Then
        assertEquals(200, response.getStatusCode());
        assertEquals("Application status changed successfully", response.getMessage());
        assertEquals(ApplicationStatus.INTERVIEWING, applicant.getApplicationStatus());
        verify(jobRepository, times(1)).save(any(Job.class));
        verify(notificationService, times(1)).sendNotification(any(NotificationDTO.class));
    }

    @Test
    void changeApplicationStatus_JobNotFound() {
        // Given
        Application application = new Application();
        application.setId(1L);

        // Mocking the service call
        when(jobRepository.findById(1L)).thenReturn(Optional.empty());

        // When
        ApiResponse<JobDTO> response = jobService.changeApplicationStatus(application);

        // Then
        assertEquals(404, response.getStatusCode());
        assertEquals("Job not found", response.getMessage());
    }


    @Test
    void applyJob_JobNotFound_Failure() {
        // Given
        ApplicantDTO applicantDTO = new ApplicantDTO();
        applicantDTO.setEmail("applicant@endava.com");

        // Mocking the service call
        when(jobRepository.findById(1L)).thenReturn(Optional.empty());

        // When
        ApiResponse<JobDTO> response = jobService.applyJob(1L, applicantDTO);

        // Then
        assertEquals(404, response.getStatusCode());
        assertEquals("Job not found", response.getMessage());
    }
    @Test
    void testSendNotificationToUsers_ErrorInSendingNotification() {
        // Given
        User user = new User();
        user.setUserEmail("applicant1@example.com");
        user.setAccountType(AccountType.APPLICANT);

        List<User> users = Arrays.asList(user);
        when(userRepository.findByAccountType(AccountType.APPLICANT)).thenReturn(users);

        when(jobDTO.getJobTitle()).thenReturn("Software Engineer");
        when(jobDTO.getCompany()).thenReturn("Tech Corp");

        // Simulate an exception when sending the notification
        doThrow(new RuntimeException("Notification service failure"))
            .when(notificationService).sendNotification(any(NotificationDTO.class));

        // When
        jobService.sendNotificationToUsers(jobDTO, savedJob);

        // Then
        // Verify that the error is logged (you can use LogCaptor or verify System.out in case of simple print statements)
        // Here we verify that the exception was caught and the error message was printed
        // (you can use a mock for System.out or use LogCaptor if logging)
        // We also want to verify that no further exceptions propagate.
        // In this case, we don't expect any notifications to be sent due to the exception.
        verify(notificationService, times(1)).sendNotification(any(NotificationDTO.class));
    }
  
    
    @Test
    void testChangeApplicationStatus_JobNotFound() {
        when(jobRepository.findById(anyLong())).thenReturn(Optional.empty());

        ApiResponse<JobDTO> response = jobService.changeApplicationStatus(application);

        assertEquals(HttpStatus.NOT_FOUND.value(), response.getStatusCode());
        assertEquals("Job not found", response.getMessage());
    }

    @Test
    void testChangeApplicationStatus_ApplicantNotFound() {
        savedJob.setApplicants(new ArrayList<>()); 

        when(jobRepository.findById(1L)).thenReturn(Optional.of(savedJob));

        ApiResponse<JobDTO> response = jobService.changeApplicationStatus(application);
        System.out.println("status code2"+response.getMessage());
        assertEquals(HttpStatus.NOT_FOUND.value(), response.getStatusCode());
        assertEquals("Job not found", response.getMessage());
    }

//    @Test
//    void testChangeApplicationStatus_Interviewing() {
//        Application application = new Application();
//
//        when(jobRepository.findById(1L)).thenReturn(Optional.of(savedJob));
//
//        application.setApplicationStatus(ApplicationStatus.INTERVIEWING);
//        application.setInterviewTime(LocalDateTime.now());
//
//        ApiResponse<JobDTO> response = jobService.changeApplicationStatus(application);
//        assertEquals(ApplicationStatus.INTERVIEWING, application.getApplicationStatus());
//        assertEquals("2024-03-20 10:00 AM", applicant.getInterviewTime());
//
//        verify(notificationService, times(1)).sendNotification(
//        	    argThat(notification -> 
//        	        notification.getUserEmail().equals(application.getEmail()) &&
//        	        notification.getStatus().equals("Interview Scheduled") &&
//        	        notification.getMessage().contains("Interview scheduled for job Id: " + application.getId()) &&
//        	        notification.getRoute().equals("/job-history")
//        	    )
//        	);
//
//
//
//        verify(jobRepository, times(1)).save(savedJob);
//    }

//    @Test
//    void testChangeApplicationStatus_Offered() {
//        Application application = new Application();
//
//        when(jobRepository.findById(1L)).thenReturn(Optional.of(savedJob));
//
//        application.setApplicationStatus(ApplicationStatus.OFFERED);
//
//        ApiResponse<JobDTO> response = jobService.changeApplicationStatus(application);
//System.out.println("status code5"+response.getStatusCode());
//        assertEquals(HttpStatus.OK.value(), response.getStatusCode());
//        assertEquals("Job Offered", response.getMessage());
//        assertEquals(ApplicationStatus.OFFERED, applicant.getApplicationStatus());
//
//        verify(notificationService, times(1)).sendNotification(argThat(notification ->
//        notification.getUserEmail().equals(application.getEmail()) &&
//        notification.getStatus().equals("Job Offered") &&
//        notification.getMessage().contains("job is offered for you") &&
//        notification.getRoute().equals("/job-history")
//    ));
//
//
//        verify(jobRepository, times(1)).save(savedJob);
//    }

//    @Test
//    void testChangeApplicationStatus_Rejected() {
//        // Mock job retrieval
//        when(jobRepository.findById(1L)).thenReturn(Optional.of(savedJob));
//
//        // Set application status to REJECTED
//        application.setApplicationStatus(ApplicationStatus.REJECTED);
//
//        // Call the service method
//        ApiResponse<JobDTO> response = jobService.changeApplicationStatus(application);
//
//        // Verify the applicant's status is updated
//        Applicant updatedApplicant = savedJob.getApplicants().stream()
//            .filter(app -> app.getEmail().equals(application.getEmail()))
//            .findFirst()
//            .orElse(null);
//
//        assertNotNull(updatedApplicant, "Applicant should not be null");
//        assertEquals(ApplicationStatus.REJECTED, updatedApplicant.getApplicationStatus());
//
//        // Verify response message
//        assertEquals("Application status changed successfully", response.getMessage());
//
//        // Verify the notification was sent
//        verify(notificationService, times(1)).sendNotification(argThat(notification ->
//            notification.getUserEmail().equals(application.getEmail()) &&
//            notification.getAction().equals("Job Rejected") &&
//            notification.getMessage().contains("Job application has been rejected") &&
//            notification.getRoute().equals("/job-history")
//        ));
//    }

//    @Test
//    void testChangeApplicationStatus_SuccessfulStatusChange() {
//        Application application = new Application();
//
//        when(jobRepository.findById(1L)).thenReturn(Optional.of(savedJob));
//
//        application.setApplicationStatus(ApplicationStatus.APPLIED);
//
//        ApiResponse<JobDTO> response = jobService.changeApplicationStatus(application);
//        System.out.println("status code4"+response.getStatusCode());
//        assertEquals(HttpStatus.OK.value(), response.getStatusCode());
//        assertEquals("Application status changed successfully", response.getMessage());
//
//        verify(jobRepository, times(1)).save(savedJob);
//        
//    }
}
