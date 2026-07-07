import { permissionApi } from "@/services/api/permissions/permissionApi"
import { useQuery } from "@tanstack/react-query"

const permission=permissionApi()
export const usePermissionHooks=()=>{
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
                queryKey:["role-based-permissions"]
            })
        }
    }
}