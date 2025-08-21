package com.endava.jobsnap.mapper;
//
//import org.springframework.stereotype.Component;
//
//import com.endava.jobsnap.dto.NotificationDTO;
//import com.endava.jobsnap.entities.Notification;
//
//@Component
//public class NotificationMapper {
// 
//	public Notification toNotification(NotificationDTO dto) {
//		return Notification.builder()
//				.id(dto.getId())
//				.userEmail(dto.getUserEmail())
//				.message(dto.getMessage())
//				.action(dto.getAction())
//				.route(dto.getRoute())
//				.status(dto.getStatus())
//				.timestamp(dto.getTimestamp())
//				.build();
//	}
//	
//	public NotificationDTO toNotificationDTO(Notification notification) {
//		return NotificationDTO.builder()
////				.userId(notification.getUserId())
//				.id(notification.getId())
//				.userEmail(notification.getUserEmail())
//				.message(notification.getMessage())
//				.action(notification.getAction())
//				.route(notification.getRoute())
//				.status(notification.getStatus())
//				.timestamp(notification.getTimestamp())
//				.build();
//	}
//}

import org.springframework.stereotype.Component;

import com.endava.jobsnap.dto.NotificationDTO;
import com.endava.jobsnap.entities.Notification;

@Component
public class NotificationMapper {

    public Notification toNotification(NotificationDTO dto) {
        if (dto == null) {
            return null;  // Return null if the input is null
        }
        return Notification.builder()
                .id(dto.getId())
                .userEmail(dto.getUserEmail())
                .message(dto.getMessage())
                .action(dto.getAction())
                .route(dto.getRoute())
                .status(dto.getStatus())
                .timestamp(dto.getTimestamp())
                .build();
    }

    public NotificationDTO toNotificationDTO(Notification notification) {
        if (notification == null) {
            return null;  // Return null if the input is null
        }
        return NotificationDTO.builder()
                .id(notification.getId())
                .userEmail(notification.getUserEmail())
                .message(notification.getMessage())
                .action(notification.getAction())
                .route(notification.getRoute())
                .status(notification.getStatus())
                .timestamp(notification.getTimestamp())
                .build();
    }
}

