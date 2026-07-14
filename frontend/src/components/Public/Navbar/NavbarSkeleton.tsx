function NavbarSkeleton() {
  return (
    <div className="flex items-center justify-center w-full mt-10">

        {/* Category Skeletons */}
        <div className="flex w-[70%] items-center justify-between">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-5 w-20 rounded bg-white/20 animate-pulse"
            />
          ))}
        </div>
      </div>
  );
}

export default NavbarSkeleton;