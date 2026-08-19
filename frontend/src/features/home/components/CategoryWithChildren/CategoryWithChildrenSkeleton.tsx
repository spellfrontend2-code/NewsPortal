import {
  ArticleRectangleDetailedCardSkeleton,
  ArticleSquareCardSkeleton,
} from "@/features/articles/components/Public/cards/CardSkeleton";

function CategoryWithChildrenSkeleton({
  hasSidebarAds = true,
  color = "transparent",
}: {
  hasSidebarAds?: boolean;
  color?: string;
}) {
  return (
    <div
      className={`relative w-full animate-pulse ${color && color !== "transparent" ? "py-6" : ""}`}
      style={{
        backgroundColor: color,
        boxShadow: color && color !== "transparent" ? `0 0 0 100vmax ${color}` : undefined,
        clipPath: color && color !== "transparent" ? "inset(0 -100vmax)" : undefined,
      }}
    >
      <div className="flex flex-col lg:flex-row gap-6 w-full">
        {/* Main Content */}
        <div
          className={`flex flex-col gap-4 ${hasSidebarAds ? "lg:w-3/4 w-full" : "w-full"}`}
        >
          {/* Header: category title + child tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4 w-full pb-2">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="h-8 w-36 sm:w-44 rounded bg-slate-200" />
              <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-slate-200">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-6 w-16 sm:w-20 rounded-md bg-slate-200" />
                ))}
              </div>
            </div>
            <div className="h-8 w-8 rounded-full bg-slate-200 shrink-0" />
          </div>

          {/* Featured Article — ArticleRectangleCard detailed */}
          <div className="h-auto md:h-[300px] w-full">
            <ArticleRectangleDetailedCardSkeleton />
          </div>

          {/* Square Card Grid — matching grid-cols-1 sm:grid-cols-2 md:grid-cols-3 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 w-full gap-6 pt-6 sm:pt-10">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-[320px] w-full bg-transparent">
                <ArticleSquareCardSkeleton />
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Ads */}
        {hasSidebarAds && (
          <div className="lg:w-1/4 w-full lg:sticky lg:top-20 self-start">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {Array.from({ length: 2 }).map((_, i) => (
                <div
                  key={i}
                  className="w-full max-w-[320px] mx-auto aspect-[300/250] overflow-hidden rounded-xl border border-[var(--color-public-border-light)] bg-slate-200"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryWithChildrenSkeleton;