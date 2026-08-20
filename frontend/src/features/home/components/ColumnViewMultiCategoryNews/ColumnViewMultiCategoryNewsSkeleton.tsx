import { ArticleRectangleCardSkeleton } from "@/features/articles/components/Public/cards/CardSkeleton";

function ColumnViewMultiCategoryNewsSkeleton({
  hasSidebarAds = true,
  color = "transparent",
}: {
  hasSidebarAds?: boolean;
  color?: string;
}) {
  return (
    <div
      className={`relative w-full flex lg:flex-row flex-col gap-6 animate-pulse ${
        color && color !== "transparent" ? "py-6" : ""
      }`}
      style={{
        backgroundColor: color,
        boxShadow:
          color && color !== "transparent"
            ? `0 0 0 100vmax ${color}`
            : undefined,
        clipPath:
          color && color !== "transparent"
            ? "inset(0 -100vmax)"
            : undefined,
      }}
    >
      {/* Category One */}
      <div className="w-full flex-1 min-w-0 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 mb-3">
          <div className="h-7 sm:h-8 w-36 sm:w-48 rounded bg-slate-200" />
          <div className="h-8 w-8 rounded-full bg-slate-200 shrink-0" />
        </div>

        {/* Article list */}
        <div className="w-full flex flex-col gap-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-[120px]">
              <ArticleRectangleCardSkeleton />
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar Ads — lg:w-[300px] */}
      {hasSidebarAds && (
        <div className="w-full lg:w-[300px] shrink-0 lg:sticky lg:top-20 self-start">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {Array.from({ length: 2 }).map((_, index) => (
              <div
                key={index}
                className="w-full max-w-[300px] aspect-[300/250] mx-auto overflow-hidden rounded-md bg-slate-200"
              />
            ))}
          </div>
        </div>
      )}

      {/* Category Two */}
      <div className="w-full flex-1 min-w-0 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 mb-3">
          <div className="h-7 sm:h-8 w-36 sm:w-48 rounded bg-slate-200" />
          <div className="h-8 w-8 rounded-full bg-slate-200 shrink-0" />
        </div>

        <div className="w-full flex flex-col gap-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-[120px]">
              <ArticleRectangleCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ColumnViewMultiCategoryNewsSkeleton;