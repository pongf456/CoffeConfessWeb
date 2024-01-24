import { useNotifications } from "../store/useNotifications"
import {clsx} from 'clsx'
import { EnotifyTypes } from "../types"
import {AnimatePresence, motion} from 'framer-motion'
export const Notifications = () => {
    const {notifications,eliminateNotifications} = useNotifications()
    return  <>
    <div className="w-min h-min flex flex-col absolute top-0 left-0 z-50">
    <AnimatePresence>
    {notifications.map((elem,index) => (
        <motion.div  
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}
        key={index} className={
            clsx(
                "w-72 h-12 m-2  box-border p-2 flex items-center font-Dmsans font-medium  shadow-md",
                elem.type == EnotifyTypes.information ? "bg-sky-400 text-slate-800" : elem.type == EnotifyTypes.error? "bg-rose-400 text-slate-800"
                : "bg-green-300 text-slate-800"
            )
        }>
            <span className="w-4/5 truncate text-sm">{elem.message}</span>
            <button className="absolute right-4" onClick={() => eliminateNotifications(elem.uuid || "")}>
                <i className="bi bi-x text-3xl hover:text-4xl transition-all"></i>
            </button>
        </motion.div>
      ))}
      </AnimatePresence>
    </div>
    </>
}