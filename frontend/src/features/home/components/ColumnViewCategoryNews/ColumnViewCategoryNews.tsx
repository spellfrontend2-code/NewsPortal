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
      slug: category?.slug,
    });

  const articles =
    allArticles?.data
      ?.filter((item: any) => item.type === "article")
      .map((item: any) => item.data) ?? [];

  const slicedArticles = articles.slice(0, 8);

  const advertisementHook = useAdvertisementHooks();

  const { data: advertisements, isLoading: advertisementsLoading } =
    advertisementHook.useFetchPublicAdvertisements();

  const advertisementsList = advertisements?.data ?? [];
  const sidebarAds = advertisementsList?.sidebar?.slice(0, 2);
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
        {/* Articles */}
        <div
          className={`${
            hasSidebarAds ? "lg:w-4/5" : "w-full"
          }h-full w-full grid grid-cols-1 md:grid-cols-2 gap-1`}
        >
          {slicedArticles.map((article: any) => (
            <div key={article.id} className="h-[120px]">
              <ArticleRectangleCard article={article} />
            </div>
          ))}
        </div>

        {/* Advertisements */}
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