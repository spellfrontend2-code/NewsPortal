import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FormProvider } from "react-hook-form";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import UploadDialogBox from "@/features/media/components/UploadDialogBox";
import { useAdvertisementHooks } from "../hooks/useAdvertisements";
import { useCategoriesHooks } from "@/features/categories/hooks/useCategories";
import {
  useAdvertisementForm,
  normalizeAdvertisementData,
} from "../hooks/useAdvertisementForm";
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

  const targetId =
    paramIdentifier ||
    propAdvertisement?.id ||
    propAdvertisement?.slug ||
    location.state?.advertisement?.id ||
    location.state?.advertisement?.slug;

  const { data: fetchedAdData, isLoading: isFetchingAd } =
    advertisementHook.useFetchSingleAdvertisement(
      type === "edit" ? targetId : undefined
    );

  const rawAdvertisement =
    fetchedAdData?.data?.advertisement ||
    fetchedAdData?.data?.ad ||
    fetchedAdData?.data ||
    fetchedAdData?.advertisement ||
    fetchedAdData ||
    location.state?.advertisement ||
    propAdvertisement;

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

  // Rehydrate form and selectedCategories when editing or when advertisement data arrives
  useEffect(() => {
    if (!rawAdvertisement) return;

    const normalized = normalizeAdvertisementData(
      rawAdvertisement,
      allCategoriesData
    );

    // Resolve Category objects for UI
    const targetCategoryIds: number[] = [];
    if (
      Array.isArray(rawAdvertisement.categories) &&
      rawAdvertisement.categories.length > 0
    ) {
      rawAdvertisement.categories.forEach((c: any) => {
        const catId = typeof c === "object" ? c?.id : c;
        if (catId !== undefined && catId !== null && !isNaN(Number(catId))) {
          targetCategoryIds.push(Number(catId));
        }
      });
    } else if (
      Array.isArray(rawAdvertisement.target_category_ids) &&
      rawAdvertisement.target_category_ids.length > 0
    ) {
      rawAdvertisement.target_category_ids.forEach((cId: any) => {
        if (cId !== undefined && cId !== null && !isNaN(Number(cId))) {
          targetCategoryIds.push(Number(cId));
        }
      });
    } else if (rawAdvertisement.category) {
      const catId =
        typeof rawAdvertisement.category === "object"
          ? rawAdvertisement.category.id
          : rawAdvertisement.category;
      if (catId !== undefined && catId !== null && !isNaN(Number(catId))) {
        targetCategoryIds.push(Number(catId));
      }
    } else if (
      normalized.category_id !== null &&
      normalized.category_id !== undefined &&
      !isNaN(Number(normalized.category_id))
    ) {
      targetCategoryIds.push(Number(normalized.category_id));
    }

    if (targetCategoryIds.length > 0) {
      const resolvedCategories = targetCategoryIds.map((catId) => {
        if (Array.isArray(rawAdvertisement.categories)) {
          const foundObj = rawAdvertisement.categories.find(
            (c: any) =>
              typeof c === "object" &&
              Number(c.id) === Number(catId) &&
              c.name
          );
          if (foundObj) return { id: Number(foundObj.id), name: foundObj.name };
        }
        if (
          rawAdvertisement.category &&
          typeof rawAdvertisement.category === "object" &&
          Number(rawAdvertisement.category.id) === Number(catId) &&
          rawAdvertisement.category.name
        ) {
          return {
            id: Number(rawAdvertisement.category.id),
            name: rawAdvertisement.category.name,
          };
        }
        const match = allCategoriesData.find(
          (c: any) => Number(c.id) === Number(catId)
        );
        if (match) return { id: Number(match.id), name: match.name };
        return { id: catId, name: `Category #${catId}` };
      });
      setSelectedCategories(resolvedCategories);
    }

    methods.reset(normalized);
  }, [rawAdvertisement, allCategoriesData, methods.reset]);

  const onSubmit = (formData: AdvertisementForm) => {
    const extractMediaUrl = (val: any) => {
      if (!val) return "";
      if (typeof val === "string") return val;
      return (
        val.file_path ||
        val.file_url ||
        val.url ||
        val.path ||
        val.original_url ||
        ""
      );
    };

    let finalSize = formData.size;
    if (!finalSize || finalSize === "") {
      finalSize = formData.section === "popup" ? "600x400" : "728x90";
    } else if (
      formData.size === "custom" &&
      formData.custom_width &&
      formData.custom_height
    ) {
      finalSize = `${formData.custom_width}x${formData.custom_height}`;
    }

    let finalMobileSize = formData.mobile_size || null;
    if (
      formData.mobile_size === "custom" &&
      formData.custom_mobile_width &&
      formData.custom_mobile_height
    ) {
      finalMobileSize = `${formData.custom_mobile_width}x${formData.custom_mobile_height}`;
    } else if (finalMobileSize === "none" || finalMobileSize === "") {
      finalMobileSize = null;
    }

    const parsedDims =
      finalSize && finalSize !== "custom" ? finalSize.split("x") : null;
    const width = parsedDims
      ? Number(parsedDims[0])
      : Number(formData.custom_width) || null;
    const height = parsedDims
      ? Number(parsedDims[1])
      : Number(formData.custom_height) || null;

    const parsedMobileDims =
      finalMobileSize && finalMobileSize !== "custom" && finalMobileSize !== "none"
        ? finalMobileSize.split("x")
        : null;
    const mobileWidth = parsedMobileDims
      ? Number(parsedMobileDims[0])
      : Number(formData.custom_mobile_width) || null;
    const mobileHeight = parsedMobileDims
      ? Number(parsedMobileDims[1])
      : Number(formData.custom_mobile_height) || null;

    const payload: any = {
      name: formData.name,
      advertiser_name: formData.advertiser_name,
      media_type: formData.media_type,
      click_url: formData.click_url,
      button_text: formData.button_text || null,

      page: formData.page,
      section: formData.section,
      where:
        formData.where ||
        (formData.section === "popup" ? "popup" : "after_article"),
      placement: formData.section || formData.page,

      size: finalSize,
      mobile_size: finalMobileSize,
      width,
      height,
      mobile_width: mobileWidth,
      mobile_height: mobileHeight,

      start_date: formData.start_date,
      end_date: formData.end_date || null,
      start_time: formData.start_time || "00:00",
      end_time: formData.end_time || "23:59",
      status: formData.status || "active",
      priority: formData.priority ?? 0,
      approved: formData.approved ?? true,
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
      const editId =
        rawAdvertisement?.id ||
        location.state?.advertisement?.id ||
        paramIdentifier;

      updateAdvertisement.mutate(
        { id: editId, data: payload },
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
    <div className="w-full h-screen overflow-y-auto px-20 py-10 flex flex-col gap-5">
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
        <form
          onSubmit={methods.handleSubmit(onSubmit, (formErrors) => {
            console.error("Advertisement Form Errors:", formErrors);
            const firstError = Object.values(formErrors)[0]?.message;
            toast.error(
              typeof firstError === "string"
                ? firstError
                : "Please fill in all required fields."
            );
          })}
          className="flex flex-col gap-6"
        >
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
