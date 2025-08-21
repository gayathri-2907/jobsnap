package com.endava.jobsnap.mapper;

import java.time.LocalDateTime;
import java.util.Base64;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.endava.jobsnap.dto.ApplicantDTO;
import com.endava.jobsnap.entities.Applicant;

@Component
public class ApplicantMapper {

    private static final Logger logger = LoggerFactory.getLogger(ApplicantMapper.class);

    public Applicant toApplicant(ApplicantDTO dto) {
        if (dto == null) {
            return null;
        }

        byte[] resume = null;
        if (dto.getResume() != null) {
            try {
                resume = Base64.getDecoder().decode(dto.getResume());
            } catch (IllegalArgumentException e) {
                logger.error("Invalid Base64 string for resume: {}", e.getMessage(), e);
                resume = null;
            }
        }
        return Applicant.builder()
        		.applicantId(dto.getApplicantId())
                .name(dto.getName())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .website(dto.getWebsite())
                .resume(resume)
                .coverLetter(dto.getCoverLetter())
                .timestamp(LocalDateTime.now())
                .applicationStatus(dto.getApplicationStatus())
                .interviewTime(dto.getInterviewTime())
                .build();
    }

    public ApplicantDTO toApplicantDTO(Applicant applicant) {
        String resume = null;
        if (applicant.getResume() != null) {
            try {
                resume = Base64.getEncoder().encodeToString(applicant.getResume());
            } catch (Exception e) {
            	logger.error("Error encoding resume to Base64: {}", e.getMessage(), e);

            }
        }

        return ApplicantDTO.builder()
                .applicantId(applicant.getApplicantId())
                .name(applicant.getName())
                .email(applicant.getEmail())
                .phone(applicant.getPhone())
                .website(applicant.getWebsite())
                .resume(resume)
                .coverLetter(applicant.getCoverLetter())
                .timestamp(LocalDateTime.now())
                .applicationStatus(applicant.getApplicationStatus())
                .interviewTime(applicant.getInterviewTime())
                .build();
    }
}
