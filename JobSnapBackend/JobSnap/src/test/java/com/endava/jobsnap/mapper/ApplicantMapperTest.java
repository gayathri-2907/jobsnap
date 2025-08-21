package com.endava.jobsnap.mapper;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import java.time.LocalDateTime;
import java.util.Base64;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.slf4j.Logger;

import com.endava.jobsnap.dto.ApplicantDTO;
import com.endava.jobsnap.dto.ApplicationStatus;
import com.endava.jobsnap.entities.Applicant;
 class ApplicantMapperTest {
@InjectMocks
    private ApplicantMapper applicantMapper;
    @Mock
    private Logger logger;

    @BeforeEach
    void setUp() {
        applicantMapper = new ApplicantMapper();
        logger = mock(Logger.class);
    }

    // Test case 1: Valid ApplicantDTO with valid Base64 resume
    @Test
    void testToApplicant_validDTO_withValidResume() {
        // Setup test data
        ApplicantDTO dto = new ApplicantDTO();
        dto.setApplicantId((long) 1);
        dto.setName("John Doe");
        dto.setEmail("john.doe@example.com");
        dto.setPhone((long) 123467890);
        dto.setWebsite("www.johndoe.com");
        dto.setResume(Base64.getEncoder().encodeToString("ResumeContent".getBytes()));
        dto.setCoverLetter("Cover Letter");
        dto.setApplicationStatus(ApplicationStatus.APPLIED);
        dto.setInterviewTime(LocalDateTime.now());

        Applicant applicant = applicantMapper.toApplicant(dto);

        assertNotNull(applicant);
        assertEquals(dto.getApplicantId(), applicant.getApplicantId());
        assertEquals(dto.getName(), applicant.getName());
        assertEquals(dto.getEmail(), applicant.getEmail());
        assertEquals(dto.getPhone(), applicant.getPhone());
        assertEquals(dto.getWebsite(), applicant.getWebsite());
        assertNotNull(applicant.getResume());  
    }

    // Test case 2: Valid ApplicantDTO with null resume
    @Test
    void testToApplicant_validDTO_withNullResume() {
        ApplicantDTO dto = new ApplicantDTO();
        dto.setApplicantId((long)1);
        dto.setName("John Doe");
        dto.setEmail("john.doe@example.com");
        dto.setPhone((long)87646757);
        dto.setWebsite("www.johndoe.com");
        dto.setResume(null);
        dto.setCoverLetter("Cover Letter");
        dto.setApplicationStatus(ApplicationStatus.APPLIED);
        dto.setInterviewTime(LocalDateTime.now());

        Applicant applicant = applicantMapper.toApplicant(dto);

        assertNotNull(applicant);
        assertNull(applicant.getResume());  // Ensure the resume is null
    }

    // Test case 3: Valid ApplicantDTO with invalid resume (bad Base64)
    @Test
    void testToApplicant_validDTO_withInvalidResume() {
        ApplicantDTO dto = new ApplicantDTO();
        dto.setApplicantId((long)1);
        dto.setName("John Doe");
        dto.setEmail("john.doe@example.com");
        dto.setPhone((long)567899);
        dto.setWebsite("www.johndoe.com");
        dto.setResume("InvalidBase64String!");  
        dto.setCoverLetter("Cover Letter");
        dto.setApplicationStatus(ApplicationStatus.APPLIED);
        dto.setInterviewTime(LocalDateTime.now());

        Applicant applicant = applicantMapper.toApplicant(dto);

        assertNotNull(applicant);
        assertNull(applicant.getResume());
    }

    // Test case 4: ApplicantDTO is null
    @Test
    void testToApplicant_nullDTO() {
        assertNull(applicantMapper.toApplicant(null));  
    }

    // Test case 5: Fully populated ApplicantDTO
    @Test
    void testToApplicant_validDTO_allFields() {
        ApplicantDTO dto = new ApplicantDTO();
        dto.setApplicantId((long) 1);
        dto.setName("John Doe");
        dto.setEmail("john.doe@example.com");
        dto.setPhone((long)2345678);
        dto.setWebsite("www.johndoe.com");
        dto.setResume("ValidResume");
        dto.setCoverLetter("Cover Letter");
        dto.setApplicationStatus(ApplicationStatus.INTERVIEWING);
        dto.setInterviewTime(LocalDateTime.now());

        Applicant applicant = applicantMapper.toApplicant(dto);

        assertNotNull(applicant);
        assertEquals(dto.getApplicantId(), applicant.getApplicantId());
        assertEquals(dto.getName(), applicant.getName());
        assertEquals(dto.getEmail(), applicant.getEmail());
        assertEquals(dto.getPhone(), applicant.getPhone());
        assertEquals(dto.getWebsite(), applicant.getWebsite());
        assertNotNull(applicant.getResume());
    }

    // Test case 6: Valid Applicant with valid resume for Base64 encoding
    @Test
    void testToApplicantDTO_validApplicant_withValidResume() {
        Applicant applicant = new Applicant();
        applicant.setApplicantId((long)2);
        applicant.setName("John Doe");
        applicant.setEmail("john.doe@example.com");
        applicant.setPhone((long)123456789);
        applicant.setWebsite("www.johndoe.com");
        applicant.setResume("ResumeContent".getBytes());
        applicant.setCoverLetter("Cover Letter");
        applicant.setApplicationStatus(ApplicationStatus.APPLIED);
        applicant.setInterviewTime(LocalDateTime.now());

        ApplicantDTO dto = applicantMapper.toApplicantDTO(applicant);

        assertNotNull(dto);
        assertEquals(applicant.getApplicantId(), dto.getApplicantId());
        assertEquals(applicant.getName(), dto.getName());
        assertEquals(applicant.getEmail(), dto.getEmail());
        assertEquals(applicant.getPhone(), dto.getPhone());
        assertEquals(applicant.getWebsite(), dto.getWebsite());
        assertNotNull(dto.getResume()); 
    }

    // Test case 7: Valid Applicant with null resume
    @Test
    void testToApplicantDTO_validApplicant_withNullResume() {
        Applicant applicant = new Applicant();
        applicant.setApplicantId((long)1);
        applicant.setName("John Doe");
        applicant.setEmail("john.doe@example.com");
        applicant.setPhone((long)2357848);
        applicant.setWebsite("www.johndoe.com");
        applicant.setResume(null);
        applicant.setCoverLetter("Cover Letter");
        applicant.setApplicationStatus(ApplicationStatus.APPLIED);
        applicant.setInterviewTime(LocalDateTime.now());

        ApplicantDTO dto = applicantMapper.toApplicantDTO(applicant);

        assertNotNull(dto);
        assertNull(dto.getResume());  
    }

    // Test case 8: Error encoding resume to Base64
    @Test
    void testToApplicantDTO_invalidResume_encodingError() {
        Applicant applicant = new Applicant();
        applicant.setApplicantId((long)1);
        applicant.setName("John Doe");
        applicant.setEmail("john.doe@example.com");
        applicant.setPhone((long)8756648);
        applicant.setWebsite("www.johndoe.com");
        applicant.setResume(new byte[]{-1}); 
        applicant.setCoverLetter("Cover Letter");
        applicant.setApplicationStatus(ApplicationStatus.APPLIED);
        applicant.setInterviewTime(LocalDateTime.now());

        ApplicantDTO dto = applicantMapper.toApplicantDTO(applicant);

        assertNotNull(dto);
        assertNotNull(dto.getResume());  
    }

  

    // Test case 10: Fully populated Applicant object
    @Test
    void testToApplicantDTO_validApplicant_allFields() {
        Applicant applicant = new Applicant();
        applicant.setApplicantId((long)1);
        applicant.setName("John Doe");
        applicant.setEmail("john.doe@example.com");
        applicant.setPhone((long)746585367);
        applicant.setWebsite("www.johndoe.com");
        applicant.setResume("ValidResume".getBytes());
        applicant.setCoverLetter("Cover Letter");
        applicant.setApplicationStatus(ApplicationStatus.INTERVIEWING);
        applicant.setInterviewTime(LocalDateTime.now());

        ApplicantDTO dto = applicantMapper.toApplicantDTO(applicant);

        assertNotNull(dto);
        assertEquals(applicant.getApplicantId(), dto.getApplicantId());
        assertEquals(applicant.getName(), dto.getName());
        assertEquals(applicant.getEmail(), dto.getEmail());
        assertEquals(applicant.getPhone(), dto.getPhone());
        assertEquals(applicant.getWebsite(), dto.getWebsite());
        assertNotNull(dto.getResume());
    }
 

}
