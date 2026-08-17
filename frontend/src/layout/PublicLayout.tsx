import Footer from "@/components/Public/Footer";
import NavbarCategories from "@/components/Public/Navbar/NavbarCategories";
import NavbarTop from "@/components/Public/Navbar/NavbarTop";
import ScrollToTop from "@/lib/ScrollToTop";
import PopupAdvertisement from "@/features/advertisements/components/Public/PopupAdvertisement";
import { useAdvertisementHooks } from "@/features/advertisements/hooks/useAdvertisements";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";

function PublicLayout() {
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false);

  const pageType = useMemo(() => {
    const path = location.pathname;
    if (path === "/") return "home";
    if (path.startsWith("/news-list/category/")) return "category";
    if (path.startsWith("/news-list/latest-news")) return "latest";
    if (path.startsWith("/news/")) return "single";
    return "home";
  }, [location.pathname]);

  const advertisementHook = useAdvertisementHooks();
  const { data: advertisements, isLoading } = advertisementHook.useFetchPublicAdvertisements({
    page_type: pageType,
  });

  const popupAd = advertisements?.data?.popup;

  useEffect(() => {
    if (popupAd && (popupAd.id || (Array.isArray(popupAd) && popupAd.length > 0))) {
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
  }, [popupAd, location.pathname]);

  return (
    <div className="public">
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <NavbarTop />
        <NavbarCategories />

        <main className="flex-1 w-[92%] sm:w-[85%] md:w-[80%] py-10 mx-auto">
          <Outlet />
        </main>

        <Footer />
      </div>

      {!isLoading && popupAd && (
        <PopupAdvertisement
          advertisements={popupAd}
          showPopup={showPopup}
          setShowPopup={setShowPopup}
        />
      )}
    </div>
  );
}

export default PublicLayout;
