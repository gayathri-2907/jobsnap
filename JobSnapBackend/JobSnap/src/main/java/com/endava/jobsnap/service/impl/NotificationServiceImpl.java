//package com.endava.jobsnap.service.impl;
//
//import java.time.LocalDateTime;
//import java.util.List;
//import java.util.Optional;
//
//import org.springframework.http.HttpStatus;
//import org.springframework.stereotype.Service;
//
//import com.endava.jobsnap.dto.NotificationDTO;
//import com.endava.jobsnap.dto.NotificationStatus;
//import com.endava.jobsnap.entities.Notification;
//import com.endava.jobsnap.mapper.NotificationMapper;
//import com.endava.jobsnap.repositories.NotificationRepository;
//import com.endava.jobsnap.response.ApiResponse;
//import com.endava.jobsnap.service.NotificationService;
//
//import lombok.RequiredArgsConstructor;
//
//@Service("notificationService")
//@RequiredArgsConstructor
//public class NotificationServiceImpl implements NotificationService {
//
//    
//    private final NotificationRepository notificationRepository;
//    
//    
//    private final NotificationMapper notificationMapper;
//
//    @Override
//    public ApiResponse<NotificationDTO> sendNotification(NotificationDTO notificationDTO) {
//        notificationDTO.setTimestamp(LocalDateTime.now());
//        notificationDTO.setStatus(NotificationStatus.UNREAD);
//        Notification notification = notificationMapper.toNotification(notificationDTO);
//        notificationRepository.save(notification);
//        NotificationDTO savedNotificationDTO = notificationMapper.toNotificationDTO(notification);
//        return ApiResponse.success(savedNotificationDTO, "Notification sent successfully", HttpStatus.CREATED.value());
//    }
//
//    @Override
//    public ApiResponse<List<Notification>> getUnreadNotifications(String userEmail) {
//        List<Notification> unreadNotifications = notificationRepository.findByUserEmailAndStatus(userEmail, NotificationStatus.UNREAD);
//        return ApiResponse.success(unreadNotifications, "Unread notifications retrieved successfully", HttpStatus.OK.value());
//    }
//
//    @Override
//    public ApiResponse<NotificationDTO> readNotification(Long id) {
//        Optional<Notification> notificationOptional = notificationRepository.findById(id);
//        if (notificationOptional.isEmpty()) {
//            return ApiResponse.failure("No notification found", HttpStatus.NOT_FOUND.value());
//        }
//        Notification notification = notificationOptional.get();
//        notification.setStatus(NotificationStatus.READ);
//        notificationRepository.save(notification);
//        NotificationDTO notificationDTO = notificationMapper.toNotificationDTO(notification);
//        return ApiResponse.success(notificationDTO, "Notification marked as read", HttpStatus.OK.value());
//    }
//}



package com.endava.jobsnap.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.endava.jobsnap.dto.NotificationDTO;
import com.endava.jobsnap.dto.NotificationStatus;
import com.endava.jobsnap.entities.Notification;
import com.endava.jobsnap.mapper.NotificationMapper;
import com.endava.jobsnap.repositories.NotificationRepository;
import com.endava.jobsnap.response.ApiResponse;
import com.endava.jobsnap.service.NotificationService;

import lombok.RequiredArgsConstructor;

@Service("notificationService")
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final NotificationMapper notificationMapper;

    /**
     * Sends a notification by saving it in the database with the current timestamp and status as UNREAD.
     * 
     * @param notificationDTO the notification data to be sent
     * @return ApiResponse containing the sent notification information
     */
    @Override
    public ApiResponse<NotificationDTO> sendNotification(NotificationDTO notificationDTO) {
        notificationDTO.setTimestamp(LocalDateTime.now());
        notificationDTO.setStatus(NotificationStatus.UNREAD);
        Notification notification = notificationMapper.toNotification(notificationDTO);
        notificationRepository.save(notification);
        NotificationDTO savedNotificationDTO = notificationMapper.toNotificationDTO(notification);
        return ApiResponse.success(savedNotificationDTO, "Notification sent successfully", HttpStatus.CREATED.value());
    }

    /**
     * Retrieves all unread notifications for a given user by their email.
     * 
     * @param userEmail the email of the user whose unread notifications are to be retrieved
     * @return ApiResponse containing the list of unread notifications
     */
    @Override
    public ApiResponse<List<Notification>> getUnreadNotifications(String userEmail) {
        List<Notification> unreadNotifications = notificationRepository.findByUserEmailAndStatus(userEmail, NotificationStatus.UNREAD);
        return ApiResponse.success(unreadNotifications, "Unread notifications retrieved successfully", HttpStatus.OK.value());
    }

    /**
     * Marks a notification as read and returns the updated notification.
     * 
     * @param id the ID of the notification to be marked as read
     * @return ApiResponse containing the updated notification information or an error message if the notification is not found
     */
    @Override
    public ApiResponse<NotificationDTO> readNotification(Long id) {
        Optional<Notification> notificationOptional = notificationRepository.findById(id);
        if (notificationOptional.isEmpty()) {
            return ApiResponse.failure("No notification found", HttpStatus.NOT_FOUND.value());
        }
        Notification notification = notificationOptional.get();
        notification.setStatus(NotificationStatus.READ);
        notificationRepository.save(notification);
        NotificationDTO notificationDTO = notificationMapper.toNotificationDTO(notification);
        return ApiResponse.success(notificationDTO, "Notification marked as read", HttpStatus.OK.value());
    }
}