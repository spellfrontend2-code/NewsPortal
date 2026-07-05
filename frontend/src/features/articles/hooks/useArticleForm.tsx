import { useForm } from "react-hook-form";

export function useArticleForm({article,type}:any) {
  console.log(article);
  const { register, handleSubmit, watch, control, setValue, reset } = useForm({
    disabled:type==="view",
    defaultValues: {
      title: article?.title || "",
      excerpt: article?.excerpt || "",
      content: article?.content || "",
      media_type: article?.media_type || "image",
      featured_image: article?.featured_image || "",
      thumbnail: article?.thumbnail || "",
      youtube_url: article?.youtube_url || "",
      video_url: article?.video_url || "",
      media_caption: article?.media_caption || "",
      is_headline_news: article?.is_headline_news || false,
      headline_display_type: article?.headline_display_type || "image",
      headline_order: article?.headline_order || 1,
      status: article?.status || "draft",
      scheduled_for: article?.scheduled_for || "",
      meta_title: article?.meta_title || "",
      meta_description: article?.meta_description || "",
      canonical_url: article?.canonical_url || "",
      city_focus: article?.city_focus || "",
      target_countries: article?.target_countries || [],
    },
  });

  return { register, handleSubmit, watch, control, setValue, reset };
}