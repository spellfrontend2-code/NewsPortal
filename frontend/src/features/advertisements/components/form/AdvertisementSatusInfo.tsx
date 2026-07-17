import { Controller, useFormContext } from "react-hook-form";
import { inputStyle } from "../../../../components/shared/styles/inputStyle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategoriesHooks } from "@/features/categories/hooks/useCategories";
import { Button } from "@/components/ui/button";
import { ChartColumnStacked } from "lucide-react";
import CategoryDropdownInput from "@/features/categories/components/CategoryDropdownInput";
function AdvertisementStatusInfo({selectedCategories,setSelectedCategories}:any) {
  const { register, control } = useFormContext();
const status = [
  { name: "Draft", value: "draft" },
  { name: "Active", value: "active" },
  { name: "Paused", value: "paused" },
  { name: "Ended", value: "ended" },
  { name: "Pending Approval", value: "pending_approval" },
  { name: "Rejected", value: "rejected" },
  { name: "Archived", value: "archived" },
];
    const categoryHook=useCategoriesHooks()
  const { data: categoriesList } = categoryHook.useFetchCategories({ page: 1, per_page: 100 });
  const CategoriesData = categoriesList?.data ?? [];
  return (
    <div>
      {/* PRIORITY */}
      <div>
        <label className="font-semibold text-gray-600">Priority</label>
        <input type="number" {...register("priority")} className={inputStyle} />
      </div>

      {/* STATUS */}
      <div>
        <label className="font-semibold text-gray-600">Status</label>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className={inputStyle}>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>

              <SelectContent className="bg-white">
                {status.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>
      {/* Categories */}
       <div className=" flex flex-col gap-3">
          <label>Target Categories</label>
          {selectedCategories.length > 0 && (
            <div
              className="h-full w-full flex flex-wrap  [&::-webkit-scrollbar]:hidden
                [-ms-overflow-style:none] [scrollbar-width:none] gap-2">
              {selectedCategories.map((category) => (
                <Button
                  key={category.id}
                  variant="submit"
                  className="pointer-events-none bg-[rgb(var(--color-primary-rgb)/0.1)] border-2 border-[var(--color-primary)] text-[var(--color-primary)]"
                >
                  <ChartColumnStacked />
                  {category.name}
                </Button>
              ))}
            </div>
          )}
        <CategoryDropdownInput
          selectedCategoryIds={selectedCategories.map((c) => c.id)}
          setSelectedCategoryIds={(ids) => {
            const selected = CategoriesData.filter((c) => ids.includes(c.id));
            setSelectedCategories(selected);
          }}
        />
      </div>
    </div>
  );
}
export default AdvertisementStatusInfo;
