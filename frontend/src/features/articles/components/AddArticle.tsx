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
import { useCategoriesHooks } from "@/features/categories/hooks/useCategories";
import CategoryDropdownInput from "@/features/categories/components/CategoryDropdownInput";
import { useState } from "react";
import { ChartColumnStacked, Upload, X } from "lucide-react";
import RichTextEditor from "@/components/Admin/richtexteditor/RichTextEditor";
import SelectMediaDialogBox from "@/features/media/components/SelectMediaDialogBox";
import { useArticlesHooks } from "../hooks/useArticles";
import { toast } from "sonner";

const inputStyle =
  "border border-[var(--color-secondary)] px-2 py-1 rounded-md w-full focus:outline-none";

function AddArticle({ open, setOpen }: any) {
  const { register, handleSubmit, watch, control, setValue } = useForm({
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

  const media_type = watch("media_type");
  const is_headline_news = watch("is_headline_news");
  const categoryHook = useCategoriesHooks();
  const { data: categoriesData } = categoryHook.useFetchCategories({
    page: 1,
    per_page: 100,
  });
  const articleHook=useArticlesHooks()
  const addArticle=articleHook.useCreateArticles()
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const content = watch("content");
  const featuredImage = watch("featured_image");
  const thumbnail = watch("thumbnail");
  const [selectFeaturedImage, setSelectFeaturedImage] = useState(false);
  const [selectThumbnailImage, setSelectThumbnailImage] = useState(false);
  const onSubmit = (data: any) => {
    const updatedData={...data,thumbnail:thumbnail?.file_path,featured_image:featuredImage?.file_path,tag_ids:selectedTags?.map((tag:any)=>tag.id),category_ids:selectedCategories?.map((category:any)=>category.id)}
console.log(updatedData)
addArticle.mutate(updatedData,{
  onSuccess:(res)=>{
    setOpen(false);
    toast.success(res?.message||"Article added successfully")
  },
  onError:(e)=>{
    toast.error(e?.message||"Something went wrong")
  }
})  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-2xl font-bold text-[var(--color-primary)]">
          Add Article
        </p>
        <p className="text-sm text-[rgb(var(--color-gray-rgb)/0.7)]">
          Create a new article.
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
              <RichTextEditor
                value={field.value}
                onChange={field.onChange}
              />
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
                {featuredImage ? <div className="relative h-full w-full"><img src={featuredImage?.file_url} className="w-full h-full rounded-xl" /><div className="absolute right-2 top-2 h-[30px] w-[30px] bg-gray-200 hover:bg-gray-100 rounded-md flex justify-center items-center group"><X onClick={() => setValue("featured_image", "")} className="text-red-500" /></div></div> : <div className="w-full h-full rounded-xl flex justify-center items-center" onClick={() => setSelectFeaturedImage(true)}><Upload color="var(--color-primary)" strokeWidth={1.5} size={50} /></div>}</div>
            </div>
          )}
          {(media_type === "youtube" || media_type === "video") && (
             <div>
              <label>Thumbnail</label>
              <div className="h-[200px] w-[200px] cursor-pointer border-2 border-[var(--color-primary)] bg-[rgb(var(--color-primary-rgb)/0.1)] rounded-xl flex justify-center items-center">
                {thumbnail ? <div className="relative h-full w-full"><img src={thumbnail?.file_url} className="w-full h-full rounded-xl" /><div className="absolute right-2 top-2 h-[30px] w-[30px] bg-gray-200 hover:bg-gray-100 rounded-md flex justify-center items-center group">
                  <X onClick={() => setValue("thumbnail", "")} className="text-red-500" /></div></div> 
                  : <div className="w-full h-full rounded-xl flex justify-center items-center" onClick={() => setSelectThumbnailImage(true)}>
                    <Upload color="var(--color-primary)" strokeWidth={1.5} size={50} /></div>}</div>
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
              <input {...register("video_url")} className={inputStyle} />
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
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
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
    <ChartColumnStacked />
    {tag.name}
  </Button>
))}
              </div>
            )}
          </div>
          <TagDropdownInput
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
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

          <Button type="submit" variant="submit" disabled={addArticle.isPending}>
           {addArticle.isPending ? "Adding..." :" Add Article"}
          </Button>
        </div>
        <SelectMediaDialogBox open={selectFeaturedImage} onOpenChange={setSelectFeaturedImage} onSelectMedia={(media) => {
          setValue("featured_image", media);
          setSelectFeaturedImage(false);
        }} />
<SelectMediaDialogBox open={selectThumbnailImage} onOpenChange={setSelectThumbnailImage} onSelectMedia={(media) => {
          setValue("thumbnail", media);
          setSelectThumbnailImage(false);
        }} />
      </form>
    </div>
  );
}

export default AddArticle;
