import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/context/useAuthStore";
import PageTitle from "@/app/routes/pageTitle";

function PublicRoute() {
  const { authData } = useAuthStore();

  if (authData?.accessToken) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <>
      <PageTitle />
      <Outlet />
    </>
  );
}

export default PublicRoute;