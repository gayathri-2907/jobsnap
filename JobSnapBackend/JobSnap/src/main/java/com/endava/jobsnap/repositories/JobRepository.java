package com.endava.jobsnap.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.endava.jobsnap.entities.Job;

public interface JobRepository extends JpaRepository<Job, Long> {
	
	public List<Job> findByPostedBy(String postedBy);
}
