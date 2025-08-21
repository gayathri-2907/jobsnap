package com.endava.jobsnap.mapper;

import org.springframework.stereotype.Component;

import com.endava.jobsnap.dto.UserDTO;
import com.endava.jobsnap.entities.Profile;
import com.endava.jobsnap.entities.User;

@Component
public class UserMapper {

	public User toUser(UserDTO dto) {
		Profile profile=new Profile();
		profile.setProfileId(dto.getProfileId());
		profile.setName(dto.getUserName());
		return User.builder()
				.userId(dto.getUserId())
				.userName(dto.getUserName())
				.userEmail(dto.getUserEmail())
				.userPassword(dto.getUserPassword())
				.accountType(dto.getAccountType())
				.profile(profile)
				.build();
	}
	
	public UserDTO toUserDTO(User user) {
		return UserDTO.builder()
				.userId(user.getUserId())
				.userName(user.getUserName())
				.userEmail(user.getUserEmail())
				.userPassword(user.getUserPassword())
				.accountType(user.getAccountType())
				.profileId(user.getProfile().getProfileId())
				.build();
	}
}
