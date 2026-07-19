import { Button } from "@/components/ui/button";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useSettingHooks } from "../hooks/useSettings";
import { toast } from "sonner";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Check, Plus, Trash, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { inputStyle } from "@/components/shared/styles/inputStyle";
import { useIconHooks } from "@/features/icons/hooks/useIcons";
import { useQueryClient } from "@tanstack/react-query";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import IconAdd from "@/features/icons/components/IconAdd";
function SettingsForm({ open, setOpen, settings }: any) {
  const settingsHook = useSettingHooks();
  const updateSettings = settingsHook.useUpdateSettings();
  const iconHook = useIconHooks();
const [openPopover, setOpenPopover] = useState<number | null>(null);  
const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 100,
  });
  const queryClient = useQueryClient();
const [searches, setSearches] = useState<Record<number, string>>({});
const [activeIndex, setActiveIndex] = useState<number | null>(null);  const {
    data: icons,
    isLoading,
    error,
  } = iconHook.useFetchIcons({
    page: pagination.pageIndex,
    per_page: pagination.pageSize,
     search:
    activeIndex !== null
      ? searches[activeIndex] ?? ""
      : "",
});
  const [iconAddOpen, setIconAddOpen] = useState(false);
  const iconList = icons?.data ?? [];
  const { register, handleSubmit, reset, control, watch, setValue } = useForm({
    defaultValues: {
      name: settings?.name || "",
      primary_phone: settings?.primary_phone || "",
      secondary_phone: settings?.secondary_phone || "",
      telephone: settings?.telephone || "",
      email: settings?.email || "",
      address: settings?.address || "",
      social_links:
        settings?.social_links?.length > 0
          ? settings.social_links
          : [{ icon: "", platform: "", url: "" }],
      seo_title: settings?.seo_title || "",
      seo_description: settings?.seo_description || "",
      seo_keywords: settings?.seo_keywords || "",
      press_registration_number: settings?.press_registration_number || "",
      company_registration_number: settings?.company_registration_number || "",
      vat_number: settings?.vat_number || "",
      logo: undefined,
      favicon: undefined,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "social_links",
  });

  const faviconFile: any = watch("favicon");

  const logoFile: any = watch("logo");

  const logoPreview =
    logoFile === null
      ? null
      : logoFile instanceof File
        ? URL.createObjectURL(logoFile)
        : settings?.logo;

  const faviconPreview =
    faviconFile === null
      ? null
      : faviconFile instanceof File
        ? URL.createObjectURL(faviconFile)
        : settings?.favicon;
  const logoInputRef = useRef<HTMLInputElement | null>(null);
  const faviconInputRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = (data: any) => {
    const formData = new FormData();

    formData.append("name", data.name || "");
    formData.append("primary_phone", data.primary_phone || "");
    formData.append("secondary_phone", data.secondary_phone || "");
    formData.append("telephone", data.telephone || "");
    formData.append("email", data.email || "");
    formData.append("address", data.address || "");

    formData.append("seo_title", data.seo_title || "");
    formData.append("seo_description", data.seo_description || "");
    formData.append("seo_keywords", data.seo_keywords || "");

    formData.append(
      "press_registration_number",
      data.press_registration_number || "",
    );
    formData.append(
      "company_registration_number",
      data.company_registration_number || "",
    );
    formData.append("vat_number", data.vat_number || "");

    data.social_links.forEach((item, index) => {
      formData.append(`social_links[${index}][icon]`, item.icon);
      formData.append(`social_links[${index}][platform]`, item.platform);
      formData.append(`social_links[${index}][url]`, item.url);
    });
    if (data.logo instanceof File) {
      formData.append("logo", data.logo);
    }

    if (data.favicon instanceof File) {
      formData.append("favicon", data.favicon);
    }
    formData.append("_method", "PUT");

    updateSettings.mutate(
      { id: settings?.id, data: formData },
      {
        onSuccess: (res) => {
          setOpen(false);
          toast.success(res?.message || "Settings updated successfully");
        },
        onError: (e: any) => {
          toast.error(e?.message || "Something went wrong");
        },
      },
    );
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o) {
          setOpen(false);
          reset();
        }
      }}
    >
      <DialogContent className="!max-w-none p-10 max-h-[80vh] !max-w-[50vw] overflow-y-auto bg-white scrollbar-thin scrollbar-thumb-[var(--color-secondary)]">
        <div className="">
          <div className="flex flex-col w-full">
            <p className="text-xl font-bold text-[var(--color-primary)] text-left">
              Edit Site Settings
            </p>
            <p className="text-sm text-[rgb(var(--color-gray-rgb)/0.7)] text-left">
              Make necessary changes to your site settings
            </p>
          </div>

          <div className="w-full flex justify-center mt-10">
            <div className="w-full flex flex-col gap-5 p-10 rounded-2xl border border-[var(--color-secondary)]">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full flex flex-col gap-5"
              >
                <div>
                  <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
                    Site Name
                  </label>
                  <input
                    type="text"
                    {...register("name")}
                    className={inputStyle}
                  />
                </div>

                <div className="w-full flex justify-between">
                  <div className="w-[45%]">
                    <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
                      Logo
                    </label>
                    {logoPreview ? (
                      <div className="relative h-40 w-40">
                        <img
                          src={logoPreview}
                          className="h-full w-full object-fill"
                        />
                     
                         <button
                      type="button"
                      onClick={() => {
                            setValue("logo", null, {
                              shouldDirty: true,
                              shouldValidate: true,
                            });

                            if (logoInputRef.current) {
                              logoInputRef.current.value = "";
                            }
                          }}
                            
                      className="absolute top-2 right-2 h-8 w-8 rounded-md bg-gray-200 hover:bg-gray-100 flex items-center justify-center"
                    >
                      <X className="text-red-500" size={18} />
                    </button>
                      </div>
                    ) : (
                      <label>
                        <div className="flex h-40 w-40 cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-[var(--color-secondary)] hover:border-[var(--color-primary)] text-[var(--color-primary)] bg-[rgb(var(--color-primary-rgb)/0.01)] hover:bg-[rgb(var(--color-primary-rgb)/0.06)] transition-all duration-300">
                          <Upload size={30} />
                        </div>

                        <input
                          ref={logoInputRef}
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            setValue("logo", file, {
                              shouldDirty: true,
                              shouldValidate: true,
                            });
                          }}
                          hidden
                        />
                      </label>
                    )}
                  </div>
                  <div className="w-[45%]">
                    <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
                      Favicon
                    </label>
                    {faviconPreview ? (
                      <div className="relative h-40 w-40">
                        <img
                          src={faviconPreview}
                          className="h-full w-full object-fill"
                        />
                        <button
                      type="button"
                      onClick={() => {
                            setValue("favicon", null, {
                              shouldDirty: true,
                              shouldValidate: true,
                            });

                            if (logoInputRef.current) {
                              logoInputRef.current.value = "";
                            }
                          }}
                            
                      className="absolute top-2 right-2 h-8 w-8 rounded-md bg-gray-200 hover:bg-gray-100 flex items-center justify-center"
                    >
                      <X className="text-red-500" size={18} />
                    </button>
                      </div>
                    ) : (
                      <label>
                        <div className="flex h-40 w-40 cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-[var(--color-secondary)] hover:border-[var(--color-primary)] text-[var(--color-primary)] bg-[rgb(var(--color-primary-rgb)/0.01)] hover:bg-[rgb(var(--color-primary-rgb)/0.06)] transition-all duration-300">
                          <Upload size={30} />
                        </div>
                        <input
                          ref={faviconInputRef}
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            setValue("favicon", file, {
                              shouldDirty: true,
                              shouldValidate: true,
                            });
                          }}
                          hidden
                        />
                      </label>
                    )}
                  </div>
                </div>

                <div className="w-full flex justify-between">
                  <div className="w-[30%]">
                    <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
                      Primary Phone
                    </label>
                    <input
                      type="text"
                      {...register("primary_phone")}
                      className={inputStyle}
                    />
                  </div>
                  <div className="w-[30%]">
                    <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
                      Secondary Phone
                    </label>
                    <input
                      type="text"
                      {...register("secondary_phone")}
                      className={inputStyle}
                    />
                  </div>
                  <div className="w-[30%]">
                    <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
                      Telephone
                    </label>
                    <input
                      type="text"
                      {...register("telephone")}
                      className={inputStyle}
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
                    Email
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
                    Address
                  </label>
                  <input
                    type="text"
                    {...register("address")}
                    className={inputStyle}
                  />
                </div>

                <div className="space-y-4">
                  <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
                    Social Links
                  </label>
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex gap-4 items-end">
                      <div>
                        <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
                          Icon
                        </label>

                        <Controller
                          name={`social_links.${index}.icon`}
                          control={control}
                          render={({ field }) => {
                            const selectedIcon = iconList.find(
                              (icon) => icon.icon_class === field.value,
                            );

                            return (
                              <Popover
  open={activeIndex === index}
  onOpenChange={(open) => {
    if (open) {
      setActiveIndex(index);
    } else {
      setActiveIndex(null);
    }
  }}
>
                                <PopoverTrigger asChild>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    className={`${inputStyle} justify-start font-normal`}
                                  >
                                    {selectedIcon ? (
                                      <div className="flex items-center gap-2">
                                        <i
                                          className={selectedIcon.icon_class}
                                        ></i>
                                        <span>{selectedIcon.icon_name}</span>
                                      </div>
                                    ) : (
                                      "Select icon"
                                    )}
                                  </Button>
                                </PopoverTrigger>

                                <PopoverContent
                                  className="w-[300px] p-0 bg-white"
                                  align="start"
                                >
                                  <Command>
                                    <CommandInput
  placeholder="Search icon..."
  value={searches[index] ?? ""}
  onValueChange={(value) => {
    setSearches((prev) => ({
      ...prev,
      [index]: value,
    }));

    setActiveIndex(index);
  }}
/>
                                    

                                    <CommandList className="max-h-[220px]">
                                      <CommandEmpty>
                                        No icon found.
                                      </CommandEmpty>

                                      <CommandGroup>
                                        {iconList.map((icon) => (
                                          <CommandItem
                                            key={icon.id}
                                            value={icon.icon_name}
                                            onSelect={() => {
  field.onChange(icon.icon_class);

  setActiveIndex(null);

  setSearches((prev) => ({
    ...prev,
    [index]: "",
  }));
}}
                                            className="flex items-center gap-2 cursor-pointer"
                                          >
                                            <i className={icon.icon_class}></i>

                                            <span>{icon.icon_name}</span>

                                            {field.value ===
                                              icon.icon_class && (
                                              <Check className="ml-auto h-4 w-4" />
                                            )}
                                          </CommandItem>
                                        ))}
                                      </CommandGroup>
                                    </CommandList>

                                    <div className="p-2 border-t">
                                      <Button
                                        type="button"
                                        variant="submit"
                                        className="w-full flex items-center gap-2"
onClick={() => {
  setActiveIndex(index);
  setIconAddOpen(true);
}}                                      >
                                        <Plus className="h-4 w-4" />
                                        Add New Icon
                                      </Button>
                                    </div>
                                  </Command>
                                </PopoverContent>
                              </Popover>
                            );
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <label>Platform</label>
                        <input
                          {...register(`social_links.${index}.platform`)}
                          className={inputStyle}
                          placeholder="facebook"
                        />
                      </div>

                      <div className="flex-1">
                        <label>URL</label>
                        <input
                          {...register(`social_links.${index}.url`)}
                          className={inputStyle}
                          placeholder="https://facebook.com/..."
                        />
                      </div>

                      <button
                        type="button"
                        className="rounded-md border border-transparent bg-[var(--color-secondary)] p-2 text-[rgb(var(--color-gray-rgb)/0.7)] hover:text-red-500 hover:border-red-500 hover:bg-red-500/10 cursor-pointer"
                        onClick={() => remove(index)}
                      >
                        <Trash size={15} />
                      </button>
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="submit"
                    onClick={() =>
                      append({
                        icon: "",
                        platform: "",
                        url: "",
                      })
                    }
                  >
                    Add Social Link
                  </Button>
                </div>

                <div>
                  <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    {...register("seo_title")}
                    className={inputStyle}
                  />
                </div>
                <div>
                  <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
                    Meta Description
                  </label>
                  <textarea
                    rows={4}
                    {...register("seo_description")}
                    placeholder="Enter site meta description..."
                    className={inputStyle}
                  />
                </div>
                <div>
                  <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
                    Meta Keywords
                  </label>
                  <input
                    type="text"
                    {...register("seo_keywords")}
                    placeholder="Comma separated keywords"
                    className={inputStyle}
                  />
                </div>

                <div className="w-full flex justify-between">
                  <div className="w-[30%]">
                    <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
                      Press Reg. No.
                    </label>
                    <input
                      type="text"
                      {...register("press_registration_number")}
                      className={inputStyle}
                    />
                  </div>
                  <div className="w-[30%]">
                    <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
                      Company Reg. No.
                    </label>
                    <input
                      type="text"
                      {...register("company_registration_number")}
                      className={inputStyle}
                    />
                  </div>
                  <div className="w-[30%]">
                    <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
                      VAT Number
                    </label>
                    <input
                      type="text"
                      {...register("vat_number")}
                      className={inputStyle}
                    />
                  </div>
                </div>

                <div className="w-full flex justify-end gap-3">
                  <Button
                    variant="submit"
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      reset();
                    }}
                    className="w-[80px] rounded-2xl bg-[rgb(var(--color-gray-rgb)/0.1)] text-black border border-[var(--color-secondary)]"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="submit" className="w-[100px]">
                    {updateSettings.isPending ? "Saving..." : "Save"}
                  </Button>
                </div>
              </form>
              {iconAddOpen && (
              <IconAdd
                open={iconAddOpen}
                onOpenChange={setIconAddOpen}
                onSuccess={async (icon) => {
                  await queryClient.invalidateQueries({
                    queryKey: ["icons"],
                  });
              
                  setValue("icon", icon.icon_class, {
                    shouldDirty: true,
                    shouldValidate: true,
                  });
              
                  setIconAddOpen(false);
                 setActiveIndex(null);

setSearches((prev) => ({
  ...prev,
  [activeIndex ?? 0]: "",
}));
                }}
              />
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SettingsForm;
