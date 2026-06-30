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