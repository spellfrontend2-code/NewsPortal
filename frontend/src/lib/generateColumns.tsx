import {  Edit, Eye, Trash } from "lucide-react";

export function generateColumns(data = [],hiddenColumns=[],  onAction?: (action: string, row: any) => void
) {
  if (!data.length) return [];
  const sample = data[0];

const dynamicColumns = Object.keys(sample)
  .filter((key) => !hiddenColumns.includes(key)).map((key) => ({
    accessorKey: key,
    header: key.toUpperCase(),
    cell: (info) => {
      const value = info.getValue();

      if (typeof value === "object" && value !== null) {
        return JSON.stringify(value);
      }

      return value ?? "-";
    },
  }))
  const actionsColumn = {
    id: "actions",
    header: "ACTIONS",

    cell: ({ row }) => {
      const original = row.original;

      return (
        <div className="flex justify-center gap-3">
          <div onClick={() => {onAction?.("view",original)}} className="cursor-pointer text-xs font-semibold text-[var(--primary-color)] hover:text-[rgb(var(--primary-rgb)/0.7)] flex gap-1 border-[1.5px] p-1 rounded-xl uppercase border-[var(--primary-color)]"><Eye className="" strokeWidth={1.5} size={15} />
          view</div>
          <div className="cursor-pointer text-xs font-semibold text-blue-300 hover:text-blue-500 flex gap-1 border-[1.5px] p-1 rounded-xl uppercase border-blue-300 hover:border-blue-500" onClick={() => {onAction?.("edit",original)}}>
            <Edit  strokeWidth={1.5}  size={15} />
          Edit
          </div>
          <div className="cursor-pointer text-xs font-semibold text-red-300 hover:text-red-500 flex gap-1 border-[1.5px] p-1 rounded-xl uppercase border-red-300 hover:border-red-500" onClick={() => {onAction?.("delete",original)}}><Trash  strokeWidth={1.5} size={15} />
    Delete
    </div>
        </div>

      );
    },
  };
  return [...dynamicColumns,actionsColumn];
}