package com.endava.jobsnap.service;

import com.endava.jobsnap.dto.LoginDTO;
import com.endava.jobsnap.dto.ResponseDTO;
import com.endava.jobsnap.dto.UserDTO;
import com.endava.jobsnap.entities.OTP;
import com.endava.jobsnap.response.ApiResponse;

public interface UserService {

	public ApiResponse<UserDTO> registerUser(UserDTO userDTO) ;
	
	public ApiResponse<UserDTO> getUserByEmail(String userEmail) ;
	
	public ApiResponse<UserDTO> loginUser(LoginDTO loginDTO) ;
	
	public ApiResponse<OTP> sendOTP(String userEmail) ;
	public ApiResponse<OTP> verifyOTP(String userEmail,String otp);
	public ApiResponse<ResponseDTO> changePassword( LoginDTO loginDTO);
}
