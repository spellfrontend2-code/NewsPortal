import Footer from "@/components/Public/Footer";
import NavbarCategories from "@/components/Public/Navbar/NavbarCategories";
import NavbarTop from "@/components/Public/Navbar/NavbarTop";
import ScrollToTop from "@/lib/ScrollToTop";
import { Outlet } from "react-router-dom";

function PublicLayout() {
  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <NavbarTop />
        <NavbarCategories />

        <main className="flex-1 w-[80%] mx-auto ">
          <Outlet />
        </main>

        <Footer />
      </div>
    </>
  );
}

export default PublicLayout;
