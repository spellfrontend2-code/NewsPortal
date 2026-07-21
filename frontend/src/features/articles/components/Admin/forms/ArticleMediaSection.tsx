import { inputStyle } from "@/components/shared/styles/inputStyle";
import SelectMediaDialogBox from "@/features/media/components/SelectMediaDialogBox";
import {
  Image as ImageIcon,
  Monitor,
  Tv,
  Upload,
  Video,
  X,
} from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
const mediaTypeStyle = `
  flex items-center justify-center cursor-pointer font-semibold gap-3
  border-2 rounded-md p-3 w-1/3
  hover:text-[var(--color-primary)]
  hover:border-[var(--color-primary)]
`;
function ArticleMediaSection({ setUploadType, setUploadOpen }) {
  const { register, control, watch, setValue } = useFormContext();
  const media_type = watch("media_type");
  const featuredImage = watch("featured_image");
  const thumbnail = watch("thumbnail");
  const videoUrl = watch("video_url");

  const [mediaDialog, setMediaDialog] = useState<{
    open: boolean;
    fileType: "image" | "video";
    field: "featured_image" | "thumbnail" | "video_url" | null;
  }>({
    open: false,
    fileType: "image",
    field: null,
  });
  return (
    <div className="flex flex-col gap-3 mt-3">
      <div>
        <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
          Media Type
        </label>

        <div className="flex gap-3">
          <div
            className={`${mediaTypeStyle} ${
              media_type === "image"
                ? "text-[var(--color-primary)] border-[var(--color-primary)] bg-[rgb(var(--color-primary-rgb)/0.1)]"
                : "text-[rgb(var(--color-secondary-rgb)/0.7)] border-[rgb(var(--color-secondary-rgb)/0.2)]"
            }`}
            onClick={() => setValue("media_type", "image")}
          >
            <ImageIcon size={20} />
            Image
          </div>

          <div
            className={`${mediaTypeStyle} ${
              media_type === "video"
                ? "text-[var(--color-primary)] border-[var(--color-primary)] bg-[rgb(var(--color-primary-rgb)/0.1)]"
                : "text-[rgb(var(--color-secondary-rgb)/0.7)] border-[rgb(var(--color-secondary-rgb)/0.2)]"
            }`}
            onClick={() => setValue("media_type", "video")}
          >
            <Video size={20} />
            Video
          </div>

          <div
            className={`${mediaTypeStyle} ${
              media_type === "youtube"
                ? "text-[var(--color-primary)] border-[var(--color-primary)] bg-[rgb(var(--color-primary-rgb)/0.1)]"
                : "text-[rgb(var(--color-secondary-rgb)/0.7)] border-[rgb(var(--color-secondary-rgb)/0.2)]"
            }`}
            onClick={() => setValue("media_type", "youtube")}
          >
            <Monitor size={20} />
            Youtube
          </div>
        </div>
      </div>

      {/* Media */}
      <div className="grid grid-cols-2 gap-5">
        {/* Featured Image */}
        {media_type === "image" && (
          <div>
            <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
              Featured Image
            </label>

            <div className="h-[200px] w-full rounded-xl border-2 border-[rgb(var(--color-secondary-rgb)/0.7)] hover:border-[var(--color-primary)] border-dashed bg-[rgb(var(--color-secondary-rgb)/0.1)] flex items-center justify-center">
              {featuredImage ? (
                <div className="relative h-full w-full">
                  <img
                    src={
                      typeof featuredImage === "string"
                        ? featuredImage
                        : featuredImage.file_url
                    }
                    className="h-full w-full rounded-xl object-cover"
                  />

                  <button
                    type="button"
                    onClick={() => setValue("featured_image", "")}
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
                      field: "featured_image",
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
                </div>
              )}
            </div>
          </div>
        )}

        {/* Thumbnail */}
        {(media_type === "video" || media_type === "youtube") && (
          <div>
            <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
              Thumbnail
            </label>

            <div className="h-[200px] w-full rounded-xl border-2 border-[rgb(var(--color-secondary-rgb)/0.7)] hover:border-[var(--color-primary)] border-dashed bg-[rgb(var(--color-secondary-rgb)/0.1)] flex items-center justify-center">
              {thumbnail ? (
                <div className="relative h-full w-full">
                  <img
                    src={
                      typeof thumbnail === "string"
                        ? thumbnail
                        : thumbnail.file_url
                    }
                    className="h-full w-full rounded-xl object-cover"
                  />

                  <button
                    type="button"
                    onClick={() => setValue("thumbnail", "")}
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
                      field: "thumbnail",
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
                </div>
              )}
            </div>
          </div>
        )}

        {/* YouTube */}
        {media_type === "youtube" && (
          <div>
            <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
              YouTube URL
            </label>

            <input {...register("youtube_url")} className={inputStyle} />
          </div>
        )}

        {/* Video */}
        {media_type === "video" && (
          <div>
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
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Caption */}
      <div>
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
        module="articles"
      />
    </div>
  );
}
export default ArticleMediaSection;
