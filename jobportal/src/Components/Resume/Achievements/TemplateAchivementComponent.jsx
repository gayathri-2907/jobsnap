import React from "react";
import './TemplateAchievement.css'
const TemplateAchievementComponent = ({ achievement }) => {
  if (!achievement) {
    return <p>Invalid achievement data.</p>;
  }

  return (
    <li>
      <h4>{achievement.title}</h4>
      <p>{achievement.date}</p>
    </li>
  );
};

export default TemplateAchievementComponent;
