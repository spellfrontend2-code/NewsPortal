import { Button } from "@/components/ui/button";
import ArticleRectangleCard from "@/features/articles/components/Public/cards/ArticleRectangleCard";
import ArticleSquareHoverCard from "@/features/articles/components/Public/cards/ArticleSquareHoverCard";
import { useArticlesHooks } from "@/features/articles/hooks/useArticles";
import { formatDateTime } from "@/lib/formatDateTime";
import { Clock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
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
    <div className="w-full h-[580px]  ">
      {articles?.length > 0 && (
        <h2 className="h-[5%]  text-2xl md:text-3xl font-serif font-black text-slate-900 mb-6 uppercase tracking-tight flex items-center gap-2">
          <span className="h-6 w-1 bg-indigo-650 rounded-full"></span>
          Latest News
        </h2>
      )}
      {isLoading ? (
        <LatestNewsSkeleton />
      ) : articles?.length > 0 ? (
        <div className="flex flex-col lg:flex-row w-full h-[90%] gap-6">
          <div className="h-full flex flex-col md:flex-row lg:w-3/4 gap-6">
            <div className="md:flex-[3] min-w-0 h-full">
              <ArticleSquareHoverCard article={articles[0]} />
            </div>

            <div className="flex md:flex-[2] min-w-0 flex-col gap-4 justify-between">
              <div className="flex flex-col gap-3">
                {articles.slice(1).map((article: any) => (
                  <div key={article.id} className="h-[105px]">
                    <ArticleRectangleCard article={article} />
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                className="w-full rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-bold py-3 text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
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
            <div className="h-full w-full flex flex-row lg:flex-col gap-4 ">
              {sidebarAds.length > 0 &&
                sidebarAds.map((ad: any, index: number) => {
                  return (
                    <div key={ad.id ?? index} className="h-[160px] w-full overflow-hidden rounded-2xl border border-slate-100 shadow-sm">
                      <SidebarAdvertisement Ad={ad} />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-slate-500 font-medium text-center py-6">No news articles found</p>
      )}
    </div>
  );
}
export default LatestNews;
