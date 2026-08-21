function ContactUsSkeleton() {
  return (
    <section className="px-4 animate-pulse">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 text-center flex flex-col items-center justify-center">
          <div className="h-6 w-28 rounded-full bg-slate-200 mb-3" />
          <div className="h-9 sm:h-10 w-64 sm:w-80 rounded bg-slate-200" />
          <div className="h-4 w-72 sm:w-96 max-w-full rounded bg-slate-200/80 mt-3" />
        </div>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="flex items-start gap-4 rounded-xl p-5 bg-white border border-slate-100 shadow-sm"
            >
              {/* Icon bubble */}
              <div className="h-11 w-11 shrink-0 rounded-full bg-slate-200" />

              <div className="flex-1 flex flex-col gap-2 pt-1">
                <div className="h-3 w-20 rounded bg-slate-200" />
                <div className="h-5 w-36 sm:w-44 rounded bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ContactUsSkeleton;
