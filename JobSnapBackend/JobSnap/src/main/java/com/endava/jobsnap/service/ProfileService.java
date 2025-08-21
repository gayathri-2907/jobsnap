package com.endava.jobsnap.service;

import java.util.List;

import com.endava.jobsnap.dto.ProfileDTO;
import com.endava.jobsnap.response.ApiResponse;

public interface ProfileService {
	public ApiResponse<Long> createProfile(String email) ;

	public ApiResponse<ProfileDTO> getProfile(Long profileId) ;
    
	public ApiResponse<ProfileDTO> updateProfile(ProfileDTO profileDTO);
	
	public ApiResponse<ProfileDTO> getProfileByEmail(String email) ;

	public ApiResponse<List<ProfileDTO>> getAllProfiles() ;
}
