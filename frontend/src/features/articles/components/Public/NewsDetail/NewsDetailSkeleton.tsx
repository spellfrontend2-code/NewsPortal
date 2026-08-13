function NewsDetailSkeleton() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-screen-xl animate-pulse">
      {/* ── Article Header (full width) ── */}
      <div className="flex flex-col gap-6 w-full pb-2">
        {/* Title */}
        <div className="flex flex-col gap-3">
          <div className="h-14 w-full rounded-md bg-gray-200" />
          <div className="h-14 w-[80%] rounded-md bg-gray-200" />
        </div>

        {/* Excerpt */}
        <div className="h-6 w-[70%] rounded bg-gray-200 ml-6 border-l-4 border-gray-300" />

        {/* Author & Date Meta */}
        <div className="flex items-center justify-between gap-4 py-5 border-y border-slate-200/60">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="h-11 w-11 rounded-full bg-gray-200 shrink-0" />
            <div className="h-4 w-32 rounded bg-gray-200" />
          </div>
          <div className="h-4 w-24 rounded bg-gray-200" />
        </div>
      </div>

      <div className="w-full h-px bg-slate-200/60" />

      {/* ── Layout: Interaction bar + Main + Sidebar ── */}
      <div className="flex flex-col xl:flex-row gap-5 w-full">
        {/* Interaction Bar */}
        <div className="xl:w-[65px] shrink-0">
          <div className="flex xl:flex-col flex-row items-center gap-3 xl:gap-6 py-2 xl:py-6 px-4 xl:px-2 bg-slate-50 border border-slate-100 rounded-md w-fit mx-auto xl:w-full">
            {/* Bookmark */}
            <div className="h-8 w-8 rounded-md bg-gray-200" />
            <div className="hidden xl:block w-6 h-px bg-gray-200" />
            {/* Comment */}
            <div className="flex xl:flex-col items-center gap-1">
              <div className="h-5 w-5 rounded bg-gray-200" />
              <div className="h-3 w-6 rounded bg-gray-200" />
            </div>
            {/* Shares */}
            <div className="flex xl:flex-col items-center gap-1">
              <div className="h-3 w-8 rounded bg-gray-200" />
              <div className="h-2 w-10 rounded bg-gray-200" />
            </div>
            <div className="hidden xl:block w-6 h-px bg-gray-200" />
            {/* Social icons */}
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-7 w-7 rounded-md bg-gray-200" />
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0 flex flex-col lg:flex-row gap-5">
          <div className={`flex flex-col gap-6 lg:w-4/5 w-full`}>
            {/* Media */}
            <div className="w-full rounded-md overflow-hidden">
              <div className="w-full aspect-video md:h-[480px] bg-gray-200 rounded-md" />
            </div>

            {/* Article body lines */}
            <div className="flex flex-col gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-5 rounded bg-gray-200`}
                  style={{ width: i % 3 === 2 ? "75%" : i % 3 === 1 ? "90%" : "100%" }}
                />
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-200/60">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="h-8 w-20 rounded-full bg-gray-200" />
              ))}
            </div>

            {/* Feedback section */}
            <div className="my-4 p-6 rounded-md border border-slate-200/60 bg-slate-50 flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="h-5 w-48 rounded bg-gray-200" />
              <div className="flex gap-3">
                <div className="h-9 w-20 rounded-md bg-gray-200" />
                <div className="h-9 w-20 rounded-md bg-gray-200" />
                <div className="h-9 w-20 rounded-md bg-gray-200" />
              </div>
            </div>
          </div>

          {/* Sidebar Ads */}
          <div className="lg:w-1/5 w-full flex flex-col gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="w-full aspect-square rounded-md bg-gray-200" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsDetailSkeleton;