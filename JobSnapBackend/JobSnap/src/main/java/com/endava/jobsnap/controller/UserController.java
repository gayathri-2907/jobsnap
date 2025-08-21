//package com.endava.jobsnap.controller;
//
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.validation.annotation.Validated;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.endava.jobsnap.configurations.CrossOriginConfig;
//import com.endava.jobsnap.dto.LoginDTO;
//import com.endava.jobsnap.dto.ResponseDTO;
//import com.endava.jobsnap.dto.UserDTO;
//import com.endava.jobsnap.entities.OTP;
//import com.endava.jobsnap.response.ApiResponse;
//import com.endava.jobsnap.service.UserService;
//
//import jakarta.validation.Valid;
//import jakarta.validation.constraints.Email;
//import jakarta.validation.constraints.Pattern;
//import lombok.RequiredArgsConstructor;
//
//@RestController
//@CrossOrigin(CrossOriginConfig.CROSS_ORIGIN)
//@Validated
//@RequestMapping("/users")
//@RequiredArgsConstructor
//public class UserController {
//
//    private final UserService userService;
//
//    @PostMapping("/registerUser")
//    public ResponseEntity<ApiResponse<UserDTO>> registerUser(@RequestBody @Valid UserDTO userDTO) {
//        ApiResponse<UserDTO> response = userService.registerUser(userDTO);
//        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatusCode()));
//    }
//
//    @PostMapping("/loginUser")
//    public ResponseEntity<ApiResponse<UserDTO>> loginUser(@RequestBody @Valid LoginDTO loginDTO) {
//        ApiResponse<UserDTO> response = userService.loginUser(loginDTO);
//        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatusCode()));
//    }
//
//    @PostMapping("/changePassword")
//    public ResponseEntity<ApiResponse<ResponseDTO>> changePassword(@RequestBody @Valid LoginDTO loginDTO) {
//        ApiResponse<ResponseDTO> response = userService.changePassword(loginDTO);
//        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatusCode()));
//    }
//
//    @PostMapping("/sendOTP/{userEmail}")
//    public ResponseEntity<ApiResponse<OTP>> sentOTP(@PathVariable String userEmail) {
//        ApiResponse<OTP> response = userService.sendOTP(userEmail);
//        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatusCode()));
//    }
//
//    @GetMapping("/verifyOTP/{userEmail}/{otp}")
//
//    public ResponseEntity<ApiResponse<OTP>> verifyOTP(@PathVariable @Email(message = "{user.email.invalid}") String userEmail,
//                                                       @PathVariable @Pattern(regexp = "^\\d{6}$", message = "{otp.invalid}") String otp) {
//        ApiResponse<OTP> response = userService.verifyOTP(userEmail, otp);
//        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatusCode()));
//    }
//
//}


package com.endava.jobsnap.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.endava.jobsnap.configurations.CrossOriginConfig;
import com.endava.jobsnap.dto.LoginDTO;
import com.endava.jobsnap.dto.ResponseDTO;
import com.endava.jobsnap.dto.UserDTO;
import com.endava.jobsnap.entities.OTP;
import com.endava.jobsnap.response.ApiResponse;
import com.endava.jobsnap.service.UserService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import lombok.RequiredArgsConstructor;

/**
 * Controller for handling user-related operations such as registration, login, password change, and OTP verification.
 */
@RestController
@CrossOrigin(CrossOriginConfig.CROSS_ORIGIN)
@Validated
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    /**
     * Endpoint to register a new user.
     * 
     * @param userDTO the data of the user to be registered
     * @return ResponseEntity<ApiResponse<UserDTO>> the response containing the registered user's details
     */
    @PostMapping("/registerUser")
    public ResponseEntity<ApiResponse<UserDTO>> registerUser(@RequestBody @Valid UserDTO userDTO) {
        ApiResponse<UserDTO> response = userService.registerUser(userDTO);
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatusCode()));
    }

    /**
     * Endpoint to log in an existing user.
     * 
     * @param loginDTO the login credentials of the user
     * @return ResponseEntity<ApiResponse<UserDTO>> the response containing the logged-in user's details
     */
    @PostMapping("/loginUser")
    public ResponseEntity<ApiResponse<UserDTO>> loginUser(@RequestBody @Valid LoginDTO loginDTO) {
        ApiResponse<UserDTO> response = userService.loginUser(loginDTO);
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatusCode()));
    }

    /**
     * Endpoint to change the password of an existing user.
     * 
     * @param loginDTO the login credentials of the user, including the new password
     * @return ResponseEntity<ApiResponse<ResponseDTO>> the response indicating the status of the password change
     */
    @PostMapping("/changePassword")
    public ResponseEntity<ApiResponse<ResponseDTO>> changePassword(@RequestBody @Valid LoginDTO loginDTO) {
        ApiResponse<ResponseDTO> response = userService.changePassword(loginDTO);
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatusCode()));
    }

    /**
     * Endpoint to send an OTP to a user's email.
     * 
     * @param userEmail the email of the user to whom the OTP will be sent
     * @return ResponseEntity<ApiResponse<OTP>> the response containing the OTP sent to the user
     */
    @PostMapping("/sendOTP/{userEmail}")
    public ResponseEntity<ApiResponse<OTP>> sentOTP(@PathVariable String userEmail) {
        ApiResponse<OTP> response = userService.sendOTP(userEmail);
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatusCode()));
    }

    /**
     * Endpoint to verify the OTP sent to a user's email.
     * 
     * @param userEmail the email of the user to verify the OTP
     * @param otp the OTP code to be verified
     * @return ResponseEntity<ApiResponse<OTP>> the response indicating whether the OTP verification was successful
     */
    @GetMapping("/verifyOTP/{userEmail}/{otp}")
    public ResponseEntity<ApiResponse<OTP>> verifyOTP(@PathVariable @Email(message = "{user.email.invalid}") String userEmail,
                                                       @PathVariable @Pattern(regexp = "^\\d{6}$", message = "{otp.invalid}") String otp) {
        ApiResponse<OTP> response = userService.verifyOTP(userEmail, otp);
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatusCode()));
    }

}
