function HeadlineSkeleton() {
  return (
    <div className="flex flex-col gap-3 w-full h-full justify-center items-center animate-pulse">
      {/* Title Skeleton */}
      <div className="w-full flex flex-col justify-center items-center gap-2">
        <div className="h-16 w-full bg-gray-200 rounded-md" />

        {/* Author and Read Time Skeleton */}
        <div className="flex w-full h-[1/4] gap-5 items-center justify-center">
          <div className="h-5 w-32 bg-gray-200 rounded" />
          <div className="h-5 w-20 bg-gray-200 rounded" />
        </div>

        {/* Image Skeleton */}
        <div className="relative w-full h-[50%] rounded-lg overflow-hidden">
          <div className="w-full h-[200px] bg-gray-200 rounded-lg" />
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-200 mt-2" />
      </div>
    </div>
  );
}

export default HeadlineSkeleton;