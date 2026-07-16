import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, X } from "lucide-react";
import { inputStyle } from "@/components/shared/styles/inputStyle";
import SelectMediaDialogBox from "@/features/media/components/SelectMediaDialogBox";

function ArticleMediaSection() {
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
      {/* Media Type */}
      <div>
        <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
          Media Type
        </label>

        <Controller
          control={control}
          name="media_type"
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={(val) => {
                field.onChange(val);
                setValue("featured_image", "");
                setValue("thumbnail", "");
                setValue("video_url", "");
                setValue("youtube_url", "");
              }}
            >
              <SelectTrigger className={inputStyle}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="image">Image</SelectItem>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="youtube">YouTube</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {/* Media */}
      <div className="grid grid-cols-2 gap-5">
        {/* Featured Image */}
        {media_type === "image" && (
          <div>
            <label>Featured Image</label>

            <div className="h-[200px] w-[200px] rounded-xl border-2 border-[var(--color-primary)] bg-[rgb(var(--color-primary-rgb)/0.1)] flex items-center justify-center">
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
                  className="h-full w-full flex items-center justify-center cursor-pointer"
                  onClick={() =>
                    setMediaDialog({
                      open: true,
                      fileType: "image",
                      field: "featured_image",
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

        {/* Thumbnail */}
        {(media_type === "video" || media_type === "youtube") && (
          <div>
            <label>Thumbnail</label>

            <div className="h-[200px] w-[200px] rounded-xl border-2 border-[var(--color-primary)] bg-[rgb(var(--color-primary-rgb)/0.1)] flex items-center justify-center">
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
                  className="h-full w-full flex items-center justify-center cursor-pointer"
                  onClick={() =>
                    setMediaDialog({
                      open: true,
                      fileType: "image",
                      field: "thumbnail",
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

        {/* YouTube */}
        {media_type === "youtube" && (
          <div>
            <label>YouTube URL</label>

            <input {...register("youtube_url")} className={inputStyle} />
          </div>
        )}

        {/* Video */}
        {media_type === "video" && (
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
      </div>

      {/* Caption */}
      <div>
        <label>Media Caption</label>

        <input {...register("media_caption")} className={inputStyle} />
      </div>

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
  );
}

export default ArticleMediaSection;
