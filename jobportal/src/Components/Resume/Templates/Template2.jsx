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

const Template2 = (props) => {
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
        bgColor={"#9B536F"}
        personalInfo={personalinfo}
        workExperience={workexperience}
        educationinfo={educationinfo}
      />
      <Container>
        <TemplateHeading color={"#9B536F"} title={"Professional Experience"} />
        <ul style={{ marginBottom: 10 }}>
          {workexperience.map((experience, index) => (
            <TemplateOneExperienceComponent key={index} experience={experience} />
          ))}
        </ul>
        <TemplateHeading color={"#C98A55"} title={"Education"} />    
        <TemplateEducationComponent education={educationinfo} />
        <TemplateHeading color={"#9B536F"} title={"Key Skills"} />
        <ul style={{ marginBottom: 10 }}>
          {skills.map((skill, index) => (
            <TemplateKeySkillComponent key={index} skill={skill} />
          ))}
        </ul>
        <TemplateHeading color={"#9B536F"} title={"Projects"} />
        <ul style={{ marginBottom: 10 }}>
          {projects.map((project, index) => (
            <TemplateProjectComponent key={index} project={project} />
          ))}
        </ul>
        <TemplateHeading color={"#9B536F"} title={"Certifications"} />
        <ul style={{ marginBottom: 10 }}>
          {certifications.map((certification, index) => (
            <TemplateCertificationComponent key={index} certification={certification} />
          ))}
        </ul>
        <TemplateHeading color={"#9B536F"} title={"Achievements"} />
        <ul style={{ marginBottom: 10 }}>
          {achievements.map((achievement, index) => (
            <TemplateAchievementComponent key={index} achievement={achievement} />
          ))}
        </ul>
      </Container>
    </Paper>
  );
};

export default Template2;
