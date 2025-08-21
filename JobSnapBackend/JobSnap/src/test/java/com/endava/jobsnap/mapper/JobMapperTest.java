package com.endava.jobsnap.mapper;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.endava.jobsnap.dto.ApplicantDTO;
import com.endava.jobsnap.dto.JobDTO;
import com.endava.jobsnap.dto.JobStatus;
import com.endava.jobsnap.entities.Applicant;
import com.endava.jobsnap.entities.Job;

class JobMapperTest {

    private JobMapper jobMapper;
    private ApplicantMapper applicantMapper;

    @BeforeEach
    void setUp() {
        applicantMapper = mock(ApplicantMapper.class);
        jobMapper = new JobMapper(applicantMapper);
    }

    // Test case 1: Valid JobDTO with applicants
    @Test
    void testToJob_validDTO_withApplicants() {
        // Setup test data
        ApplicantDTO applicantDTO = new ApplicantDTO();
        applicantDTO.setApplicantId((long)1);
        applicantDTO.setName("Jane Doe");

        JobDTO dto = new JobDTO();
        dto.setId((long) 1);
        dto.setJobTitle("Software Engineer");
        dto.setCompany("Endava");
        dto.setApplicants(List.of(applicantDTO));
        dto.setAbout("About the job");
        dto.setExperience("2+ years");
        dto.setJobType("Full-time");
        dto.setLocation("New York");
        dto.setPackageOffered((long)100);
        dto.setPostTime(LocalDateTime.now());
        dto.setDescription("Description of the job");
        dto.setSkillsRequired(new ArrayList<>());
        dto.setJobStatus(JobStatus.ACTIVE);
        dto.setPostedBy("John");

        // Mocking ApplicantMapper
        Applicant applicant = new Applicant();
        applicant.setApplicantId((long)1);
        applicant.setName("Jane Doe");
        when(applicantMapper.toApplicant(applicantDTO)).thenReturn(applicant);

        Job job = jobMapper.toJob(dto);

        assertNotNull(job);
        assertEquals(dto.getId(), job.getId());
        assertEquals(dto.getJobTitle(), job.getJobTitle());
        assertEquals(dto.getCompany(), job.getCompany());
        assertEquals(1, job.getApplicants().size()); 
        assertEquals(applicant.getApplicantId(), job.getApplicants().get(0).getApplicantId());
    }

    // Test case 2: JobDTO with null applicants
    @Test
    void testToJob_validDTO_withNullApplicants() {
        JobDTO dto = new JobDTO();
        dto.setId((long)1);
        dto.setJobTitle("Software Engineer");
        dto.setCompany("Endava");
        dto.setApplicants(null);
        dto.setAbout("About the job");
        dto.setExperience("2+ years");
        dto.setJobType("Full-time");
        dto.setLocation("New York");
        dto.setPackageOffered((long)100);
        dto.setPostTime(LocalDateTime.now());
        dto.setDescription("Description of the job");
        dto.setSkillsRequired(new ArrayList<>());
        dto.setJobStatus(JobStatus.CLOSED);
        dto.setPostedBy("John");

        Job job = jobMapper.toJob(dto);

        assertNotNull(job);
        assertEquals(0, job.getApplicants().size()); 
    }

    // Test case 3: JobDTO with empty applicants list
    @Test
    void testToJob_validDTO_withEmptyApplicants() {
        JobDTO dto = new JobDTO();
        dto.setId((long)1);
        dto.setJobTitle("Software Engineer");
        dto.setCompany("Endava");
        dto.setApplicants(Arrays.asList());  
        dto.setAbout("About the job");
        dto.setExperience("2+ years");
        dto.setJobType("Full-time");
        dto.setLocation("New York");
        dto.setPackageOffered((long)50);
        dto.setPostTime(LocalDateTime.now());
        dto.setDescription("Description of the job");
        dto.setSkillsRequired(new ArrayList<>(Arrays.asList("Java","Python")));
        dto.setJobStatus(JobStatus.DRAFT);
        dto.setPostedBy("John");

        Job job = jobMapper.toJob(dto);

        assertNotNull(job);
        assertEquals(0, job.getApplicants().size());  
    }

    // Test case 4: Valid Job entity to JobDTO
    @Test
    void testToJobDTO_validJob() {
        // Setup test data
        Applicant applicant = new Applicant();
        applicant.setApplicantId((long)1);
        applicant.setName("Jane Doe");

        Job job = new Job();
        job.setId((long)1);
        job.setJobTitle("Software Engineer");
        job.setCompany("Endava");
        job.setApplicants(List.of(applicant));
        job.setAbout("About the job");
        job.setExperience("2+ years");
        job.setJobType("Full-time");
        job.setLocation("New York");
        job.setPackageOffered((long)20);
        job.setPostTime(LocalDateTime.now());
        job.setDescription("Description of the job");
        job.setSkillsRequired(new ArrayList<>(Arrays.asList("Python","c")));
        job.setJobStatus(JobStatus.ACTIVE);
        job.setPostedBy("John");

        // Mocking ApplicantMapper
        ApplicantDTO applicantDTO = new ApplicantDTO();
        applicantDTO.setApplicantId((long)1);
        applicantDTO.setName("Jane Doe");
        when(applicantMapper.toApplicantDTO(applicant)).thenReturn(applicantDTO);

        JobDTO dto = jobMapper.toJobDto(job);

        assertNotNull(dto);
        assertEquals(job.getId(), dto.getId());
        assertEquals(job.getJobTitle(), dto.getJobTitle());
        assertEquals(job.getCompany(), dto.getCompany());
        assertEquals(1, dto.getApplicants().size()); 
        assertEquals(applicantDTO.getApplicantId(), dto.getApplicants().get(0).getApplicantId());
    }

    // Test case 5: Job entity with null applicants
    @Test
    void testToJobDTO_jobWithNullApplicants() {
        Job job = new Job();
        job.setId((long)1);
        job.setJobTitle("Software Engineer");
        job.setCompany("Endava");
        job.setApplicants(null);  
        job.setAbout("About the job");
        job.setExperience("2+ years");
        job.setJobType("Full-time");
        job.setLocation("New York");
        job.setPackageOffered((long)30);
        job.setPostTime(LocalDateTime.now());
        job.setDescription("Description of the job");
        job.setSkillsRequired(new ArrayList<>(Arrays.asList("java","python")));
        job.setJobStatus(JobStatus.CLOSED);
        job.setPostedBy("John");

        JobDTO dto = jobMapper.toJobDto(job);

        assertNotNull(dto);
        assertEquals(0, dto.getApplicants().size()); 
    }

    // Test case 6: Job entity with empty applicants list
    @Test
    void testToJobDTO_jobWithEmptyApplicants() {
        Job job = new Job();
        job.setId((long)1);
        job.setJobTitle("Software Engineer");
        job.setCompany("Endava");
        job.setApplicants(Arrays.asList());  
        job.setAbout("About the job");
        job.setExperience("2+ years");
        job.setJobType("Full-time");
        job.setLocation("New York");
        job.setPackageOffered((long)30);
        job.setPostTime(LocalDateTime.now());
        job.setDescription("Description of the job");
        job.setSkillsRequired(new ArrayList<>(Arrays.asList("spring","c","c++")));
        job.setJobStatus(JobStatus.CLOSED);
        job.setPostedBy("John");

        JobDTO dto = jobMapper.toJobDto(job);

        assertNotNull(dto);
        assertEquals(0, dto.getApplicants().size());  
    }
}
