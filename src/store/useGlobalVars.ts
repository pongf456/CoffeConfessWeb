import { useSelector } from "react-redux";
import { RootState } from "./store";
import { useDispatch } from "react-redux";
import { setRoomName, setToken, unSetRoomName, unsetToken } from "./sliceGlobalVars";

export const useGlobalVars = () => {

    const dispatch = useDispatch()
    const {auth_token,roomName}  = useSelector((room:RootState)=> room.globalVariables)
    
    const login = (token:string,roomName:string) => {
        dispatch(setRoomName(roomName))
        dispatch(setToken(token))
    }
    const logout = () => {
        dispatch(unSetRoomName())
        dispatch(unsetToken())
    }
    return {login,logout,auth_token,roomName}
}