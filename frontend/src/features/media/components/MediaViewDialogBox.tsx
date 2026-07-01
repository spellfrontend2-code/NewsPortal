import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

function MediaViewDialogBox({ open, onOpenChange, media }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col  !max-w-none p-10 max-h-[80vh] !max-w-[50vw] overflow-y-auto bg-gray-100 scrollbar-thin scrollbar-thumb-[var(--color-secondary)]">
        <DialogHeader>
          <DialogTitle className="flex justify-between h-1/2  gap-2 items-center text-lg text-[var(--color-primary)] font-semibold">
           <p>{media?.file_name}</p>
           <p className="bg-[var(--color-primary)] px-2 py-1 rounded-full text-white text-base">{media?.category}</p>
          </DialogTitle>
        </DialogHeader>
        <div className="flex justify-center items-center w-full h-[400px] border border-[var(--color-secondary)] rounded-md overflow-hidden">
            {media?.file_type === "video" ? <video src={media?.file_url} controls autoPlay/> : <img src={media?.file_url} alt="" className="h-full w-full" />}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default MediaViewDialogBox;