package com.endava.jobsnap.service.impl;

import com.endava.jobsnap.dto.ProfileDTO;
import com.endava.jobsnap.entities.Profile;
import com.endava.jobsnap.mapper.ProfileMapper;
import com.endava.jobsnap.repositories.ProfileRepository;
import com.endava.jobsnap.response.ApiResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ProfileServiceImplTest {

    @InjectMocks
    private ProfileServiceImpl profileService;

    @Mock
    private ProfileRepository profileRepository;

    @Mock
    private ProfileMapper profileMapper;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createProfile_ShouldCreateProfileSuccessfully() {
        // Arrange
        Profile profile = new Profile();
        profile.setEmail("test@endava.com");
        when(profileRepository.save(any(Profile.class))).thenReturn(profile);
        // Act
        ApiResponse<Long> response = profileService.createProfile("test@endava.com");
        // Assert
        assertEquals(201, response.getStatusCode(), "Expected status code 201");
        assertEquals("Profile created successfully", response.getMessage(), "Expected message mismatch");

        verify(profileRepository, times(1)).save(any(Profile.class));
    }



    @Test
    void getProfile_WhenProfileExists_ShouldReturnProfile() {
        // Arrange
        Profile profile = new Profile();
        profile.setProfileId(1L);
        ProfileDTO profileDTO = new ProfileDTO();
        profileDTO.setProfileId(1L);

        when(profileRepository.findById(1L)).thenReturn(Optional.of(profile));
        when(profileMapper.toProfileDTO(profile)).thenReturn(profileDTO);

        // Act
        ApiResponse<ProfileDTO> response = profileService.getProfile(1L);

        // Assert
        assertEquals(200, response.getStatusCode());
        assertEquals("Profile found", response.getMessage());
        assertEquals(1L, response.getData().getProfileId());
    }

    @Test
    void getProfile_WhenProfileDoesNotExist_ShouldReturnNotFound() {
        // Arrange
        when(profileRepository.findById(1L)).thenReturn(Optional.empty());

        // Act
        ApiResponse<ProfileDTO> response = profileService.getProfile(1L);

        // Assert
        assertEquals(404, response.getStatusCode());
        assertEquals("Profile not found", response.getMessage());
        assertNull(response.getData());
    }

    @Test
    void updateProfile_WhenProfileExists_ShouldUpdateSuccessfully() {
        // Arrange
        ProfileDTO profileDTO = new ProfileDTO();
        profileDTO.setProfileId(1L);

        Profile profile = new Profile();

        when(profileRepository.findById(1L)).thenReturn(Optional.of(profile));
        when(profileMapper.toProfile(profileDTO)).thenReturn(profile);
        when(profileRepository.save(profile)).thenReturn(profile);

        // Act
        ApiResponse<ProfileDTO> response = profileService.updateProfile(profileDTO);

        // Assert
        assertEquals(200, response.getStatusCode());
        assertEquals("Profile updated successfully", response.getMessage());
        assertEquals(profileDTO, response.getData());
    }

    @Test
    void updateProfile_WhenProfileDoesNotExist_ShouldReturnNotFound() {
        // Arrange
        ProfileDTO profileDTO = new ProfileDTO();
        profileDTO.setProfileId(1L);

        when(profileRepository.findById(1L)).thenReturn(Optional.empty());

        // Act
        ApiResponse<ProfileDTO> response = profileService.updateProfile(profileDTO);

        // Assert
        assertEquals(404, response.getStatusCode());
        assertEquals("Profile not found", response.getMessage());
    }

    @Test
    void updateProfile_WhenProfileIdIsNull_ShouldReturnBadRequest() {
        // Arrange
        ProfileDTO profileDTO = new ProfileDTO();

        // Act
        ApiResponse<ProfileDTO> response = profileService.updateProfile(profileDTO);

        // Assert
        assertEquals(400, response.getStatusCode());
        assertEquals("Profile ID must not be null", response.getMessage());
    }

    @Test
    void getProfileByEmail_WhenProfileExists_ShouldReturnProfile() {
        // Arrange
        Profile profile = new Profile();
        profile.setEmail("test@endava.com");

        ProfileDTO profileDTO = new ProfileDTO();
        profileDTO.setEmail("test@endava.com");

        when(profileRepository.findByEmail("test@endava.com")).thenReturn(Optional.of(profile));
        when(profileMapper.toProfileDTO(profile)).thenReturn(profileDTO);

        // Act
        ApiResponse<ProfileDTO> response = profileService.getProfileByEmail("test@endava.com");

        // Assert
        assertEquals(200, response.getStatusCode());
        assertEquals("Profile found", response.getMessage());
        assertEquals("test@endava.com", response.getData().getEmail());
    }

    @Test
    void getProfileByEmail_WhenProfileDoesNotExist_ShouldReturnNotFound() {
        // Arrange
        when(profileRepository.findByEmail("test@endava.com")).thenReturn(Optional.empty());

        // Act
        ApiResponse<ProfileDTO> response = profileService.getProfileByEmail("test@endava.com");

        // Assert
        assertEquals(404, response.getStatusCode());
        assertEquals("Profile not found", response.getMessage());
    }

    @Test
    void getAllProfiles_ShouldReturnListOfProfiles() {
        // Arrange
        Profile profile = new Profile();
        ProfileDTO profileDTO = new ProfileDTO();

        when(profileRepository.findAll()).thenReturn(Collections.singletonList(profile));
        when(profileMapper.toProfileDTO(profile)).thenReturn(profileDTO);

        // Act
        ApiResponse<List<ProfileDTO>> response = profileService.getAllProfiles();

        // Assert
        assertEquals(200, response.getStatusCode());
        assertEquals("Profiles fetched successfully", response.getMessage());
        assertEquals(1, response.getData().size());
    }
}
