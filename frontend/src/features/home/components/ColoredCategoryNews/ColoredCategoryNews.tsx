import ArticleRectangleCard from "@/features/articles/components/Public/cards/ArticleRectangleCard";
import ArticleSquareCard from "@/features/articles/components/Public/cards/ArticleSquareCard";
import { useArticlesHooks } from "@/features/articles/hooks/useArticles";
import { useNavigate } from "react-router-dom";
import ColoredCategoryNewsSkeleton from "./ColoredCategoryNewsSkeleton";

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
  const slicedArticles = articles.slice(1, 6);
  const navigate = useNavigate();
  if(articleLoading) return <ColoredCategoryNewsSkeleton color={color}/>
  return (
    <div className={`relative w-screen py-5`} style={{ backgroundColor: color }}>
      <div className="w-[92%] sm:w-[85%] md:w-[70%] mx-auto">
    <div className="w-full flex flex-col  h-full">
        <h2 className="cursor-pointer h-[5%]  text-2xl md:text-3xl font-black text-[var(--color-public-newsText)] hover:text-[var(--color-public-newsText-hover)] transition-all duration-200  mb-6 uppercase tracking-tight flex items-center gap-2"
            onClick={() => navigate(`/news-list/category/${category?.slug}`)}
          >
            {category?.name}
          </h2>

        <div className="flex flex-col lg:flex-row w-full h-[95%] gap-6">
            <div className="lg:flex-[3] min-w-0 h-[350px] lg:h-auto">
              <ArticleSquareCard article={articles[0]} />
            </div>

          <div className="lg:w-1/4 w-full ">
            <div className="w-full h-full flex flex-col gap-2  justify-between">
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
