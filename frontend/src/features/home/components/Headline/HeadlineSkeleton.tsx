function HeadlineSkeleton() {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-3 animate-pulse">
      {/* Title */}
      <div className="flex flex-col items-center gap-2 w-full px-4">
        <div className="h-14 w-full max-w-6xl rounded-md bg-gray-200" />
        <div className="h-14 w-[75%] max-w-6xl rounded-md bg-gray-200" />
      </div>

      {/* Author and Date row */}
      <div className="flex gap-4 items-center">
        {/* Author avatar + name */}
        <div className="flex items-center gap-1.5">
          <div className="h-6 w-6 rounded-full bg-gray-200" />
          <div className="h-4 w-28 rounded bg-gray-200" />
        </div>
        <div className="h-4 w-4 rounded-full bg-gray-200" />
        {/* Date */}
        <div className="h-4 w-24 rounded bg-gray-200" />
      </div>

      {/* Image */}
      <div className="relative w-full rounded-md overflow-hidden border border-slate-200/60 bg-gray-200 aspect-[21/12] max-h-[600px]" />

      {/* Divider */}
      <div className="w-full h-px bg-gray-200 mt-2" />
    </div>
  );
}

export default HeadlineSkeleton;