import {  Edit, Eye, Trash, View } from "lucide-react";

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
          {/* <div title={"View"} onClick={() => {onAction?.("view",original)}} className="cursor-pointer text-sm font-semibold text-[var(--color-secondary)] bg-[rgb(var(--color-secondary-rgb)/0.1)] hover:text-[var(--color-primary)] text-[var(--color-secondary)] flex gap-1 border-[1.5px] p-1 rounded-lg uppercase  border-[rgb(var(--color-secondary-rgb)/0.1)]"><Eye className="" strokeWidth={1.5} size={15} />
          </div> */}
          <div className="p-1 border border-transparent rounded-lg cursor-pointer text-gray-600 hover:text-[var(--color-primary)] hover:bg-[rgb(var(--color-primary-rgb)/0.1)] hover:border-[var(--color-primary)]" title={"View"} onClick={()=>{onAction?.("view",original)}}><Eye  strokeWidth={1.5} size={20} /></div>
          <div className="p-1 border border-transparent rounded-lg cursor-pointer text-gray-600 hover:text-blue-500 hover:bg-blue-500/10 hover:border-blue-500" title={"Edit"} onClick={()=>{onAction?.("edit",original)}}><Edit  strokeWidth={1.5} size={20} /></div>
          <div className="p-1 border border-transparent rounded-lg cursor-pointer text-gray-600 hover:text-red-500 hover:bg-red-500/10 hover:border-red-500" title={"Delete"} onClick={()=>{onAction?.("delete",original)}}><Trash  strokeWidth={1.5} size={20} /></div>

          {/* <div title={"Edit"} className="cursor-pointer text-xs font-semibold text-blue-300 hover:text-blue-500 flex gap-1 border-[1.5px] p-1 rounded-lg uppercase border-blue-300 hover:border-blue-500" onClick={() => {onAction?.("edit",original)}}>
            <Edit  strokeWidth={1.5}  size={15} />
          </div> */}
          {/* <div title={"Delete"} className="cursor-pointer text-xs font-semibold text-red-300 hover:text-red-500 flex gap-1 border-[1.5px] p-1 rounded-lg uppercase border-red-300 hover:border-red-500" onClick={() => {onAction?.("delete",original)}}><Trash  strokeWidth={1.5} size={15} /> */}
    
    </div>

      );
    },
  };
  return [...dynamicColumns,actionsColumn];
}