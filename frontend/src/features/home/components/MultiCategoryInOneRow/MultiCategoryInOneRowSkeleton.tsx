import { ArticleSquareCardSkeleton } from "@/features/articles/components/Public/cards/CardSkeleton";

function MultiCategoryInOneRowSkeleton() {
  return (
    <div className="w-full animate-pulse">
      <div className="flex flex-col lg:flex-row gap-6 w-full">
        {/* Category One — w-full lg:w-2/3 */}
        <div className="w-full lg:w-2/3">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 mb-1">
            <div className="h-7 sm:h-8 w-36 sm:w-48 rounded bg-slate-200" />
            <div className="h-8 w-8 rounded-full bg-slate-200 shrink-0" />
          </div>

          {/* 4 Cards in 2x2 grid */}
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-[320px] w-full bg-transparent">
                <ArticleSquareCardSkeleton />
              </div>
            ))}
          </div>
        </div>

        {/* Category Two — w-full lg:w-1/3 */}
        <div className="w-full lg:w-1/3">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 mb-1">
            <div className="h-7 sm:h-8 w-36 sm:w-48 rounded bg-slate-200" />
            <div className="h-8 w-8 rounded-full bg-slate-200 shrink-0" />
          </div>

          {/* 2 Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="h-[320px] w-full bg-transparent">
                <ArticleSquareCardSkeleton />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MultiCategoryInOneRowSkeleton;