import BannerAdvertisement from "@/features/advertisements/components/Public/BannerAdvertisement";
import CategorySectionBanner from "@/features/advertisements/components/Public/CategorySectionBanner";
import { useAdvertisementHooks } from "@/features/advertisements/hooks/useAdvertisements";
import CategoryBasedNewsList from "@/features/articles/components/Public/NewsList/CategoryBasedNewsList";
import { useCategoriesHooks } from "@/features/categories/hooks/useCategories";
import CategoryWithChildren from "@/features/home/components/CategoryWithChildren/CategoryWithChildren";
import ColoredCategoryNews from "@/features/home/components/ColoredCategoryNews/ColoredCategoryNews";
import ColoredHoverCategoryNews from "@/features/home/components/ColoredHoverCategoryNews/ColoredHoverCategoryNews";
import ColumnViewCategoryNews from "@/features/home/components/ColumnViewCategoryNews/ColumnViewCategoryNews";
import ColumnViewMultiCategoryNews from "@/features/home/components/ColumnViewMultiCategoryNews/ColumnViewMultiCategoryNews";
import Headline from "@/features/home/components/Headline/Headline";
import LatestNews from "@/features/home/components/LatestNews/LatestNews";
import MultiCategoryInOneRow from "@/features/home/components/MultiCategoryInOneRow/MultiCategoryInOneRow";

function Home() {
  const advertisementHook = useAdvertisementHooks();
  const { data: advertisements } =
    advertisementHook.useFetchPublicAdvertisements({
      page_type: "home",
    });

  const categoriesHook = useCategoriesHooks();
  const { data: categories } = categoriesHook.useFetchPublicCategories({
    page: 1,
    per_page: 15,
  });
  const footerAd = advertisements?.data?.footer;

  return (
    <div className="flex flex-col gap-10 justify-center items-center w-full">
      <Headline />
      <LatestNews />
      
      {categories?.data?.length > 0 && (
        <>
          <CategorySectionBanner category={categories?.data[0]}>
            <MultiCategoryInOneRow
              categoryOne={categories?.data[0]}
              categoryTwo={categories?.data[1]}
            />
          </CategorySectionBanner>
          <CategorySectionBanner category={categories?.data[2]}>
            <CategoryWithChildren category={categories?.data[2]} />
          </CategorySectionBanner>
          <CategorySectionBanner category={categories?.data[3]}>
            <ColoredCategoryNews category={categories?.data[3]} color="#D2E7FE" />
          </CategorySectionBanner>
          <CategorySectionBanner category={categories?.data[4]}>
            <ColoredHoverCategoryNews category={categories?.data[4]} color="transparent" />
          </CategorySectionBanner>
          <CategorySectionBanner category={categories?.data[5]}>
            <ColumnViewCategoryNews category={categories?.data[5]} />
          </CategorySectionBanner>
          <CategorySectionBanner category={categories?.data[6]}>
            <ColumnViewMultiCategoryNews
              categoryOne={categories?.data[6]}
              categoryTwo={categories?.data[7]}
            />
          </CategorySectionBanner>
 <CategorySectionBanner category={categories?.data[8]}>
            <ColoredHoverCategoryNews category={categories?.data[8]} color="#1f1e1e" />
          </CategorySectionBanner>
          {categories?.data?.length > 9 && (
            <div className="flex flex-col w-full">
              <div>
                {categories?.data?.slice(9)?.map((category: any) => (
                  <CategorySectionBanner key={category?.id} category={category}>
                    <CategoryBasedNewsList
                      categorySlug={category?.slug}
                    />
                  </CategorySectionBanner>
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
    </div>
  );
}

export default Home;
