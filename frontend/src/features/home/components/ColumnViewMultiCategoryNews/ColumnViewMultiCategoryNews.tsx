import SidebarAdvertisement from "@/features/advertisements/components/Public/SidebarAdvertisement";
import { useAdvertisementHooks } from "@/features/advertisements/hooks/useAdvertisements";
import ArticleRectangleCard from "@/features/articles/components/Public/cards/ArticleRectangleCard";
import { useArticlesHooks } from "@/features/articles/hooks/useArticles";
import { useNavigate } from "react-router-dom";
import ColumnViewMultiCategoryNewsSkeleton from "./ColumnViewMultiCategoryNewsSkeleton";

function ColumnViewMultiCategoryNews({
  categoryOne,
  categoryTwo,
}: {
  categoryOne: any;
  categoryTwo: any;
}) {
  const articleHook = useArticlesHooks();
  const { data: categoryOneArticles, isLoading: categoryOneArticleLoading } =
    articleHook.useFetchPublicArticlesByCategory({
      page: 1,
      per_page: 5,
      slug: categoryOne?.slug,
    });
  const categoryOneArticlesList =
    categoryOneArticles?.data
      ?.filter((item: any) => item.type === "article")
      .map((item: any) => item.data) ?? [];
  const slicedCategoryOneArticles = categoryOneArticlesList.slice(0, 6);
  const advertisementHook = useAdvertisementHooks();
  const { data: advertisements, isLoading: advertisementsLoading } =
    advertisementHook.useFetchPublicAdvertisements();
  const advertisementsList = advertisements?.data ?? [];
  const sidebarAds = advertisementsList?.sidebar?.slice(0, 2);
  const hasSidebarAds = sidebarAds?.length > 0;

  const { data: categoryTwoArticles, isLoading: categoryTwoArticleLoading } =
    articleHook.useFetchPublicArticlesByCategory({
      page: 1,
      per_page: 5,
      slug: categoryTwo?.slug,
    });
  const categoryTwoArticlesList =
    categoryTwoArticles?.data
      ?.filter((item: any) => item.type === "article")
      .map((item: any) => item.data) ?? [];
  const slicedCategoryTwoArticles = categoryTwoArticlesList.slice(0, 6);
  const navigate = useNavigate();
  if(
    categoryOneArticleLoading ||
    categoryTwoArticleLoading ||
    advertisementsLoading
  ) {
    return <ColumnViewMultiCategoryNewsSkeleton />;
  }
  return (
  <div className="w-full flex lg:flex-row flex-col gap-6">
    {/* Category One */}
    <div className="w-full lg:w-2/3 flex flex-col">
      <h1
        className="text-2xl pb-2 mb-3 cursor-pointer uppercase font-bold
        hover:text-[var(--color-public-text-accent-hover)]
        text-[var(--color-public-text-accent)]
        transition-all duration-200 tracking-tight"
        onClick={() =>
          navigate(`/news-list/category/${categoryOne?.slug}`)
        }
      >
        {categoryOne?.name}
      </h1>

      <div className="flex lg:flex-row flex-col gap-6 w-full">
        {/* Articles */}
        <div
          className={`${
            hasSidebarAds ? "lg:w-2/3" : "w-full"
          } w-full flex flex-col gap-2`}
        >
          {slicedCategoryOneArticles.map((article: any) => (
            <div key={article.id} className="h-[120px]">
              <ArticleRectangleCard article={article} />
            </div>
          ))}
        </div>

        {/* Ads */}
        {hasSidebarAds && (
          <div className="lg:w-1/3 w-full">
            <div className="w-full flex flex-col gap-5">
              {sidebarAds.map((ad: any, index: number) => (
                <div
                  key={ad.id ?? index}
                  className="aspect-square overflow-hidden rounded-md
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

    {/* Category Two */}
    <div className="w-full lg:w-1/3 flex flex-col">
      <h1
        className="text-2xl pb-2 mb-3 cursor-pointer uppercase font-bold
        hover:text-[var(--color-public-text-accent-hover)]
        text-[var(--color-public-text-accent)]
        transition-all duration-200 tracking-tight"
        onClick={() =>
          navigate(`/news-list/category/${categoryTwo?.slug}`)
        }
      >
        {categoryTwo?.name}
      </h1>

      <div className="w-full flex flex-col gap-2">
        {slicedCategoryTwoArticles.map((article: any) => (
          <div key={article.id} className="h-[120px]">
            <ArticleRectangleCard article={article} />
          </div>
        ))}
      </div>
    </div>
  </div>
);
}

export default ColumnViewMultiCategoryNews;
