//package com.endava.jobsnap.controller;
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.BadCredentialsException;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.endava.jobsnap.configurations.CrossOriginConfig;
//import com.endava.jobsnap.jwt.AuthenticationRequest;
//import com.endava.jobsnap.jwt.AuthenticationResponse;
//import com.endava.jobsnap.jwt.JWTHelper;
//
//import lombok.RequiredArgsConstructor;
//
//@RestController
//@CrossOrigin(CrossOriginConfig.CROSS_ORIGIN)
//@RequestMapping("/auth")
//@RequiredArgsConstructor
//public class AuthController {
//
//    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
//
//   
//    private final UserDetailsService userDetailsService;
//
//    
//    private final AuthenticationManager authenticationManager;
//
//    
//    private final JWTHelper jwtHelper;
//
//    @PostMapping("/login")
//    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest request) {
//        try {
//            UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUserEmail());
//
//            if (userDetails == null) {
//                throw new UsernameNotFoundException("USER_NOT_FOUND");
//            }
//
//            authenticationManager.authenticate(
//                    new UsernamePasswordAuthenticationToken(request.getUserEmail(), request.getUserPassword())
//            );
//            final String jwt = jwtHelper.generateToken(userDetails);
//            return ResponseEntity.ok(new AuthenticationResponse(jwt));
//
//        } catch (UsernameNotFoundException e) {
//            logger.error("User not found: {}", e.getMessage());
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
//
//        } catch (BadCredentialsException e) {
//            logger.error("Bad credentials: {}", e.getMessage());
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
//
//        } catch (Exception e) {
//            logger.error("An error occurred during authentication: {}", e.getMessage());
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during authentication");
//        }
//    }
//}


package com.endava.jobsnap.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.endava.jobsnap.configurations.CrossOriginConfig;
import com.endava.jobsnap.jwt.AuthenticationRequest;
import com.endava.jobsnap.jwt.AuthenticationResponse;
import com.endava.jobsnap.jwt.JWTHelper;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(CrossOriginConfig.CROSS_ORIGIN)
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    private final UserDetailsService userDetailsService;
    private final AuthenticationManager authenticationManager;
    private final JWTHelper jwtHelper;

    /**
     * Handles user login by authenticating the credentials and generating a JWT token.
     *
     * @param request the login request containing the user's email and password
     * @return ResponseEntity<?> the response containing the JWT token or error message
     */
    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest request) {
        try {
            // Load user details based on the provided email
            UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUserEmail());

            if (userDetails == null) {
                throw new UsernameNotFoundException("USER_NOT_FOUND");
            }

            // Authenticate the user credentials
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUserEmail(), request.getUserPassword())
            );
            // Generate JWT token if authentication is successful
            final String jwt = jwtHelper.generateToken(userDetails);
            return ResponseEntity.ok(new AuthenticationResponse(jwt)); 

        } catch (UsernameNotFoundException e) {
            logger.error("User not found: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");

        } catch (BadCredentialsException e) {
            logger.error("Bad credentials: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");

        } catch (Exception e) {
            logger.error("An error occurred during authentication: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during authentication");
        }
    }
}
