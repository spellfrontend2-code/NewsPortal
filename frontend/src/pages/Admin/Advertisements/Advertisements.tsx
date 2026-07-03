import DeleteDialogBox from "@/components/Admin/dialogbox/DeleteDialogBox";
import DataTable from "@/components/Admin/table/DataTable";
import DataTableSkeleton from "@/components/Admin/table/DataTableSkeleton";
import { Button } from "@/components/ui/button";
import AddAdvertisement from "@/features/advertisements/components/AddAdvertisement";
import { useAdvertisementHooks } from "@/features/advertisements/hooks/useAdvertisement";
import { generateColumns } from "@/lib/generateColumns";
import { Plus } from "lucide-react";
import { useState } from "react";
import { set } from "react-hook-form";

function Advertisements() {
  const advertisementHook = useAdvertisementHooks();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const { data, isLoading } = advertisementHook.useFetchAdvertisements({
    page: pagination.pageIndex + 1,
    per_page: pagination.pageSize,
    search: "",
  });
  const deleteAdvertisement=advertisementHook.useDeleteAdvertisement()
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [selectedAdvertisement,setSelectedAdvertisement]=useState(null)
  const Advertisements = data?.data ?? [];
  const columns = generateColumns(
    Advertisements,
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
      "created_at"
    ],
    (action, row) => {
        setSelectedAdvertisement(row)
        switch(action){
          case "add":
            setAddOpen(true)
            break
            case "delete":
                setDeleteOpen(true)
                break
        }
    },
  );

  return (
    <div className="w-full h-screen overflow-y-auto p-20 flex flex-col gap-5">
{
  addOpen ? (
    <AddAdvertisement open={addOpen} setOpen={setAddOpen} type="add" />
  ) : (
    <>
      <div className="flex justify-between">
        <p className="text-4xl font-bold text-[var(--color-primary)]">
          Advertisements
        </p>

        <Button
          variant="submit"
          className="mt-5"
          onClick={() => setAddOpen(true)}
        >
          <Plus />
          Add Advertisement
        </Button>
      </div>

      {isLoading ? (
        <DataTableSkeleton />
      ) : Advertisements.length > 0 ? (
        <DataTable
          columns={columns}
          data={Advertisements}
          pagination={pagination}
          setPagination={setPagination}
          pageCount={data?.pagination?.last_page}
        />
      ) : (
        <p>No Advertisements</p>
      )}
    </>
  )
}
      <DeleteDialogBox deleteOpen={deleteOpen} setDeleteOpen={setDeleteOpen} selectedField={selectedAdvertisement} deleteField={deleteAdvertisement} />
    </div>
  );
}

export default Advertisements;
