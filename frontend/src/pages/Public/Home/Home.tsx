import ArticleRectangleCard from "@/features/articles/components/Public/cards/ArticleRectangleCard";
import ArticleSquareCard from "@/features/articles/components/Public/cards/ArticleSquareHoverCard";
import { useArticlesHooks } from "@/features/articles/hooks/useArticles";
import Headline from "@/features/home/components/Headline/Headline";
import LatestNews from "@/features/home/components/LatestNews/LatestNews";

function Home() {
      const articleHook = useArticlesHooks();
      // const { data: allArticles, isLoading } = articleHook.useFetchPublicArticles({
      //   page: 1,
      //   per_page: 5,
      // });
      // const articles=allArticles?.data??[]
  return (
    <div className="flex flex-col gap-10 justify-center items-center w-full">
      <Headline />
     <LatestNews/>
    </div>
  );
}

export default Home;
