function NewsDetailSkeleton() {
  return (
    <div className="flex flex-col gap-5 w-full animate-pulse">
      {/* News Header */}
      <div className="flex flex-col gap-4 w-full">
        {/* Title */}
        <div className="h-14 w-[85%] rounded-md bg-gray-200" />

        {/* Excerpt */}
        <div className="h-6 w-[70%] rounded-md bg-gray-200" />

        {/* Author and Read Time */}
        <div className="flex gap-5 items-center">
          <div className="h-5 w-32 rounded bg-gray-200" />
          <div className="h-5 w-20 rounded bg-gray-200" />
        </div>
      </div>

      {/* News Content */}
      <div className="flex w-full gap-3">
        {/* Main Content */}
        <div className="w-[70%] flex flex-col gap-5">
          {/* Media */}
          <div className="w-full h-[500px] rounded-lg bg-gray-200" />

          {/* Article Content */}
          <div className="flex flex-col gap-3">
            <div className="h-5 w-full rounded bg-gray-200" />
            <div className="h-5 w-[95%] rounded bg-gray-200" />
            <div className="h-5 w-[90%] rounded bg-gray-200" />
            <div className="h-5 w-[75%] rounded bg-gray-200" />
            <div className="h-5 w-[85%] rounded bg-gray-200" />
          </div>

          {/* Tags */}
          <div className="flex gap-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-8 w-20 rounded-2xl bg-gray-200"
              />
            ))}
          </div>
        </div>

        {/* Advertisements */}
        <div className="w-[30%] h-[500px] rounded-lg bg-gray-200" />
      </div>
    </div>
  );
}

export default NewsDetailSkeleton;