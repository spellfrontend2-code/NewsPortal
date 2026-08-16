function ArticleRectangleCardSkeleton() {
  return (
    <div className="flex h-full w-full items-center gap-3 border-b border-slate-100 animate-pulse bg-white py-1">
      {/* Thumbnail 4:3 */}
      <div className="h-full aspect-[4/3] max-w-[40%] rounded-md bg-slate-200 shrink-0" />

      {/* Content Area */}
      <div className="flex-1 min-w-0 h-full flex flex-col justify-between py-1 gap-2">
        <div className="h-4 w-[92%] rounded bg-slate-200" />
        <div className="h-4 w-[65%] rounded bg-slate-200" />
        <div className="h-3 w-16 rounded bg-slate-200 mt-1" />
      </div>
    </div>
  );
}

function ArticleSquareCardSkeleton() {
  return (
    <div className="flex flex-col h-full w-full overflow-hidden animate-pulse bg-transparent">
      {/* Image Container */}
      <div className="h-[72%] sm:h-[75%] w-full rounded-t-md bg-slate-200 shrink-0" />

      {/* Content */}
      <div className="h-[28%] sm:h-[25%] pt-2.5 pb-1 flex flex-col justify-end flex-1 gap-1.5 min-w-0">
        <div className="flex flex-col gap-1.5">
          <div className="h-4 w-[90%] rounded bg-slate-200" />
          <div className="h-4 w-[70%] rounded bg-slate-200" />
        </div>
        <div className="h-3 w-20 rounded bg-slate-200" />
      </div>
    </div>
  );
}

function ArticleSquareHoverCardSkeleton() {
  return (
    <div className="relative h-full w-full min-h-[350px] overflow-hidden rounded-lg animate-pulse bg-slate-900">
      {/* Category Pill Placeholder */}
      <div className="absolute top-4 left-4 h-5 w-16 rounded bg-slate-700" />

      {/* Bottom Content Placeholders */}
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 flex flex-col gap-2.5">
        <div className="h-7 w-[80%] rounded bg-slate-700/80" />
        <div className="h-7 w-[60%] rounded bg-slate-700/80" />
        <div className="h-3.5 w-24 rounded bg-slate-700/60 mt-1" />
      </div>
    </div>
  );
}

export {
  ArticleRectangleCardSkeleton,
  ArticleSquareCardSkeleton,
  ArticleSquareHoverCardSkeleton,
};