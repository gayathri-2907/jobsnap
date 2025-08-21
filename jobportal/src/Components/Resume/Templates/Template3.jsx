import { Container, Paper } from "@mui/material";
import React from "react";
import "../../../Styles/MyResumes.css";
import TemplateHeader from "../../../CommonComponents/ResumeHeader/TemplateHeader";
import TemplateHeading from "../../../CommonComponents/ResumeHeader/TemplateHeading";
import TemplateOneExperienceComponent from "../Experience/TemplateOneExperienceComponent";
import TemplateEducationComponent from "../Education/TemplateEducationComponent";
import TemplateKeySkillComponent from "../KeySkills/TemplateKeySkillComponent";
import TemplateProjectComponent from "../Project/TemplateProjectComponent";
import TemplateCertificationComponent from "../Certification/TemplateCertificationComponent";
import TemplateAchievementComponent from "../Achievements/TemplateAchivementComponent";

const Template3 = (props) => {
  const personalinfo = props.personalinfo || [];
  const workexperience = props.workexperience || [];
  let educationinfo = props.educationinfo || [];
  const skills = props.skills || [];
  const projects = props.projects || [];
  const certifications = props.certifications || [];
  const achievements = props.achievements || [];

  return (
    <Paper
sx={{
        width: {
          xs: "350px",
          sm: "400px",
          md: "450px",
          lg: "500px",
          xl: "550px",
        },
        height: {
          xs: "650px",
          sm: "700px",
          md: "750px",
          lg: "800px",
          xl: "900px",
        },
      }}
      id={`${props.index}report`}
      elevation={3}>
      <TemplateHeader
        primaryColor={"white"}
        secondaryColor={"white"} 
        bgColor={"#192b37"}
        personalInfo={personalinfo}
        workExperience={workexperience}
        educationinfo={educationinfo}
      />
      <Container>
        <TemplateHeading color={"orange"} title={"Professional Experience"} />
        <ul style={{ marginBottom: 10 }}>
          {workexperience.map((experience, index) => (
            <TemplateOneExperienceComponent key={index} experience={experience} />
          ))}
        </ul>
        <TemplateHeading color={"orange"} title={"Education"} />    
        <TemplateEducationComponent education={educationinfo} />
        <TemplateHeading color={"orange"} title={"Key Skills"} />
        <ul style={{ marginBottom: 10, display: "flex" }}>
          {skills.map((skill, index) => (
            <TemplateKeySkillComponent key={index} skill={skill} />
          ))}
        </ul>
        <TemplateHeading color={"orange"} title={"Projects"} />
        <ul style={{ marginBottom: 10, display: "flex", gap: "1rem" }}>
          {projects.map((project, index) => (
            <TemplateProjectComponent key={index} project={project} />
          ))}
        </ul>
        <TemplateHeading color={"orange"} title={"Certifications"} />
        <ul style={{ marginBottom: 10, display: "flex", gap: "1rem" }}>
          {certifications.map((certification, index) => (
            <TemplateCertificationComponent key={index} certification={certification} />
          ))}
        </ul>
        <TemplateHeading color={"orange"} title={"Achievements"} />
        <ul style={{ marginBottom: 10 }}>
          {achievements.map((achievement, index) => (
            <TemplateAchievementComponent key={index} achievement={achievement} />
          ))}
        </ul>
      </Container>
    </Paper>
  );
};

export default Template3;
