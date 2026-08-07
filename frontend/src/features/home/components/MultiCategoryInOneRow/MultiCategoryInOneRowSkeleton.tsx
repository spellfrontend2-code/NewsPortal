function MultiCategoryInOneRowSkeleton() {
  return (
    <div className="w-full animate-pulse">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Section */}
        <div className="w-full lg:w-2/3">
          {/* Title */}
          <div className="h-8 w-52 rounded bg-slate-300 mb-4" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <ArticleSquareCardSkeleton key={index} />
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/3">
          {/* Title */}
          <div className="h-8 w-52 rounded bg-slate-300 mb-4" />

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

function ArticleSquareCardSkeleton() {
  return (
    <div className="h-[320px] w-full rounded-xl overflow-hidden bg-white shadow-sm">
      {/* Image */}
      <div className="h-[60%] w-full bg-slate-300" />

      {/* Content */}
      <div className="p-4 flex flex-col justify-between h-[40%]">
        <div className="space-y-3">
          <div className="h-6 w-5/6 rounded bg-slate-300" />
          <div className="h-4 w-full rounded bg-slate-300" />
          <div className="h-4 w-4/5 rounded bg-slate-300" />
        </div>

        <div className="flex gap-2 mt-4">
          <div className="h-3 w-16 rounded bg-slate-300" />
          <div className="h-3 w-20 rounded bg-slate-300" />
        </div>
      </div>
    </div>
  );
}

export default MultiCategoryInOneRowSkeleton;