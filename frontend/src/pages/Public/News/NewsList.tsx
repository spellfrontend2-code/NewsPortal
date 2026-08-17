import BannerAdvertisement from "@/features/advertisements/components/Public/BannerAdvertisement";
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
  slug,
  show = "all",
}: any) {
  const currentPage = pagination?.pageIndex ? pagination.pageIndex + 1 : 1;
  const items = articles || [];

  // Determine top featured item and remaining list
  const firstArticleIndex = items.findIndex(
    (item: any) => !item.type || item.type === "article"
  );
  const firstArticle =
    firstArticleIndex !== -1
      ? items[firstArticleIndex]?.data || items[firstArticleIndex]
      : null;

  const slicedItems =
    show === "all" && firstArticleIndex !== -1
      ? items.filter((_: any, idx: number) => idx !== firstArticleIndex)
      : items;

  const goToPage = (page: number) => {
    if (!setPagination || page < 1 || page > lastPage) return;

    setPagination((prev: any) => ({
      ...prev,
      pageIndex: page - 1,
    }));
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (!lastPage || lastPage <= 1) return [];

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
  }, [pagination?.pageIndex, show]);

  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col gap-5">
      {items.length > 0 && page_headline && (
        <div
          className={`relative h-15 w-full flex items-center justify-between ${
            show === "all" ? "py-8" : ""
          }`}
        >
          <div className="flex items-center">
            {show === "all" && (
              <div className="absolute inset-y-0 left-0 w-2 rounded-l-md bg-[var(--color-public-bg-accent)]" />
            )}
            <h1
              className={`${
                show === "all"
                  ? "ml-3 text-4xl sm:text-5xl text-[var(--color-public-text-secondary)]"
                  : "text-2xl hover:text-[var(--color-public-text-accent-hover)] text-[var(--color-public-text-accent)] transition-all duration-200 tracking-tight"
              } cursor-pointer uppercase font-bold`}
              onClick={() => navigate(`/news-list/category/${slug}`)}
            >
              {page_headline}
            </h1>
          </div>
          {show === "list" && (
            <button
              onClick={() => navigate(`/news-list/category/${slug}`)}
              className="cursor-pointer flex items-center justify-center w-8 h-8 rounded-full bg-white text-[var(--color-public-text-accent)] shadow-sm hover:bg-slate-50 transition-colors"
            >
              <ChevronRight size={20} strokeWidth={2.5} />
            </button>
          )}
        </div>
      )}

      {items.length > 0 && (
        <div>
          {/* Top Featured Article on Full List View */}
          {show === "all" && firstArticle && (
            <div className="h-[300px] w-full mb-8">
              <ArticleRectangleCard article={firstArticle} type="detailed" />
            </div>
          )}

          {/* Grid loop rendering both articles and mixed ads in order */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-6 ${
              show === "all" ? "pt-2" : ""
            }`}
          >
            {slicedItems.map((item: any, idx: number) => {
              // Render before_article / after_article banner ads — category page only
              if (
                show === "all" &&
                item?.type === "advertisement" &&
                (item?.placement?.where === "before_article" ||
                  item?.placement?.where === "after_article" ||
                  item?.data?.placement?.where === "before_article" ||
                  item?.data?.placement?.where === "after_article")
              ) {
                const adId = item?.data?.id ?? idx;
                return (
                  <div
                    key={`cat-ad-${adId}-${idx}`}
                    className="col-span-full w-full overflow-hidden rounded-md border border-[var(--color-public-border-darker)]"
                  >
                    <BannerAdvertisement item={item} />
                  </div>
                );
              }

              if (item?.type === "article") {
              
              const articleData = item?.data || item;
              return (
                <div
                  key={`art-${articleData?.id ?? idx}-${idx}`}
                  className="h-[320px] w-full bg-transparent"
                >
                  <ArticleSquareCard article={articleData} />
                </div>
              );}
            })}
          </div>

          {/* Pagination Toolbar */}
          {show === "all" && lastPage > 1 && (
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
                )
              )}

              <button
                disabled={currentPage === lastPage}
                onClick={() => goToPage(currentPage + 1)}
                className="rounded-full border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-350 text-slate-600 transition-all duration-200 p-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer shadow-sm"
              >
                <ChevronRight size={16} strokeWidth={2.5} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default NewsList;
