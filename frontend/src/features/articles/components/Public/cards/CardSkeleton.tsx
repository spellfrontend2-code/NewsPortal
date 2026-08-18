interface ArticleRectangleCardSkeletonProps {
  type?: "view" | "detailed";
}

function ArticleRectangleCardSkeleton({ type = "view" }: ArticleRectangleCardSkeletonProps) {
  if (type === "detailed") {
    return (
      <div className="flex flex-col md:flex-row h-full w-full overflow-hidden rounded-md bg-white border border-slate-100 animate-pulse">
        {/* Media Container: 50% on desktop, full width on mobile */}
        <div className="md:w-1/2 w-full h-48 md:h-full bg-slate-200 shrink-0" />

        {/* Content Side */}
        <div className="md:w-1/2 w-full p-4 sm:p-6 md:p-8 flex flex-col justify-center gap-3 bg-slate-50/50 flex-1 min-w-0">
          <div className="h-6 sm:h-7 md:h-8 lg:h-9 w-[85%] rounded bg-slate-200" />
          <div className="h-6 sm:h-7 md:h-8 lg:h-9 w-[60%] rounded bg-slate-200" />
          <div className="h-3.5 sm:h-4 w-full rounded bg-slate-200/80 mt-1" />
          <div className="h-3.5 sm:h-4 w-3/4 rounded bg-slate-200/80" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full items-center gap-3 border-b border-slate-100 last:border-b-0 animate-pulse bg-white py-1 overflow-hidden">
      {/* 4:3 Thumbnail matching container height */}
      <div className="h-full aspect-[4/3] w-[120px] sm:w-[160px] rounded-md bg-slate-200 shrink-0" />

      {/* Content Area */}
      <div className="flex-1 min-w-0 h-full flex flex-col justify-center py-1 gap-2">
        <div className="h-4 sm:h-4.5 w-[92%] rounded bg-slate-200" />
        <div className="h-4 sm:h-4.5 w-[65%] rounded bg-slate-200" />
      </div>
    </div>
  );
}

function ArticleRectangleDetailedCardSkeleton() {
  return <ArticleRectangleCardSkeleton type="detailed" />;
}

function ArticleSquareCardSkeleton() {
  return (
    <div className="flex flex-col h-full w-full overflow-hidden animate-pulse bg-transparent">
      {/* Image Container matching ArticleSquareCard's 72%/75% height */}
      <div className="relative h-[72%] sm:h-[75%] w-full rounded-md bg-slate-200 shrink-0" />

      {/* Content */}
      <div className="h-[28%] sm:h-[25%] pt-2.5 pb-1 flex flex-col flex-1 gap-1.5 min-w-0 justify-start">
        <div className="h-4 sm:h-5 w-[90%] rounded bg-slate-200" />
        <div className="h-4 sm:h-5 w-[70%] rounded bg-slate-200" />
      </div>
    </div>
  );
}

function ArticleSquareHoverCardSkeleton({ hideMeta = false }: { hideMeta?: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-md animate-pulse bg-slate-900">
      {/* Bottom Content Placeholders */}
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-8 flex flex-col gap-2.5 z-10">
        <div className="h-5 sm:h-6 md:h-7 lg:h-8 w-[85%] rounded bg-slate-700/80" />
        <div className="h-5 sm:h-6 md:h-7 lg:h-8 w-[60%] rounded bg-slate-700/80" />
        {!hideMeta && (
          <div className="flex items-center gap-2 mt-1">
            <div className="h-5 w-5 rounded-full bg-slate-700/70" />
            <div className="h-3.5 w-24 rounded bg-slate-700/70" />
            <div className="h-3.5 w-16 rounded bg-slate-700/70" />
          </div>
        )}
      </div>
    </div>
  );
}

export {
  ArticleRectangleCardSkeleton,
  ArticleRectangleDetailedCardSkeleton,
  ArticleSquareCardSkeleton,
  ArticleSquareHoverCardSkeleton,
};