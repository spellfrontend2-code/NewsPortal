import { Button } from "@/components/ui/button";
import ArticleRectangleCard from "@/features/articles/components/Public/cards/ArticleRectangleCard";
import ArticleSquareHoverCard from "@/features/articles/components/Public/cards/ArticleSquareHoverCard";
import { useArticlesHooks } from "@/features/articles/hooks/useArticles";
import { Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LatestNewsSkeleton from "./LatestNewsSkeleton";
import { useAdvertisementHooks } from "@/features/advertisements/hooks/useAdvertisements";
import SidebarAdvertisement from "@/features/advertisements/components/Public/SidebarAdvertisement";

function LatestNews() {
  const navigate = useNavigate();
  const articleHook = useArticlesHooks();
  const { data: allArticles, isLoading } =
    articleHook.useFetchPublicLatestArticles({
      page: 1,
      per_page: 5,
    });
  const articles =
    allArticles?.data?.filter((article: any) => article?.type==="article").map((article: any) => article?.data) ?? [];
  const advertisementHook = useAdvertisementHooks();
  const { data: advertisements, isLoading: advertisementsLoading } =
    advertisementHook.useFetchPublicAdvertisements();
  const advertisementsList = advertisements?.data ?? [];
  const sidebarAds = advertisementsList?.sidebar?.slice(0, 3);
  return (
    <div className="w-full flex flex-col  h-full">
      {articles?.length > 0 && (
        <h2 className=" h-[5%]  text-2xl md:text-3xl font-black text-[var(--color-public-text-main)] mb-6 uppercase tracking-tight flex items-center gap-2">
          {/* <span className="h-6 w-1 bg-indigo-650 rounded-full"></span> */}
          Latest News
        </h2>
      )}
      {isLoading ? (
        <LatestNewsSkeleton />
      ) : articles?.length > 0 ? (
        <div className="flex flex-col lg:flex-row w-full h-[95%] gap-6">
          <div className="flex flex-col lg:flex-row lg:w-3/4 gap-6">
            <div className="lg:flex-[3] min-w-0 h-[350px] lg:h-auto">
              <ArticleSquareHoverCard article={articles[0]} />
            </div>

            <div className="flex lg:flex-[2] min-w-0 flex-col gap-4 justify-between">
              <div className="flex flex-col gap-3">
                {articles.slice(1).map((article: any) => (
                  <div key={article.id} className="h-[105px]">
                    <ArticleRectangleCard article={article} />
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                className="w-full rounded-full border border-[var(--color-public-border-main)] hover:border-[var(--color-public-border-strong)] hover:bg-[var(--color-public-bg-secondary)] text-[var(--color-public-text-tertiary)] font-bold py-3 text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
                onClick={() => {
                  navigate("/news-list/latest-news");
                }}
              >
                <Clock size={14} />
                <span>24-Hour Archive</span>
              </Button>
            </div>
          </div>
          <div className="lg:w-1/4 w-full">
            <div className="w-full flex lg:flex-col gap-4">
              {sidebarAds.length > 0 &&
                sidebarAds.map((ad: any, index: number) => {
                  return (
                    <div key={ad.id ?? index} className="h-[160px] w-full overflow-hidden rounded-2xl border border-[var(--color-public-border-light)] shadow-sm">
                      <SidebarAdvertisement Ad={ad} />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-[var(--color-public-text-muted)] font-medium text-center py-6">No news articles found</p>
      )}
    </div>
  );
}
export default LatestNews;
