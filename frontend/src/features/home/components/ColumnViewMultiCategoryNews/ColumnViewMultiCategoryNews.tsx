import SidebarAdvertisement from "@/features/advertisements/components/Public/SidebarAdvertisement";
import { useAdvertisementHooks } from "@/features/advertisements/hooks/useAdvertisements";
import ArticleRectangleCard from "@/features/articles/components/Public/cards/ArticleRectangleCard";
import { useArticlesHooks } from "@/features/articles/hooks/useArticles";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ColumnViewMultiCategoryNewsSkeleton from "./ColumnViewMultiCategoryNewsSkeleton";

function ColumnViewMultiCategoryNews({
  categoryOne,
  categoryTwo,
  color = "transparent",
}: {
  categoryOne: any;
  categoryTwo: any;
  color?: string;
}) {
  const articleHook = useArticlesHooks();
  const { data: categoryOneArticles, isLoading: categoryOneArticleLoading } =
    articleHook.useFetchPublicArticlesByCategory({
      page: 1,
      per_page: 5,
      slug: categoryOne?.slug,
    });
  const categoryOneItems = (categoryOneArticles?.data ?? []).slice(0, 6);

  const advertisementHook = useAdvertisementHooks();
  const { data: advertisements, isLoading: advertisementsLoading } =
    advertisementHook.useFetchPublicAdvertisements({
      page_type: "home",
      section_id: categoryOne?.id,
    });

  const sidebarAds = advertisements?.data?.sidebar ?? [];
  const hasSidebarAds = sidebarAds?.length > 0;

  const { data: categoryTwoArticles, isLoading: categoryTwoArticleLoading } =
    articleHook.useFetchPublicArticlesByCategory({
      page: 1,
      per_page: 5,
      slug: categoryTwo?.slug,
    });
  const categoryTwoItems = (categoryTwoArticles?.data ?? []).slice(0, 6);

  const navigate = useNavigate();

  if (
    categoryOneArticleLoading ||
    categoryTwoArticleLoading ||
    advertisementsLoading
  ) {
    return <ColumnViewMultiCategoryNewsSkeleton hasSidebarAds={hasSidebarAds} color={color} />;
  }

  return (
    <div
      className={`relative w-full flex lg:flex-row flex-col gap-6 ${color && color !== "transparent" ? "py-6" : ""}`}
      style={{
        backgroundColor: color,
        boxShadow: color && color !== "transparent" ? `0 0 0 100vmax ${color}` : undefined,
        clipPath: color && color !== "transparent" ? "inset(0 -100vmax)" : undefined,
      }}
    >
      {/* Category One */}
      <div className="w-full lg:w-2/3 flex flex-col">
        <div className="flex items-center justify-between pb-2 mb-3">
          <h1
            className="text-2xl cursor-pointer uppercase font-bold
            hover:text-[var(--color-public-text-accent-hover)]
            text-[var(--color-public-text-accent)]
            transition-all duration-200 tracking-tight"
            onClick={() =>
              navigate(`/news-list/category/${categoryOne?.slug}`)
            }
          >
            {categoryOne?.name}
          </h1>
          <button
            onClick={() => navigate(`/news-list/category/${categoryOne?.slug}`)}
            className="cursor-pointer flex items-center justify-center w-8 h-8 rounded-full bg-white text-[var(--color-public-text-accent)] shadow-sm hover:bg-slate-50 transition-colors"
          >
            <ChevronRight size={20} strokeWidth={2.5} />
          </button>
        </div>

        <div className="flex lg:flex-row flex-col gap-6 w-full">
          {/* Articles & Ads */}
          <div
            className={`${
              hasSidebarAds ? "lg:w-2/3" : "w-full"
            } w-full flex flex-col gap-2`}
          >
            {categoryOneItems.map((item: any, idx: number) => {
              if (item?.type === "article") {
               

              const article = item?.data || item;
              return (
                <div key={`art-${article?.id ?? idx}-${idx}`} className="h-[120px]">
                  <ArticleRectangleCard article={article} />
                </div>
              );}
            })}
          </div>

          {/* Ads Sidebar */}
          {hasSidebarAds && (
            <div className="lg:w-1/3 w-full lg:sticky lg:top-20 self-start">
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {sidebarAds.map((ad: any, index: number) => (
                  <div
                    key={ad.id ?? index}
                    className="w-full max-w-[320px] mx-auto aspect-[300/250] overflow-hidden rounded-md
                    border border-[var(--color-public-border-light)]
                    shadow-sm bg-white"
                  >
                    <SidebarAdvertisement Ad={ad} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Category Two */}
      <div className="w-full lg:w-1/3 flex flex-col">
        <div className="flex items-center justify-between pb-2 mb-3">
          <h1
            className="text-2xl cursor-pointer uppercase font-bold
            hover:text-[var(--color-public-text-accent-hover)]
            text-[var(--color-public-text-accent)]
            transition-all duration-200 tracking-tight"
            onClick={() =>
              navigate(`/news-list/category/${categoryTwo?.slug}`)
            }
          >
            {categoryTwo?.name}
          </h1>
          <button
            onClick={() => navigate(`/news-list/category/${categoryTwo?.slug}`)}
            className="cursor-pointer flex items-center justify-center w-8 h-8 rounded-full bg-white text-[var(--color-public-text-accent)] shadow-sm hover:bg-slate-50 transition-colors"
          >
            <ChevronRight size={20} strokeWidth={2.5} />
          </button>
        </div>

        <div className="w-full flex flex-col gap-2">
          {categoryTwoItems.map((item: any, idx: number) => {
            if (item?.type === "article") {
              

            const article = item?.data || item;
            return (
              <div key={`art-${article?.id ?? idx}-${idx}`} className="h-[120px]">
                <ArticleRectangleCard article={article} />
              </div>
            );}
          })}
        </div>
      </div>
    </div>
  );
}

export default ColumnViewMultiCategoryNews;
