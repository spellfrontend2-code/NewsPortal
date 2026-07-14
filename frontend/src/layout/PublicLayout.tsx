import Footer from "@/components/Public/Footer"
import Navbar from "@/components/Public/Navbar/Navbar"
import { Outlet } from "react-router-dom"

function PublicLayout()
{
    return (
        <div className="h-screen w-full">

    <Navbar />
 

    <Outlet />
    <Footer/>


</div>
    )
}

export default PublicLayout