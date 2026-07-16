import Footer from "@/components/Public/Footer";
import NavbarCategories from "@/components/Public/Navbar/NavbarCategories";
import NavbarTop from "@/components/Public/Navbar/NavbarTop";
import ScrollToTop from "@/lib/ScrollToTop";
import { Outlet } from "react-router-dom";

function PublicLayout() {
  return (
    <><ScrollToTop/>
    <div className="h-screen w-full flex flex-col items-center justify-between">
      <div className="h-[300px] w-full"><NavbarTop />
      <NavbarCategories />
</div>
      <div className="w-[70%] h-(calc(100% - 800px)) py-20">
        <Outlet />
      </div>
      <div className="h-[500px] w-full">
      <Footer />
      </div>
    </div></>
  );
}

export default PublicLayout;
