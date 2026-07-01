function MediaSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          key={index}
          className="h-[220px] w-full border border-[var(--color-secondary)] rounded-xl overflow-hidden animate-pulse"
        >
          {/* Image Skeleton */}
          <div className="relative h-2/3 w-full bg-gray-200">
            {/* Action Icons */}
            <div className="absolute top-2 right-2 flex gap-1">
              <div className="h-[30px] w-[30px] rounded-md bg-gray-300" />
              <div className="h-[30px] w-[30px] rounded-md bg-gray-300" />
            </div>
          </div>

          {/* File Name */}
          <div className="h-1/3 flex items-center justify-center px-3">
            <div className="h-4 w-3/4 rounded bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default MediaSkeleton;