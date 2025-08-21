package com.endava.jobsnap.configurations;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Getter;
import lombok.Setter;

@Configuration
@ConfigurationProperties(prefix = "app")
@Getter
@Setter
public class AppConstantsConfig {

    // User messages
    private String userFound;
    private String userNotFound;
    private String userRegisteredSuccess;
    private String invalidCredentials;
    private String loginSuccess;

    // OTP messages
    private String otpSentSuccess;
    private String otpSendFailed;
    private String otpNotFound;
    private String otpIncorrect;
    private String otpVerifiedSuccess;

    // Password messages
    private String passwordChangedSuccess;
    private String passwordResetSuccess;

    // Job messages
    private String jobPostSuccess;
    private String jobRetrieveSuccess;
    private String jobNotFound;
    private String jobAlreadyApplied;
    private String jobApplicationSuccess;
    private String jobStatusChangeSuccess;
    private String jobRetrieveByEmailSuccess;

    // Notification messages
    private String notificationJobPosted;
    private String notificationNewJobPosted;
    private String notificationInterviewScheduled;
    private String notificationJobOffered;
    private String notificationJobRejected;

    // Logging messages
    private String logMethodStarted;
    private String logMethodEnded;
    private String logMethodReturned;
    private String logMethodException;

    // Routes
    private String routePostedJob;
    private String routeJobHistory;
    
    //profile
    
   private String profileNotFound;
   

}
