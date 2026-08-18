function NavbarSkeleton() {
  return (
    <div className="w-full bg-[var(--color-public-bg-dark)] backdrop-blur-md shadow-sm border-b border-[var(--color-public-border-darker)] sticky top-0 z-50">
      <div className="flex h-[54px] w-[92%] sm:w-[85%] md:w-[80%] mx-auto items-center gap-2 md:gap-4">
        {/* Mobile hamburger placeholder */}
        <div className="md:hidden h-8 w-8 rounded-lg bg-white/20 animate-pulse shrink-0" />

        {/* Desktop category links */}
        <div className="hidden md:flex items-center h-full flex-1 gap-4 overflow-hidden">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-4 w-16 sm:w-20 rounded bg-white/20 animate-pulse shrink-0"
            />
          ))}
        </div>

        {/* Right side: search + profile */}
        <div className="flex items-center gap-2 sm:gap-3 ml-auto md:ml-0 shrink-0">
          {/* Search bar */}
          <div className="h-8 w-36 sm:w-44 md:w-52 rounded-full bg-white/15 border border-white/20 animate-pulse" />
          {/* Profile circle */}
          <div className="h-8 w-8 rounded-full bg-white/20 animate-pulse shrink-0" />
        </div>
      </div>
    </div>
  );
}

export default NavbarSkeleton;