import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "@/context/useAuthStore";
import { usePermissionHooks } from "@/features/roles-and-permissions/hooks/usePermissions";
import ServerUnavailable from "@/pages/Error/ServerUnavailable";

function ProtectedRoute({ navigateRoute }) {
  const { authData } = useAuthStore();

  const permissionHook = usePermissionHooks();

  const {
    data: rolesList,
    isLoading: rolesLoading,
    isError: rolesError,
  } = permissionHook.useFetchRoleBasedPermissions();

  // 1. Backend request is still loading
  if (rolesLoading) {
    return <div>Checking permissions...</div>;
  }

  // 2. Backend is unavailable
  if (rolesError) {
    return (
      <ServerUnavailable/>
    );
  }

  // 3. No access token
  if (!authData?.accessToken) {
    return <Navigate to={navigateRoute} replace />;
  }

  const ROLES =
    rolesList?.data?.map((role) => role.name.toLowerCase()) || [];

  const userRoles =
    authData?.role?.map((role) => role.toLowerCase()) || [];

  const validRole = userRoles.some((role) =>
    ROLES.includes(role)
  );

  // 4. Authenticated but role is not authorized
  if (!validRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  // 5. Authorized
  return <Outlet />;
}

export default ProtectedRoute;