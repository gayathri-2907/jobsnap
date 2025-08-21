import * as actionTypes from "./actionTypes";

export const selectTemplate = (id) => ({
  type: actionTypes.SELECTTEMPLATE,
  payload: id,
});

export const selectResume = (id) => ({
  type: actionTypes.SELECTRESUME,
  payload: id,
});

export const addPersonalInfo = (details) => ({
  type: actionTypes.ADDPERSONALINFO,
  payload: details,
});

export const addExperience = (experience) => ({
  type: actionTypes.ADDEXPERIENCE,
  payload: experience,
});

export const addAllExperience = (experiences) => ({
  type: actionTypes.ADDALLEXPERIENCE,
  payload: experiences,
});
export const removeExperience = (experience) => ({
  type: actionTypes.REMOVEEXPERIENCE,
  payload: experience,
})

export const addNewSkills = () => ({
  type: actionTypes.ADDNEWSKILLS,
  payload: null,
});

export const editSkill = (skills) => ({
  type: actionTypes.EDITSKILL,
  payload: skills,
});

export const deleteSkill = (id) => ({
  type: actionTypes.DELETESKILL,
  payload: id,
});

export const addEducation = (details) => ({
  type: actionTypes.ADDEDUCATION,
  payload: details,
});

export const addAllEducation = (educationInfos) => ({
  type: actionTypes.ADDALLEDUCATION,
  payload: educationInfos,
});

// New actions for Projects, Certifications, and Achievements
export const addProject = (project) => ({
  type: actionTypes.ADDPROJECT,
  payload: project,
});

export const addAllProjects = (projects) => ({
  type: actionTypes.ADDALLPROJECTS,
  payload: projects,
});


export const addCertification = (certification) => ({
  type: actionTypes.ADDCERTIFICATION,
  payload: certification,
});

export const addAllCertifications = (certifications) => ({
  type: actionTypes.ADDALLCERTIFICATIONS,
  payload: certifications,
});

export const addAchievement = (achievement) => ({
  type: actionTypes.ADDACHIEVEMENT,
  payload: achievement,
});

export const addAllAchievements = (achievements) => ({
  type: actionTypes.ADDALLACHIEVEMENTS,
  payload: achievements,
});

// export const editAchievement = (achievements) => ({
//   type: actionTypes.EDITACHIEVEMENT,
//   payload: achievements,
// });

// export const deleteAchievement = (id) => ({
//   type: actionTypes.DELETEACHIEVEMENT,
//   payload: id,
// });
