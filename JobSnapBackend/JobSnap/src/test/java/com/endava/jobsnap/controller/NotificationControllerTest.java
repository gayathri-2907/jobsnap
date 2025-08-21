package com.endava.jobsnap.controller;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.endava.jobsnap.dto.NotificationDTO;
import com.endava.jobsnap.dto.NotificationStatus;
import com.endava.jobsnap.entities.Notification;
import com.endava.jobsnap.response.ApiResponse;
import com.endava.jobsnap.service.NotificationService;

@ExtendWith(MockitoExtension.class)
 class NotificationControllerTest {

    @Mock
    private NotificationService notificationService;

    @InjectMocks
    private NotificationController notificationController;

    private MockMvc mockMvc;

    @BeforeEach
     void setup() {
        mockMvc = MockMvcBuilders.standaloneSetup(notificationController).build();
    }

    @Test
     void testGetAllNotifications_Success() throws Exception {
        // Create mock notifications
        Notification notification1 = new Notification(1L, "user1@example.com", "Job Application", "view", "/job/1", null, null);
        Notification notification2 = new Notification(2L, "user1@example.com", "Interview Scheduled", "view", "/interview/1", null, null);

        // Create a successful response with notifications
        List<Notification> notifications = Arrays.asList(notification1, notification2);
        ApiResponse<List<Notification>> response = ApiResponse.success(notifications, "Notifications fetched successfully", HttpStatus.OK.value());
        when(notificationService.getUnreadNotifications("user1@example.com")).thenReturn(response);

        mockMvc.perform(get("/notifications/getAllNotifications/user1@example.com"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.statusCode").value(200))
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Notifications fetched successfully"))
                .andExpect(jsonPath("$.data.length()").value(2));  // Checking the length of the response array
    }

    @Test
     void testGetAllNotifications_NoNotifications() throws Exception {
        // Create an empty response
        ApiResponse<List<Notification>> response = ApiResponse.success(Arrays.asList(), "No notifications found", HttpStatus.OK.value());
        when(notificationService.getUnreadNotifications("user1@example.com")).thenReturn(response);

        mockMvc.perform(get("/notifications/getAllNotifications/user1@example.com"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.statusCode").value(200))
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("No notifications found"))
                .andExpect(jsonPath("$.data.length()").value(0)); 
    }

    @Test
     void testGetAllNotifications_Failure() throws Exception {
        // Create a failure response
        ApiResponse<List<Notification>> response = ApiResponse.failure("Failed to fetch notifications", HttpStatus.INTERNAL_SERVER_ERROR.value());
        when(notificationService.getUnreadNotifications("user1@example.com")).thenReturn(response);

        mockMvc.perform(get("/notifications/getAllNotifications/user1@example.com"))
                .andExpect(status().isInternalServerError())
                .andExpect(jsonPath("$.statusCode").value(500))
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Failed to fetch notifications"));
    }

    @Test
    void testReadNotification_Success() throws Exception {
        // Create a mock notification and set the status to "READ"
        NotificationDTO notificationDTO = new NotificationDTO();
        notificationDTO.setStatus(NotificationStatus.READ);

        // Create a successful response
        ApiResponse<NotificationDTO> response = ApiResponse.success(notificationDTO, "Notification marked as read", HttpStatus.OK.value());
        when(notificationService.readNotification(1L)).thenReturn(response);

        // Perform the PUT request and check the response
        mockMvc.perform(put("/notifications/readNotification/1"))
                .andExpect(status().isOk()) 
                .andExpect(jsonPath("$.statusCode").value(200)) 
                .andExpect(jsonPath("$.success").value(true)) 
                .andExpect(jsonPath("$.message").value("Notification marked as read")) // Check message
                .andExpect(jsonPath("$.data.status").value("READ")); // Check if the notification status is "READ"
    }


    @Test
     void testReadNotification_Failure() throws Exception {
        // Create a failure response
        ApiResponse<NotificationDTO> response = ApiResponse.failure("Notification not found", HttpStatus.NOT_FOUND.value());
        when(notificationService.readNotification(1L)).thenReturn(response);

        mockMvc.perform(put("/notifications/readNotification/1"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.statusCode").value(404))
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Notification not found"));
    }

    @Test
     void testReadNotification_InvalidId() throws Exception {
        // Simulate a scenario where the notification ID is invalid
        ApiResponse<NotificationDTO> response = ApiResponse.failure("Notification not found", HttpStatus.NOT_FOUND.value());
        when(notificationService.readNotification(999L)).thenReturn(response);

        mockMvc.perform(put("/notifications/readNotification/999"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.statusCode").value(404))
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Notification not found"));
    }
}
