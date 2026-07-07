import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ModulePermissionBox from "@/features/permissions/components/ModulePermissionBox";
import { usePermissionHooks } from "@/features/permissions/hooks/usePermissions";
import { inputStyle } from "@/components/shared/styles/inputStyle";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function PermissionManagement() {
  const permissionHook = usePermissionHooks();
  const { data,isLoading } = permissionHook.useFetchRoleBasedPermissions();
  const {data:permissionData}=permissionHook.useFetchPermissions()
  const permissionsData=permissionData?.data??[]
//   console.log(permissionsData)
const assignRoleBasedPermissions=permissionHook.useAssignRoleBasedPermissions();
  const roleBasedPermissions = data?.data ?? [];
  const [selectedRoleId, setSelectedRoleId] = useState("");
const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const selectedRole = roleBasedPermissions.find(
    (role) => String(role.id) === selectedRoleId
  );

const selectedPermissionsId = selectedPermissions.map(
  (permission)=> 
    permissionsData.find((p)=>p.name === permission)?.id
).filter(Boolean);console.log(selectedPermissionsId)
  const handleSave = () => {
    if (!selectedRole) return;
    const data={
      role_id: Number(selectedRole.id),
      permissions: selectedPermissions
    }
    console.log(data)
    assignRoleBasedPermissions.mutate({data},{
        onSuccess:(res)=>{
            toast.success(res?.message);
        },
        onError:(err)=>{
            toast.error(err?.message);
        }
    });
  };
 
  return (
    <div className="flex justify-between w-full h-screen p-20 overflow-y-auto">
      <div className="w-1/4">
        <Select           value={selectedRoleId}
          onValueChange={(value) => {
            setSelectedRoleId(value);

            const role = roleBasedPermissions.find(
              (r) => String(r.id) === value
            );

            setSelectedPermissions(role?.permissions ?? []);
          }}
>
          <SelectTrigger className={`${inputStyle} w-[120px]`}>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>

          <SelectContent className="bg-white">
            {roleBasedPermissions.map((role) => (
              <SelectItem
                key={role.id}
                value={String(role.id)}
              >
                {role.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant="submit"
          onClick={handleSave}
          className="mt-5"
        >
          Save Changes
        </Button>
      </div>

      <div className="w-3/4 rounded-xl h-full">
   <ModulePermissionBox
          role={selectedRole}
          selectedPermissions={selectedPermissions}
          setSelectedPermissions={setSelectedPermissions}
        />      </div>
    </div>
  );
}

export default PermissionManagement;