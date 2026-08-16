import BannerAdvertisement from "@/features/advertisements/components/Public/BannerAdvertisement";
import SidebarAdvertisement from "@/features/advertisements/components/Public/SidebarAdvertisement";
import { useAdvertisementHooks } from "@/features/advertisements/hooks/useAdvertisements";
import ArticleRectangleCard from "@/features/articles/components/Public/cards/ArticleRectangleCard";
import { useArticlesHooks } from "@/features/articles/hooks/useArticles";
import { useNavigate } from "react-router-dom";
import ColumnViewCategoryNewsSkeleton from "./ColumnViewCategoryNewsSkeleton";

function ColumnViewCategoryNews({ category }: { category: any }) {
  const articleHook = useArticlesHooks();

  const { data: allArticles, isLoading: articleLoading } =
    articleHook.useFetchPublicArticlesByCategory({
      page: 1,
      per_page: 8,
      categoryId: category?.id,
      slug: category?.slug,
      section_type: "category",
      section_id: category?.id,
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
    <div className="w-full flex flex-col gap-3 py-5">
      {/* Category Heading */}
      <h1
        className="text-2xl pb-2 cursor-pointer uppercase font-bold
        hover:text-[var(--color-public-text-accent-hover)]
        text-[var(--color-public-text-accent)]
        transition-all duration-200 tracking-tight"
        onClick={() =>
          navigate(`/news-list/category/${category?.slug}`)
        }
      >
        {category?.name}
      </h1>

      {/* Content */}
      <div className="flex lg:flex-row flex-col gap-6 w-full">
        {/* Articles & In-feed Ads */}
        <div
          className={`${
            hasSidebarAds ? "lg:w-4/5" : "w-full"
          } h-full w-full grid grid-cols-1 md:grid-cols-2 gap-3`}
        >
          {items.map((item: any, idx: number) => {
            if (item?.type === "advertisement") {
              return (
                <div
                  key={`ad-${item?.data?.id ?? idx}-${idx}`}
                  className="col-span-full my-2 w-full overflow-hidden rounded-md border border-[var(--color-public-border-light)] shadow-sm bg-[var(--color-public-bg-secondary)]"
                >
                  <BannerAdvertisement item={item} />
                </div>
              );
            }

            const article = item?.data || item;
            return (
              <div key={`art-${article?.id ?? idx}-${idx}`} className="h-[120px]">
                <ArticleRectangleCard article={article} />
              </div>
            );
          })}
        </div>

        {/* Advertisements Sidebar */}
        {hasSidebarAds && (
          <div className="lg:w-1/5 w-full">
            <div className="w-full flex flex-col md:flex-row lg:flex-col gap-5">
              {sidebarAds.map((ad: any, index: number) => (
                <div
                  key={ad.id ?? index}
                  className="w-full aspect-square overflow-hidden rounded-md
                  border border-[var(--color-public-border-light)]
                  shadow-sm"
                >
                  <SidebarAdvertisement Ad={ad} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ColumnViewCategoryNews;