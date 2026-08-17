import { useState, useMemo } from "react";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, Newspaper, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAdvertisementHooks } from "@/features/advertisements/hooks/useAdvertisements";

interface ArticleDropdownInputProps {
  selectedArticleId: number | null | undefined;
  allEntities?: boolean;
  onSelectArticle: (articleId: number | null, isAll: boolean) => void;
  initialArticles?: Array<{ value: number | null; label: string; slug?: string; status?: string; all?: boolean }>;
  placeholder?: string;
}

function ArticleDropdownInput({
  selectedArticleId,
  allEntities = false,
  onSelectArticle,
  initialArticles = [],
  placeholder = "Select Article or All Articles",
}: ArticleDropdownInputProps) {
  const advertisementHook = useAdvertisementHooks();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const { data: searchData, isLoading } = advertisementHook.useFetchArticlesForAd({
    search: search.trim() || undefined,
    per_page: 20,
    article_id: selectedArticleId || undefined,
  });

  const articlesData = useMemo(() => {
    const raw =
      searchData?.data?.data ||
      searchData?.data ||
      searchData?.articles ||
      [];
    const items = Array.isArray(raw) ? [...raw] : [];

    // If search is empty and initialArticles are provided, prioritize initialArticles
    if (!search.trim() && initialArticles.length > 0 && items.length === 0) {
      return initialArticles;
    }

    // Ensure "All articles" is at the top when search is empty
    if (!search.trim()) {
      const hasAll = items.some((item: any) => item.value === null || item.all === true || item.id === null);
      if (!hasAll) {
        items.unshift({
          value: null,
          id: null,
          label: "All articles",
          title: "All articles",
          all: true,
        });
      }
    }

    return items;
  }, [searchData, search, initialArticles]);

  const selectedArticle = useMemo(() => {
    if (allEntities) {
      return { label: "All articles", title: "All articles", isAll: true };
    }
    if (!selectedArticleId) return null;

    const found = articlesData.find((a: any) => {
      const aId = a.value !== undefined ? a.value : a.id;
      return Number(aId) === Number(selectedArticleId);
    });

    if (found) {
      return {
        label: found.label || found.title,
        title: found.title || found.label,
        isAll: false,
      };
    }

    return {
      label: `Article #${selectedArticleId}`,
      title: `Article #${selectedArticleId}`,
      isAll: false,
    };
  }, [allEntities, selectedArticleId, articlesData]);

  const handleSelect = (item: any) => {
    const val = item.value !== undefined ? item.value : item.id;
    const isAll = val === null || item.all === true;

    if (isAll) {
      onSelectArticle(null, true);
    } else {
      onSelectArticle(Number(val), false);
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
            {allEntities ? (
              <Globe size={16} className="text-[var(--color-primary)] shrink-0" />
            ) : (
              <Newspaper size={16} className="text-gray-500 shrink-0" />
            )}
            {selectedArticle ? selectedArticle.label || selectedArticle.title : placeholder}
          </span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[420px] max-w-[90vw] p-0 bg-white shadow-md border rounded-md" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search articles by title..."
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
              articlesData.map((article: any, index: number) => {
                const val = article.value !== undefined ? article.value : article.id;
                const isAll = val === null || article.all === true;
                const label = article.label || article.title || (isAll ? "All articles" : `Article #${val}`);
                const isSelected = isAll ? allEntities : !allEntities && Number(selectedArticleId) === Number(val);

                return (
                  <CommandItem
                    key={isAll ? "all-articles" : val ?? index}
                    onSelect={() => handleSelect(article)}
                    className="flex items-center gap-2 cursor-pointer p-2 hover:bg-slate-100"
                  >
                    <Check
                      size={16}
                      className={isSelected ? "opacity-100 text-[var(--color-primary)]" : "opacity-0"}
                    />
                    <span className={`truncate text-sm ${isAll ? "font-bold text-[var(--color-primary)]" : "text-slate-800"}`}>
                      {label}
                    </span>
                    {article.status && (
                      <span className="ml-auto text-[10px] uppercase font-semibold text-slate-400">
                        {article.status}
                      </span>
                    )}
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
