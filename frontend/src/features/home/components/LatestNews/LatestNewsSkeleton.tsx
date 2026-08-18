import {
  ArticleRectangleCardSkeleton,
  ArticleSquareHoverCardSkeleton,
} from "@/features/articles/components/Public/cards/CardSkeleton";

function LatestNewsSkeleton() {
  return (
    <div className="w-full flex flex-col h-full animate-pulse">
      {/* Heading placeholder */}
      <div className="h-8 md:h-9 w-36 sm:w-48 rounded bg-slate-200 mb-6" />

      {/* Body */}
      <div className="flex flex-col lg:flex-row w-full gap-6">
        {/* Left 4/5 — HoverCard + RectangleCards */}
        <div className="flex flex-col lg:flex-row lg:w-4/5 gap-6">
          {/* Main square hover card — lg:flex-[2] */}
          <div className="lg:flex-[2] min-w-0 h-[350px] lg:h-auto">
            <ArticleSquareHoverCardSkeleton />
          </div>

          {/* Side rectangle cards — flex-1 */}
          <div className="flex flex-col gap-1 flex-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="h-[105px]">
                <ArticleRectangleCardSkeleton />
              </div>
            ))}
          </div>
        </div>

        {/* Right 1/5 — Sidebar ads */}
        <div className="lg:w-1/5 w-full lg:sticky lg:top-20 self-start">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="w-full max-w-[320px] mx-auto aspect-[300/250] overflow-hidden rounded-md border border-[var(--color-public-border-light)] bg-slate-200"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LatestNewsSkeleton;