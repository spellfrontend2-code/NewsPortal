import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/services/axios";
import BannerAdvertisement from "./BannerAdvertisement";

interface CategorySectionBannerProps {
  category: any;
  children: React.ReactNode;
}

/**
 * Wraps a home page category block and renders full-width banner ads
 * for placement where=before_section (above) and where=after_section (below).
 *
 * Source: GET /articles?section_type=category&section_id={categoryId}
 * The mixed feed already includes these ad items in order per the backend contract.
 */
function CategorySectionBanner({
  category,
  children,
}: CategorySectionBannerProps) {
  const categoryId = category?.id;

  const { data } = useQuery({
    queryKey: ["home_category_section_feed", categoryId],
    queryFn: async () => {
      const response = await axiosInstance.get("/articles", {
        params: {
          section_type: "category",
          section_id: categoryId,
        },
      });
      return response.data;
    },
    enabled: !!categoryId,
  });

  const feedItems: any[] = data?.data ?? [];

  // Extract before_section ads (rendered as banner above the category block)
  const beforeSectionAds = feedItems.filter(
    (item: any) =>
      item?.type === "advertisement" &&
      (item?.placement?.where === "before_section" ||
        item?.data?.placement?.where === "before_section")
  );

  // Extract after_section ads (rendered as banner below the category block)
  const afterSectionAds = feedItems.filter(
    (item: any) =>
      item?.type === "advertisement" &&
      (item?.placement?.where === "after_section" ||
        item?.data?.placement?.where === "after_section")
  );

  return (
    <div className="w-full flex flex-col gap-0">
      {/* Before-section banner ads */}
      {beforeSectionAds.map((item: any, idx: number) => {
        const adId = item?.data?.id ?? idx;
        return (
          <div
            key={`before-section-ad-${adId}-${idx}`}
            className="w-full overflow-hidden rounded-md border border-[var(--color-public-border-darker)] mb-4"
          >
            <BannerAdvertisement item={item} />
          </div>
        );
      })}

      {/* Category block content */}
      {children}

      {/* After-section banner ads */}
      {afterSectionAds.map((item: any, idx: number) => {
        const adId = item?.data?.id ?? idx;
        return (
          <div
            key={`after-section-ad-${adId}-${idx}`}
            className="w-full overflow-hidden rounded-md border border-[var(--color-public-border-darker)] mt-4"
          >
            <BannerAdvertisement item={item} />
          </div>
        );
      })}
    </div>
  );
}

export default CategorySectionBanner;
