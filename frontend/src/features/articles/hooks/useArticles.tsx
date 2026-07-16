import { articleApi } from "@/services/api/articles/articleApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const articles = articleApi();
export const useArticlesHooks = () => {
  const queryClient = useQueryClient();
  return {
    useFetchArticles: ({ page, per_page, search,status }) => {
      return useQuery({
        queryKey: ["articles", page, per_page, search,status],
        queryFn: () =>
          articles.fetchArticles({
            page,
            per_page: per_page,
            search,status
          }),
        retry: false, 
      });
    },
    useCreateArticles: () => {
      return useMutation({
        mutationFn: (data: any) => articles.createArticle(data),
        onSuccess: () => {
          queryClient.invalidateQueries(["articles"]);
        },
      });
    },
    useUpdateArticles: () => {
      return useMutation({
        mutationFn: ({ id, data }: { data: any; id: any }) =>
          articles.updateArticle(id, data),
        onSuccess: () => {
          queryClient.invalidateQueries(["articles"]);
        },
      });
    },
    useStatusUpdateArticles: () => {
      return useMutation({
        mutationFn: ({ id, data }: { data: any; id: any }) =>
          articles.statusUpdateArticle(id, data),
        onSuccess: () => {
          queryClient.invalidateQueries(["articles"]);
        },
      });
    },
    useDeleteArticles: () => {
      return useMutation({
        mutationFn: (id: any) => articles.deleteArticle(id),
        onSuccess: () => {
          queryClient.invalidateQueries(["articles"]);
        },
      });
    },
    useFetchHeadlineArticles: ({ page, per_page }) => {
      return useQuery({
        queryKey: ["headline_articles"],
        queryFn: () =>
          articles.fetchPublicHeadlineArticles({
            page,
            per_page,
          }),
      });
    },
    useFetchPublicArticles:({page,per_page,from_date,to_date,slug}:{page:number,per_page:number,from_date?:string,to_date?:string,slug?:string})=>{
      return useQuery({
        queryKey:["public_articles",page,per_page,from_date,to_date,slug],
        queryFn:()=>articles.fetchPublicArticles({page,per_page,from_date,to_date,slug}),
      })
    },
    useFetchPublicArticlesByCategory:({page,per_page,slug}:{page:number,per_page:number,slug?:string})=>{
      return useQuery({
        queryKey:["public_articles_by_category",page,per_page,slug],
        queryFn:()=>articles.fetchPublicArticlesByCategory({page,per_page,slug}),
      })
    },
    useFetchPublicSingleArticle:(slug)=>{
      return useQuery({
        queryKey:["public_single_articles",slug],
        queryFn:()=>articles.fetchPublicSingleArticle(slug),
      })
    }
  };
};
