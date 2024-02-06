
import {useNavigate, useParams } from "react-router-dom"
import { useConfessAPI } from "../APIS/coofeConfessAPI"
import { useQuery } from "@tanstack/react-query"
import { Loading } from "../components/Loading"
import { AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { object, string } from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useNotifications } from "../store/useNotifications"
import { EnotifyTypes } from "../types"
import { Helmet } from "react-helmet"

type confess ={
    confess:string
}
const confessSchema = object().shape({
    confess:string()
    .required("Es requerido el mensaje")
    .min(3,"El mensaje tiene un minimo de 3 caracteres")
    .max(400,"El mensaje tiene un maximo de 100 caracteres")
})
const RoomConfess = () => {
    const {name} = useParams()
    const {pushNotifications} = useNotifications()
    const coofeApi = useConfessAPI()
    const {testRoom} = useConfessAPI()
    const navigate = useNavigate()
    const form = useForm<confess>({resolver:yupResolver(confessSchema)})
    const roomVerify = useQuery({
        queryKey:["roomConfess",name],
        queryFn:() => testRoom(name as string),
        retry:false
    })
    const [sendLoading,setSendLoading] = useState(false)
    const sendData = form.handleSubmit((data) => {
        setSendLoading(true)
        coofeApi.createConfess(data.confess,name || "")
        .then(() => {
            setSendLoading(false)
            pushNotifications({message:"Mensaje enviado, puedes realizar otra",type:EnotifyTypes.succes})
            form.resetField("confess")
        })
        .catch(()=>{
            setSendLoading(false)
        })
    })

    useEffect(()=>{
        if(roomVerify.isError) navigate("/")
    },[roomVerify.isError])
    useEffect(()=>{
        Object.values(form.formState.errors).map((data) => {
            pushNotifications({message:data.message || "",type:EnotifyTypes.error})
        })
    },[form.formState.errors])

    return <>
    <AnimatePresence>
        {roomVerify.isLoading && (
            <Loading></Loading>
        )}
    </AnimatePresence>
    <AnimatePresence>
        {sendLoading && (
            <Loading></Loading>
        )}
    </AnimatePresence>
        {!roomVerify.isError && !roomVerify.isLoading && (
            <>
            <Helmet>
                <title>Room - {name}</title>
                <meta property="og:title" content={`Room - ${name}`}/>
                <meta property="og:description" content={`Send anonymous messages to ${name}! It's totally anonymous!`}/>
            </Helmet>
            <div className="w-full h-full flex flex-col justify-center items-center">
                <span className="font-rockwell py-6 text-3xl absolute top-4 first-letter:text-slate-500 text-slate-200 ">Coffe Confess</span>
                <form className="w-80 h-40 flex" onSubmit={sendData}>
                    <textarea cols={30} {...form.register("confess")} rows={10} placeholder={`¡Escribe un mensaje Anonimo a @${name}!`} className="peer w-4/5 h-full outline-none  bg-gray-300/60 drop-shadow-lg p-4 font-Dmsans text-slate-800 placeholder:font-Dmsans placeholder:text-sm placeholder-slate-900 placeholder:text-center text-sm rounded-l-3xl"></textarea>
                    <button className="w-1/6 mx-2 bg-gray-50/60 drop-shadow-lg p-2 font-Dmsans text-2xl rounded-r-3xl text-cyan-950 peer-hover:text-cyan-700 peer-hover:text-4xl transition-all"><i className="bi bi-send-check"></i></button>
                </form>
            </div>
            </>
        )}
    </>
}

export default RoomConfess