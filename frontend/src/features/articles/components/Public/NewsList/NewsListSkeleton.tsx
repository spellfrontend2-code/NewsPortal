import {
  ArticleRectangleCardSkeleton,
  ArticleSquareCardSkeleton,
} from "@/features/articles/components/Public/cards/CardSkeleton";

function NewsListSkeleton() {
  return (
    <div className="w-full flex flex-col gap-2 animate-pulse">
      {/* Page Heading */}
      <div className="h-14 w-[40%] rounded-md bg-gray-200" />

      {/* Featured Article */}
      <div className="h-[300px] w-full">
        <ArticleRectangleCardSkeleton />
      </div>

      {/* Article Grid */}
      <div className="grid grid-cols-4 w-full h-full gap-3 pt-10">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="h-[500px] w-full"
          >
            <ArticleSquareCardSkeleton />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2">
        <div className="h-10 w-10 rounded bg-gray-200" />

        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="h-10 w-10 rounded bg-gray-200"
          />
        ))}

        <div className="h-10 w-10 rounded bg-gray-200" />
      </div>
    </div>
  );
}

export default NewsListSkeleton;