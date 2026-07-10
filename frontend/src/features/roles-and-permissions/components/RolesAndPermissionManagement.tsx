import { useEffect, useMemo } from "react";
import { ArrowLeft } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { inputStyle } from "@/components/shared/styles/inputStyle";
import PermissionTable from "@/features/roles-and-permissions/components/PermissionTable";
import { usePermissionHooks } from "@/features/roles-and-permissions/hooks/usePermissions";
import { toast } from "sonner";

interface RolesAndPermissionManagementProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  role?: {
    id: number;
    name: string;
    permissions: string[]; 
  };
  type?:string
}

interface FormValues {
  name: string;
  permissions: number[]; 
}

function RolesAndPermissionManagement({
  setOpen,
  role,
  type="add",
}: RolesAndPermissionManagementProps) {
  const permissionHook = usePermissionHooks();
  const { data: permissionData } = permissionHook.useFetchPermissions();

  const { register, handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues: {
      name: "",
      permissions: [],
    },
  });

  const AssignRoleBasedPermission=permissionHook.useAssignRoleBasedPermissions()
  const CreateRole=permissionHook.useCreateRole()

  const permissionMap = useMemo(() => {
    const map: Record<string, number> = {};

    if (!permissionData?.data) return map;

    Object.values(permissionData.data).forEach((module: any) => {
      Object.values(module).forEach((permission: any) => {
        map[permission.name] = permission.id;
      });
    });

    return map;
  }, [permissionData]);

  useEffect(() => {
    if (!permissionData?.data) return;

    if (role) {
      reset({
        name: role.name,
        permissions: role.permissions
          .map((permissionName) => permissionMap[permissionName])
          .filter((id): id is number => id !== undefined),
      });
    } else {
      reset({
        name: "",
        permissions: [],
      });
    }
  }, [role, permissionData, permissionMap, reset]);

 const onSubmit = (data: FormValues) => {
  if(type==="edit")
    {const editPayload={role_id:role?.id,permissions:data?.permissions}

    AssignRoleBasedPermission.mutate(editPayload, {
      onSuccess: (res) => {
        setOpen(false);
        toast.success(res?.message || "Role updated successfully");
      },
      onError: (e) => {
        toast.error(e?.message || "Something went wrong");
      },
    });
  }
if(type==="add")
{
    CreateRole.mutate(data, {
      onSuccess: (res) => {
        setOpen(false);
        toast.success(res?.message || "Role created successfully");
      },
      onError: (e) => {
        toast.error(e?.message || "Something went wrong");
      },
    });
}
    
  };

  return (
    <div className="w-full h-screen overflow-y-auto p-20">
      <div className="flex items-center gap-5 rounded-lg p-4">
        <Button
          variant="ghost"
          className="h-8 w-8 cursor-pointer rounded-full border border-[var(--color-secondary)] text-[var(--color-primary)] hover:border-[var(--color-primary)] hover:shadow-md hover:shadow-[rgb(var(--color-primary-rgb)/0.3)]"
          onClick={() => setOpen(false)}
        >
          <ArrowLeft />
        </Button>

        <div>
          <p className="text-2xl font-bold text-[var(--color-primary)]">
            {role ? "Edit Role" : "Add Role"}
          </p>

          <p className="text-sm text-[rgb(var(--color-gray-rgb)/0.7)]">
            {role ? "Update Role" : "Create a new Role"}
          </p>
        </div>
      </div>

      <form
        className="flex w-full flex-col gap-5 rounded-xl p-10 shadow-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-1/4">
          <label className="flex flex-col gap-2">
            <span>Role Name</span>

            <input
              type="text"
              placeholder="Role Name"
              className={inputStyle}
              {...register("name")}
            />
          </label>
        </div>

        <div className="flex-1">
          <label className="mb-2 block">Permissions</label>

          <Controller
            name="permissions"
            control={control}
            render={({ field }) => (
              <PermissionTable
                selectedPermissions={field.value ?? []}
                setSelectedPermissions={field.onChange}
              />
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" variant="submit" className="w-[120px]">
            {role ? "Update Role" : "Create Role"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default RolesAndPermissionManagement;