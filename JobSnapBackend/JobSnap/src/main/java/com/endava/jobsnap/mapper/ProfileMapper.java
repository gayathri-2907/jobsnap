package com.endava.jobsnap.mapper;

import java.util.Base64;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.endava.jobsnap.dto.ProfileDTO;
import com.endava.jobsnap.entities.Profile;

@Component
public class ProfileMapper {

    private static final Logger logger = LoggerFactory.getLogger(ProfileMapper.class);

    // Convert ProfileDTO to Profile entity
    public Profile toProfile(ProfileDTO dto) {
    	if (dto == null) {
            return null; // Return null if input DTO is null
        }
        byte[] profilePicture = null;
        if (dto.getProfilePicture() != null) {
            try {
                profilePicture = Base64.getDecoder().decode(dto.getProfilePicture());
            } catch (IllegalArgumentException e) {
                logger.error("Invalid Base64 string for profile picture: {}", e.getMessage(), e);
            }
        }
        return Profile.builder()
                .profileId(dto.getProfileId())
                .email(dto.getEmail())
                .name(dto.getName())
                .jobTitle(dto.getJobTitle())
                .company(dto.getCompany())
                .location(dto.getLocation())
                .about(dto.getAbout())
                .skills(dto.getSkills())
                .certifications(dto.getCertifications())
                .experiences(dto.getExperiences())
                .profilePicture(profilePicture)
                .totalExperience(dto.getTotalExperience())
                .savedJobs(dto.getSavedJobs())
                .build();
    }

    // Convert Profile entity to ProfileDTO
    public ProfileDTO toProfileDTO(Profile profile) {
    	 if (profile == null) {
    	        return null; // Return null if the input profile is null
    	    }
        String profilePicture = null;
        if (profile.getProfilePicture() != null) {
            try {
                profilePicture = Base64.getEncoder().encodeToString(profile.getProfilePicture());
            } catch (Exception e) {
                logger.error("Error encoding profile picture to Base64: {}", e.getMessage(), e);
            }
        }
        return ProfileDTO.builder()
                .profileId(profile.getProfileId())
                .email(profile.getEmail())
                .name(profile.getName())
                .jobTitle(profile.getJobTitle())
                .company(profile.getCompany())
                .location(profile.getLocation())
                .about(profile.getAbout())
                .skills(profile.getSkills())
                .certifications(profile.getCertifications())
                .experiences(profile.getExperiences())
                .totalExperience(profile.getTotalExperience())
                .profilePicture(profilePicture)
                .savedJobs(profile.getSavedJobs())
                .build();
    }
}
