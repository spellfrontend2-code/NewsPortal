import { Button } from "@/components/ui/button";
import ArticleRectangleCard from "@/features/articles/components/Public/cards/ArticleRectangleCard";
import ArticleSquareHoverCard from "@/features/articles/components/Public/cards/ArticleSquareHoverCard";
import { useArticlesHooks } from "@/features/articles/hooks/useArticles";
import { formatDateTime } from "@/lib/formatDateTime";
import { Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LatestNewsSkeleton from "./LatestNewsSkeleton";


function LatestNews() {
    const navigate = useNavigate();
  const fromDate = new Date();
  const toDate = new Date();
  fromDate.setDate(fromDate.getDate() - 4);
  toDate.setDate(toDate.getDate() - 3);
    const to_date = formatDateTime(toDate);
  const from_date = formatDateTime(fromDate);
  const articleHook = useArticlesHooks();
  const { data: allArticles, isLoading } = articleHook.useFetchPublicArticles({
    from_date,
    to_date,
    page: 1,
    per_page: 5,
  });
  const articles = allArticles?.data ?? [];
  return (
    <div className="h-[500px] w-full">
{articles.length > 0 &&      <h1 className="text-3xl font-bold text-[var(--color-public-newsText)]">Latest News</h1>
}      {isLoading ? (
        <LatestNewsSkeleton />
      ) : articles?.length > 0 ? (
        <div className="flex w-full h-full gap-3">
          <div className="flex w-3/4 gap-3">
            <div className="flex-[3] min-w-0">
              <ArticleSquareHoverCard article={articles[0]} />
            </div>

            <div className="flex flex-[2] min-w-0 flex-col gap-3">
              {articles.slice(1).map((article: any) => (
                <ArticleRectangleCard key={article.id} article={article} />
              ))}

              <Button variant="view" className="w-full" onClick={() => {navigate("/news-list/latest-news")}}>
                <Clock/>View 24 hours latest news
              </Button>
            </div>
          </div>
          <div className="w-1/4">Advertisements</div>
        </div>
      ) : (
        <p>No news</p>
      )}
    </div>
  );
}
export default LatestNews;
