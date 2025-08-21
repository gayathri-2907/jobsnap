import React from "react";
import "./Styles/Working.css";
import { Avatar } from "@mui/material";
import labels from '../../Labels/LandingPageLabel.json'

export default function Working() {
  return (
    <div className="mt-20 ">
      <div className="text-center fw-bold fs-2 p-3">
        {labels.workingLabels.howIt}<span className="text-warning"> {labels.workingLabels.works}</span>
      </div>
      <div className="text-lg mx-auto text-center w-1/2 fw-semibold">
        {labels.workingLabels.description}
      </div>
      <div className="working  justify-content-around align-items-center">
        <div className="girlimage">
          <img
            className='"w-[30rem]'
            src="/Assests/Working/girlworking.png"
            alt="girl"
          ></img>
          <div className=" align-items-center working-overlay-box">
            <Avatar src='/Assests/images/avatar.png' alt="working-user" size={40} />
            <div className="fw-bold">{labels.workingLabels.profileComplete}</div>
            <div className="text-xs">{labels.workingLabels.completion}</div>
          </div>
        </div>

        {/* working fields on right-side */}
        <div className="m-4">
          { labels.workingLabels.work.map((work, index) => (
            <div
              key={index}
              className="align-items-center gap-5 working-fields"
            >
              <div className="outer-container-image">
                <img
                  className="ResumeImage"
                  src={`/Assests/Working/${work.name}.png`}
                  alt={work.name}
                ></img>
              </div>
              <div>
                <div className="text-xl fw-bold">{work.name}</div>
                <div>{work.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
