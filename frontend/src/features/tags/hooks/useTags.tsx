import { tagsApi } from "@/services/api/tags/tagsApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const tags=tagsApi();
export const useTagsHooks=()=>{
    const queryClient=useQueryClient()
    return{
        useFetchTags:({page,per_page}:{page:number,per_page:number})=>{
            return useQuery({
                queryKey:["tags",page,per_page],
                queryFn:()=>tags.fetchTags({page,per_page})
            })
        },
        useCreateTag:()=>{
            return useMutation({
                mutationFn:(data:any)=>tags.createTag(data)
                ,onSuccess:()=>{
                  queryClient.invalidateQueries(["tags"])  
                },
                onError:()=>{

                }
            })
        },
        useDeleteTag:()=>{
            return useMutation({
                mutationFn:(id:any)=>tags.deleteTag(id)
                ,onSuccess:()=>{
                  queryClient.invalidateQueries(["tags"])  
                }
            })
        }
    }
}