package com.endava.jobsnap.repositories;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.endava.jobsnap.entities.OTP;

public interface OTPRepository extends JpaRepository<OTP, String> {
	List<OTP> findByCreationTimeBefore(LocalDateTime expiry);
}
