function ColoredCategoryNewsSkeleton({
  color,
}: {
  color: string;
}) {
  return (
    <div
      className="relative w-screen py-5 animate-pulse"
      style={{ backgroundColor: color }}
    >
      <div className="w-[92%] sm:w-[85%] md:w-[70%] mx-auto">
        {/* Heading */}
        <div className="mb-6 h-9 w-56 rounded bg-slate-300" />

        <div className="flex flex-col lg:flex-row w-full h-[95%] gap-6">
          {/* Left Featured Article */}
          <div className="lg:flex-[3] min-w-0 h-[350px] lg:h-auto">
            <div className="h-full rounded-xl overflow-hidden bg-white shadow-sm">
              {/* Image */}
              <div className="h-[60%] w-full bg-slate-300" />

              {/* Content */}
              <div className="p-4 flex flex-col justify-between h-[40%]">
                <div className="space-y-3">
                  <div className="h-6 w-5/6 rounded bg-slate-300" />
                  <div className="h-4 w-full rounded bg-slate-300" />
                  <div className="h-4 w-4/5 rounded bg-slate-300" />
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <div className="h-3 w-20 rounded bg-slate-300" />
                  <div className="h-3 w-16 rounded bg-slate-300" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Articles */}
          <div className="lg:w-1/4 w-full">
            <div className="w-full h-full flex flex-col gap-2 justify-between">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="h-[105px] rounded-xl bg-white shadow-sm p-2 flex gap-3"
                >
                  {/* Thumbnail */}
                  <div className="w-[120px] h-full rounded-lg bg-slate-300 shrink-0" />

                  {/* Text */}
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="space-y-2">
                      <div className="h-4 w-full rounded bg-slate-300" />
                      <div className="h-4 w-5/6 rounded bg-slate-300" />
                      <div className="h-4 w-2/3 rounded bg-slate-300" />
                    </div>

                    <div className="h-3 w-16 rounded bg-slate-300" />
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