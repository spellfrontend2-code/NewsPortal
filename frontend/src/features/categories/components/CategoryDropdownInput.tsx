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
import { useEffect } from "react";
function CategoryDropdownInput({ setSelectedCategories}: any) {
  const { control,watch } = useForm({
    defaultValues: {
      categories: [],
    },
  });
  const CategoriesHook = useCategoriesHooks();
  const { data, isLoading } = CategoriesHook.useFetchCategories({ page: 1, per_page: 100 });
  const CategoriesData = data?.data ?? [];
  const categories=watch("categories");
//   const createTag = CategoriesHook.useAddCategories();
// const handleCreateTag = () => {
//   const newTagName = (document.getElementById("new-category-input") as HTMLInputElement)?.value;

//   if (newTagName) {
//     createTag.mutate({ name: newTagName });
//     setCreateTagOpen(false);
//   }
// };
useEffect(()=>{
const categoriesSelected=CategoriesData.filter((category: any) =>
      categories.includes(category.id))
setSelectedCategories(categoriesSelected)
},[categories])
  return (
    <div className="">
      <Controller
  name="categories"
  control={control}
  defaultValue={[]}
  render={({ field }) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-between"
        >
        {field.value?.length
  ? `${CategoriesData.filter((category: any) =>
      field.value.includes(category.id)
    ).length} Categories Selected`
  : "Select Categories"}
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[300px] bg-white"   onWheel={(e) => e.stopPropagation()}
>
        <Command className="max-h-[300px] h-[300px]">
          <CommandInput placeholder="Search Categories..." />
          <CommandEmpty>No Categories found.</CommandEmpty>
           <CommandList className="max-h-[250px] overflow-y-auto scrollbar-thin scrollbar-thumb-[var(--color-secondary)]"> {CategoriesData.map((category: any) => {
              const selected = field.value.includes(category.id);

              return (
                <CommandItem
                  key={category.id}
                  onSelect={() => {
                    if (selected) {
                      field.onChange(
                        field.value.filter((id: number) => id !== category.id)
                      );
                    } else {
                      field.onChange([...field.value, category.id]);
                    }
                  }}
                >
                  <Check
                    className={`mr-2 h-4 w-4 ${
                      selected ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  {category.name}
                </CommandItem>
              );
            })}
            </CommandList>
        
        </Command>
      </PopoverContent>
    </Popover>
  )}
/>
    </div>
  );
}
export default CategoryDropdownInput;
