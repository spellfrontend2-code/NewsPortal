import ArticleRectangleCard from "@/features/articles/components/Public/cards/ArticleRectangleCard";
import ArticleSquareCard from "@/features/articles/components/Public/cards/ArticleSquareCard";
import NewsListSkeleton from "@/features/articles/components/Public/NewsList/NewsListSkeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";

function NewsList({
  page_headline,
  articles,
  pagination,
  setPagination,
  lastPage,
  isLoading,
}: any) {
  const currentPage = pagination.pageIndex + 1;

  const goToPage = (page: number) => {
    if (page < 1 || page > lastPage) return;

    setPagination((prev: any) => ({
      ...prev,
      pageIndex: page - 1,
    }));
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (lastPage <= 5) {
      for (let i = 1; i <= lastPage; i++) {
        pages.push(i);
      }

      return pages;
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, "...", lastPage];
    }

    if (currentPage >= lastPage - 2) {
      return [1, "...", lastPage - 3, lastPage - 2, lastPage - 1, lastPage];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      lastPage,
    ];
  };
  useEffect(() => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}, [pagination.pageIndex]);
  return (
    <div className="w-full flex flex-col gap-5">
      <div className="relative h-15 w-full flex items-center py-8  ">
        <h1 className="text-5xl font-bold text-[var(--color-public-newsText)] ">
        {page_headline}
      </h1>
      <div className="absolute -left-4 w-2 h-full rounded-l-md bg-[var(--color-public-newsText)]"></div>
      </div>
      {isLoading ? (
        <NewsListSkeleton />
      ) : (
        articles?.length > 0 && (
          <div>
            <div className="h-[300px] w-full">
              <ArticleRectangleCard article={articles[0]} type="detailed" />
            </div>
            <div className="grid grid-cols-4 w-full h-full gap-3 pt-10">
              {articles.slice(1).map((article: any) => (
                <div className="h-[300px] w-full">
                  <ArticleSquareCard article={article} />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-2 ">
              <button
                disabled={currentPage === 1}
                onClick={() => goToPage(currentPage - 1)}
                className={`rounded border-2 border-[rgb(var(--color-public-newsText-rgb)/0.3)] text-[rgb(var(--color-public-newsText-rgb)/0.3)] enabled:hover:text-[var(--color-public-newsText)] enabled:hover:border-[var(--color-public-newsText)] transition-all duration-300 px-3 py-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer`}
              >
                <ChevronLeft size={18} strokeWidth={3} />
              </button>

              {getPageNumbers().map((page, index) =>
                page === "..." ? (
                  <span key={`ellipsis-${index}`} className="px-2">
                    ...
                  </span>
                ) : (
                  <button
                    key={`page-${page}`}
                    onClick={() => goToPage(page as number)}
                    className={`rounded font-bold px-3 py-2 ${
                      currentPage === page
                        ? "bg-[var(--color-public-primary)] text-white"
                        : "bg-white hover:text-[var(--color-public-newsText)] hover:border-[var(--color-public-newsText)] "
                    } cursor-pointer border-2 border-[rgb(var(--color-public-newsText-rgb)/0.6)] text-[rgb(var(--color-public-newsText-rgb)/0.6)] transition-all duration-300`}
                  >
                    {page}
                  </button>
                ),
              )}

              <button
                disabled={currentPage === lastPage}
                onClick={() => goToPage(currentPage + 1)}
                className={`rounded border-2 border-[rgb(var(--color-public-newsText-rgb)/0.3)] text-[rgb(var(--color-public-newsText-rgb)/0.3)] enabled:hover:text-[var(--color-public-newsText)] enabled:hover:border-[var(--color-public-newsText)] transition-all duration-300 px-3 py-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer`}
              >
                <ChevronRight size={18} strokeWidth={3} />
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default NewsList;
