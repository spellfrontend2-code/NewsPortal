import React, { createContext, useContext } from "react";
import { usePermissionHooks } from "./usePermissions";

interface PermissionContextType {
  PERMISSIONS: Record<string, any>;
  isLoading: boolean;
  error: unknown;
  getDefaultRoute: (permissions: string[]) => string;
}

const PermissionContext = createContext<PermissionContextType | undefined>(
  undefined
);

export function PermissionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const permissionHook = usePermissionHooks();

  const {
    data: permissions,
    isLoading,
    error,
  } = permissionHook.useFetchPermissions();
 const PERMISSIONS=permissions?.data ?? {}
const DEFAULT_ROUTES = [
  {
    permission: "dashboard.view",
    route: "/admin",
  },
  {
    permission: "article.view",
    route: "/admin/articles",
  },
  {
    permission: "category.view",
    route: "/admin/categories",
  },
  {
    permission: "tag.view",
    route: "/admin/tags",
  },
  {
    permission: "media.view",
    route: "/admin/media",
  },
];

 const getDefaultRoute = (permissions: string[]) => {
  const route = DEFAULT_ROUTES.find((item) =>
    permissions.includes(item.permission)
  );
  return route?.route || "/admin/profile";
};
  return (
    <PermissionContext.Provider
      value={{
       PERMISSIONS,
        isLoading,
        error,
        getDefaultRoute
      }}
    >
      {children}
    </PermissionContext.Provider>
  );
}

export function usePermissionStore() {
  const context = useContext(PermissionContext);

  if (context === undefined) {
    throw new Error(
      "usePermissionStore must be used within PermissionProvider"
    );
  }

  return context;
}