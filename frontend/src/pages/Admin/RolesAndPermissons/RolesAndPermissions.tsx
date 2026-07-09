import DataTable from "@/components/Admin/table/DataTable";
import { Button } from "@/components/ui/button";
import { PERMISSIONS } from "@/features/auth/constants/permissions";
import { usePermission } from "@/features/auth/hooks/usePermission";
import { usePermissionHooks } from "@/features/permissions/hooks/usePermissions";
import { generateColumns } from "@/lib/generateColumns";
import RolesAndPermissionManagement from "@/features/roles-and-permissions/components/RolesAndPermissionManagement";
import { Plus } from "lucide-react";
import {  useState } from "react";
import DeleteDialogBox from "@/components/Admin/dialogbox/DeleteDialogBox";

function RolesAndPermissions() {
  const permissionHook = usePermissionHooks();
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const { data, isLoading } = permissionHook.useFetchRoleBasedPermissions();
  const roleBasedPermissions = data?.data ?? [];
  const deleteRole = permissionHook.useDeleteRole();
  const [sorting, setSorting] = useState([]);
  const [search, setSearch] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen,setEditOpen]=useState(false)
const [selectedRole, setSelectedRole] = useState<{
  name: string;
  permissions: string[];
} | null>(null);  
  const columns = generateColumns(
    roleBasedPermissions,
    [],
    (action, row) => {
      setSelectedRole(row);
      switch (action) {
        case "delete":
          setDeleteOpen(true);
          break;
        case "edit":
          setEditOpen(true)
          break;
      }
    },
    undefined,
    undefined,
    PERMISSIONS.ROLE,
  );

  const {hasPermission}=usePermission();
  const [addOpen, setAddOpen] = useState(false);
  if(addOpen)
  {
    return <RolesAndPermissionManagement setOpen={setAddOpen} open={addOpen} role={""} type="add"/>
  }
  if(editOpen)
  {
    return <RolesAndPermissionManagement setOpen={setEditOpen} open={editOpen} role={selectedRole} type="edit"/>
  }
  return (
    <div className="w-full h-screen overflow-y-auto p-20 flex flex-col gap-5">
       <div className="flex justify-between items-end rounded-xl ">
            <div className="flex flex-col  text-gray-800 ">
              <p className="text-3xl font-bold ">Roles and Permissions</p>
              <p className="text-gray-500">Manage your roles and permissions</p>
            </div>
           {hasPermission(PERMISSIONS.ADS.CREATE) && <Button
              variant="submit"
              className="h-10 flex items-center gap-2"
              onClick={() => setAddOpen(true)}
            >
              <Plus />
              Add Role
            </Button>}
          </div>
      <DataTable
        data={roleBasedPermissions}
        columns={columns}
        pagination={pagination}
        setPagination={setPagination}
        isLoading={isLoading}
        placeholder=" roles "
        pageCount={data?.pagination?.last_page}
        sorting={sorting}
        setSorting={setSorting}
        search={search}
        setSearch={setSearch}
      />
      <DeleteDialogBox
        deleteOpen={deleteOpen}
        setDeleteOpen={setDeleteOpen}
        selectedField={selectedRole}
        deleteField={deleteRole}
        />
    </div>
  );
}

export default RolesAndPermissions;
