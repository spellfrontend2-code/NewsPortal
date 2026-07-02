import { categoriesApi } from "@/services/api/categories/categoriesApi"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const categories=categoriesApi()
export const useCategoriesHooks=()=>{
    const queryClient=useQueryClient()
    return {
        useFetchCategories:({page,per_page})=>{
            return useQuery({
                queryKey:["categories",page,per_page],
                queryFn:()=>categories.fetchCategories({page,per_page})
            })
        },
        useAddCategories:()=>{
            return useMutation({
                mutationFn:(data:any)=>categories.addCategory(data)
                ,onSuccess:()=>{
                  queryClient.invalidateQueries(["categories"])  
                }
            })
        },

        useEditCategories:()=>{
            return useMutation({
                mutationFn:({data,id})=>categories.editCategory(id,data)
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
        }
    }
}