import Footer from "@/components/Public/Footer"
import NavbarCategories from "@/components/Public/Navbar/NavbarCategories"
import NavbarTop from "@/components/Public/Navbar/NavbarTop"
import { Outlet } from "react-router-dom"

function PublicLayout()
{
    return (
        <div className="h-screen w-full">
<NavbarTop/>
    <NavbarCategories />
 

    <Outlet />
    <Footer/>


</div>
    )
}

export default PublicLayout