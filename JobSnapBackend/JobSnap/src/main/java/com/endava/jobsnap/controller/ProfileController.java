//package com.endava.jobsnap.controller;
//
//import java.util.List;
//
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.validation.annotation.Validated;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PutMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.endava.jobsnap.configurations.CrossOriginConfig;
//import com.endava.jobsnap.dto.ProfileDTO;
//import com.endava.jobsnap.response.ApiResponse;
//import com.endava.jobsnap.service.ProfileService;
//
//import lombok.RequiredArgsConstructor;
//
//@RestController
//@CrossOrigin(CrossOriginConfig.CROSS_ORIGIN)
//@Validated
//@RequestMapping("/profiles")
//@RequiredArgsConstructor
//public class ProfileController {
//
//    private final ProfileService profileService;
//
//    @GetMapping("/getProfile/{profileId}")
//    public ResponseEntity<ApiResponse<ProfileDTO>> getProfile(@PathVariable("profileId") Long profileId) {
//        ApiResponse<ProfileDTO> response = profileService.getProfile(profileId);
//        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatusCode()));
//    }
//
//    @PutMapping("/update")
//    public ResponseEntity<ApiResponse<ProfileDTO>> updateProfile(@RequestBody ProfileDTO profileDTO) {
//        ApiResponse<ProfileDTO> response = profileService.updateProfile(profileDTO);
//        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatusCode()));
//    }
//    @GetMapping("/getProfileByEmail/{email}")
//    public ResponseEntity<ApiResponse<ProfileDTO>> getProfileByEmail(@PathVariable("email") String email) {
//        ApiResponse<ProfileDTO> response = profileService.getProfileByEmail(email);
//        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatusCode()));
//    }
//
//    @GetMapping("/getAllProfiles")
//    public ResponseEntity<ApiResponse<List<ProfileDTO>>> getAllProfiles() {
//        ApiResponse<List<ProfileDTO>> response = profileService.getAllProfiles();
//        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatusCode()));
//    }
//}



package com.endava.jobsnap.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.endava.jobsnap.configurations.CrossOriginConfig;
import com.endava.jobsnap.dto.ProfileDTO;
import com.endava.jobsnap.response.ApiResponse;
import com.endava.jobsnap.service.ProfileService;

import lombok.RequiredArgsConstructor;

/**
 * Controller for managing user profiles.
 * 
 * This controller handles the operations related to user profiles such as retrieving a profile by ID,
 * updating a profile, getting a profile by email, and fetching all profiles.
 */
@RestController
@CrossOrigin(CrossOriginConfig.CROSS_ORIGIN)
@Validated
@RequestMapping("/profiles")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    /**
     * Endpoint to retrieve a profile by its ID.
     * 
     * @param profileId the ID of the profile to be retrieved
     * @return ResponseEntity<ApiResponse<ProfileDTO>> the response containing the profile details
     */
    @GetMapping("/getProfile/{profileId}")
    public ResponseEntity<ApiResponse<ProfileDTO>> getProfile(@PathVariable("profileId") Long profileId) {
        ApiResponse<ProfileDTO> response = profileService.getProfile(profileId);
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatusCode()));
    }

    /**
     * Endpoint to update a user's profile.
     * 
     * @param profileDTO the profile data to be updated
     * @return ResponseEntity<ApiResponse<ProfileDTO>> the response after updating the profile
     */
    @PutMapping("/update")
    public ResponseEntity<ApiResponse<ProfileDTO>> updateProfile(@RequestBody ProfileDTO profileDTO) {
        ApiResponse<ProfileDTO> response = profileService.updateProfile(profileDTO);
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatusCode()));
    }

    /**
     * Endpoint to retrieve a profile by its email address.
     * 
     * @param email the email of the user whose profile is to be retrieved
     * @return ResponseEntity<ApiResponse<ProfileDTO>> the response containing the profile details
     */
    @GetMapping("/getProfileByEmail/{email}")
    public ResponseEntity<ApiResponse<ProfileDTO>> getProfileByEmail(@PathVariable("email") String email) {
        ApiResponse<ProfileDTO> response = profileService.getProfileByEmail(email);
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatusCode()));
    }

    /**
     * Endpoint to retrieve all profiles.
     * 
     * @return ResponseEntity<ApiResponse<List<ProfileDTO>>> the response containing a list of all profiles
     */
    @GetMapping("/getAllProfiles")
    public ResponseEntity<ApiResponse<List<ProfileDTO>>> getAllProfiles() {
        ApiResponse<List<ProfileDTO>> response = profileService.getAllProfiles();
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatusCode()));
    }
}
