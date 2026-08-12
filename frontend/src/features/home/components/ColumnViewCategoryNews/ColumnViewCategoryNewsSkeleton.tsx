function ColumnViewCategoryNewsSkeleton({
  hasSidebarAds = true,
}: {
  hasSidebarAds?: boolean;
}) {
  return (
    <div className="w-screen animate-pulse">
           <div className="w-[92%] sm:w-[85%] md:w-[70%] mx-auto">
 {/* Category Title */}
      <div className="h-8 w-56 rounded bg-[var(--color-public-bg-skeleton)] mb-4" />

      <div className="flex w-full gap-4">
        {/* Articles */}
        <div
          className={`grid grid-cols-2 gap-2 ${
            hasSidebarAds ? "w-2/3" : "w-full"
          }`}
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-[105px] rounded-xl bg-[var(--color-public-bg-main)] shadow-sm p-2 flex gap-3"
            >
              {/* Thumbnail */}
              <div className="w-[120px] h-full rounded-lg bg-[var(--color-public-bg-skeleton)] shrink-0" />

              {/* Content */}
              <div className="flex-1 flex flex-col justify-between py-1">
                <div className="space-y-2">
                  <div className="h-4 w-full rounded bg-[var(--color-public-bg-skeleton)]" />
                  <div className="h-4 w-5/6 rounded bg-[var(--color-public-bg-skeleton)]" />
                  <div className="h-4 w-2/3 rounded bg-[var(--color-public-bg-skeleton)]" />
                </div>

                <div className="h-3 w-20 rounded bg-[var(--color-public-bg-skeleton)]" />
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Ads */}
        {hasSidebarAds && (
          <div className="w-1/3 flex flex-col gap-4">
            {Array.from({ length: 2 }).map((_, index) => (
              <div
                key={index}
                className="h-[160px] w-full rounded-2xl bg-[var(--color-public-bg-skeleton)]"
              />
            ))}
          </div>
        )}
      </div>
      </div>
    </div>
  );
}

export default ColumnViewCategoryNewsSkeleton;