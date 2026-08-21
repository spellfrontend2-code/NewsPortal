import { ArticleSquareCardSkeleton } from "@/features/articles/components/Public/cards/CardSkeleton";

function NewsDetailSkeleton() {
  return (
    <div className="flex flex-col gap-6 w-full animate-pulse">
      {/* ── Article Header (full width) ── */}
      <div className="flex flex-col gap-6 w-full pb-2">
        {/* Title */}
        <div className="flex flex-col gap-3">
          <div className="h-8 sm:h-12 md:h-14 lg:h-16 w-full rounded-md bg-slate-200" />
          <div className="h-8 sm:h-12 md:h-14 lg:h-16 w-[80%] rounded-md bg-slate-200" />
        </div>

        {/* Excerpt */}
        <div className="h-6 sm:h-8 w-[75%] rounded bg-slate-200/70 border-l-4 border-slate-400 pl-4 my-2" />

        {/* Author & Date Meta */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-5 border-y border-slate-200/60">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="h-11 w-11 rounded-full bg-slate-200 shrink-0" />
            <div className="h-4 w-32 rounded bg-slate-200" />
          </div>
          <div className="h-4 w-28 rounded bg-slate-200" />
        </div>
      </div>

      <div className="w-full h-px bg-slate-200/60 my-1" />

      {/* ── Layout: Interaction bar + Main + Sidebar ── */}
      <div className="flex flex-col xl:flex-row gap-5 w-full relative">
        {/* Interaction Bar (Mobile: horizontal row, Desktop: vertical sticky left) */}
        <div className="xl:w-[65px] shrink-0 order-1">
          <div className="flex xl:flex-col flex-row items-center justify-center xl:justify-start gap-3 xl:gap-6 py-2.5 xl:py-6 px-4 xl:px-2 bg-white/95 xl:bg-slate-50 border border-slate-200 xl:border-slate-100 rounded-md shadow-sm w-full sm:w-fit mx-auto xl:w-full">
            {/* Bookmark */}
            <div className="h-8 w-8 rounded-md bg-slate-200" />
            <div className="hidden xl:block w-6 h-px bg-slate-200" />
            <div className="xl:hidden h-5 w-px bg-slate-200 mx-1" />

            {/* Comment */}
            <div className="flex xl:flex-col items-center gap-1">
              <div className="h-5 w-5 rounded bg-slate-200" />
              <div className="h-3 w-6 rounded bg-slate-200" />
            </div>

            {/* Shares */}
            <div className="flex xl:flex-col items-center gap-1">
              <div className="h-3 w-8 rounded bg-slate-200" />
              <div className="h-2 w-10 rounded bg-slate-200" />
            </div>

            <div className="hidden xl:block w-6 h-px bg-slate-200" />
            <div className="xl:hidden h-5 w-px bg-slate-200 mx-1" />

            {/* Social icons */}
            <div className="flex flex-row xl:flex-col gap-2 xl:gap-4 items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-7 w-7 rounded-md bg-slate-200" />
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0 order-2 flex flex-col xl:flex-row gap-6 items-start">
          <div className="flex flex-col gap-6 flex-1 min-w-0">
            {/* Media Block */}
            <div className="w-full rounded-md overflow-hidden shadow-sm">
              <div className="w-full aspect-video max-h-[500px] bg-slate-200 rounded-md" />
            </div>

            {/* Article body lines */}
            <div className="flex flex-col gap-3.5 my-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="h-4.5 sm:h-5 rounded bg-slate-200"
                  style={{
                    width:
                      i % 4 === 3
                        ? "60%"
                        : i % 4 === 2
                        ? "85%"
                        : i % 4 === 1
                        ? "95%"
                        : "100%",
                  }}
                />
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-200/60">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-8 w-20 rounded-full bg-slate-200"
                />
              ))}
            </div>

            {/* Feedback section */}
            <div className="my-8 p-6 md:p-8 rounded-md border border-slate-200/60 bg-slate-50 flex flex-col md:flex-row gap-6 items-center justify-between shadow-sm">
              <div className="h-6 w-52 rounded bg-slate-200" />
              <div className="flex flex-wrap gap-3">
                <div className="h-10 w-24 rounded-md bg-slate-200" />
                <div className="h-10 w-24 rounded-md bg-slate-200" />
                <div className="h-10 w-24 rounded-md bg-slate-200" />
              </div>
            </div>
          </div>

          {/* Right Column Sidebar Ads */}
          <div className="w-full xl:w-[300px] shrink-0 xl:sticky xl:top-20 self-start">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-5">
              {Array.from({ length: 2 }).map((_, i) => (
                <div
                  key={i}
                  className="w-full max-w-[300px] aspect-[300/250] mx-auto rounded-md bg-slate-200"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related News Section Skeleton */}
      <div className="mt-8 pt-8 border-t border-slate-200/60">
        <div className="h-8 sm:h-10 w-44 rounded bg-slate-200 mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-[320px] w-full bg-transparent">
              <ArticleSquareCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewsDetailSkeleton;