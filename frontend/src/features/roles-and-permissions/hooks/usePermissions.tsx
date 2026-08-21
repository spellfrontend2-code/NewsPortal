import { permissionApi } from "@/services/api/permissions/permissionApi"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const permission=permissionApi()
export const usePermissionHooks=()=>{
    const queryClient=useQueryClient()

    return{
        useFetchPermissions:()=>{
            return useQuery({
                queryFn:()=>permission.fetchPermissions(),
                queryKey:["allPermissions"]
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
                mutationFn:(data:any)=>permission.assignRoleBasedPermissions(data),
                onSuccess:()=>{
                    queryClient.invalidateQueries(["permissions"]);}
            })
        },
        useCreateRole:()=>{
            return useMutation({
                mutationFn:(data:any)=>permission.createRole(data),
                onSuccess:()=>{
                    queryClient.invalidateQueries(["permissions"]);}
            })
        },
        useDeleteRole:()=>{
            return useMutation({
                mutationFn:(id:any)=>permission.deleteRole(id),
                onSuccess:()=>{
                    queryClient.invalidateQueries(["permissions"]);}
            })
        }
    }
}