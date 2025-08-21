package com.endava.jobsnap.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.endava.jobsnap.dto.LoginDTO;
import com.endava.jobsnap.dto.NotificationDTO;
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
import com.endava.jobsnap.service.UserService;
import com.endava.jobsnap.utility.Data;
import com.endava.jobsnap.utility.Utilities;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

@Service(value = "userService")
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final ProfileService profileService;
    private final PasswordEncoder passwordEncoder;
    private final ProfileRepository profileRepository;
    private final OTPRepository otpRepository;
    private final JavaMailSender mailSender;
    private final NotificationService notificationService;
    
//    private final AppConstantsConfig constants;



    /**
     * Registers a new user by creating a profile, setting user credentials, and saving the user entity.
     * 
     * @param userDTO the DTO containing user details (email, password, etc.)
     * @return ApiResponse<UserDTO> the response with the newly registered user data or an error message
     */
    @Override
    public ApiResponse<UserDTO> registerUser(UserDTO userDTO) {
        Optional<User> optional = userRepository.findByuserEmail(userDTO.getUserEmail());
        if (optional.isPresent()) {
            return ApiResponse.failure("user found", 409); 
        }

        Long profileId = profileService.createProfile(userDTO.getUserEmail()).getData();
        userDTO.setProfileId(profileId);
        userDTO.setUserPassword(passwordEncoder.encode(userDTO.getUserPassword()));

        User user = userMapper.toUser(userDTO);
        Profile profile = profileRepository.findById(profileId).orElseThrow();
        profile.setName(user.getUserName());

        user.setProfile(profile);
        user = userRepository.save(user);

        return ApiResponse.success(userMapper.toUserDTO(user), "User Registered successfully", 201); 
    }

    /**
     * Logs in the user by verifying their credentials.
     * 
     * @param loginDTO the DTO containing user email and password
     * @return ApiResponse<UserDTO> the response with user data or an error message if login fails
     */
    @Override
    public ApiResponse<UserDTO> loginUser(LoginDTO loginDTO) {
        Optional<User> userOpt = userRepository.findByuserEmail(loginDTO.getUserEmail());
        if (userOpt.isEmpty()) {
            return ApiResponse.failure("user not found", 404);
        }

        User user = userOpt.get();
        if (!passwordEncoder.matches(loginDTO.getUserPassword(), user.getUserPassword())) {
            return ApiResponse.failure("Invalid Credentials", 401); 
        }

        return ApiResponse.success(userMapper.toUserDTO(user), "Login successful", 200); 
    }

    /**
     * Sends a one-time password (OTP) to the user's email for verification.
     * 
     * @param userEmail the email address of the user to send the OTP to
     * @return ApiResponse<OTP> the response with the generated OTP or an error message
     */
    @Override
    public ApiResponse<OTP> sendOTP(String userEmail) {
        Optional<User> userOpt = userRepository.findByuserEmail(userEmail);
        if (userOpt.isEmpty()) {
            return ApiResponse.failure("user not found", 404); 
        }

        User user = userOpt.get();
        MimeMessage mm = mailSender.createMimeMessage();
        MimeMessageHelper message;
        try {
            message = new MimeMessageHelper(mm, true);
            message.setTo(userEmail);
            message.setSubject("Your OTP code");
            String genOTP = Utilities.generateOTP();
            OTP otp = new OTP(userEmail, genOTP, LocalDateTime.now());
            otpRepository.save(otp);
            message.setText(Data.getMessageBody(genOTP, user.getUserName()), true);
            mailSender.send(mm);

            return ApiResponse.success(otp, "OTP sent successfully", 200); 
        } catch (Exception e) {
            return ApiResponse.failure("OTP sending failed", 500); 
        }
    }

    /**
     * Verifies the OTP entered by the user.
     * 
     * @param userEmail the email address of the user
     * @param otp the OTP to verify
     * @return ApiResponse<OTP> the response with OTP verification status
     */
    @Override
    public ApiResponse<OTP> verifyOTP(String userEmail, String otp) {
        Optional<OTP> otpOpt = otpRepository.findById(userEmail);
        if (otpOpt.isEmpty()) {
            return ApiResponse.failure("OTP not found", 404);
        }

        OTP otpEntity = otpOpt.get();
        if (!otpEntity.getOtpcode().equals(otp)) {
            return ApiResponse.failure("Incorrect OTP", 401); 
        }

        return ApiResponse.success(otpEntity,"OTP verified Successfully", 200);
    }

    /**
     * Changes the user's password after verifying their email and new password.
     * 
     * @param loginDTO the DTO containing the user email and new password
     * @return ApiResponse<ResponseDTO> the response with password change status
     */
    @Override
    public ApiResponse<ResponseDTO> changePassword(LoginDTO loginDTO) {
        Optional<User> userOpt = userRepository.findByuserEmail(loginDTO.getUserEmail());
        if (userOpt.isEmpty()) {
            return ApiResponse.failure("user not found", 404); 
        }

        User user = userOpt.get();
        user.setUserPassword(passwordEncoder.encode(loginDTO.getUserPassword()));
        userRepository.save(user);

        NotificationDTO noti = new NotificationDTO();
        noti.setUserEmail(user.getUserEmail());
        noti.setMessage("Password Reset Successful");
        noti.setAction("Password Reset");
        notificationService.sendNotification(noti);

        return ApiResponse.success(new ResponseDTO("Password changed successfully..!"),"password changed successfully", 200); 
    }

    /**
     * Removes expired OTPs from the database that are older than 5 minutes.
     * This method is scheduled to run at fixed intervals.
     */
    @Scheduled(fixedRate = 3000)
    public void removeExpiredOTPs() {
        LocalDateTime expiry = LocalDateTime.now().minusMinutes(5);
        List<OTP> expiredOTPs = otpRepository.findByCreationTimeBefore(expiry);
        if (!expiredOTPs.isEmpty()) {
            otpRepository.deleteAll(expiredOTPs);
            logger.info("Removed {} expired OTPs", expiredOTPs.size());
        }
    }

    /**
     * Retrieves the user by their email address.
     * 
     * @param userEmail the email address of the user to retrieve
     * @return ApiResponse<UserDTO> the response with the user data or an error message
     */
    @Override
    public ApiResponse<UserDTO> getUserByEmail(String userEmail) {
        Optional<User> userOpt = userRepository.findByuserEmail(userEmail);
        if (userOpt.isEmpty()) {
            return ApiResponse.failure("user not found", HttpStatus.NOT_FOUND.value()); 
        }

        User user = userOpt.get();
        return ApiResponse.success(userMapper.toUserDTO(user), "user found", HttpStatus.OK.value()); 
    }

	}
