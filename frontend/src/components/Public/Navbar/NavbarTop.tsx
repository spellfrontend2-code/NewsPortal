import { useAdvertisementHooks } from "@/features/advertisements/hooks/useAdvertisements";
import logo from "../../../assets/logo.png";
import BannerAdvertisement from "@/features/advertisements/components/Public/BannerAdvertisement";

function NavbarTop() {
  const advertisementHook = useAdvertisementHooks();
  const { data: advertisements, isLoading: advertisementsLoading } = advertisementHook.useFetchPublicAdvertisements();
  const advertisementsList = advertisements?.data ?? [];
  const headerAd = advertisementsList?.header;
  return (
    <div className="w-full flex items-center justify-center border-b border-slate-100 bg-white">
      <div className="flex h-20 md:h-24 w-[70%] max-w-screen-xl items-center justify-between gap-4 md:gap-8 px-4 md:px-8 py-3">
        {/* Logo */}
        <div className="h-full flex items-center shrink-0">
          <img
            src={logo}
            alt="Logo"
            className="h-12 md:h-16 w-auto object-contain cursor-pointer"
          />
        </div>

        {/* Header Ad — hidden on small screens */}
        {headerAd && (
          <div className="hidden sm:flex h-full flex-1 overflow-hidden rounded-xl border border-slate-100">
            <BannerAdvertisement Ad={headerAd} />
          </div>
        )}
      </div>
    </div>
  );
}

export default NavbarTop;