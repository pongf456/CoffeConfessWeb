import {motion} from 'framer-motion'
import { useEffect, useState } from 'react'
import { useGlobalVars } from '../store/useGlobalVars'
import { useNavigate } from 'react-router-dom'
import {useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'
import { useNotifications } from '../store/useNotifications';
import { EnotifyTypes } from '../types';
import { useConfessAPI } from '../APIS/coofeConfessAPI';
import { Loading } from '../components/Loading';
type Troom = {
    roomName:string
    roomPassword:string
}
const validationSchema =  Yup.object().shape({
    roomName: Yup.string()
    .required("el nombre de la sala es requerido")
    .min(3,"la contraseña tiene un minimo de 3 caractered")
    .max(30," la contraseña tiene un maximo de 30 caracteres"),
    roomPassword: Yup.string()
    .required("la contraseña es requerida")
    .min(3,"la contraseña tiene un minimo de 3 caracteres")
    .max(30,"la contraseña tiene un maximo de 30 caracteres")
})
const RoomAcces = () => {
    const navigate = useNavigate()
    const globalVars = useGlobalVars()
    const [loading,setLoading] = useState(false)
    const {pushNotifications } = useNotifications()
    const form = useForm<Troom>({resolver: yupResolver(validationSchema)})
    const coofeApi = useConfessAPI()
    useEffect(() =>{
        if(globalVars.auth_token) {   
            navigate("/room")
        }
    },[] )
    const sendData = form.handleSubmit((data) => {
        setLoading(true)
        coofeApi.createRoom(data.roomName,data.roomPassword)
        .then((result) => {
            setLoading(false)
            globalVars.login(result.data.data,data.roomName)
            pushNotifications({message:"sala creada correctamente",type:EnotifyTypes.succes})
            navigate("/room")
        })
        .catch(()=>{
            setLoading(false)
        })
    })
    useEffect(()=>{
        Object.values(form.formState.errors).map((data) => {
            pushNotifications({message:data.message || "",type:EnotifyTypes.error})
        })
    },[form.formState.errors])
    return (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="w-full h-full flex items-center justify-center">
            <form onSubmit={sendData} className="w-64 flex items-center flex-col h-80 ">
                <input {...form.register("roomName")} type="text"  id="nofsal" placeholder="nombre de la sala" className="placeholder:font-Dmsans placeholder:text-gray-700 outline-none border-b-2 border-neutral-950/50 hover:border-neutral-950 bg-transparent p-1 px-2 text-slate-800  m-6 font-Dmsans  w-11/12 "/>
                <input {...form.register("roomPassword")} type="password" id="cofsal" placeholder="contraseña para la sala" className="placeholder:font-Dmsans placeholder:text-gray-700 outline-none border-b-2 border-neutral-950/50 hover:border-neutral-950 bg-transparent p-1 px-2 text-slate-800  m-6 font-Dmsans w-11/12 "/>
                <button className="p-2 w-1/2 font-Dmsans font-semibold bg-slate-200 opacity-90 rounded-sm shadow-md  transition-all m-4">crear</button>
            </form>
            {loading && <Loading></Loading>}
        </motion.div>
        
    )
}
export default RoomAcces