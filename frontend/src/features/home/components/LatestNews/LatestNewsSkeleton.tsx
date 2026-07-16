function LatestNewsSkeleton() {
  return (
    <div className="h-[500px] w-full animate-pulse">

      <div className="flex w-full h-full gap-3">
        {/* News Section */}
        <div className="flex w-3/4 gap-3">
          {/* Main Square Article */}
          <div className="flex-[3] min-w-0">
            <div className="w-full h-full rounded-lg bg-gray-200" />
          </div>

          {/* Side Articles */}
          <div className="flex flex-[2] min-w-0 flex-col gap-3">
            {/* Rectangle Card Skeletons */}
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="flex-1 w-full rounded-lg bg-gray-200"
              />
            ))}

            {/* Button Skeleton */}
            <div className="h-10 w-full rounded-md bg-gray-200" />
          </div>
        </div>

        {/* Advertisement Skeleton */}
        <div className="w-1/4 rounded-lg bg-gray-200" />
      </div>
    </div>
  );
}

export default LatestNewsSkeleton;