import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import SidebarAdvertisement from "./SidebarAdvertisement";
import { useEffect, useRef } from "react";
import { useAdvertisementHooks } from "../../hooks/useAdvertisements";


interface PopupAdvertisementProps {
  advertisements: any;
  showPopup: boolean;
  setShowPopup: (show: boolean) => void;
}

function PopupAdvertisement({
  advertisements,
  showPopup,
  setShowPopup,
}: PopupAdvertisementProps) {
  const rawAd = Array.isArray(advertisements)
    ? advertisements[0]
    : advertisements;

  const ad = rawAd?.data || rawAd;
  const tracked = useRef(false);

  const advertisementHook = useAdvertisementHooks();
  const trackAdImpression = advertisementHook.useTrackPublicAdImpression();
  const trackAdClick = advertisementHook.useTrackPublicAdClick();

  const adId = ad?.id;
  
  useEffect(() => {
    if (showPopup && adId && !tracked.current) {
      tracked.current = true;
      trackAdImpression.mutate(adId, {
        onError: (err: any) => console.warn("Impression tracking error:", err),
      });
    }
  }, [showPopup, adId]);

  useEffect(() => {
    tracked.current = false;
  }, [adId]);

  if (!ad || !adId) return null;



  const slot = ad?.slot || {};
  const adWidth = ad?.width || slot?.width || 600;

  return (
    <Dialog open={showPopup} onOpenChange={setShowPopup}>
      <DialogContent
        className=" 
    flex justify-center items-center !max-w-none p-6 sm:p-10 h-[100%] !max-w-[100vw] overflow-y-auto bg-gray-200/50 scrollbar-thin scrollbar-thumb-[var(--color-secondary)]"
        showCloseButton={false}
        onPointerDown={() => setShowPopup(false)}
      >
        <div
          className="flex flex-col w-full max-w-[92vw] sm:max-w-[85vw] items-center justify-center"
          style={{ maxWidth: adWidth ? `${adWidth}px` : "600px" }}
          onPointerDown={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center w-full pb-2">
            <p className="uppercase tracking-wider font-semibold text-xs text-slate-500">
              Advertisement
            </p>
            <DialogClose asChild>
              <button className="h-[30px] px-4 rounded-md bg-white shadow-md hover:shadow-lg cursor-pointer focus-visible:outline-none transition-all">
                <p className="text-blue-900 text-xs font-semibold">Skip this</p>
              </button>
            </DialogClose>
          </div>
          <div className="w-full flex items-center justify-center overflow-hidden rounded-md">
            <SidebarAdvertisement Ad={ad} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
export default PopupAdvertisement;
