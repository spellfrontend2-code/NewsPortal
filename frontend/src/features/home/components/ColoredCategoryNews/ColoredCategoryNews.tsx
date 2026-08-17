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

  const items = allArticles?.data ?? [];

  const firstArticleIndex = items.findIndex(
    (item: any) => !item.type || item.type === "article"
  );
  const firstArticle =
    firstArticleIndex !== -1
      ? items[firstArticleIndex]?.data || items[firstArticleIndex]
      : null;

  const remainingItems =
    firstArticleIndex !== -1
      ? items.filter((_: any, idx: number) => idx !== firstArticleIndex).slice(0, 5)
      : items.slice(0, 5);

  const navigate = useNavigate();

  if (articleLoading) return <ColoredCategoryNewsSkeleton color={color} />;

  return (
    <div
      className={`relative w-full py-5`}
      style={{
        backgroundColor: color,
        boxShadow: `0 0 0 100vmax ${color}`,
        clipPath: "inset(0 -100vmax)",
      }}
    >
      <div className="w-full flex flex-col h-full">
        <h1
          className={`text-2xl pb-2 cursor-pointer uppercase font-bold hover:text-[var(--color-public-text-accent-hover)] text-[var(--color-public-text-accent)] transition-all duration-200 tracking-tight`}
          onClick={() => navigate(`/news-list/category/${category?.slug}`)}
        >
          {category?.name}
        </h1>

        <div className="flex flex-col lg:flex-row w-full h-[95%] gap-6">
          <div className="lg:flex-[2] min-w-0 lg:h-[600px]">
            {firstArticle && (
              <ArticleSquareCard
                article={firstArticle}
                titleClassName="text-xl sm:text-2xl md:text-3xl lg:text-5xl"
              />
            )}
          </div>

          <div className="lg:w-1/3 w-full">
            <div className="w-full h-full flex flex-col gap-2">
              {remainingItems.map((item: any, idx: number) => {
                if (item?.type === "article") {
                 

                const article = item?.data || item;
                return (
                  <div key={`art-${article?.id ?? idx}-${idx}`} className="h-[105px]">
                    <ArticleRectangleCard article={article} />
                  </div>
                );}
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ColoredCategoryNews;
