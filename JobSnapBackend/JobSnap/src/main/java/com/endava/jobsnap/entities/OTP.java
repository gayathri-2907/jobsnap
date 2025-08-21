package com.endava.jobsnap.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "otp")
public class OTP {

    @Id
    @Email(message = "{user.email.invalid}")
    private String userEmail;

    @Pattern(regexp = "^\\d{6}$", message = "{otp.invalid}")
    private String otpcode;

    private LocalDateTime creationTime;
}
