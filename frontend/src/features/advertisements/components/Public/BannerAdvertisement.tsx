import { Link } from "react-router-dom";
import HtmlAd from "./HtmlAd";
import { useAdvertisementHooks } from "../../hooks/useAdvertisements";
import { toast } from "sonner";

function BannerAdvertisement({Ad}) {
    const advertisementHook=useAdvertisementHooks();
    const trackAdClick=advertisementHook.useTrackPublicAdClick()
  const handleAdClick = (advertisement_id: number) => {
    trackAdClick.mutate(advertisement_id, {
      onSuccess: (res) => {
        toast.success(res?.message || "Advertisement clicked successfully");
      },
      onError: (e: any) => {
        toast.error(e?.message || "Something went wrong");
      },
    });
  };
    return <div className="h-full w-full">
        <Link
        to={Ad?.target_url}
          target={Ad?. target_blank}
          onClick={()=>handleAdClick(Ad?.id)}
      >

        {Ad?.type === "image" && (
          <img
            src={Ad?.image}
            alt={Ad?.title}
            className="h-full w-full object-fill"
          />
        )}

        {Ad?.type === "video" && (
          <video
            src={Ad?.video}
            autoPlay
            muted
            loop
            disablePictureInPicture
            className="h-full w-full object-fill "
          />
        )}

        {Ad?.type === "html" && (
                      <HtmlAd html={Ad?.html} />

        )}

        {Ad?.type === "text" && (
          <p className="bg-gray-100 h-full w-full">{Ad?.text}</p>
        )}
      </Link>
    </div>;
}

export default BannerAdvertisement