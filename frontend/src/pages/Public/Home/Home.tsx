import LazyViewport from "@/components/shared/LazyViewport";
import BannerAdvertisement from "@/features/advertisements/components/Public/BannerAdvertisement";
import CategorySectionBanner from "@/features/advertisements/components/Public/CategorySectionBanner";
import { useAdvertisementHooks } from "@/features/advertisements/hooks/useAdvertisements";
import CategoryBasedNewsList from "@/features/articles/components/Public/NewsList/CategoryBasedNewsList";
import NewsListSkeleton from "@/features/articles/components/Public/NewsList/NewsListSkeleton";
import { useCategoriesHooks } from "@/features/categories/hooks/useCategories";
import CategoryWithChildren from "@/features/home/components/CategoryWithChildren/CategoryWithChildren";
import CategoryWithChildrenSkeleton from "@/features/home/components/CategoryWithChildren/CategoryWithChildrenSkeleton";
import ColoredCategoryNews from "@/features/home/components/ColoredCategoryNews/ColoredCategoryNews";
import ColoredCategoryNewsSkeleton from "@/features/home/components/ColoredCategoryNews/ColoredCategoryNewsSkeleton";
import ColoredHoverCategoryNews from "@/features/home/components/ColoredHoverCategoryNews/ColoredHoverCategoryNews";
import ColoredHoverCategoryNewsSkeleton from "@/features/home/components/ColoredHoverCategoryNews/ColoredHoverCategoryNewsSkeleton";
import ColumnViewCategoryNews from "@/features/home/components/ColumnViewCategoryNews/ColumnViewCategoryNews";
import ColumnViewCategoryNewsSkeleton from "@/features/home/components/ColumnViewCategoryNews/ColumnViewCategoryNewsSkeleton";
import ColumnViewMultiCategoryNews from "@/features/home/components/ColumnViewMultiCategoryNews/ColumnViewMultiCategoryNews";
import ColumnViewMultiCategoryNewsSkeleton from "@/features/home/components/ColumnViewMultiCategoryNews/ColumnViewMultiCategoryNewsSkeleton";
import Headline from "@/features/home/components/Headline/Headline";
import LatestNews from "@/features/home/components/LatestNews/LatestNews";
import MultiCategoryInOneRow from "@/features/home/components/MultiCategoryInOneRow/MultiCategoryInOneRow";
import MultiCategoryInOneRowSkeleton from "@/features/home/components/MultiCategoryInOneRow/MultiCategoryInOneRowSkeleton";

function Home() {
  const advertisementHook = useAdvertisementHooks();
  const { data: advertisements } =
    advertisementHook.useFetchPublicAdvertisements({
      page_type: "home",
    });

  const categoriesHook = useCategoriesHooks();
  const { data: categories } = categoriesHook.useFetchPublicCategories({});

  const footerAd = advertisements?.data?.footer;

  let categoryIndex = 0;

  const getCategory = () => categories?.data?.[categoryIndex++];

  const categoryOne = getCategory();
  const categoryTwo = getCategory();
  const categoryThree = getCategory();
  const categoryFour = getCategory();
  const categoryFive = getCategory();
  const categorySix = getCategory();
  const categorySeven = getCategory();
  const categoryEight = getCategory();
  const categoryNine = getCategory();

  return (
    <div className="flex flex-col gap-10 justify-center items-center w-full">
      <Headline />
      <LatestNews />

      {categories?.data?.length > 0 && (
        <>
          {categoryOne && (
            <LazyViewport
              fallback={<MultiCategoryInOneRowSkeleton />}
              minHeight="350px"
              rootMargin="400px"
            >
              <CategorySectionBanner category={categoryOne}>
                <MultiCategoryInOneRow
                  categoryOne={categoryOne}
                  categoryTwo={categoryTwo}
                />
              </CategorySectionBanner>
            </LazyViewport>
          )}

          {categoryThree && (
            <LazyViewport
              fallback={<CategoryWithChildrenSkeleton />}
              minHeight="400px"
              rootMargin="350px"
            >
              <CategorySectionBanner category={categoryThree}>
                <CategoryWithChildren category={categoryThree} />
              </CategorySectionBanner>
            </LazyViewport>
          )}

          {categoryFour && (
            <LazyViewport
              fallback={<ColoredCategoryNewsSkeleton color="#D2E7FE" />}
              minHeight="350px"
              rootMargin="350px"
            >
              <CategorySectionBanner category={categoryFour}>
                <ColoredCategoryNews
                  category={categoryFour}
                  color="#D2E7FE"
                />
              </CategorySectionBanner>
            </LazyViewport>
          )}

          {categoryFive && (
            <LazyViewport
              fallback={<ColoredHoverCategoryNewsSkeleton color="transparent" />}
              minHeight="350px"
              rootMargin="350px"
            >
              <CategorySectionBanner category={categoryFive}>
                <ColoredHoverCategoryNews
                  category={categoryFive}
                  color="transparent"
                />
              </CategorySectionBanner>
            </LazyViewport>
          )}

          {categorySix && (
            <LazyViewport
              fallback={<ColumnViewCategoryNewsSkeleton />}
              minHeight="350px"
              rootMargin="350px"
            >
              <CategorySectionBanner category={categorySix}>
                <ColumnViewCategoryNews category={categorySix} />
              </CategorySectionBanner>
            </LazyViewport>
          )}

          {categorySeven && (
            <LazyViewport
              fallback={<ColumnViewMultiCategoryNewsSkeleton />}
              minHeight="350px"
              rootMargin="350px"
            >
              <CategorySectionBanner category={categorySeven}>
                <ColumnViewMultiCategoryNews
                  categoryOne={categorySeven}
                  categoryTwo={categoryEight}
                />
              </CategorySectionBanner>
            </LazyViewport>
          )}

          {categoryNine && (
            <LazyViewport
              fallback={<ColoredHoverCategoryNewsSkeleton color="#1f1e1e" />}
              minHeight="350px"
              rootMargin="350px"
            >
              <CategorySectionBanner category={categoryNine}>
                <ColoredHoverCategoryNews
                  category={categoryNine}
                  color="#1f1e1e"
                />
              </CategorySectionBanner>
            </LazyViewport>
          )}

          {categories?.data?.slice(categoryIndex).map((category: any) => (
            <LazyViewport
              key={category?.id}
              fallback={<NewsListSkeleton show="list" />}
              minHeight="300px"
              rootMargin="300px"
            >
              <CategorySectionBanner category={category}>
                <CategoryBasedNewsList categorySlug={category?.slug} />
              </CategorySectionBanner>
            </LazyViewport>
          ))}
        </>
      )}

      {footerAd && (
        <LazyViewport minHeight="100px" rootMargin="200px">
          <div className="w-full pt-8 pb-2 flex items-center justify-center">
            <div className="w-full overflow-hidden rounded-md border border-[var(--color-public-border-darker)]">
              <BannerAdvertisement Ad={footerAd} />
            </div>
          </div>
        </LazyViewport>
      )}
    </div>
  );
}
export default Home;

