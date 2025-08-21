package com.endava.jobsnap.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.endava.jobsnap.entities.Applicant;

public interface ApplicantRepository extends JpaRepository<Applicant, Long> {

}
