import React, { createContext, useContext } from "react";
import { usePermissionHooks } from "./usePermissions";

interface PermissionContextType {
  PERMISSIONS: Record<string, any>;
  isLoading: boolean;
  error: unknown;
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

  return (
    <PermissionContext.Provider
      value={{
        PERMISSIONS: permissions?.data ?? {},
        isLoading,
        error,
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