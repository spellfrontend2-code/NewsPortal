import {
  ArticleRectangleCardSkeleton,
  ArticleSquareCardSkeleton,
} from "@/features/articles/components/Public/cards/CardSkeleton";

function ColoredCategoryNewsSkeleton({
  color = "transparent",
}: {
  color?: string;
}) {
  return (
    <div
      className="relative w-full py-5 animate-pulse"
      style={{
        backgroundColor: color,
        boxShadow: color && color !== "transparent" ? `0 0 0 100vmax ${color}` : undefined,
        clipPath: color && color !== "transparent" ? "inset(0 -100vmax)" : undefined,
      }}
    >
      <div className="w-full flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 mb-1">
          <div className="h-7 sm:h-8 w-36 sm:w-48 rounded bg-slate-300/70" />
          <div className="h-8 w-8 rounded-full bg-white/80 shrink-0" />
        </div>

        <div className="flex flex-col lg:flex-row w-full gap-6">
          {/* Left — Big ArticleSquareCard at lg:flex-[2] */}
          <div className="lg:flex-[2] min-w-0 h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
            <ArticleSquareCardSkeleton />
          </div>

          {/* Right — 5 ArticleRectangleCards at lg:w-1/3 */}
          <div className="lg:w-1/3 w-full">
            <div className="w-full h-full flex flex-col gap-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="h-[100px] sm:h-[120px] lg:h-[115px]"
                >
                  <ArticleRectangleCardSkeleton />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ColoredCategoryNewsSkeleton;