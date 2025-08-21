//package com.endava.jobsnap.service.impl;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Optional;
//
//import org.springframework.stereotype.Service;
//
//import com.endava.jobsnap.dto.ProfileDTO;
//import com.endava.jobsnap.entities.Profile;
//import com.endava.jobsnap.mapper.ProfileMapper;
//import com.endava.jobsnap.repositories.ProfileRepository;
//import com.endava.jobsnap.response.ApiResponse;
//import com.endava.jobsnap.service.ProfileService;
//
//import lombok.RequiredArgsConstructor;
//
//@Service(value = "profileService")
//@RequiredArgsConstructor
//public class ProfileServiceImpl implements ProfileService {
//
//
//    private final ProfileRepository profileRepository;
//
//    private final ProfileMapper profileMapper;
//
//    @Override
//    public ApiResponse<Long> createProfile(String email) {
//        // Create a new profile and save it
//        Profile profile = new Profile();
//        profile.setEmail(email);
//        profile.setSkills(new ArrayList<>());
//        profile.setExperiences(new ArrayList<>());
//        profile.setCertifications(new ArrayList<>());
//        profileRepository.save(profile);
//
//        return ApiResponse.success(profile.getProfileId(), "Profile created successfully", 201);
//    }
//
//    @Override
//    public ApiResponse<ProfileDTO> getProfile(Long profileId) {
//        // Check if the profile exists and return an ApiResponse
//        Optional<Profile> profileOpt = profileRepository.findById(profileId);
//        if (profileOpt.isPresent()) {
//            ProfileDTO profileDTO = profileMapper.toProfileDTO(profileOpt.get());
//            return ApiResponse.success(profileDTO, "Profile found", 200);
//        } else {
//            return ApiResponse.failure("Profile not found", 404);
//        }
//    }
//
//    @Override
//    public ApiResponse<ProfileDTO> updateProfile(ProfileDTO profileDTO) {    	
//        if (profileDTO.getProfileId() == null) {
//            return ApiResponse.failure("Profile ID must not be null", 400);
//        }
//
//        Optional<Profile> profileOpt = profileRepository.findById(profileDTO.getProfileId());
//        if (profileOpt.isPresent()) {
//            Profile profile = profileMapper.toProfile(profileDTO);
//            profileRepository.save(profile);
//            return ApiResponse.success(profileDTO, "Profile updated successfully", 200);
//        } else {
//            return ApiResponse.failure("Profile not found", 404);
//        }
//    }
//
//
//    @Override
//    public ApiResponse<ProfileDTO> getProfileByEmail(String email) {
//        Optional<Profile> profileOpt = profileRepository.findByEmail(email);
//        if (profileOpt.isPresent()) {
//            ProfileDTO profileDTO = profileMapper.toProfileDTO(profileOpt.get());
//            return ApiResponse.success(profileDTO, "Profile found", 200);
//        } else {
//            return ApiResponse.failure("Profile not found", 404);
//        }
//    }
//
//    @Override
//    public ApiResponse<List<ProfileDTO>> getAllProfiles() {
//        // Get all profiles and return them as a list of DTOs
//        List<ProfileDTO> profiles = profileRepository.findAll().stream()
//                .map(profileMapper::toProfileDTO)
//                .toList();
//        return ApiResponse.success(profiles, "Profiles fetched successfully", 200);
//    }
//}


package com.endava.jobsnap.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.endava.jobsnap.dto.ProfileDTO;
import com.endava.jobsnap.entities.Profile;
import com.endava.jobsnap.mapper.ProfileMapper;
import com.endava.jobsnap.repositories.ProfileRepository;
import com.endava.jobsnap.response.ApiResponse;
import com.endava.jobsnap.service.ProfileService;

import lombok.RequiredArgsConstructor;

@Service(value = "profileService")
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {

    private final ProfileRepository profileRepository;
    private final ProfileMapper profileMapper;
//    private final AppConstantsConfig constants;

    /**
     * Creates a new profile for a user based on their email.
     * Initializes empty lists for skills, experiences, and certifications.
     * 
     * @param email the email address of the user for whom the profile will be created
     * @return ApiResponse containing the ID of the created profile
     */
    @Override
    public ApiResponse<Long> createProfile(String email) {
        // Create a new profile and save it
        Profile profile = new Profile();
        profile.setEmail(email);
        profile.setSkills(new ArrayList<>());
        profile.setExperiences(new ArrayList<>());
        profile.setCertifications(new ArrayList<>());
        profileRepository.save(profile);

        return ApiResponse.success(profile.getProfileId(), "Profile created successfully", 201);
    }

    /**
     * Retrieves the profile associated with the given profile ID.
     * 
     * @param profileId the ID of the profile to retrieve
     * @return ApiResponse containing the profile details if found, or an error message if not found
     */
    @Override
    public ApiResponse<ProfileDTO> getProfile(Long profileId) {
        // Check if the profile exists and return an ApiResponse
        Optional<Profile> profileOpt = profileRepository.findById(profileId);
        if (profileOpt.isPresent()) {
            ProfileDTO profileDTO = profileMapper.toProfileDTO(profileOpt.get());
            return ApiResponse.success(profileDTO, "Profile found", 200);
        } else {
            return ApiResponse.failure("Profile not found", 404);
        }
    }

    /**
     * Updates an existing profile based on the provided ProfileDTO.
     * 
     * @param profileDTO the ProfileDTO containing the updated profile data
     * @return ApiResponse containing the updated profile information, or an error message if the profile is not found
     */
    @Override
    public ApiResponse<ProfileDTO> updateProfile(ProfileDTO profileDTO) {
        if (profileDTO.getProfileId() == null) {
            return ApiResponse.failure("Profile ID must not be null", 400);
        }

        Optional<Profile> profileOpt = profileRepository.findById(profileDTO.getProfileId());
        if (profileOpt.isPresent()) {
            Profile profile = profileMapper.toProfile(profileDTO);
            profileRepository.save(profile);
            return ApiResponse.success(profileDTO, "Profile updated successfully", 200);
        } else {
            return ApiResponse.failure("Profile not found", 404);
        }
    }

    /**
     * Retrieves the profile associated with the given email.
     * 
     * @param email the email address of the user whose profile is to be retrieved
     * @return ApiResponse containing the profile details if found, or an error message if not found
     */
    @Override
    public ApiResponse<ProfileDTO> getProfileByEmail(String email) {
        Optional<Profile> profileOpt = profileRepository.findByEmail(email);
        if (profileOpt.isPresent()) {
            ProfileDTO profileDTO = profileMapper.toProfileDTO(profileOpt.get());
            return ApiResponse.success(profileDTO, "Profile found", 200);
        } else {
            return ApiResponse.failure("Profile not found", 404);
        }
    }

    /**
     * Retrieves all profiles and returns them as a list of ProfileDTOs.
     * 
     * @return ApiResponse containing a list of all profiles
     */
    @Override
    public ApiResponse<List<ProfileDTO>> getAllProfiles() {
        // Get all profiles and return them as a list of DTOs
        List<ProfileDTO> profiles = profileRepository.findAll().stream()
                .map(profileMapper::toProfileDTO)
                .toList();
        return ApiResponse.success(profiles, "Profiles fetched successfully", 200);
    }
}
