import { Controller, useForm } from "react-hook-form";
import {  useCategoriesHooks } from "@/features/categories/hooks/useCategories";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
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
        <Button variant="outline" className="w-full justify-between">
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
  onValueChange={setSearch}/>
          <CommandList>
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
