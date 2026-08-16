import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useAdvertisementHooks } from "../../hooks/useAdvertisements";
import { useAdImpression } from "../../hooks/useAdImpression";
import HtmlAd from "./HtmlAd";

function SidebarAdvertisement({ Ad }: { Ad: any }) {
  const adRef = useAdImpression({
    adId: Ad?.id,
  });

  const advertisementHook = useAdvertisementHooks();
  const trackAdClick = advertisementHook.useTrackPublicAdClick();

  const handleAdClick = (advertisement_id: number) => {
    trackAdClick.mutate(advertisement_id, {
      onSuccess: (res) => {
        // toast.success(res?.message || "Advertisement clicked successfully");
      },
      onError: (e: any) => {
        toast.error(e?.message || "Something went wrong");
      },
    });
  };

  return (
    <div ref={adRef} className="h-full w-full flex flex-col overflow-hidden">
      <Link
        to={Ad?.url || "#"}
        target={Ad?.target || "_blank"}
        onClick={() => handleAdClick(Ad?.id)}
        className="h-full w-full"
      >
        {Ad?.type === "image" ? (
          <img
            src={Ad?.image}
            alt={Ad?.title}
            className="h-full w-full object-fill"
          />
        ) : Ad?.type === "video" ? (
          <video
            src={Ad?.video}
            autoPlay
            muted
            loop
            playsInline
            disablePictureInPicture
            className="h-full w-full object-fill"
          />
        ) : Ad?.type === "text" ? (
          <div className="bg-gray-100 p-4 h-full flex items-center justify-center">
            {Ad?.text}
          </div>
        ) : Ad?.type === "html" ? (
          <HtmlAd html={Ad?.html} />
        ) : null}
      </Link>
    </div>
  );
}

export default SidebarAdvertisement;
