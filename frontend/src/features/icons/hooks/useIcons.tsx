import { iconApi } from "@/services/api/icons/iconApi"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const icon=iconApi()
export const useIconHooks=()=>{
    const queryClient=useQueryClient();
    return {
        useFetchIcons:({page,per_page,search}:{page:number,per_page:number,search?:string})=>{
            return useQuery({
                queryFn:()=>icon.fetchIcons({page,per_page,search}),
                queryKey:["icons",page,per_page,search]
            })
        },
        useCreateIcon:()=>{
            return useMutation({
                mutationFn:(data:any)=>icon.createIcon(data),
                onSuccess:()=>{
                    queryClient.invalidateQueries(["icons"]);}
            })
        },
    }

}