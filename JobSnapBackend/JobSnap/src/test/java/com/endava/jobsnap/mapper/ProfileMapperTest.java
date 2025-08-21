package com.endava.jobsnap.mapper;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

import java.time.LocalDateTime;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;

import com.endava.jobsnap.dto.Certification;
import com.endava.jobsnap.dto.Experience;
import com.endava.jobsnap.dto.ProfileDTO;
import com.endava.jobsnap.entities.Profile;

class ProfileMapperTest {

    @InjectMocks
    private ProfileMapper profileMapper;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testToProfile_withValidDTO() {
        // Given
        String validBase64String = "c29tZSB2YWxpZCBzdHJpbmc="; // base64 encoded "some valid string"
        ProfileDTO profileDTO = ProfileDTO.builder()
                .profileId(1L)
                .email("test@example.com")
                .name("John Doe")
                .jobTitle("Software Engineer")
                .company("TechCorp")
                .location("New York")
                .about("Experienced in full-stack development")
                .skills(List.of("Java", "Spring"))
                .certifications(List.of(new Certification("Java Certification", "Oracle", LocalDateTime.now(), "1234")))
                .experiences(List.of(new Experience("Developer", "TechCorp", "New York", LocalDateTime.now(), null, true, "Developed apps")))
                .totalExperience("5 years")
                .savedJobs(List.of(101L, 102L))
                .profilePicture(validBase64String) // valid base64 string
                .build();

        // When
        Profile profile = profileMapper.toProfile(profileDTO);

        // Then
        assertNotNull(profile);
        assertEquals(profileDTO.getProfileId(), profile.getProfileId());
        assertEquals(profileDTO.getEmail(), profile.getEmail());
        assertEquals(profileDTO.getName(), profile.getName());
        assertNotNull(profile.getProfilePicture()); // Check if profile picture is decoded correctly
    }


    // Test Case 2: Mapping from ProfileDTO to Profile with null values
    @Test
    void testToProfile_withNullValues() {
        // Given
        ProfileDTO profileDTO = ProfileDTO.builder()
                .profileId(1L)
                .email("test@example.com")
                .name("John Doe")
                .profilePicture(null)  // Null profile picture
                .skills(null) // Null skills
                .certifications(null) // Null certifications
                .experiences(null) // Null experiences
                .savedJobs(null) // Null saved jobs
                .build();

        // When
        Profile profile = profileMapper.toProfile(profileDTO);

        // Then
        assertNotNull(profile);
        assertNull(profile.getProfilePicture()); // Should be null
        assertNull(profile.getSkills()); // Should be null
        assertNull(profile.getCertifications()); // Should be null
        assertNull(profile.getExperiences()); // Should be null
        assertNull(profile.getSavedJobs()); // Should be null
    }

    // Test Case 3: Mapping from ProfileDTO to Profile with invalid Base64 string
    @Test
    void testToProfile_withInvalidBase64ProfilePicture() {
        // Given
        ProfileDTO profileDTO = ProfileDTO.builder()
                .profileId(1L)
                .email("test@example.com")
                .name("John Doe")
                .profilePicture("invalidBase64") // Invalid Base64 string
                .build();

        // When
        Profile profile = profileMapper.toProfile(profileDTO);

        // Then
        assertNotNull(profile);
        assertNull(profile.getProfilePicture()); // Should be null due to invalid Base64
    }

    // Test Case 4: Mapping from Profile to ProfileDTO with valid data
    @Test
    void testToProfileDTO_withValidProfile() {
        // Given
        Profile profile = Profile.builder()
                .profileId(1L)
                .email("test@example.com")
                .name("John Doe")
                .jobTitle("Software Engineer")
                .company("TechCorp")
                .location("New York")
                .about("Experienced in full-stack development")
                .skills(List.of("Java", "Spring"))
                .certifications(List.of(new Certification("Java Certification", "Oracle", LocalDateTime.now(), "1234")))
                .experiences(List.of(new Experience("Developer", "TechCorp", "New York", LocalDateTime.now(), null, true, "Developed apps")))
                .totalExperience("5 years")
                .savedJobs(List.of(101L, 102L))
                .profilePicture(new byte[]{1, 2, 3}) // Example profile picture
                .build();

        // When
        ProfileDTO profileDTO = profileMapper.toProfileDTO(profile);

        // Then
        assertNotNull(profileDTO);
        assertEquals(profile.getProfileId(), profileDTO.getProfileId());
        assertEquals(profile.getEmail(), profileDTO.getEmail());
        assertEquals(profile.getName(), profileDTO.getName());
        assertNotNull(profileDTO.getProfilePicture()); // Check if profile picture is encoded correctly
    }

    // Test Case 5: Mapping from Profile to ProfileDTO with null fields
    @Test
    void testToProfileDTO_withNullValues() {
        // Given
        Profile profile = Profile.builder()
                .profileId(1L)
                .email("test@example.com")
                .name("John Doe")
                .profilePicture(null) // Null profile picture
                .skills(null) // Null skills
                .certifications(null) // Null certifications
                .experiences(null) // Null experiences
                .savedJobs(null) // Null saved jobs
                .build();

        // When
        ProfileDTO profileDTO = profileMapper.toProfileDTO(profile);

        // Then
        assertNotNull(profileDTO);
        assertNull(profileDTO.getProfilePicture()); // Should be null
        assertNull(profileDTO.getSkills()); // Should be null
        assertNull(profileDTO.getCertifications()); // Should be null
        assertNull(profileDTO.getExperiences()); // Should be null
        assertNull(profileDTO.getSavedJobs()); // Should be null
    }

    @Test
    void testToProfile_withNullDTO() {
        // Given
        ProfileDTO profileDTO = null;

        // When
        Profile profile = profileMapper.toProfile(profileDTO);

        // Then
        assertNull(profile); // The method should return null when the DTO is null
    }



    @Test
    void testToProfileDTO_withNullProfile() {
        // Given
        Profile profile = null;

        // When
        ProfileDTO profileDTO = profileMapper.toProfileDTO(profile);

        // Then
        assertNull(profileDTO); // Should return null
    }
}
