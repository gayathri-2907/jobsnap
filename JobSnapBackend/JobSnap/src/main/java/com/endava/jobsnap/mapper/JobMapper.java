package com.endava.jobsnap.mapper;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.endava.jobsnap.dto.ApplicantDTO;
import com.endava.jobsnap.dto.JobDTO;
import com.endava.jobsnap.entities.Job;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JobMapper {
	final ApplicantMapper applicantMapper;
	
	public Job toJob(JobDTO dto) {
		return Job.builder()
				.id(dto.getId())
				.jobTitle(dto.getJobTitle())
				.company(dto.getCompany())
				.applicants(dto.getApplicants() != null 
                ? dto.getApplicants().stream()
                        .map(applicantMapper::toApplicant)
                        .toList()
                : new ArrayList<>())
				.about(dto.getAbout())
				.experience(dto.getExperience())
				.jobType(dto.getJobType())
				.location(dto.getLocation())
				.packageOffered(dto.getPackageOffered())
				.postTime(dto.getPostTime())
				.description(dto.getDescription())
				.skillsRequired(dto.getSkillsRequired())
				.jobStatus(dto.getJobStatus())
				.postedBy(dto.getPostedBy())
				.build();
	}
	
	public JobDTO toJobDto(Job job) {
		  List<ApplicantDTO> applicantDTOs = (job.getApplicants() != null) 
                  ? job.getApplicants()
                        .stream()
                        .map(applicantMapper::toApplicantDTO)
                        .toList() 
                  : new ArrayList<>();  // 
		return JobDTO.builder()
				.id(job.getId())
				.jobTitle(job.getJobTitle())
				.company(job.getCompany())
				.applicants(applicantDTOs)
				.about(job.getAbout())
				.experience(job.getExperience())
				.jobType(job.getJobType())
				.location(job.getLocation())
				.packageOffered(job.getPackageOffered())
				.postTime(job.getPostTime())
				.description(job.getDescription())
				.skillsRequired(job.getSkillsRequired())
				.jobStatus(job.getJobStatus())
				.postedBy(job.getPostedBy())
				.build();
	}
}
