package com.endava.jobsnap.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.endava.jobsnap.configurations.CrossOriginConfig;
import com.endava.jobsnap.dto.NotificationDTO;
import com.endava.jobsnap.entities.Notification;
import com.endava.jobsnap.response.ApiResponse;
import com.endava.jobsnap.service.NotificationService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(CrossOriginConfig.CROSS_ORIGIN)
@RequestMapping(value = "/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping("/getAllNotifications/{userEmail}")
    public ResponseEntity<ApiResponse<List<Notification>>> getAllNotifications(@PathVariable String userEmail) {
        ApiResponse<List<Notification>> response = notificationService.getUnreadNotifications(userEmail);
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatusCode()));
    }

    @PutMapping("/readNotification/{id}")
    public ResponseEntity<ApiResponse<NotificationDTO>> readNotification(@PathVariable Long id) {
        ApiResponse<NotificationDTO> response = notificationService.readNotification(id);
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatusCode()));
    }
}
