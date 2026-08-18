import Footer from "@/components/Public/Footer";
import NavbarCategories from "@/components/Public/Navbar/NavbarCategories";
import NavbarTop from "@/components/Public/Navbar/NavbarTop";
import ScrollToTop from "@/lib/ScrollToTop";
import PopupAdvertisement from "@/features/advertisements/components/Public/PopupAdvertisement";
import { useAdvertisementHooks } from "@/features/advertisements/hooks/useAdvertisements";
import { useCategoriesHooks } from "@/features/categories/hooks/useCategories";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";

function PublicLayout() {
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false);

  const categoriesHook = useCategoriesHooks();
  const { data: categoriesData } = categoriesHook.useFetchPublicCategories({
    page: 1,
    per_page: 50,
  });

  const { pageType, sectionId } = useMemo(() => {
    const path = location.pathname;
    if (path === "/") return { pageType: "home", sectionId: undefined };
    if (path.startsWith("/news-list/category/")) {
      const slug = path.replace("/news-list/category/", "").split("/")[0]?.split("?")[0];
      const categories = categoriesData?.data ?? [];
      const matched = categories.find((c: any) => c.slug === slug);
      return { pageType: "category", sectionId: matched?.id };
    }
    if (path.startsWith("/news-list/latest-news")) return { pageType: "latest", sectionId: undefined };
    if (path.startsWith("/news/")) return { pageType: "single", sectionId: undefined };
    return { pageType: undefined, sectionId: undefined };
  }, [location.pathname, categoriesData]);

  const advertisementHook = useAdvertisementHooks();
  const { data: advertisements, isLoading } = advertisementHook.useFetchPublicAdvertisements(
    {
      page_type: pageType,
      section_id: sectionId,
    },
    {
      enabled: !!pageType,
    }
  );

  const popupAd = advertisements?.data?.popup;

  useEffect(() => {
    if (
      pageType &&
      location.pathname !== "/contact-us" &&
      popupAd &&
      (popupAd.id ||
        (Array.isArray(popupAd) && popupAd.length > 0 && (popupAd[0]?.id || popupAd[0]?.data?.id)))
    ) {
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
  }, [popupAd, location.pathname, pageType]);

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

      {!isLoading && pageType && location.pathname !== "/contact-us" && popupAd && (
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
