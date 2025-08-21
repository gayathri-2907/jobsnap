import { createSlice } from "@reduxjs/toolkit";
//eslint-disable-next-line
import { getItem, removeItem, setItem } from "../Services/LocalStorageServices";


 export const UserSlice=createSlice({
    name:"user",
    initialState:getItem("user"),
    reducers:{
        setUser:(state,action) =>{
            setItem("user",action.payload);
            state=getItem("user");
            return state;
        },
        removeUser:(state) => {
           state.user=null;
        }
    }
})

export const {setUser, removeUser } = UserSlice.actions;
export default UserSlice.reducer;