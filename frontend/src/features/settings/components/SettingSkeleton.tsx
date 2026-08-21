function SkeletonBox({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-[rgb(var(--color-gray-rgb)/0.1)] ${className}`}
    />
  );
}

function InfoRowSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <SkeletonBox className="h-3 w-20" />
      <SkeletonBox className="h-4 w-32" />
    </div>
  );
}

function ImagePreviewSkeleton({ label }: { label: string }) {
  return (
    <div className="flex flex-col gap-2 w-[45%]">
      <span className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)] text-sm">
        {label}
      </span>
      <SkeletonBox className="h-40 w-50" />
    </div>
  );
}

function SocialLinkSkeleton() {
  return (
    <div className="w-[1/3] flex items-center gap-2 border border-[var(--color-secondary)] rounded-md px-3 py-2">
      <SkeletonBox className="h-4 w-4 rounded-full shrink-0" />
      <SkeletonBox className="h-3 w-16" />
      <SkeletonBox className="h-3 w-24 ml-2" />
    </div>
  );
}

function SettingsSkeleton() {
  return (
    <div className="w-full flex flex-col gap-5 p-15">
      {/* Header */}
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <SkeletonBox className="h-6 w-40" />
          <SkeletonBox className="h-4 w-64" />
        </div>
        <SkeletonBox className="h-9 w-[100px]" />
      </div>

      <div className="w-full flex flex-col gap-5 p-10 rounded-2xl border border-[var(--color-secondary)]">
        {/* Logo / Favicon */}
        <div className="w-full flex justify-between">
          <ImagePreviewSkeleton label="Logo" />
          <ImagePreviewSkeleton label="Favicon" />
        </div>

        <div className="w-full h-px bg-[rgb(var(--color-gray-rgb)/0.1)]" />

        {/* Contact info */}
        <div className="w-full grid grid-cols-5 gap-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <InfoRowSkeleton key={i} />
          ))}
        </div>

        <div className="w-full h-px bg-[rgb(var(--color-gray-rgb)/0.1)]" />

        {/* Social links */}
        <div className="w-full flex flex-col gap-3">
          <SkeletonBox className="h-3 w-24" />
          <div className="w-full grid grid-cols-3 gap-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <SocialLinkSkeleton key={i} />
            ))}
          </div>
        </div>

        <div className="w-full h-px bg-[rgb(var(--color-gray-rgb)/0.1)]" />

        {/* SEO */}
        <div className="w-full grid grid-cols-3 gap-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <InfoRowSkeleton key={i} />
          ))}
        </div>

        <div className="w-full h-px bg-[rgb(var(--color-gray-rgb)/0.1)]" />

        {/* Registration details */}
        <div className="w-full flex flex-col gap-3">
          <SkeletonBox className="h-3 w-40" />
          <div className="w-full grid grid-cols-3 gap-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <InfoRowSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsSkeleton;