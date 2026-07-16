 function ArticleRectangleCardSkeleton() {
  return (
    <div className="flex h-full w-full overflow-hidden rounded-lg animate-pulse">
      {/* Image */}
      <div className="h-full w-[40%] bg-gray-200" />

      {/* Content */}
      <div className="w-[60%] p-5 flex flex-col justify-center gap-3">
        {/* Title */}
        <div className="h-5 w-[90%] rounded bg-gray-200" />
        <div className="h-5 w-[70%] rounded bg-gray-200" />

        {/* Read time */}
        <div className="h-4 w-20 rounded bg-gray-200" />
      </div>
    </div>
  );
}

 function ArticleSquareCardSkeleton() {
  return (
    <div className="flex flex-col h-full w-full gap-2 overflow-hidden animate-pulse">
      {/* Image */}
      <div className="h-1/2 w-full rounded-lg bg-gray-200" />

      {/* Title */}
      <div className="h-1/2 flex flex-col gap-2">
        <div className="h-5 w-[90%] rounded bg-gray-200" />
        <div className="h-5 w-[70%] rounded bg-gray-200" />
      </div>
    </div>
  );
}

function ArticleSquareHoverCardSkeleton() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg animate-pulse">
      {/* Image */}
      <div className="h-full w-full bg-gray-200" />

      {/* Gradient overlay placeholder */}
      <div className="absolute bottom-3 left-3 flex flex-col gap-2">
        <div className="h-6 w-64 rounded bg-gray-300" />
        <div className="h-6 w-48 rounded bg-gray-300" />
      </div>
    </div>
  );
}

export { ArticleRectangleCardSkeleton, ArticleSquareCardSkeleton, ArticleSquareHoverCardSkeleton };