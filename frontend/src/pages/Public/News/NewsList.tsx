import ArticleRectangleCard from "@/features/articles/components/Public/cards/ArticleRectangleCard";
import ArticleSquareCard from "@/features/articles/components/Public/cards/ArticleSquareCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NewsList({
  page_headline,
  articles,
  pagination,
  setPagination,
  lastPage,
  show = "all",
}: any) {
  
  const currentPage = pagination.pageIndex + 1;
  const slicedArticles = show === "all" ? articles.slice(1) : articles;
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
    if (show !== "list") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [pagination.pageIndex, show]);
  const navigate = useNavigate();
  return (
    <div className={`w-full flex flex-col gap-5 `}>
      {articles?.length > 0 && (
        <div
          className={`relative h-15 w-full flex items-center ${show === "all" ? "py-8" : ""}  `}
        >
             {articles?.length > 0 && show === "all" && (
            <div className="absolute inset-0 w-2 h-full rounded-l-md bg-[var(--color-public-bg-accent)]" />
          )}
          <h1
            className={`${show === "all" ? "ml-3 text-5xl text-[var(--color-public-text-secondary)]" : "text-2xl hover:text-[var(--color-public-text-accent-hover)] text-[var(--color-public-text-accent)] transition-all duration-200 tracking-tight"} cursor-pointer uppercase font-bold  `}
            onClick={() => navigate(`/news-list/category/${page_headline}`)}
          >
            {page_headline}
          </h1>
       
        </div>
      )}
      {articles?.length > 0 && (
        <div>
          {show === "all" && (
            <div className="h-[300px] w-full">
              <ArticleRectangleCard article={articles[0]} type="detailed" />
            </div>
          )}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 w-full gap-6 ${show === "all" ? "pt-10" : ""}`}
          >
            {slicedArticles.map((article: any) => (
              <div key={article.id} className="h-[320px] w-full bg-transparent">
                <ArticleSquareCard article={article} />
              </div>
            ))}
          </div>
          {show === "all" ? (
            <div className="flex items-center justify-center gap-2 pt-10">
              <button
                disabled={currentPage === 1}
                onClick={() => goToPage(currentPage - 1)}
                className="rounded-full border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-350 text-slate-600 transition-all duration-200 p-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer shadow-sm"
              >
                <ChevronLeft size={16} strokeWidth={2.5} />
              </button>

              {getPageNumbers().map((page, index) =>
                page === "..." ? (
                  <span
                    key={`ellipsis-${index}`}
                    className="px-2 text-slate-400 text-sm font-semibold"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={`page-${page}`}
                    onClick={() => goToPage(page as number)}
                    className={`rounded-full font-bold h-9 w-9 text-sm transition-all duration-200 border cursor-pointer ${
                      currentPage === page
                        ? "bg-[var(--color-public-bg-accent)] border-[var(--color-public-bg-accent)] text-white shadow-sm"
                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-[var(--color-public-bg-accent)]"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}

              <button
                disabled={currentPage === lastPage}
                onClick={() => goToPage(currentPage + 1)}
                className="rounded-full border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-350 text-slate-600 transition-all duration-200 p-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer shadow-sm"
              >
                <ChevronRight size={16} strokeWidth={2.5} />
              </button>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default NewsList;
