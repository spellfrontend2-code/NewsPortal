import SidebarAdvertisement from "@/features/advertisements/components/Public/SidebarAdvertisement";
import { useAdvertisementHooks } from "@/features/advertisements/hooks/useAdvertisements";
import ArticleRectangleCard from "@/features/articles/components/Public/cards/ArticleRectangleCard";
import { useArticlesHooks } from "@/features/articles/hooks/useArticles";
import { useNavigate } from "react-router-dom";

function ColumnViewCategoryNews({ category }: { category: any }) {
  const articleHook = useArticlesHooks();
  const { data: allArticles, isLoading: articleLoading } =
    articleHook.useFetchPublicArticlesByCategory({
      page: 1,
      per_page: 6,
      slug: category?.slug,
    });
  const articles =
    allArticles?.data
      ?.filter((item: any) => item.type === "article")
      .map((item: any) => item.data) ?? [];
  const slicedArticles = articles.slice(0, 6);
  const advertisementHook = useAdvertisementHooks();
  const { data: advertisements, isLoading: advertisementsLoading } =
    advertisementHook.useFetchPublicAdvertisements();
  const advertisementsList = advertisements?.data ?? [];
  const sidebarAds = advertisementsList?.sidebar?.slice(0, 2);
  const hasSidebarAds = sidebarAds?.length > 0;
  const navigate = useNavigate();
  return (
    <div className="w-full h-full flex flex-col gap-2 py-5">
      <h1
        className={`h-[5%] text-2xl pb-2 cursor-pointer uppercase font-bold text-[var(--color-public-newsText)] hover:text-[var(--color-public-newsText-hover)] transition-all duration-200 tracking-tight`}
        onClick={() => navigate(`/news-list/category/${category?.slug}`)}
      >
        {category?.name}
      </h1>
      <div className="flex flex w-full h-full  ">
        <div
          className={` ${hasSidebarAds ? "w-2/3" : "w-full"} grid grid-cols-2 gap-1`}
        >
          {slicedArticles.map((article: any) => (
            <div key={article.id} className="h-[105px]">
              <ArticleRectangleCard article={article} />
            </div>
          ))}
        </div>
        {hasSidebarAds && (
          <div className="lg:w-1/4 w-full">
            <div className="h-full w-full flex flex-row lg:flex-col gap-4 ">
              {sidebarAds.map((ad: any, index: number) => {
                return (
                  <div
                    key={ad.id ?? index}
                    className=" h-[160px] w-full overflow-hidden rounded-2xl border border-slate-100 shadow-sm"
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

export default ColumnViewCategoryNews;
