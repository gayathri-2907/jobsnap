package com.endava.jobsnap.jwt;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.endava.jobsnap.dto.AccountType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomUserDetails implements UserDetails{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long userId;
private String username;
private String user_name;
private String Password;
private Long profileId;
private AccountType accountType;
private Collection<?extends GrantedAuthority>authorities;

}
