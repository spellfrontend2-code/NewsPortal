import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import InputTags from "@/features/tags/components/InputTags";

const inputStyle =
  "border border-[var(--color-secondary)] px-2 py-1 rounded-md w-full focus:outline-none";

function AddArticle({
  open,
  setOpen,
  categories,
  tags,
}: any) {
  const {
    register,
    handleSubmit,
    control,
  } = useForm({
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      media_type: "image",
      featured_image: "",
      thumbnail: "",
      youtube_url: "",
      video_url: "",
      media_caption: "",
      is_headline_news: false,
      headline_display_type: "image",
      headline_order: 1,
      status: "draft",
      scheduled_for: "",
      meta_title: "",
      meta_description: "",
      canonical_url: "",
      city_focus: "",
      target_countries: [],
      category_ids: [],
      tag_ids: [],
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
    // mutation here
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="!max-w-[60vw] p-10 max-h-[90vh] overflow-y-auto bg-white">
        <div className="flex flex-col gap-8">
          <div>
            <p className="text-2xl font-bold text-[var(--color-primary)]">
              Add Article
            </p>
            <p className="text-sm text-[rgb(var(--color-gray-rgb)/0.7)]">
              Create a new article.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            {/* Title */}
            <div>
              <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
                Title
              </label>
              <input
                {...register("title")}
                className={inputStyle}
              />
            </div>


            {/* Excerpt */}
            <div>
              <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
                Excerpt
              </label>
              <textarea
                rows={4}
                {...register("excerpt")}
                className={inputStyle}
              />
            </div>

            {/* Content */}
            <div>
              <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
                Content
              </label>
              <textarea
                rows={10}
                {...register("content")}
                className={inputStyle}
              />
            </div>

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
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className={inputStyle}>
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="image">
                        Image
                      </SelectItem>

                      <SelectItem value="video">
                        Video
                      </SelectItem>

                      <SelectItem value="youtube">
                        YouTube
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* Images */}

            <div className="grid grid-cols-2 gap-5">
              <div>
                <label>Featured Image</label>
                <input
                  {...register("featured_image")}
                  className={inputStyle}
                />
              </div>

              <div>
                <label>Thumbnail</label>
                <input
                  {...register("thumbnail")}
                  className={inputStyle}
                />
              </div>
            </div>

            {/* Video */}

            <div className="grid grid-cols-2 gap-5">
              <div>
                <label>YouTube URL</label>
                <input
                  {...register("youtube_url")}
                  className={inputStyle}
                />
              </div>

              <div>
                <label>Video URL</label>
                <input
                  {...register("video_url")}
                  className={inputStyle}
                />
              </div>
            </div>

            {/* Caption */}

            <div>
              <label>Media Caption</label>
              <input
                {...register("media_caption")}
                className={inputStyle}
              />
            </div>

            {/* Headline */}

            <div className="grid grid-cols-3 gap-5">
              <div className="flex items-center gap-2 mt-7">
                <input
                  type="checkbox"
                  {...register("is_headline_news")}
                />

                <label>Headline News</label>
              </div>

              <div>
                <label>Headline Display</label>

                <Controller
                  control={control}
                  name="headline_display_type"
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className={inputStyle}>
                        <SelectValue />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="image">
                          Image
                        </SelectItem>

                        <SelectItem value="text">
                          Text
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div>
                <label>Headline Order</label>

                <input
                  type="number"
                  {...register("headline_order")}
                  className={inputStyle}
                />
              </div>
            </div>

            {/* Status */}

            <div>
              <label>Status</label>

              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className={inputStyle}>
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="draft">
                        Draft
                      </SelectItem>

                      <SelectItem value="pending">
                        Pending
                      </SelectItem>

                      <SelectItem value="published">
                        Published
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* Schedule */}

            <div>
              <label>Schedule Publish</label>

              <input
                type="datetime-local"
                {...register("scheduled_for")}
                className={inputStyle}
              />
            </div>

            {/* SEO */}

            <div>
              <label>Meta Title</label>

              <input
                {...register("meta_title")}
                className={inputStyle}
              />
            </div>

            <div>
              <label>Meta Description</label>

              <textarea
                rows={4}
                {...register("meta_description")}
                className={inputStyle}
              />
            </div>

            <div>
              <label>Canonical URL</label>

              <input
                {...register("canonical_url")}
                className={inputStyle}
              />
            </div>

            {/* Location */}

            <div className="grid grid-cols-2 gap-5">
              <div>
                <label>City Focus</label>

                <input
                  {...register("city_focus")}
                  className={inputStyle}
                />
              </div>

              <div>
                <label>Target Countries (comma separated)</label>

                <input
                  {...register("target_countries")}
                  className={inputStyle}
                />
              </div>
            </div>

            {/* Categories */}

            <div>
              <label>Categories</label>

              <select
                multiple
                {...register("category_ids")}
                className={`${inputStyle} h-40`}
              >
                {categories?.map((c: any) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Tags */}

            <div>
              <label>Tags</label>

              <InputTags/>
            </div>

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>

              <Button type="submit" variant="submit">
                Add Article
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddArticle;