import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useAdvertisementForm } from "../hooks/useAdvertisementForm";
import type { AdvertisementForm } from "../types/advertisement";
import { FormProvider } from "react-hook-form";
import AdvertisementBasicInfo from "./form/AdvertisementBasicInfo";
import AdvertisementTypeInfo from "./form/AdvertisementTypeInfo";
import AdvertisementLinkInfo from "./form/AdvertisementLinkInfo";
import AdvertisementTargetInfo from "./form/AdvertisementTargetInfo";
import AdvertisementScheduleInfo from "./form/AdvertisementScheduleInfo";
import AdvertisementPricingInfo from "./form/AdvertisementPricingInfo";
import AdvertisementStatusInfo from "./form/AdvertisementSatusInfo";
import { useAdvertisementHooks } from "../hooks/useAdvertisements";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import UploadDialogBox from "@/features/media/components/UploadDialogBox";
export default function AddAdvertisement({
  advertisement,
  setOpen,
  type,
}: any) {
  const methods = useAdvertisementForm({ advertisement, type });
  const [uploadOpen,setUploadOpen] = useState(false);
  const [uploadType,setUploadType] = useState<"image" | "video">("image");
  const advertisementHook = useAdvertisementHooks();
  const createAdvertisement = advertisementHook.useCreateAdvertisement();
  const updateAdvertisement = advertisementHook.useUpdateAdvertisement();
  const [selectedCategories, setSelectedCategories] = useState([]);
  useEffect(() => {
    if (!advertisement) return;

    const normalizedCategories =
      advertisement?.target_categories?.map((c: any) => ({
        id: c.id,
        name: c.name,
      })) || [];


    setSelectedCategories(normalizedCategories);
  }, [advertisement]);
  const onSubmit = (data: AdvertisementForm) => {
    const updatedData = {
      ...data,
      image_url: data?.image_url?.file_path,
      video_url: data?.video_url?.file_path,
      video_thumbnail: data?.video_thumbnail?.file_path,
      daily_start_time: data.daily_start_time?.slice(0, 5),
      daily_end_time: data.daily_end_time?.slice(0, 5),
        target_categories: (selectedCategories ?? []).map(
        (category: any) => category.id,
      ),
    };
    if (type === "add") {
      createAdvertisement.mutate(updatedData, {
        onSuccess: (res) => {
          setOpen(false);
          toast.success(res?.message || "Advertisement added successfully");
        },
        onError: (e) => {
          toast.error(e?.message || "Something went wrong");
        },
      });
    } else {
      updateAdvertisement.mutate(
        { id: advertisement?.id, data: updatedData },
        {
          onSuccess: (res) => {
            setOpen(false);
            toast.success(res?.message || "Advertisement updated successfully");
          },
          onError: (e) => {
            toast.error(e?.message || "Something went wrong");
          },
        },
      );
    }
  };
  return (
<div className="w-full flex flex-col">
        <div className="flex items-center gap-5  rounded-lg p-4 mb-6">
        <Button
          variant="ghost"
          className="h-8 w-8 cursor-pointer border border-[var(--color-secondary)] rounded-full text-[var(--color-primary)] hover:border-[var(--color-primary)] hover:shadow-md hover:shadow-[rgb(var(--color-primary-rgb)/0.3)]"
          onClick={() => setOpen(false)}
        >
          <ArrowLeft />
        </Button>
        <div>
          <p className="text-2xl font-bold text-[var(--color-primary)]">
            {type === "edit"
              ? "Edit  Advertisement"
              : type === "view"
                ? "View  Advertisement"
                : "Add  Advertisement"}
          </p>
          <p className="text-sm text-[rgb(var(--color-gray-rgb)/0.7)]">
            {type === "edit"
              ? "Edit an existing  advertisement."
              : type === "view"
                ? "View an existing  advertisement."
                : "Create a new  advertisement."}
          </p>
        </div>
      </div>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="space-y-6 shadow-lg rounded-xl p-5 "
        >
          <AdvertisementBasicInfo />
          <AdvertisementTypeInfo setUploadOpen={setUploadOpen} setUploadType={setUploadType}/>
          <AdvertisementLinkInfo />
          <AdvertisementTargetInfo />
          <AdvertisementScheduleInfo />
          <AdvertisementPricingInfo />
          <AdvertisementStatusInfo selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}/>

          <Button
            type="submit"
            disabled={
              createAdvertisement.isPending || updateAdvertisement.isPending
            }
            variant="submit"
            className="disabled:cursor-not-allowed"
          >
            {type === "edit"
              ? updateAdvertisement.isPending
                ? "Updating..."
                : "Update Advertisement"
              : createAdvertisement.isPending
                ? "Creating..."
                : "Create Advertisement"}
          </Button>
        </form>
      </FormProvider>
           <UploadDialogBox
          openUpload={uploadOpen}
          setOpenUpload={setUploadOpen}
          quantity="single"
          type={uploadType}
        />
    </div>
  );
}
