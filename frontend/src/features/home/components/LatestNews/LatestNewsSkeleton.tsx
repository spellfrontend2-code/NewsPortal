function LatestNewsSkeleton() {
  return (
    <div className="w-full flex flex-col h-full animate-pulse">
      {/* Heading placeholder */}
      <div className="h-9 w-48 rounded bg-gray-200 mb-6" />

      {/* Body */}
      <div className="flex flex-col lg:flex-row w-full h-[95%] gap-6">
        {/* Left 4/5 — HoverCard + RectangleCards */}
        <div className="flex flex-col lg:flex-row lg:w-4/5 gap-6">
          {/* Main square hover card — flex-[3] */}
          <div className="lg:flex-[3] min-w-0 h-[350px] lg:h-auto rounded-md bg-slate-950 overflow-hidden relative">
            <div className="h-full w-full bg-gray-700" />
            {/* Text overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-2.5">
              <div className="h-7 w-[75%] rounded bg-gray-500/60" />
              <div className="h-7 w-[55%] rounded bg-gray-500/60" />
              <div className="h-3 w-24 rounded bg-gray-500/50 mt-1" />
            </div>
          </div>

          {/* Side rectangle cards — flex-[2] */}
          <div className="flex lg:flex-[2] min-w-0 flex-col gap-3">
            {Array.from({ length: 7 }).map((_, index) => (
              <div
                key={index}
                className="h-[105px] w-full rounded-md overflow-hidden border border-slate-100 bg-white flex"
              >
                {/* Image 55% */}
                <div className="w-[55%] bg-gray-200" />
                {/* Content 45% */}
                <div className="w-[45%] p-4 flex flex-col justify-center gap-2">
                  <div className="h-4 w-[85%] rounded bg-gray-200" />
                  <div className="h-4 w-[65%] rounded bg-gray-200" />
                  <div className="h-3 w-16 rounded bg-gray-200 mt-1" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1/5 — Sidebar ads */}
        <div className="lg:w-1/5 w-full">
          <div className="w-full flex flex-col md:flex-row lg:flex-col gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="w-full aspect-square rounded-md bg-gray-200" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LatestNewsSkeleton;