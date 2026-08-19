import {
  ArticleRectangleDetailedCardSkeleton,
  ArticleSquareCardSkeleton,
} from "@/features/articles/components/Public/cards/CardSkeleton";

function NewsListSkeleton({
  show = "all",
  color = "transparent",
}: {
  show?: "all" | "list";
  color?: string;
}) {
  return (
    <div
      className={`relative w-full flex flex-col gap-5 ${show === "all" ? "py-6 sm:py-10" : ""} ${color && color !== "transparent" ? "py-6" : ""}`}
      style={{
        backgroundColor: color,
        boxShadow: color && color !== "transparent" ? `0 0 0 100vmax ${color}` : undefined,
        clipPath: color && color !== "transparent" ? "inset(0 -100vmax)" : undefined,
      }}
    >
      {/* Heading */}
      <div
        className={`relative w-full flex items-center justify-between ${
          show === "all" ? "py-4 sm:py-8" : ""
        }`}
      >
        <div className="flex items-center">
          {show === "all" && (
            <div className="absolute inset-y-0 left-0 w-2 rounded-l-md bg-[var(--color-public-bg-accent)] animate-pulse" />
          )}
          <div
            className={`animate-pulse bg-slate-200 rounded ${
              show === "all"
                ? "h-9 sm:h-12 w-48 sm:w-72 ml-3"
                : "h-7 sm:h-8 w-36 sm:w-48"
            }`}
          />
        </div>
        {show === "list" && (
          <div className="h-8 w-8 rounded-full bg-slate-200 animate-pulse shrink-0" />
        )}
      </div>

      {/* Content */}
      <div>
        {/* Top Featured Article on Full List View */}
        {show === "all" && (
          <div className="h-auto md:h-[300px] w-full mb-8">
            <ArticleRectangleDetailedCardSkeleton />
          </div>
        )}

        {/* Article Cards Grid matching NewsList */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-6 ${
            show === "all" ? "pt-2" : ""
          }`}
        >
          {Array.from({ length: show === "all" ? 9 : 3 }).map((_, index) => (
            <div key={index} className="h-[320px] w-full bg-transparent">
              <ArticleSquareCardSkeleton />
            </div>
          ))}
        </div>

        {/* Pagination Toolbar */}
        {show === "all" && (
          <div className="flex items-center justify-center gap-2 pt-10">
            <div className="h-9 w-9 rounded-full bg-slate-200 animate-pulse" />
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="h-9 w-9 rounded-full bg-slate-200 animate-pulse"
              />
            ))}
            <div className="h-9 w-9 rounded-full bg-slate-200 animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
}

export default NewsListSkeleton;