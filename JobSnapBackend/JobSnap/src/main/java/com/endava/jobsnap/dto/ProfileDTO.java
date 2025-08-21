package com.endava.jobsnap.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProfileDTO {
private Long profileId;
private String email;
private String name;
private String jobTitle;
private String company;
private String location;
private String about;
private String profilePicture;
private String totalExperience;
private List<String> skills;
private List<Certification> certifications;
private List<Experience> experiences;
private List<Long> savedJobs;
}
