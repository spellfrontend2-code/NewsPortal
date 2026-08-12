import Footer from "@/components/Public/Footer";
import NavbarCategories from "@/components/Public/Navbar/NavbarCategories";
import NavbarTop from "@/components/Public/Navbar/NavbarTop";
import BreakingNewsTicker from "@/components/Public/Navbar/BreakingNewsTicker";
import ScrollToTop from "@/lib/ScrollToTop";
import { Outlet } from "react-router-dom";

function PublicLayout() {
  return (
    <div className="public">
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <NavbarTop />
        <NavbarCategories />
        {/* <BreakingNewsTicker /> */}

        <main className="flex-1 w-[92%] sm:w-[85%] md:w-[80%] py-10 mx-auto">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default PublicLayout;
