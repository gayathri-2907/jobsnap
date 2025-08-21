import React from "react";
import "./Styles/DreamJob.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaSearch } from "react-icons/fa";
import { AvatarGroup, Avatar } from "@mui/material";
import labels from '../../Labels/LandingPageLabel.json'

export default function DreamJob() {
  return (
    <div className="d-flex align-items-center px-4 m-4 mt-5 dream-job">
      {/* Left Section - Text Content */}
      <div className="d-flex flex-column headings">
        <h1 className="fw-bold">
          <span>{labels.dreamJobLabels.findYour}</span>
          <br />
          <span className="dream-job-text">{labels.dreamJobLabels.dreamJob}</span>
          {labels.dreamJobLabels.with}
          <br />
          <span>{labels.dreamJobLabels.us}</span>
        </h1>
        <p>
          {labels.dreamJobLabels.goodLife}
        </p>
        <div className=" gap-2 d-flex align-items-start">
          <div className="input-container">
            <label className="fw-bold mb-1">{labels.dreamJobLabels.jobTitle}</label>
            <input placeholder={labels.dreamJobLabels.placeholderJobTitle} name="jobtitle" />
          </div>

          <div className="input-container">
            <label className="fw-bold mb-1"> {labels.dreamJobLabels.jobType} </label>
            <input placeholder={labels.dreamJobLabels.placeholderJobType} name="jobtype" />
          </div>
          <div className="search-icon d-flex align-items-center justify-content-center">
            <FaSearch />
          </div>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="flex-shrink-0 d-flex align-items-center justify-center">
        <div className="image">
          <img src="/Assests/images/HomeImage.png" alt="homeimage" />
          <div className="overlay-box">
            <div className="text-center">
            <div className="fw-bold">{labels.dreamJobLabels.gotJob}</div>
            <AvatarGroup max={4}>
              <Avatar src='/Assests/images/avatar1.png' alt="user1" size={40} />
              <Avatar src="/Assests/images/avatar.png" alt="user2" size={40} />
              <Avatar src='/images/avatar1.png' alt="user3" size={40} />
              <Avatar>+5</Avatar>
            </AvatarGroup>
            </div>
          </div>
          <div className="overlay-box-2">
            <div className="d-flex gap-2 align-items-center p-1 ">
              <div className="logo-container">
                <img src="/Assests/images/google.jpg" alt="company logo" className="img-fluid rounded-circle"/>
              </div>
              <div className="text-sm d-flex flex-column align-items-start">
                <div className="fw-bold">{labels.dreamJobLabels.role}</div>
                <div className="text-muted">{labels.dreamJobLabels.location}</div>
              </div>
            </div>
            <div className="d-flex gap-2 justify-content-around ">
              <span>{labels.dreamJobLabels.daysAgo}</span>
              <span>{labels.dreamJobLabels.applicants}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
