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
import AddArticle from "@/features/articles/components/Admin/AddArticle";
import AddAdvertisement from "@/features/advertisements/components/AddAdvertisement";
import RolesAndPermissionManagement from "@/features/roles-and-permissions/components/RolesAndPermissionManagement";
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
import { PermissionProvider } from "@/features/roles-and-permissions/hooks/usePermissionStore";
import ContactUs from "@/pages/Public/ContactUs/ContactUs";
import TagsBasedNewsListPage from "@/features/articles/components/Public/NewsList/TagsBasedNewsListPage";
const publicLayoutLoader = (queryClient: QueryClient) => async () => {
  await queryClient.ensureQueryData(publicCategoriesQuery({ page: 1, per_page: 5 }));

  return null;
};
export const router = createBrowserRouter([
  {
    path: "/admin",
    element: (
      <PermissionProvider>
        <ProtectedRoute navigateRoute="/admin/login" />
      </PermissionProvider>
    ),
    errorElement: <ErrorPage />,
    handle: { title: "Admin" },

    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
            handle: { title: "Dashboard" },
          },
          {
            path: "articles",
            element: <Articles />,
            handle: { title: "Articles" },
          },
          {
            path: "articles/create",
            element: <AddArticle type="add" />,
            handle: { title: "Create Article" },
          },
          {
            path: "articles/:slug/edit",
            element: <AddArticle type="edit" />,
            handle: { title: "Edit Article" },
          },
          {
            path: "categories",
            element: <Categories />,
            handle: { title: "Categories" },
          },
          {
            path: "media",
            element: <Media />,
            handle: { title: "Media" },
          },
          {
            path: "tags",
            element: <Tags />,
            handle: { title: "Tags" },
          },
          {
            path: "advertisements",
            element: <Advertisements />,
            handle: { title: "Advertisements" },
          },
          {
            path: "advertisements/create",
            element: <AddAdvertisement type="add" />,
            handle: { title: "Create Advertisement" },
          },
          {
            path: "advertisements/:id/edit",
            element: <AddAdvertisement type="edit" />,
            handle: { title: "Edit Advertisement" },
          },
          {
            path: "settings",
            element: <Settings />,
            handle: { title: "Settings" },
          },
          {
            path: "roles-and-permissions",
            element: <RolesAndPermissions />,
            handle: { title: "Roles & Permissions" },
          },
          {
            path: "roles-and-permissions/create",
            element: <RolesAndPermissionManagement type="add" />,
            handle: { title: "Create Role" },
          },
          {
            path: "roles-and-permissions/:id/edit",
            element: <RolesAndPermissionManagement type="edit" />,
            handle: { title: "Edit Role" },
          },
          {
            path: "authors",
            element: <Authors />,
            handle: { title: "Authors" },
          },
          {
            path: "profile",
            element: <Profile />,
            handle: { title: "Profile" },
          },
        ],
      },
    ],
  },

  {
    path: "/admin/login",
    element: (
      <PermissionProvider>
        <PublicRoute />
      </PermissionProvider>
    ),
    children: [
      {
        index: true,
        element: <AdminLogin />,
        handle: { title: "Admin Login" },
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
        handle: { title: "Home" },
      },
      {
        path: "news/:slug",
        element: <NewsDetail />,
        handle: { title: "News" },
      },
      {
        path: "news-list/latest-news",
        element: <LatestNewsList />,
        handle: { title: "Latest News" },
      },
      {
        path: "news-list/category/:slug",
        element: <CategoryBasedNewsList />,
        handle: { title: "Category News" },
      },
        {
        path: "news-list/tags/:slug",
        element: <TagsBasedNewsListPage/>,
        handle: { title: "Tags News" },
      },
      {
        path: "contact-us",
        element: <ContactUs />,
        handle: { title: "Contact Us" },
      },
    ],
  },

  {
    path: "/unauthorized",
    element: <Unauthorized />,
    handle: { title: "Unauthorized" },
  },
]);
