import DeleteDialogBox from "@/components/Admin/dialogbox/DeleteDialogBox";
import DataTable from "@/components/Admin/table/DataTable";
import { Button } from "@/components/ui/button";
import AddAdvertisement from "@/features/advertisements/components/AddAdvertisement";
import AdvertisementView from "@/features/advertisements/components/AdvertisementView";
import { useAdvertisementHooks } from "@/features/advertisements/hooks/useAdvertisements";
import { generateColumns } from "@/lib/generateColumns";
import { Plus } from "lucide-react";
import {  useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { usePermission } from "@/features/auth/hooks/usePermission";
import { PERMISSIONS } from "@/features/auth/constants/permissions";
function Advertisements() {
  const {hasPermission}=usePermission()
  const advertisementHook = useAdvertisementHooks();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState([]);
  const [search, setSearch] = useState("");
const statuses = [
  {name:"All",value:""},
  { name: "Draft", value: "draft" },
  { name: "Active", value: "active" },
  { name: "Paused", value: "paused" },
  { name: "Ended", value: "ended" },
  { name: "Pending", value: "pending_approval" },
  { name: "Rejected", value: "rejected" },
  { name: "Archived", value: "archived" },
];
  const approvalStatus = [
    {name:"All",value:undefined},{
      name: "Approved",
      value: 1,
    },
    { name: "Rejected", value: 0 },
  ];
  const [approved, setApproved] = useState(undefined);
  const [status, setStatus] = useState("");
  const { data, isLoading, error } = advertisementHook.useFetchAdvertisements({
    page: pagination.pageIndex + 1,
    per_page: pagination.pageSize,
    search,
    status,
    is_approved:approved,
  });
 
  const deleteAdvertisement = advertisementHook.useDeleteAdvertisement();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedAdvertisement, setSelectedAdvertisement] = useState(null);
  const advertisements = data?.data ?? [];
const updateAdvertisementApproval=advertisementHook.useUpdateAdvertisementApproval()
const [updatingApprovalId, setUpdatingApprovalId] = useState(null);

const updateApproval = (row) => {
  setUpdatingApprovalId(row.id);

  updateAdvertisementApproval.mutate(row.id, {
    onSettled: () => {
      setUpdatingApprovalId(null);
    },
  });
};
const columns = generateColumns(
    advertisements,
    [
      "id",
      "image_url",
      "video_url",
      "video_thumbnail",
      "html_code",
      "advertiser_website",
      "text_content",
      "target_url",
      "placement",
      "target_categories",
      "target_categories_ids",
      "target_tags",
      "target_tags_ids",
      "target_countries",
      "target_devices",
      "target_audiences",
      "starts_at",
      "ends_at",
      "daily_start_time",
      "daily_end_time",
      "pricing_model",
      "daily_budget",
      "slug",
      "target_blank",
      "total_budget",
      "price",
      "advertiser_email",
      "cta_text",
      "created_at",
    ],
    (action, row) => {
      setSelectedAdvertisement(row);
      switch (action) {
        case "add":
          setAddOpen(true);
          break;
        case "edit":
          setEditOpen(true);
          break;
        case "delete":
          setDeleteOpen(true);
          break;
        case "view":
          setViewOpen(true);
          break;
      }
    },
updateApproval,
updatingApprovalId,
PERMISSIONS.ADS  );
  if (error) toast.error(error?.message);
  return (
    <div className="w-full h-screen overflow-y-auto p-20 flex flex-col gap-5">
      {addOpen ? (
        <AddAdvertisement open={addOpen} setOpen={setAddOpen} type="add" />
      ) : editOpen ? (
        <AddAdvertisement
          open={editOpen}
          setOpen={setEditOpen}
          advertisement={selectedAdvertisement}
          type="edit"
        />
      ) : (
        <>
          <div className="flex justify-between items-end rounded-xl ">
            <div className="flex flex-col  text-gray-800 ">
              <p className="text-3xl font-bold ">Advertisements</p>
              <p className="text-gray-500">Manage your advertisements</p>
            </div>
           {hasPermission(PERMISSIONS.ADS.CREATE) && <Button
              variant="submit"
              className="h-10 flex items-center gap-2"
              onClick={() => setAddOpen(true)}
            >
              <Plus />
              Add Advertisement
            </Button>}
          </div>

          {error ? (
            <p>No Advertisements Found.</p>
          ) : (
            hasPermission(PERMISSIONS.ADS.VIEW) && <DataTable
              columns={columns}
              data={advertisements}
              pagination={pagination}
              setPagination={setPagination}
              pageCount={data?.pagination?.last_page}
              sorting={sorting}
              setSorting={setSorting}
              isLoading={isLoading}
              search={search}
              setSearch={setSearch}
              placeholder="Advertisements"
              statuses={statuses}
              status={status}
              setStatus={setStatus}
              approvalStatus={approvalStatus}
              approved={approved}
              setApproved={setApproved}
            />
          )}
        </>
      )}
      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent className="flex flex-col  !max-w-none p-10 max-h-[80vh] !max-w-[50vw] overflow-y-auto bg-gray-100 scrollbar-thin scrollbar-thumb-[var(--color-secondary)]">
          <AdvertisementView advertisement={selectedAdvertisement} />
        </DialogContent>
      </Dialog>
      <DeleteDialogBox
        deleteOpen={deleteOpen}
        setDeleteOpen={setDeleteOpen}
        selectedField={selectedAdvertisement}
        deleteField={deleteAdvertisement}
      />
    </div>
  );
}

export default Advertisements;
