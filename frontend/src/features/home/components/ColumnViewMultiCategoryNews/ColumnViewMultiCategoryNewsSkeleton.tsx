function ArticleRectangleCardSkeleton() {
  return (
    <div className="h-[105px] rounded-md bg-white border border-slate-100 flex overflow-hidden animate-pulse">
      {/* Image 55% */}
      <div className="w-[55%] bg-gray-200" />
      {/* Content 45% */}
      <div className="w-[45%] p-4 flex flex-col justify-center gap-2">
        <div className="h-4 w-[85%] rounded bg-gray-200" />
        <div className="h-4 w-[65%] rounded bg-gray-200" />
        <div className="h-3 w-16 rounded bg-gray-200 mt-1" />
      </div>
    </div>
  );
}

function ColumnViewMultiCategoryNewsSkeleton({
  hasSidebarAds = true,
}: {
  hasSidebarAds?: boolean;
}) {
  return (
    <div className="w-full h-full flex lg:flex-row flex-col animate-pulse">
      {/* Category One — lg:w-2/3 */}
      <div className="w-full lg:w-2/3 h-full flex flex-col gap-2 py-5">
        {/* Category title */}
        <div className="h-8 w-52 rounded bg-gray-200 mb-2" />

        <div className="flex lg:flex-row flex-col gap-5 w-full">
          {/* Article list */}
          <div className={`${hasSidebarAds ? "lg:w-2/3 w-full" : "w-full"} grid grid-cols-1 gap-1`}>
            {Array.from({ length: 6 }).map((_, index) => (
              <ArticleRectangleCardSkeleton key={index} />
            ))}
          </div>

          {/* Sidebar Ads */}
          {hasSidebarAds && (
            <div className="lg:w-1/4 w-full">
              <div className="h-full w-full flex flex-col md:flex-row lg:flex-col gap-4">
                {Array.from({ length: 2 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-[160px] w-full rounded-md border border-slate-100 bg-gray-200"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Category Two — lg:w-1/3 */}
      <div className="flex flex-col lg:w-1/3 w-full h-full mt-4">
        {/* Category title */}
        <div className="h-8 w-52 rounded bg-gray-200 mb-2" />

        <div className="w-full grid grid-cols-1 gap-1">
          {Array.from({ length: 6 }).map((_, index) => (
            <ArticleRectangleCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ColumnViewMultiCategoryNewsSkeleton;