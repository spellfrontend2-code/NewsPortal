import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../../layout/AdminLayout";
import Dashboard from "../../pages/Admin/Dashboard/Dashboard";
import News from "../../pages/Admin/News/News";
import Categories from "../../pages/Admin/Categories/Categories";
import AdminLogin from "../../pages/Admin/Auth/AdminLogin";
import ProtectedRoute from "../protectedRoute/protectedRoute";

export const router = createBrowserRouter([
  {
    path: "/admin",
    element: <ProtectedRoute role={["admin"]} navigateRoute="/admin/login" />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "news",
            element: <News />,
          },
          {
            path: "categories",
            element: <Categories />,
          },
        ],
      },
    ],
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
]);
