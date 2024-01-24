export const Background = () => {
    return(
    <div className="w-screen h-screen absolute top-0 left-0 -z-10">
        <img src="/background.jpg" className="w-full h-full object-cover absolute" alt="" />
        <div className="w-full h-full bg-slate-100/20 absolute"></div>
    </div>
    )
}