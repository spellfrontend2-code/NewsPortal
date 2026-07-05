import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function DataTableSkeleton({ columns=6, rows = 10 }) {
  return (
    <div className="w-full max-w-full overflow-x-auto rounded-xl shadow-lg shadow-[var(--color-secondary)] scrollbar-thin border-[0.5px] border-[var(--color-secondary)]">
  
  <Table className="w-full min-w-[900px]">
        <TableHeader>
          <TableRow className="bg-gray-100">
            {Array.from({ length: columns }).map((_, i) => (
              <TableHead key={i} className="px-6 py-3 border-b-[1px] border-[var(--color-secondary)] bg-gray-100"
>
                <div className="h-5 w-24 animate-pulse rounded bg-gray-200" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.from({ length: rows }).map((_, row) => (
            <TableRow key={row}>
              {Array.from({ length: columns }).map((_, col) => (
                <TableCell key={col} className="px-6 border-b-[1px] border-[var(--color-secondary)]  p-3"
>
                  <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default DataTableSkeleton;