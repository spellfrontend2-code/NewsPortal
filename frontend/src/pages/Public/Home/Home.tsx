import BannerAdvertisement from "@/features/advertisements/components/Public/BannerAdvertisement";
import PopupAdvertisement from "@/features/advertisements/components/Public/PopupAdvertisement";
import { useAdvertisementHooks } from "@/features/advertisements/hooks/useAdvertisements";
import CategoryBasedNewsList from "@/features/articles/components/Public/NewsList/CategoryBasedNewsList";
import { useCategoriesHooks } from "@/features/categories/hooks/useCategories";
import CategoryWithChildren from "@/features/home/components/CategoryWithChildren/CategoryWithChildren";
import ColoredCategoryNews from "@/features/home/components/ColoredCategoryNews/ColoredCategoryNews";
import ColumnViewCategoryNews from "@/features/home/components/ColumnViewCategoryNews/ColumnViewCategoryNews";
import ColumnViewMultiCategoryNews from "@/features/home/components/ColumnViewMultiCategoryNews/ColumnViewMultiCategoryNews";
import Headline from "@/features/home/components/Headline/Headline";
import LatestNews from "@/features/home/components/LatestNews/LatestNews";
import MultiCategoryInOneRow from "@/features/home/components/MultiCategoryInOneRow/MultiCategoryInOneRow";
import { useEffect, useState } from "react";

function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const advertisementHook = useAdvertisementHooks();
  const { data: advertisements, isLoading: adLoading } =
    advertisementHook.useFetchPublicAdvertisements({
      page_type: "home",
    });

  const categoriesHook = useCategoriesHooks();
  const { data: categories } = categoriesHook.useFetchPublicCategories({
    page: 1,
    per_page: 15,
  });
  const footerAd = advertisements?.data?.footer;

  useEffect(() => {
    if (advertisements?.data?.popup) setShowPopup(true);
  }, [advertisements?.data?.popup]);

  return (
    <div className="flex flex-col gap-10 justify-center items-center w-full">
      <Headline />
      <LatestNews />
      
      {categories?.data?.length > 0 && (
        <>
          <MultiCategoryInOneRow
            categoryOne={categories?.data[0]}
            categoryTwo={categories?.data[1]}
          />
          <CategoryWithChildren category={categories?.data[2]} />
          <ColoredCategoryNews category={categories?.data[3]} color="#D2E7FE" />
          <ColumnViewCategoryNews category={categories?.data[4]} />
          <ColumnViewMultiCategoryNews
            categoryOne={categories?.data[5]}
            categoryTwo={categories?.data[6]}
          />

          {categories?.data?.length > 7 && (
            <div className="flex flex-col w-full">
              <div>
                {categories?.data?.slice(7)?.map((category: any) => (
                  <CategoryBasedNewsList
                    key={category?.id}
                    categorySlug={category?.slug}
                    categoryId={category?.id}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
 {footerAd && (
        <div className="w-full pt-8 pb-2 flex items-center justify-center">
          <div className="w-full overflow-hidden rounded-md border border-[var(--color-public-border-darker)]">
            <BannerAdvertisement Ad={footerAd} />
          </div>
        </div>
      )}
      {!adLoading && advertisements?.data?.popup?.id && (
        <PopupAdvertisement
          advertisements={advertisements?.data?.popup}
          showPopup={showPopup}
          setShowPopup={setShowPopup}
        />
      )}
    </div>
  );
}

export default Home;
