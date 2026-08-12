import { Link } from "react-router-dom";
import HtmlAd from "./HtmlAd";
import { useAdvertisementHooks } from "../../hooks/useAdvertisements";
import { toast } from "sonner";
import { useAdImpression } from "../../hooks/useAdImpression";

function BannerAdvertisement({ Ad }: { Ad: any }) {
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
    <div className="h-full w-full" ref={adRef}>
      <Link
        to={Ad?.url}
        target={Ad?.target}
        onClick={() => handleAdClick(Ad?.id)}
      >
        {Ad?.type === "image" && (
          <img
            src={Ad?.image}
            alt={Ad?.title}
            className="h-[100px] w-full object-fill"
          />
        )}

        {Ad?.type === "video" && (
          <video
            src={Ad?.video}
            autoPlay
            muted
            loop
            disablePictureInPicture
            className="h-[100px] w-full object-fill "
          />
        )}

        {Ad?.type === "html" && <HtmlAd html={Ad?.html} />}

        {Ad?.type === "text" && (
          <p className="bg-gray-100 h-[100px] w-full">{Ad?.text}</p>
        )}

        {Ad?.type === "native" && (
          <div className="flex flex-col h-[500px] w-full justify-between rounded-md  bg-white shadow-sm hover:shadow-md transition overflow-hidden">
            <img
              src={Ad?.image}
              alt={Ad?.title}
              className="h-2/3 object-cover "
            />

            <div className="h-1/3 px-4 flex flex-col justify-between py-2">
              <h3 className="mt-2 text-lg font-semibold text-gray-900 line-clamp-2">
                {Ad?.title}
              </h3>

              <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                {Ad?.text}
              </p>

           <button type="button" className="mt-4 w-full cursor-pointer rounded-md bg-blue-600 py-2 text-sm font-medium text-white" onClick={(e) => { e.stopPropagation(); handleAdClick(Ad?.id); if (Ad?.url) { window.open( Ad.url, Ad?.target === "_blank" ? "_blank" : "_self" ); } }} > {Ad?.cta} </button>
            </div>
          </div>
        )}
      </Link>
    </div>
  );
}

export default BannerAdvertisement;
