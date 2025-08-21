import React from "react";
import { formatDate } from "../../Services/Utilities";

export default function ExperienceCard(props) {

  const defaultImage = '/Assests/images/CompanyImage.jpg'; 

  const companyImage = `/Assests/Icons/${props.company}.png`;
  return (
    <div className="ExperienceCard">
      <div className="d-flex justify-content-between ">
        <div className="d-flex ">
          <div className="m-1 me-2">
            <img
              style={{ width: "90px", height: "50px" }}
              src={companyImage}
              onError={(e)=>e.target.src=defaultImage}
              alt={props.company}
            ></img>
          </div>
          <div>
            <div className="fw-semibold ">{props.title}</div>
            
            <div className=" ">
              {props.company} &#x2022;{props.location}
            </div>
          </div>
        </div>
        <div className="text-sm fw-semibold">{formatDate(props.startDate)}-{formatDate(props.endDate)}</div>
      </div>
      <div className="fw-100" style={{ textAlign: 'justify' }}>
        {props.description}
      </div>
    </div>
  );
}
