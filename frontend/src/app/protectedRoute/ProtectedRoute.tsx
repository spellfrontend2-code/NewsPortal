import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "@/context/useAuthStore";
import { usePermissionHooks } from "@/features/roles-and-permissions/hooks/usePermissions";

function ProtectedRoute({ navigateRoute }) {
  const { authData } = useAuthStore();

  const permissionHook = usePermissionHooks();

  const {
    data: rolesList,
    isLoading: rolesLoading,
  } = permissionHook.useFetchRoleBasedPermissions();

  if (rolesLoading) {
    return null; 
  }

  const ROLES =
    rolesList?.data?.map((role) => role.name.toLowerCase()) || [];

  const userRoles =
    authData?.role?.map((r) => r.toLowerCase()) || [];

  const validRole = userRoles.some((role) =>
    ROLES.includes(role)
  );
  const isAuthenticated =
    !!authData?.accessToken && validRole;

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={navigateRoute} replace />
  );
}

export default ProtectedRoute;