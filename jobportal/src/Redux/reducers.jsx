import * as actionTypes from "./actionTypes";

const initialSelectedTemplateState = {
  selectedTemplateId: null,
  selectedResumeId: null,
};

const initialPersonalInfoState = {
  personalInfo: {
    profileImg: "",
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    objective: "",
  },
};

const initialWorkExperienceState = {
  experiences: [
    {
      id: 1,
      jobTitle: "",
      organizationName: "",
      startYear: "",
      endYear: "",
    },
  ],
};

const initialEducationState = {
  // educationInfo: {
  //   domain: "",
  //   university: "",
  //   degree: "",
  //   startYear: "",
  //   endYear: "",
  // },
  educationInfo: [
    {
      id:1,
    domain: "",
    university: "",
    degree: "",
    startYear: "",
    endYear: "",
    }
],
};

const initialSkillsState = {
  skills: ["", "", ""],
};

const initialProjectsState = {
  projects: [
    {
      id: 1,
      projectName: "",
      techStack: "",
      description: "",
    },
  ],
};

const initialCertificationsState = {
  certifications: [
    {
      id: 1,
      name: "",
      issuingOrganization: "",
      issueDate: "",
    },
  ],
};

const initialAchievementsState = {
  achievements: [
    {
      id: 1,
      title: "",
      date: "",
    },
  ],
};

export const selectedTemplateReducer = (
  state = initialSelectedTemplateState,
  action
) => {
  switch (action.type) {
    case actionTypes.SELECTTEMPLATE:
      return { ...state, selectedTemplateId: action.payload };
      case actionTypes.SELECTRESUME:
      return { ...state, selectedResumeId: action.payload };
      default:
      return state;
  }
};

export const personalInfoReducer = (
  state = initialPersonalInfoState,
  action
) => {
  switch (action.type) {
    case actionTypes.ADDPERSONALINFO:
      return {
        ...state,
        personalInfo: { ...state.personalInfo, ...action.payload },
      };
    default:
      return state;
  }
};

export const workExperienceReducer = (
  state = initialWorkExperienceState,
  action
) => {
  switch (action.type) {
    case actionTypes.ADDEXPERIENCE:
      return {
        ...state,
        experiences: [...state.experiences, action.payload],
      };
    case actionTypes.ADDALLEXPERIENCE:
      return {
        ...state,
        experiences: action.payload,
      };
    default:
      return state;
  }
};

export const keySkillsReducer = (state = initialSkillsState, action) => {
  switch (action.type) {
    case actionTypes.ADDNEWSKILLS:
      return { ...state, skills: [...state.skills, ""] };
    case actionTypes.EDITSKILL: {
      return {
        ...state,
        skills: action.payload,
      };
    }
    case actionTypes.DELETESKILL: {
      const newSkills = state.skills.filter(
        (skill, id) => id !== action.payload
      );

      return { ...state, skills: newSkills };
    }
    default:
      return state;
  }
};

// export const educationDetailsReducer = (
//   state = initialEducationState,
//   action
// ) => {
//   switch (action.type) {
//     case actionTypes.ADDEDUCATION:
//       return { ...state, educationInfo: action.payload };
//       case actionTypes.ADDALLEDUCATION:
//         return { 
//           ...state, 
//           educationInfo:action.payload
//          };
//     default:
//       return state;
//   }
// };

export const educationDetailsReducer = (
  state = initialEducationState,
  action
) => {
  switch (action.type) {
    case actionTypes.ADDEDUCATION:
      return { ...state, educationInfo: action.payload };
    default:
      return state;
  }
};


export const projectsReducer = (
  state = initialProjectsState,
   action) => {
  switch (action.type) {
    case actionTypes.ADDPROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    case actionTypes.ADDALLPROJECTS:
      return {
        ...state,
        projects: action.payload,
      };
    default:
      return state;
  }
};

export const certificationsReducer = (state = initialCertificationsState, action) => {
  switch (action.type) {
    case actionTypes.ADDCERTIFICATION:
      return {
        ...state,
        certifications: [...state.certifications, action.payload],
      };
    case actionTypes.ADDALLCERTIFICATIONS:
      return {
        ...state,
        certifications: action.payload,
      };
    default:
      return state;
  }
};

export const achievementsReducer = (state = initialAchievementsState, action) => {
  switch (action.type) {
    case actionTypes.ADDACHIEVEMENT:
      return {
        ...state,
        achievements: [...state.achievements, action.payload],
      };
    case actionTypes.ADDALLACHIEVEMENTS:
      return {
        ...state,
        achievements: action.payload,
      };
    default:
      return state;
  }
};


