import ArticleRectangleCard from "@/features/articles/components/Public/cards/ArticleRectangleCard";
import ArticleSquareCard from "@/features/articles/components/Public/cards/ArticleSquareCard";
import { useArticlesHooks } from "@/features/articles/hooks/useArticles";
import { useNavigate } from "react-router-dom";

function ColoredCategoryNews({
  category,
  color,
}: {
  category: any;
  color: string;
}) {
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
  const slicedArticles = articles.slice(1, 5);
  const navigate = useNavigate();
  return (
    <div className={`relative  w-screen  bg-${color}-600 py-5`}>
      <div className="w-[92%] sm:w-[85%] md:w-[70%] mx-auto">
        <div className="flex flex-col gap-3 h-[500px]">
          <h1
            className="h-[5%] text-2xl pb-2 cursor-pointer uppercase font-bold text-[var(--color-public-newsText)] hover:text-[var(--color-public-newsText-hover)] transition-all duration-200 tracking-tight"
            onClick={() => navigate(`/news-list/category/${category?.slug}`)}
          >
            {category?.name}
          </h1>

          <div className="flex gap-2 h-[95%]">
            <div className="w-2/3 h-full">
              <ArticleSquareCard article={articles[0]} />
            </div>

            <div className="flex flex-col w-1/3 h-full">
              <div className="flex flex-col gap-1">
                {slicedArticles.map((article: any) => (
                  <div key={article.id} className="h-[105px]">
                    <ArticleRectangleCard article={article} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ColoredCategoryNews;
