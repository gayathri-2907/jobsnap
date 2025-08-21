package com.endava.jobsnap.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.endava.jobsnap.dto.AccountType;
import com.endava.jobsnap.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	public Optional<User> findByuserEmail(String userEmail);

	public List<User> findByAccountType(AccountType applicant);
}
