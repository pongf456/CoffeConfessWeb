import { useEffect } from "react"
import { useGlobalVars } from "../store/useGlobalVars"
import { useNavigate } from "react-router-dom"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useConfessAPI } from "../APIS/coofeConfessAPI"
import { Loading } from "../components/Loading"
import { Confess } from "../components/confess"
import { useInView } from 'react-intersection-observer';
import { useNotifications } from "../store/useNotifications"
import { EnotifyTypes } from "../types"
import copy from 'clipboard-copy'
const Room = () => {
    const IscrollViewer = useInView();
    const globalVars = useGlobalVars()
    const coofeApi = useConfessAPI()
    const Navigate = useNavigate()
    const {pushNotifications} = useNotifications()
    useEffect(()=>{
        if(!globalVars.auth_token){
            Navigate("/")
        }
    })
    const query = useInfiniteQuery({
        queryKey:["confessions",globalVars.roomName],
        initialPageParam:1,
        queryFn:({ pageParam = 1 }) => coofeApi.getRoomConfess(pageParam),
        getNextPageParam:(lastPage) => {
            if(lastPage.data.hasNextPage){
                return lastPage.data.page + 1
            }
            else {
                return undefined
            }
        }

    })
    useEffect(()=>{
        if(IscrollViewer.inView && query.hasNextPage && ! query.isLoading) {
            query.fetchNextPage()
        }
    },[IscrollViewer.inView,query.data])
    return <>
        <div className="w-full h-full flex  justify-center flex-wrap relative overflow-auto">
        <div  className="w-full h-min flex sticky">
        <span className="font-Dmsans  flex items-center justify-center text-xs sm:text-base font-semibold text-slate-100 w-2/5 sm:w-3/5 select-none"><span className="w-full truncate p-1">@{globalVars.roomName}</span></span>
        <button className="bg-slate-300 p-2 m-2 font-Dmsans font-medium text-xs sm:text-base  truncate text-slate-900 drop-shadow-md hover:bg-red-700 duration-300" onClick={()=>
        {
        pushNotifications({message:"sala eliminada correctamente",type:EnotifyTypes.succes})
        coofeApi.deleteRoom()
        }
        }><i className="bi bi-x"></i> Eliminar sala</button>
        <button className="bg-slate-300 p-2 m-2 font-Dmsans font-medium text-xs sm:text-base truncate text-slate-900 drop-shadow-md hover:bg-cyan-700 duration-300" onClick={
            ()=>{
             copy(`${location.href}/confess/${encodeURI(globalVars.roomName || "")}`)
             pushNotifications({message:"copiado al portapapeles",type:EnotifyTypes.succes})
            }
        }><i className="bi bi-clipboard"></i>Copiar enlace</button>
        </div>
        {query.isLoading && (<Loading></Loading>)}
        {!query.isError && (
            query.data?.pages.map((page) => (
                (page.data.docs as {confess:string,confessId:string}[])
                .map((elem,index)=> (
                    <Confess confess={elem} key={index}></Confess>
                ))
            ))
        )}
        {query.hasNextPage && (
        <div ref={IscrollViewer.ref} className="w-full h-12">
        </div>
        )}
        </div>
    </>
}
export default Room