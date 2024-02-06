import { Link } from "react-router-dom"
import {motion} from 'framer-motion'
const Main = () => {
    return <motion.div initial={{opacity:0}} animate={{opacity:1}} className="w-full h-full select-none flex justify-center flex-wrap relative">
        <span className="font-rockwell py-6 text-3xl first-letter:text-slate-400 text-slate-200 ">Coffe Confess</span>
        <div className=" absolute w-full h-full flex items-center justify-center flex-col">
            <Link to="/room/create" className=" bg-slate-100  p-2 truncate m-4 shadow-md rounded-sm w-40 text-center text-sm  font-rockwell text-slate-900 hover:text-slate-300 hover:bg-slate-800 transition-all"><i className="bi bi-house-add-fill"></i> crear una sala</Link>
        </div>
    </motion.div>
}
export default Main