import DeleteDialogBox from "@/components/Admin/dialogbox/DeleteDialogBox";
import DataTable from "@/components/Admin/table/DataTable";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { usePermission } from "@/features/auth/hooks/usePermission";
import AuthorInputForm from "@/features/authors/components/AuthorInputForm";
import AuthorView from "@/features/authors/components/AuthorView";
import { useAuthorHooks } from "@/features/authors/hooks/useAuthors";
import { usePermissionStore } from "@/features/roles-and-permissions/hooks/usePermissionStore";
import { generateColumns } from "@/lib/generateColumns";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function Authors() {
  const { hasPermission } = usePermission();
    const {PERMISSIONS,isLoading:permissionLoading}=usePermissionStore()
  const [addAuthor, setAddAuthor] = useState(false);
  const [editAuthor, setEditAuthor] = useState(false);
    const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const authorHook = useAuthorHooks();
      const [status, setStatus] = useState("");

  const { data, isLoading } = authorHook.useFetchAuthors({
    page: pagination.pageIndex + 1,
    per_page: pagination.pageSize,
    search,
  status});
  const authors = data?.data ?? [];
  const deleteAuthor=authorHook.useDeleteAuthors()
  const [sorting, setSorting] = useState([]);
const updateAuthorStatus=authorHook.useUpdateStatus()
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [updatingStatusId, setUpdatingStatusId] = useState<number | null>(null);
  const [viewAuthor, setViewAuthor] = useState(false);
  const statuses=[
    {name:"All",value:""},
    {name:"Active",value:"active"},
    {name:"Suspended",value:"suspended"},
    {name:"Banned",value:"banned"}]
  const columns = generateColumns(
    authors,
    [
      "country_code",
      "language",
      "timezone",
      "role",
      "preferences",
      "created_at",
      "email_verified_at",
      "author",
      "profile_image"
    ],
    (action, row) => {
        setSelectedAuthor(row)
      switch (action) {
        case "view":
          setViewAuthor(true)
          break;
        case "edit":
          setEditAuthor(true);
          break;
        case "delete":
          setDeleteOpen(true);
          break
      }
    },
    undefined,
    undefined,
    PERMISSIONS?.USER,
    "authors",
    (row, status) => {
  setUpdatingStatusId(row.id);
  updateAuthorStatus.mutate(
    {
      id: row.id,
      status,
    },
    {onSuccess:(res)=>{
      toast.success(res?.message||"Status updated successfully");
    },

      onSettled: () => {
        setUpdatingStatusId(null);
      },
})
},
updatingStatusId
  );
  if(addAuthor||editAuthor)
  {
    return <AuthorInputForm addAuthor={addAuthor} setAddAuthor={setAddAuthor} edit={editAuthor} setEdit={setEditAuthor} author={selectedAuthor}/>
  }
  return (
    <div className="w-full h-screen overflow-y-auto p-20 flex flex-col gap-5 ">
      <div className="flex justify-between items-end rounded-xl">
        <div className="flex flex-col  text-gray-800 ">
          <p className="text-3xl font-bold ">Authors</p>
          <p className="text-gray-500">Manage your authors</p>
        </div>
        
        {hasPermission(PERMISSIONS?.USER?.CREATE?.name) && (
          <Button
            variant="submit"
            className="h-10 flex items-center gap-2"
            onClick={() => setAddAuthor(true)}
          >
            <Plus />
            Add Authors
          </Button>
        )}
      </div>
      <DataTable
        columns={columns}
        data={authors}
        isLoading={isLoading}
        pagination={pagination}
        setPagination={setPagination}
        pageCount={data?.pagination?.last_page}
        placeholder="Authors"
        search={search}
        setSearch={setSearch}
        sorting={sorting}
        setSorting={setSorting}
        permission={PERMISSIONS?.USER?.VIEW?.name}
        permissionLoading={permissionLoading}
        statuses={statuses}
        status={status}
        setStatus={setStatus}

      />
      <DeleteDialogBox deleteOpen={deleteOpen} setDeleteOpen={setDeleteOpen} selectedField={selectedAuthor} deleteField={deleteAuthor}/>
  <Dialog open={viewAuthor} onOpenChange={setViewAuthor}>
      <DialogContent className="flex flex-col  !max-w-none p-10 max-h-[80vh] !max-w-[40vw] overflow-y-auto bg-gray-100 scrollbar-thin scrollbar-thumb-[var(--color-secondary)]">
      <AuthorView author={selectedAuthor} />
    </DialogContent>
  </Dialog>    </div>
  );
}
export default Authors;
