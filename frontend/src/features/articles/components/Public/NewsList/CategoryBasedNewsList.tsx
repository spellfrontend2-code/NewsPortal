import { useArticlesHooks } from "@/features/articles/hooks/useArticles";
import NewsList from "@/pages/Public/News/NewsList";
import { useState } from "react";
import { useParams } from "react-router-dom";
import NewsListSkeleton from "./NewsListSkeleton";
import { Newspaper } from "lucide-react";

function CategoryBasedNewsList({
  categorySlug,
  color = "transparent",
}: {
  categorySlug?: string;
  categoryId?: number | string;
  color?: string;
}) {
  const { slug } = useParams();
  const articleHook = useArticlesHooks();
  const defaultPageSize = categorySlug ? 3 : 13;

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: defaultPageSize,
  });

  const effectiveSlug = categorySlug || slug;
  const { data: allArticles, isLoading } =
    articleHook.useFetchPublicArticlesByCategory({
      page: pagination?.pageIndex + 1,
      per_page: pagination?.pageSize,
      slug: effectiveSlug,
    });

  const items = allArticles?.data ?? [];

  // Find category name from first article item
  const firstArticleItem = items.find(
    (item: any) => !item.type || item.type === "article"
  );
  const firstArticle = firstArticleItem?.data || firstArticleItem;
  const categoryObj = firstArticle?.categories?.find(
    (c: any) => c.slug === effectiveSlug || c.slug === slug || c.slug === categorySlug
  );
  const name = categoryObj?.name || firstArticle?.category?.name || effectiveSlug;

  if (!isLoading && items.length === 0 && categorySlug) return null;

  return (
    <div
      className={`relative w-full ${
        categorySlug
          ? "pb-3 border-b border-slate-100 last:border-b-0"
          : ""
      } py-6`}
      style={{
        backgroundColor: color,
        boxShadow: color && color !== "transparent" ? `0 0 0 100vmax ${color}` : undefined,
        clipPath: color && color !== "transparent" ? "inset(0 -100vmax)" : undefined,
      }}
    >
      {isLoading ? (
        <NewsListSkeleton show={categorySlug ? "list" : "all"} color={color} />
      ) : items.length > 0 ? (
        <NewsList
          articles={items}
          page_headline={name}
          slug={effectiveSlug}
          pagination={pagination}
          setPagination={setPagination}
          lastPage={allArticles?.pagination?.last_page}
          show={categorySlug ? "list" : "all"}
        />
      ) : (
        <div className="flex flex-col items-center justify-center py-12 px-4">
          <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-slate-100">
            <Newspaper className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-700">No news available</h3>
          <p className="mt-1 text-sm text-slate-500 text-center max-w-sm">
            There are currently no news articles available in this category. Please check back later.
          </p>
        </div>
      )}
    </div>
  );
}

export default CategoryBasedNewsList;
