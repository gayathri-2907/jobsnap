package com.endava.jobsnap.entities;

import java.util.List;

import com.endava.jobsnap.dto.Certification;
import com.endava.jobsnap.dto.Experience;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
@Table(name="profile")
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "profileId")
    private Long profileId;
    private String name;
    @Column(unique = true, nullable = false)
    private String email;
    private String jobTitle;
    private String company;
    private String location;
    private String about;
    private byte[] profilePicture;
    private String totalExperience;
    private List<String> skills;
    @ElementCollection
    private List<Certification> certifications;
    @ElementCollection
    private List<Experience> experiences;
    private List<Long> savedJobs;
    

}
