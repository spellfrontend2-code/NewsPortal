import { Button } from "@/components/ui/button";
import { useArticleForm } from "../hooks/useArticleForm";
import ArticleBasicInfo from "./forms/ArticleBasicInfo";
import { ArrowLeft } from "lucide-react";
import ArticleContent from "./forms/ArticleContent";
import ArticleHeadlineSection from "./forms/ArticleHeadlineSection";
import ArticleSeoSection from "./forms/ArticleSeoSection";
import ArticleExtraInfo from "./forms/ArticleExtraInfo";
import { useArticlesHooks } from "../hooks/useArticles";
import ArticleActions from "./forms/ArticleActions";
import ArticleCategoriesTags from "./forms/ArticleCategoriesTags";
import { useEffect, useState } from "react";
import { toDateTimeLocal } from "../utils/toDateTimeLocal";
import { FormProvider } from "react-hook-form";
import ArticleMediaSection from "./forms/ArticleMediaSection";
import { toast } from "sonner";

function AddArticle({ setOpen, article, type }: any) {
const methods = useArticleForm({article,type});
  const articleHook = useArticlesHooks();
  const createArticle = articleHook.useCreateArticles();
  const updateArticle = articleHook.useUpdateArticles();

  const isPending =
    type === "edit" ? updateArticle.isPending : createArticle.isPending;

  const buttonText =
    type === "edit"
      ? isPending
        ? "Updating..."
        : "Update Article"
      : isPending
        ? "Adding..."
        : "Add Article";

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

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

    methods.reset({
      ...article,
      scheduled_for: article.scheduled_for
        ? toDateTimeLocal(article.scheduled_for)
        : "",
    });
  }, [article, methods.reset]);
  const onSubmit = (data: any) => {
    const payload = {
      ...data,
      thumbnail:(data?.media_type==="video" || data?.media_type==="youtube")? data?.thumbnail?.file_path:null,
      featured_image:data?.media_type==="image"? data?.featured_image?.file_path:null,
      video_url:data?.media_type==="video"? data?.video_url?.file_path:null,
      youtube_url:data?.media_type==="youtube"? data?.youtube_url:null,
      tags: (selectedTags ?? []).map((tag: any) => tag.id),
      categories: (selectedCategories ?? []).map(
        (category: any) => category.id,
      ),
    };
    console.log(payload);
    if (type === "edit") {
      updateArticle.mutate(
        { id: article?.id, data: payload },
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
      createArticle.mutate(payload, {
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
    <div>
      <div>
        <Button variant="submit" onClick={() => setOpen(false)}>
          <ArrowLeft />
        </Button>
        <p className="text-2xl font-bold text-[var(--color-primary)]">
          {type === "edit" ? "Edit Article":type==="view"?"View Article" : "Add Article"}
        </p>
        <p className="text-sm text-[rgb(var(--color-gray-rgb)/0.7)]">
          {type === "edit"
            ? "Edit an existing article.":type==="view"?"View an existing article."
            : "Create a new article."}
        </p>
      </div>
      <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <ArticleBasicInfo />
        <ArticleContent   />
        <ArticleMediaSection/>
        <ArticleHeadlineSection/>
        <ArticleExtraInfo     />
        <ArticleSeoSection   />
        <ArticleCategoriesTags
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
       {type!=="view" && <ArticleActions
          isPending={isPending}
          buttonText={buttonText}
          onCancel={() => setOpen(false)}
        />}
      </form>
      </FormProvider>
    </div>
  );
}
export default AddArticle;
