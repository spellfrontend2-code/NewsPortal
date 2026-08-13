function ArticleRectangleCardSkeleton() {
  return (
    <div className="flex h-full w-full overflow-hidden rounded-md animate-pulse border border-slate-100 bg-white">
      {/* Image — 55% to match ArticleRectangleCard */}
      <div className="w-[55%] bg-gray-200" />

      {/* Content — 45% */}
      <div className="w-[45%] p-4 flex flex-col justify-center gap-2">
        {/* Title */}
        <div className="h-4 w-[90%] rounded bg-gray-200" />
        <div className="h-4 w-[70%] rounded bg-gray-200" />

        {/* Read time */}
        <div className="h-3 w-20 rounded bg-gray-200 mt-1" />
      </div>
    </div>
  );
}

function ArticleSquareCardSkeleton() {
  return (
    <div className="flex flex-col h-full w-full overflow-hidden rounded-md animate-pulse border border-slate-100 bg-white">
      {/* Image — 70% to match ArticleSquareCard */}
      <div className="h-[70%] w-full bg-gray-200" />

      {/* Content — flex-1 to match */}
      <div className="p-4 flex flex-col justify-between flex-1 gap-2">
        {/* Title lines */}
        <div className="flex flex-col gap-2">
          <div className="h-4 w-[90%] rounded bg-gray-200" />
          <div className="h-4 w-[70%] rounded bg-gray-200" />
        </div>
        {/* Date row */}
        <div className="h-3 w-20 rounded bg-gray-200" />
      </div>
    </div>
  );
}

function ArticleSquareHoverCardSkeleton() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-md animate-pulse border border-slate-200/80 bg-slate-950">
      {/* Image */}
      <div className="h-full w-full bg-gray-700" />

      {/* Gradient overlay placeholder */}
      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-2.5">
        <div className="h-7 w-[75%] rounded bg-gray-500/60" />
        <div className="h-7 w-[55%] rounded bg-gray-500/60" />
        {/* Date row */}
        <div className="h-3 w-24 rounded bg-gray-500/50 mt-1" />
      </div>
    </div>
  );
}

export { ArticleRectangleCardSkeleton, ArticleSquareCardSkeleton, ArticleSquareHoverCardSkeleton };