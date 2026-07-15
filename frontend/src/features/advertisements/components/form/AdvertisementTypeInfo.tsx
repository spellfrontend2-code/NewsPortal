import { useFormContext } from "react-hook-form";
import { inputStyle } from "../../../../components/shared/styles/inputStyle";
import { useState } from "react";
import { Upload, X } from "lucide-react";
import SelectMediaDialogBox from "@/features/media/components/SelectMediaDialogBox";

function AdvertisementTypeInfo()
{
    const { register,watch,setValue } = useFormContext();
    const adType = watch("ad_type");
    const imageUrl=watch("image_url");
    const videoUrl=watch("video_url");
    const videoThumbnail=watch("video_thumbnail");
      const [mediaDialog, setMediaDialog] = useState<{
        open: boolean;
        fileType: "image" | "video";
        field: "image_url" |"video_url" |"video_thumbnail"| null;
      }>({
        open: false,
        fileType: "image",
        field: null,
      });
    return (
        <div>

        {/* AD TYPE */}
        <div>
          <label className="font-semibold text-gray-600">Ad Type</label>
          <select {...register("ad_type")} className={inputStyle}>
            <option value="image">Image</option>
            <option value="video">Video</option>
            <option value="html">HTML</option>
            <option value="text">Text</option>
          </select>
        </div>

        {/* IMAGE */}
        {adType === "image" && (
          <div>
            <label>Featured Image</label>

            <div className="h-[200px] w-[200px] rounded-xl border-2 border-[var(--color-primary)] bg-[rgb(var(--color-primary-rgb)/0.1)] flex items-center justify-center">
              {imageUrl ? (
                <div className="relative h-full w-full">
                  <img
                    src={
                      typeof imageUrl === "string"
                        ? imageUrl
                        : imageUrl.file_url
                    }
                    className="h-full w-full rounded-xl object-cover"
                  />

                  <button
                    type="button"
                    onClick={() => setValue("image_url", "")}
                    className="absolute top-2 right-2 h-8 w-8 rounded-md bg-gray-200 hover:bg-gray-100 flex items-center justify-center"
                  >
                    <X className="text-red-500" size={18} />
                  </button>
                </div>
              ) : (
                <div
                  className="h-full w-full flex items-center justify-center cursor-pointer"
                  onClick={() =>
                    setMediaDialog({
                      open: true,
                      fileType: "image",
                      field: "image_url",
                    })
                  }
                >
                  <Upload
                    color="var(--color-primary)"
                    strokeWidth={1.5}
                    size={50}
                  />
                </div>
              )}
            </div>
          </div>
        )}

       {adType === "video" &&
       <>   <div>
            <label>Thumbnail</label>

            <div className="h-[200px] w-[200px] rounded-xl border-2 border-[var(--color-primary)] bg-[rgb(var(--color-primary-rgb)/0.1)] flex items-center justify-center">
              {videoThumbnail ? (
                <div className="relative h-full w-full">
                  <img
                    src={
                      typeof videoThumbnail === "string"
                        ? videoThumbnail
                        : videoThumbnail.file_url
                    }
                    className="h-full w-full rounded-xl object-cover"
                  />

                  <button
                    type="button"
                    onClick={() => setValue("video_thumbnail", "")}
                    className="absolute top-2 right-2 h-8 w-8 rounded-md bg-gray-200 hover:bg-gray-100 flex items-center justify-center"
                  >
                    <X className="text-red-500" size={18} />
                  </button>
                </div>
              ) : (
                <div
                  className="h-full w-full flex items-center justify-center cursor-pointer"
                  onClick={() =>
                    setMediaDialog({
                      open: true,
                      fileType: "image",
                      field: "video_thumbnail",
                    })
                  }
                >
                  <Upload
                    color="var(--color-primary)"
                    strokeWidth={1.5}
                    size={50}
                  />
                </div>
              )}
            </div>
          </div></>}
  {adType === "video" && (
          <div>
            <label>Video</label>

            <div className="h-[200px] w-[200px] rounded-xl border-2 border-[var(--color-primary)] bg-[rgb(var(--color-primary-rgb)/0.1)] flex items-center justify-center">
              {videoUrl ? (
                <div className="relative h-full w-full">
                  <video
                    src={
                      typeof videoUrl === "string"
                        ? videoUrl
                        : videoUrl.file_url
                    }
                    className="h-full w-full rounded-xl object-cover"
                    
                  />

                  <button
                    type="button"
                    onClick={() => setValue("video_url", "")}
                    className="absolute top-2 right-2 h-8 w-8 rounded-md bg-gray-200 hover:bg-gray-100 flex items-center justify-center"
                  >
                    <X className="text-red-500" size={18} />
                  </button>
                </div>
              ) : (
                <div
                  className="h-full w-full flex items-center justify-center cursor-pointer"
                  onClick={() =>
                    setMediaDialog({
                      open: true,
                      fileType: "video",
                      field: "video_url",
                    })
                  }
                >
                  <Upload
                    color="var(--color-primary)"
                    strokeWidth={1.5}
                    size={50}
                  />
                </div>
              )}
            </div>
          </div>
        )}
        {/* HTML */}
       {adType === "html" && <div>
          <label className="font-semibold text-gray-600">HTML Code</label>
          <textarea {...register("html_code")} className={inputStyle} />
        </div>}

 {/* TEXT CONTENT */}
        {adType === "text" && <div>
          <label className="font-semibold text-gray-600">Text Content</label>
          <textarea {...register("text_content")} className={inputStyle} />
        </div>}
           {/* Single Media Dialog */}
      <SelectMediaDialogBox
        open={mediaDialog.open}
        onOpenChange={(open) =>
          setMediaDialog((prev) => ({
            ...prev,
            open,
          }))
        }
        file_type={mediaDialog.fileType}
        onSelectMedia={(media) => {
          if (mediaDialog.field) {
            setValue(mediaDialog.field, media);
          }

          setMediaDialog({
            open: false,
            fileType: "image",
            field: null,
          });
        }}
      />
        </div>
    )
}
export default AdvertisementTypeInfo