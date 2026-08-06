import { useAdvertisementHooks } from "@/features/advertisements/hooks/useAdvertisements";
import staticlogo from "../../../assets/logo.png";
import BannerAdvertisement from "@/features/advertisements/components/Public/BannerAdvertisement";
import { useSettingHooks } from "@/features/settings/hooks/useSettings";
import { useNavigate } from "react-router-dom";

function NavbarTop() {
  const advertisementHook = useAdvertisementHooks();
  const companyHook = useSettingHooks();
  const { data: advertisements, isLoading: advertisementsLoading } = advertisementHook.useFetchPublicAdvertisements();
  const {data:companyData,isLoading:companyDataLoading} = companyHook.useFetchPublicSettings();
  const logo = companyData?.data?.logo || staticlogo;
  const advertisementsList = advertisements?.data ?? [];
  const headerAd = !advertisementsLoading && advertisementsList?.header;
  const navigate=useNavigate();
  return (
    <div className="w-full flex items-center justify-center border-b border-slate-100 bg-white">
      <div className="flex h-20 md:h-24 w-[92%] sm:w-[85%] md:w-[70%] max-w-screen-xl mx-auto items-center justify-between gap-4 md:gap-8 py-3">
        {/* Logo */}
        <div className="h-full flex items-center shrink-0">
          <img
            src={companyDataLoading?staticlogo:logo}
            alt="Logo"
            className="h-12 md:h-16 w-auto object-contain cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>

        {/* Header Ad  */}
        {headerAd && (
          <div className=" sm:flex h-full flex-1 overflow-hidden rounded-xl border border-slate-100">
            <BannerAdvertisement Ad={headerAd} />
          </div>
        )}
      </div>
    </div>
  );
}

export default NavbarTop;