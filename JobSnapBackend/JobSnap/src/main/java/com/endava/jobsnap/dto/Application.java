package com.endava.jobsnap.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Application {
	private Long id;
	private Long applicantId;
	private LocalDateTime interviewTime;
	private String email;
	private ApplicationStatus applicationStatus;
}
