import {
  Table,
  TableBody,
  TableHeader,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

function DataTable({ data = [], columns }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full max-w-full overflow-x-auto scrollbar-thin">
  
  <Table className="w-full min-w-[900px]">
        {/* HEADER */}
        <TableHeader>
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id} >
              {hg.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="px-6 py-3 border-[1px] border-[var(--color-secondary)] bg-gray-100"
                >
                  <p className="text-center">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </p>
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        {/* BODY */}
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className="px-6 border-[1px] border-[var(--color-secondary)]  p-3"
                >
                  <p className="line-clamp-3 text-sm text-center">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </p>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>

      </Table>
    
    </div>
  );
}
export default DataTable;