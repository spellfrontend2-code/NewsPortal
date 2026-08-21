import Footer from "@/components/Public/Footer";
import NavbarCategories from "@/components/Public/Navbar/NavbarCategories";
import NavbarTop from "@/components/Public/Navbar/NavbarTop";
import ScrollToTop from "@/lib/ScrollToTop";
import PopupAdvertisement from "@/features/advertisements/components/Public/PopupAdvertisement";
import { useAdvertisementHooks } from "@/features/advertisements/hooks/useAdvertisements";
import { useCategoriesHooks } from "@/features/categories/hooks/useCategories";
import { usePagePopup } from "@/features/advertisements/hooks/usePagePopup";
import { Outlet, useLocation } from "react-router-dom";
import { useMemo } from "react";
import PageTitle from "@/app/routes/pageTitle";

function PublicLayout() {
  const location = useLocation();

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
    }
  );

  const popupAd = advertisements?.data?.popup;
  const isArticlePage = location.pathname.startsWith("/news/");
  const isContactPage = location.pathname === "/contact-us";
  const hasValidPopupAd = Boolean(
    !isLoading &&
      pageType &&
      !isArticlePage &&
      !isContactPage &&
      popupAd &&
      (popupAd.id ||
        (Array.isArray(popupAd) && popupAd.length > 0 && (popupAd[0]?.id || popupAd[0]?.data?.id)))
  );

  const { showPopup, setShowPopup } = usePagePopup({
    pageKey: location.pathname,
    hasPopup: hasValidPopupAd,
  });

  return (
    
    <div className="public h-screen w-full overflow-y-auto overflow-x-hidden">
            <PageTitle />

      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <NavbarTop />
        <NavbarCategories />

        <main className="flex-1 w-[92%] sm:w-[85%] md:w-[80%]  mx-auto">
          <Outlet />
        </main>

        <Footer />
      </div>

      {hasValidPopupAd && (
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
