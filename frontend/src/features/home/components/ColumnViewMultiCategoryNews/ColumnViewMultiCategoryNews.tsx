import SidebarAdvertisement from "@/features/advertisements/components/Public/SidebarAdvertisement";
import { useAdvertisementHooks } from "@/features/advertisements/hooks/useAdvertisements";
import ArticleRectangleCard from "@/features/articles/components/Public/cards/ArticleRectangleCard";
import { useArticlesHooks } from "@/features/articles/hooks/useArticles";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ColumnViewMultiCategoryNewsSkeleton from "./ColumnViewMultiCategoryNewsSkeleton";

function ColumnViewMultiCategoryNews({
  categoryOne,
  categoryTwo,
  color = "transparent",
}: {
  categoryOne: any;
  categoryTwo: any;
  color?: string;
}) {
  const articleHook = useArticlesHooks();
  const advertisementHook = useAdvertisementHooks();
  const navigate = useNavigate();

  const { data: categoryOneArticles, isLoading: categoryOneArticleLoading } =
    articleHook.useFetchPublicArticlesByCategory({
      page: 1,
      per_page: 6,
      slug: categoryOne?.slug,
    });
  const categoryOneItems = (categoryOneArticles?.data ?? []).slice(0, 6);

  const { data: categoryTwoArticles, isLoading: categoryTwoArticleLoading } =
    articleHook.useFetchPublicArticlesByCategory({
      page: 1,
      per_page: 6,
      slug: categoryTwo?.slug,
    });
  const categoryTwoItems = (categoryTwoArticles?.data ?? []).slice(0, 6);

  const { data: cat1Advertisements, isLoading: cat1AdvertisementsLoading } =
    advertisementHook.useFetchPublicAdvertisements({
      page_type: "home",
      section_id: categoryOne?.id,
    });

  const { data: cat2Advertisements, isLoading: cat2AdvertisementsLoading } =
    advertisementHook.useFetchPublicAdvertisements({
      page_type: "home",
      section_id: categoryTwo?.id,
    });

  const hasCat1 = categoryOneItems.length > 0;
  const hasCat2 = categoryTwoItems.length > 0;

  // Determine advertisement source: category 1 ads if category 1 is present or both are present, otherwise category 2 ads
  const rawSidebarAds =
    hasCat1 || (categoryOne && !hasCat2)
      ? (cat1Advertisements?.data?.sidebar ?? [])
      : (cat2Advertisements?.data?.sidebar ?? []);

  // Determine sidebar ads count based on article counts:
  // 1. If both are present but category 1 has <= 2 data -> show 1 ad
  // 2. If only one category is present and its length < 3 -> show 1 ad
  // 3. Otherwise show normal ads
  let sidebarAds = rawSidebarAds;
  if (hasCat1 && hasCat2) {
    if (categoryOneItems.length <= 2) {
      sidebarAds = rawSidebarAds.slice(0, 1);
    }
  } else if (hasCat1 && !hasCat2) {
    if (categoryOneItems.length < 3) {
      sidebarAds = rawSidebarAds.slice(0, 1);
    }
  } else if (!hasCat1 && hasCat2) {
    if (categoryTwoItems.length < 3) {
      sidebarAds = rawSidebarAds.slice(0, 1);
    }
  }

  const hasSidebarAds = sidebarAds.length > 0;

  if (
    categoryOneArticleLoading ||
    categoryTwoArticleLoading ||
    cat1AdvertisementsLoading ||
    cat2AdvertisementsLoading
  ) {
    return (
      <ColumnViewMultiCategoryNewsSkeleton
        hasSidebarAds={hasSidebarAds}
        color={color}
      />
    );
  }

  if (!hasCat1 && !hasCat2) {
    return null;
  }

  const renderCategoryBlock = (
    category: any,
    items: any[],
    isExpanded: boolean
  ) => (
    <div
      className="w-full flex-1 min-w-0 flex flex-col"
    >
      <div className="flex items-center justify-between pb-2 mb-3">
        <h1
          className="text-2xl cursor-pointer uppercase font-bold
          hover:text-[var(--color-public-text-accent-hover)]
          text-[var(--color-public-text-accent)]
          transition-all duration-200 tracking-tight"
          onClick={() => navigate(`/news-list/category/${category?.slug}`)}
        >
          {category?.name}
        </h1>

        <button
          onClick={() => navigate(`/news-list/category/${category?.slug}`)}
          className="cursor-pointer flex items-center justify-center
          w-8 h-8 rounded-full bg-white
          text-[var(--color-public-text-accent)]
          shadow-sm hover:bg-slate-50 transition-colors"
        >
          <ChevronRight size={20} strokeWidth={2.5} />
        </button>
      </div>

      <div
        className={`w-full ${
          isExpanded
            ? "grid grid-cols-1 md:grid-cols-2 gap-2"
            : "flex flex-col gap-2"
        }`}
      >
        {items.map((item: any, idx: number) => {
          if (item?.type === "article") {
            const article = item?.data || item;

            return (
              <div
                key={`art-${article?.id ?? idx}-${idx}`}
                className="w-full h-[120px]"
              >
                <ArticleRectangleCard article={article} />
              </div>
            );
          }

          return null;
        })}
      </div>
    </div>
  );

  const renderSidebarAdsBlock = () => {
    if (!hasSidebarAds) return null;

    return (
      <div
        className="w-full xl:w-[300px] shrink-0 xl:sticky xl:top-20 self-start"
      >
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4">
          {sidebarAds.map((ad: any, index: number) => (
            <div
              key={ad.id ?? index}
              className="w-full max-w-[300px] aspect-[300/250] mx-auto overflow-hidden rounded-md"
            >
              <SidebarAdvertisement Ad={ad} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`relative w-full flex xl:flex-row flex-col gap-6 py-6`}
      style={{
        backgroundColor: color,
        boxShadow:
          color && color !== "transparent"
            ? `0 0 0 100vmax ${color}`
            : undefined,
        clipPath:
          color && color !== "transparent"
            ? "inset(0 -100vmax)"
            : undefined,
      }}
    >
      {/* If both categories exist: Category 1 (w-2/5) -> Ads (w-1/5) -> Category 2 (w-2/5) */}
      {hasCat1 && hasCat2 && (
        <>
          {renderCategoryBlock(categoryOne, categoryOneItems, false)}
          {renderSidebarAdsBlock()}
          {renderCategoryBlock(categoryTwo, categoryTwoItems, false)}
        </>
      )}

      {/* If only Category 1 exists: Category 1 (w-4/5) -> Ads (w-1/5) */}
      {hasCat1 && !hasCat2 && (
        <>
          {renderCategoryBlock(categoryOne, categoryOneItems, true)}
          {renderSidebarAdsBlock()}
        </>
      )}

      {/* If only Category 2 exists: Category 2 (w-4/5) -> Ads (w-1/5) */}
      {!hasCat1 && hasCat2 && (
        <>
          {renderCategoryBlock(categoryTwo, categoryTwoItems, true)}
          {renderSidebarAdsBlock()}
        </>
      )}
    </div>
  );
}

export default ColumnViewMultiCategoryNews;

