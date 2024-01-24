import { useEffect } from "react"
import {useNavigate } from "react-router-dom"

const NotFoundPage = () => {
    const navigate = useNavigate()
    useEffect(()=> {
        navigate("/")
    },[]
    )
    return <>
        <div className="w-full h-full flex items-center justify-center flex-col">
            <span className="font-rockwell font-semibold text-6xl">404</span>
            <span className="font-Dmsans font-medium text-base m-4">Page not found.</span>
        </div>
    </>
}
export default NotFoundPage