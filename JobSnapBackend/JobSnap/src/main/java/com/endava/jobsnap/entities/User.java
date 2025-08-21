package com.endava.jobsnap.entities;

import com.endava.jobsnap.dto.AccountType;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_id",nullable = false)
private Long userId;
private String userName;

@Column(name = "user_email",unique = true)
private String userEmail;
private String userPassword;
@Enumerated(EnumType.STRING)
private AccountType accountType;

@OneToOne(cascade = CascadeType.ALL)
@JoinColumn(name="profile_id",referencedColumnName = "profileId")
private Profile profile;
}
