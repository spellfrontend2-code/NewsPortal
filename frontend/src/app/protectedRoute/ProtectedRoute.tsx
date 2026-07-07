import  {Outlet, Navigate} from "react-router-dom";
import { useAuthStore } from "@/context/useAuthStore";
function ProtectedRoute({role,navigateRoute}) {
const {authData}=useAuthStore();
console.log(authData);
  const userRoles = authData?.role?.map((r) => r.toLowerCase()) || [];
  const allowedRoles = role.map((r) => r.toLowerCase());
  const validRole = userRoles.some((r) =>
    allowedRoles.includes(r)
  );
const isAuthenticated=!!authData?.accessToken && validRole;
return isAuthenticated
    ? <Outlet />
    : <Navigate to={navigateRoute} replace />;

}

export default ProtectedRoute;