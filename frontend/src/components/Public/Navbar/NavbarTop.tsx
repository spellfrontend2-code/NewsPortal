import { useAdvertisementHooks } from "@/features/advertisements/hooks/useAdvertisements";
import logo from "../../../assets/logo.png";
import BannerAdvertisement from "@/features/advertisements/components/Public/BannerAdvertisement";

function NavbarTop() {
  const advertisementHook=useAdvertisementHooks();
  const {data:advertisements,isLoading:advertisementsLoading}=advertisementHook.useFetchPublicAdvertisements();
  const advertisementsList = advertisements?.data ?? [];
  const headerAd=advertisementsList?.header;
 return (
  <div className="w-full flex items-center justify-center ">
    <div className="flex h-30 w-[80%]  items-center justify-between bg-[var(--color-public-bg)] gap-10 p-3">
    <div className="h-[100%] w-[40%]">
      <img
      src={logo}
      alt="Logo"
      className="h-full w-fit object-contain"
    />
    </div>

    <div className="h-full w-[60%] ">
      {headerAd && (
      <BannerAdvertisement Ad={headerAd} />
    )}
    </div>
  </div>
  </div>
);
}

export default NavbarTop;