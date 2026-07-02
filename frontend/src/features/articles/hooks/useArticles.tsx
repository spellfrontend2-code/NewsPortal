import { articleApi } from "@/services/api/articles/articleApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const articles=articleApi();
export const useArticlesHooks=()=>{
    const queryClient=useQueryClient();
return{
    useFetchArticles:()=>{
        return useQuery({
            queryKey:["articles"],
            queryFn:()=>articles.fetchArticles()
        })
    },
    useCreateArticles:()=>{
        return useMutation({
            mutationFn:(data:any)=>articles.createArticle(data)
            ,onSuccess:()=>{
                queryClient.invalidateQueries(["articles"])
            }
        })
    },
    useDeleteArticles:()=>{
        return useMutation({
            mutationFn:(id:any)=>articles.deleteArticle(id)
            ,onSuccess:()=>{
                queryClient.invalidateQueries(["articles"])
            }
        })
    }
}
}