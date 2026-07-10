import { usePermission } from "@/features/auth/hooks/usePermission";
import { useUsersHooks } from "@/features/users/hooks/useUsers";
import { generateColumns } from "@/lib/generateColumns";
import DataTable from "@/components/Admin/table/DataTable";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import DeleteDialogBox from "@/components/Admin/dialogbox/DeleteDialogBox";
import { usePermissionStore } from "@/features/roles-and-permissions/hooks/usePermissionStore";
function Users() {
  const { hasPermission } = usePermission();
    const {PERMISSIONS,isLoading:permissionLoading}=usePermissionStore()
    console.log(PERMISSIONS?.USER?.VIEW?.name)
  const userHook = useUsersHooks();
  const [sorting, setSorting] = useState([]);
  const [search, setSearch] = useState("");
  const { data, isLoading } = userHook.useFetchUsers();
  const [addUser, setAddUser] = useState(false);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const users = data?.data ?? [];
  const [deleteOpen, setDeleteOpen] = useState(false);
    const deleteUser=userHook.useDeleteUser()
  const [selectedUser,setSelectedUser]=useState(null);
  const columns = generateColumns(
    users,
    [
      "preferences",
      "country_code",
      "author",
      "created_at",
      "role",
      "email_verified_at",
    ],
    (action, row) => {
      setSelectedUser(row)
      switch (action) {
        case "delete":
          setDeleteOpen(true);
          break;
      }
    },
    undefined,
    undefined,
    PERMISSIONS.USER,
  );
  return (
    <div className="w-full h-screen overflow-y-auto p-20 flex flex-col gap-5">
      <div className="flex justify-between items-end rounded-xl ">
        <div className="flex flex-col  text-gray-800 ">
          <p className="text-3xl font-bold ">Users</p>
          <p className="text-gray-500">Manage your users</p>
        </div>
        {hasPermission(PERMISSIONS?.USER?.CREATE?.name) && (
          <Button
            variant="submit"
            className="h-10 flex items-center gap-2"
            onClick={() => setAddUser(true)}
          >
            <Plus />
            Add User
          </Button>
        )}
      </div>

        <DataTable
            data={users}
          columns={columns}
          isLoading={isLoading}
          pagination={pagination}
          setPagination={setPagination}
          pageCount={data?.pagination?.last_page}
          sorting={sorting}
          setSorting={setSorting}
          search={search}
          setSearch={setSearch}
          placeholder="Users"
          permission={PERMISSIONS?.USER?.VIEW?.name}
          permissionLoading={permissionLoading}
        />
      <DeleteDialogBox deleteOpen={deleteOpen} setDeleteOpen={setDeleteOpen} deleteField={deleteUser} selectedField={selectedUser} />
    </div>
  );
}

export default Users;
