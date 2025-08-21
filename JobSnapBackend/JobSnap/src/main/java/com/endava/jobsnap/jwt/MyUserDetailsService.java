package com.endava.jobsnap.jwt;

import java.util.ArrayList;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.endava.jobsnap.dto.UserDTO;
import com.endava.jobsnap.response.ApiResponse;
import com.endava.jobsnap.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MyUserDetailsService implements UserDetailsService {

    private final UserService userService;
    
    

    @Override
    public UserDetails loadUserByUsername(String userEmail) throws UsernameNotFoundException {
        ApiResponse<UserDTO> response = userService.getUserByEmail(userEmail);
        if (response == null || response.getData() == null) {
            throw new UsernameNotFoundException("User not found with email: " + userEmail);
        }

        UserDTO dto = response.getData();
        return new CustomUserDetails(
                dto.getUserId(),
                userEmail,
                dto.getUserName(),
                dto.getUserPassword(),
                dto.getProfileId(),
                dto.getAccountType(),
                new ArrayList<>()
        );
    }
}
