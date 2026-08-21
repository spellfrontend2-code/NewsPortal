function HeadlineSkeleton() {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-3.5 animate-pulse">
      {/* Title */}
      <div className="flex flex-col items-center gap-2 w-full max-w-6xl px-4">
        <div className="h-7 sm:h-9 md:h-12 lg:h-14 w-full rounded-md bg-slate-200" />
        <div className="h-7 sm:h-9 md:h-12 lg:h-14 w-[75%] rounded-md bg-slate-200" />
      </div>

      {/* Author and Date row */}
      <div className="flex flex-wrap gap-4 items-center justify-center text-sm">
        {/* Author avatar + name */}
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-slate-200 shrink-0" />
          <div className="h-4 w-28 rounded bg-slate-200" />
        </div>
        <span className="text-slate-300">•</span>
        {/* Date */}
        <div className="h-4 w-24 rounded bg-slate-200" />
      </div>

      {/* Image */}
      <div className="relative w-full rounded-md overflow-hidden border border-slate-200/60 bg-slate-200 aspect-[21/12] max-h-[600px] shadow-sm" />

      {/* Divider */}
      <div className="w-full h-px bg-slate-200 mt-2" />
    </div>
  );
}

export default HeadlineSkeleton;