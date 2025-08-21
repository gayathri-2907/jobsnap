import { createSlice } from "@reduxjs/toolkit";
const JWTSlice=createSlice({
    name: "jwt",
    initialState:localStorage.getItem("token")||"",
    reducers: {
        setJwt:(state,action) =>{
            localStorage.setItem("token",action.payload);
            state=action.payload;
            return state;
        },
        removeJwt:(state) => {
            localStorage.removeItem("token");
            state="";
            return state;
        }
    }
    });
    export const {setJwt,removeJwt}=JWTSlice.actions;
    export default JWTSlice.reducer;