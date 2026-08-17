import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import SidebarAdvertisement from "./SidebarAdvertisement";
import { useEffect, useRef } from "react";
import { useAdvertisementHooks } from "../../hooks/useAdvertisements";

function PopupAdvertisement({ advertisements, showPopup, setShowPopup }: any) {
  const ad = Array.isArray(advertisements) ? advertisements[0] : advertisements;
  const tracked = useRef(false);
  const advertisementHook = useAdvertisementHooks();
  const trackAdImpression = advertisementHook.useTrackPublicAdImpression();

  useEffect(() => {
    if (showPopup && ad?.id && !tracked.current) {
      tracked.current = true;
      trackAdImpression.mutate(ad.id, {
        onSuccess: (res) => {
          // toast.success(res?.message||"Impression tracked successfully");
        },
      });
    }
  }, [showPopup, ad?.id]);

  useEffect(() => {
    tracked.current = false;
  }, [ad?.id]);

  if (!ad || !ad.id) return null;

  return (
    <Dialog open={showPopup} onOpenChange={setShowPopup}>
      <DialogContent
        className=" 
    flex justify-center items-center !max-w-none p-10 h-[100%] !max-w-[100vw] overflow-y-auto bg-gray-200/50 scrollbar-thin scrollbar-thumb-[var(--color-secondary)]"
        showCloseButton={false}  
        onPointerDown={()=>setShowPopup(false)}
      >
        <div className="flex flex-col h-[70%] lg:w-[50%] items-center justify-center">
          <div className="flex justify-between h-[10%] w-full items-center">
            <p className="uppercase tracking-wider font-semibold text-xs text-slate-500">
              Advertisement
            </p>
            <DialogClose asChild>
              <button className="h-[30px] px-4 rounded-md bg-white shadow-lg cursor-pointer focus-visible:outline-none">
                <p className="text-blue-900 text-xs font-semibold">Skip this</p>
              </button>
            </DialogClose>
          </div>
          <div className="h-[90%] w-full" onPointerDown={(e)=>e.stopPropagation()}>
            <SidebarAdvertisement Ad={ad} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
export default PopupAdvertisement;
