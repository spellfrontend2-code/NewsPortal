import { inputStyle } from "@/components/shared/styles/inputStyle";
import SelectMediaDialogBox from "@/features/media/components/SelectMediaDialogBox";
import {
  Image as ImageIcon,
  CodeXml,
  FileType,
  Upload,
  Video,
  X,
} from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const mediaTypeStyle = `
  flex items-center justify-center cursor-pointer font-semibold gap-3
  border-2 rounded-md p-3 w-1/3
  hover:text-[var(--color-primary)]
  hover:border-[var(--color-primary)]
`;
function AdvertisementTypeInfo({ setUploadOpen, setUploadType }) {
  const advertisementTypes = [
    {
      name: "Image",
      value: "image",
      icon: ImageIcon,
    },
    {
      name: "Video",
      value: "video",
      icon: Video,
    },
    {
      name: "HTML",
      value: "html",
      icon: CodeXml,
    },
    {
      name: "Text",
      value: "text",
      icon: FileType,
    },
    {
      name:"Native",
      value:"native",
      icon:Upload
    }
  ];
  const { register, watch, setValue,control,formState:{errors} } = useFormContext();
  const adType = watch("ad_type");
  const imageUrl = watch("image_url");
  const videoUrl = watch("video_url");
  const videoThumbnail = watch("video_thumbnail");
  const placement = watch("placement");
  const [mediaDialog, setMediaDialog] = useState<{
    open: boolean;
    fileType: "image" | "video";
    field: "image_url" | "video_url" | "video_thumbnail" | null;
  }>({
    open: false,
    fileType: "image",
    field: null,
  });
  const placements = [
    { name: "header_banner",size:"1200 x 120" },
    { name: "footer_banner",size:"1200 x 120" },
    { name: "sidebar",size:"300x250" },
    { name: "in_article_top",size:"800 x 150" },
    { name: "in_article_middle",size:"800 x 150" },
    { name: "in_article_bottom",size:"800 x 150" },
    { name: "between_articles",size:"800 x 150" },
    { name: "popup",size:"300 x 250" },
    { name: "native_feed",size:"300 x 250" },
  ];
  const recommendedSize=placements.find((p) => p.name === placement)?.size
  return (
    <div className="flex flex-col gap-3 mt-3">
            {/* PLACEMENT */}
      <div>
        <label className="font-semibold text-gray-600">Placement</label>
        <Controller
          name="placement"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className={`${inputStyle} py-5 text-base`}>
                <SelectValue placeholder="Select a placement" />
              </SelectTrigger>

              <SelectContent className="bg-white">
                {placements.map((placement) => (
                  <SelectItem key={placement.name} value={placement.name}>
                    {placement.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>
      <div className="flex flex-col gap-3">
        <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
          Media Type
        </label>

        <div className="flex gap-3">
          {advertisementTypes.map((advertisementType) => (
            <div
              className={`${mediaTypeStyle} ${
                adType === advertisementType.value
                  ? "text-[var(--color-primary)] border-[var(--color-primary)] bg-[rgb(var(--color-primary-rgb)/0.1)]"
                  : "text-[rgb(var(--color-secondary-rgb)/0.7)] border-[rgb(var(--color-secondary-rgb)/0.2)]"
              }`}
              onClick={() => setValue("ad_type", advertisementType.value)}
            >
              <advertisementType.icon size={20} />
              {advertisementType.name}
            </div>
          ))}
        </div>

        {/* Media */}
        <div className="grid grid-cols-2 gap-5">
          {/* Featured Image */}
          {adType === "image" && (
            <div className="flex flex-col gap-3">
              <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
                Featured Image
              </label>

              <div className="h-[200px] w-full rounded-xl border-2 border-[rgb(var(--color-secondary-rgb)/0.7)] hover:border-[var(--color-primary)] border-dashed bg-[rgb(var(--color-secondary-rgb)/0.1)] flex items-center justify-center">
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
                    className="h-full w-full flex flex-col items-center justify-center cursor-pointer gap-3"
                    onClick={() =>
                      setMediaDialog({
                        open: true,
                        fileType: "image",
                        field: "image_url",
                      })
                    }
                  >
                    <div className="flex items-center justify-center w-10 h-10 bg-[rgb(var(--color-primary-rgb)/0.4)] rounded-lg">
                      <Upload
                        color="var(--color-primary)"
                        strokeWidth={1.5}
                        size={30}
                      />
                    </div>
                    <p className="text-sm text-[rgb(var(--color-secondary-rgb)/0.7)]">
                      Click to choose from media gallery
                    </p>
                    <p className="text-sm text-[rgb(var(--color-secondary-rgb)/0.7)]">
                      Recommended  {recommendedSize} for {placement} placement
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Thumbnail */}
          {(adType === "video" ) && (
            <div className="flex flex-col gap-3">
              <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
                Thumbnail
              </label>

              <div className="h-[200px] w-full rounded-xl border-2 border-[rgb(var(--color-secondary-rgb)/0.7)] hover:border-[var(--color-primary)] border-dashed bg-[rgb(var(--color-secondary-rgb)/0.1)] flex items-center justify-center">
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
                    className="flex flex-col gap-3 h-full w-full flex items-center justify-center cursor-pointer"
                    onClick={() =>
                      setMediaDialog({
                        open: true,
                        fileType: "image",
                        field: "video_thumbnail",
                      })
                    }
                  >
                    <div className="flex items-center justify-center w-10 h-10 bg-[rgb(var(--color-primary-rgb)/0.4)] rounded-lg">
                      <Upload
                        color="var(--color-primary)"
                        strokeWidth={1.5}
                        size={30}
                      />
                    </div>
                    <p className="text-sm text-[rgb(var(--color-secondary-rgb)/0.7)]">
                      Click to choose from media gallery.
                    </p>
                     <p className="text-sm text-[rgb(var(--color-secondary-rgb)/0.7)]">
                      Recommended  {recommendedSize} for {placement} placement  
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Video */}
          {adType === "video" && (
            <div className="flex flex-col gap-3">
              <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
                Video
              </label>

              <div className="h-[200px] w-full rounded-xl border-2 border-[rgb(var(--color-secondary-rgb)/0.7)] hover:border-[var(--color-primary)] border-dashed bg-[rgb(var(--color-secondary-rgb)/0.1)] flex items-center justify-center">
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
                    className="flex flex-col gap-3 h-full w-full flex items-center justify-center cursor-pointer"
                    onClick={() =>
                      setMediaDialog({
                        open: true,
                        fileType: "video",
                        field: "video_url",
                      })
                    }
                  >
                    <div className="flex items-center justify-center w-10 h-10 bg-[rgb(var(--color-primary-rgb)/0.4)] rounded-lg">
                      <Upload
                        color="var(--color-primary)"
                        strokeWidth={1.5}
                        size={30}
                      />
                    </div>
                    <p className="text-sm text-[rgb(var(--color-secondary-rgb)/0.7)]">
                      Click to choose from media gallery.
                    </p>
                     <p className="text-sm text-[rgb(var(--color-secondary-rgb)/0.7)]">
                      Recommended  {recommendedSize} for {placement} placement
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
          {/* HTML */}
          {adType === "html" && (
            <div className="flex flex-col gap-3">
              <label className="font-semibold text-gray-600">HTML Code</label>
              <textarea {...register("html_code")} className={inputStyle} />
            </div>
          )}

          {/* TEXT CONTENT */}
          {adType === "text" && (
            <div className="flex flex-col gap-3">
              <label className="font-semibold text-gray-600">
                Text Content
              </label>
              <textarea {...register("text_content")} className={inputStyle} />
            </div>
          )}

          {
            adType==="native" && (
              <div className="flex flex-col gap-3">
                <label className="font-semibold text-gray-600">
                   Text Content
                </label>
          <textarea {...register("text_content")} className={`${inputStyle} h-[200px]`} />
              </div>
              
            )
          }
           {adType === "native" && (
            <div className="flex flex-col gap-3">
              <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
                Featured Image
              </label>

              <div className="h-[200px] w-full rounded-xl border-2 border-[rgb(var(--color-secondary-rgb)/0.7)] hover:border-[var(--color-primary)] border-dashed bg-[rgb(var(--color-secondary-rgb)/0.1)] flex items-center justify-center">
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
                    className="h-full w-full flex flex-col items-center justify-center cursor-pointer gap-3"
                    onClick={() =>
                      setMediaDialog({
                        open: true,
                        fileType: "image",
                        field: "image_url",
                      })
                    }
                  >
                    <div className="flex items-center justify-center w-10 h-10 bg-[rgb(var(--color-primary-rgb)/0.4)] rounded-lg">
                      <Upload
                        color="var(--color-primary)"
                        strokeWidth={1.5}
                        size={30}
                      />
                    </div>
                    <p className="text-sm text-[rgb(var(--color-secondary-rgb)/0.7)]">
                      Click to choose from media gallery
                    </p>
                    <p className="text-sm text-[rgb(var(--color-secondary-rgb)/0.7)]">
                      Recommended  {recommendedSize} for {placement} placement
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
           {
            adType==="native" && (
              <div className="flex flex-col gap-3">
                <label className="font-semibold text-gray-600">
                  CTA Text 
                </label>
          <input {...register("cta_text")} className={inputStyle} />
              </div>
              
            )
          }
        </div>

        {/* Caption */}
        <div className="flex flex-col gap-3">
          <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
            Media Caption
          </label>

          <input {...register("media_caption")} className={inputStyle} />
        </div>

        {/* Single Media Dialog */}
        <SelectMediaDialogBox
          setUploadType={setUploadType}
          setUploadOpen={setUploadOpen}
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
          module="advertisements"
        />
      </div>
    </div>
  );
}
export default AdvertisementTypeInfo;
