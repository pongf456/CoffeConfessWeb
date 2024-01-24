import axios, { AxiosError, AxiosResponse } from 'axios'
import { useGlobalVars } from '../store/useGlobalVars'
import { useNotifications } from '../store/useNotifications'
import { EnotifyTypes } from '../types'


export const useConfessAPI = () => {
    const {auth_token,logout} = useGlobalVars()
    const notifications = useNotifications()
    const api = axios.create({
        baseURL:"https://coofe-confess-api.onrender.com/api",
        headers:{
            auth_token:auth_token
        }
    })
    const  createRoom = async (roomName:string,roomPassword:string):Promise<AxiosResponse> => {
        try {
            const data = await api.post("/create/room",{
                roomName,
                roomPassword
            })
            return data
        }
        catch (error) {
            const e = error as AxiosError
            notifications.pushNotifications({ message:e.response?.data as string || "Error, intentalo más tarde" , type:EnotifyTypes.error})
            throw e
        }
    }
    const getRoomConfess = async (page = 1) => {
        try{
            const data = await api.get(`/get/confess/${page}`)
            return data.data
        }
        catch (error) {
            const e = error as AxiosError
            if(e.code == "400") logout()
            notifications.pushNotifications({message: e.response?.data as string || "Error, intentalo más tarde",type:EnotifyTypes.error})
            throw e
        }
    }
    const createConfess = async (confess:string,roomName:string) => {
        try {
            const data = await api.post("/create/confess",{
                confess,
                roomName
            })
            return data.data
        }
        catch (error){
            const e = error as AxiosError
            notifications.pushNotifications({message: e.response?.data as string || "Error, intentalo más tarde",type:EnotifyTypes.error})
            throw e
        }
    }
    const deleteRoom = async () => {
        try {
            const data = await api.post("/delete/room")
            logout()
            return data.data
        }
        catch (error) {
            const e = error as AxiosError
            if(e.code == "400") logout()
            notifications.pushNotifications({message: e.response?.data as string || "Error, intentalo más tarde",type:EnotifyTypes.error})
            throw e
        }
    }
    const testRoom = async (room:string) => {
        try {
            const data = await api.get(`/room/${encodeURI(room)}`)
            return data
        }
        catch (err) {
            const e = err as AxiosError
            notifications.pushNotifications({message:e.response?.data as string || "error",type:EnotifyTypes.error})
            throw e
        }
    }
    return {createRoom,getRoomConfess,createConfess,deleteRoom,testRoom}
}