import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "@/context/useAuthStore";
import { usePermissionHooks } from "@/features/roles-and-permissions/hooks/usePermissions";
import ServerUnavailable from "@/pages/Error/ServerUnavailable";

interface ProtectedRouteProps {
  navigateRoute?: string;
}

function ProtectedRoute({ navigateRoute = "/admin/login" }: ProtectedRouteProps) {
  const { authData } = useAuthStore();
  const hasAccessToken = Boolean(authData?.accessToken);

  const permissionHook = usePermissionHooks();

  const {
    data: rolesList,
    isLoading: rolesLoading,
    isError: rolesError,
  } = permissionHook.useFetchRoleBasedPermissions({
    enabled: hasAccessToken,
  });

  // 1. No access token -> navigate to login page immediately
  if (!hasAccessToken) {
    return <Navigate to={navigateRoute} replace />;
  }

  // 2. Backend request is still loading
  if (rolesLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="size-10 animate-spin rounded-full border-4 border-gray-200 border-t-[var(--color-primary)]" />
      </div>
    );
  }

  // 3. Backend is unavailable
  if (rolesError) {
    return <ServerUnavailable />;
  }

  const ROLES =
    rolesList?.data?.map((role: any) => role.name.toLowerCase()) || [];

  const userRoles =
    authData?.role?.map((role: any) => role.toLowerCase()) || [];

  const validRole = userRoles.some((role: any) =>
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