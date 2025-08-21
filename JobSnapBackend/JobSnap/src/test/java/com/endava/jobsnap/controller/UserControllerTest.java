package com.endava.jobsnap.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.endava.jobsnap.dto.AccountType;
import com.endava.jobsnap.dto.LoginDTO;
import com.endava.jobsnap.dto.ResponseDTO;
import com.endava.jobsnap.dto.UserDTO;
import com.endava.jobsnap.entities.OTP;
import com.endava.jobsnap.response.ApiResponse;
import com.endava.jobsnap.service.UserService;

import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;

@ExtendWith(MockitoExtension.class)
class UserControllerTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    // Validator for UserDTO validation
    private static final ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
    private static final Validator validator = factory.getValidator();

    // Test for registerUser endpoint
    @Test
    void testRegisterUser_ValidInput() {
        // Given
        UserDTO userDTO = UserDTO.builder()
            .userName("John Doe")
            .userEmail("john.doe@example.com")
            .userPassword("Password@123")
            .accountType(AccountType.APPLICANT)
            .profileId(1L)
            .build();

        // Prepare the ApiResponse
        ApiResponse<UserDTO> apiResponse = ApiResponse.success(userDTO, "User registered successfully", HttpStatus.CREATED.value());
        when(userService.registerUser(userDTO)).thenReturn(apiResponse);

        // When
        ResponseEntity<ApiResponse<UserDTO>> response = userController.registerUser(userDTO);

        // Then
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(apiResponse, response.getBody());
        verify(userService, times(1)).registerUser(userDTO);
    }


    @Test
    void testRegisterUser_InvalidEmail() {
        // Given
        UserDTO userDTO = UserDTO.builder()
            .userName("John Doe")
            .userEmail("invalid-email") // Invalid email
            .userPassword("Password@123")
            .accountType(AccountType.APPLICANT)
            .profileId(1L)
            .build();

        // Validate input fields
        var violations = validator.validate(userDTO);

        // Print out violations for debugging
        violations.forEach(violation -> System.out.println(violation.getPropertyPath() + ": " + violation.getMessage()));

        // Check if the violation message contains the expected error
        assertTrue(violations.stream().anyMatch(violation ->
            violation.getPropertyPath().toString().equals("userEmail") &&
            violation.getMessage().equals("Email is invalid")));
    }


    @Test
    void testRegisterUser_InvalidPassword() {
        // Given
        UserDTO userDTO = UserDTO.builder()
            .userName("John Doe")
            .userEmail("john.doe@example.com")
            .userPassword("short")  // Invalid password
            .accountType(AccountType.APPLICANT)
            .profileId(1L)
            .build();

        // Validate input fields
        var violations = validator.validate(userDTO);

        // Print all violations for debugging
        violations.forEach(violation -> {
            System.out.println("Property: " + violation.getPropertyPath());
            System.out.println("Message: " + violation.getMessage());
        });

        // Assert that the violation is on the userPassword field with the correct message
        assertTrue(violations.stream().anyMatch(violation ->
            violation.getPropertyPath().toString().equals("userPassword") &&
            violation.getMessage().equals("Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long.")));
    }



    @Test
    void testLoginUser() {
        // Given
        LoginDTO loginDTO = new LoginDTO("john.doe@example.com", "Password@123");

        // Create an ApiResponse object as the expected response from the service
        ApiResponse<UserDTO> apiResponse = ApiResponse.success(new UserDTO(), "Login successful", HttpStatus.OK.value());
        
        // Mocking the service call
        when(userService.loginUser(loginDTO)).thenReturn(apiResponse);

        // When
        ResponseEntity<ApiResponse<UserDTO>> response = userController.loginUser(loginDTO);

        // Then
        // Check that the HTTP status is OK
        assertEquals(HttpStatus.OK, response.getStatusCode());

        // Compare the actual response body with the expected API response
        assertEquals(apiResponse.getStatusCode(), response.getBody().getStatusCode());
        assertEquals(apiResponse.isSuccess(), response.getBody().isSuccess());
        assertEquals(apiResponse.getMessage(), response.getBody().getMessage());
        assertEquals(apiResponse.getData(), response.getBody().getData());

        // Verify that the loginUser method in the service was called once with the correct parameter
        verify(userService, times(1)).loginUser(loginDTO);
    }


    // Test for changePassword endpoint
    @Test
    void testChangePassword() {
        // Given
        LoginDTO loginDTO = new LoginDTO("john.doe@example.com", "Password@123");

        ApiResponse<ResponseDTO> apiResponse = ApiResponse.success(new ResponseDTO(), "Password changed successfully", HttpStatus.OK.value());
        when(userService.changePassword(loginDTO)).thenReturn(apiResponse);

        // When
        ResponseEntity<ApiResponse<ResponseDTO>> response = userController.changePassword(loginDTO);

        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(apiResponse, response.getBody());
        verify(userService, times(1)).changePassword(loginDTO);
    }

    // Test for sendOTP endpoint
    @Test
    void testSendOTP() {
        // Given
        String userEmail = "john.doe@example.com";

        ApiResponse<OTP> apiResponse = ApiResponse.success(new OTP(), "OTP sent successfully", HttpStatus.OK.value());
        when(userService.sendOTP(userEmail)).thenReturn(apiResponse);

        // When
        ResponseEntity<ApiResponse<OTP>> response = userController.sentOTP(userEmail);

        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(apiResponse, response.getBody());
        verify(userService, times(1)).sendOTP(userEmail);
    }

    // Test for verifyOTP endpoint
    @Test
    void testVerifyOTP() {
        // Given
        String userEmail = "john.doe@example.com";
        String otp = "123456";

        ApiResponse<OTP> apiResponse = ApiResponse.success(new OTP(), "OTP verified successfully", HttpStatus.OK.value());
        when(userService.verifyOTP(userEmail, otp)).thenReturn(apiResponse);

        // When
        ResponseEntity<ApiResponse<OTP>> response = userController.verifyOTP(userEmail, otp);

        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(apiResponse, response.getBody());
        verify(userService, times(1)).verifyOTP(userEmail, otp);
    }
}
