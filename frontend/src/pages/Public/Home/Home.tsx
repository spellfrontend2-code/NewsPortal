// import ArticleRectangleCard from "@/features/feedDataList/components/Public/cards/ArticleRectangleCard";
// import ArticleSquareCard from "@/features/feedDataList/components/Public/cards/ArticleSquareHoverCard";
import BannerAdvertisement from "@/features/advertisements/components/Public/BannerAdvertisement";
import ArticleRectangleCard from "@/features/articles/components/Public/cards/ArticleRectangleCard";
import ArticleSquareCard from "@/features/articles/components/Public/cards/ArticleSquareCard";
import { useArticlesHooks } from "@/features/articles/hooks/useArticles";
import Headline from "@/features/home/components/Headline/Headline";
import LatestNews from "@/features/home/components/LatestNews/LatestNews";

function Home() {
  const articleHook = useArticlesHooks();
  const { data: allArticles, isLoading: feedLoading } =
    articleHook.useFetchPublicFeedArticles({
      page: 1,
      per_page: 5,
    });
  const feedDataList = allArticles?.data ?? [];
  console.log(feedDataList);
  return (
    <div className="flex flex-col gap-10 justify-center items-center w-full">
      <Headline />
      <LatestNews />
  {
  feedLoading ? (
    <p>Loading...</p>
  ) : (
   <div className="flex flex-col w-full pt-10">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
    {feedDataList?.map((feedData: any) =>
      feedData?.type === "article" ? (
        <div
          key={feedData?.data?.id}
          className="h-[400px] w-full bg-gray-200"
        >
          <ArticleSquareCard article={feedData.data} />
        </div>
      ) : feedData?.type === "advertisement" ? (
        <div
          key={feedData?.id}
          className="col-span-full my-5"
        >
          <div className="h-[150px] w-full bg-gray-200 text-center">
            <BannerAdvertisement Ad={feedData?.data} />
          </div>
        </div>
      ) : null
    )}
  </div>
</div>
  )
}
    </div>
  );
}

export default Home;
