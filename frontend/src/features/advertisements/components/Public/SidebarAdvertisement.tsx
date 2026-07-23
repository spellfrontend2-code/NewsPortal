import { Link } from "react-router-dom";
import { useAdvertisementHooks } from "../../hooks/useAdvertisements";
import { toast } from "sonner";
import HtmlAd from "./HtmlAd";
import { useAdImpression } from "../../hooks/useAdImpression";



function SidebarAdvertisement({ Ad }) {
const adRef = useAdImpression({
  adId: Ad?.id,
})
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
  return (
    <div ref={adRef} className="h-full w-full flex flex-col gap-2 overflow-hidden">
     
        <Link
          key={Ad?.id }
          to={Ad?.url || "#"}
          target={Ad?.target}
          className="h-full w-full cursor-pointer"
          onClick={()=>handleAdClick(Ad?.id)}
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
              playsInline
              disablePictureInPicture
              loop
              className="h-full w-full object-fill"
            />
          ) : Ad?.type === "text" ? (
            <div className="bg-gray-100 h-full w-full">
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