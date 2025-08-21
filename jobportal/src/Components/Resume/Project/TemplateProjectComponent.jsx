import React from "react";

const TemplateProjectComponent = ({ project }) => {
  if (!project) {
    return <p>Invalid project data.</p>;
  }

  return (
    <li className="template-project-comp">
      <h4 className="project-name">{project.projectName}</h4>
      <p className="project-tech-stack">
        <strong>Tech Stack:</strong> {project.techStack}
      </p>
      <p className="project-description">{project.description}</p>
    </li>
  );
};

export default TemplateProjectComponent;
