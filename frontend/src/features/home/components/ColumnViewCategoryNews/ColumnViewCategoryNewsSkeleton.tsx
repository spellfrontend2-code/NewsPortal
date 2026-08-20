import { ArticleRectangleCardSkeleton } from "@/features/articles/components/Public/cards/CardSkeleton";

function ColumnViewCategoryNewsSkeleton({
  hasSidebarAds = true,
  color = "transparent",
}: {
  hasSidebarAds?: boolean;
  color?: string;
}) {
  return (
    <div
      className="relative w-full flex flex-col lg:flex-row gap-6 py-5 animate-pulse"
      style={{
        backgroundColor: color,
        boxShadow: color && color !== "transparent" ? `0 0 0 100vmax ${color}` : undefined,
        clipPath: color && color !== "transparent" ? "inset(0 -100vmax)" : undefined,
      }}
    >
      <div className="flex-1 min-w-0 flex flex-col gap-3 py-5">
        {/* Category Heading */}
        <div className="flex items-center justify-between pb-2 mb-1">
          <div className="h-7 sm:h-8 w-36 sm:w-48 rounded bg-slate-200" />
          <div className="h-8 w-8 rounded-full bg-slate-200 shrink-0" />
        </div>

        {/* Content */}
        <div className="flex lg:flex-row flex-col gap-6 w-full">
          {/* Articles — 2-column grid */}
          <div className="h-full w-full grid grid-cols-1 md:grid-cols-2 gap-3">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="h-[120px]">
                <ArticleRectangleCardSkeleton />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar Ads */}
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
    </div>
  );
}

export default ColumnViewCategoryNewsSkeleton;