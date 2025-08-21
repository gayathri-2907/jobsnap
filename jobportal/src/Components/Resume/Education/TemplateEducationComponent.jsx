import React from "react";
import "./TemplateEducationComponent.css";

const TemplateEducationComponent = (props) => {
  const education = props.education; // No need for fallback if you're sure it's an object

  // Conditional render to prevent issues with empty or undefined props
  if (!education || Object.keys(education).length === 0) {
    return <h3 className="template-education-details">No education data available.</h3>;
  }

  return (
    <h3 className="template-education-details">
      {education.degree} in {education.domain}{" "}
      <span className="template-education-university">
        {education.university}
      </span>
      <span className="education-start-end">
        ({education.startYear} - {education.endYear})
      </span>
    </h3>
  );
};

export default TemplateEducationComponent;
