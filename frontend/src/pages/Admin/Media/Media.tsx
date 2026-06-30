import { Button } from "@/components/ui/button";
import UploadDialogBox from "@/features/media/components/UploadDialogBox";
import { useMediaHooks } from "@/features/media/hooks/useMedia";
import { Plus } from "lucide-react";
import { useState } from "react";

function Media() {
  const [openUpload, setOpenUpload] = useState(false);
  const mediaHooks = useMediaHooks();
  const { data } = mediaHooks.useFetchMedia();
  const media = data?.data ?? [];
  return (
    <div className="w-full h-full p-20 flex flex-col gap-5">
      <div className="flex justify-between">
        <p className="text-4xl font-bold text-[var(--color-primary)] text-center">
          Media Gallery
        </p>
        <Button
          variant="submit"
          className="mt-5"
          onClick={() => {
            setOpenUpload(true);
          }}
        >
          <Plus />
          Upload Files
        </Button>
      </div>
      <div className="w-full h-full flex justify-center items-center">
        <div className="border border-[var(--color-secondary)] w-full h-full rounded-xl p-5">
          {media.length > 0 ? (
            <div className="grid grid-cols-5 gap-3">
              {media.map((m, index) => (
                <div className="h-full w-full border border-[var(--color-secondary)] rounded-xl cursor-pointer hover:scale-105 transition-all duration-300">
                  <div
                    className=" w-full h-2/3 flex justify-center items-center "
                    key={index}
                  >
                    <img src={m.file_url} className="w-full h-full" />
                  </div>
                  <div className="h-1/3 bg-[var(--color-secondary)] text-white p-2 w-full rounded-b-xl">
                    {m.file_name}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full h-full flex justify-center items-center text-2xl font-bold text-[var(--color-primary)]">
              No Media Found
            </div>
          )}
        </div>
      </div>
      <UploadDialogBox openUpload={openUpload} setOpenUpload={setOpenUpload} />
    </div>
  );
}
export default Media;
