function CategoryWithChildrenSkeleton({
  hasSidebarAds = true,
}: {
  hasSidebarAds?: boolean;
}) {
  return (
    <div className="flex gap-4 w-full animate-pulse">
      {/* Main Content */}
      <div className={`flex flex-col gap-4 ${hasSidebarAds ? "w-3/4" : "w-full"}`}>
        {/* Header: category title + child tabs */}
        <div className="flex items-center gap-4 h-[10%]">
          <div className="flex items-center px-2 border-r border-[var(--color-public-border-strong)]">
            <div className="h-8 w-40 rounded bg-gray-200" />
          </div>
          <div className="flex flex-wrap gap-4 w-4/5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-5 w-20 rounded bg-gray-200" />
            ))}
          </div>
        </div>

        {/* Featured Article — ArticleRectangleCard detailed at h-[300px] */}
        <div className="h-[300px] w-full rounded-md overflow-hidden flex border border-slate-100 bg-white">
          {/* Image 55% */}
          <div className="w-[55%] bg-gray-200" />
          {/* Content 45% */}
          <div className="w-[45%] p-6 md:p-8 bg-slate-50/50 flex flex-col justify-center gap-4">
            <div className="h-9 w-[85%] rounded bg-gray-200" />
            <div className="h-9 w-[65%] rounded bg-gray-200" />
            <div className="h-4 w-full rounded bg-gray-200" />
            <div className="h-4 w-5/6 rounded bg-gray-200" />
            <div className="h-4 w-20 rounded bg-gray-200 mt-1" />
          </div>
        </div>

        {/* Square Card Grid — 3 cols matching grid-cols-3, h-[320px] */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 w-full gap-6 pt-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-[320px] w-full rounded-md overflow-hidden flex flex-col border border-slate-100 bg-white"
            >
              {/* Image 70% */}
              <div className="h-[70%] w-full bg-gray-200" />
              {/* Content */}
              <div className="p-4 flex flex-col justify-between flex-1 gap-2">
                <div className="flex flex-col gap-2">
                  <div className="h-4 w-[90%] rounded bg-gray-200" />
                  <div className="h-4 w-[70%] rounded bg-gray-200" />
                </div>
                <div className="h-3 w-20 rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar Ads */}
      {hasSidebarAds && (
        <div className="lg:w-1/4 w-full">
          <div className="h-full w-full flex flex-row lg:flex-col gap-4">
            {Array.from({ length: 1 }).map((_, i) => (
              <div key={i} className="h-[160px] w-full rounded-2xl bg-gray-200" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryWithChildrenSkeleton;