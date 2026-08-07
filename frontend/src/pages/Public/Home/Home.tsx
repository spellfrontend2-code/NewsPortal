import { Button } from "@/components/ui/button";
import BannerAdvertisement from "@/features/advertisements/components/Public/BannerAdvertisement";
import PopupAdvertisement from "@/features/advertisements/components/Public/PopupAdvertisement";
import { useAdvertisementHooks } from "@/features/advertisements/hooks/useAdvertisements";
import ArticleSquareCard from "@/features/articles/components/Public/cards/ArticleSquareCard";
import { ArticleSquareCardSkeleton } from "@/features/articles/components/Public/cards/CardSkeleton";
import CategoryBasedNewsList from "@/features/articles/components/Public/NewsList/CategoryBasedNewsList";
import { useArticlesHooks } from "@/features/articles/hooks/useArticles";
import { useCategoriesHooks } from "@/features/categories/hooks/useCategories";
import CategoryWithChildren from "@/features/home/components/CategoryWithChildren/CategoryWithChildren";
import ColoredCategoryNews from "@/features/home/components/ColoredCategoryNews/ColoredCategoryNews";
import ColumnViewCategoryNews from "@/features/home/components/ColumnViewCategoryNews/ColumnViewCategoryNews";
import ColumnViewMultiCategoryNews from "@/features/home/components/ColumnViewMultiCategoryNews/ColumnViewMultiCategoryNews";
import Headline from "@/features/home/components/Headline/Headline";
import LatestNews from "@/features/home/components/LatestNews/LatestNews";
import MultiCategoryInOneRow from "@/features/home/components/MultiCategoryInOneRow/MultiCategoryInOneRow";
import { useEffect, useState } from "react";

function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const articleHook = useArticlesHooks();
  const advertisementHook = useAdvertisementHooks();
  const { data: advertisements, isLoading: adLoading } =
    advertisementHook.useFetchPublicAdvertisements();
  const categoriesHook = useCategoriesHooks();
  const { data: categories } = categoriesHook.useFetchPublicCategories({
    page: 1,
    per_page: 15,
  });
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 6 });
  const { data: allArticles, isLoading: feedLoading } =
    articleHook.useFetchPublicFeedArticles({
      page: pagination.pageIndex + 1,
      per_page: pagination.pageSize,
    });
  const [feedData, setFeedData] = useState([]);
  useEffect(() => {
    if (allArticles?.data) {
      setFeedData((prev) => {
        if (pagination.pageIndex === 0) {
          return allArticles.data;
        }

        return [...prev, ...allArticles.data];
      });
    }
  }, [allArticles, pagination.pageIndex]);
  useEffect(() => {
    if (advertisements?.data?.popup) setShowPopup(true);
  }, [advertisements?.data?.popup]);

  return (
    <div className="flex flex-col gap-10 justify-center items-center w-full  ">
      <Headline />
      <LatestNews />
      {/* <MultiCategoryInOneRow categoryOne={categories?.data[3]} categoryTwo={categories?.data[1]} /> */}
      {/* <CategoryWithChildren category={categories?.data[3]} /> */}
      {/* <ColoredCategoryNews category={categories?.data[3]} color="#D2E7FE" /> */}
      {/* <ColumnViewCategoryNews category={categories?.data[3]} /> */}
      {/* <ColumnViewMultiCategoryNews categoryOne={categories?.data[3]} categoryTwo={categories?.data[1]} /> */}
      {/* <>
      <div className="flex flex-col w-full mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {!(feedData?.length > 0)
            ? Array.from({ length: 6 }, (_, index) => (
                <div key={index} className="h-[400px] w-full">
                  <ArticleSquareCardSkeleton />
                </div>
              ))
            : feedData?.map((feed: any) =>
                feed?.type === "article" ? (
                  <div
                    key={feed?.data?.id}
                    className="h-[300px] w-full bg-transparent"
                  >
                    <ArticleSquareCard article={feed.data} />
                  </div>
                ) : feed?.type === "advertisement" ? (
                  <div key={feed?.id} className="col-span-full my-6">
                    <div className="w-full overflow-hidden rounded-2xl border border-slate-100 shadow-sm bg-slate-50/50">
                      <BannerAdvertisement Ad={feed?.data} />
                    </div>
                  </div>
                ) : null,
              )}
        </div>
        {(pagination.pageIndex + 1 < allArticles?.pagination?.last_page ||
          feedLoading) && (
          <div className="flex justify-center items-center mt-8">
            <Button
              variant="submit"
              className="rounded-full bg-slate-900 text-white font-semibold px-8 py-2.5 hover:bg-slate-800 transition-all duration-200 shadow-md cursor-pointer hover:shadow-lg disabled:opacity-50"
              disabled={feedLoading}
              onClick={() =>
                setPagination((prev) => ({
                  ...prev,
                  pageIndex: prev.pageIndex + 1,
                }))
              }
            >
              {feedLoading ? "Loading..." : "Load More Articles"}
            </Button>
          </div>
        )}
      </div>
      {categories?.data?.length > 0 && (
        <div className="flex flex-col w-full ">
          <div>
            {categories?.data?.map((category: any) => (
              <CategoryBasedNewsList
                key={category?.id}
                categorySlug={category?.slug}
              />
            ))}
          </div>
        </div>
      )}

      {!adLoading && advertisements?.data?.popup?.id && (
        <PopupAdvertisement
          advertisements={advertisements?.data?.popup}
          showPopup={showPopup}
          setShowPopup={setShowPopup}
        />
      )}
      </> */}
    </div>
  );
}

export default Home;
