import { toast } from "sonner";
import { useArticlesHooks } from "./useArticles";

export const useArticleView = () => {
  const articleHook = useArticlesHooks();
  const { mutate: viewArticle } = articleHook.useViewPublicArticle();

  const viewPublicArticle = (id: number | string) => {
    viewArticle(id, {
      onSuccess: (res) => {
        toast.success(res?.message || "Viewed successfully");
        
    },
      onError: (err: any) => {
        toast.error(err?.message || "Something went wrong");
      },
    });
  };

  return { viewPublicArticle };
};