import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { inputStyle } from "@/components/shared/styles/inputStyle";
import SelectMediaDialogBox from "@/features/media/components/SelectMediaDialogBox";
import {
  Image as ImageIcon,
  Video as VideoIcon,
  CodeXml,
  FileType,
  Upload,
  X,
  Asterisk,
} from "lucide-react";
import type { MediaType } from "../../types/advertisement";

interface Props {
  setUploadOpen: (open: boolean) => void;
  setUploadType: (type: "image" | "video") => void;
}

const mediaTypeStyle = `
  flex items-center justify-center cursor-pointer font-semibold gap-2
  border-2 rounded-md p-3 w-1/4
  hover:text-[var(--color-primary)]
  hover:border-[var(--color-primary)]
`;

export default function AdvertisementCreativeBlock({
  setUploadOpen,
  setUploadType,
}: Props) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const mediaType: MediaType = watch("media_type") || "image";
  const imageUrl = watch("image_url");
  const videoUrl = watch("video_url");
  const videoThumbnail = watch("video_thumbnail");

  const [mediaDialog, setMediaDialog] = useState<{
    open: boolean;
    fileType: "image" | "video";
    field: "image_url" | "video_url" | "video_thumbnail" | null;
  }>({
    open: false,
    fileType: "image",
    field: null,
  });

  const handleMediaTypeChange = (newType: MediaType) => {
    setValue("media_type", newType, { shouldValidate: true, shouldDirty: true });
    if (newType === "image") {
      setValue("video_url", null);
      setValue("video_thumbnail", null);
      setValue("html_code", "");
      setValue("text_content", "");
    } else if (newType === "video") {
      setValue("image_url", null);
      setValue("html_code", "");
      setValue("text_content", "");
    } else if (newType === "html") {
      setValue("image_url", null);
      setValue("video_url", null);
      setValue("video_thumbnail", null);
      setValue("text_content", "");
    } else if (newType === "text") {
      setValue("image_url", null);
      setValue("video_url", null);
      setValue("video_thumbnail", null);
      setValue("html_code", "");
    }
  };

  const getMediaSrc = (val: any) => {
    if (!val) return "";
    if (typeof val === "string") return val;
    return val.file_url || val.file_path || "";
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="border-b pb-2">
        <p className="font-bold text-lg text-[var(--color-primary)]">
          Ad Creative Information
        </p>
      </div>

      {/* Name and Advertiser Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="flex items-center gap-1 font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
            Advertisement Name
            <Asterisk className="text-red-500" size={12} />
          </label>
          <input
            {...register("name", { required: "Advertisement name is required" })}
            placeholder="e.g. Summer Campaign Banner"
            className={`${inputStyle} ${errors.name ? "border-red-500" : ""}`}
          />
          {errors.name && (
            <p className="text-xs text-red-500 mt-1">
              {errors.name.message as string}
            </p>
          )}
        </div>

        <div>
          <label className="flex items-center gap-1 font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
            Advertiser / Brand Name
            <Asterisk className="text-red-500" size={12} />
          </label>
          <input
            {...register("advertiser_name", {
              required: "Advertiser name is required",
            })}
            placeholder="e.g. Himalayan Enterprises"
            className={`${inputStyle} ${
              errors.advertiser_name ? "border-red-500" : ""
            }`}
          />
          {errors.advertiser_name && (
            <p className="text-xs text-red-500 mt-1">
              {errors.advertiser_name.message as string}
            </p>
          )}
        </div>
      </div>

      {/* Media Type Selector */}
      <div className="flex flex-col gap-2">
        <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
          Media Type
        </label>
        <div className="flex gap-3">
          <div
            className={`${mediaTypeStyle} ${
              mediaType === "image"
                ? "text-[var(--color-primary)] border-[var(--color-primary)] bg-[rgb(var(--color-primary-rgb)/0.1)]"
                : "text-[rgb(var(--color-secondary-rgb)/0.7)] border-[rgb(var(--color-secondary-rgb)/0.2)]"
            }`}
            onClick={() => handleMediaTypeChange("image")}
          >
            <ImageIcon size={18} />
            Image
          </div>

          <div
            className={`${mediaTypeStyle} ${
              mediaType === "video"
                ? "text-[var(--color-primary)] border-[var(--color-primary)] bg-[rgb(var(--color-primary-rgb)/0.1)]"
                : "text-[rgb(var(--color-secondary-rgb)/0.7)] border-[rgb(var(--color-secondary-rgb)/0.2)]"
            }`}
            onClick={() => handleMediaTypeChange("video")}
          >
            <VideoIcon size={18} />
            Video
          </div>

          <div
            className={`${mediaTypeStyle} ${
              mediaType === "html"
                ? "text-[var(--color-primary)] border-[var(--color-primary)] bg-[rgb(var(--color-primary-rgb)/0.1)]"
                : "text-[rgb(var(--color-secondary-rgb)/0.7)] border-[rgb(var(--color-secondary-rgb)/0.2)]"
            }`}
            onClick={() => handleMediaTypeChange("html")}
          >
            <CodeXml size={18} />
            HTML
          </div>

          <div
            className={`${mediaTypeStyle} ${
              mediaType === "text"
                ? "text-[var(--color-primary)] border-[var(--color-primary)] bg-[rgb(var(--color-primary-rgb)/0.1)]"
                : "text-[rgb(var(--color-secondary-rgb)/0.7)] border-[rgb(var(--color-secondary-rgb)/0.2)]"
            }`}
            onClick={() => handleMediaTypeChange("text")}
          >
            <FileType size={18} />
            Text Link
          </div>
        </div>
      </div>

      {/* Media Type Specific Uploads & Inputs */}
      {mediaType === "image" && (
        <div>
          <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
            Banner Image
          </label>
          <div className="h-[200px] w-full rounded-xl border-2 border-[rgb(var(--color-secondary-rgb)/0.7)] hover:border-[var(--color-primary)] border-dashed bg-[rgb(var(--color-secondary-rgb)/0.1)] flex items-center justify-center">
            {imageUrl ? (
              <div className="relative h-full w-full">
                <img
                  src={getMediaSrc(imageUrl)}
                  alt="Ad Banner Preview"
                  className="h-full w-full rounded-xl object-contain p-2"
                />
                <button
                  type="button"
                  onClick={() => setValue("image_url", null, { shouldDirty: true })}
                  className="absolute top-2 right-2 h-8 w-8 rounded-md bg-gray-200 hover:bg-gray-100 flex items-center justify-center"
                >
                  <X className="text-red-500" size={18} />
                </button>
              </div>
            ) : (
              <div
                className="h-full w-full flex flex-col items-center justify-center cursor-pointer gap-2"
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
                    size={24}
                  />
                </div>
                <p className="text-sm text-[rgb(var(--color-secondary-rgb)/0.7)]">
                  Click to select banner image from media gallery.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {mediaType === "video" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
              Video File
            </label>
            <div className="h-[200px] w-full rounded-xl border-2 border-[rgb(var(--color-secondary-rgb)/0.7)] hover:border-[var(--color-primary)] border-dashed bg-[rgb(var(--color-secondary-rgb)/0.1)] flex items-center justify-center">
              {videoUrl ? (
                <div className="relative h-full w-full">
                  <video
                    src={getMediaSrc(videoUrl)}
                    controls
                    className="h-full w-full rounded-xl object-contain p-2"
                  />
                  <button
                    type="button"
                    onClick={() => setValue("video_url", null, { shouldDirty: true })}
                    className="absolute top-2 right-2 h-8 w-8 rounded-md bg-gray-200 hover:bg-gray-100 flex items-center justify-center"
                  >
                    <X className="text-red-500" size={18} />
                  </button>
                </div>
              ) : (
                <div
                  className="h-full w-full flex flex-col items-center justify-center cursor-pointer gap-2"
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
                      size={24}
                    />
                  </div>
                  <p className="text-sm text-[rgb(var(--color-secondary-rgb)/0.7)]">
                    Click to select video from media gallery.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
              Video Thumbnail
            </label>
            <div className="h-[200px] w-full rounded-xl border-2 border-[rgb(var(--color-secondary-rgb)/0.7)] hover:border-[var(--color-primary)] border-dashed bg-[rgb(var(--color-secondary-rgb)/0.1)] flex items-center justify-center">
              {videoThumbnail ? (
                <div className="relative h-full w-full">
                  <img
                    src={getMediaSrc(videoThumbnail)}
                    alt="Thumbnail Preview"
                    className="h-full w-full rounded-xl object-contain p-2"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setValue("video_thumbnail", null, { shouldDirty: true })
                    }
                    className="absolute top-2 right-2 h-8 w-8 rounded-md bg-gray-200 hover:bg-gray-100 flex items-center justify-center"
                  >
                    <X className="text-red-500" size={18} />
                  </button>
                </div>
              ) : (
                <div
                  className="h-full w-full flex flex-col items-center justify-center cursor-pointer gap-2"
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
                      size={24}
                    />
                  </div>
                  <p className="text-sm text-[rgb(var(--color-secondary-rgb)/0.7)]">
                    Click to select poster/thumbnail.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {mediaType === "html" && (
        <div>
          <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
            Custom HTML / Embed Snippet
          </label>
          <textarea
            rows={5}
            {...register("html_code")}
            placeholder="<a href='...'><img src='...' /></a>"
            className={`${inputStyle} font-mono text-sm`}
          />
        </div>
      )}

      {mediaType === "text" && (
        <div>
          <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
            Ad Text Content
          </label>
          <textarea
            rows={3}
            {...register("text_content")}
            placeholder="Enter promotional copy or announcement text..."
            className={inputStyle}
          />
        </div>
      )}

      {/* Click Destination URL and Button Text */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
            Click Destination URL
          </label>
          <input
            {...register("click_url")}
            placeholder="https://example.com/landing-page"
            className={inputStyle}
          />
        </div>

        <div>
          <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
            Button Text (CTA)
          </label>
          <input
            {...register("button_text")}
            placeholder="e.g. Learn More, Order Now"
            className={inputStyle}
          />
        </div>
      </div>

      {/* Media Selection Dialog */}
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
            setValue(mediaDialog.field, media, {
              shouldDirty: true,
              shouldValidate: true,
            });
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
  );
}
