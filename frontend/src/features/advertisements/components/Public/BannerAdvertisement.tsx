import React from "react";
import { useAdvertisementHooks } from "../../hooks/useAdvertisements";
import { useAdImpression } from "../../hooks/useAdImpression";
import HtmlAd from "./HtmlAd";

interface BannerAdvertisementProps {
  Ad?: any;
  item?: any;
  className?: string;
  objectFit?: "cover" | "contain" | "fill";
}

function BannerAdvertisement({
  Ad: propAd,
  item,
  className = "",
  objectFit = "cover",
}: BannerAdvertisementProps) {
  // Normalize Ad data whether passed directly or wrapped in feed item
  const rawAd = item?.data || propAd;
  if (!rawAd) return null;

  const slot = item?.slot || rawAd?.slot || {};

  const adId = rawAd.id;
  const adType = rawAd.type || rawAd.media_type || "image";
  const title = rawAd.title || rawAd.name || "Advertisement";
  const destinationUrl = rawAd.url || rawAd.click_url || "#";
  const target = rawAd.target || (rawAd.open_in_new_tab ? "_blank" : "_blank") || "_blank";
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

  // Dimensions from backend, with slot fallback
  const adWidth = rawAd.width || slot?.width;
  const adHeight = rawAd.height || slot?.height;
  const adMobileWidth = rawAd.mobile_width;
  const adMobileHeight = rawAd.mobile_height;

  // The inner ad is sized by backend dimensions; max-w-full keeps
  // it responsive horizontally, and aspect-ratio keeps the height proportional.
  const innerStyle: React.CSSProperties = {
    ...(adWidth ? { width: "100%", maxWidth: `${adWidth}px` } : { width: "100%" }),
    ...(adHeight ? { height: "auto", maxHeight: `${adHeight}px` } : { height: "100%" }),
    ...(adWidth && adHeight ? { aspectRatio: `${adWidth} / ${adHeight}` } : {}),
  };

  return (
    // Outer: full width/height, centers the fixed-size ad horizontally/vertically
    <div
      ref={adRef}
      className={`w-full h-full flex flex-col items-center justify-center relative ${className}`}
    >
      <a
        href={destinationUrl}
        target={target}
        rel="noopener noreferrer"
        onClick={handleAdClick}
        className="flex items-center justify-center overflow-hidden"
        style={innerStyle}
      >
        {adType === "image" && imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            className={`w-full h-full ${fitClass} rounded-md transition-opacity duration-200 group-hover:opacity-95 block`}
          />
        )}

        {adType === "video" && videoUrl && (
          <video
            src={videoUrl}
            poster={videoThumbnail || undefined}
            autoPlay
            muted
            loop
            playsInline
            disablePictureInPicture
            className={`w-full h-full ${fitClass} rounded-md block`}
          />
        )}

        {adType === "html" && htmlCode && (
          <div className="w-full h-full">
            <HtmlAd html={htmlCode} />
          </div>
        )}

        {adType === "text" && textContent && (
          <div className="w-full h-full p-4 rounded-md bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-800">
            <p className="text-sm font-medium leading-relaxed">{textContent}</p>
            {ctaText && (
              <span className="px-4 py-1.5 rounded-lg bg-[var(--color-primary)] text-white text-xs font-semibold shrink-0 group-hover:opacity-90 transition-opacity">
                {ctaText}
              </span>
            )}
          </div>
        )}
      </a>
    </div>
  );
}

export default BannerAdvertisement;
