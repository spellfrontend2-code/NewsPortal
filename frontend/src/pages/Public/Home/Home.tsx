import ArticleRectangleCard from "@/features/articles/components/cards/ArticleRectangleCard";
import ArticleSquareCard from "@/features/articles/components/cards/ArticleSquareCard";
import { useArticlesHooks } from "@/features/articles/hooks/useArticles";
import Headline from "@/features/home/components/Headline";

function Home() {
      const articleHook = useArticlesHooks();
      const { data: allArticles, isLoading } = articleHook.useFetchPublicArticles({
        page: 1,
        per_page: 5,
      });
      const articles=allArticles?.data??[]
  return (
    <div className="flex flex-col gap-10">
      <Headline />
      {/* <div className="grid grid-cols-5 gap-3 ">
        {articles.map((article: any) =>(
            <ArticleSquareCard
       article={article}
      />
      ))}
      </div>
            <div className="flex flex-col gap-3 ">
        {articles.map((article: any) =>(
            <ArticleRectangleCard 
        article={article}
        // type="detailed"
      />
      ))}
      </div> */}
    </div>
  );
}

export default Home;
