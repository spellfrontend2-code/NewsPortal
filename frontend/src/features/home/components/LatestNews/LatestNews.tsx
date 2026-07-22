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
    allArticles?.data?.map((article: any) => article?.data) ?? [];
  const advertisementHook = useAdvertisementHooks();
  const { data: advertisements, isLoading: advertisementsLoading } =
    advertisementHook.useFetchPublicAdvertisements();
  const advertisementsList = advertisements?.data ?? [];
  const sidebarAd = advertisementsList?.sidebar?.slice(0, 3);
  return (
    <div className="h-[500px] w-full ">
      {articles.length > 0 && (
        <h1 className="text-5xl font-bold text-[var(--color-public-newsText)] ">
Latest News      </h1>
      )}
      {isLoading ? (
        <LatestNewsSkeleton />
      ) : articles?.length > 0 ? (
        <div className="flex w-full h-full gap-3 ">
          <div className="flex w-3/4 gap-3">
            <div className="flex-[3] min-w-0">
              <ArticleSquareHoverCard article={articles[0]} />
            </div>

            <div className="flex flex-[2] min-w-0 flex-col gap-3">
              {articles.slice(1).map((article: any) => (
                <ArticleRectangleCard key={article.id} article={article} />
              ))}

              <Button
                variant="view"
                className="w-full"
                onClick={() => {
                  navigate("/news-list/latest-news");
                }}
              >
                <Clock />
                View 24 hours latest news
              </Button>
            </div>
          </div>
          <div className="w-1/4">
            <div className="h-full w-full flex flex-col gap-2 ">
              {sidebarAd &&
               <SidebarAdvertisement Ads={sidebarAd} />
               }
            </div>
          </div>
        </div>
      ) : (
        <p>No news</p>
      )}
    </div>
  );
}
export default LatestNews;
