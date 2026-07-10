import { inputStyle } from "@/components/shared/styles/inputStyle";
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
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import DataTableSkeleton from "./DataTableSkeleton";
import StatusDropdown from "@/components/shared/StatusDropdown";
import { usePermission } from "@/features/auth/hooks/usePermission";

function DataTable({
  data = [],
  columns,
  pagination,
  setPagination,
  pageCount,
  sorting,
  setSorting,
  search,
  setSearch,
  isLoading,
  placeholder,
  status={},
  setStatus={},
  statuses=[],
  approvalStatus=[],
  approved={},
  setApproved={},
  permission,
  permissionLoading

}) {
  const {hasPermission}=usePermission()
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      pagination,
      sorting,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    manualPagination: true,
    pageCount: pageCount,

    getSortedRowModel: getSortedRowModel(),
  });
  if(!permissionLoading && !hasPermission(permission))
    return <p>No permission</p>
  return (
    <>
      <div className="w-full max-w-full overflow-x-auto rounded-xl shadow-lg shadow-[var(--color-secondary)] scrollbar-thin border-[0.5px] border-[var(--color-secondary)]">
        <div className=" ">
          <div className="flex justify-between max-w-[95%]">
            <div
              className={`${inputStyle} flex items-center gap-2 max-w-[30%] m-3`}
            >
              <Search strokeWidth={1.5} size={20} />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPagination((prev) => ({
                    ...prev,
                    pageIndex: 0,
                  }));
                }}
                placeholder={`Search ${placeholder}...`}
                className="bg-transparent outline-none focus:outline-none w-full "
              />
            </div>
            <div className="flex gap-2"><div>
              {
                approvalStatus.length>0 && <StatusDropdown statuses={approvalStatus} status={approved} setStatus={setApproved} />
              }
            </div>
            <div>
              {statuses.length>0 && (
                <StatusDropdown
                  statuses={statuses}
                  status={status}
                  setStatus={setStatus}
                />
              )}
            </div>
            </div>
          </div>
        </div>
        {(isLoading || permissionLoading) ? (
          <DataTableSkeleton />
        ) : (
          <Table className="w-full min-w-[900px]">
            {/* HEADER */}
            <TableHeader >
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id}>
                  {hg.headers.map((header) => (
                    <TableHead
                      onClick={header.column.getToggleSortingHandler()}
                      key={header.id}
                      className="px-6 py-3 bg-gray-100/90 border-b border-[var(--color-secondary)]"
                    >
                      <p className="cursor-pointer text-center text-gray-400 ">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                        {header.column.getCanSort() && (
  {
    asc: "↑",
    desc: "↓",
  }[header.column.getIsSorted()] ?? "↕")}
                      </p>
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            {/* BODY */}
            {data.length > 0 ? (
              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} className="hover:bg-gray-100/30">
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="px-6 p-3 border-[var(--color-secondary)] border-b "
                      >
                        <p className="line-clamp-3 text-sm text-center">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </p>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            ) : (
               <TableBody>
  <TableRow>
    <TableCell colSpan={columns.length}>
      <div className="w-full h-[300px] flex justify-center items-center text-2xl font-bold text-[var(--color-primary)]">
        No {placeholder} Found
      </div>
    </TableCell>
  </TableRow>
</TableBody>
            )}
          </Table>
        )}
      </div>
      <div className="flex items-center justify-between mt-4 w-full h-[40px]">
        <span className="shadow-md flex items-center justify-center w-[110px] h-full text-base text-[var(--color-primary)] font-semibold border-1 border-[var(--color-primary)] bg-gray-100/90 px-3 py-1 rounded-2xl">
          Page {table?.getState()?.pagination?.pageIndex + 1 || 1} of{" "}
          {table?.getPageCount()||1}
        </span>
        <div className="shadow-md  relative flex justify-between items-center overflow-hidden w-[150px] h-full border-1 border-[var(--color-primary)] bg-gray-100/90 text-gray-400  cursor-pointer rounded-2xl group">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className={`h-full w-1/2 flex justify-start items-center ${table.getCanPreviousPage() ? "text-[var(--color-primary)] hover:bg-[rgb(var(--color-primary-rgb)/0.2)]" : "text-gray-400"}  text-base cursor-pointer font-semibold disabled:cursor-not-allowed
`}
          >
            <ChevronLeft strokeWidth={3} className="h-10 w-5" />
            Prev
          </button>
          <div className="absolute inset-0 h-[95%] w-[1px] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[var(--color-primary)]" />
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className={`h-full w-1/2 flex justify-end items-center ${table.getCanNextPage() ? "text-[var(--color-primary)] hover:bg-[rgb(var(--color-primary-rgb)/0.2)]" : " text-gray-400"} text-base cursor-pointer font-semibold disabled:cursor-not-allowed
`}
          >
            Next
            <ChevronRight strokeWidth={3} className="h-10 w-5" />
          </button>
        </div>
      </div>
    </>
  );
}
export default DataTable;
