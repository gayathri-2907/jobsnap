package com.endava.jobsnap.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
	private Long userId;
	
	@NotBlank(message = "{user.name.null}")
	private String userName;
	
	@NotBlank(message = "{user.email.null}")
	@Email(message = "{user.email.invalid}")
	private String userEmail;
	
	@NotBlank(message = "{user.password.invalid}")
	@Pattern(regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$", message = "{user.password.invalid}")
	private String userPassword;
	
	private AccountType accountType;
	
	private Long profileId;
	
	public LoginDTO toLoginDTO() {
        return new LoginDTO(this.userEmail, this.userPassword);
    }
}
