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
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

function DataTable({ data = [], columns, pagination, setPagination ,pageCount }) {
  console.log(pagination)
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
  pagination,
},
    onPaginationChange: setPagination,
    manualPagination: true,
    pageCount: pageCount,
  });
  return (
    <><div className="w-full max-w-full overflow-x-auto rounded-xl shadow-lg shadow-[var(--color-secondary)] scrollbar-thin border-[0.5px] border-[var(--color-secondary)]">
  <Table className="w-full min-w-[900px]">
        {/* HEADER */}
        <TableHeader>
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id} >
              {hg.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="px-6 py-3 bg-gray-100/90 border-b border-[var(--color-secondary)]"
                >
                  <p className="text-center text-gray-400">
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
            <TableRow key={row.id} className="hover:bg-gray-100/30">
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className="px-6 p-3 border-[var(--color-secondary)] border-b "
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
    <div className="flex items-center justify-between mt-4 w-full h-[40px]">
 

  <span className="shadow-md flex items-center justify-center w-[110px] h-full text-base text-[var(--color-primary)] font-semibold border-1 border-[var(--color-primary)] bg-gray-100/90 px-3 py-1 rounded-2xl">
    Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
  </span>
  <div className="shadow-md  relative flex justify-between items-center overflow-hidden w-[150px] h-full border-1 border-[var(--color-primary)] bg-gray-100/90 text-gray-400  cursor-pointer rounded-2xl group">
 <button
    onClick={() => table.previousPage()}
    disabled={!table.getCanPreviousPage()}
    className={`h-full w-1/2 flex justify-start items-center ${table.getCanPreviousPage() ? 'text-[var(--color-primary)] hover:bg-[rgb(var(--color-primary-rgb)/0.2)]' : 'text-gray-400'}  text-base cursor-pointer font-semibold disabled:cursor-not-allowed
`}      
  >
    
    <ChevronLeft strokeWidth={3} className="h-10 w-5"/>Prev
  </button>
  <div className="absolute inset-0 h-[95%] w-[1px] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[var(--color-primary)]"/>
  <button
    onClick={() => table.nextPage()}
    disabled={!table.getCanNextPage()}
    className={`h-full w-1/2 flex justify-end items-center ${table.getCanNextPage() ? 'text-[var(--color-primary)] hover:bg-[rgb(var(--color-primary-rgb)/0.2)]' : ' text-gray-400'} text-base cursor-pointer font-semibold disabled:cursor-not-allowed
`}      
  >
    Next<ChevronRight strokeWidth={3} className="h-10 w-5"/>
  </button>
  </div>
</div>
</>
  );
}
export default DataTable;