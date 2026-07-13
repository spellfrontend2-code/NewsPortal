import { usePermission } from "@/features/auth/hooks/usePermission";
import { Edit, Eye, ToggleLeft, ToggleRight, Trash, View } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { inputStyle } from "@/components/shared/styles/inputStyle";
export function generateColumns(
  data = [],
  hiddenColumns = [],
  onAction?: (action: string, row: any) => void,
  onToggleApproved?: (row: any) => void,
  updatingApprovalId?: number,
  modulePermission?: { CREATE?: any; VIEW?: any; UPDATE?: any; DELETE?: any },
  module,
   onChangeStatus?: (
    row: any,
    status: "active" | "suspended" | "banned"
  ) => void,
  updatingStatusId?: number
) {
  const { hasPermission } = usePermission();
  if (!data.length) return [];
  const sample = data[0];

  const dynamicColumns = Object.keys(sample)
    .filter((key) => !hiddenColumns.includes(key))
    .map((key) => ({
      accessorKey: key,
      header: key.toUpperCase(),
      enableColumnFilter: true,
      enableSorting: true,
      cell: (info) => {
        const value = info.getValue();
        const row = info.row.original;
  if (module === "authors" && key === "status") {
  const row = info.row.original;
  const isUpdating = updatingStatusId === row.id;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          disabled={isUpdating}
          className={`capitalize h-8 gap-2 ${inputStyle} rounded-2xl border-[var(--color-secondary)] w-[130px] cursor-pointer ${
            isUpdating ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isUpdating ? (
            <>
              <span className="h-4 w-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
              Updating...
            </>
          ) : (
            <>
              

             <p className={`${value==="active"?"text-green-600":value==="suspended"?"text-yellow-600":"text-red-600"}`}> {value}</p>

              <MoreHorizontal className="h-4 w-4" />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>

      {!isUpdating && (
        <DropdownMenuContent
          align="end"
          className="bg-white border border-[var(--color-secondary)]"
        >
          {value !== "active" && (
            <DropdownMenuItem
              onClick={() => onChangeStatus?.(row, "active")}
            >
               Active
            </DropdownMenuItem>
          )}

          {value !== "suspended" && (
            <DropdownMenuItem
              onClick={() => onChangeStatus?.(row, "suspended")}
            >
               Suspended
            </DropdownMenuItem>
          )}

          {value !== "banned" && (
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => onChangeStatus?.(row, "banned")}
            >
              Banned
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
        if(key==="icon")
        {
          return <i className={value}></i>
        }
        if (key === "permissions") {
          return (
            <div className="flex flex-wrap justify-start items-center gap-2">
              {Array.isArray(value) &&
                value.map((permission: string) => (
                  <span
                    key={permission}
                    className="px-2 py-1 rounded-full text-xs bg-[rgb(var(--color-primary-rgb)/0.07)] text-[var(--color-primary)]"
                  >
                    {permission}
                  </span>
                ))}
            </div>
          );
        }

        if (key === "approved") {
          return (
            <div className="flex items-center justify-center">
              <button
                type="button"
                disabled={updatingApprovalId === row.id}
                onClick={() => onToggleApproved?.(row)}
                className={`cursor-pointer ${
                  updatingApprovalId === row.id
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                title={
                  updatingApprovalId === row.id
                    ? "Updating..."
                    : value
                      ? "Disable approval"
                      : "Approve"
                }
              >
                {updatingApprovalId === row.id ? (
                  <div className="h-7 w-7 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                ) : value ? (
                  <ToggleRight
                    className="text-green-500 fill-green-300/20"
                    size={30}
                  />
                ) : (
                  <ToggleLeft
                    className="text-red-500 fill-red-300/20"
                    size={30}
                  />
                )}
              </button>
            </div>
          );
        }
        if (key === "is_headline_news") {
          return value ? "Yes" : "No";
        }

        if (typeof value === "object" && value !== null) {
          return JSON.stringify(value);
        }

        return value ?? "-";
      },
    }));
  const actionsColumn = {
    id: "actions",
    header: "ACTIONS",
    enableColumnFilter: false,
    enableSorting: false,

    cell: ({ row }) => {
      const original = row.original;

      return (
        <div className="flex justify-center gap-3">
          {hasPermission(modulePermission?.VIEW?.name) && (module!=="roles") && (
            <div
              className="p-1 border border-transparent rounded-lg cursor-pointer text-gray-600 hover:text-[var(--color-primary)] hover:bg-[rgb(var(--color-primary-rgb)/0.1)] hover:border-[var(--color-primary)]"
              title={"View"}
              onClick={() => {
                onAction?.("view", original);
              }}
            >
              <Eye strokeWidth={1.5} size={20} />
            </div>
          )}
          {hasPermission(modulePermission?.UPDATE?.name) && (
            <div
              className="p-1 border border-transparent rounded-lg cursor-pointer text-gray-600 hover:text-blue-500 hover:bg-blue-500/10 hover:border-blue-500"
              title={"Edit"}
              onClick={() => {
                onAction?.("edit", original);
              }}
            >
              <Edit strokeWidth={1.5} size={20} />
            </div>
          )}
          {hasPermission(modulePermission?.DELETE?.name) && (
            <div
              className="p-1 border border-transparent rounded-lg cursor-pointer text-gray-600 hover:text-red-500 hover:bg-red-500/10 hover:border-red-500"
              title={"Delete"}
              onClick={() => {
                onAction?.("delete", original);
              }}
            >
              <Trash strokeWidth={1.5} size={20} />
            </div>
          )}
        </div>
      );
    },
  };
  return [...dynamicColumns, actionsColumn];
}
