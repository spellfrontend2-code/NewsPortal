import SidebarAdvertisement from "@/features/advertisements/components/Public/SidebarAdvertisement";
import { useAdvertisementHooks } from "@/features/advertisements/hooks/useAdvertisements";
import ArticleRectangleCard from "@/features/articles/components/Public/cards/ArticleRectangleCard";
import { useArticlesHooks } from "@/features/articles/hooks/useArticles";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ColumnViewCategoryNewsSkeleton from "./ColumnViewCategoryNewsSkeleton";

function ColumnViewCategoryNews({ category }: { category: any }) {
  const articleHook = useArticlesHooks();

  const { data: allArticles, isLoading: articleLoading } =
    articleHook.useFetchPublicArticlesByCategory({
      page: 1,
      per_page: 8,
      slug: category?.slug,
    });

  const items = (allArticles?.data ?? []).slice(0, 8);

  const advertisementHook = useAdvertisementHooks();

  const { data: advertisements, isLoading: advertisementsLoading } =
    advertisementHook.useFetchPublicAdvertisements({
      page_type: "home",
      section_id: category?.id,
    });

  const sidebarAds = advertisements?.data?.sidebar ?? [];
  const hasSidebarAds = sidebarAds?.length > 0;

  const navigate = useNavigate();

  if (articleLoading || advertisementsLoading) {
    return <ColumnViewCategoryNewsSkeleton />;
  }

  return (
    <div className="w-full flex flex-col lg:flex-row gap-6 py-5">
      <div className="w-full flex flex-col gap-3 py-5">
      {/* Category Heading */}
      <div className="flex items-center justify-between pb-2">
        <h1
          className="text-2xl cursor-pointer uppercase font-bold
          hover:text-[var(--color-public-text-accent-hover)]
          text-[var(--color-public-text-accent)]
          transition-all duration-200 tracking-tight"
          onClick={() =>
            navigate(`/news-list/category/${category?.slug}`)
          }
        >
          {category?.name}
        </h1>
        <button
          onClick={() => navigate(`/news-list/category/${category?.slug}`)}
          className="cursor-pointer flex items-center justify-center w-8 h-8 rounded-full bg-white text-[var(--color-public-text-accent)] shadow-sm hover:bg-slate-50 transition-colors"
        >
          <ChevronRight size={20} strokeWidth={2.5} />
        </button>
      </div>

      {/* Content */}
      <div className="flex lg:flex-row flex-col gap-6 w-full">
        {/* Articles & In-feed Ads */}
        <div
          className={`${
            hasSidebarAds ? "lg:w-4/5" : "w-full"
          } h-full w-full grid grid-cols-1 md:grid-cols-2 gap-3`}
        >
          {items.map((item: any, idx: number) => {
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
    {/* Advertisements Sidebar */}
        {hasSidebarAds && (
          <div className="lg:w-1/5 w-full lg:sticky lg:top-20 self-start">
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
  );
}

export default ColumnViewCategoryNews;