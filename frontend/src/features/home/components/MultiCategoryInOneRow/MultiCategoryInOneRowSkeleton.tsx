function ArticleSquareCardSkeleton() {
  return (
    <div className="h-[320px] w-full rounded-md overflow-hidden bg-white border border-slate-100 animate-pulse flex flex-col">
      {/* Image — 70% */}
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
  );
}

function MultiCategoryInOneRowSkeleton() {
  return (
    <div className="flex gap-4 w-full animate-pulse">
      <div className="flex gap-4 w-full">
        {/* Left — 2/3 width, 4 cards in 2×2 grid */}
        <div className="w-2/3">
          {/* Category title */}
          <div className="h-8 w-52 rounded bg-gray-200 pb-2 mb-2" />
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <ArticleSquareCardSkeleton key={index} />
            ))}
          </div>
        </div>

        {/* Right — 1/3 width, 2 cards stacked */}
        <div className="w-1/3">
          {/* Category title */}
          <div className="h-8 w-52 rounded bg-gray-200 pb-2 mb-2" />
          <div className="flex flex-col gap-4">
            {Array.from({ length: 2 }).map((_, index) => (
              <ArticleSquareCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MultiCategoryInOneRowSkeleton;