import { useAdvertisementHooks } from "@/features/advertisements/hooks/useAdvertisements";
import logo from "../../../assets/logo.png";
import ad from "../../../assets/adsize.avif";
import { Link } from "react-router-dom";

function NavbarTop() {
  const advertisementHook=useAdvertisementHooks();
  const {data:advertisements,isLoading:advertisementsLoading}=advertisementHook.useFetchPublicAdvertisements();
  const advertisementsList = advertisements?.data ?? [];
  const filteredAd=advertisementsList.filter((ad)=>ad.placement==="header_banner");
 return (
  <div className="flex h-30 w-full items-center justify-between gap-10 bg-[var(--color-public-bg)] p-3">
    <div className="h-[100%] w-[40%] ">
      <img
      src={logo}
      alt="Logo"
      className="h-full w-fit object-contain"
    />
    </div>

    <div className="h-full w-[60%]">
      {filteredAd.length > 0 && (
      <Link
        to={filteredAd[0].target_url}
          target={filteredAd[0]. target_blank}

      >

        {filteredAd[0].ad_type === "image" && (
          <img
            src={filteredAd[0].image_url}
            alt={filteredAd[0].title}
            className="h-25 w-70 object-contain"
          />
        )}

        {filteredAd[0].ad_type === "video" && (
          <video
            src={filteredAd[0].video_url}
            controls
            autoPlay
            muted
            loop
            className="h-25 w-70 object-contain"
          />
        )}

        {filteredAd[0].ad_type === "html" && (
          <div
            dangerouslySetInnerHTML={{
              __html: filteredAd[0].html_code,
            }}
          />
        )}

        {filteredAd[0].ad_type === "text" && (
          <p>{filteredAd[0].text_content}</p>
        )}
      </Link>
    )}
    </div>
  </div>
);
}

export default NavbarTop;