import { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useArticlesHooks } from "@/features/articles/hooks/useArticles";

interface ArticleDropdownInputProps {
  selectedArticleId: number | null | undefined;
  setSelectedArticleId: (id: number | null) => void;
  placeholder?: string;
}

function ArticleDropdownInput({
  selectedArticleId,
  setSelectedArticleId,
  placeholder = "Select Article",
}: ArticleDropdownInputProps) {
  const articlesHook = useArticlesHooks();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const { data, isLoading } = articlesHook.useFetchArticles({
    page: 1,
    per_page: 25,
    search,
  });

  const rawArticles = data?.data?.data || data?.data || [];
  const articlesData = Array.isArray(rawArticles) ? rawArticles : [];

  const selectedArticle = articlesData.find(
    (a: any) => Number(a.id) === Number(selectedArticleId)
  );

  const handleSelect = (id: number) => {
    if (selectedArticleId === id) {
      setSelectedArticleId(null);
    } else {
      setSelectedArticleId(id);
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="submit"
          className="w-full rounded-md p-5 justify-between bg-white text-gray-800 font-semibold border-gray-400 hover:border-[var(--color-primary)] text-left"
        >
          <span className="truncate flex items-center gap-2">
            <Newspaper size={16} className="text-gray-500 shrink-0" />
            {selectedArticle ? selectedArticle.title : placeholder}
          </span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[420px] max-w-[90vw] p-0 bg-white shadow-md border rounded-md" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search Articles by title..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandList className="max-h-64 overflow-y-auto">
            {isLoading && (
              <div className="p-3 text-sm text-gray-500">
                Loading articles...
              </div>
            )}

            {!isLoading && articlesData.length === 0 && (
              <CommandEmpty>No articles found.</CommandEmpty>
            )}

            {!isLoading &&
              articlesData.map((article: any) => {
                const isSelected = Number(selectedArticleId) === Number(article.id);

                return (
                  <CommandItem
                    key={article.id}
                    onSelect={() => handleSelect(article.id)}
                    className="flex items-center gap-2 cursor-pointer p-2 hover:bg-slate-100"
                  >
                    <Check
                      size={16}
                      className={isSelected ? "opacity-100 text-[var(--color-primary)]" : "opacity-0"}
                    />
                    <span className="truncate text-sm text-slate-800">{article.title}</span>
                  </CommandItem>
                );
              })}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default ArticleDropdownInput;
