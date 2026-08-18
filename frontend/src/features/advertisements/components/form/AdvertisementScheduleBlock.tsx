import { useMemo, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { inputStyle } from "@/components/shared/styles/inputStyle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Asterisk } from "lucide-react";
import {
  DEFAULT_FORM_PAGES,
  MOBILE_SIZES,
  STATUS_OPTIONS,
} from "../../constants/formOptions";
import { useAdvertisementHooks } from "../../hooks/useAdvertisements";

export default function AdvertisementScheduleBlock() {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const advertisementHook = useAdvertisementHooks();
  const { data: formOptionsData } = advertisementHook.useFetchFormOptions();

  const pageValue = watch("page") || "home";
  const sectionValue = watch("section") || "";
  const sizeValue = watch("size") || "728x90";
  const mobileSizeValue = watch("mobile_size") || "";

  // Find section-specific sizes
  const pages = useMemo(() => {
    const apiPages =
      formOptionsData?.data?.form?.pages ||
      formOptionsData?.data?.pages ||
      formOptionsData?.form?.pages;
    if (apiPages && Array.isArray(apiPages) && apiPages.length > 0) {
      return DEFAULT_FORM_PAGES.map((defPage) => {
        const apiPage = apiPages.find((p: any) => p.value === defPage.value);
        if (!apiPage) return defPage;

        const mergedSections = [...(apiPage.sections || [])];
        for (const defSec of defPage.sections) {
          if (!mergedSections.some((s: any) => s.value === defSec.value)) {
            mergedSections.push(defSec);
          }
        }
        return {
          ...defPage,
          ...apiPage,
          sections: mergedSections,
        };
      });
    }
    return DEFAULT_FORM_PAGES;
  }, [formOptionsData]);

  const selectedPage = useMemo(
    () => pages.find((p) => p.value === pageValue) || pages[0],
    [pages, pageValue]
  );

  const selectedSection = useMemo(
    () => selectedPage?.sections?.find((s) => s.value === sectionValue),
    [selectedPage, sectionValue]
  );

  const availableSizes = useMemo(() => {
    if (selectedSection?.sizes && selectedSection.sizes.length > 0) {
      const sizes = [...selectedSection.sizes];
      if (!sizes.includes("custom")) sizes.push("custom");
      return sizes;
    }
    return [
      "728x90",
      "970x250",
      "300x250",
      "300x600",
      "468x60",
      "320x100",
      "600x400",
      "400x300",
      "custom",
    ];
  }, [selectedSection]);

  // Ensure size is always synchronized with available options
  useEffect(() => {
    const currentSize = watch("size");
    if (!currentSize && availableSizes.length > 0) {
      const fallback = selectedSection?.default_size || availableSizes[0] || "728x90";
      setValue("size", fallback, { shouldValidate: true, shouldDirty: true });
    }
  }, [selectedSection, availableSizes, watch, setValue]);

  // If the stored size is not in the available list and not already "custom",
  // treat it as a custom dimension: set size -> "custom" and parse W/H.
  useEffect(() => {
    if (
      sizeValue &&
      sizeValue !== "custom" &&
      availableSizes.length > 0 &&
      !availableSizes.includes(sizeValue)
    ) {
      const match = sizeValue.match(/^(\d+)x(\d+)$/i);
      if (match) {
        setValue("custom_width", Number(match[1]), { shouldDirty: false });
        setValue("custom_height", Number(match[2]), { shouldDirty: false });
      }
      setValue("size", "custom", { shouldDirty: false });
    }
  }, [sizeValue, availableSizes, setValue]);

  // If the stored mobile_size is not in the known list and not already "custom" or "none",
  // treat it as a custom dimension: set mobile_size -> "custom" and parse W/H.
  const KNOWN_MOBILE_SIZES = ["", "none", "320x100", "300x250", "320x50", "custom"];
  useEffect(() => {
    if (
      mobileSizeValue &&
      mobileSizeValue !== "custom" &&
      mobileSizeValue !== "none" &&
      !KNOWN_MOBILE_SIZES.includes(mobileSizeValue)
    ) {
      const match = mobileSizeValue.match(/^(\d+)x(\d+)$/i);
      if (match) {
        setValue("custom_mobile_width", Number(match[1]), { shouldDirty: false });
        setValue("custom_mobile_height", Number(match[2]), { shouldDirty: false });
      }
      setValue("mobile_size", "custom", { shouldDirty: false });
    }
  }, [mobileSizeValue, setValue]);

  const isCustomSize = sizeValue === "custom";
  const isCustomMobileSize = mobileSizeValue === "custom";

  return (
    <div className="flex flex-col gap-4">
      <div className="border-b pb-2">
        <p className="font-bold text-lg text-[var(--color-primary)]">
          Size & Schedule
        </p>
      </div>

      {/* Sizing Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Desktop / Primary Size */}
        <div>
          <label className="flex items-center gap-1 font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
            Primary Size
            <Asterisk className="text-red-500" size={12} />
          </label>
          <Controller
            name="size"
            control={control}
            defaultValue={selectedSection?.default_size || availableSizes[0] || "728x90"}
            rules={{ required: "Size is required" }}
            render={({ field }) => (
              <Select
                value={field.value || selectedSection?.default_size || availableSizes[0] || "728x90"}
                onValueChange={(val) => {
                  field.onChange(val);
                  setValue("size", val, { shouldDirty: true, shouldValidate: true });
                }}
              >
                <SelectTrigger className={`${inputStyle} py-5 text-base bg-white`}>
                  <SelectValue placeholder="Select primary size" />
                </SelectTrigger>
                <SelectContent className="bg-white max-h-60">
                  {availableSizes.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s === "custom" ? "Custom Dimensions (W x H)" : `${s} px`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        {/* Mobile Responsive Size */}
        <div>
          <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
            Mobile Size (Optional)
          </label>
          <Controller
            name="mobile_size"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value || "none"}
                onValueChange={(val) => field.onChange(val === "none" ? "" : val)}
              >
                <SelectTrigger className={`${inputStyle} py-5 text-base bg-white`}>
                  <SelectValue placeholder="Select mobile size" />
                </SelectTrigger>
                <SelectContent className="bg-white max-h-60">
                  <SelectItem value="none">Auto / Same as Desktop</SelectItem>
                  {MOBILE_SIZES.map((ms) => (
                    <SelectItem key={ms.value} value={ms.value}>
                      {ms.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      {/* Custom Dimension Inputs if "custom" selected for primary size */}
      {isCustomSize && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-1 font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
              Width (px)
              <Asterisk className="text-red-500" size={12} />
            </label>
            <input
              type="number"
              min={50}
              max={2500}
              {...register("custom_width", {
                required: isCustomSize ? "Custom width is required" : false,
                valueAsNumber: true,
              })}
              placeholder="e.g. 800"
              className={inputStyle}
            />
          </div>

          <div>
            <label className="flex items-center gap-1 font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
              Height (px)
              <Asterisk className="text-red-500" size={12} />
            </label>
            <input
              type="number"
              min={20}
              max={2500}
              {...register("custom_height", {
                required: isCustomSize ? "Custom height is required" : false,
                valueAsNumber: true,
              })}
              placeholder="e.g. 120"
              className={inputStyle}
            />
          </div>
        </div>
      )}

      {/* Custom Mobile Dimension Inputs if "custom" selected for mobile size */}
      {isCustomMobileSize && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-1 font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
              Mobile Width (px)
              <Asterisk className="text-red-500" size={12} />
            </label>
            <input
              type="number"
              min={50}
              max={2500}
              {...register("custom_mobile_width", {
                required: isCustomMobileSize ? "Custom mobile width is required" : false,
                valueAsNumber: true,
              })}
              placeholder="e.g. 320"
              className={inputStyle}
            />
          </div>

          <div>
            <label className="flex items-center gap-1 font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
              Mobile Height (px)
              <Asterisk className="text-red-500" size={12} />
            </label>
            <input
              type="number"
              min={20}
              max={2500}
              {...register("custom_mobile_height", {
                required: isCustomMobileSize ? "Custom mobile height is required" : false,
                valueAsNumber: true,
              })}
              placeholder="e.g. 100"
              className={inputStyle}
            />
          </div>
        </div>
      )}

      {/* Active Running Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="flex items-center gap-1 font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
            Start Date
            <Asterisk className="text-red-500" size={12} />
          </label>
          <input
            type="date"
            {...register("start_date", { required: "Start date is required" })}
            className={inputStyle}
          />
          {errors.start_date && (
            <p className="text-xs text-red-500 mt-1">
              {errors.start_date.message as string}
            </p>
          )}
        </div>

        <div>
          <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
            End Date (Optional)
          </label>
          <input
            type="date"
            {...register("end_date")}
            className={inputStyle}
          />
        </div>
      </div>

      {/* Daily Time Delivery Window */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
            Daily Start Time
          </label>
          <input
            type="time"
            {...register("start_time")}
            defaultValue="00:00"
            className={inputStyle}
          />
        </div>

        <div>
          <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
            Daily End Time
          </label>
          <input
            type="time"
            {...register("end_time")}
            defaultValue="23:59"
            className={inputStyle}
          />
        </div>
      </div>

      {/* Ad Status */}
      <div>
        <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
          Status
        </label>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select value={field.value || "active"} onValueChange={field.onChange}>
              <SelectTrigger className={`${inputStyle} py-5 text-base bg-white`}>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {STATUS_OPTIONS.map((st) => (
                  <SelectItem key={st.value} value={st.value}>
                    {st.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>
    </div>
  );
}
