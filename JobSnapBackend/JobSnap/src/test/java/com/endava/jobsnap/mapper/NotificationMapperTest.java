package com.endava.jobsnap.mapper;

import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDateTime;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.endava.jobsnap.dto.NotificationDTO;
import com.endava.jobsnap.entities.Notification;
import com.endava.jobsnap.dto.NotificationStatus;

class NotificationMapperTest {

    private NotificationMapper notificationMapper;
    private NotificationDTO notificationDTO;
    private Notification notification;

    @BeforeEach
    void setUp() {
        notificationMapper = new NotificationMapper();

        // Prepare a NotificationDTO object for testing
        notificationDTO = NotificationDTO.builder()
                .id(1L)
                .userEmail("user@example.com")
                .message("This is a test message")
                .action("VIEW")
                .route("/notification/1")
                .status(NotificationStatus.READ)
                .timestamp(LocalDateTime.now())
                .build();

        // Prepare a Notification object for testing
        notification = Notification.builder()
                .id(1L)
                .userEmail("user@example.com")
                .message("This is a test message")
                .action("VIEW")
                .route("/notification/1")
                .status(NotificationStatus.READ)
                .timestamp(LocalDateTime.now())
                .build();
    }

    // Test case 1: Valid NotificationDTO to Notification mapping
    @Test
    void testToNotification() {
        Notification mappedNotification = notificationMapper.toNotification(notificationDTO);

        assertNotNull(mappedNotification);
        assertEquals(notificationDTO.getId(), mappedNotification.getId());
        assertEquals(notificationDTO.getUserEmail(), mappedNotification.getUserEmail());
        assertEquals(notificationDTO.getMessage(), mappedNotification.getMessage());
        assertEquals(notificationDTO.getAction(), mappedNotification.getAction());
        assertEquals(notificationDTO.getRoute(), mappedNotification.getRoute());
        assertEquals(notificationDTO.getStatus(), mappedNotification.getStatus());
        assertEquals(notificationDTO.getTimestamp(), mappedNotification.getTimestamp());
    }

    // Test case 2: Valid Notification to NotificationDTO mapping
    @Test
    void testToNotificationDTO() {
        NotificationDTO mappedNotificationDTO = notificationMapper.toNotificationDTO(notification);

        assertNotNull(mappedNotificationDTO);
        assertEquals(notification.getId(), mappedNotificationDTO.getId());
        assertEquals(notification.getUserEmail(), mappedNotificationDTO.getUserEmail());
        assertEquals(notification.getMessage(), mappedNotificationDTO.getMessage());
        assertEquals(notification.getAction(), mappedNotificationDTO.getAction());
        assertEquals(notification.getRoute(), mappedNotificationDTO.getRoute());
        assertEquals(notification.getStatus(), mappedNotificationDTO.getStatus());
        assertEquals(notification.getTimestamp(), mappedNotificationDTO.getTimestamp());
    }

    // Test case 3: Mapping with null fields in NotificationDTO
    @Test
    void testToNotificationWithNullFields() {
        NotificationDTO dtoWithNullFields = NotificationDTO.builder()
                .id(1L)
                .userEmail(null)
                .message(null)
                .action(null)
                .route(null)
                .status(null)
                .timestamp(null)
                .build();

        Notification mappedNotification = notificationMapper.toNotification(dtoWithNullFields);

        assertNotNull(mappedNotification);
        assertNull(mappedNotification.getUserEmail());
        assertNull(mappedNotification.getMessage());
        assertNull(mappedNotification.getAction());
        assertNull(mappedNotification.getRoute());
        assertNull(mappedNotification.getStatus());
        assertNull(mappedNotification.getTimestamp());
    }

    // Test case 4: Mapping with null fields in Notification entity
    @Test
    void testToNotificationDTOWithNullFields() {
        Notification notificationWithNullFields = Notification.builder()
                .id(1L)
                .userEmail(null)
                .message(null)
                .action(null)
                .route(null)
                .status(null)
                .timestamp(null)
                .build();

        NotificationDTO mappedNotificationDTO = notificationMapper.toNotificationDTO(notificationWithNullFields);

        assertNotNull(mappedNotificationDTO);
        assertNull(mappedNotificationDTO.getUserEmail());
        assertNull(mappedNotificationDTO.getMessage());
        assertNull(mappedNotificationDTO.getAction());
        assertNull(mappedNotificationDTO.getRoute());
        assertNull(mappedNotificationDTO.getStatus());
        assertNull(mappedNotificationDTO.getTimestamp());
    }

    // Test case 5: Mapping when the NotificationDTO or Notification is null
    @Test
    void testToNotificationWithNullDTO() {
        NotificationDTO nullDTO = null;

        Notification mappedNotification = notificationMapper.toNotification(nullDTO);

        assertNull(mappedNotification);
    }

    @Test
    void testToNotificationDTOWithNullNotification() {
        Notification nullNotification = null;

        NotificationDTO mappedNotificationDTO = notificationMapper.toNotificationDTO(nullNotification);

        assertNull(mappedNotificationDTO);
    }

    // Test case 6: Test the builder for NotificationDTO to ensure fields are correctly mapped
    @Test
    void testBuilderNotificationDTO() {
        NotificationDTO notificationDTO = NotificationDTO.builder()
                .id(2L)
                .userEmail("testuser@example.com")
                .message("New test message")
                .action("CLICK")
                .route("/notification/2")
                .status(NotificationStatus.UNREAD)
                .timestamp(LocalDateTime.now())
                .build();

        assertNotNull(notificationDTO);
        assertEquals(2L, notificationDTO.getId());
        assertEquals("testuser@example.com", notificationDTO.getUserEmail());
        assertEquals("New test message", notificationDTO.getMessage());
        assertEquals("CLICK", notificationDTO.getAction());
        assertEquals("/notification/2", notificationDTO.getRoute());
        assertEquals(NotificationStatus.UNREAD, notificationDTO.getStatus());
    }
}
