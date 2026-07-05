import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../../layout/AdminLayout";
import Dashboard from "../../pages/Admin/Dashboard/Dashboard";
import Articles from "../../pages/Admin/Articles/Articles";
import Categories from "../../pages/Admin/Categories/Categories";
import AdminLogin from "../../pages/Admin/Auth/AdminLogin";
import ProtectedRoute from "../protectedRoute/ProtectedRoute";
import Media from "@/pages/Admin/Media/Media";
import Tags from "@/pages/Admin/Tags/Tags";
import Advertisements from "@/pages/Admin/Advertisements/Advertisements";
import Settings from "@/pages/Admin/Settings/Settings";

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
            path: "articles",
            element: <Articles />,
          },
          {
            path: "categories",
            element: <Categories />,
          },
           {
            path: "media",
            element: <Media />,
          },
          {
            path:"tags",
            element:<Tags/>
          },
          {
            path:"advertisements",
            element:<Advertisements/>
          },
          {
            path:"settings",
            element:<Settings/>
          }
        ],
      },
    ],
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path:"/*",
    element:<h1>Home</h1>
  }
]);
