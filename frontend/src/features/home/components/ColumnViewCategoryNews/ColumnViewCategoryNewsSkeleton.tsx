function ColumnViewCategoryNewsSkeleton({
  hasSidebarAds = true,
}: {
  hasSidebarAds?: boolean;
}) {
  return (
    <div className="animate-pulse">
      {/* Category Title */}
      <div className="h-8 w-56 rounded bg-slate-300 mb-4" />

      <div className="flex gap-4">
        {/* Articles */}
        <div
          className={`grid grid-cols-2 gap-2 ${
            hasSidebarAds ? "w-2/3" : "w-full"
          }`}
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-[105px] rounded-xl bg-white shadow-sm p-2 flex gap-3"
            >
              {/* Thumbnail */}
              <div className="w-[120px] h-full rounded-lg bg-slate-300 shrink-0" />

              {/* Content */}
              <div className="flex-1 flex flex-col justify-between py-1">
                <div className="space-y-2">
                  <div className="h-4 w-full rounded bg-slate-300" />
                  <div className="h-4 w-5/6 rounded bg-slate-300" />
                  <div className="h-4 w-2/3 rounded bg-slate-300" />
                </div>

                <div className="h-3 w-20 rounded bg-slate-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Ads */}
        {hasSidebarAds && (
          <div className="w-1/3 flex flex-col gap-4">
            {Array.from({ length: 2 }).map((_, index) => (
              <div
                key={index}
                className="h-[160px] w-full rounded-2xl bg-slate-300"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ColumnViewCategoryNewsSkeleton;