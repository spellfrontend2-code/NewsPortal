import BannerAdvertisement from "@/features/advertisements/components/Public/BannerAdvertisement";
import ArticleSquareCard from "@/features/articles/components/Public/cards/ArticleSquareCard";
import { useArticlesHooks } from "@/features/articles/hooks/useArticles";
import { useState } from "react";
import { useNavigate } from "react-router";
import MultiCategoryInOneRowSkeleton from "./MultiCategoryInOneRowSkeleton";

function MultiCategoryInOneRow({
  categoryOne,
  categoryTwo,
}: {
  categoryOne: any;
  categoryTwo: any;
}) {
  const articleHook = useArticlesHooks();
  const [categoryOnePagination] = useState({
    pageIndex: 0,
    pageSize: 4,
  });

  const [categoryTwoPagination] = useState({
    pageIndex: 0,
    pageSize: 2,
  });
  const { data: categoryOneArticles, isLoading: categoryOneArticlesLoading } =
    articleHook.useFetchPublicArticlesByCategory({
      page: categoryOnePagination.pageIndex + 1,
      per_page: categoryOnePagination.pageSize,
      categoryId: categoryOne?.id,
      slug: categoryOne?.slug,
      section_type: "category",
      section_id: categoryOne?.id,
    });

  const { data: categoryTwoArticles, isLoading: categoryTwoArticlesLoading } =
    articleHook.useFetchPublicArticlesByCategory({
      page: categoryTwoPagination.pageIndex + 1,
      per_page: categoryTwoPagination.pageSize,
      categoryId: categoryTwo?.id,
      slug: categoryTwo?.slug,
      section_type: "category",
      section_id: categoryTwo?.id,
    });

  const itemsOne = categoryOneArticles?.data ?? [];
  const itemsTwo = categoryTwoArticles?.data ?? [];

  const navigate = useNavigate();
  if (categoryOneArticlesLoading || categoryTwoArticlesLoading)
    return <MultiCategoryInOneRowSkeleton />;
  return (
    <div className="flex gap-4 w-full">
      <div className="flex gap-6 w-full">
        <div className="w-2/3">
          <h1
            className={`text-2xl pb-2 cursor-pointer uppercase font-bold hover:text-[var(--color-public-text-accent-hover)] text-[var(--color-public-text-accent)] transition-all duration-200 tracking-tight`}
            onClick={() => navigate(`/news-list/category/${categoryOne?.slug}`)}
          >
            {categoryOne?.name}
          </h1>
          <div className="grid grid-cols-2 gap-4">
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
        </div>

        <div className="w-1/3">
          <h1
            className={`text-2xl pb-2 cursor-pointer uppercase font-bold hover:text-[var(--color-public-text-accent-hover)] text-[var(--color-public-text-accent)] transition-all duration-200 tracking-tight`}
            onClick={() => navigate(`/news-list/category/${categoryTwo?.slug}`)}
          >
            {categoryTwo?.name}
          </h1>
          <div className="flex flex-col gap-4">
            {itemsTwo.map((item: any, idx: number) => {
              if (item?.type === "advertisement") {
                return (
                  <div
                    key={`ad-${item?.data?.id ?? idx}-${idx}`}
                    className="w-full my-2 overflow-hidden rounded-md border border-[var(--color-public-border-light)] shadow-sm bg-[var(--color-public-bg-secondary)]"
                  >
                    <BannerAdvertisement item={item} />
                  </div>
                );
              }

              const article = item?.data || item;
              return (
                <div key={`art-${article?.id ?? idx}-${idx}`} className="h-[320px] w-full bg-transparent">
                  <ArticleSquareCard article={article} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MultiCategoryInOneRow;
