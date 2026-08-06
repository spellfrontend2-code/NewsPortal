function CategoryWithChildrenSkeleton({
  hasSidebarAds = true,
}: {
  hasSidebarAds?: boolean;
}) {
  return (
    <div className="flex gap-4 w-full animate-pulse">
      {/* Main Content */}
      <div className={`flex flex-col gap-6 ${hasSidebarAds ? "w-3/4" : "w-full"}`}>
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="h-8 w-40 rounded bg-slate-200" />

          <div className="flex flex-wrap gap-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-5 w-20 rounded bg-slate-200"
              />
            ))}
          </div>
        </div>

        {/* Featured Article */}
        <div className="h-[300px] w-full rounded-xl bg-slate-200" />

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(11)].map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="h-[180px] rounded-xl bg-slate-200" />
              <div className="h-5 w-3/4 rounded bg-slate-200" />
              <div className="h-4 w-full rounded bg-slate-200" />
              <div className="h-4 w-5/6 rounded bg-slate-200" />
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar */}
      {hasSidebarAds && (
        <div className="w-1/4">
          <div className="h-[160px] w-full rounded-2xl bg-slate-200" />
        </div>
      )}
    </div>
  );
}

export default CategoryWithChildrenSkeleton;