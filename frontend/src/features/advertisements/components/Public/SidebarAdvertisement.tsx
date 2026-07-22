import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAdvertisementHooks } from "../../hooks/useAdvertisements";
import { toast } from "sonner";

function HtmlAd({ html }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const responsiveHtml = html
    .replace(/width\s*:\s*[^;]+;?/gi, "width:100%;")
    .replace(/height\s*:\s*[^;]+;?/gi, "height:100%;");
  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;

    const container = containerRef.current;
    const content = contentRef.current;

    requestAnimationFrame(() => {
      const scaleX = container.clientWidth / content.scrollWidth;
      const scaleY = container.clientHeight / content.scrollHeight;

      const scale = Math.min(scaleX, scaleY);

      content.style.transform = `scale(${scale})`;
      content.style.transformOrigin = "top left";
    });
  }, [html]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-hidden"
    >
      <div
        ref={contentRef}
        className="w-fit h-fit"
      >
        <div
          dangerouslySetInnerHTML={{
            __html: responsiveHtml,
          }}
        />
      </div>
    </div>
  );
}


function SidebarAdvertisement({ Ads }) {
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
    <div className="h-full w-full flex flex-col gap-2 overflow-hidden">
      {Ads?.map((ad, index) => (
        <Link
          key={ad?.id ?? index}
          to={ad?.url || "#"}
          target={ad?.target}
          className="h-full w-full cursor-pointer"
          onClick={()=>handleAdClick(ad?.id)}
        >
          {ad?.type === "image" ? (
            <img
              src={ad?.image}
              alt={ad?.title}
              className="h-full w-full object-fill"
            />
          ) : ad?.type === "video" ? (
            <video
              src={ad?.video}
              autoPlay
              muted
              playsInline
              disablePictureInPicture
              loop
              className="h-full w-full object-fill"
            />
          ) : ad?.type === "text" ? (
            <div className="bg-gray-100 h-full w-full">
              {ad?.text}
            </div>
          ) : ad?.type === "html" ? (
            <HtmlAd html={ad?.html} />
          ) : null}
        </Link>
      ))}
    </div>
  );
}

export default SidebarAdvertisement;