import { Link } from "react-router-dom"

const NotFoundPage = () => {

    return <>
        <div className="w-full h-full flex items-center justify-center flex-col">
            <span className="font-rockwell font-semibold text-6xl">404</span>
            <span className="font-Dmsans font-medium text-base m-4">Page not found.</span>
            <Link to={"/"} className="font-Dmsans text-cyan-950  border-b-2 border-blue-950 font-semibold text-xl">home</Link>
        </div>
    </>
}
export default NotFoundPage