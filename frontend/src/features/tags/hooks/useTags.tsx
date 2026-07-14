import { tagsApi } from "@/services/api/tags/tagsApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const tags=tagsApi();
export const useTagsHooks=()=>{
    const queryClient=useQueryClient()
    return{
        useFetchTags:({page,per_page,search}:{page:number,per_page:number,search?:string})=>{
            return useQuery({
                queryKey:["tags",page,per_page,search],
                queryFn:()=>tags.fetchTags({page,per_page,search})
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
        useUpdateTag:()=>{
          return useMutation({
            mutationFn:({id,data}:any)=>tags.updateTag(id,data)
            ,onSuccess:()=>{
              queryClient.invalidateQueries(["tags"])  
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