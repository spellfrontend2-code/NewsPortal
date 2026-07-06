import { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTagsHooks } from "@/features/tags/hooks/useTags";

function TagDropdownInput({
  selectedTagIds,
  setSelectedTagIds,
}: any) {
  const tagsHook = useTagsHooks();
  const [search, setSearch] = useState("");
  const [createTagOpen, setCreateTagOpen] = useState(false);

  const { data } = tagsHook.useFetchTags({
    page: 1,
    per_page: 10,
    search,
  });

  const tagsData = data?.data ?? [];

  const createTag = tagsHook.useCreateTag();

  const toggleTag = (id: number) => {
    if (selectedTagIds.includes(id)) {
      setSelectedTagIds(selectedTagIds.filter((t: number) => t !== id));
    } else {
      setSelectedTagIds([...selectedTagIds, id]);
    }
  };

  const handleCreateTag = () => {
    const input = document.getElementById(
      "new-tag-input"
    ) as HTMLInputElement;

    const newTagName = input?.value?.trim();

    if (!newTagName) return;

    createTag.mutate({ name: newTagName });
    setCreateTagOpen(false);
    input.value = "";
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="submit" className="w-full justify-between bg-white text-gray-800 font-semibold border-gray-400 hover:border-[var(--color-primary)]">
          {selectedTagIds.length
            ? `${selectedTagIds.length} Tags Selected`
            : "Select Tags"}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[300px] bg-white">
        <Command>
          <CommandInput
            placeholder="Search tags..."
            value={search}
            onValueChange={setSearch}
          />

          <CommandEmpty>No tags found.</CommandEmpty>

          <CommandList>
            {tagsData.map((tag: any) => {
              const selected = selectedTagIds.includes(tag.id);

              return (
                <CommandItem
                  key={tag.id}
                  onSelect={() => toggleTag(tag.id)}
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

          {!createTagOpen ? (
            <div
              className="flex mt-3 items-center gap-2 bg-[var(--color-primary)] text-white p-2 cursor-pointer"
              onClick={() => setCreateTagOpen(true)}
            >
              <Plus />
              Create New Tag
            </div>
          ) : (
            <div className="flex mt-3">
              <input
                id="new-tag-input"
                type="text"
                placeholder="Enter tag name..."
                className="w-full border-2 border-[var(--color-primary)] px-2 py-1 rounded-md focus:outline-none"
              />
              <Button
                variant="submit"
                className="ml-2"
                onClick={handleCreateTag}
              >
                Add
              </Button>
            </div>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default TagDropdownInput;