package com.endava.jobsnap.service.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.endava.jobsnap.dto.LoginDTO;
import com.endava.jobsnap.dto.ResponseDTO;
import com.endava.jobsnap.dto.UserDTO;
import com.endava.jobsnap.entities.OTP;
import com.endava.jobsnap.entities.Profile;
import com.endava.jobsnap.entities.User;
import com.endava.jobsnap.mapper.UserMapper;
import com.endava.jobsnap.repositories.OTPRepository;
import com.endava.jobsnap.repositories.ProfileRepository;
import com.endava.jobsnap.repositories.UserRepository;
import com.endava.jobsnap.response.ApiResponse;
import com.endava.jobsnap.service.NotificationService;
import com.endava.jobsnap.service.ProfileService;

import jakarta.mail.internet.MimeMessage;

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

    @InjectMocks
    private UserServiceImpl userService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserMapper userMapper;

    @Mock
    private ProfileService profileService;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private ProfileRepository profileRepository;

    @Mock
    private OTPRepository otpRepository;

    @Mock
    private JavaMailSender mailSender;

    @Mock
    private NotificationService notificationService;

    private User user;
    private UserDTO userDTO;

    @BeforeEach
    void setUp() {
        user = User.builder()
                .userId(1L)
                .userEmail("test@example.com")
                .userPassword("encodedPassword")
                .build();

        userDTO = UserDTO.builder()
                .userEmail("test@example.com")
                .userPassword("plainPassword")
                .build();
    }

    @Test
    void registerUser_Success() {
        when(userRepository.findByuserEmail(userDTO.getUserEmail())).thenReturn(Optional.empty());
        when(profileService.createProfile(userDTO.getUserEmail())).thenReturn(ApiResponse.success(1L, "Profile created", 401));
        when(passwordEncoder.encode(userDTO.getUserPassword())).thenReturn("encodedPassword");

        Profile profile = new Profile();
        profile.setProfileId(1L);

        when(profileRepository.findById(1L)).thenReturn(Optional.of(profile));

        User mappedUser = new User();
        mappedUser.setProfile(profile);

        when(userMapper.toUser(any(UserDTO.class))).thenReturn(mappedUser);
        when(userRepository.save(any(User.class))).thenReturn(user);
        when(userMapper.toUserDTO(any(User.class))).thenReturn(userDTO);

        ApiResponse<UserDTO> response = userService.registerUser(userDTO);

        assertEquals(201, response.getStatusCode());
        assertEquals("User Registered successfully", response.getMessage());
    }

    @Test
    void registerUser_UserAlreadyExists() {
        when(userRepository.findByuserEmail(userDTO.getUserEmail())).thenReturn(Optional.of(user));

        ApiResponse<UserDTO> response = userService.registerUser(userDTO);

        assertEquals(409, response.getStatusCode());
        assertEquals("user found", response.getMessage());
    }

    @Test
    void loginUser_Success() {
        when(userRepository.findByuserEmail(userDTO.getUserEmail())).thenReturn(Optional.of(user));
        when(passwordEncoder.matches(userDTO.getUserPassword(), user.getUserPassword())).thenReturn(true);
        when(userMapper.toUserDTO(user)).thenReturn(userDTO);

        ApiResponse<UserDTO> response = userService.loginUser(userDTO.toLoginDTO());

        assertEquals(200, response.getStatusCode());
        assertEquals("Login successful", response.getMessage());
    }

    @Test
    void loginUser_UserNotFound() {
        when(userRepository.findByuserEmail(userDTO.getUserEmail())).thenReturn(Optional.empty());

        ApiResponse<UserDTO> response = userService.loginUser(userDTO.toLoginDTO());

        assertEquals(404, response.getStatusCode());
        assertEquals("user not found", response.getMessage());
    }

    @Test
    void loginUser_InvalidCredentials() {
        when(userRepository.findByuserEmail(userDTO.getUserEmail())).thenReturn(Optional.of(user));
        when(passwordEncoder.matches(userDTO.getUserPassword(), user.getUserPassword())).thenReturn(false);

        ApiResponse<UserDTO> response = userService.loginUser(userDTO.toLoginDTO());

        assertEquals(401, response.getStatusCode());
        assertEquals("Invalid Credentials", response.getMessage());
    }

    @Test
    void sendOTP_Success() {
        // Mock the userRepository to return a user by email
        User newUser = new User();
        newUser.setUserEmail("test@example.com");
        newUser.setUserName("Test User");
        newUser.setUserPassword("Password123!");

        when(userRepository.findByuserEmail(newUser.getUserEmail())).thenReturn(Optional.of(newUser));

        // Mock the MimeMessage to be returned by the mailSender
        MimeMessage mimeMessage = mock(MimeMessage.class);
        when(mailSender.createMimeMessage()).thenReturn(mimeMessage);

        // Mock OTP save
        OTP otp = new OTP();
        otp.setOtpcode("123456"); // Assuming OTP requires a code
        when(otpRepository.save(any(OTP.class))).thenReturn(otp);

        // Call the service method
        ApiResponse<OTP> response = userService.sendOTP(newUser.getUserEmail());

        // Assert the status code and message
        assertEquals(200, response.getStatusCode());
        assertEquals("OTP sent successfully", response.getMessage());
    }

    @Test
    void sendOTP_UserNotFound() {
        when(userRepository.findByuserEmail(user.getUserEmail())).thenReturn(Optional.empty());

        ApiResponse<OTP> response = userService.sendOTP(user.getUserEmail());

        assertEquals(404, response.getStatusCode());
        assertEquals("user not found", response.getMessage());
    }

    @Test
    void verifyOTP_Success() {
        OTP otp = new OTP("test@example.com", "123456", LocalDateTime.now());
        when(otpRepository.findById(user.getUserEmail())).thenReturn(Optional.of(otp));

        ApiResponse<OTP> response = userService.verifyOTP(user.getUserEmail(), "123456");

        assertEquals(200, response.getStatusCode());
        assertEquals("OTP verified Successfully", response.getMessage());
    }

    @Test
    void verifyOTP_NotFound() {
        when(otpRepository.findById(user.getUserEmail())).thenReturn(Optional.empty());

        ApiResponse<OTP> response = userService.verifyOTP(user.getUserEmail(), "123456");

        assertEquals(404, response.getStatusCode());
        assertEquals("OTP not found", response.getMessage());
    }

    @Test
    void verifyOTP_Incorrect() {
        OTP otp = new OTP("test@example.com", "123456", LocalDateTime.now());
        when(otpRepository.findById(user.getUserEmail())).thenReturn(Optional.of(otp));

        ApiResponse<OTP> response = userService.verifyOTP(user.getUserEmail(), "654321");

        assertEquals(401, response.getStatusCode());
        assertEquals("Incorrect OTP", response.getMessage());
    }

    @Test
    void changePassword_Success() {
        when(userRepository.findByuserEmail(user.getUserEmail())).thenReturn(Optional.of(user));
        when(passwordEncoder.encode("newPassword")).thenReturn("encodedNewPassword");

        LoginDTO loginDTO = new LoginDTO(user.getUserEmail(), "newPassword");

        ApiResponse<ResponseDTO> response = userService.changePassword(loginDTO);

        assertEquals(200, response.getStatusCode());
        assertEquals("password changed successfully", response.getMessage());
    }

    @Test
    void changePassword_UserNotFound() {
        when(userRepository.findByuserEmail(user.getUserEmail())).thenReturn(Optional.empty());

        LoginDTO loginDTO = new LoginDTO(user.getUserEmail(), "newPassword");

        ApiResponse<ResponseDTO> response = userService.changePassword(loginDTO);

        assertEquals(404, response.getStatusCode());
        assertEquals("user not found", response.getMessage());
    }

    @Test
    void getUserByEmail_Success() {
        when(userRepository.findByuserEmail(user.getUserEmail())).thenReturn(Optional.of(user));
        when(userMapper.toUserDTO(user)).thenReturn(userDTO);

        ApiResponse<UserDTO> response = userService.getUserByEmail(user.getUserEmail());

        assertEquals(200, response.getStatusCode());
        assertEquals("user found", response.getMessage());
    }

    @Test
    void getUserByEmail_UserNotFound() {
        when(userRepository.findByuserEmail(user.getUserEmail())).thenReturn(Optional.empty());

        ApiResponse<UserDTO> response = userService.getUserByEmail(user.getUserEmail());

        assertEquals(404, response.getStatusCode());
        assertEquals("user not found", response.getMessage());
    }

    @Test
    void removeExpiredOTPs() {
        OTP expiredOtp = new OTP("test@example.com", "123456", LocalDateTime.now().minusMinutes(6));
        when(otpRepository.findByCreationTimeBefore(any())).thenReturn(Collections.singletonList(expiredOtp));

        userService.removeExpiredOTPs();

        verify(otpRepository).deleteAll(anyList());
    }
}
