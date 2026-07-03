import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TagDropdownInput from "@/features/tags/components/TagDropdownInput";
import CategoryDropdownInput from "@/features/categories/components/CategoryDropdownInput";
import { useEffect, useState } from "react";
import { ArrowLeft, ChartColumnStacked, Tags, Upload, X } from "lucide-react";
import RichTextEditor from "@/components/Admin/richtexteditor/RichTextEditor";
import SelectMediaDialogBox from "@/features/media/components/SelectMediaDialogBox";
import { useArticlesHooks } from "../hooks/useArticles";
import { toast } from "sonner";
import { useCategoriesHooks } from "@/features/categories/hooks/useCategories";
import { useTagsHooks } from "@/features/tags/hooks/useTags";
import { useArticleForm } from "../hooks/useArticleForm";

export const inputStyle =
  "border border-[var(--color-secondary)] px-2 py-1 rounded-md w-full focus:outline-none";

function AddArticle({ open, setOpen, article, type }: any) {
  const CategoriesData = categoriesList?.data ?? [];
  const tagHook = useTagsHooks();
  const { data: tagsList } = tagHook.useFetchTags({ page: 1, per_page: 100 });
  const TagsData = tagsList?.data ?? [];
  const { register, handleSubmit, watch, control, setValue, reset } = useArticleForm(article);
  const media_type = watch("media_type");
  const is_headline_news = watch("is_headline_news");
  const articleHook = useArticlesHooks();
  const addArticle = articleHook.useCreateArticles();
  const updateArticle = articleHook.useUpdateArticles();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const featuredImage = watch("featured_image");
  const videoUrl = watch("video_url");
  const thumbnail = watch("thumbnail");
  const [selectFeaturedImage, setSelectFeaturedImage] = useState(false);
  const [selectThumbnailImage, setSelectThumbnailImage] = useState(false);
  const [selectVideo, setSelectVideo] = useState(false);
  useEffect(() => {
    if (!article) return;

    const normalizedCategories =
      article.categories?.map((c: any) => ({
        id: c.id,
        name: c.name,
      })) || [];

    const normalizedTags =
      article.tags?.map((t: any) => ({
        id: t.id,
        name: t.name,
      })) || [];

    setSelectedCategories(normalizedCategories);
    setSelectedTags(normalizedTags);

    reset({
      ...article,
      scheduled_for: article.scheduled_for
        ? toDateTimeLocal(article.scheduled_for)
        : "",
    });
  }, [article, reset]);
  const onSubmit = (data: any) => {
    const updatedData = {
      ...data,
      thumbnail: thumbnail?.file_path,
      featured_image: featuredImage?.file_path,
      video_url: videoUrl?.file_path,
      tags: (selectedTags ?? []).map((tag: any) => tag.id),
      categories: (selectedCategories ?? []).map(
        (category: any) => category.id,
      ),
    };
    if (type === "edit") {
      updateArticle.mutate(
        { id: article?.id, data: updatedData },
        {
          onSuccess: (res) => {
            setOpen(false);
            toast.success(res?.message || "Article updated successfully");
          },
          onError: (e) => {
            toast.error(e?.message || "Something went wrong");
          },
        },
      );
    } else {
      addArticle.mutate(updatedData, {
        onSuccess: (res) => {
          setOpen(false);
          toast.success(res?.message || "Article added successfully");
        },
        onError: (e) => {
          toast.error(e?.message || "Something went wrong");
        },
      });
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Button variant="submit" onClick={() => setOpen(false)}>
          <ArrowLeft />
        </Button>
        <p className="text-2xl font-bold text-[var(--color-primary)]">
          {type === "edit" ? "Edit Article" : "Add Article"}
        </p>
        <p className="text-sm text-[rgb(var(--color-gray-rgb)/0.7)]">
         {type === "edit" ? "Edit an existing article." : "Create a new article."}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {/* Title */}
        <div>
          <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
            Title
          </label>
          <input {...register("title")} className={inputStyle} />
        </div>

        {/* Excerpt */}
        <div>
          <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
            Excerpt
          </label>
          <textarea rows={4} {...register("excerpt")} className={inputStyle} />
        </div>

        {/* Content */}
        <div>
          <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
            Content
          </label>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <RichTextEditor value={field.value} onChange={field.onChange} />
            )}
          />
          {/* <textarea rows={10} {...register("content")} className={inputStyle} /> */}
        </div>
        {/* {
  <Editor
  value={content}
  init={{
    menubar: false,
    toolbar: false,
    plugins: [],        // disable plugins
    statusbar: false,
    branding: false,
  }}
  disabled={true}
/>
} */}
        {/* {content && (
  <div dangerouslySetInnerHTML={{ __html: content }} />
)}       */}
        {/* Media Type */}
        <div>
          <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
            Media Type
          </label>

          <Controller
            control={control}
            name="media_type"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
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

        {/* Images */}

        <div className="grid grid-cols-2 gap-5">
          {media_type === "image" && (
            <div>
              <label>Featured Image</label>
              <div className="h-[200px] w-[200px] cursor-pointer border-2 border-[var(--color-primary)] bg-[rgb(var(--color-primary-rgb)/0.1)] rounded-xl flex justify-center items-center">
                {featuredImage ? (
                  <div className="relative h-full w-full">
                    <img
                      src={
                        typeof featuredImage === "string"
                          ? featuredImage
                          : featuredImage?.file_url
                      }
                      className="w-full h-full rounded-xl"
                    />
                    <div
                      className="absolute right-2 top-2 h-[30px] w-[30px] bg-gray-200 hover:bg-gray-100 rounded-md flex
                 justify-center items-center group"
                    >
                      <X
                        onClick={() => setValue("featured_image", "")}
                        className="text-red-500"
                      />
                    </div>
                  </div>
                ) : (
                  <div
                    className="w-full h-full rounded-xl flex justify-center items-center"
                    onClick={() => setSelectFeaturedImage(true)}
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
          {(media_type === "youtube" || media_type === "video") && (
            <div>
              <label>Thumbnail</label>
              <div className="h-[200px] w-[200px] cursor-pointer border-2 border-[var(--color-primary)] bg-[rgb(var(--color-primary-rgb)/0.1)] rounded-xl flex justify-center items-center">
                {thumbnail ? (
                  <div className="relative h-full w-full">
                    <img
                      src={
                        typeof thumbnail === "string"
                          ? thumbnail
                          : thumbnail?.file_url
                      }
                      className="w-full h-full rounded-xl"
                    />
                    <div className="absolute right-2 top-2 h-[30px] w-[30px] bg-gray-200 hover:bg-gray-100 rounded-md flex justify-center items-center group">
                      <X
                        onClick={() => setValue("thumbnail", "")}
                        className="text-red-500"
                      />
                    </div>
                  </div>
                ) : (
                  <div
                    className="w-full h-full rounded-xl flex justify-center items-center"
                    onClick={() => setSelectThumbnailImage(true)}
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

          {/* Video */}

          {media_type === "youtube" && (
            <div>
              <label>YouTube URL</label>
              <input {...register("youtube_url")} className={inputStyle} />
            </div>
          )}

          {media_type === "video" && (
            <div>
              <label>Video URL</label>
              <div className="h-[200px] w-[200px] cursor-pointer border-2 border-[var(--color-primary)] bg-[rgb(var(--color-primary-rgb)/0.1)] rounded-xl flex justify-center items-center">
                {videoUrl ? (
                  <div className="relative h-full w-full">
                    <video
                      src={
                        typeof videoUrl === "string"
                          ? videoUrl
                          : videoUrl?.file_url
                      }
                      className="w-full h-full rounded-xl"
                      disablePictureInPicture
                    />
                    <div className="absolute right-2 top-2 h-[30px] w-[30px] bg-gray-200 hover:bg-gray-100 rounded-md flex justify-center items-center group">
                      <X
                        onClick={() => setValue("video_url", "")}
                        className="text-red-500"
                      />
                    </div>
                  </div>
                ) : (
                  <div
                    className="w-full h-full rounded-xl flex justify-center items-center"
                    onClick={() => setSelectVideo(true)}
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

        {/* Headline */}

        <div className="grid grid-cols-3 gap-5">
          <div className="flex items-center gap-2 mt-7">
            <input type="checkbox" {...register("is_headline_news")} />

            <label>Headline News</label>
          </div>
          {is_headline_news && (
            <>
              <div>
                <label>Headline Display</label>

                <Controller
                  control={control}
                  name="headline_display_type"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className={inputStyle}>
                        <SelectValue />
                      </SelectTrigger>

                      <SelectContent className="bg-white">
                        <SelectItem value="image">Image</SelectItem>

                        <SelectItem value="text">Text</SelectItem>
                        <SelectItem value="both">Both</SelectItem>
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
            </>
          )}
        </div>

        {/* Status */}

        <div>
          <label>Status</label>

          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className={inputStyle}>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent className="bg-white">
                  <SelectItem value="draft">Draft</SelectItem>

                  <SelectItem value="pending">Pending</SelectItem>

                  <SelectItem value="published">Published</SelectItem>
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

          <input {...register("meta_title")} className={inputStyle} />
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

          <input {...register("canonical_url")} className={inputStyle} />
        </div>

        {/* Location */}

        <div className="grid grid-cols-2 gap-5">
          <div>
            <label>City Focus</label>

            <input {...register("city_focus")} className={inputStyle} />
          </div>

          <div>
            <label>Target Countries (comma separated)</label>
            <input
              {...register("target_countries", {
                setValueAs: (value) => {
                  if (typeof value === "string") {
                    return value.split(",").map((v) => v.trim());
                  }

                  return [];
                },
              })}
              className={inputStyle}
            />
          </div>
        </div>

        {/* Categories */}

        <div className="mt-5 flex flex-col">
          <div className="h-[35px] flex items-center gap-2 m-2">
            <label>Categories</label>
            {selectedCategories.length > 0 && (
              <div
                className="h-full w-full flex overflow-x-auto [&::-webkit-scrollbar]:hidden
    [-ms-overflow-style:none]
    [scrollbar-width:none] gap-2"
              >
                {selectedCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant="submit"
                    className="pointer-events-none bg-[rgb(var(--color-primary-rgb)/0.1)] border-2 border-[var(--color-primary)] text-[var(--color-primary)]"
                  >
                    <ChartColumnStacked />
                    {category.name}
                  </Button>
                ))}
              </div>
            )}
          </div>
          <CategoryDropdownInput
            selectedCategoryIds={selectedCategories.map((c) => c.id)}
            setSelectedCategoryIds={(ids) => {
              const selected = CategoriesData.filter((c) => ids.includes(c.id));
              setSelectedCategories(selected);
            }}
          />
        </div>

        {/* Tags */}

        <div className="mt-5 flex flex-col">
          <div className="h-[35px] flex items-center gap-2 m-2">
            <label>Tags</label>
            {selectedTags.length > 0 && (
              <div
                className="h-full w-full flex overflow-x-auto [&::-webkit-scrollbar]:hidden
    [-ms-overflow-style:none]
    [scrollbar-width:none] gap-2"
              >
                {selectedTags.map((tag: any) => (
                  <Button
                    key={tag.id}
                    variant="submit"
                    className="pointer-events-none bg-[rgb(var(--color-primary-rgb)/0.1)] border-2 border-[var(--color-primary)] text-[var(--color-primary)]"
                  >
                    <Tags />
                    {tag.name}
                  </Button>
                ))}
              </div>
            )}
          </div>
          <TagDropdownInput
            selectedTagIds={selectedTags.map((t) => t.id)}
            setSelectedTagIds={(ids) => {
              const selected = TagsData.filter((t) => ids.includes(t.id));
              setSelectedTags(selected);
            }}
          />
        </div>

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="submit"
            disabled={addArticle.isPending}
          >
          {type==="edit"?updateArticle.isPending?"Updating...":"Update Article":  addArticle.isPending ? "Adding..." : " Add Article"}
          </Button>
        </div>
        <SelectMediaDialogBox
          open={selectFeaturedImage}
          onOpenChange={setSelectFeaturedImage}
          file_type="image"
          onSelectMedia={(media) => {
            setValue("featured_image", media);
            setSelectFeaturedImage(false);
          }}
        />
        <SelectMediaDialogBox
          open={selectThumbnailImage}
          onOpenChange={setSelectThumbnailImage}
          file_type="image"
          onSelectMedia={(media) => {
            setValue("thumbnail", media);
            setSelectThumbnailImage(false);
          }}
        />
        <SelectMediaDialogBox
          open={selectVideo}
          onOpenChange={setSelectVideo}
          file_type="video"
          onSelectMedia={(media) => {
            setValue("video_url", media);
            setSelectVideo(false);
          }}
        />
      </form>
    </div>
  );
}

export default AddArticle;
