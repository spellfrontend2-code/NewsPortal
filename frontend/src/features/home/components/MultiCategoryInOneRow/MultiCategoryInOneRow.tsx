import ArticleSquareCard from "@/features/articles/components/Public/cards/ArticleSquareCard";
import { useArticlesHooks } from "@/features/articles/hooks/useArticles";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import MultiCategoryInOneRowSkeleton from "./MultiCategoryInOneRowSkeleton";

function MultiCategoryInOneRow({
  categoryOne,
  categoryTwo,
  color = "transparent",
}: {
  categoryOne: any;
  categoryTwo: any;
  color?: string;
}) {
  const articleHook = useArticlesHooks();
  const [categoryOnePagination] = useState({
    pageIndex: 0,
    pageSize: 6,
  });

  const [categoryTwoPagination] = useState({
    pageIndex: 0,
    pageSize: 3,
  });
  const { data: categoryOneArticles, isLoading: categoryOneArticlesLoading } =
    articleHook.useFetchPublicArticlesByCategory({
      page: categoryOnePagination.pageIndex + 1,
      per_page: categoryOnePagination.pageSize,
      slug: categoryOne?.slug,
    });

  const { data: categoryTwoArticles, isLoading: categoryTwoArticlesLoading } =
    articleHook.useFetchPublicArticlesByCategory({
      page: categoryTwoPagination.pageIndex + 1,
      per_page: categoryTwoPagination.pageSize,
      slug: categoryTwo?.slug,
    });

  const allItemsOne = categoryOneArticles?.data ?? [];
const allItemsTwo = categoryTwoArticles?.data ?? [];

// Only display article items
const articleItemsOne = allItemsOne.filter(
  (item: any) => item?.type === "article"
);

const articleItemsTwo = allItemsTwo.filter(
  (item: any) => item?.type === "article"
);

// Decide how many to show
let itemsOne: any[] = [];
let itemsTwo: any[] = [];

if (articleItemsOne.length > 0 && articleItemsTwo.length > 0) {
  // Both categories exist
  itemsOne = articleItemsOne.slice(0, 4);
  itemsTwo = articleItemsTwo.slice(0, 2);
} else if (articleItemsOne.length > 0) {
  // Only category one exists
  itemsOne = articleItemsOne.slice(0, 6);
} else if (articleItemsTwo.length > 0) {
  // Only category two exists
  itemsTwo = articleItemsTwo.slice(0, 6);
}
  const navigate = useNavigate();
  if (categoryOneArticlesLoading || categoryTwoArticlesLoading)
    return <MultiCategoryInOneRowSkeleton color={color} />;
  return (
    <div
      className={`relative w-full py-6`}
      style={{
        backgroundColor: color,
        boxShadow: color && color !== "transparent" ? `0 0 0 100vmax ${color}` : undefined,
        clipPath: color && color !== "transparent" ? "inset(0 -100vmax)" : undefined,
      }}
    >
      <div className="flex flex-col lg:flex-row gap-6 w-full">
       {itemsOne.length > 0 && <div className={`${itemsTwo.length > 0 ? "w-full lg:w-2/3" : "w-full"}`}>
          <div className="flex items-center justify-between pb-2">
            <h1
              className={`text-2xl cursor-pointer uppercase font-bold hover:text-[var(--color-public-text-accent-hover)] text-[var(--color-public-text-accent)] transition-all duration-200 tracking-tight`}
              onClick={() => navigate(`/news-list/category/${categoryOne?.slug}`)}
            >
              {categoryOne?.name}
            </h1>
            <button
              onClick={() => navigate(`/news-list/category/${categoryOne?.slug}`)}
              className="cursor-pointer flex items-center justify-center w-8 h-8 rounded-full bg-white text-[var(--color-public-text-accent)] shadow-sm hover:bg-slate-50 transition-colors"
            >
              <ChevronRight size={20} strokeWidth={2.5} />
            </button>
          </div>
          <div className={`grid ${itemsTwo.length > 0 ? "sm:grid-cols-1 md:grid-cols-2" : "sm:grid-cols-2 md:grid-cols-3"} grid-cols-1 gap-4`}>
            {itemsOne.map((item: any, idx: number) => {
              if (item?.type === "article") {
              

              const article = item?.data || item;
              return (
                <div key={`art-${article?.id ?? idx}-${idx}`} className="h-[320px] w-full bg-transparent">
                  <ArticleSquareCard article={article} />
                </div>
              );}
            })}
          </div>
        </div>}

        {itemsTwo.length > 0 && <div className={`${itemsOne.length > 0 ? "w-full lg:w-1/3" : "w-full"} w-full lg:w-1/3`}>
          <div className="flex items-center justify-between pb-2">
            <h1
              className={`text-2xl cursor-pointer uppercase font-bold hover:text-[var(--color-public-text-accent-hover)] text-[var(--color-public-text-accent)] transition-all duration-200 tracking-tight`}
              onClick={() => navigate(`/news-list/category/${categoryTwo?.slug}`)}
            >
              {categoryTwo?.name}
            </h1>
            <button
              onClick={() => navigate(`/news-list/category/${categoryTwo?.slug}`)}
              className="cursor-pointer flex items-center justify-center w-8 h-8 rounded-full bg-white text-[var(--color-public-text-accent)] shadow-sm hover:bg-slate-50 transition-colors"
            >
              <ChevronRight size={20} strokeWidth={2.5} />
            </button>
          </div>
          <div className={`grid ${itemsOne.length > 0 ? "sm:grid-cols-2 lg:grid-cols-1" : "sm:grid-cols-2 md:grid-cols-3"} grid-cols-1 gap-4`}>
            {itemsTwo.map((item: any, idx: number) => {
              if (item?.type === "article") {
                

              const article = item?.data || item;
              return (
                <div key={`art-${article?.id ?? idx}-${idx}`} className="h-[320px] w-full bg-transparent">
                  <ArticleSquareCard article={article} />
                </div>
              );}
            })}
          </div>
        </div>}
      </div>
    </div>
  );
}

export default MultiCategoryInOneRow;
