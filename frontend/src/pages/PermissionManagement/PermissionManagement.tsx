import ModulePermissionBox from "@/features/permissions/components/ModulePermissionBox"
import { usePermissionHooks } from "@/features/permissions/hooks/usePermissions"

function PermissionManagement()
{
    const permissionHook=usePermissionHooks()
    const {data,isLoading}=permissionHook.useFetchRoleBasedPermissions()
    const permissions=data?.data??[]
    console.log(permissions)
    return (
        <div>
           <p>hhh</p>
        </div>
    )
}

export default PermissionManagement