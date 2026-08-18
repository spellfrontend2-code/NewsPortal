import { ArticleRectangleCardSkeleton } from "@/features/articles/components/Public/cards/CardSkeleton";

function ColumnViewMultiCategoryNewsSkeleton({
  hasSidebarAds = true,
}: {
  hasSidebarAds?: boolean;
}) {
  return (
    <div className="w-full flex lg:flex-row flex-col gap-6 animate-pulse">
      {/* Category One — lg:w-2/3 */}
      <div className="w-full lg:w-2/3 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 mb-3">
          <div className="h-7 sm:h-8 w-36 sm:w-48 rounded bg-slate-200" />
          <div className="h-8 w-8 rounded-full bg-slate-200 shrink-0" />
        </div>

        <div className="flex lg:flex-row flex-col gap-6 w-full">
          {/* Article list */}
          <div
            className={`${
              hasSidebarAds ? "lg:w-2/3" : "w-full"
            } w-full flex flex-col gap-2`}
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="h-[120px]">
                <ArticleRectangleCardSkeleton />
              </div>
            ))}
          </div>

          {/* Sidebar Ads */}
          {hasSidebarAds && (
            <div className="lg:w-1/3 w-full lg:sticky lg:top-20 self-start">
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {Array.from({ length: 2 }).map((_, index) => (
                  <div
                    key={index}
                    className="w-full max-w-[320px] mx-auto aspect-[300/250] overflow-hidden rounded-md border border-[var(--color-public-border-light)] bg-slate-200"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Category Two — lg:w-1/3 */}
      <div className="w-full lg:w-1/3 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 mb-3">
          <div className="h-7 sm:h-8 w-36 sm:w-48 rounded bg-slate-200" />
          <div className="h-8 w-8 rounded-full bg-slate-200 shrink-0" />
        </div>

        <div className="w-full flex flex-col gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
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