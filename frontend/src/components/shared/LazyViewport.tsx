import React, { useEffect, useRef, useState } from "react";

interface LazyViewportProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  /** Distance in pixels before entering viewport to trigger mounting/fetching (e.g., "350px") */
  rootMargin?: string;
  minHeight?: string | number;
  className?: string;
}


export function LazyViewport({
  children,
  fallback,
  rootMargin = "350px",
  minHeight = "200px",
  className = "w-full",
}: LazyViewportProps) {
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (inView || !containerRef.current) return;

    const element = containerRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin,
        threshold: 0,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [inView, rootMargin]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={!inView ? { minHeight } : undefined}
    >
      {inView ? children : fallback || null}
    </div>
  );
}

export default LazyViewport;
