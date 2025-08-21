import React, { useState } from "react";
import DetailsFillingSidebar from "../Components/Resume/Sidebar/DetailsFillingSidebar";
import EducationComponent from "../Components/Resume/Education/EducationComponent";
import KeySkillsComponent from "../Components/Resume/KeySkills/KeySkillsComponent";
import PersonalInfoComponent from "../Components/Resume/PersonalInfo/PersonalInfoComponent";
import PreviewComponent from "../Components/Resume/Preview/PreviewComponent";
import WorkExperienceComponent from "../Components/Resume/Experience/WorkExperienceComponent";
import ProjectsComponent from "../Components/Resume/Project/ProjectsComponent";
import CertificationsComponent from "../Components/Resume/Certification/CertificationsComponent";
import '../Styles/MyResumes.css'

import AchivementsComponent from "../Components/Resume/Achievements/AchivementsComponent";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const DetailsFilling = (props) => {
  const [tab, setTab] = useState(0);
  const navigate=useNavigate();

  return (
    <div className="details-filling w-100">
      <Button variant="filled"  className="m-1" color="#faa550" onClick={()=>navigate("/resume")}>Back</Button>
      {
        tab===7 ? null:(
          <div className="details-filling-cont">
        <DetailsFillingSidebar tab={tab} setTab={setTab} />
        {tab === 0 ? (<PersonalInfoComponent setTab={setTab} tab={tab} />) : null}
        {tab === 1 ? (<WorkExperienceComponent setTab={setTab} tab={tab} />) : null}
        {tab === 2 ? (<EducationComponent setTab={setTab} tab={tab} />) : null}
        {tab === 3 ? (<KeySkillsComponent setTab={setTab} tab={tab} />) : null}
        {tab === 4 ? (<ProjectsComponent setTab={setTab} tab={tab} />) : null}
        {tab === 5 ? (<CertificationsComponent setTab={setTab} tab={tab} />) : null}
        {tab === 6 ?( <AchivementsComponent setTab={setTab} tab={tab} /> ): null}
       </div> )
      }
        {tab === 7 ? <PreviewComponent setTab={setTab} tab={tab} /> : null}
      </div>
  );
};

export default DetailsFilling;
