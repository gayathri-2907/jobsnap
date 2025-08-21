package com.endava.jobsnap.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.endava.jobsnap.dto.NotificationStatus;
import com.endava.jobsnap.entities.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long>{
	public List<Notification> findByUserEmailAndStatus(String userEmail,NotificationStatus status);
}
