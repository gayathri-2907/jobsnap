package com.endava.jobsnap.service;

import java.util.List;

import com.endava.jobsnap.dto.NotificationDTO;
import com.endava.jobsnap.entities.Notification;
import com.endava.jobsnap.response.ApiResponse;

public interface NotificationService {
	
	public ApiResponse<NotificationDTO> sendNotification(NotificationDTO notificationDTO);
	
	public ApiResponse<List<Notification>> getUnreadNotifications(String userEmail);
 
	public ApiResponse<NotificationDTO> readNotification(Long id);

}

