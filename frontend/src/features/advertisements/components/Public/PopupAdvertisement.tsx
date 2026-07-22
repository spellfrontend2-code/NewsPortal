import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import SidebarAdvertisement from "./SidebarAdvertisement";

function PopupAdvertisement({advertisements,showPopup,setShowPopup}:any)
{
 return (
          <Dialog open={showPopup} onOpenChange={setShowPopup}>
        <DialogContent
          className=" 
    flex justify-center items-center !max-w-none p-10 h-[100%] !max-w-[100vw] overflow-y-auto bg-gray-200/50 scrollbar-thin scrollbar-thumb-[var(--color-secondary)]"
        >
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