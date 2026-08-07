function ColumnViewMultiCategoryNewsSkeleton({
  hasSidebarAds = true,
}: {
  hasSidebarAds?: boolean;
}) {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Category One */}
      <section className="space-y-4">
        <div className="h-8 w-52 rounded bg-slate-200" />

        <div className="flex gap-4">
          {/* Articles */}
          <div
            className={`grid grid-cols-1 gap-3 ${
              hasSidebarAds ? "w-2/3" : "w-full"
            }`}
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="flex gap-3 rounded-xl border border-slate-200 p-3"
              >
                <div className="h-24 w-32 rounded-lg bg-slate-200 flex-shrink-0" />

                <div className="flex flex-1 flex-col justify-between">
                  <div className="space-y-2">
                    <div className="h-4 w-3/4 rounded bg-slate-200" />
                    <div className="h-4 w-full rounded bg-slate-200" />
                    <div className="h-4 w-2/3 rounded bg-slate-200" />
                  </div>

                  <div className="h-3 w-24 rounded bg-slate-200" />
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar Ads */}
          {hasSidebarAds && (
            <div className="w-1/3 space-y-4">
              {Array.from({ length: 2 }).map((_, index) => (
                <div
                  key={index}
                  className="h-[160px] w-full rounded-2xl bg-slate-200"
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Category Two */}
      <section className="space-y-4">
        <div className="h-8 w-52 rounded bg-slate-200" />

        <div className="grid grid-cols-1 gap-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="flex gap-3 rounded-xl border border-slate-200 p-3"
            >
              <div className="h-24 w-32 rounded-lg bg-slate-200 flex-shrink-0" />

              <div className="flex flex-1 flex-col justify-between">
                <div className="space-y-2">
                  <div className="h-4 w-3/4 rounded bg-slate-200" />
                  <div className="h-4 w-full rounded bg-slate-200" />
                  <div className="h-4 w-2/3 rounded bg-slate-200" />
                </div>

                <div className="h-3 w-24 rounded bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ColumnViewMultiCategoryNewsSkeleton;