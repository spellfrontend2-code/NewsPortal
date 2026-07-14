import { categoriesApi } from "@/services/api/categories/categoriesApi"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const categories=categoriesApi()
export const useCategoriesHooks=()=>{
    const queryClient=useQueryClient()
    return {
        useFetchCategories:({page,per_page,search}:{page:number,per_page:number,search?:string})=>{
            return useQuery({
                queryKey:["categories",page,per_page,search],
                queryFn:()=>categories.fetchCategories({page,per_page ,search})
            })
        },
        useCreateCategories:()=>{
            return useMutation({
                mutationFn:(data:any)=>categories.createCategory(data)
                ,onSuccess:()=>{
                  queryClient.invalidateQueries(["categories"])  
                }
            })
        },

        useUpdateCategories:()=>{
            return useMutation({
                mutationFn:({data,id})=>categories.updateCategory(id,data)
                ,onSuccess:()=>{
                  queryClient.invalidateQueries(["categories"])  
                }
            })
        },
        useDeleteCategories:()=>{
            return useMutation({
                mutationFn:(id:any)=>categories.deleteCategory(id)
                ,onSuccess:()=>{
                  queryClient.invalidateQueries(["categories"])  
                }
            })
        },
        useFetchPublicCategories:()=>{
            return useQuery({
                queryKey:["publicCategories"],
                queryFn:()=>categories.fetchPublicCategories()
            })
        }
    }
}