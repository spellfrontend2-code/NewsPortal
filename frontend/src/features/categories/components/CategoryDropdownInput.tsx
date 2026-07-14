import {  useCategoriesHooks } from "@/features/categories/hooks/useCategories";
import { Command, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
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

  const { data } = CategoriesHook.useFetchCategories({
    page: 1,
    per_page: 10,
    search
  });
  const CategoriesData = data?.data ?? [];
  console.log(CategoriesData)
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
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="submit" className="w-full justify-between bg-white text-gray-800 font-semibold border-gray-400 hover:border-[var(--color-primary)]">
          {selectedCategoryIds.length
            ? `${selectedCategoryIds.length} Categories Selected`
            : "Select Categories"}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[300px] bg-white">
        <Command>
            <CommandInput
          
  placeholder="Search Categories..."
value={search}
  onValueChange={setSearch}
  />
          <CommandList >
            {CategoriesData.map((category: any) => {
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
