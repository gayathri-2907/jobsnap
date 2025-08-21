package com.endava.jobsnap.dto;

import java.time.LocalDateTime;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class Certification {
	
	private String title;
	private String issuer;
	private LocalDateTime issueDate;
	private String certificateID;
	
}
