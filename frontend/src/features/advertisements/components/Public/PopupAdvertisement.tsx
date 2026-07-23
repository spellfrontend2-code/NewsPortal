import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import SidebarAdvertisement from "./SidebarAdvertisement";
import { useEffect, useRef } from "react";
import { useAdvertisementHooks } from "../../hooks/useAdvertisements";
import { toast } from "sonner";

function PopupAdvertisement({advertisements,showPopup,setShowPopup}:any)
{
    const tracked = useRef(false);
 const advertisementHook=useAdvertisementHooks();
 const trackAdImpression=advertisementHook.useTrackPublicAdImpression();
  useEffect(() => {
    if (showPopup && advertisements?.id && !tracked.current) {
      tracked.current = true;
      trackAdImpression.mutate(advertisements.id,{
        onSuccess: (res) => {
toast.success(res?.message||"Impression tracked successfully");
        },
      });
    }
  }, [showPopup, advertisements?.id]);

  useEffect(() => {
    tracked.current = false;
  }, [advertisements?.id]);
 return (
          <Dialog open={showPopup} onOpenChange={setShowPopup}>
        <DialogContent
          className=" 
    flex justify-center items-center !max-w-none p-10 h-[100%] !max-w-[100vw] overflow-y-auto bg-gray-200/50 scrollbar-thin scrollbar-thumb-[var(--color-secondary)]"
         showCloseButton={false}>
          <div className=" flex flex-col h-[70%] w-[50%] items-center justify-center">
            <div className="flex justify-between h-[10%] w-full items-center">
              <p className="uppercase tracking-wider font-semibold">Advertisement</p>
              <DialogClose asChild>
              <button className="h-[30px] w-30 rounded-full bg-white  shadow-lg cursor-pointer focus-visible:outline-none">
                <p className=" text-blue-900" >Skip this</p>
              </button>
            </DialogClose></div>
            <div className="h-[90%] w-full"><SidebarAdvertisement Ads={[advertisements]} /></div>
          </div>
        </DialogContent>
      </Dialog>
 )
}
export default PopupAdvertisement