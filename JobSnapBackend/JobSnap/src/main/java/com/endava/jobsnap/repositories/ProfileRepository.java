package com.endava.jobsnap.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.endava.jobsnap.entities.Profile;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
	    Optional<Profile> findByEmail(String email);
}
