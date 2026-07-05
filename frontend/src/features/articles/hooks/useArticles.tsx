import { articleApi } from "@/services/api/articles/articleApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const articles=articleApi();
export const useArticlesHooks=()=>{
    const queryClient=useQueryClient();
return{
    useFetchArticles:({page,per_page,search})=>{
        return useQuery({
            queryKey:["articles",page,per_page,search],
            queryFn:()=>articles.fetchArticles({page,per_page,search})
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
    useUpdateArticles:()=>{
        return useMutation({
            mutationFn:({id,data}:{data:any,id:any})=>articles.updateArticle(id,data)
            ,onSuccess:()=>{
                queryClient.invalidateQueries(["articles"])
            }
        })
    },
    useStatusUpdateArticles:()=>{
        return useMutation({
            mutationFn:({id,data}:{data:any,id:any})=>articles.statusUpdateArticle(id,data)
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