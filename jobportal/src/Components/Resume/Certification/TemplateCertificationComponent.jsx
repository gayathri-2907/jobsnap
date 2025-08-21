import React from "react";
import './TemplateCertification.css'
const TemplateCertificationComponent = (props) => {
  return (
    <li>
      <h4>{props.certification.name}</h4>
      <p><strong>Issued by:</strong> {props.certification.issuingOrganization}</p>
    </li>
  );
};

export default TemplateCertificationComponent;
