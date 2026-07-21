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
import RolesAndPermissions from "@/pages/Admin/RolesAndPermissons/RolesAndPermissions";
import Authors from "@/pages/Admin/Authors/Authors";
import Profile from "@/pages/Admin/Profile/Profile";
import PublicLayout from "@/layout/PublicLayout";
import Home from "@/pages/Public/Home/Home";
import PublicRoute from "../protectedRoute/PublicRoute";
import { publicCategoriesQuery } from "@/features/categories/hooks/useCategories";
import { type QueryClient } from "@tanstack/react-query";
import { queryClient } from "@/services/queryClient";
import NewsDetail from "@/pages/Public/News/NewsDetail";
import Unauthorized from "@/pages/Error/Unauthorized";
import LatestNewsList from "@/features/articles/components/Public/NewsList/LatestNewsList";
import CategoryBasedNewsList from "@/features/articles/components/Public/NewsList/CategoryBasedNewsList";
import ErrorPage from "@/pages/Error/ErrorPage";
const publicLayoutLoader = (queryClient: QueryClient) => async () => {
  await queryClient.ensureQueryData(publicCategoriesQuery({ page: 1, per_page: 5 }));

  return null;
};
export const router = createBrowserRouter([
  {
    path: "/admin",
    element: <ProtectedRoute navigateRoute="/admin/login" />,
    errorElement: <ErrorPage />,
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
            path: "tags",
            element: <Tags />,
          },
          {
            path: "advertisements",
            element: <Advertisements />,
          },
          {
            path: "settings",
            element: <Settings />,
          },

          {
            path: "roles-and-permissions",
            element: <RolesAndPermissions />,
          },
          { path: "authors", element: <Authors /> },
          {
            path: "profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
  {
    path: "/admin/login",
    element: <PublicRoute />,
    children: [
      {
        index: true,
        element: <AdminLogin />,
      },
    ],
  },
  {
    path: "/",
    element: <PublicLayout />,
    errorElement: <ErrorPage />,
    loader: publicLayoutLoader(queryClient),

    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "news/:slug",
        element: <NewsDetail />,
      },
      {
        path: "news-list/latest-news",

        element: <LatestNewsList />,
      },
      {
        path: "news-list/category/:slug",
        element: <CategoryBasedNewsList />,
      },
    ],
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
]);
