// hooks/useAdImpression.ts

import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { useAdvertisementHooks } from "./useAdvertisements";

interface UseAdImpressionOptions {
  adId?: number | string;
  enabled?: boolean;
  threshold?: number;
}

export function useAdImpression({
  adId,
  enabled = true,
  threshold = 0.5,
}: UseAdImpressionOptions) {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const hasTracked = useRef(false);

  const advertisementHook = useAdvertisementHooks();
    const trackAdImpression = advertisementHook.useTrackPublicAdImpression();
  useEffect(() => {
    if (!enabled || !adId || !elementRef.current) return;

    hasTracked.current = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTracked.current) {
          hasTracked.current = true;

          trackAdImpression.mutate(adId, {
            onSuccess: (res) => {
              toast.success(res?.message || "Impression tracked successfully");
            },
          });

          observer.disconnect();
        }
      },
      {
        threshold,
      }
    );

    observer.observe(elementRef.current);

    return () => observer.disconnect();
  }, [adId, enabled, threshold]);

  return elementRef;
}