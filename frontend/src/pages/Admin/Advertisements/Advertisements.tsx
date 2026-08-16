import DeleteDialogBox from "@/components/Admin/dialogbox/DeleteDialogBox";
import DataTable from "@/components/Admin/table/DataTable";
import { Button } from "@/components/ui/button";
import AdvertisementView from "@/features/advertisements/components/AdvertisementView";
import { useAdvertisementHooks } from "@/features/advertisements/hooks/useAdvertisements";
import { generateColumns } from "@/lib/generateColumns";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { usePermission } from "@/features/auth/hooks/usePermission";
import { usePermissionStore } from "@/features/roles-and-permissions/hooks/usePermissionStore";
import { useNavigate } from "react-router-dom";

function Advertisements() {
  const navigate = useNavigate();
  const { hasPermission } = usePermission();
  const { PERMISSIONS, isLoading: permissionLoading } = usePermissionStore();
  const advertisementHook = useAdvertisementHooks();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState([]);
  const [search, setSearch] = useState("");
  const statuses = [
    { name: "All", value: "" },
    { name: "Draft", value: "draft" },
    { name: "Active", value: "active" },
    { name: "Paused", value: "paused" },
    { name: "Ended", value: "ended" },
    { name: "Pending", value: "pending_approval" },
    { name: "Rejected", value: "rejected" },
    { name: "Archived", value: "archived" },
  ];
  const placements = [
    { name: "All", value: "" },
    { name: "Header", value: "header" },
    { name: "Sidebar", value: "sidebar" },
    { name: "Banner", value: "banner" },
    { name: "Popup", value: "popup" },
    { name: "In-Feed", value: "in_feed" },
    { name: "Footer", value: "footer" },
  ];
  const approvalStatus = [
    { name: "All", value: "" },
    { name: "Approved", value: "1" },
    { name: "Rejected", value: "0" },
  ];

  const [approved, setApproved] = useState("");
  const [status, setStatus] = useState("");
  const [placement, setPlacement] = useState("");
  const { data, isLoading, error } = advertisementHook.useFetchAdvertisements({
    page: pagination.pageIndex + 1,
    per_page: pagination.pageSize,
    search,
    status,
    is_approved: approved === "" ? undefined : Number(approved),
    placement,
  });

  const deleteAdvertisement = advertisementHook.useDeleteAdvertisement();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedAdvertisement, setSelectedAdvertisement] = useState(null);
  const advertisements = data?.data ?? [];
  const updateAdvertisementApproval =
    advertisementHook.useUpdateAdvertisementApproval();
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
      "click_url",
      "button_text",
      "target_categories",
      "target_categories_ids",
      "target_tags",
      "target_tags_ids",
      "target_countries",
      "target_devices",
      "target_audiences",
      "starts_at",
      "ends_at",
      "start_date",
      "end_date",
      "daily_start_time",
      "daily_end_time",
      "start_time",
      "end_time",
      "pricing_model",
      "daily_budget",
      "slug",
      "target_blank",
      "total_budget",
      "price",
      "advertiser_email",
      "cta_text",
      "created_at",
      "updated_at",
      "deleted_at",
      "priority",
      "slot",
      "placement",
      "custom_width",
      "custom_height",
      "all_entities",
      "article_id",
      "tag_id",
      "author_id",
    ],
    (action, row) => {
      setSelectedAdvertisement(row);
      switch (action) {
        case "edit":
          navigate(`/admin/advertisements/${row.slug || row.id}/edit`, {
            state: { advertisement: row },
          });
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
    PERMISSIONS.ADS,
    "advertisement"
  );
  if (error) toast.error(error?.message);
  return (
    <div className="w-full h-screen overflow-y-auto px-20 py-10 flex flex-col gap-5">
      <div className="flex justify-between items-center rounded-xl">
        <div className="flex flex-col text-gray-800">
          <p className="text-3xl font-bold">Advertisements</p>
          <p className="text-gray-500">Manage your advertisements</p>
        </div>
        {hasPermission(PERMISSIONS?.ADS?.CREATE?.name) && (
          <Button
            variant="submit"
            className="h-10 flex items-center gap-2"
            onClick={() => navigate("/admin/advertisements/create")}
          >
            <Plus />
            Add Advertisement
          </Button>
        )}
      </div>

      {error ? (
        <p>No Advertisements Found.</p>
      ) : (
        <DataTable
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
          placements={placements}
          placement={placement}
          setPlacement={setPlacement}
          permission={PERMISSIONS?.ADS?.VIEW?.name}
          permissionLoading={permissionLoading}
        />
      )}
      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent className="flex flex-col !max-w-none p-10 max-h-[80vh] !max-w-[50vw] overflow-y-auto bg-gray-100 scrollbar-thin scrollbar-thumb-[var(--color-secondary)]">
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
