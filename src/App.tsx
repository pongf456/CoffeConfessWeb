
import { Route, Routes } from "react-router-dom"
import { Background } from "./components/Background"
import { Notifications } from "./components/Notifications"
import { Suspense, lazy } from "react"
import {Helmet} from "react-helmet";
const Main = lazy(() => import("./routes/Main"))
const RoomCreate = lazy(()=> import("./routes/RoomCreate"))
const NotFoundPage = lazy(()=> import("./routes/404"))
const Room = lazy(()=> import("./routes/Room"))
const RoomConfess = lazy(()=> import("./routes/RoomConfess"))
function App() {
  return (
    <>
    <Background/>
    <Notifications/>
    <Helmet>
      <title>Coofe Confess</title>
      <link rel="canonical" href={location.href} />
      <meta name="description" content="Send message anonimus to best friends." />
      <meta property="og:title" content="Coofe Confess"/>
      <meta property="og:site_name" content="coofeConfessPongfZT"/>
      <meta property="og:url" content={location.href}/>
      <meta property="og:description" content="Send message anonimus for best friends"/>
      <meta property="og:type" content= "website"/>
    </Helmet>
    <Routes>
      <Route index element={<Suspense><Main></Main></Suspense>}/>
      <Route path="/room/confess/:name" element={<Suspense><RoomConfess/></Suspense>}  />
      <Route path="/room" element={<Suspense><Room></Room></Suspense>} />
      <Route path="/room/create" element={<Suspense><RoomCreate/></Suspense>} />
      <Route path="*" element = {<Suspense><NotFoundPage></NotFoundPage></Suspense>} />
    </Routes>
    </>
  )
}

export default App
