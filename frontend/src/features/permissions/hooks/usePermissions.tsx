import { permissionApi } from "@/services/api/permissions/permissionApi"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const permission=permissionApi()
export const usePermissionHooks=()=>{
    const queryClient=useQueryClient()

    return{
        useFetchPermissions:()=>{
            return useQuery({
                queryFn:()=>permission.fetchPermissions(),
                queryKey:["permissions"]
            })
        },
        useFetchRoleBasedPermissions:()=>{
            return useQuery({
                queryFn:()=>permission.fetchRoleBasedPermissions(),
                queryKey:["permissions"]
            })
        },
        useAssignRoleBasedPermissions:()=>{
            return useMutation({
                mutationFn:({data}:any)=>permission.assignRoleBasedPermissions({data}),
                onSuccess:()=>{
                    queryClient.invalidateQueries(["permissions"]);}
            })
        }
    }
}