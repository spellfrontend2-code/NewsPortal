import SidebarAdvertisement from "@/features/advertisements/components/Public/SidebarAdvertisement";
import { useAdvertisementHooks } from "@/features/advertisements/hooks/useAdvertisements";
import ArticleRectangleCard from "@/features/articles/components/Public/cards/ArticleRectangleCard";
import ArticleSquareCard from "@/features/articles/components/Public/cards/ArticleSquareCard";
import { useArticlesHooks } from "@/features/articles/hooks/useArticles";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CategoryWithChildrenSkeleton from "./CategoryWithChildrenSkeleton";

function CategoryWithChildren({
  category,
  color = "transparent",
}: {
  category: any;
  color?: string;
}) {
  const navigate = useNavigate();
  const articleHook = useArticlesHooks();
  const defaultPageSize = 7;

  const { data: allArticles, isLoading: articleLoading } =
    articleHook.useFetchPublicArticlesByCategory({
      page: 1,
      per_page: defaultPageSize,
      slug: category?.slug,
    });

  const items = allArticles?.data ?? [];

  // Find first article for top detailed card
  const firstArticleIndex = items.findIndex(
    (item: any) => !item.type || item.type === "article"
  );
  const firstArticle =
    firstArticleIndex !== -1
      ? items[firstArticleIndex]?.data || items[firstArticleIndex]
      : null;

  const remainingItems =
    firstArticleIndex !== -1
      ? items.filter((_: any, idx: number) => idx !== firstArticleIndex)
      : items;

  const advertisementHook = useAdvertisementHooks();
  const { data: advertisements, isLoading: advertisementsLoading } =
    advertisementHook.useFetchPublicAdvertisements({
      page_type: "home",
      section_id: category?.id,
    });

  const sidebarAds = advertisements?.data?.sidebar ?? [];
  const hasSidebarAds = sidebarAds?.length > 0;

  if (articleLoading || advertisementsLoading)
    return <CategoryWithChildrenSkeleton hasSidebarAds={hasSidebarAds} color={color} />;

  return (
    <div
      className={`relative w-full py-6`}
      style={{
        backgroundColor: color,
        boxShadow: color && color !== "transparent" ? `0 0 0 100vmax ${color}` : undefined,
        clipPath: color && color !== "transparent" ? "inset(0 -100vmax)" : undefined,
      }}
    >
      <div className="flex flex-col lg:flex-row gap-6 w-full">
        <div className="flex-1 min-w-0 flex flex-col gap-4">
          <div className="h-[10%] flex items-center gap-10 w-full">
            <div className="h-full px-2 w-fit flex items-center gap-3">
              <h1
                className={`text-2xl pb-2 cursor-pointer uppercase font-bold hover:text-[var(--color-public-text-accent-hover)] text-[var(--color-public-text-accent)] transition-all duration-200 tracking-tight`}
                onClick={() => navigate(`/news-list/category/${category?.slug}`)}
              >
                {category?.name}
              </h1>
           
            </div>
            {category?.children?.length > 0 && (
              <div className="border-l border-[var(--color-public-border-strong)] h-full w-4/5 flex gap-4 flex-wrap items-center pl-5">
                {category?.children?.map((child: any) => (
                  <h1
                    key={child?.id}
                    className={`text-base hover:shadow-md px-2 py-1 rounded-md cursor-pointer font-semibold hover:text-[var(--color-public-text-accent-hover)] transition-all duration-200 tracking-tight`}
                    onClick={() =>
                      navigate(
                        `/news-list/category/${child?.slug}`,
                      )
                    }
                  >
                    {child?.name}
                  </h1>
                ))}
              </div>
            )}
               <button
                onClick={() => navigate(`/news-list/category/${category?.slug}`)}
                className="cursor-pointer flex items-center justify-center w-8 h-8 mb-2 rounded-full bg-white text-[var(--color-public-text-accent)] shadow-sm hover:bg-slate-50 transition-colors"
              >
                <ChevronRight size={20} strokeWidth={2.5} />
              </button>
          </div>

          <div>
            {firstArticle && (
              <div className="h-auto md:h-[300px] w-full">
                <ArticleRectangleCard article={firstArticle} type="detailed" />
              </div>
            )}

            <div
              className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 w-full gap-6 pt-10`}
            >
              {remainingItems.map((item: any, idx: number) => {
                if (item?.type === "article") {
              

                const articleData = item?.data || item;
                return (
                  <div
                    key={`art-${articleData?.id ?? idx}-${idx}`}
                    className="h-[320px] w-full bg-transparent"
                  >
                    <ArticleSquareCard article={articleData} />
                  </div>
                );}
              })}
            </div>
          </div>
        </div>

        {hasSidebarAds && (
          <div className="w-full lg:w-[300px] shrink-0 lg:sticky lg:top-20 self-start">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {sidebarAds.map((ad: any, index: number) => {
                return (
                  <div
                    key={ad.id ?? index}
                    className="w-full max-w-[300px] aspect-[300/250] mx-auto overflow-hidden rounded-xl"
                  >
                    <SidebarAdvertisement Ad={ad} />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryWithChildren;
