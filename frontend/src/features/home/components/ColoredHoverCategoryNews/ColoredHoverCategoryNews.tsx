import ArticleSquareHoverCard from "@/features/articles/components/Public/cards/ArticleSquareHoverCard";
import { useArticlesHooks } from "@/features/articles/hooks/useArticles";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ColoredHoverCategoryNewsSkeleton from "./ColoredHoverCategoryNewsSkeleton";

function ColoredHoverCategoryNews({
  category,
  color,
}: {
  category: any;
  color: string;
}) {
  const articleHook = useArticlesHooks();
  // Fetch up to 4 articles for the grid
  const { data: allArticles, isLoading: articleLoading } =
    articleHook.useFetchPublicArticlesByCategory({
      page: 1,
      per_page: 4,
      slug: category?.slug,
    });

  const items = allArticles?.data ?? [];

  // Filter out any non-article types (like ads, just in case)
  const articles = items
    .filter((item: any) => !item.type || item.type === "article")
    .map((item: any) => item?.data || item)
    .slice(0, 4);

  const navigate = useNavigate();

  if (articleLoading) return <ColoredHoverCategoryNewsSkeleton color={color} />;

  return (
    <div
      className={`relative w-full py-8`}
      style={{
        backgroundColor: color,
        boxShadow: `0 0 0 100vmax ${color}`,
        clipPath: "inset(0 -100vmax)",
      }}
    >
      <div className="w-full flex flex-col h-full gap-5">
        {/* Header section with Title and Arrow */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <h1
              className={`text-2xl sm:text-3xl cursor-pointer uppercase font-bold hover:text-[var(--color-public-text-accent-hover)] text-[var(--color-public-text-accent)] transition-all duration-200 tracking-tight`}
              onClick={() => navigate(`/news-list/category/${category?.slug}`)}
            >
              {category?.name}
            </h1>
          
          </div>

          <button
            onClick={() => navigate(`/news-list/category/${category?.slug}`)}
            className="cursor-pointer flex items-center justify-center w-8 h-8 rounded-full bg-white text-[var(--color-public-text-accent)] shadow-sm hover:bg-slate-50 transition-colors"
          >
            <ChevronRight size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[250px] sm:auto-rows-[300px] lg:auto-rows-[350px]">
          {articles.map((article: any, idx: number) => (
            <div key={`hover-art-${article?.id ?? idx}`} className="w-full h-full">
              <ArticleSquareHoverCard 
                article={article} 
                hideMeta={true} 
                titleClassName="text-lg sm:text-xl lg:text-2xl"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ColoredHoverCategoryNews;
