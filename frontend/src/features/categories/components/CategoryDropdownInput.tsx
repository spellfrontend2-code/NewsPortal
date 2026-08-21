import {  useCategoriesHooks } from "@/features/categories/hooks/useCategories";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {  useState } from "react";
function CategoryDropdownInput({
  selectedCategoryIds,
  setSelectedCategoryIds,
}: any) {
  const CategoriesHook = useCategoriesHooks();
    const [search, setSearch] = useState("");
const [open, setOpen] = useState(false);
  const { data, isLoading } = CategoriesHook.useFetchCategories({
    page: 1,
    per_page: 10,
    search
  });
  const CategoriesData = data?.data ?? [];
  const toggleCategory = (id: number) => {
    if (selectedCategoryIds.includes(id)) {
      setSelectedCategoryIds(
        selectedCategoryIds.filter((c: number) => c !== id)
      );
    } else {
      setSelectedCategoryIds([...selectedCategoryIds, id]);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="submit" className="w-full rounded-md p-5 justify-between bg-white text-gray-800 font-semibold border-gray-400 hover:border-[var(--color-primary)]">
          {selectedCategoryIds.length
            ? `${selectedCategoryIds.length} Categories Selected`
            : "Select Categories"}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[300px] bg-white">
        <Command shouldFilter={false}>
            <CommandInput
          
  placeholder="Search Categories..."
value={search}
  onValueChange={setSearch}
  />
          <CommandList >
               {isLoading && (
              <div className="p-3 text-sm text-gray-500">
                Loading categories...
              </div>
            )}

            {!isLoading && CategoriesData.length === 0 && (
              <CommandEmpty>
                No categories found.
              </CommandEmpty>
            )}
            {!isLoading && CategoriesData.map((category: any) => {
              const selected = selectedCategoryIds.includes(category.id);

              return (
                <CommandItem
                  key={category.id}
                  onSelect={() => toggleCategory(category.id)}
                >
                  <Check
                    className={selected ? "opacity-100" : "opacity-0"}
                  />
                  {category.name}
                </CommandItem>
              );
            })}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
export default CategoryDropdownInput;
