import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/context/useAuthStore";
import { usePermissionStore } from "@/features/roles-and-permissions/hooks/usePermissionStore";

function PublicRoute() {
  const { authData } = useAuthStore();
  const { getDefaultRoute } = usePermissionStore();
const authorizedRoute=getDefaultRoute(authData?.permissions);
  if (authData?.accessToken) {
    return <Navigate to={authorizedRoute} replace />;
  }

  return <Outlet />;
}

export default PublicRoute;