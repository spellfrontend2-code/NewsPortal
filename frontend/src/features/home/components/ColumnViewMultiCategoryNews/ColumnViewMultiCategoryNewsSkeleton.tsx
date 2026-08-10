function ColumnViewMultiCategoryNewsSkeleton({
  hasSidebarAds = true,
}: {
  hasSidebarAds?: boolean;
}) {
  const ArticleSkeleton = ({ count = 6 }: { count?: number }) => (
    <div className="grid grid-cols-1 gap-1">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex gap-3 rounded-xl border border-slate-200 p-3"
        >
          {/* Image */}
          <div className="h-24 w-32 shrink-0 animate-pulse rounded-lg bg-slate-200" />

          {/* Content */}
          <div className="flex flex-1 flex-col justify-between">
            <div className="space-y-2">
              <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200" />
              <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
            </div>

            <div className="mt-2 h-3 w-24 animate-pulse rounded bg-slate-200" />
          </div>
        </div>
      ))}
    </div>
  );

  const CategoryHeadingSkeleton = () => (
    <div className="mb-3 h-8 w-52 animate-pulse rounded bg-slate-200" />
  );

  return (
    <div className="flex gap-4 w-full space-y-8">
      {/* Category One */}
      <section className="w-1/2">
        <CategoryHeadingSkeleton />

        <div className="flex w-full gap-4">
          {/* Articles */}
          <div
            className={`grid grid-cols-1 gap-1 ${
              hasSidebarAds ? "w-2/3" : "w-full"
            }`}
          >
            <ArticleSkeleton count={3} />
          </div>

          {/* Sidebar Ads */}
          {hasSidebarAds && (
            <div className="w-1/3 space-y-4">
              {Array.from({ length: 2 }).map((_, index) => (
                <div
                  key={index}
                  className="h-[160px] w-full animate-pulse rounded-2xl bg-slate-200"
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Category Two */}
      <section className="w-1/2">
        <CategoryHeadingSkeleton />

        <ArticleSkeleton count={3} />
      </section>
    </div>
  );
}

export default ColumnViewMultiCategoryNewsSkeleton;