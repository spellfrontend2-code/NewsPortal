import { useEffect, useMemo } from "react";
import { ArrowLeft } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { inputStyle } from "@/components/shared/styles/inputStyle";
import PermissionTable from "@/features/roles-and-permissions/components/PermissionTable";
import { usePermissionHooks } from "@/features/roles-and-permissions/hooks/usePermissions";
import { toast } from "sonner";

interface RolesAndPermissionManagementProps {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  role?: {
    id: number;
    name: string;
    permissions: string[];
  };
  type?: string;
}

interface FormValues {
  name: string;
  permissions: number[];
}

function RolesAndPermissionManagement({
  setOpen,
  role: propRole,
  type: propType,
}: RolesAndPermissionManagementProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { slug, id } = useParams();
  const paramIdentifier = slug || id;

  const permissionHook = usePermissionHooks();
  const { data: permissionData } = permissionHook.useFetchPermissions();
  const type =
    propType ||
    (paramIdentifier || location.pathname.includes("/edit") ? "edit" : "add");

  const { data: allRolesData, isLoading: isFetchingRoles } =
    permissionHook.useFetchRoleBasedPermissions();

  const fetchedRole = useMemo(() => {
    if (!paramIdentifier || !allRolesData?.data) return undefined;
    const decoded = decodeURIComponent(paramIdentifier);
    return allRolesData.data.find(
      (r: any) =>
        String(r.slug) === decoded ||
        String(r.name) === decoded ||
        String(r.id) === decoded
    );
  }, [paramIdentifier, allRolesData]);

  const role = propRole || location.state?.role || fetchedRole;

  const { register, handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues: {
      name: "",
      permissions: [],
    },
  });

  const AssignRoleBasedPermission =
    permissionHook.useAssignRoleBasedPermissions();
  const CreateRole = permissionHook.useCreateRole();

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

  const handleBack = () => {
    if (setOpen) {
      setOpen(false);
    } else {
      navigate("/admin/roles-and-permissions");
    }
  };

  useEffect(() => {
    if (!permissionData?.data) return;

    if (role) {
      reset({
        name: role.name,
        permissions: role.permissions
          ?.map((permissionName: string) => permissionMap[permissionName])
          ?.filter((id: any): id is number => id !== undefined) || [],
      });
    } else {
      reset({
        name: "",
        permissions: [],
      });
    }
  }, [role, permissionData, permissionMap, reset]);

  const onSubmit = (data: FormValues) => {
    if (type === "edit") {
      const targetRoleId =
        role?.id || location.state?.role?.id || fetchedRole?.id;
      const editPayload = {
        role_id: targetRoleId,
        permissions: data?.permissions,
      };

      AssignRoleBasedPermission.mutate(editPayload, {
        onSuccess: (res) => {
          handleBack();
          toast.success(res?.message || "Role updated successfully");
        },
        onError: (e) => {
          toast.error(e?.message || "Something went wrong");
        },
      });
    }
    if (type === "add") {
      CreateRole.mutate(data, {
        onSuccess: (res) => {
          handleBack();
          toast.success(res?.message || "Role created successfully");
        },
        onError: (e) => {
          toast.error(e?.message || "Something went wrong");
        },
      });
    }
  };

  if (type === "edit" && isFetchingRoles && !role) {
    return (
      <div className="w-full h-full flex items-center justify-center p-20">
        <div className="flex flex-col items-center gap-3">
          <span className="h-8 w-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 font-medium">Loading role details...</p>
        </div>
      </div>
    );
  }

  const isSubmitting =
    type === "edit"
      ? AssignRoleBasedPermission.isPending
      : CreateRole.isPending;

  return (
    <div className="w-full h-full overflow-y-auto px-20 py-10 flex flex-col gap-5">
      <div className="flex items-center gap-5 rounded-lg p-4">
        <Button
          variant="ghost"
          className="h-8 w-8 cursor-pointer rounded-full border border-[var(--color-secondary)] text-[var(--color-primary)] hover:border-[var(--color-primary)] hover:shadow-md hover:shadow-[rgb(var(--color-primary-rgb)/0.3)]"
          onClick={handleBack}
        >
          <ArrowLeft />
        </Button>

        <div>
          <p className="text-2xl font-bold text-[var(--color-primary)]">
            {type === "edit" ? "Edit Role" : "Add Role"}
          </p>

          <p className="text-sm text-[rgb(var(--color-gray-rgb)/0.7)]">
            {type === "edit" ? "Update Role" : "Create a new Role"}
          </p>
        </div>
      </div>

      <form
        className="flex w-full flex-col gap-5 rounded-xl p-10 shadow-lg bg-white"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-1/4">
          <label className="flex flex-col gap-2">
            <span className="font-semibold text-sm">Role Name</span>

            <input
              type="text"
              placeholder="Role Name"
              className={inputStyle}
              {...register("name", { required: true })}
            />
          </label>
        </div>

        <div className="flex-1">
          <label className="mb-2 block font-semibold text-sm">Permissions</label>

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

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="submit"
            className="w-[120px]"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Saving..."
              : type === "edit"
                ? "Update Role"
                : "Create Role"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default RolesAndPermissionManagement;