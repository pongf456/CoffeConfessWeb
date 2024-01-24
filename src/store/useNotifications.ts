import { useSelector } from "react-redux";
import { RootState } from "./store";
import { useDispatch } from "react-redux";
import { addNotifications, deleteNotifications } from "./sliceGlobalVars";
import { EnotifyTypes, Inotify } from "../types";
import { v1 } from "uuid";

export const useNotifications = () => {

    const dispatch = useDispatch()
    const notifications  = useSelector((room:RootState)=> room.globalVariables.notifications)
    const pushNotifications = (Inotify:Inotify) => {
        const generatedUUID = v1()
        dispatch(addNotifications({message:Inotify.message,type:Inotify.type,uuid:generatedUUID}))
        if(Inotify.type != EnotifyTypes.information) {
            setTimeout(() => {
                dispatch(deleteNotifications(generatedUUID))
            }, 3000);
        }
    }
    const eliminateNotifications = (id:string) => {
        dispatch(deleteNotifications(id))
    }
    return {notifications,pushNotifications,eliminateNotifications}
}