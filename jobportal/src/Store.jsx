import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/UserSlice";
import profileReducer from './Slices/ProfileSlice';
import filterReducer from './Slices/FilterSlice';
import sortReducer from './Slices/SortSlice';
import jwtReducer from './Slices/JWTSlice';
import {
  selectedTemplateReducer,
  personalInfoReducer,
  workExperienceReducer,
  keySkillsReducer,
  educationDetailsReducer,
  projectsReducer,
  certificationsReducer,
  achievementsReducer,
} from "./Redux/reducers";

const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    filter: filterReducer,
    sort: sortReducer,
    jwt: jwtReducer,
    selectedTemplate: selectedTemplateReducer,
    personalInfo: personalInfoReducer,
    workExperience: workExperienceReducer,
    keySkills: keySkillsReducer,
    educationDetails: educationDetailsReducer,
    projects: projectsReducer,
    certifications: certificationsReducer,
    achievements: achievementsReducer,
  },
});

export default store;
