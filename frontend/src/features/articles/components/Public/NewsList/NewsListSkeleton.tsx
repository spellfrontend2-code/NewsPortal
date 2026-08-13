function NewsListSkeleton({ show = "all" }: { show?: "all" | "list" }) {
  return (
    <div className={`w-full flex flex-col gap-5 ${show === "all" ? "py-10" : ""}`}>
      {/* Heading */}
      <div className={`relative h-15 w-full flex items-center ${show === "all" ? "py-8" : ""}`}>
        {show === "all" && (
          <div className="absolute inset-0 w-2 h-full rounded-l-md bg-gray-200 animate-pulse" />
        )}
        <div
          className={`animate-pulse bg-gray-200 rounded ${
            show === "all" ? "h-12 w-[300px] ml-3" : "h-8 w-[200px]"
          }`}
        />
      </div>

      {/* Content */}
      <div>
        {/* Featured Article — ArticleRectangleCard with type="detailed" at h-[300px] */}
        {show === "all" && (
          <div className="h-[300px] w-full rounded-md overflow-hidden animate-pulse flex border border-slate-100 bg-white">
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
        )}

        {/* Article Cards — 3-col grid matching NewsList's grid-cols-3 */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 w-full gap-6 ${
            show === "all" ? "pt-10" : ""
          }`}
        >
          {Array.from({ length: show === "all" ? 9 : 6 }).map((_, index) => (
            <div
              key={index}
              className="h-[320px] w-full rounded-md overflow-hidden animate-pulse flex flex-col border border-slate-100 bg-white"
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

        {/* Pagination */}
        {show === "all" && (
          <div className="flex items-center justify-center gap-2 pt-10">
            <div className="h-9 w-9 rounded-full bg-gray-200 animate-pulse" />
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="h-9 w-9 rounded-full bg-gray-200 animate-pulse" />
            ))}
            <div className="h-9 w-9 rounded-full bg-gray-200 animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
}

export default NewsListSkeleton;