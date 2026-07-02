import { Controller, useForm } from "react-hook-form";
import {  useTagsHooks } from "@/features/tags/hooks/useTags";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
function TagDropdownInput({ setSelectedTags}: any) {
  const { control,watch } = useForm({
    defaultValues: {
      tags: [],
    },
  });
  const tagsHook = useTagsHooks();
  const { data, isLoading } = tagsHook.useFetchTags({ page: 1, per_page: 100 });
  const tagsData = data?.data ?? [];
  const createTag = tagsHook.useCreateTag();
const [createTagOpen, setCreateTagOpen] = useState(false);
const tags=watch("tags");
const handleCreateTag = () => {
  const newTagName = (document.getElementById("new-tag-input") as HTMLInputElement)?.value;

  if (newTagName) {
    createTag.mutate({ name: newTagName });
    setCreateTagOpen(false);
  }
};
useEffect(()=>{
const tagsSelected = tagsData.filter((tag: any) =>
  tags.includes(tag.id)
);

setSelectedTags(tagsSelected);
},[tags])
  return (
    <div className="">
      <Controller
  name="tags"
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
  ? `${tagsData.filter((tag: any) =>
      field.value.includes(tag.id)
    ).length} Tags Selected`
  : "Select Tags"}

          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[300px] bg-white"   onWheel={(e) => e.stopPropagation()}
>
        <Command className="max-h-[300px] h-[300px]">
          <CommandInput placeholder="Search tags..." />
          <CommandEmpty>No tags found.</CommandEmpty>
           <CommandList className="max-h-[250px] overflow-y-auto scrollbar-thin scrollbar-thumb-[var(--color-secondary)]"> {tagsData.map((tag: any) => {
              const selected = field.value.includes(tag.id);

              return (
                <CommandItem
                  key={tag.id}
                  onSelect={() => {
                    if (selected) {
                      field.onChange(
                        field.value.filter((id: number) => id !== tag.id)
                      );
                    } else {
                      field.onChange([...field.value, tag.id]);
                    }
                  }}
                >
                  <Check
                    className={`mr-2 h-4 w-4 ${
                      selected ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  {tag.name}
                </CommandItem>
              );
            })}
            </CommandList>
         {!createTagOpen ? <div className="flex mt-3 items-center gap-2 bg-[var(--color-primary)] text-white p-2 cursor-pointer" onClick={() => setCreateTagOpen(true)}>
            <Plus/>Create New Tag
          </div>:<div className="flex">
            <input id="new-tag-input" type="text" placeholder="Enter tag name..." className="w-full border-2 border-[var(--color-primary)] px-2 py-1 rounded-md focus:outline-none" />
            <Button variant="submit" className="ml-2" onClick={() => handleCreateTag()}>Add</Button>
            </div>}
        </Command>
      </PopoverContent>
    </Popover>
  )}
/>
    </div>
  );
}
export default TagDropdownInput;
