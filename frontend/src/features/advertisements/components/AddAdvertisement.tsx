import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FormProvider } from "react-hook-form";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import UploadDialogBox from "@/features/media/components/UploadDialogBox";
import { useAdvertisementHooks } from "../hooks/useAdvertisements";
import { useAdvertisementForm } from "../hooks/useAdvertisementForm";
import { useCategoriesHooks } from "@/features/categories/hooks/useCategories";
import AdvertisementCreativeBlock from "./form/AdvertisementCreativeBlock";
import AdvertisementPlacementBlock from "./form/AdvertisementPlacementBlock";
import AdvertisementScheduleBlock from "./form/AdvertisementScheduleBlock";
import type { AdvertisementForm } from "../types/advertisement";

interface AddAdvertisementProps {
  advertisement?: any;
  setOpen?: (open: boolean) => void;
  type?: "add" | "edit" | "view";
}

export default function AddAdvertisement({
  advertisement: propAdvertisement,
  setOpen,
  type: propType,
}: AddAdvertisementProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { slug, id } = useParams();
  const paramIdentifier = slug || id;

  const advertisementHook = useAdvertisementHooks();
  const categoryHook = useCategoriesHooks();
  const { data: categoriesList } = categoryHook.useFetchCategories({
    page: 1,
    per_page: 100,
  });
  const allCategoriesData = categoriesList?.data ?? [];

  const type =
    propType ||
    (paramIdentifier || location.pathname.includes("/edit") ? "edit" : "add");

  const { data: fetchedAdData, isLoading: isFetchingAd, error: fetchError } =
    advertisementHook.useFetchSingleAdvertisement(
      type === "edit" && !propAdvertisement && !location.state?.advertisement
        ? paramIdentifier
        : undefined
    );

  const rawAdvertisement =
    propAdvertisement ||
    location.state?.advertisement ||
    fetchedAdData?.data ||
    fetchedAdData;

  const methods = useAdvertisementForm({
    advertisement: rawAdvertisement,
    type,
  });

  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploadType, setUploadType] = useState<"image" | "video">("image");
  const [selectedCategories, setSelectedCategories] = useState<any[]>([]);

  const createAdvertisement = advertisementHook.useCreateAdvertisement();
  const updateAdvertisement = advertisementHook.useUpdateAdvertisement();

  const handleBack = () => {
    if (setOpen) {
      setOpen(false);
    } else {
      navigate("/admin/advertisements");
    }
  };

  // Rehydrate form and selectedCategories when editing
  useEffect(() => {
    if (!rawAdvertisement) return;

    const ad = rawAdvertisement;
    const placementObj =
      ad?.placement && typeof ad.placement === "object" ? ad.placement : {};

    const startDate = ad?.start_date || ad?.starts_at?.slice(0, 10) || "";
    const endDate = ad?.end_date || ad?.ends_at?.slice(0, 10) || "";
    const startTime =
      ad?.start_time?.slice(0, 5) || ad?.daily_start_time?.slice(0, 5) || "00:00";
    const endTime =
      ad?.end_time?.slice(0, 5) || ad?.daily_end_time?.slice(0, 5) || "23:59";

    const resolvedSize =
      ad?.size ||
      (ad?.slot?.width && ad?.slot?.height
        ? `${ad.slot.width}x${ad.slot.height}`
        : "728x90");

    const resolvedMobileSize =
      ad?.mobile_size ||
      (ad?.slot?.mobile_width && ad?.slot?.mobile_height
        ? `${ad.slot.mobile_width}x${ad.slot.mobile_height}`
        : "");

    // Resolve Category objects for UI
    const targetCategoryId = ad?.category_id ?? placementObj.category_id;
    if (ad.categories && Array.isArray(ad.categories) && ad.categories.length > 0) {
      setSelectedCategories(
        ad.categories.map((c: any) => ({
          id: c.id,
          name: c.name,
        }))
      );
    } else if (ad.category) {
      setSelectedCategories([
        { id: ad.category.id, name: ad.category.name },
      ]);
    } else if (targetCategoryId && allCategoriesData.length > 0) {
      const match = allCategoriesData.find(
        (c: any) => Number(c.id) === Number(targetCategoryId)
      );
      if (match) {
        setSelectedCategories([{ id: match.id, name: match.name }]);
      }
    }

    methods.reset({
      name: ad?.name || ad?.title || "",
      advertiser_name: ad?.advertiser_name || "",
      media_type: ad?.media_type || ad?.type || ad?.ad_type || "image",

      image_url: ad?.image_url || ad?.image || null,
      video_url: ad?.video_url || ad?.video || null,
      video_thumbnail: ad?.video_thumbnail || ad?.thumbnail || null,
      html_code: ad?.html_code || ad?.html || "",
      text_content: ad?.text_content || ad?.text || "",

      click_url: ad?.click_url || ad?.url || ad?.target_url || "",
      button_text: ad?.button_text || ad?.cta || ad?.cta_text || "",

      page: ad?.page || placementObj.page || "home",
      section: ad?.section || placementObj.section || "article_list",
      where:
        ad?.where ||
        placementObj.where ||
        ad?.slot?.position_type ||
        "after_article",

      category_id: targetCategoryId ?? null,
      article_id: ad?.article_id ?? placementObj.article_id ?? null,
      tag_id: ad?.tag_id ?? placementObj.tag_id ?? null,
      author_id: ad?.author_id ?? placementObj.author_id ?? null,
      all_entities: Boolean(ad?.all_entities ?? placementObj.all_entities),

      article_number:
        ad?.article_number ??
        placementObj.article_number ??
        ad?.slot?.article_position ??
        null,
      paragraph_number:
        ad?.paragraph_number ??
        placementObj.paragraph_number ??
        ad?.slot?.paragraph_position ??
        null,

      size: resolvedSize,
      custom_width: ad?.custom_width || null,
      custom_height: ad?.custom_height || null,
      mobile_size: resolvedMobileSize,

      start_date: startDate,
      end_date: endDate,
      start_time: startTime,
      end_time: endTime,

      status: ad?.status || "active",
      priority: ad?.priority ?? 0,
      approved: ad?.approved ?? true,
    });
  }, [rawAdvertisement, allCategoriesData.length, methods.reset]);

  const onSubmit = (formData: AdvertisementForm) => {
    const extractMediaUrl = (val: any) => {
      if (!val) return "";
      if (typeof val === "string") return val;
      return val.file_path || val.file_url || "";
    };

    let finalSize = formData.size;
    if (
      formData.size === "custom" &&
      formData.custom_width &&
      formData.custom_height
    ) {
      finalSize = `${formData.custom_width}x${formData.custom_height}`;
    }

    const payload: any = {
      name: formData.name,
      advertiser_name: formData.advertiser_name,
      media_type: formData.media_type,
      click_url: formData.click_url,
      button_text: formData.button_text || null,

      page: formData.page,
      section: formData.section,
      where: formData.where,

      size: finalSize,
      mobile_size: formData.mobile_size || null,
      start_date: formData.start_date,
      end_date: formData.end_date || null,
      start_time: formData.start_time || "00:00",
      end_time: formData.end_time || "23:59",
      status: formData.status || "active",
    };

    // Attach type-specific media
    if (formData.media_type === "image") {
      payload.image_url = extractMediaUrl(formData.image_url);
    } else if (formData.media_type === "video") {
      payload.video_url = extractMediaUrl(formData.video_url);
      payload.video_thumbnail = extractMediaUrl(formData.video_thumbnail);
    } else if (formData.media_type === "html") {
      payload.html_code = formData.html_code;
    } else if (formData.media_type === "text") {
      payload.text_content = formData.text_content;
    }

    // Attach Target Category from selectedCategories or form
    if (selectedCategories.length > 0) {
      payload.category_id = Number(selectedCategories[0].id);
      payload.categories = selectedCategories.map((c: any) => Number(c.id));
      payload.target_category_ids = selectedCategories.map((c: any) =>
        Number(c.id)
      );
    } else if (
      formData.category_id !== null &&
      formData.category_id !== undefined &&
      !formData.all_entities
    ) {
      payload.category_id = Number(formData.category_id);
    }

    if (
      formData.article_id !== null &&
      formData.article_id !== undefined &&
      !formData.all_entities
    ) {
      payload.article_id = Number(formData.article_id);
    }
    if (
      formData.tag_id !== null &&
      formData.tag_id !== undefined &&
      !formData.all_entities
    ) {
      payload.tag_id = Number(formData.tag_id);
    }
    if (
      formData.author_id !== null &&
      formData.author_id !== undefined &&
      !formData.all_entities
    ) {
      payload.author_id = Number(formData.author_id);
    }
    if (formData.all_entities) {
      payload.all_entities = true;
    }

    if (
      formData.article_number !== null &&
      formData.article_number !== undefined &&
      formData.article_number !== ""
    ) {
      payload.article_number = Number(formData.article_number);
    }
    if (
      formData.paragraph_number !== null &&
      formData.paragraph_number !== undefined &&
      formData.paragraph_number !== ""
    ) {
      payload.paragraph_number = Number(formData.paragraph_number);
    }

    if (type === "add") {
      createAdvertisement.mutate(payload, {
        onSuccess: (res) => {
          toast.success(res?.message || "Advertisement added successfully");
          handleBack();
        },
        onError: (err: any) => {
          toast.error(err?.message || "Something went wrong");
        },
      });
    } else {
      const targetId =
        rawAdvertisement?.id ||
        location.state?.advertisement?.id ||
        paramIdentifier;

      updateAdvertisement.mutate(
        { id: targetId, data: payload },
        {
          onSuccess: (res) => {
            toast.success(res?.message || "Advertisement updated successfully");
            handleBack();
          },
          onError: (err: any) => {
            toast.error(err?.message || "Something went wrong");
          },
        }
      );
    }
  };

  const isSaving =
    createAdvertisement.isPending || updateAdvertisement.isPending;

  if (type === "edit" && isFetchingAd && !rawAdvertisement) {
    return (
      <div className="w-full h-full min-h-[400px] flex items-center justify-center p-20">
        <div className="flex flex-col items-center gap-3">
          <span className="h-8 w-8 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 font-medium text-sm">
            Loading advertisement details...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-y-auto px-20 py-10 flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center gap-5 rounded-lg p-4">
        <Button
          variant="ghost"
          className="h-8 w-8 cursor-pointer border border-[var(--color-secondary)] rounded-full text-[var(--color-primary)] hover:border-[var(--color-primary)] hover:shadow-md hover:shadow-[rgb(var(--color-primary-rgb)/0.3)]"
          onClick={handleBack}
        >
          <ArrowLeft />
        </Button>
        <div>
          <p className="text-2xl font-bold text-[var(--color-primary)]">
            {type === "edit"
              ? "Edit Advertisement"
              : type === "view"
                ? "View Advertisement"
                : "Add Advertisement"}
          </p>
          <p className="text-sm text-[rgb(var(--color-gray-rgb)/0.7)]">
            {type === "edit"
              ? "Edit an existing advertisement."
              : type === "view"
                ? "View an existing advertisement."
                : "Create a new advertisement."}
          </p>
        </div>
      </div>

      {/* Form Body */}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <AdvertisementCreativeBlock
            setUploadOpen={setUploadOpen}
            setUploadType={setUploadType}
          />

          <AdvertisementPlacementBlock
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />

          <AdvertisementScheduleBlock />

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="submit"
              disabled={isSaving}
              className="min-w-[140px]"
            >
              {isSaving
                ? type === "edit"
                  ? "Updating..."
                  : "Adding..."
                : type === "edit"
                  ? "Update Advertisement"
                  : "Add Advertisement"}
            </Button>
          </div>
        </form>
      </FormProvider>

      {/* Media Upload Dialog */}
      <UploadDialogBox
        openUpload={uploadOpen}
        setOpenUpload={setUploadOpen}
        quantity="single"
        type={uploadType}
      />
    </div>
  );
}
