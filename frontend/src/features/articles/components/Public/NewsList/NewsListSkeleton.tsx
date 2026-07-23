function NewsListSkeleton({ show = "all" }: { show?: "all" | "list" }) {
  return (
    <div
      className={`w-full flex flex-col gap-5 ${
        show === "all" ? "py-10" : ""
      }`}
    >
      {/* Heading */}
      <div
        className={`relative h-15 w-full flex items-center ${
          show === "all" ? "py-8" : ""
        }`}
      >
        <div
          className={`animate-pulse bg-gray-200 rounded ${
            show === "all" ? "h-12 w-[300px]" : "h-8 w-[200px]"
          }`}
        />

        {show === "all" && (
          <div className="absolute -left-4 w-2 h-full rounded-l-md bg-gray-200 animate-pulse" />
        )}
      </div>

      {/* Content */}
      <div>
        {/* Featured Article */}
        {show === "all" && (
          <div className="h-[300px] w-full rounded-lg bg-gray-200 animate-pulse" />
        )}

        {/* Article Cards */}
        <div
          className={`grid grid-cols-4 w-full h-full gap-3 ${
            show === "all" ? "pt-10" : ""
          }`}
        >
          {Array.from({
            length: show === "all" ? 8 : 4,
          }).map((_, index) => (
            <div
              key={index}
              className="h-[300px] w-full rounded-lg bg-gray-200 animate-pulse"
            />
          ))}
        </div>

        {/* Pagination */}
        {show === "all" ? (
          <div className="flex items-center justify-center gap-2 pt-5">
            <div className="h-10 w-10 rounded bg-gray-200 animate-pulse" />

            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="h-10 w-10 rounded bg-gray-200 animate-pulse"
              />
            ))}

            <div className="h-10 w-10 rounded bg-gray-200 animate-pulse" />
          </div>
        ) : (
          <div className="flex justify-end items-center pt-3">
            <div className="h-10 w-28 rounded-md bg-gray-200 animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
}

export default NewsListSkeleton;