package com.endava.jobsnap.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Collections;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.endava.jobsnap.dto.ProfileDTO;
import com.endava.jobsnap.response.ApiResponse;
import com.endava.jobsnap.service.ProfileService;
import com.fasterxml.jackson.databind.ObjectMapper;

@ExtendWith(MockitoExtension.class)
class ProfileControllerTest {

    @Mock
    private ProfileService profileService;

    @InjectMocks
    private ProfileController profileController;

    private MockMvc mockMvc;

    private ProfileDTO profileDTO;

    private ObjectMapper objectMapper;

    @BeforeEach
     void setup() {
        mockMvc = MockMvcBuilders.standaloneSetup(profileController).build();
        objectMapper = new ObjectMapper();
        
        profileDTO = ProfileDTO.builder()
                .profileId(1L)
                .name("John Doe")
                .email("john.doe@example.com")
                .jobTitle("Software Engineer")
                .company("Tech Corp")
                .location("New York")
                .about("Experienced Software Engineer")
                .profilePicture(null)
                .totalExperience("5 years")
                .skills(Collections.singletonList("Java"))
                .certifications(Collections.emptyList())
                .experiences(Collections.emptyList())
                .savedJobs(Collections.emptyList())
                .build();
    }

    @Test
     void testGetProfile() throws Exception {
        // Arrange
        ApiResponse<ProfileDTO> apiResponse = ApiResponse.success(profileDTO, "Profile fetched successfully", HttpStatus.OK.value());
        when(profileService.getProfile(1L)).thenReturn(apiResponse);

        // Act & Assert
        mockMvc.perform(get("/profiles/getProfile/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.name").value("John Doe"))
                .andExpect(jsonPath("$.data.email").value("john.doe@example.com"))
                .andExpect(jsonPath("$.message").value("Profile fetched successfully"))
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
     void testUpdateProfile() throws Exception {
        // Arrange
        ApiResponse<ProfileDTO> apiResponse = ApiResponse.success(profileDTO, "Profile updated successfully", HttpStatus.OK.value());
        when(profileService.updateProfile(any(ProfileDTO.class))).thenReturn(apiResponse);

        // Act & Assert
        mockMvc.perform(put("/profiles/update")
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(profileDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.name").value("John Doe"))
                .andExpect(jsonPath("$.message").value("Profile updated successfully"))
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
     void testGetProfileByEmail() throws Exception {
        // Arrange
        ApiResponse<ProfileDTO> apiResponse = ApiResponse.success(profileDTO, "Profile fetched successfully", HttpStatus.OK.value());
        when(profileService.getProfileByEmail("john.doe@example.com")).thenReturn(apiResponse);

        // Act & Assert
        mockMvc.perform(get("/profiles/getProfileByEmail/john.doe@example.com"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.name").value("John Doe"))
                .andExpect(jsonPath("$.data.email").value("john.doe@example.com"))
                .andExpect(jsonPath("$.message").value("Profile fetched successfully"))
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
     void testGetAllProfiles() throws Exception {
        // Arrange
        ApiResponse<List<ProfileDTO>> apiResponse = ApiResponse.success(Collections.singletonList(profileDTO), "Profiles fetched successfully", HttpStatus.OK.value());
        when(profileService.getAllProfiles()).thenReturn(apiResponse);

        // Act & Assert
        mockMvc.perform(get("/profiles/getAllProfiles"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data[0].name").value("John Doe"))
                .andExpect(jsonPath("$.message").value("Profiles fetched successfully"))
                .andExpect(jsonPath("$.success").value(true));
    }
}
