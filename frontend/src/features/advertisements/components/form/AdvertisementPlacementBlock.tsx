import { useEffect, useState, useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { inputStyle } from "@/components/shared/styles/inputStyle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Asterisk, ChartColumnStacked, Search, Check } from "lucide-react";
import { DEFAULT_FORM_PAGES } from "../../constants/formOptions";
import { useAdvertisementHooks } from "../../hooks/useAdvertisements";
import { useCategoriesHooks } from "@/features/categories/hooks/useCategories";
import { useTagsHooks } from "@/features/tags/hooks/useTags";
import { useAuthorHooks } from "@/features/authors/hooks/useAuthors";
import CategoryDropdownInput from "@/features/categories/components/CategoryDropdownInput";
import ArticleDropdownInput from "@/features/articles/components/ArticleDropdownInput";
import type { FormPageOption } from "../../types/advertisement";

interface AdvertisementPlacementBlockProps {
  selectedCategories: any[];
  setSelectedCategories: (categories: any[]) => void;
}

export default function AdvertisementPlacementBlock({
  selectedCategories,
  setSelectedCategories,
}: AdvertisementPlacementBlockProps) {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const advertisementHook = useAdvertisementHooks();
  const categoryHook = useCategoriesHooks();
  const tagHook = useTagsHooks();
  const authorHook = useAuthorHooks();

  const { data: formOptionsData } = advertisementHook.useFetchFormOptions();
  const { data: categoriesList } = categoryHook.useFetchCategories({
    page: 1,
    per_page: 100,
  });
  const { data: tagsData } = tagHook.useFetchTags({ page: 1, per_page: 100 });
  const { data: authorsData } = authorHook.useFetchAuthors({
    page: 1,
    per_page: 100,
  });

  const categoriesData = categoriesList?.data ?? [];

  // Resolve pages configuration
  const pages: FormPageOption[] = useMemo(() => {
    const apiPages =
      formOptionsData?.data?.form?.pages ||
      formOptionsData?.data?.pages ||
      formOptionsData?.form?.pages;
    if (apiPages && Array.isArray(apiPages) && apiPages.length > 0) {
      return apiPages;
    }
    return DEFAULT_FORM_PAGES;
  }, [formOptionsData]);

  // Form values watched
  const pageValue = watch("page") || "home";
  const sectionValue = watch("section") || "";
  const whereValue = watch("where") || "";
  const articleIdValue = watch("article_id");
  const allEntitiesValue = watch("all_entities");
  const tagIdValue = watch("tag_id");
  const authorIdValue = watch("author_id");

  // Selected config models
  const selectedPage = useMemo(
    () => pages.find((p) => p.value === pageValue) || pages[0],
    [pages, pageValue]
  );

  const sections = useMemo(() => selectedPage?.sections ?? [], [selectedPage]);

  const selectedSection = useMemo(
    () => sections.find((s) => s.value === sectionValue),
    [sections, sectionValue]
  );

  const whereOptions = useMemo(
    () => selectedSection?.where ?? [],
    [selectedSection]
  );

  const selectedWhere = useMemo(
    () => whereOptions.find((w) => w.value === whereValue),
    [whereOptions, whereValue]
  );

  // Field visibility flags
  const showSection = Boolean(pageValue && sections.length > 0);
  const showWhere = Boolean(selectedSection && !selectedSection.hide_where);
  const showCategory = Boolean(
    pageValue === "category" || selectedSection?.needs_category
  );
  const showArticleSelector = Boolean(pageValue === "single");
  const showTagSelector = Boolean(pageValue === "tag");
  const showAuthorSelector = Boolean(pageValue === "author");

  const showArticleNumber = selectedWhere?.needs === "article_number";
  const showParagraphNumber = selectedWhere?.needs === "paragraph_number";

  // Article search state for Single page
  const [articleSearchQuery, setArticleSearchQuery] = useState("");
  const { data: articlesSearchResult } = advertisementHook.useFetchArticlesForAd(
    { search: articleSearchQuery, per_page: 25 },
    showArticleSelector
  );
  const articlesList = useMemo(() => {
    const raw =
      articlesSearchResult?.data?.data ||
      articlesSearchResult?.data ||
      articlesSearchResult ||
      [];
    return Array.isArray(raw) ? raw : [];
  }, [articlesSearchResult]);

  // Handle Page change
  const handlePageChange = (newPage: string) => {
    setValue("page", newPage, { shouldDirty: true, shouldValidate: true });

    const newPageConfig = pages.find((p) => p.value === newPage);
    const newSections = newPageConfig?.sections ?? [];
    const defaultSection = newSections[0]?.value || "";

    setValue("section", defaultSection, { shouldDirty: true });

    const defaultSecConfig = newSections[0];
    if (defaultSecConfig?.hide_where) {
      setValue("where", defaultSecConfig.default_where || defaultSecConfig.value, {
        shouldDirty: true,
      });
    } else {
      const defaultWhere = defaultSecConfig?.where?.[0]?.value || "";
      setValue("where", defaultWhere, { shouldDirty: true });
    }

    // Reset entities and numbers
    if (newPage !== "category" && !defaultSecConfig?.needs_category) {
      setValue("category_id", null);
      setSelectedCategories([]);
    }
    setValue("article_id", null);
    setValue("all_entities", newPage === "single");
    setValue("tag_id", null);
    setValue("author_id", null);
    setValue("article_number", null);
    setValue("paragraph_number", null);
  };

  // Handle Section change
  const handleSectionChange = (newSection: string) => {
    setValue("section", newSection, { shouldDirty: true, shouldValidate: true });

    const secConfig = sections.find((s) => s.value === newSection);
    if (secConfig?.hide_where) {
      setValue("where", secConfig.default_where || secConfig.value, {
        shouldDirty: true,
      });
    } else {
      const defaultWhere = secConfig?.where?.[0]?.value || "";
      setValue("where", defaultWhere, { shouldDirty: true });
    }

    if (secConfig?.sizes && secConfig.sizes.length > 0) {
      setValue("size", secConfig.sizes[0], { shouldDirty: true });
    }

    setValue("article_number", null);
    setValue("paragraph_number", null);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="border-b pb-2">
        <p className="font-bold text-lg text-[var(--color-primary)]">
          Ad Placement
        </p>
      </div>

      {/* Target Page and Page Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Target Page */}
        <div>
          <label className="flex items-center gap-1 font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
            Target Page
            <Asterisk className="text-red-500" size={12} />
          </label>
          <Controller
            name="page"
            control={control}
            rules={{ required: "Page is required" }}
            render={({ field }) => (
              <Select
                value={field.value || "home"}
                onValueChange={(val) => handlePageChange(val)}
              >
                <SelectTrigger className={`${inputStyle} py-5 text-base bg-white`}>
                  <SelectValue placeholder="Select target page" />
                </SelectTrigger>
                <SelectContent className="bg-white max-h-72">
                  {pages.map((p) => (
                    <SelectItem key={p.value} value={p.value}>
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        {/* Page Section */}
        {showSection && (
          <div>
            <label className="flex items-center gap-1 font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
              Page Section
              <Asterisk className="text-red-500" size={12} />
            </label>
            <Controller
              name="section"
              control={control}
              rules={{ required: "Section is required" }}
              render={({ field }) => (
                <Select
                  value={field.value || ""}
                  onValueChange={(val) => handleSectionChange(val)}
                >
                  <SelectTrigger className={`${inputStyle} py-5 text-base bg-white`}>
                    <SelectValue placeholder="Select section for this page" />
                  </SelectTrigger>
                  <SelectContent className="bg-white max-h-72">
                    {sections.map((s) => (
                      <SelectItem key={s.value} value={s.value}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        )}
      </div>

      {/* Target Category (Uses CategoryDropdownInput exactly as before) */}
      {(showCategory || pageValue === "category") && (
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-1 font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
            Target Categories
            {pageValue === "category" && <Asterisk className="text-red-500" size={12} />}
          </label>
          {selectedCategories.length > 0 && (
            <div className="h-full w-full flex flex-wrap gap-2">
              {selectedCategories.map((category) => (
                <Button
                  key={category.id}
                  type="button"
                  variant="submit"
                  className="pointer-events-none bg-[rgb(var(--color-primary-rgb)/0.1)] border-2 border-[var(--color-primary)] text-[var(--color-primary)] flex items-center gap-2"
                >
                  <ChartColumnStacked size={16} />
                  {category.name}
                </Button>
              ))}
            </div>
          )}
          <CategoryDropdownInput
            selectedCategoryIds={selectedCategories.map((c) => c.id)}
            setSelectedCategoryIds={(ids: number[]) => {
              const selected = categoriesData.filter((c: any) =>
                ids.includes(c.id)
              );
              setSelectedCategories(selected);
              setValue("category_id", ids.length > 0 ? ids[0] : null, {
                shouldDirty: true,
              });
            }}
          />
        </div>
      )}

      {/* Target Article for Single Page */}
      {showArticleSelector && (
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-1 font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
            Target Article
            <Asterisk className="text-red-500" size={12} />
          </label>
          <ArticleDropdownInput
            selectedArticleId={watch("article_id")}
            allEntities={Boolean(watch("all_entities"))}
            initialArticles={formOptionsData?.data?.articles || formOptionsData?.articles || []}
            onSelectArticle={(articleId, isAll) => {
              if (isAll) {
                setValue("all_entities", true, { shouldDirty: true });
                setValue("article_id", null, { shouldDirty: true });
              } else {
                setValue("all_entities", false, { shouldDirty: true });
                setValue("article_id", articleId, { shouldDirty: true, shouldValidate: true });
              }
            }}
            placeholder="Select specific article or All articles"
          />
          <p className="text-xs text-gray-500">
            {watch("all_entities")
              ? "This advertisement will appear on all article detail pages."
              : watch("article_id")
              ? `Bound to selected article #${watch("article_id")}.`
              : "Search by title or choose All articles."}
          </p>
        </div>
      )}

      {/* Target Tag */}
      {showTagSelector && (
        <div>
          <label className="flex items-center gap-1 font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
            Target Tag
            <Asterisk className="text-red-500" size={12} />
          </label>
          <Controller
            name="tag_id"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value ? String(field.value) : ""}
                onValueChange={(val) => field.onChange(Number(val))}
              >
                <SelectTrigger className={`${inputStyle} py-5 text-base bg-white`}>
                  <SelectValue placeholder="Select target tag" />
                </SelectTrigger>
                <SelectContent className="bg-white max-h-60">
                  {(tagsData?.data ?? []).map((tag: any) => (
                    <SelectItem key={tag.id} value={String(tag.id)}>
                      {tag.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      )}

      {/* Target Author */}
      {showAuthorSelector && (
        <div>
          <label className="flex items-center gap-1 font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
            Target Author
            <Asterisk className="text-red-500" size={12} />
          </label>
          <Controller
            name="author_id"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value ? String(field.value) : ""}
                onValueChange={(val) => field.onChange(Number(val))}
              >
                <SelectTrigger className={`${inputStyle} py-5 text-base bg-white`}>
                  <SelectValue placeholder="Select target author" />
                </SelectTrigger>
                <SelectContent className="bg-white max-h-60">
                  {(authorsData?.data ?? []).map((author: any) => (
                    <SelectItem key={author.id} value={String(author.id)}>
                      {author.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      )}

      {/* Placement Spot (Where) & Index Positions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {showWhere && (
          <div>
            <label className="flex items-center gap-1 font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
              Placement Position (Spot)
              <Asterisk className="text-red-500" size={12} />
            </label>
            <Controller
              name="where"
              control={control}
              rules={{ required: "Placement position is required" }}
              render={({ field }) => (
                <Select
                  value={field.value || ""}
                  onValueChange={(val) => {
                    field.onChange(val);
                    setValue("article_number", null);
                    setValue("paragraph_number", null);
                  }}
                >
                  <SelectTrigger className={`${inputStyle} py-5 text-base bg-white`}>
                    <SelectValue placeholder="Select placement spot" />
                  </SelectTrigger>
                  <SelectContent className="bg-white max-h-60">
                    {whereOptions.map((w) => (
                      <SelectItem key={w.value} value={w.value}>
                        {w.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        )}

        {showArticleNumber && (
          <div>
            <label className="flex items-center gap-1 font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
              After Article Number (#)
              <Asterisk className="text-red-500" size={12} />
            </label>
            <input
              type="number"
              min={1}
              max={50}
              {...register("article_number", {
                required: "Article number is required for this position",
                valueAsNumber: true,
              })}
              placeholder="e.g. 4 (renders after article #4)"
              className={inputStyle}
            />
          </div>
        )}

        {showParagraphNumber && (
          <div>
            <label className="flex items-center gap-1 font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
              After Paragraph Number (#)
              <Asterisk className="text-red-500" size={12} />
            </label>
            <input
              type="number"
              min={1}
              max={100}
              {...register("paragraph_number", {
                required: "Paragraph number is required for this position",
                valueAsNumber: true,
              })}
              placeholder="e.g. 5 (renders after paragraph #5)"
              className={inputStyle}
            />
          </div>
        )}
      </div>
    </div>
  );
}
