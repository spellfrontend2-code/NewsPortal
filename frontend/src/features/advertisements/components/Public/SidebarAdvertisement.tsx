import { useAdvertisementHooks } from "../../hooks/useAdvertisements";
import { useAdImpression } from "../../hooks/useAdImpression";
import HtmlAd from "./HtmlAd";

interface SidebarAdvertisementProps {
  Ad?: any;
  item?: any;
  className?: string;
  objectFit?: "cover" | "contain" | "fill";
}

function SidebarAdvertisement({
  Ad: propAd,
  item,
  className = "",
  objectFit = "cover",
}: SidebarAdvertisementProps) {
  const rawAd = item?.data || propAd;
  if (!rawAd) return null;

  const adId = rawAd.id;
  const adType = rawAd.type || rawAd.media_type || "image";
  const title = rawAd.title || rawAd.name || "Advertisement";
  const destinationUrl = rawAd.url || rawAd.click_url || "#";
  const target = rawAd.target || (rawAd.open_in_new_tab ? "_blank" : "_blank");
  const ctaText = rawAd.cta || rawAd.button_text || "";

  const imageUrl = rawAd.image || rawAd.image_url;
  const videoUrl = rawAd.video || rawAd.video_url;
  const videoThumbnail = rawAd.thumbnail || rawAd.video_thumbnail;
  const htmlCode = rawAd.html || rawAd.html_code;
  const textContent = rawAd.text || rawAd.text_content;

  const adRef = useAdImpression({
    adId,
  });

  const advertisementHook = useAdvertisementHooks();
  const trackAdClick = advertisementHook.useTrackPublicAdClick();

  const handleAdClick = () => {
    if (!adId) return;
    trackAdClick.mutate(adId, {
      onError: (e: any) => {
        console.warn("Click tracking error:", e);
      },
    });
  };

  const fitClass =
    objectFit === "fill"
      ? "object-fill"
      : objectFit === "contain"
      ? "object-contain"
      : "object-cover";

  return (
    <div
      ref={adRef}
      className={`h-full w-full flex flex-col overflow-hidden ${className}`}
    >
      <a
        href={destinationUrl}
        target={target}
        rel="noopener noreferrer"
        onClick={handleAdClick}
        className="h-full w-full flex flex-col justify-center items-center group block"
      >
        {adType === "image" && imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className={`h-full w-full ${fitClass} rounded-md transition-opacity duration-200 group-hover:opacity-95 block`}
          />
        ) : adType === "video" && videoUrl ? (
          <video
            src={videoUrl}
            poster={videoThumbnail || undefined}
            autoPlay
            muted
            loop
            playsInline
            disablePictureInPicture
            className={`h-full w-full ${fitClass} rounded-md block`}
          />
        ) : adType === "text" && textContent ? (
          <div className="bg-slate-50 border border-slate-200 p-4 h-full w-full rounded-md flex flex-col items-center justify-center text-center gap-2">
            <p className="text-xs font-semibold text-slate-800 leading-snug">
              {textContent}
            </p>
            {ctaText && (
              <span className="px-3 py-1 rounded bg-[var(--color-primary)] text-white text-[11px] font-bold">
                {ctaText}
              </span>
            )}
          </div>
        ) : adType === "html" && htmlCode ? (
          <div className="w-full h-full">
            <HtmlAd html={htmlCode} />
          </div>
        ) : null}
      </a>
    </div>
  );
}

export default SidebarAdvertisement;
