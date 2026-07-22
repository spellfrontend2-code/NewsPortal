import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import BannerAdvertisement from "@/features/advertisements/components/Public/BannerAdvertisement";
import PopupAdvertisement from "@/features/advertisements/components/Public/PopupAdvertisement";
import SidebarAdvertisement from "@/features/advertisements/components/Public/SidebarAdvertisement";
import { useAdvertisementHooks } from "@/features/advertisements/hooks/useAdvertisements";
import ArticleSquareCard from "@/features/articles/components/Public/cards/ArticleSquareCard";
import { ArticleSquareCardSkeleton } from "@/features/articles/components/Public/cards/CardSkeleton";
import CategoryBasedNewsList from "@/features/articles/components/Public/NewsList/CategoryBasedNewsList";
import { useArticlesHooks } from "@/features/articles/hooks/useArticles";
import { useCategoriesHooks } from "@/features/categories/hooks/useCategories";
import Headline from "@/features/home/components/Headline/Headline";
import LatestNews from "@/features/home/components/LatestNews/LatestNews";
import { useEffect, useState } from "react";

function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const articleHook = useArticlesHooks();
  const advertisementHook = useAdvertisementHooks();
  const { data: advertisements } =
    advertisementHook.useFetchPublicAdvertisements();
    console.log("popup",advertisements?.data?.popup)
  const categoriesHook = useCategoriesHooks();
  const { data: categories } = categoriesHook.useFetchPublicCategories({
    page: 1,
    per_page: 15,
  });
  console.log(categories?.data);
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
      setShowPopup(true);
  }, []);
  return (
    <div className="flex flex-col gap-10 justify-center items-center w-full py-10 ">
      <Headline />
      <LatestNews />

      <div className="flex flex-col w-full mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {!(feedData?.length > 0)
            ? Array.from({ length: 6 }, (_, index) => (
                <div className="h-[400px] w-full bg-gray-200/10">
                  <ArticleSquareCardSkeleton />
                </div>
              ))
            : feedData?.map((feed: any) =>
                feed?.type === "article" ? (
                  <div
                    key={feed?.data?.id}
                    className="h-[400px] w-full bg-gray-200"
                  >
                    <ArticleSquareCard article={feed.data} />
                  </div>
                ) : feed?.type === "advertisement" ? (
                  <div key={feed?.id} className="col-span-full my-5">
                    <div className="h-[150px] w-full bg-gray-200 text-center">
                      <BannerAdvertisement Ad={feed?.data} />
                    </div>
                  </div>
                ) : null,
              )}
        </div>
        {(pagination.pageIndex + 1 < allArticles?.pagination?.last_page ||
          feedLoading) && (
          <div className="flex justify-end items-end mt-3">
            <Button
              variant="submit"
              className="rounded-md bg-[var(--color-public-newsText)]"
              disabled={feedLoading}
              onClick={() =>
                setPagination((prev) => ({
                  ...prev,
                  pageIndex: prev.pageIndex + 1,
                }))
              }
            >
              {feedLoading ? "Loading..." : "Load More"}
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

      <PopupAdvertisement advertisements={advertisements?.data?.popup} showPopup={showPopup} setShowPopup={setShowPopup} />
    </div>
  );
}

export default Home;
