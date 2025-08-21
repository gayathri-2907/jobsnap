import { createSlice } from "@reduxjs/toolkit";
import { updateProfile } from "../Services/ProfileService";
import { getItem, setItem } from "../Services/LocalStorageServices";

 export const ProfileSlice=createSlice({
    name:"profile",
    initialState:getItem("profile"),
    reducers:{
        changeProfile:(state,action) =>{
            state=updateProfile(action.payload);
            return {
                ...state,
            ...action.payload,
            }
        },
        setProfile:(state,action) => {
            setItem("profile",action.payload);
            state=getItem("profile");
            return state;
        }
    }
})

export const {changeProfile, setProfile } = ProfileSlice.actions;
export default ProfileSlice.reducer;