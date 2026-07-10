import { authorApi } from "@/services/api/authors/authorApi"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
const author=authorApi()
export const useAuthorHooks=()=>{
    const queryClient=useQueryClient()
    return{
        useFetchAuthors:({page,per_page,search}:{page:number,per_page:number,search?:string})=>{
            return useQuery({
                queryFn:()=>author.fetchAuthors({page,per_page,search}),
                queryKey:["authors",page,per_page,search]
            })
        },
        useDeleteAuthors:()=>{
            return useMutation({
                mutationFn:(id:any)=>author.deleteAuthors(id),
                onSuccess:()=>{
                    queryClient.invalidateQueries(["authors"]);
                }
            })
        },
        useCreateAuthor:()=>{
            return useMutation({
                mutationFn:(data:any)=>author.createAuthor(data),
                onSuccess:()=>{
                    queryClient.invalidateQueries(["authors"]);
                }
            })
        },
        useUpdateAuthor:()=>{
            return useMutation({
                mutationFn:({data,id}:any)=>author.updateAuthor(id,data),
                onSuccess:()=>{
                    queryClient.invalidateQueries(["authors"]);
                }
            })
        }
    }
}