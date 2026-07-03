import { Button } from "@/components/ui/button";
import CategoryDropdownInput from "@/features/categories/components/CategoryDropdownInput";
import { useCategoriesHooks } from "@/features/categories/hooks/useCategories";
import TagDropdownInput from "@/features/tags/components/TagDropdownInput";
import { useTagsHooks } from "@/features/tags/hooks/useTags";
import { ChartColumnStacked, Tags } from "lucide-react";

function ArticleCategoriesTags({
    selectedCategories,
    setSelectedCategories,
    selectedTags,
    setSelectedTags,

}: any) {
    const categoryHook=useCategoriesHooks()
  const { data: categoriesList } = categoryHook.useFetchCategories({ page: 1, per_page: 100 });
  const CategoriesData = categoriesList?.data ?? [];
  const tagHook=useTagsHooks()
  const { data: tagsList } = tagHook.useFetchTags({ page: 1, per_page: 100 });
  const TagsData = tagsList?.data ?? [];
  return (
    <div>
      {/* Categories */}

      <div className="mt-5 flex flex-col">
        <div className="h-[35px] flex items-center gap-2 m-2">
          <label>Categories</label>
          {selectedCategories.length > 0 && (
            <div
              className="h-full w-full flex overflow-x-auto [&::-webkit-scrollbar]:hidden
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
        </div>
        <CategoryDropdownInput
          selectedCategoryIds={selectedCategories.map((c) => c.id)}
          setSelectedCategoryIds={(ids) => {
            const selected = CategoriesData.filter((c) => ids.includes(c.id));
            setSelectedCategories(selected);
          }}
        />
      </div>

      {/* Tags */}

      <div className="mt-5 flex flex-col">
        <div className="h-[35px] flex items-center gap-2 m-2">
          <label>Tags</label>
          {selectedTags.length > 0 && (
            <div
              className="h-full w-full flex overflow-x-auto [&::-webkit-scrollbar]:hidden
                [-ms-overflow-style:none]
                [scrollbar-width:none] gap-2"
            >
              {selectedTags.map((tag: any) => (
                <Button
                  key={tag.id}
                  variant="submit"
                  className="pointer-events-none bg-[rgb(var(--color-primary-rgb)/0.1)] border-2 border-[var(--color-primary)] text-[var(--color-primary)]"
                >
                  <Tags />
                  {tag.name}
                </Button>
              ))}
            </div>
          )}
        </div>
        <TagDropdownInput
          selectedTagIds={selectedTags.map((t) => t.id)}
          setSelectedTagIds={(ids) => {
            const selected = TagsData.filter((t) => ids.includes(t.id));
            setSelectedTags(selected);
          }}
        />
      </div>
    </div>
  );
}
export default ArticleCategoriesTags;
