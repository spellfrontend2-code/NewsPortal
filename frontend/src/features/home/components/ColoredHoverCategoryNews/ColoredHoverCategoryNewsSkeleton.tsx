import { ArticleSquareHoverCardSkeleton } from "@/features/articles/components/Public/cards/CardSkeleton";

function ColoredHoverCategoryNewsSkeleton({
  color = "transparent",
}: {
  color?: string;
}) {
  return (
    <div
      className="relative w-full py-8 animate-pulse"
      style={{
        backgroundColor: color,
        boxShadow: color && color !== "transparent" ? `0 0 0 100vmax ${color}` : undefined,
        clipPath: color && color !== "transparent" ? "inset(0 -100vmax)" : undefined,
      }}
    >
      <div className="w-full flex flex-col h-full gap-5">
        {/* Header */}
        <div className="flex items-center justify-between w-full">
          <div className="h-7 sm:h-8 w-36 sm:w-48 rounded bg-slate-300/70" />
          <div className="h-8 w-8 rounded-full bg-white/80 shrink-0" />
        </div>

        {/* 4 Hover Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[250px] sm:auto-rows-[300px] lg:auto-rows-[350px]">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="w-full h-full">
              <ArticleSquareHoverCardSkeleton hideMeta={true} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ColoredHoverCategoryNewsSkeleton;
