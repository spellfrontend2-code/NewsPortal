import { usePermission } from "@/features/auth/hooks/usePermission";
import { Edit, Eye, ToggleLeft, ToggleRight, Trash, View } from "lucide-react";

export function generateColumns(
  data = [],
  hiddenColumns = [],
  onAction?: (action: string, row: any) => void,
  onToggleApproved?: (row: any) => void,
  updatingApprovalId?: number,
  modulePermission?: { CREATE?: any; VIEW?: any; UPDATE?: any; DELETE?: any },
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
          {hasPermission(modulePermission?.VIEW?.name) && (
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
