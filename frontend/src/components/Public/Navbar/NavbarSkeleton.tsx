function NavbarSkeleton() {
  return (
    <div className="w-full bg-[var(--color-public-bg-dark)] border-b border-[var(--color-public-border-darker)]">
      <div className="flex h-[54px] w-[92%] sm:w-[85%] md:w-[80%] mx-auto items-center gap-4">
        {/* Category links */}
        <div className="hidden md:flex items-center h-full flex-1 gap-1">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-5 w-20 rounded bg-[var(--color-public-bg-main)]/20 animate-pulse shrink-0"
            />
          ))}
        </div>

        {/* Mobile hamburger placeholder */}
        <div className="md:hidden h-8 w-8 rounded-lg bg-[var(--color-public-bg-main)]/20 animate-pulse" />

        {/* Right side: search + profile */}
        <div className="flex items-center gap-3 ml-auto md:ml-0 shrink-0">
          {/* Search bar */}
          <div className="h-8 w-36 sm:w-40 md:w-44 rounded-full bg-[var(--color-public-bg-dark-secondary)]/60 border border-[var(--color-public-border-dark)] animate-pulse" />
          {/* Profile */}
          <div className="h-8 w-8 rounded-full bg-[var(--color-public-bg-main)]/20 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default NavbarSkeleton;