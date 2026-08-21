import BannerAdvertisement from "@/features/advertisements/components/Public/BannerAdvertisement";
import SidebarAdvertisement from "@/features/advertisements/components/Public/SidebarAdvertisement";
import { useAdvertisementHooks } from "@/features/advertisements/hooks/useAdvertisements";
import ArticleRectangleCard from "@/features/articles/components/Public/cards/ArticleRectangleCard";
import ArticleSquareHoverCard from "@/features/articles/components/Public/cards/ArticleSquareHoverCard";
import { useArticlesHooks } from "@/features/articles/hooks/useArticles";
import { useNavigate } from "react-router-dom";
import LatestNewsSkeleton from "./LatestNewsSkeleton";

function LatestNews() {
  const navigate = useNavigate();
  const articleHook = useArticlesHooks();
  const { data: allArticles, isLoading } =
    articleHook.useFetchPublicLatestArticles({
      page: 1,
      per_page: 6,
    });

  const items = allArticles?.data ?? [];

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
      section_type: "latest",
    });

  const sidebarAds = advertisements?.data?.sidebar ?? [];
  const hasSidebarAds = sidebarAds.length > 0;

  return (
    <div className="w-full flex flex-col h-full py-6 ">
      {items?.length > 0 && (
        <h2
          className="h-[5%] w-fit cursor-pointer text-2xl md:text-3xl font-semibold text-[var(--color-public-text-main)] hover:text-[var(--color-public-text-accent-hover)] mb-6 uppercase tracking-wider flex items-center gap-2"
          onClick={() => navigate("/news-list/latest-news")}
        >
          Latest News
        </h2>
      )}
      {isLoading || advertisementsLoading ? (
        <LatestNewsSkeleton />
      ) : items?.length > 0 ? (
        <div className="flex flex-col lg:flex-row w-full h-[95%] gap-6">
          <div className="flex flex-col lg:flex-row flex-1 min-w-0 gap-6">
            {firstArticle && (
              <div className="lg:flex-[2] min-w-0 h-[350px] lg:h-auto">
                <ArticleSquareHoverCard article={firstArticle} />
              </div>
            )}

            <div className="flex flex-col gap-1 flex-1">
              {remainingItems.map((item: any, idx: number) => {
                if (item?.type === "advertisement") {
                  return (
                    <div
                      key={`ad-${item?.data?.id ?? idx}-${idx}`}
                      className="w-full my-1 overflow-hidden rounded-md border border-[var(--color-public-border-light)] shadow-sm bg-[var(--color-public-bg-secondary)]"
                    >
                      <BannerAdvertisement item={item} />
                    </div>
                  );
                }

                const article = item?.data || item;
                return (
                  <div key={`art-${article?.id ?? idx}-${idx}`} className="h-[105px]">
                    <ArticleRectangleCard article={article} />
                  </div>
                );
              })}
            </div>
          </div>

          {hasSidebarAds && (
            <div className="w-full lg:w-[300px] shrink-0 lg:sticky lg:top-20 self-start">
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {sidebarAds.map((ad: any, index: number) => (
                  <div
                    key={ad.id ?? index}
                    className="w-full max-w-[300px] aspect-[300/250] mx-auto overflow-hidden rounded-md"
                  >
                    <SidebarAdvertisement Ad={ad} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <p className="text-[var(--color-public-text-muted)] font-medium text-center py-6">
          No news articles found
        </p>
      )}
    </div>
  );
}

export default LatestNews;
