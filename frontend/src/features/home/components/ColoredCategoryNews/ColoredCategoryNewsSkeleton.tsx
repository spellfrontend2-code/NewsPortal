function ColoredCategoryNewsSkeleton({
  color,
}: {
  color: string;
}) {
  return (
    <div
      className="relative w-full py-5 animate-pulse"
      style={{
        backgroundColor: color,
        boxShadow: `0 0 0 100vmax ${color}`,
        clipPath: "inset(0 -100vmax)",
      }}
    >
      <div className="w-full flex flex-col h-full">
        {/* Category Title */}
        <div className="mb-2 h-8 w-52 rounded bg-[var(--color-public-bg-skeleton)]" />

        <div className="flex flex-col lg:flex-row w-full h-[95%] gap-6">
          {/* Left — ArticleSquareCard at flex-[3], h-[350px] */}
          <div className="lg:flex-[3] min-w-0 h-[350px] lg:h-auto rounded-md overflow-hidden flex flex-col border border-slate-100 bg-white">
            {/* Image 70% */}
            <div className="h-[70%] w-full bg-[var(--color-public-bg-skeleton)]" />
            {/* Content */}
            <div className="p-4 flex flex-col justify-between flex-1 gap-2">
              <div className="flex flex-col gap-2">
                <div className="h-4 w-[90%] rounded bg-[var(--color-public-bg-skeleton)]" />
                <div className="h-4 w-[70%] rounded bg-[var(--color-public-bg-skeleton)]" />
              </div>
              <div className="h-3 w-20 rounded bg-[var(--color-public-bg-skeleton)]" />
            </div>
          </div>

          {/* Right — ArticleRectangleCards at lg:w-1/4 */}
          <div className="lg:w-1/4 w-full">
            <div className="w-full h-full flex flex-col gap-2 justify-between">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="h-[105px] rounded-md bg-white border border-slate-100 flex overflow-hidden"
                >
                  {/* Image 55% */}
                  <div className="w-[55%] bg-[var(--color-public-bg-skeleton)]" />
                  {/* Content 45% */}
                  <div className="w-[45%] p-4 flex flex-col justify-center gap-2">
                    <div className="h-4 w-[85%] rounded bg-[var(--color-public-bg-skeleton)]" />
                    <div className="h-4 w-[65%] rounded bg-[var(--color-public-bg-skeleton)]" />
                    <div className="h-3 w-16 rounded bg-[var(--color-public-bg-skeleton)]" />
                  </div>
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