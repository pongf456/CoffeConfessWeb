import {motion} from 'framer-motion'
import { useRef} from 'react'
import  html2canvas from 'html2canvas'
type Tconfess = {
    confess:string
    confessId:string
}
export const Confess = ({confess}:{confess:Tconfess}) => {
    const ref = useRef<null | HTMLDivElement>(null)
    const takeScrenshot = () => {
        
        if(ref.current){
            html2canvas(ref.current,{
                backgroundColor:"#efefef",
                scale:2
            })
            .then((canvas)=> {
                let image = canvas.toDataURL("image/png")
                let a = document.createElement("a")
                a.href = image
                a.download = "@CoofeConfess.png"
                a.click()
            })
        }
    }
    return <motion.div   initial={{opacity:0}} animate={{opacity:1}} className=" relative w-80   min-h-28 max-h-40 bg-slate-100/85 drop-shadow-lg m-4 rounded-md overflow-auto">
            <i className="bi bi-camera absolute top-2 right-2 cursor-pointer text-xl" onClick={takeScrenshot}></i>
            <div ref={ref} className=' w-full h-min  px-4 py-4'>
                <span className="inline-block w-full my-2 h-1/5 font-Dmsans font-medium text-sm text-purple-700">Anonimus <span className='text-gray-600/50'>@CoffeConfess</span></span>
                <p className="inline-block h-min w-full  font-Dmsans  text-slate-600 text-justify">{confess.confess}</p>                 
            </div>
    </motion.div>
}