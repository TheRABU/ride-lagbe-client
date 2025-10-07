import { Outlet } from "react-router"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"


const Root = () => {
  return (
    <>
    <div className="flex flex-col bg-[#FAF7F3]">
        <Navbar />
        <div className="min-h-[calc(100vh-136px)]">
            <Outlet />
        </div>
        <Footer />
    </div>
    </>
  )
}

export default Root