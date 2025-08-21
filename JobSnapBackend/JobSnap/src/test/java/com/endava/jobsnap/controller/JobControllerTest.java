package com.endava.jobsnap.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.endava.jobsnap.dto.ApplicantDTO;
import com.endava.jobsnap.dto.Application;
import com.endava.jobsnap.dto.ApplicationStatus;
import com.endava.jobsnap.dto.JobDTO;
import com.endava.jobsnap.response.ApiResponse;
import com.endava.jobsnap.service.JobService;

@ExtendWith(MockitoExtension.class)
class JobControllerTest {

    @Mock
    private JobService jobService;

    @InjectMocks
    private JobController jobController;

    private MockMvc mockMvc;

    @BeforeEach
    void setup() {
        mockMvc = MockMvcBuilders.standaloneSetup(jobController).build();
    }

    @Test
    void testPostJob() throws Exception {
        JobDTO jobDTO = JobDTO.builder()
                .jobTitle("Software Engineer")
                .company("Endava")
                .about("Software engineering job")
                .build();

        // Create a success response
        ApiResponse<JobDTO> response = ApiResponse.success(jobDTO, "Job posted successfully", HttpStatus.CREATED.value());
        when(jobService.postJob(any(JobDTO.class))).thenReturn(response);

        mockMvc.perform(post("/jobs/jobposting")
                .contentType("application/json")
                .content("{\"jobTitle\": \"Software Engineer\", \"company\": \"Endava\", \"about\": \"Software engineering job\"}"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.statusCode").value(201))
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Job posted successfully"));
    }

    @Test
    void testGetAllPostedJobs() throws Exception {
        // Create a success response with a list of jobs (mocked as null for simplicity)
        ApiResponse<Page<JobDTO>> response = ApiResponse.success(null, "Fetched all jobs", HttpStatus.OK.value());
        when(jobService.getAllPostedJobs(anyInt(), anyInt())).thenReturn(response);

        mockMvc.perform(get("/jobs/getAll?pageNumber=0&pageSize=5"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.statusCode").value(200))
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Fetched all jobs"));
    }

    @Test
    void testGetPostedJobById() throws Exception {
        JobDTO jobDTO = JobDTO.builder()
                .jobTitle("Software Engineer")
                .company("Endava")
                .about("Software engineering job")
                .build();

        // Create a success response
        ApiResponse<JobDTO> response = ApiResponse.success(jobDTO, "Job fetched successfully", HttpStatus.OK.value());
        when(jobService.getPostedJobById(anyLong())).thenReturn(response);

        mockMvc.perform(get("/jobs/getPostedJobById/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.statusCode").value(200))
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Job fetched successfully"));
    }

    @Test
    void testGetJobsPostedBy() throws Exception {
        // Create a success response with a list of jobs (mocked as null for simplicity)
        ApiResponse<List<JobDTO>> response = ApiResponse.success(null, "Fetched jobs posted by user", HttpStatus.OK.value());
        when(jobService.getJobsPostedByEmail(anyString())).thenReturn(response);

        mockMvc.perform(get("/jobs/postedBy/john.doe@example.com"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.statusCode").value(200))
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Fetched jobs posted by user"));
    }

    @Test
    void testApplyJob() throws Exception {
        ApplicantDTO applicantDTO = ApplicantDTO.builder()
                .name("John Doe")
                .email("john.doe@example.com")
                .build();

        JobDTO jobDTO = JobDTO.builder()
                .jobTitle("Software Engineer")
                .company("Endava")
                .about("Software engineering job")
                .build();

        // Create a success response
        ApiResponse<JobDTO> response = ApiResponse.success(jobDTO, "Application submitted successfully", HttpStatus.CREATED.value());
        when(jobService.applyJob(anyLong(), any(ApplicantDTO.class))).thenReturn(response);

        mockMvc.perform(post("/jobs/applyJob/1")
                .contentType("application/json")
                .content("{\"name\": \"John Doe\", \"email\": \"john.doe@example.com\"}"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.statusCode").value(201))
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Application submitted successfully"));
    }

    @Test
    void testChangeApplicationStatus() throws Exception {
        Application application = Application.builder()
                .applicationStatus(ApplicationStatus.INTERVIEWING)
                .id((long)1L)
                .applicantId(1L)
                .build();

        JobDTO jobDTO = JobDTO.builder()
                .jobTitle("Software Engineer")
                .company("Endava")
                .about("Software engineering job")
                .build();

        // Create a success response
        ApiResponse<JobDTO> response = ApiResponse.success(jobDTO, "Application status updated", HttpStatus.OK.value());
        when(jobService.changeApplicationStatus(any(Application.class))).thenReturn(response);

        mockMvc.perform(post("/jobs/changeApplicationStatus")
                .contentType("application/json")
                .content("{\"applicationStatus\": \"INTERVIEWING\", \"jobId\": 1, \"applicantId\": 1}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.statusCode").value(200))
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Application status updated"));
    }
}
