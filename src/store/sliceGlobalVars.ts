import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {IglobalVariables, Inotify } from "../types";

const initialState:IglobalVariables = {
    auth_token: localStorage.getItem("auth_token"),
    roomName:localStorage.getItem("roomName"),
    notifications:[]
}

export const globalSlice = createSlice({
    name:"globalVariables",
    initialState:initialState,
    reducers:{
        setToken:(state,payload:PayloadAction<string>) => {
            state.auth_token = payload.payload
            localStorage.setItem("auth_token",payload.payload)
        },
        setRoomName:(state,payload:PayloadAction<string>) => {
            state.roomName = payload.payload
            localStorage.setItem("roomName",payload.payload)
        },
        unsetToken:(state) => {
            state.auth_token = null
            localStorage.removeItem("auth_token")
        },
        unSetRoomName:(state) => {
            state.roomName = null
            localStorage.removeItem("roomName")
        },
        addNotifications:(state,payload:PayloadAction<Inotify>)=>{
            state.notifications.push({
                type:payload.payload.type,
                message:payload.payload.message,
                uuid:payload.payload.uuid
            })
        },
        deleteNotifications:(state,payload:PayloadAction<string>) => {
            state.notifications = state.notifications.filter((elem)=> elem.uuid != payload.payload)
        }
    }
})
export const {setRoomName,setToken,unSetRoomName,unsetToken,addNotifications,deleteNotifications} = globalSlice.actions
export default globalSlice.reducer