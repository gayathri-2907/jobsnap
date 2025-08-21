import React from "react";
import { formatDate } from "../../Services/Utilities";

export default function CertificateCard(props) {
  const defaultImage = '/Assests/images/CompanyImage.jpg'; 

  const companyImage = `/Assests/Companies/${props.issuer}.png`;
  return (
    <div className="d-flex justify-content-between  gap-2">
      <div className="d-flex justify-content-between gap-2 m-2">
        <div>
          <img
            style={{ width: "50px", height: "50px" }}
            src={companyImage}
             onError={(e)=>e.target.src=defaultImage}
            alt={props.issuer}
          ></img>
        </div>
        <div>
          <div className="fw-semibold ">{props.title}</div>
          <div>Issued By: {props.issuer}</div>
        </div>
        
      </div>
      <div className="d-flex flex-column align-items-end">
              <div > Issued on {formatDate(props.issueDate)}</div>
              <div className="fw-semibold">{props.certificateID}</div>
              </div>
    </div>
  );
}
