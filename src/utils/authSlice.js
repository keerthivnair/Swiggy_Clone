import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name:'authSlice',
    initialState: {
        userData : JSON.parse(localStorage.getItem("userData")) || null
    },
    reducers:{
        addUserData : (state,action)=>{
            state.userData = action.payload
            localStorage.setItem('userData',JSON.stringify(action.payload))
        },
        removeUserData : (state)=>{
            state.userData= null
            localStorage.removeItem('userData')
        }
    }
})

export const {addUserData,removeUserData} = authSlice.actions
export default authSlice.reducer