package com.endava.jobsnap.service.impl;

import com.endava.jobsnap.dto.NotificationDTO;
import com.endava.jobsnap.dto.NotificationStatus;
import com.endava.jobsnap.entities.Notification;
import com.endava.jobsnap.mapper.NotificationMapper;
import com.endava.jobsnap.repositories.NotificationRepository;
import com.endava.jobsnap.response.ApiResponse;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class NotificationServiceImplTest {

    @InjectMocks
    private NotificationServiceImpl notificationService;

    @Mock
    private NotificationRepository notificationRepository;

    @Mock
    private NotificationMapper notificationMapper;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void sendNotification_Success() {
        // Given
        NotificationDTO notificationDTO = new NotificationDTO();
        notificationDTO.setUserEmail("user@endava.com");
        notificationDTO.setMessage("New Job Posted");
        notificationDTO.setAction("VIEW");
        notificationDTO.setRoute("/jobs/1");

        Notification notification = new Notification();
        when(notificationMapper.toNotification(any(NotificationDTO.class))).thenReturn(notification);
        when(notificationRepository.save(any(Notification.class))).thenReturn(notification);
        when(notificationMapper.toNotificationDTO(any(Notification.class))).thenReturn(notificationDTO);

        // When
        ApiResponse<NotificationDTO> response = notificationService.sendNotification(notificationDTO);

        // Then
        assertEquals(201, response.getStatusCode());
        assertEquals("Notification sent successfully", response.getMessage());
        assertNotNull(response.getData());
        verify(notificationRepository, times(1)).save(any(Notification.class));
    }

    @Test
    void getUnreadNotifications_Success() {
        // Given
        Notification notification = new Notification();
        notification.setId(1L);
        notification.setUserEmail("user@endava.com");
        notification.setMessage("New Job Available");
        notification.setStatus(NotificationStatus.UNREAD);

        List<Notification> notifications = Collections.singletonList(notification);
        when(notificationRepository.findByUserEmailAndStatus("user@endava.com", NotificationStatus.UNREAD)).thenReturn(notifications);

        // When
        ApiResponse<List<Notification>> response = notificationService.getUnreadNotifications("user@endava.com");

        // Then
        assertEquals(200, response.getStatusCode());
        assertEquals("Unread notifications retrieved successfully", response.getMessage());
        assertEquals(1, response.getData().size());
        verify(notificationRepository, times(1)).findByUserEmailAndStatus("user@endava.com", NotificationStatus.UNREAD);
    }

    @Test
    void readNotification_NotificationFound() {
        // Given
        Notification notification = new Notification();
        notification.setId(1L);
        notification.setStatus(NotificationStatus.UNREAD);

        NotificationDTO notificationDTO = new NotificationDTO();
        notificationDTO.setId(1L);
        notificationDTO.setStatus(NotificationStatus.READ);

        when(notificationRepository.findById(1L)).thenReturn(Optional.of(notification));
        when(notificationRepository.save(any(Notification.class))).thenReturn(notification);
        when(notificationMapper.toNotificationDTO(any(Notification.class))).thenReturn(notificationDTO);

        // When
        ApiResponse<NotificationDTO> response = notificationService.readNotification(1L);

        // Then
        assertEquals(200, response.getStatusCode());
        assertEquals("Notification marked as read", response.getMessage());
        assertEquals(NotificationStatus.READ, response.getData().getStatus());
        verify(notificationRepository, times(1)).save(notification);
    }

    @Test
    void readNotification_NotificationNotFound() {
        // Given
        when(notificationRepository.findById(1L)).thenReturn(Optional.empty());

        // When
        ApiResponse<NotificationDTO> response = notificationService.readNotification(1L);

        // Then
        assertEquals(404, response.getStatusCode());
        assertEquals("No notification found", response.getMessage());
        verify(notificationRepository, never()).save(any(Notification.class));
    }
}
