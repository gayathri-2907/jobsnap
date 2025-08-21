package com.endava.jobsnap.mapper;

import com.endava.jobsnap.dto.UserDTO;
import com.endava.jobsnap.entities.Profile;
import com.endava.jobsnap.entities.User;
import com.endava.jobsnap.dto.AccountType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class UserMapperTest {

    private UserMapper userMapper;

    @BeforeEach
    void setUp() {
        userMapper = new UserMapper();
    }

    @Test
    void testToUser_ValidDTO() {
        // Given
        UserDTO userDTO = UserDTO.builder()
                .userId(1L)
                .userName("John Doe")
                .userEmail("john.doe@example.com")
                .userPassword("password123")
                .accountType(AccountType.APPLICANT)
                .profileId(10L)
                .build();

        // When
        User user = userMapper.toUser(userDTO);

        // Then
        assertNotNull(user);
        assertEquals(userDTO.getUserId(), user.getUserId());
        assertEquals(userDTO.getUserName(), user.getUserName());
        assertEquals(userDTO.getUserEmail(), user.getUserEmail());
        assertEquals(userDTO.getUserPassword(), user.getUserPassword());
        assertEquals(userDTO.getAccountType(), user.getAccountType());
        assertNotNull(user.getProfile());
        assertEquals(userDTO.getProfileId(), user.getProfile().getProfileId());
    }

    @Test
    void testToUserDTO_ValidUser() {
        // Given
        Profile profile = new Profile(10L, "John Doe", "john.doe@example.com", null, null, null, null, null, null, null, null, null, null);
        User user = User.builder()
                .userId(1L)
                .userName("John Doe")
                .userEmail("john.doe@example.com")
                .userPassword("password123")
                .accountType(AccountType.APPLICANT)
                .profile(profile)
                .build();

        // When
        UserDTO userDTO = userMapper.toUserDTO(user);

        // Then
        assertNotNull(userDTO);
        assertEquals(user.getUserId(), userDTO.getUserId());
        assertEquals(user.getUserName(), userDTO.getUserName());
        assertEquals(user.getUserEmail(), userDTO.getUserEmail());
        assertEquals(user.getUserPassword(), userDTO.getUserPassword());
        assertEquals(user.getAccountType(), userDTO.getAccountType());
        assertEquals(user.getProfile().getProfileId(), userDTO.getProfileId());
    }

 

 

    @Test
    void testToUser_WithEmptyFields() {
        // Given
        UserDTO userDTO = UserDTO.builder()
                .userId(1L)
                .userName("") 
                .userEmail("") 
                .userPassword("") 
                .accountType(AccountType.APPLICANT) 
                .profileId(10L)
                .build();

        // When
        User user = userMapper.toUser(userDTO);

        // Then
        assertNotNull(user);
        assertEquals("", user.getUserName());
        assertEquals("", user.getUserEmail());
        assertEquals("", user.getUserPassword());
        assertNotNull(user.getProfile());
        assertEquals(userDTO.getProfileId(), user.getProfile().getProfileId());
    }

    @Test
    void testToUserDTO_WithEmptyFields() {
        // Given
        Profile profile = new Profile(10L, "", "", null, null, null, null, null, null, null, null, null, null);
        User user = User.builder()
                .userId(1L)
                .userName("") // Empty name
                .userEmail("") // Empty email
                .userPassword("") // Empty password
                .accountType(AccountType.APPLICANT)
                .profile(profile)
                .build();

        // When
        UserDTO userDTO = userMapper.toUserDTO(user);

        // Then
        assertNotNull(userDTO);
        assertEquals("", userDTO.getUserName());
        assertEquals("", userDTO.getUserEmail());
        assertEquals("", userDTO.getUserPassword());
        assertEquals(profile.getProfileId(), userDTO.getProfileId());
    }

}
